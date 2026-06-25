---
title: "La ley de Benford: por qué el 1 aparece más y cómo atrapa fraudes"
date: "2026-06-15"
excerpt: "¿Sabías que en muchos conjuntos de números reales el primer dígito es 1 casi un tercio de las veces? Y que esa rareza desenmascara fraudes."
tags: ["estadistica", "probabilidad", "curiosidades"]
category: "data-ml"
subcategory: "estadistica"
---

> Agarrá las cifras de población de los países, los importes de tus facturas o las áreas de los ríos del mundo. Mirá el *primer* dígito de cada número. Uno esperaría que el 1, el 2, ... el 9 aparezcan más o menos lo mismo, ~11% cada uno. No. El 1 aparece un 30% de las veces.

Esto se llama **ley de Benford** (o ley del primer dígito), y es una de esas regularidades que parecen magia hasta que entendés de dónde sale.

## La distribución exacta

La probabilidad de que el primer dígito sea $d$ no es uniforme, sino logarítmica:

$$P(d) = \log_{10}\left(1 + \frac{1}{d}\right)$$

Eso da estos valores:

- **1** → 30,1%
- **2** → 17,6%
- **3** → 12,5%
- ...
- **9** → apenas 4,6%

El 1 aparece casi siete veces más que el 9. La razón intuitiva: para que una magnitud que crece (una cuenta bancaria, una población) pase de 100 a 200 tiene que *duplicarse*, pero para pasar de 900 a 1000 solo necesita crecer un 11%. Pasa mucho más tiempo "empezando con 1". Es una propiedad de las escalas multiplicativas, no de los números en sí.

## Cuándo aplica (y cuándo no)

Benford no vale para cualquier conjunto de números. Funciona cuando los datos:

- Abarcan **varios órdenes de magnitud** (de decenas a millones).
- Surgen de procesos multiplicativos o de combinar muchas fuentes.
- No tienen mínimos/máximos artificiales (alturas humanas en cm no cumplen; precios de productos sí).

Verificar si un dataset cumple Benford es, en el fondo, un ejercicio de [mirar la forma de la distribución antes de modelar nada](/data-ml/eda/anscombe-cuarteto): el resumen numérico no alcanza, hay que ver el patrón completo.

## El uso forense

Acá viene lo interesante. Cuando una persona **inventa** números —para inflar gastos, falsear un balance o trucar una elección— tiende a distribuir los primeros dígitos de forma demasiado pareja, porque su intuición le dice que "deberían ser aleatorios". Y al hacerlo, viola Benford.

```python
import numpy as np
from collections import Counter

def primer_digito(x):
    return int(str(abs(x)).lstrip("0.")[0])

digitos = [primer_digito(v) for v in valores if v != 0]
frecuencias = Counter(digitos)
# Comparar contra log10(1 + 1/d) con un test chi-cuadrado
```

Se usó en casos reales de auditoría contable y para señalar irregularidades en datos electorales y económicos. **Importante**: Benford no *prueba* el fraude, solo levanta una bandera. Es un detector de anomalías estadísticas, con la misma lógica que [un Isolation Forest que aísla lo raro con pocas preguntas](/data-ml/deteccion-anomalias/isolation-forest): señala dónde mirar, no condena.

## El cierre práctico

Lo que me fascina de Benford es que es **contraintuitivo y a la vez explicable**. Igual que la [paradoja del cumpleaños](/data-ml/estadistica/paradoja-cumpleanos), te recuerda que la intuición sobre "lo aleatorio" suele estar mal calibrada.

Si trabajás con datos financieros o de logs, probá graficar la distribución del primer dígito. Si te aparece sospechosamente plana donde debería caer en escalera, algo raro está pasando —y vale la pena seguir preguntando, ojo de no caer en [confundir el ruido con la señal de un falso positivo](/data-ml/deteccion-anomalias/costo-falsos-positivos).
