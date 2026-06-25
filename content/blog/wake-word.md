---
title: "'Hey Siri': cómo un dispositivo te escucha sin escuchar"
date: "2026-04-18"
excerpt: "Tu teléfono espera la palabra mágica todo el día sin mandar tu vida a la nube. El truco está en un modelo diminuto que corre en el chip."
tags: ["audio", "habla", "curiosidades"]
category: "ia-agentes"
subcategory: "procesamiento-habla"
---

Decís "Hey Siri" y el teléfono se despierta. Lo cual implica que estaba escuchando. Todo el tiempo. Y ahí salta la pregunta incómoda: si me escucha siempre, ¿manda todo lo que digo a un servidor? La respuesta, cuando está bien hecho, es no. Y entender por qué es entender una de las arquitecturas más elegantes del procesamiento de habla.

## Dos cerebros, no uno

Lo que pasa es que hay **dos sistemas distintos**, y casi nunca trabajan a la vez.

El primero es un detector minúsculo que solo sabe hacer una cosa: reconocer la *wake word*. No transcribe, no entiende, no manda nada. Vive en un chip de bajísimo consumo y procesa el audio **localmente, on-device**, en una ventanita de pocos segundos que se sobrescribe sin parar. No guarda nada.

El segundo —el asistente de verdad, el que entiende lo que pedís— recién se enciende **después** de que el primero detecta la palabra. Ese sí puede ir a la nube. Pero antes de "Hey Siri", ese cerebro grande está dormido.

## Por qué el modelo es tan chico

El detector tiene que correr 24/7 sin fundir la batería, así que es una red diminuta. No le importa qué dijiste: solo emite una probabilidad de "¿esto se pareció a la palabra mágica?" sobre cada [espectrograma](/ia-agentes/procesamiento-habla/espectrograma) de unos milisegundos.

Esa restricción de tamaño conecta con una idea linda del deep learning: dentro de una red enorme suele esconderse una mucho más chica que hace casi lo mismo, como en [la hipótesis del billete de lotería](/data-ml/deep-learning/billete-loteria). La wake word es justo eso llevado al extremo: lo mínimo indispensable para una sola tarea.

## El dial entre falsos positivos y privacidad

Diseñar esto es elegir un umbral, y el umbral tiene dos extremos malos:

- **Umbral muy alto**: el asistente no se despierta ni cuando lo llamás. Frustrante.
- **Umbral muy bajo**: se activa con la tele, con un "oye, siri" de la nada, y empieza a captar audio que no le pediste.

Cada activación falsa abre el micrófono grande un instante. Por eso el umbral es, en el fondo, una decisión de privacidad disfrazada de ajuste técnico —el mismo tipo de costo oculto que tienen [los falsos positivos en cualquier detección](/data-ml/deteccion-anomalias/costo-falsos-positivos).

Lo tranquilizador es la arquitectura: el modelo que escucha siempre es tan limitado que *no podría* entender tu conversación aunque quisiera. Te escucha sin escuchar. Y ese diseño —el cerebro chico que cuida la puerta y el grande que duerme hasta que lo llaman— es lo que hace que "escucha todo el tiempo" no signifique "te espía todo el tiempo".
