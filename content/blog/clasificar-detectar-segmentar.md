---
title: "Clasificar, detectar, segmentar: tres tareas distintas en visión"
date: "2026-04-24"
excerpt: "'Qué hay', 'dónde está' y 'qué píxel es qué' parecen lo mismo, pero son tres problemas de visión con costos y modelos muy distintos."
tags: ["vision", "cnn", "curiosidades"]
category: "ia-agentes"
subcategory: "vision"
---

Decís "la IA reconoce objetos en imágenes" y suena a una sola cosa. No lo es. Debajo de esa frase conviven al menos tres tareas distintas, con modelos distintos, etiquetas distintas y precios muy distintos a la hora de armar el dataset. Confundirlas es uno de los errores más caros en un proyecto de visión: pedís segmentación cuando alcanzaba con clasificar, o al revés.

## Las tres preguntas

La diferencia se entiende como tres preguntas que le hacés a la misma foto:

- **Clasificación — ¿qué hay?** Le das una imagen y devuelve una etiqueta para *toda* la imagen: "gato". No dice dónde. Es la tarea más simple y la salida es una sola palabra (o una distribución sobre clases).
- **Detección — ¿dónde está?** Devuelve una o varias **cajas** (bounding boxes) con su etiqueta: "gato en estas coordenadas, perro en estas otras". Localiza objetos y los cuenta.
- **Segmentación — ¿qué píxel es qué?** Asigna una clase a **cada píxel**. El resultado es una máscara: este conjunto de píxeles es gato, este otro es fondo. Es lo que necesitás para recortar con precisión un contorno irregular.

```
clasificación  →  "gato"
detección      →  [gato: (x1,y1,x2,y2)]
segmentación   →  máscara píxel a píxel
```

Y hay un cuarto nivel, la **segmentación de instancias**, que distingue además *cada* gato por separado: no solo "estos píxeles son gato" sino "estos son el gato 1 y estos el gato 2".

## El costo está en las etiquetas

Lo que casi nadie dice en las demos: la dificultad y el precio escalan brutal con la granularidad, sobre todo del lado del **etiquetado humano**:

- Clasificar: alguien mira la foto y tipea una palabra. Segundos.
- Detectar: alguien dibuja cajas alrededor de cada objeto. Minutos.
- Segmentar: alguien colorea el contorno exacto, píxel a píxel. **Mucho** más lento y caro.

> La pregunta de negocio no es "¿qué puede hacer la visión por computadora?" sino "¿cuál es la tarea más barata que resuelve mi problema?". Si solo querés saber si hay un casco en la foto, no pagues por segmentar.

Las tres comparten el mismo motor de abajo: una red que aprende [una jerarquía de bordes a conceptos](/ia-agentes/vision/como-ve-una-cnn). Cambia la *cabeza* del modelo —lo que va al final— y la forma de las etiquetas, no la maquinaria visual subyacente.

## Una sola columna vertebral

Eso explica un patrón muy común: se entrena una red potente para clasificación sobre millones de imágenes y después se reutiliza su cuerpo para detección o segmentación, cambiándole solo las últimas capas. Es [transfer learning puro](/data-ml/transfer-learning/por-que-funciona-transfer): los detectores de bordes y texturas sirven igual para las tres tareas, así que aprovechás [el poder de lo preentrenado para arrancar con pocos datos](/data-ml/transfer-learning/few-shot).

Y las tres heredan las mismas fragilidades del medio. Un modelo de detección puede caer en [las ilusiones ópticas de las redes](/ia-agentes/vision/ilusiones-redes) o, peor, ante un parche diseñado a propósito, como [un sticker que engaña a un auto autónomo](/ia-agentes/vision/sticker-adversario) y le hace ver una señal de tránsito donde no la hay.

En la práctica: cuando alguien te dice "necesitamos IA que vea X", la primera pregunta no es qué arquitectura usar. Es cuál de estas tres preguntas estás respondiendo de verdad. La respuesta define el dataset, el presupuesto y la mitad del proyecto.
