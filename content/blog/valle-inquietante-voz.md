---
title: "Voces sintéticas y el valle inquietante del audio"
date: "2026-04-19"
excerpt: "Por qué una voz TTS casi perfecta nos da más rechazo que una claramente robótica. El valle inquietante también existe en el sonido."
tags: ["audio", "habla", "curiosidades"]
category: "ia-agentes"
subcategory: "procesamiento-habla"
---

Hay un fenómeno raro con las voces sintéticas. La voz robótica de los GPS viejos no molestaba a nadie: era obviamente una máquina y listo. Pero algunas voces nuevas de TTS, casi indistinguibles de una persona, producen un escalofrío. No sabés por qué, pero algo en esa voz "te eriza". Ese pozo entre "claramente artificial" y "perfectamente humano" es el valle inquietante, y en audio es igual de real que en las caras.

## El valle, en una curva

El concepto viene de la robótica: a medida que un robot se parece más a un humano, nos cae mejor… hasta cierto punto. Justo antes de la copia perfecta hay una caída brusca de simpatía —el *uncanny valley*—. Lo casi-humano nos resulta más perturbador que lo abiertamente artificial.

Con la voz pasa lo mismo. Mientras suena a máquina, el cerebro la archiva como "máquina" y la deja pasar. Cuando suena casi humana pero falla en algo, el cerebro la espera humana y detecta el error. Y somos detectores de error de voz finísimos: la usamos todos los días para leer emociones.

## Qué delata a una voz sintética

Lo interesante es *qué* falla. Casi nunca es el timbre —eso ya lo clonan perfecto—. Son cosas más sutiles:

- **La prosodia**: el ritmo, las pausas, dónde sube y baja la entonación. Una voz que pone el énfasis un poquito corrido suena "off".
- **La respiración y las micro-imperfecciones**: los humanos respiramos, dudamos, alargamos vocales. Una voz demasiado pareja se siente muerta.
- **La emoción que no matchea**: alegría en el timbre con ritmo de tristeza. La incoherencia es lo que más nos chirría.

Es el mismo tipo de error que en visión hace que [una red vea un panda como gibón](/data-ml/deep-learning/panda-gibon): a un nivel todo está bien, pero un detalle de bajo nivel rompe la coherencia que esperás. Solo que acá el "clasificador" que se da cuenta sos vos.

## La paradoja para quien diseña la voz

Esto le crea un dilema a cualquiera que ponga una voz sintética en un producto. Cuanto más realista la hacés, más cerca del borde del valle la empujás —y un solo error de prosodia, que en una voz robótica nadie notaría, ahí se vuelve escalofriante.

Por eso muchos asistentes eligen, a propósito, una voz un poco estilizada: que se note amablemente que es una IA. Es la misma honestidad de diseño del [fallback a un humano](/hiperautomatizacion/agentes-conversacionales/fallback-humano) en un chatbot: no finjas ser lo que no sos. A veces la mejor voz sintética no es la que más engaña, sino la que asume con gracia que es sintética.
