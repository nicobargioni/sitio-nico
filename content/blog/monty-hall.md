---
title: "Monty Hall: por qué cambiar de puerta duplica tus chances"
date: "2026-06-14"
excerpt: "En el problema de las tres puertas, cambiar de elección te lleva de 1/3 a 2/3 de ganar. El acertijo que enfureció a los matemáticos."
tags: ["estadistica", "probabilidad", "curiosidades"]
category: "data-ml"
subcategory: "estadistica"
---

> Hay tres puertas. Detrás de una hay un auto; detrás de las otras dos, una cabra. Elegís la puerta 1. El presentador, que sabe dónde está el auto, abre la puerta 3 y muestra una cabra. Entonces te pregunta: ¿querés quedarte con la 1 o cambiarte a la 2? La respuesta correcta —cambiar— sigue generando peleas.

Es el **problema de Monty Hall**, bautizado por el conductor del programa *Let's Make a Deal*. Cuando Marilyn vos Savant publicó la respuesta correcta en 1990, recibió miles de cartas indignadas, varias de matemáticos con doctorado, asegurando que estaba equivocada. No lo estaba.

## La trampa de la intuición

La mayoría razona así: "quedan dos puertas, el auto está detrás de una, son 50 y 50, da igual". Suena impecable. Y está mal.

El error es ignorar **quién** abre la puerta y **qué sabe**. El presentador no abre una puerta al azar: siempre abre una con cabra, y nunca la que elegiste. Esa acción no es neutral, te está dando información. Pasar por alto la fuente de la información es el mismo descuido que en [la paradoja del cumpleaños](/data-ml/estadistica/paradoja-cumpleanos), donde la cabeza resuelve una pregunta distinta de la real.

## La cuenta condicional

Pensalo desde el primer instante:

- Cuando elegiste, tenías **1/3** de chance de haber acertado el auto.
- Eso significa **2/3** de chance de haberte equivocado (el auto está en una de las otras dos).

Esa probabilidad de 2/3 **no desaparece** cuando Monty abre una puerta. Como él descarta una cabra de ese grupo de dos puertas, toda la masa de probabilidad 2/3 se concentra en la única puerta que queda sin abrir. Por eso cambiar gana 2/3 de las veces y quedarse, solo 1/3.

Si no te convence el argumento, convencelo a la fuerza con una simulación:

```python
import random

def jugar(cambiar):
    auto = random.randint(1, 3)
    eleccion = random.randint(1, 3)
    # Monty abre una puerta con cabra que no elegiste
    abre = next(p for p in (1, 2, 3) if p != eleccion and p != auto)
    if cambiar:
        eleccion = next(p for p in (1, 2, 3) if p != eleccion and p != abre)
    return eleccion == auto

n = 100_000
print(sum(jugar(True)  for _ in range(n)) / n)  # ~0.667
print(sum(jugar(False) for _ in range(n)) / n)  # ~0.333
```

La simulación zanja la discusión sin álgebra. De hecho, **simular para confirmar la intuición** es una de las herramientas más honestas que tenemos, mucho más que pelearse con un [p-valor que casi nadie interpreta como corresponde](/data-ml/estadistica/p-valor-malentendido).

## Por qué importa más allá del juego

Monty Hall es un caso de manual de **probabilidad condicional**: cómo actualizar creencias cuando llega información nueva. Esa misma maquinaria —el teorema de Bayes— está detrás de los filtros de spam, los diagnósticos médicos y los sistemas de [detección de fraude donde un caso entre mil es todo lo que importa](/data-ml/deteccion-anomalias/fraude-desbalance). Confundir "probabilidad a priori" con "probabilidad actualizada" es un error caro en cualquiera de esos dominios.

## Cuando alguien que sabe actúa

**Cuando alguien con información actúa, esa acción es un dato.** Antes de concluir que dos opciones son equiprobables, preguntate si alguien que sabe más que vos hizo algo para llegar ahí. En las puertas —y en los negocios— eso lo cambia todo.
