---
title: "Reglas de asociación: soporte, confianza y lift sin misterio"
date: "2026-05-16"
excerpt: "Tres métricas asustan a más gente de la que deberían. Con un changuito de supermercado se entienden en cinco minutos."
tags: ["mineria", "patrones", "curiosidades"]
category: "data-ml"
subcategory: "mineria-de-datos"
---

Toda regla de asociación se escribe igual: **{A} → {B}**, que se lee "quien lleva A tiende a llevar B". Pan tostado → mermelada. El problema es que con miles de productos hay millones de reglas posibles, y casi todas son basura. Las tres métricas que separan lo útil del ruido son soporte, confianza y lift. Y se entienden con el changuito del super, sin álgebra.

## Soporte: ¿esto pasa lo suficiente?

El **soporte** es qué tan frecuente es la combinación en el total de tickets. Si de 10.000 compras, 300 incluyen pan y mermelada juntos, el soporte de esa regla es 300/10.000 = 0,03, o sea 3%.

¿Para qué sirve? Para descartar lo anecdótico. Una regla con soporte de 0,0001% puede ser perfecta en confianza, pero describe a tres clientes raros. No vas a rediseñar la góndola por tres personas. El soporte es el filtro de "¿esto es un patrón o una curiosidad?".

## Confianza: si llevó A, ¿cuán seguro lleva B?

La **confianza** es la probabilidad de B dado que ya tenés A en el changuito. Se calcula así:

```
confianza(A → B) = soporte(A y B) / soporte(A)
```

Si el 80% de los que compran pan también compran mermelada, la confianza de {pan} → {mermelada} es 0,8. Suena fuerte. Pero tiene una trampa enorme: **ignora qué tan común es B por sí solo**. Si el 80% de *todos* los clientes compra mermelada (con o sin pan), entonces el pan no aportó nada. La confianza alta era pura inflación. Para eso existe la tercera métrica.

## Lift: ¿A y B se atraen, o solo coinciden?

El **lift** corrige justo ese punto. Compara la confianza real contra lo que esperarías si A y B fueran independientes:

```
lift(A → B) = confianza(A → B) / soporte(B)
```

La lectura es directa:

- **Lift = 1**: A y B son independientes. Que lleves uno no dice nada sobre el otro.
- **Lift > 1**: se atraen. Llevar A hace *más* probable llevar B. Lift de 3 = tres veces más probable que el azar.
- **Lift < 1**: se repelen. Quien lleva A tiende a *no* llevar B.

El lift es el que de verdad mide asociación. Y acá conecta con algo que ya conté: la famosa regla de [pañales y cerveza](/data-ml/mineria-de-datos/panales-cerveza) era impactante como anécdota, pero su lift real era modesto. El relato exageró lo que el número decía con timidez.

## El orden mental correcto

Cuando mirás reglas, el flujo sano es:

1. **Soporte** primero: ¿pasa lo suficiente como para importar?
2. **Confianza** después: ¿qué tan fiable es la implicación?
3. **Lift** al final: ¿hay atracción real o es coincidencia?

Saltearse el lift es el error más común, y es primo del [sesgo del superviviente](/data-ml/mineria-de-datos/sesgo-superviviente): mirás lo que confirma tu intuición e ignorás la línea de base. Una vez que tenés las tres métricas claras, lo que sigue es entender [cómo los algoritmos encuentran estas reglas sin que explote la combinatoria](/data-ml/mineria-de-datos/apriori-vs-fpgrowth) y, sobre todo, recordar que [esto describe patrones, no predice el futuro](/data-ml/mineria-de-datos/mineria-vs-ml).

Tres números, un changuito. El misterio era marketing.
