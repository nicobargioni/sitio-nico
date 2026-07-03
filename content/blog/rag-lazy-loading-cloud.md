---
title: "Por qué el índice de tu RAG se arma de nuevo en cada arranque (y no es un bug)"
date: "2026-07-03"
excerpt: "En cold starts recomendamos lazy loading para achicar el arranque. Hay un caso donde ese mismo consejo te sale carísimo: cuando lo que diferís no es liviano de rehacer."
tags: ["rag", "cloud", "arquitectura", "curiosidades"]
category: "ia-agentes"
subcategory: "rag-embeddings"
---

En la nota sobre [cold starts](/cloud/cloud-run/cold-start) dimos un consejo que sigue siendo correcto: "no importes ni cargues en memoria lo que no necesitás para responder. Diferí el modelo pesado hasta la primera vez que de verdad se use." Es lazy loading, y en la mayoría de los casos achica el arranque.

Hay un caso donde ese mismo consejo, aplicado tal cual, te sale carísimo: cuando lo que diferís no es liviano de rehacer, y tu proceso se reinicia todo el tiempo. El caso de manual es el índice de un RAG.

## El problema, en código

Así se ve, casi siempre, la primera versión de un RAG armado con ayuda de un asistente de IA:

```python
_index = None

def get_index():
    global _index
    if _index is None:
        _index = build_index_from_docs()  # embeddings + vector store, caro
    return _index

def retrieve(query):
    return get_index().search(query)
```

Es exactamente el patrón que recomendamos para cold starts: no cargues nada hasta que haga falta. En tu laptop, `build_index_from_docs()` corre una vez, cuando llega la primera consulta de tu sesión de prueba, y esa memoria vive mientras el proceso siga abierto — horas, quizás días.

El problema es qué significa "el proceso" cuando eso corre en [Cloud Run](/cloud/cloud-run/scale-to-zero) o cualquier plataforma serverless. Ahí un proceso no es una sesión de trabajo: es una instancia que puede nacer y morir en minutos. Cada [cold start](/cloud/cloud-run/cold-start) es, para esta función, la primera vez que se llama. `_index` vuelve a ser `None`. Se reconstruye. Otra vez.

## Local y cloud no son el mismo contrato

El código no cambió entre tu laptop y producción. Lo que cambió es el contrato bajo el que corre:

| | Local (tu laptop, un notebook) | Cloud (contenedor serverless) |
|---|---|---|
| Vida del proceso | Horas o días, un solo usuario | Minutos; se recicla en cada deploy, escalado o caída |
| Filesystem | Persiste entre corridas por default | Efímero, salvo volumen o bucket montado explícitamente |
| Costo de "lazy la primera vez" | Se paga una sola vez por sesión | Se paga en cada cold start — puede ser cada minuto con tráfico irregular |
| Quién debería persistir el índice | El propio proceso, a disco local | Una capa externa al contenedor (storage, DB vectorial administrada) |

Esta tabla es, en el fondo, la misma tensión que ya cubrimos con [Cloud Run y el statelessness obligatorio](/cloud/cloud-run/stateless-obligado): cualquier estado que tu código asuma que "está ahí porque lo dejaste la vez anterior" es una apuesta perdida en un entorno que puede tirar la instancia en cualquier momento.

## Los cuatro patrones que usa Claude Code puertas adentro

Cuando fui a buscar cómo se resuelve esto bien, no hizo falta inventar nada: alcanzó con leer cómo lo resuelve el propio Claude Code. En el leak de finales de marzo de este año que expuso su código fuente aparecen cuatro reglas explícitas — ninguna exótica, todas aplicables a un RAG.

**1. Preguntar el entorno una sola vez, al arrancar.** Claude Code no reparte por el código la pregunta "¿tengo filesystem persistente?". Hay una única función que lee una variable de entorno al iniciar y devuelve el tipo de entorno; todo lo demás bifurca su estrategia a partir de esa respuesta. Trasladado a un RAG:

```python
import os

def environment_kind():
    return os.environ.get("APP_ENV_KIND", "local")  # 'local' | 'cloud'
```

Nada de adivinar por try/except si un directorio es escribible. Una sola fuente de verdad, consultada una vez.

**2. Cache en memoria, pero invalidada por hechos, no por reloj.** Claude Code guarda su configuración en una variable de módulo mientras dura la sesión, y la limpia solo cuando pasa algo real — se escribió configuración nueva, se agregó un directorio de trabajo — nunca por un TTL arbitrario. Es exactamente lo que hace `get_index()` de arriba, y es correcto *mientras el proceso viva lo suficiente como para que valga la pena*. El error no es cachear en memoria: es asumir que esa memoria va a sobrevivir a un reinicio que en cloud puede pasar en cualquier momento.

**3. Cuando algo es caro de rehacer, guardarlo en disco con una fecha al lado.** Claude Code cachea los plugins que descarga como archivos en disco, y deja junto a cada uno un marcador con la fecha en que quedó obsoleto. Cualquier proceso nuevo — aunque jamás haya visto al anterior — puede leer esa fecha y decidir si reconstruir o reusar, sin depender de que alguna variable en memoria "se acuerde". Aplicado al índice:

```python
import json, time, hashlib, os

INDEX_PATH = "/data/index.bin"
META_PATH  = "/data/index.meta.json"

def source_hash(docs_dir):
    h = hashlib.sha256()
    for name in sorted(os.listdir(docs_dir)):
        h.update(open(os.path.join(docs_dir, name), "rb").read())
    return h.hexdigest()

def load_or_build_index(docs_dir):
    if os.path.exists(META_PATH):
        meta = json.load(open(META_PATH))
        if meta["source_hash"] == source_hash(docs_dir):
            return load_index_from_disk(INDEX_PATH)   # sigue vigente, no se rehace

    index = build_index_from_docs(docs_dir)
    save_index_to_disk(index, INDEX_PATH)
    json.dump({"source_hash": source_hash(docs_dir), "built_at": time.time()}, open(META_PATH, "w"))
    return index
```

La pregunta "¿esto sigue sirviendo?" ya no vive en la cabeza de quien programó `get_index()`: vive en un archivo que cualquier instancia nueva puede leer.

**4. En un entorno efímero, no reconstruir por cuenta propia — delegar a infraestructura.** Este es el patrón que más cambia el diseño. Cuando Claude Code corre en un entorno que sabe descartable, ni siquiera intenta resolver la persistencia a nivel de aplicación: se apoya en una capa externa (un servicio de sincronización) pensada para sostener ese estado para toda la flota de instancias, no para que cada una la reinvente. Trasladado al RAG, la versión completa de `load_or_build_index` queda así:

```python
def get_index(docs_dir):
    if environment_kind() == "cloud":
        index = load_index_from_disk(INDEX_PATH)   # volumen/bucket compartido, montado por infra
        if index is None:
            raise RuntimeError(
                "Índice ausente en cloud: se arma en un job de build, "
                "no en el primer request de cada instancia."
            )
        return index

    return load_or_build_index(docs_dir)   # local: sí, construilo acá si hace falta
```

En cloud, la función **falla rápido y avisa** en vez de rehacer el trabajo en medio de un pedido real. El armado del índice pasa a ser un paso del pipeline de build o un job aparte — algo que corre una vez y deja el resultado listo para toda la flota, exactamente como el patrón de sincronización que usa Claude Code para sus propios archivos de sesión.

## El matiz que se presta a confusión

Vale la pena aclarar algo antes de que alguien saque la conclusión equivocada: el patrón 1 (preguntar el entorno) **no cachea la respuesta para siempre**. La función `environment_kind()` lee la variable de entorno en cada llamada, no la memoriza en un lugar que pueda quedar desactualizado.

Esto importa porque una intuición común es: "¿y si mi programa arrancó pensando que era local, y a mitad de sesión lo paso a cloud — no se queda con la idea vieja en memoria?" La respuesta corta es que ese escenario, tal como se lo imagina, no ocurre: un proceso no migra en caliente de tu laptop a un contenedor. Productivizar significa arrancar un **proceso nuevo**, en una **máquina nueva**, que lee la variable de entorno de cero al iniciar.

El riesgo real está un escalón más abajo, y es más aburrido que una cache vieja: es la **configuración que viaja sin que nadie la revise**. Si copiás el mismo `.env` de desarrollo al deploy de producción sin actualizar `APP_ENV_KIND`, el proceso nuevo va a seguir leyendo `local` — no porque algo quedó en memoria, sino porque nadie tocó la config al cambiar de infraestructura. Y si la rama `cloud` de `get_index()` directamente nunca se escribió porque el proyecto nació pensado solo para tu laptop, da igual que la detección de entorno funcione perfecto: el código va a intentar hacer lo mismo que hacía en local, chocar contra un filesystem que no persiste, y volver al síntoma original.

## Checklist antes de subir un RAG a producción

- ¿Sabés si esto va a correr en un proceso que vive horas (tu laptop, un notebook) o en uno que se recicla todo el tiempo (un contenedor con autoscaling)?
- ¿Lo que se cachea en memoria vive en una variable de módulo? Si hay varias instancias corriendo a la vez, cada una tiene su propia copia — no se comparte nada.
- ¿El índice queda guardado en un lugar que sobrevive al reinicio del contenedor (volumen montado, bucket, base vectorial administrada), o solo en el filesystem efímero de la instancia?
- ¿Ese índice ya está armado antes de que llegue tráfico real, o el primer pedido de cada instancia nueva paga la construcción completa?
- ¿Alguien revisó la configuración al pasar de tu compu a producción, o se copió tal cual?

Si no podés responder alguna de estas sin ir a mirar el código, ese es exactamente el punto ciego que un asistente de IA no te va a señalar por su cuenta: está optimizado para que el prototipo ande rápido mientras programás, no para que la factura de producción sea chica.

## La lección de fondo

No es que el lazy loading esté mal — [seguimos recomendándolo para cold starts](/cloud/cloud-run/cold-start), y sigue siendo correcto para lo que es liviano de rehacer. El error es tratar toda carga diferida como si tuviera el mismo costo. Cargar perezosamente una conexión a una base de datos es gratis comparado con cargar perezosamente un índice vectorial de miles de documentos. La pregunta que separa un caso del otro nunca es "¿esto se puede diferir?" — siempre es "¿qué tan caro es rehacerlo, y cuántas veces por hora mi infraestructura me va a obligar a rehacerlo?".
