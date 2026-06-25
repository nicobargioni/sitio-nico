---
title: "'Funciona en mi máquina': el problema que Docker mató"
date: "2026-03-03"
excerpt: "La frase más temida del desarrollo de software, y cómo un formato de empaquetado terminó convirtiéndola en una broma del pasado."
tags: ["docker", "contenedores", "curiosidades"]
category: "cloud"
subcategory: "docker"
---

Hay una frase que durante décadas arruinó tardes enteras: "pero en mi máquina funciona". El bug aparecía en producción, vos lo corrías local y andaba perfecto. El problema casi nunca era el código: era todo lo que rodea al código.

## Por qué fallaba

Un programa no vive solo. Depende de una versión específica de Python, de unas librerías de sistema, de variables de entorno, de un locale, de la zona horaria, hasta del orden en que se instalaron las cosas. Tu laptop tiene Python 3.11 con OpenSSL parchado; el servidor tiene 3.9 con una versión vieja de glibc. El código es idéntico, el entorno no. Y el software se ejecuta en el entorno, no en el editor.

La industria intentó tapar esto con documentación ("instalá esto, después esto otro"), con scripts de setup que se pudrían en tres meses, con máquinas virtuales pesadísimas. Nada terminaba de cerrar.

## Qué cambió con los contenedores

Docker propuso algo distinto: en vez de describir el entorno, **empaquetarlo**. Una imagen de contenedor lleva adentro el código *y* el sistema de archivos que necesita para correr —el intérprete, las librerías, los binarios del sistema— congelado en un artefacto inmutable.

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

Ese `Dockerfile` no es documentación que alguien puede ignorar: es la receta exacta y ejecutable del entorno. La imagen que se construye con él es **bit a bit la misma** en tu laptop, en el CI y en producción. Si funciona en mi máquina, ahora sí funciona en la tuya, porque "mi máquina" viaja adentro de la imagen.

Lo interesante es la idea de fondo: **reproducibilidad**. No alcanza con que algo funcione una vez; tiene que poder reconstruirse igual, en cualquier lado, las veces que haga falta.

## La trampa que queda

Docker mató el "funciona en mi máquina", pero no mató la indisciplina. Si fijás versiones con cuidado, la imagen es reproducible. Si escribís `FROM python:latest` y `pip install requests` sin versión, hoy construye una cosa y mañana otra: la receta dejó de ser determinista. La herramienta te da el poder de congelar el entorno, pero seguís siendo vos quien decide si lo congela o lo deja al azar.

Por eso conviene entender lo que pasa por debajo: [cómo se arman las capas del Dockerfile](/cloud/docker/capas-cache) define qué tan reproducible y rápido es tu build, y la diferencia con una [máquina virtual](/cloud/docker/contenedor-vs-vm) explica por qué esto es liviano y no un mamotreto de 4GB. En la nube el efecto se multiplica: plataformas como Cloud Run [te obligan a pensar stateless](/cloud/cloud-run/stateless-obligado) justamente porque corren tu contenedor como artefacto desechable, y un [pipeline de CI/CD](/cloud/cicd/pipeline-rojo) usa esa imagen reproducible como la unidad que viaja del commit a producción.

## El cambio mental

Lo que Docker realmente cambió no fue el deploy: fue dejar de pensar en "el servidor" como un lugar especial que hay que cuidar a mano. El servidor pasó a ser intercambiable, porque lo único que importa es la imagen. Y una imagen, a diferencia de una máquina llena de configuraciones acumuladas por años, se puede tirar y reconstruir sin miedo.

Eso es lo que mató la frase: no la magia de los contenedores, sino la disciplina de empaquetar todo el entorno y tratarlo como código.
