---
title: "El cuarteto de Anscombe: cuatro datasets idénticos en los números, opuestos en el gráfico"
date: "2026-06-21"
excerpt: "Cuatro conjuntos de datos con la misma media, varianza y correlación que se ven completamente distintos al graficarlos."
tags: ["eda", "datos", "curiosidades"]
category: "data-ml"
subcategory: "eda"
---

> Podés tener cuatro datasets con exactamente la misma media, la misma varianza, la misma correlación y hasta la misma recta de regresión, y que aun así no se parezcan en nada.

Eso es justo lo que armó el estadístico Francis Anscombe en 1973. Y lo hizo a propósito: quería demostrarle al mundo, en una época en que graficar era caro y poco frecuente, que mirar solo los números resumen te puede engañar feo.

## Los cuatro gemelos estadísticos

El cuarteto de Anscombe son cuatro pares de variables (x, y), once puntos cada uno. Si te sentás a calcular, vas a encontrar que comparten casi todo:

- Media de x = 9, en los cuatro.
- Media de y = 7,5 (con redondeo), en los cuatro.
- Varianza de x = 11; varianza de y ≈ 4,12.
- Correlación de Pearson ≈ 0,816.
- La misma recta de regresión: aproximadamente **y = 3 + 0,5x**.

Un reporte automático que solo escupiera esas métricas concluiría que los cuatro datasets son intercambiables. Y estaría completamente equivocado.

## Lo que aparece al graficar

Cuando los dibujás, la historia se desarma:

1. **El primero** es una nube ruidosa pero honesta: una relación lineal con dispersión normal. El caso para el que la regresión fue diseñada.
2. **El segundo** es una curva clarísima. La relación existe, pero es no lineal. Forzarle una recta es absurdo.
3. **El tercero** es una línea casi perfecta arruinada por un único outlier que tira la pendiente hacia él.
4. **El cuarto** es el más tramposo: todos los puntos comparten el mismo valor de x salvo uno, y ese punto solitario es el que inventa toda la correlación.

Cuatro mecanismos generadores totalmente distintos, comprimidos en un mismo puñado de estadísticos. El resumen no miente, pero tampoco te cuenta lo que importa.

## Por qué esto sigue importando hoy

Anscombe escribió esto hace medio siglo, pero el problema no caducó: se agravó. Hoy generamos features y métricas a escala industrial, y la tentación de saltar directo al modelo es enorme. Por eso vale repetirlo: **graficá antes de modelar**. Un scatter plot de dos minutos te ahorra semanas peleándole a un modelo que nunca iba a funcionar porque la relación no era lineal o porque un outlier dominaba todo.

La versión moderna y aún más espectacular de esta idea es [el Datasaurio, doce datasets que esconden un dinosaurio](/data-ml/eda/datasaurio-docena) detrás de las mismas estadísticas. Y el primo conceptual, donde agregar datos invierte la conclusión, es [la paradoja de Simpson](/data-ml/eda/paradoja-simpson).

Reproducirlo es trivial, porque seaborn ya trae el dataset:

```python
import seaborn as sns
df = sns.load_dataset("anscombe")
sns.lmplot(data=df, x="x", y="y", col="dataset", col_wrap=2)
```

Cuatro paneles, una misma recta, cuatro realidades distintas.

## El resumen comprime, y comprimir pierde

El número resumen es una **compresión con pérdida**: te da una foto, pero descarta la forma. Antes de confiar en una correlación, un promedio o una pendiente, mirá la distribución con tus propios ojos. Lo mismo aplica cuando ya estás más adentro del pipeline: una correlación altísima puede ser [pura casualidad sin causa](/data-ml/eda/correlacion-espuria), y hasta lo que falta en tus datos suele estar [tratando de decirte algo](/data-ml/eda/valores-faltantes-gritan). Si esa intuición visual te interesa de raíz, vale la pena entender también qué es [lo que un p-valor NO significa](/data-ml/estadistica/p-valor-malentendido), porque ahí se esconde la misma trampa: confiar en un número sin mirar de dónde viene.
