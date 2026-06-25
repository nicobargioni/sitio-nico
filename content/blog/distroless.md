---
title: "Imágenes distroless: menos es más seguro"
date: "2026-02-27"
excerpt: "¿Y si tu contenedor de producción no tuviera shell, ni gestor de paquetes, ni casi nada? Lo que no está, no te lo pueden explotar."
tags: ["docker", "contenedores", "curiosidades"]
category: "cloud"
subcategory: "docker"
---

Hay una idea contraintuitiva en seguridad de contenedores: la imagen más segura no es la que tiene las mejores defensas, sino la que casi no tiene nada que defender. Eso son las imágenes **distroless**: contenedores a los que les sacaron todo lo que no es estrictamente tu aplicación. Ni shell, ni `apt`, ni `curl`, ni siquiera un `ls`.

## Qué le falta a una distroless

Una imagen común basada en, digamos, Debian trae un sistema de paquetes completo: una shell (`bash`), utilidades de Unix, un package manager, gestor de procesos, decenas de binarios "por las dudas". Todo eso existe porque te resulta cómodo cuando entrás a debuggear.

Una imagen **distroless** deja solo lo mínimo para ejecutar tu programa: el runtime del lenguaje y sus librerías, y nada más. No hay shell. No hay forma de instalar nada. No hay herramientas de red. Es, literalmente, tu app y el piso justo sobre el que se para.

## Por qué eso es más seguro

La seguridad acá se mide en **superficie de ataque**: cuántas cosas existen en el sistema que un atacante podría aprovechar. Cada binario presente es una herramienta potencial para quien logre entrar.

- Sin **shell**, un atacante que consigue ejecución de código no puede abrir una `bash` para moverse, explorar o encadenar comandos. Muchísimas técnicas de explotación asumen que hay una shell a mano; si no está, se quedan a mitad de camino.
- Sin **package manager**, no puede instalar herramientas para escalar el ataque.
- **Menos paquetes = menos CVEs**: cada librería del sistema que sacás es una vulnerabilidad conocida (o futura) que directamente no te aplica. Un escáner de seguridad sobre una distroless devuelve una lista cortísima, no porque ignore problemas, sino porque hay menos cosas que puedan tenerlos.

Es la misma lógica que en los [multi-stage builds](/cloud/docker/imagen-gigante): si el compilador no viaja a producción, no es un vector de ataque. Distroless lleva ese principio hasta el extremo y saca también el sistema operativo de utilidades.

```dockerfile
# Compilás con todas las herramientas...
FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --target=/deps -r requirements.txt

# ...y corrés en una base sin shell ni package manager
FROM gcr.io/distroless/python3-debian12
WORKDIR /app
COPY --from=builder /deps /usr/lib/python3/dist-packages
COPY . .
CMD ["app.py"]
```

## El costo: no podés "entrar"

Lo distroless tiene una contra honesta: cuando algo falla en producción, no podés abrir una shell adentro para hurgar, porque no hay shell. Esto incomoda a mucha gente, pero en realidad empuja hacia una buena práctica: si necesitás meterte a un contenedor de producción a tocar cosas a mano, probablemente tu observabilidad (logs, métricas, trazas) sea pobre. El debugging se hace por fuera, con buenos logs, no entrando al contenedor.

Encaja perfecto con plataformas donde el contenedor es desechable y [stateless por diseño](/cloud/cloud-run/stateless-obligado): no entrás a arreglar la instancia, la observás desde afuera y, si hace falta, la matás y arranca otra limpia.

## El cierre

Distroless invierte la intuición: en vez de blindar el contenedor con más herramientas, lo hacés seguro **quitándole** cosas. Lo que no está, no falla, no tiene CVEs y no le sirve a nadie que entre.

Es el mismo hilo que recorre todo el mundo de los contenedores —desde [matar el "funciona en mi máquina"](/cloud/docker/funciona-en-mi-maquina) hasta [compartir el kernel en vez de duplicar el sistema operativo](/cloud/docker/contenedor-vs-vm)—: ser deliberado sobre qué entra y qué no. Distroless es ese principio llevado a su conclusión más austera, y la austeridad, acá, es defensa.
