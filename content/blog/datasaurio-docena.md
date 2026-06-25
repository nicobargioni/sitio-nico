---
title: "El Datasaurio: doce datasets con la misma estadística que esconden un dinosaurio"
date: "2026-06-20"
excerpt: "Doce nubes de puntos absurdamente distintas comparten media, desvío y correlación. Una incluso dibuja un dinosaurio."
tags: ["eda", "datos", "curiosidades"]
category: "data-ml"
subcategory: "eda"
---

> Existe un dataset que, graficado, dibuja un dinosaurio, y que comparte exactamente las mismas estadísticas que una estrella, una equis y una nube de puntos al azar.

Si el [cuarteto de Anscombe](/data-ml/eda/anscombe-cuarteto) te voló la cabeza con cuatro datasets engañosos, esperá a conocer su versión moderna y descaradamente más divertida: el **Datasaurus Dozen**.

## Del dinosaurio a la docena

Empezó con un chiste serio. El estadístico Alberto Cairo publicó en 2016 un dataset con forma de dinosaurio (el "Datasaurus") cuyas medias y desvíos coincidían con los de una nube aparentemente normal. La gracia: las estadísticas resumen no detectaban al dinosaurio.

Justin Matejka y George Fitzmaurice, de Autodesk Research, llevaron la idea más lejos en un paper de 2017. Diseñaron un algoritmo que, partiendo del dinosaurio, **deformaba los puntos de a poquito** —empujándolos hacia una forma objetivo— pero rechazando cualquier movimiento que alterara las estadísticas más allá de dos decimales. Es un recocido simulado (*simulated annealing*) con una restricción dura: mové los puntos hacia la estrella, hacia las líneas, hacia el círculo, pero nunca toques la media ni el desvío.

El resultado son doce datasets —el dino, círculos, líneas, una estrella, una equis, rayas verticales— que comparten, hasta el segundo decimal:

- Media de x ≈ 54,26 y media de y ≈ 47,83.
- Desvío estándar de x ≈ 16,76 y de y ≈ 26,93.
- Correlación de Pearson ≈ −0,06.

Doce dibujos completamente distintos. Una misma fila de números.

## La trampa que esto expone

Lo que hace tan didáctico al Datasaurio es que ataca a la **correlación de Pearson** en su punto débil: solo mide relación lineal. Una correlación de −0,06 te dice "no hay relación lineal", y es verdad. Pero hay un dinosaurio. La ausencia de señal lineal no es ausencia de estructura.

Esto conecta con un sesgo cognitivo nuestro: confiamos en el resumen porque es cómodo. Una tabla con media y desvío entra en un slide; una nube de 142 puntos, no. Pero la comodidad del resumen es justo donde se cuela el error.

```python
# pip install datasaurus  (o usá el CSV original de Autodesk)
import pandas as pd, seaborn as sns
df = pd.read_csv("datasaurus.csv")
print(df.groupby("dataset")[["x", "y"]].agg(["mean", "std"]))  # casi idénticos
sns.relplot(data=df, x="x", y="y", col="dataset", col_wrap=4, height=2)  # un zoológico
```

## Tres ideas para tu trabajo diario

El Datasaurio es una vacuna contra la fe ciega en los estadísticos resumen. Lo que conviene tener a mano:

- **Graficá siempre.** Un panel de scatter plots cuesta dos minutos y revela formas que ningún `describe()` va a mostrar.
- **Pearson no lo es todo.** Si sospechás relaciones no lineales, mirá la nube o probá medidas como la correlación de distancia.
- **El promedio aplana.** Tené el mismo recelo cuando agregás grupos: ahí es donde aparece [la paradoja de Simpson](/data-ml/eda/paradoja-simpson), que invierte tendencias enteras al juntar los datos.

Esta desconfianza sana hacia los números sueltos es la misma que te conviene tener frente a [correlaciones espurias que parecen señal pero son casualidad](/data-ml/eda/correlacion-espuria), o frente a [un p-valor que casi nadie interpreta bien](/data-ml/estadistica/p-valor-malentendido). En todos los casos, el patrón es idéntico: el número te tienta a saltear la mirada, y la mirada es donde está la verdad.
