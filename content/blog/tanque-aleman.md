---
title: "El problema del tanque alemán: estimar producción enemiga con números de serie"
date: "2026-06-13"
excerpt: "¿Sabías que en la WWII los Aliados estimaron cuántos tanques fabricaban los alemanes mirando los números de serie de los capturados? Y acertaron."
tags: ["estadistica", "probabilidad", "curiosidades"]
category: "data-ml"
subcategory: "estadistica"
---

> Segunda Guerra Mundial. Los Aliados necesitan saber cuántos tanques Panther produce Alemania por mes. La inteligencia tradicional da números altísimos. Pero un puñado de estadísticos propone otra cosa: mirar los números de serie de las cajas de cambio y las ruedas de los tanques capturados. El resultado fue asombrosamente preciso.

Este es el **problema del tanque alemán**, uno de los casos más elegantes de estadística aplicada con consecuencias reales.

## El planteo

Si los tanques se numeran 1, 2, 3, ..., N de forma secuencial, y capturás una muestra de ellos, ¿cómo estimás N (la producción total) viendo solo los números de serie de los que tenés?

La tentación es responder "el número más alto que vi". Pero eso casi siempre **subestima**: es improbable que justo hayas capturado el último tanque fabricado. Hace falta corregir ese sesgo.

## El estimador insesgado

La solución es un estimador hermoso. Si $m$ es el número de serie máximo observado y $k$ la cantidad de tanques en tu muestra:

$$\hat{N} = m + \frac{m}{k} - 1$$

La idea intuitiva: el máximo observado más el "hueco promedio" esperado entre el máximo real y el que viste. Cuantos más tanques captures (k mayor), más chico es ese hueco y más confiás en el máximo. Es un estimador **insesgado**: en promedio, da en el clavo, sin inclinarse sistemáticamente para arriba ni para abajo.

```python
def estimar_produccion(numeros_serie):
    m = max(numeros_serie)
    k = len(numeros_serie)
    return m + m / k - 1

estimar_produccion([12, 47, 83, 102, 60])  # ~121.4
```

## La validación histórica

Lo notable es que después de la guerra, al acceder a los registros reales de producción alemana, los números encajaron de forma escalofriante. Para algunos meses:

- **Estimación de inteligencia tradicional** (espías, fotos aéreas): ~1.400 tanques/mes.
- **Estimación estadística** (números de serie): ~250/mes.
- **Cifra real de los registros**: ~245/mes.

La estadística le ganó por goleada a la inteligencia clásica. Toda esa precisión salió de mirar bien una muestra pequeña —el mismo espíritu de [aprender mucho de pocos ejemplos cuando la estructura del problema ayuda](/data-ml/transfer-learning/few-shot).

## La lección que sigue vigente

Este caso enseña tres cosas que uso seguido:

1. **El máximo de una muestra es un estimador sesgado**: casi siempre te quedás corto. Hay que corregir.
2. **Una muestra chica bien usada vence a mucho ruido**: igual que en [la paradoja del cumpleaños, donde pocos elementos esconden mucha información](/data-ml/estadistica/paradoja-cumpleanos), la cantidad de datos importa menos que entender el proceso que los generó.
3. **Mirar los datos "secundarios" paga**: los números de serie eran metadata que nadie consideraba. Es la misma actitud que descubre patrones en [lo que los valores faltantes te están gritando](/data-ml/eda/valores-faltantes-gritan).

## El cierre práctico

La próxima vez que tengas una muestra y quieras estimar un total —usuarios totales a partir de IDs, tirada de una imprenta a partir de seriales—, no uses el máximo crudo. Corregilo. Y desconfiá del que estima sin entender cómo se generan los números: ese error es primo hermano de [enamorarse de un p-valor sin saber qué mide](/data-ml/estadistica/p-valor-malentendido).
