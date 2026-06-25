---
title: "Tu imagen pesa 2GB y no debería: multi-stage builds"
date: "2026-03-01"
excerpt: "Si tu imagen de producción incluye el compilador, los headers y medio sistema operativo, estás cargando un taller entero para usar un destornillador."
tags: ["docker", "contenedores", "curiosidades"]
category: "cloud"
subcategory: "docker"
---

Abrís tu imagen de Docker y pesa 2GB. Adentro hay un compilador de C, los headers de desarrollo de Python, herramientas de build, cachés de paquetes y dependencias que usaste solo para *construir* la app, no para correrla. Es como mudarte con el camión, las herramientas del flete y los embaladores incluidos en la caja.

## De dónde sale el peso

El problema es que el entorno donde **compilás** una aplicación y el entorno donde la **ejecutás** son muy distintos. Para construir necesitás compiladores, headers, gestores de paquetes. Para correr, casi siempre alcanza con el intérprete o el binario final y un puñado de librerías.

Si usás un solo Dockerfile lineal, todo lo que instalaste para compilar queda pegado en la imagen final como capas que ya nunca vas a usar. Y como vimos al hablar de [las capas y la cache](/cloud/docker/capas-cache), borrar algo en una capa posterior no lo elimina de verdad: la capa anterior, con el peso, sigue ahí abajo.

## La idea: dos etapas, una imagen

Un **multi-stage build** usa varias secciones `FROM` en el mismo Dockerfile. La primera etapa es el taller: trae todas las herramientas pesadas y compila. La última etapa es la mudanza limpia: parte de una imagen mínima y **copia solo el resultado** de la etapa anterior, dejando el taller atrás.

```dockerfile
# Etapa 1: build (el taller)
FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --target=/deps -r requirements.txt

# Etapa 2: runtime (la imagen final)
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /deps /usr/local/lib/python3.11/site-packages
COPY . .
CMD ["python", "app.py"]
```

La magia está en `COPY --from=builder`: solo cruza lo que pediste explícitamente. El compilador, los headers, las cachés intermedias se quedan en la etapa `builder`, que nunca llega a la imagen final. En proyectos de lenguajes compilados como Go el efecto es brutal: la etapa de build trae el SDK entero y la final puede ser un único binario sobre una base casi vacía. Pasar de 1.5GB a 30MB es normal.

## Por qué importa más allá de la estética

Una imagen liviana no es una cuestión de prolijidad. Tiene consecuencias concretas:

- **Deploys más rápidos**: menos bytes que subir al registry y bajar al servidor. En un [pipeline de CI/CD](/cloud/cicd/pipeline-rojo) cada push paga ese peso.
- **Cold starts más cortos**: en plataformas como Cloud Run, donde el contenedor [escala a cero](/cloud/cloud-run/scale-to-zero) y arranca por demanda, una imagen chica significa un [cold start](/cloud/cloud-run/cold-start) más liviano.
- **Menos superficie de ataque**: cada paquete que no está es un paquete que no te pueden explotar. Si el compilador no viaja, no es un vector. Esta lógica llevada al límite es la de las [imágenes distroless](/cloud/docker/distroless).

## El cierre

Multi-stage builds separan dos preguntas que solemos mezclar: "¿qué necesito para construir esto?" y "¿qué necesito para correrlo?". Casi nunca son lo mismo, y confundirlas es lo que infla las imágenes.

Es la misma disciplina de fondo que la que hizo que [Docker matara el "funciona en mi máquina"](/cloud/docker/funciona-en-mi-maquina): tratar la imagen como un artefacto deliberado, no como el sedimento accidental de todo lo que pasó durante el build. Llevás solo lo que vas a usar, y dejás el taller donde corresponde.
