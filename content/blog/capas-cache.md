---
title: "Las capas de Docker: por qué el orden del Dockerfile importa"
date: "2026-03-02"
excerpt: "Cambiar una línea de lugar en el Dockerfile puede hacer que tu build pase de 5 minutos a 5 segundos. El secreto está en las capas."
tags: ["docker", "contenedores", "curiosidades"]
category: "cloud"
subcategory: "docker"
---

Dos Dockerfiles pueden producir exactamente la misma imagen, y uno tardar cinco minutos en construirse y el otro cinco segundos. La diferencia no está en *qué* hacen, sino en *en qué orden* lo hacen. Para entender por qué, hay que mirar cómo Docker construye.

## Una imagen es una pila de capas

Cada instrucción del Dockerfile (`RUN`, `COPY`, `ADD`) crea una **capa**: una especie de diff del sistema de archivos respecto de la capa anterior. La imagen final no es un bloque monolítico, es una pila de estas capas apiladas una sobre otra, como las hojas de una cebolla.

Lo clave es que Docker **cachea** cada capa. Cuando reconstruís, recorre el Dockerfile de arriba hacia abajo y, mientras la instrucción y sus inputs no hayan cambiado, reutiliza la capa cacheada en vez de recalcularla. En cuanto encuentra la primera capa que cambió, **invalida esa y todas las que vienen después**. La cache se rompe hacia abajo, nunca hacia arriba.

## El error clásico

El error que casi nadie ve la primera vez. Mirá este orden:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "app.py"]
```

`COPY . .` copia todo el código. Cada vez que cambiás *una sola línea* de tu app, esa capa cambia, se invalida, y Docker vuelve a correr el `pip install` de cero, aunque las dependencias sean idénticas. Estás reinstalando todo por haber arreglado un typo.

La versión correcta separa lo que cambia poco de lo que cambia mucho:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

Ahora el `requirements.txt` se copia solo. Mientras no toques las dependencias, esa capa y la del `pip install` quedan cacheadas, y editar tu código solo invalida el `COPY . .` final, que es instantáneo.

## La regla mental

> Poné arriba lo que cambia poco; abajo lo que cambia seguido.

El orden de las instrucciones es, en realidad, una **estrategia de invalidación de cache**. Las dependencias del sistema van primero, después las del lenguaje, y el código fuente —lo que más toqueteás— va al final. Es la misma lógica que tener las cosas que usás todos los días al alcance de la mano y las del año pasado en el fondo del placard.

## Por qué te importa más allá de la velocidad local

En tu laptop esto es comodidad. En un [pipeline de CI/CD](/cloud/cicd/pipeline-rojo) es plata y tiempo: cada push reconstruye la imagen, y un Dockerfile mal ordenado multiplica el costo de cómputo y el tiempo hasta el deploy. También impacta en plataformas como Cloud Run, donde imágenes que se construyen y suben rápido reducen la fricción de cada release y ayudan con el [cold start](/cloud/cloud-run/cold-start) si además mantenés la imagen liviana.

Y justamente para mantenerla liviana, las capas se combinan con otra técnica: los [multi-stage builds](/cloud/docker/imagen-gigante), que separan el entorno de compilación del de ejecución. Todo esto descansa sobre la misma idea que hizo que [Docker matara el "funciona en mi máquina"](/cloud/docker/funciona-en-mi-maquina): la imagen es un artefacto reproducible, y entender sus capas es entender cómo se arma. Si querés llevar la cebolla al extremo de seguridad, mirá las [imágenes distroless](/cloud/docker/distroless).

## Un detalle que no lo es

Las capas parecen un detalle de implementación, pero entenderlas cambia cómo escribís Dockerfiles. El orden de las líneas es una decisión de diseño, y la cache premia a quien la piensa.
