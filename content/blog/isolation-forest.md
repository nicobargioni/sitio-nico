---
title: "Isolation Forest: aislar lo anómalo en pocas preguntas"
date: "2026-05-21"
excerpt: "La idea más elegante de la detección de anomalías: lo raro se separa del resto con muchas menos preguntas que lo normal."
tags: ["anomalias", "ml", "curiosidades"]
category: "data-ml"
subcategory: "deteccion-anomalias"
---

La mayoría de los métodos para detectar anomalías empiezan por lo difícil: primero modelar qué es "normal" —el centro de los datos, su densidad, su forma— y recién después marcar lo que se aleja. El Isolation Forest, propuesto por Liu, Ting y Zhou en 2008, da vuelta el problema con una idea casi tramposa de simple: en vez de describir lo normal, intentá *aislar* cada punto. Y resulta que lo raro se aísla mucho más rápido.

## El juego de las veinte preguntas

Imaginate que jugás a adivinar un número partiendo el rango al azar. Si el número que busco es uno cualquiera del montón, voy a necesitar muchos cortes para separarlo de sus vecinos: está rodeado, hay otros parecidos por todos lados. Pero si el número es un extremo solitario —un valor altísimo que nadie más tiene— con dos o tres cortes al azar ya queda solo.

Esa es toda la intuición. El algoritmo construye muchos árboles partiendo el espacio con cortes aleatorios, y para cada punto cuenta **cuántos cortes hizo falta para aislarlo**. Los puntos normales, apretados en zonas densas, requieren caminos largos hasta la hoja. Las anomalías, que viven en zonas vacías, caen en pocos pasos. El score de anomalía es básicamente eso: profundidad corta promedio = sospechoso.

```python
from sklearn.ensemble import IsolationForest

modelo = IsolationForest(contamination=0.01, random_state=42)
modelo.fit(X)                 # no necesita etiquetas
scores = modelo.decision_function(X)   # más bajo = más anómalo
es_anomalia = modelo.predict(X) == -1
```

## Por qué es tan práctico

Hay tres cosas que lo hacen un caballito de batalla:

- **No necesita etiquetas.** Es no supervisado: no le tenés que mostrar ejemplos de la anomalía, cosa que casi nunca tenés. Esto lo vuelve ideal para los [cisnes negros](/data-ml/deteccion-anomalias/cisne-negro), esos eventos rarísimos de los que justamente no hay casos previos para aprender.
- **Es liviano y rápido.** No calcula distancias entre todos los puntos ni estima densidades caras. Construir árboles con cortes al azar escala lindo, incluso a millones de filas.
- **No asume una forma de los datos.** No te exige que lo normal sea una bolita gaussiana. Funciona con distribuciones raras.

El parámetro que más vas a tocar es `contamination`: tu estimación de qué proporción de los datos esperás que sea anómala. No es un detalle técnico inocente —es donde metés tu hipótesis de negocio.

## Las letras chicas

Tiene su talón de Aquiles. En muchas dimensiones, el método sufre el mismo problema que casi todos: cuando hay cientos de features, las nociones de "cerca" y "lejos" se diluyen y los cortes al azar pierden filo. Es la [maldición de la dimensionalidad](/data-ml/clustering-pca/maldicion-dimensionalidad), y conviene reducir variables antes de tirarle todo.

Además, el Isolation Forest te dice *qué* punto es raro, no *por qué* ni *cuánto cuesta* ignorarlo o tratarlo. Un score alto no es una decisión: marcar algo como anomalía y actuar tiene un precio, y afinar el umbral es un problema de negocio que vale la pena pensar aparte, como discuto en [el costo de los falsos positivos](/data-ml/deteccion-anomalias/costo-falsos-positivos).

Lo que me encanta del Isolation Forest es que es contraintuitivo y honesto a la vez: en vez de pelear por entender la complejidad de lo normal, apuesta a que lo anómalo, por estar solo, se delata. A veces la mejor idea es la que se anima a dar vuelta la pregunta.
