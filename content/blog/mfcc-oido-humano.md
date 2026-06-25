---
title: "MFCC: cómo se imita el oído humano para extraer features"
date: "2026-04-20"
excerpt: "Por qué el audio para IA se mide en escala mel y no en hertz crudos: tu oído no escucha el sonido como lo grafica un físico."
tags: ["audio", "habla", "curiosidades"]
category: "ia-agentes"
subcategory: "procesamiento-habla"
---

Si tuvieras que describirle un sonido a una máquina, lo lógico sería darle las frecuencias en hertz: tantos ciclos por segundo, tanta intensidad. Suena correcto. Pero durante décadas el reconocimiento de voz no usó eso. Usó algo que imita cómo escuchás vos, no cómo mide un osciloscopio. Esos números se llaman MFCC, y la idea de fondo es preciosa.

## Tu oído no es lineal

Acá está el detalle clave: el oído humano **no percibe las frecuencias de manera pareja**. La diferencia entre 200 Hz y 400 Hz te suena enorme —es como saltar una octava—. Pero la diferencia entre 5.000 Hz y 5.200 Hz, que es la misma cantidad de hertz, apenas la notás.

O sea: somos mucho más finos en los graves que en los agudos. Medir el sonido en hertz crudos le da a la máquina una resolución que tu cerebro no usa, y le esconde la que sí.

## La escala mel: reescalar a oído

La **escala mel** corrige eso. Es una transformación que comprime las frecuencias altas y estira las bajas, de modo que distancias iguales en mels suenen como pasos iguales de tono para un humano. La fórmula más usada es:

```
m = 2595 · log10(1 + f/700)
```

donde `f` está en hertz. Abajo de 700 Hz la relación es casi recta; arriba, logarítmica. Es la misma intuición de modelar el mundo como lo percibimos y no como es: en visión, las CNN aprenden primero bordes y texturas porque [así arma una CNN lo que ve](/ia-agentes/vision/como-ve-una-cnn); en audio, copiamos la cóclea.

## De la imagen del sonido a 13 números

El pipeline clásico para sacar MFCC va más o menos así:

- Partís el audio en ventanitas de ~25 ms y calculás el [espectrograma](/ia-agentes/procesamiento-habla/espectrograma) de cada una.
- Pasás esas frecuencias por un banco de filtros espaciados en escala mel (más juntos abajo, más separados arriba).
- Tomás el logaritmo de la energía de cada filtro —porque también percibimos volumen de forma logarítmica.
- Aplicás una transformada coseno y te quedás con los primeros ~13 coeficientes.

Esos 13 números por ventana son los MFCC. Capturan la *forma* del tracto vocal —qué vocal o consonante estás diciendo— y descartan el resto. Una representación brutalmente compacta de la voz.

## Por qué todavía importan

Hoy los modelos grandes como [Whisper](/ia-agentes/procesamiento-habla/whisper-99-idiomas) muchas veces se comen el espectrograma mel directo y aprenden las features ellos solos, sin pasar por el último paso de los MFCC. Pero la idea sigue viva: antes de aprender, le damos al modelo el sonido visto como lo ve un oído, no como lo grafica un físico. A veces la mejor *feature* no es la más fiel a la realidad, sino la más fiel a cómo la realidad nos llega.
