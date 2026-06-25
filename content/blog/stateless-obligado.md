---
title: "Por qué Cloud Run te obliga a ser stateless"
date: "2026-03-11"
excerpt: "Guardás un archivo en disco, funciona, y dos requests después desapareció. No es un bug: es la regla de oro de Cloud Run."
tags: ["cloud-run", "serverless", "curiosidades"]
category: "cloud"
subcategory: "cloud-run"
---

Subís una imagen, la guardás en `/tmp`, devolvés la URL. Andás a buscarla un rato después y no está. O peor: a veces está y a veces no, sin patrón aparente. No te volviste loco. Cloud Run **no te deja guardar estado local**, y entender por qué te ahorra horas de debugging que parece embrujado.

## La causa: tu contenedor es desechable

Cloud Run no corre un servidor; corre **contenedores efímeros que va creando y destruyendo** según el tráfico. Tres consecuencias que rompen el modelo mental de "un servidor de toda la vida":

- **Escala a cero.** Sin tráfico, [se apaga todo](/cloud/cloud-run/scale-to-zero) y con ello la RAM y el disco local. Lo que guardaste, desapareció.
- **Escala horizontal.** Con tráfico, levanta *varias* instancias. La request que guardó el archivo y la que lo busca pueden caer en contenedores distintos, cada uno con su propio disco.
- **Reemplazo en cada deploy.** Cada versión nueva tira los contenedores viejos. No hay continuidad.

Por eso el disco local de Cloud Run es realmente memoria RAM temporal: rápido, sí, pero se evapora. Sirve de scratch dentro de una misma request, nunca como almacenamiento.

## Stateless no es una opción, es la arquitectura

"Stateless" suena a jerga, pero significa algo concreto: **cada request se atiende sin depender de lo que quedó de las anteriores en esa instancia**. Toda la información que tiene que sobrevivir vive *afuera* del contenedor:

- **Archivos** → un bucket de almacenamiento de objetos (Cloud Storage).
- **Datos estructurados** → una base administrada (Postgres, Firestore, [BigQuery](/cloud/bigquery/columnar-terabytes) para analítica).
- **Sesiones / caché** → un store compartido como Redis, no una variable global en memoria.
- **Trabajo diferido** → una cola de mensajes, no un thread que arrancaste y esperás que siga vivo.

```python
# MAL: se pierde al apagarse o al escalar a otra instancia
uploads = {}
@app.post("/subir")
def subir(f):
    uploads[f.id] = f.bytes   # vive solo en ESTA instancia

# BIEN: el estado vive afuera, lo ve cualquier instancia
@app.post("/subir")
def subir(f):
    bucket.blob(f.id).upload_from_string(f.bytes)
```

## La incomodidad que en realidad es un regalo

Al principio molesta: tenés que sacar el estado de adentro de la app y mandarlo a otro servicio. Pero esa misma restricción es lo que te da **escalado automático sin dolor**. Como ningún contenedor es especial, la plataforma puede crear, matar y reemplazar instancias libremente. Es el mismo principio que hace reproducible a [un contenedor de Docker](/cloud/docker/funciona-en-mi-maquina): si no dependés del entorno local, corre igual en cualquier lado.

Lo stateless es la condición que hace posible el [scale-to-zero](/cloud/cloud-run/scale-to-zero) y el escalado horizontal que tanto te gustan. No es un capricho de Cloud Run: es el peaje que pagás por no administrar servidores. Y casi siempre vale la pena pagarlo.
