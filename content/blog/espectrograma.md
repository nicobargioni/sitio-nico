---
title: "El espectrograma: ver el sonido para que la IA lo entienda"
date: "2026-04-22"
excerpt: "El sonido es una onda invisible. El truco de casi todo el audio moderno es convertirla en una imagen y dejar que la red la mire."
tags: ["audio", "habla", "curiosidades"]
category: "ia-agentes"
subcategory: "procesamiento-habla"
---

Una cosa rara: muchos de los modelos que "escuchan" no procesan sonido. Procesan imágenes. El micrófono captura una onda —una tira de números que sube y baja miles de veces por segundo— y antes de que un modelo la toque, la convertimos en una foto. Esa foto es el **espectrograma**, y es uno de los trucos más elegantes del procesamiento del habla.

## De una tira de números a una imagen

Una grabación cruda es una señal en el tiempo: en cada instante, cuánto se mueve la membrana del micrófono. Mirarla así no dice casi nada. ¿Dónde está la "s" de "casa"? ¿Dónde la vocal? Imposible de ver a simple vista.

El paso clave es preguntarse no *qué tan fuerte* suena, sino *qué frecuencias* lo componen. Una vocal es grave y rica en armónicos; una "s" es un siseo de altas frecuencias. La herramienta que descompone una señal en sus frecuencias es la **transformada de Fourier**.

El truco fino: no la aplicamos a todo el audio de una, porque el habla cambia todo el tiempo. La aplicamos a ventanitas de unos 25 milisegundos que se van corriendo. Eso es la *Short-Time Fourier Transform*. El resultado se arma en una grilla:

- **Eje horizontal**: el tiempo.
- **Eje vertical**: las frecuencias, de graves a agudas.
- **Color o brillo**: cuánta energía hay en esa frecuencia en ese momento.

Y listo: el sonido se volvió una imagen.

## Por qué a la red le encanta

Acá aparece lo lindo. Una vez que el audio es una imagen, podés usar todo el arsenal que ya funcionaba para fotos. Las mismas **redes convolucionales** que aprenden a [ver bordes y después conceptos](/ia-agentes/vision/como-ve-una-cnn) en una imagen pueden barrer un espectrograma buscando patrones: una vocal tiene su firma visual, una consonante explosiva otra.

En un espectrograma de voz aparecen las **formantes**: bandas horizontales brillantes que son las resonancias del tracto vocal. La diferencia entre una "i" y una "a" es, literalmente, dónde quedan esas bandas. La red no entiende fonética; aprende a reconocer la textura.

Esto explica por qué tanta tecnología de audio convergió hacia la misma receta. El espectrograma es el formato intermedio que casi nadie nombra pero que está abajo de [Whisper transcribiendo en decenas de idiomas](/ia-agentes/procesamiento-habla/whisper-99-idiomas), de los asistentes de voz y de los detectores de música.

## El detalle que se suele saltear

El espectrograma "crudo" en hertz no es lo que finalmente come la mayoría de los modelos. Nuestro oído no percibe las frecuencias de forma lineal: distinguimos muy bien entre 200 y 300 Hz, pero apenas entre 8000 y 8100 Hz. Por eso se comprime el eje de frecuencias a una escala que imita esa percepción —la escala mel— y de ahí salen las features que se usan en serio, un tema que merece su propia nota sobre [cómo se imita el oído humano con MFCC](/ia-agentes/procesamiento-habla/mfcc-oido-humano).

La moraleja es casi filosófica: a veces el mayor avance no es un modelo más grande, sino **elegir bien la representación**. Convertir un problema de audio en uno de visión no fue un parche; fue la decisión que destrabó todo lo que vino después. El sonido, para que la máquina lo entienda, primero hay que dejarlo ver.
