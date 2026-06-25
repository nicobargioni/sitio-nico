---
title: "Lo que un p-valor NO significa (y casi todos creen que sí)"
date: "2026-06-12"
excerpt: "Un p-valor de 0,03 no quiere decir que haya 97% de chances de que tu hipótesis sea verdadera. El malentendido estadístico más caro, explicado."
tags: ["estadistica", "probabilidad", "curiosidades"]
category: "data-ml"
subcategory: "estadistica"
---

> Te corrés un experimento, sale p = 0,03, y celebrás: "¡hay 97% de probabilidad de que mi hipótesis sea cierta!". Casi todo el que dice eso —incluso gente con formación científica— está equivocado. El p-valor no significa nada parecido a eso.

El p-valor es probablemente el concepto más malinterpretado de toda la estadística. Y como sostiene buena parte de la ciencia publicada, vale la pena entenderlo bien.

## Qué es, en realidad

La definición correcta, sin atajos:

> El p-valor es la probabilidad de observar datos **al menos tan extremos** como los que viste, **suponiendo que la hipótesis nula es verdadera**.

En símbolos: $P(\text{datos} \mid H_0)$. Notá el orden. Es la probabilidad de los *datos dado que H₀ es cierta*, no la probabilidad de que H₀ (o tu hipótesis) sea cierta dados los datos. Invertir esa condicional es exactamente el error que vuelve [el problema de Monty Hall tan contraintuitivo](/data-ml/estadistica/monty-hall): confundir $P(A \mid B)$ con $P(B \mid A)$.

## Los cuatro malentendidos clásicos

Lo que un p-valor de 0,03 **NO** significa:

1. **NO** es la probabilidad de que la hipótesis nula sea verdadera.
2. **NO** es la probabilidad de que tu resultado se deba al azar.
3. **NO** mide el tamaño ni la importancia del efecto. Un efecto trivial puede dar p chiquito con una muestra enorme.
4. **NO** garantiza que el resultado se replique. Un p = 0,049 es frágil como el papel.

Un p-valor bajo solo dice: "si no pasara nada, sería raro ver estos datos". Punto. Si el efecto es relevante para el negocio o para la vida es otra pregunta, que el p-valor no contesta —igual que [una correlación fuerte no implica una relación real](/data-ml/eda/correlacion-espuria).

## El p-hacking: el pecado capital

Este es el daño de verdad. El umbral mágico de 0,05 crea un incentivo perverso: si torturás los datos lo suficiente, *algo* va a dar significativo. Esto es el **p-hacking**, y tiene muchas caras:

- Probar 20 variables y reportar solo la que dio p < 0,05 (con 20 tests independientes, esperás ~1 falso positivo por puro azar).
- Frenar de recolectar datos justo cuando cruzás el umbral.
- Probar muchos subgrupos hasta que alguno "funcione".

```python
import numpy as np
from scipy import stats

# 20 variables SIN ningún efecto real
np.random.seed(0)
for i in range(20):
    a, b = np.random.randn(30), np.random.randn(30)
    _, p = stats.ttest_ind(a, b)
    if p < 0.05:
        print(f"Variable {i}: p={p:.3f} ¡'significativo'! (y es puro ruido)")
```

Corré eso y casi seguro vas a ver al menos un falso positivo. Buscar entre muchas opciones hasta que una "salte" es el mismo mecanismo por el que aparecen [coincidencias improbables en la paradoja del cumpleaños](/data-ml/estadistica/paradoja-cumpleanos): con suficientes intentos, lo raro se vuelve esperable.

## Cómo no caer

Algunas defensas concretas:

- **Reportá el tamaño del efecto y su intervalo de confianza**, no solo el p-valor.
- **Preregistrá** la hipótesis y el análisis antes de mirar los datos.
- **Corregí por comparaciones múltiples** (Bonferroni, FDR) cuando hacés muchos tests.
- Tratá un resultado único como una pista, no como una verdad. La replicación es la que manda.

## Cómo leerlo sin tropezar

El p-valor es una herramienta útil mal contada. No zanja nada por sí solo: es una señal de alarma, y conviene leerlo con la misma humildad con la que se lee [una alerta de detección de anomalías antes de actuar](/data-ml/deteccion-anomalias/costo-falsos-positivos). Cuando veas "p < 0,05" en un informe, preguntá dos cosas: ¿cuántos tests corrieron antes de este?, y ¿de qué tamaño es el efecto? Eso es lo que el p-valor solo no te cuenta.
