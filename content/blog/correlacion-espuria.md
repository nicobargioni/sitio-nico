---
title: "Correlaciones espurias: el queso, las sábanas y los doctorados"
date: "2026-06-17"
excerpt: "Dos series pueden correlacionar al 99% por pura casualidad. Por qué una correlación altísima no prueba absolutamente nada."
tags: ["eda", "datos", "curiosidades"]
category: "data-ml"
subcategory: "eda"
---

> El consumo de queso per cápita en Estados Unidos correlaciona casi perfectamente con la cantidad de personas que mueren enredadas en sus sábanas.

Suena a chiste, pero el dato es real y famoso. Lo popularizó Tyler Vigen en su proyecto *Spurious Correlations*, donde junta pares de series temporales que se mueven casi idénticas y no tienen absolutamente nada que ver: divorcios en Maine y consumo de margarina, ahogamientos en piscinas y películas de Nicolas Cage, doctorados en ingeniería y consumo de mozzarella. Coeficientes de correlación de 0,99 entre cosas que jamás se causaron una a la otra.

## Por qué pasa esto

Hay tres mecanismos detrás de casi todas las correlaciones espurias:

- **Tendencias compartidas.** Muchísimas cosas crecen con el tiempo: la población, el consumo, el PBI. Dos series que simplemente *suben* a lo largo de los años van a correlacionar altísimo aunque sean independientes. No comparten causa: comparten calendario.
- **Multiplicidad.** Si comparás miles de series entre sí, la combinatoria garantiza que **algunas** van a coincidir por azar. Vigen no buscó el queso y las sábanas a mano: dejó que un algoritmo rastreara millones de pares hasta encontrar los que se veían espectaculares.
- **Variable de confusión.** A veces hay una tercera causa real (el clima, la estación, la economía) que mueve a las dos a la vez sin que una cause a la otra.

## La trampa estadística del azar

Si testeás suficientes hipótesis, encontrar una "significativa" por puro azar deja de ser improbable y pasa a ser casi seguro. Es el problema de las comparaciones múltiples: con un umbral del 5%, de cada 20 correlaciones sin sentido que pruebes, **una va a dar significativa de casualidad**.

Por eso una correlación altísima, sola, no prueba nada. Necesita un mecanismo plausible, idealmente planteado *antes* de mirar los datos, no pescado después entre millones de candidatos. Esta es exactamente la misma trampa que se esconde detrás de [lo que un p-valor NO significa](/data-ml/estadistica/p-valor-malentendido): un valor chiquito no garantiza que el efecto sea real si lo encontraste rastreando a ciegas.

```python
import numpy as np
# Dos series puramente aleatorias, pero con tendencia creciente
t = np.arange(100)
a = t + np.random.normal(0, 5, 100)
b = t + np.random.normal(0, 5, 100)
np.corrcoef(a, b)[0, 1]   # ≈ 0,98 — y son independientes
```

Quitá la tendencia (trabajá con las diferencias entre períodos) y la correlación se desploma. La señal era el calendario, no la relación.

## Tres reglas para no caer

Correlación no es causalidad: lo escuchaste mil veces. La parte que sirve en el día a día es más concreta:

- **Una correlación grande puede ser pura casualidad**, sobre todo si las series tienen tendencia o si la pescaste entre muchas.
- **Detrendeá las series temporales** antes de correlacionarlas, o vas a confundir "crecen juntas" con "se relacionan".
- **Exigí un mecanismo.** Si no podés contar por qué A causaría B (o qué tercera variable las mueve), tratá la correlación como sospechosa.

Es la misma desconfianza sana que enseña [el cuarteto de Anscombe](/data-ml/eda/anscombe-cuarteto) sobre los números resumen, y la que necesitás frente a [la paradoja de Simpson](/data-ml/eda/paradoja-simpson), donde una correlación entera cambia de signo según cómo agrupes. Y antes de creerle a cualquier patrón, vale recordar que con suficientes intentos hasta [el azar dibuja figuras convincentes](/data-ml/eda/datasaurio-docena). El dato te muestra el qué; el mecanismo te dice si vale la pena creerle.
