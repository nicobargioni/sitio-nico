---
title: "La paradoja de Simpson: cuando una tendencia se da vuelta al juntar los datos"
date: "2026-06-19"
excerpt: "Una tendencia clara en cada grupo puede invertirse al sumar todos los datos. El caso de Berkeley lo hizo famoso."
tags: ["eda", "datos", "curiosidades"]
category: "data-ml"
subcategory: "eda"
---

> Una universidad puede admitir, dentro de cada carrera, a un porcentaje mayor de mujeres que de hombres, y aun así parecer que discrimina a las mujeres en el total.

No es un error de cuentas. Es la **paradoja de Simpson**: una relación que se cumple en cada subgrupo puede invertirse cuando juntás todos los datos en una sola tabla.

## El caso de Berkeley

El ejemplo clásico es real. En 1973, la Universidad de Berkeley parecía tener un sesgo de género en sus admisiones de posgrado: alrededor del 44% de los hombres que aplicaron fueron admitidos, contra cerca del 35% de las mujeres. A primera vista, un caso cerrado.

Pero cuando los estadísticos —el análisis lo publicó Bickel y colegas en *Science*— miraron carrera por carrera, el panorama se dio vuelta. En la mayoría de los departamentos las mujeres eran admitidas a una tasa **igual o mayor** que los hombres. ¿Cómo puede ser?

La clave era una variable escondida: **a qué carrera aplicaba cada uno**. Las mujeres tendían a postularse a departamentos muy competitivos, con tasas de admisión bajísimas para todos. Los hombres se concentraban en carreras con más cupos. El total agregado mezclaba peras con manzanas: no comparaba la tasa de admisión por género, sino la dificultad promedio de las carreras que cada grupo elegía.

## Por qué pasa

La paradoja aparece cuando una **variable de confusión** (acá, la carrera) está correlacionada tanto con el grupo como con el resultado. Si pesa distinto en cada subgrupo, el promedio total queda dominado por esa distribución desigual y no por el efecto que querés medir.

En términos simples: un promedio de promedios no es lo mismo que el promedio del todo cuando los grupos tienen tamaños muy distintos. El truco es que el agregado le da más peso al grupo más numeroso, y ese peso puede arrastrar la conclusión hacia el lado contrario.

```python
# Misma data, dos lecturas opuestas
df.groupby("genero")["admitido"].mean()                 # mujeres < hombres
df.groupby(["carrera", "genero"])["admitido"].mean()    # mujeres >= hombres
```

## El peligro real: la dirección de la conclusión

Lo inquietante de Simpson no es matemático, es de criterio. Tanto agregar como desagregar te dan un número correcto; el problema es cuál responde a tu pregunta. ¿Querés saber si una carrera concreta discrimina? Mirá por carrera. ¿Querés saber por qué entran menos mujeres en total? La respuesta puede estar en qué carreras eligen, no en un sesgo de admisión.

No hay una regla mecánica que te diga "siempre desagregá" o "siempre agregá". Depende de qué causa querés aislar. Por eso esta paradoja es prima hermana de la lección del [cuarteto de Anscombe](/data-ml/eda/anscombe-cuarteto): los números resumen ocultan la estructura, y acá la estructura es un grupo que el promedio aplastó. La misma trampa de "confiá en el agregado" reaparece cuando dos series parecen moverse juntas en [correlaciones espurias](/data-ml/eda/correlacion-espuria) sin ninguna causa común.

## Tres reflejos para no caer

- **Desconfiá de los promedios globales** sobre poblaciones heterogéneas. Preguntá siempre: ¿qué subgrupos estoy mezclando?
- **Buscá la variable de confusión.** Si una tendencia te sorprende, casi siempre hay una tercera variable repartida de forma desigual.
- **La pregunta define el corte.** Antes de agrupar o desagrupar, definí qué efecto causal querés medir.

Esta misma humildad ante los números agregados es la que conviene tener cuando alguien te muestra [un p-valor como si fuera una prueba](/data-ml/estadistica/p-valor-malentendido): el dato puede ser correcto y la conclusión, igual, estar dada vuelta.
