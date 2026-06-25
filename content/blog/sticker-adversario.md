---
title: "Un sticker que engaña a un auto autónomo"
date: "2026-04-23"
excerpt: "Unos stickers blancos y negros bien puestos sobre un cartel de STOP hacen que un auto autónomo lea 'velocidad máxima 45'. Y funciona en el mundo real."
tags: ["vision", "cnn", "curiosidades"]
category: "ia-agentes"
subcategory: "vision"
---

Hay un experimento que me sigue pareciendo de los más inquietantes de la visión por computadora. Investigadores pegaron unos parches blancos y negros, que parecen grafiti o calcomanías cualquiera, sobre una señal de STOP. Para un humano, sigue siendo obvio: es un STOP. Para el clasificador de un sistema de conducción autónoma, pasó a ser una señal de "velocidad máxima 45". No en un render de laboratorio: con la cámara, a varios ángulos y distancias, en la calle.

## Del ruido invisible al parche imprimible

Quizás conozcas los [ejemplos adversarios clásicos](/data-ml/deep-learning/panda-gibon): sumarle a una foto de panda un ruido imperceptible para que la red diga "gibón". Eso es elegante pero tiene una trampa para el mundo real: el ruido es delicadísimo. Hay que sumarlo píxel a píxel a la imagen digital exacta, y se rompe con la compresión, el reencuadre o la luz.

El ataque del sticker resuelve justo eso. En vez de un ruido sutil sobre la imagen digital, es una **perturbación física, grande y robusta** que sobrevive al pasar por una cámara real. El truco es optimizar el parche para que funcione bajo muchas condiciones a la vez:

- distintas distancias y ángulos de cámara,
- distintas iluminaciones,
- el ruido propio del sensor y de la impresión.

> No alcanza con engañar a la red una vez en una foto perfecta. El parche tiene que engañarla *siempre*, desde el auto en movimiento, bajo sol o sombra. Eso lo vuelve un problema de seguridad, no una curiosidad.

Matemáticamente, en lugar de buscar la perturbación mínima invisible, se busca el patrón —acotado a una región chica, imprimible— que **maximiza el error de clasificación promediado** sobre todas esas transformaciones físicas. El resultado se ve como arte abstracto y es perfectamente legible para nosotros como "cartel con stickers".

## Por qué pasa, otra vez

La raíz es la misma que detrás de los adversarios sutiles: estas redes [arman conceptos juntando texturas y bordes locales](/ia-agentes/vision/como-ve-una-cnn) y trazan fronteras de decisión que, en el espacio de las imágenes, están más cerca de lo que intuimos. Un parche bien diseñado empuja la entrada del lado equivocado de esa frontera. Es pariente directo de [las ilusiones ópticas de las redes](/ia-agentes/vision/ilusiones-redes): el modelo no se "rompe", aplica correlaciones reales que aprendió, solo que en dimensiones que a nosotros nos resultan ajenas.

Y conecta con un punto incómodo de [las tres tareas de la visión](/ia-agentes/vision/clasificar-detectar-segmentar): ya sea clasificar la señal o detectarla en la escena, ambas comparten el mismo motor frágil, así que ambas son atacables.

## Qué se hace al respecto

No hay bala de plata, pero sí mitigaciones que suman en capas:

- **Entrenamiento adversario**: meter ejemplos atacados en el dataset para que el modelo aprenda a resistirlos.
- **Redundancia de sensores**: cruzar la cámara con LIDAR, radar y mapas. Un sticker engaña a los píxeles, no a la geometría 3D.
- **Detección de anomalías**: marcar entradas que caen en zonas raras del espacio de features.
- **Coherencia temporal**: un STOP que de golpe "cambia" a 45 entre frames es sospechoso de por sí.

La moraleja que me llevo es de diseño, no de pánico. Cualquier sistema crítico que dependa de una sola red de visión es atacable por construcción. La robustez no se compra con más exactitud en el dataset limpio: se compra con redundancia, con verificación y con asumir, desde el día uno, que el mundo físico va a tener adversarios.
