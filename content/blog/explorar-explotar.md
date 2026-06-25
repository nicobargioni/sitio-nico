---
title: "Explorar vs explotar: el dilema del bandido de varios brazos"
date: "2026-05-26"
excerpt: "Tenés diez tragamonedas y plata para cien tiradas. ¿Apostás a la que más pagó o probás las otras? Ese dilema está en el corazón de todo el RL."
tags: ["reinforcement-learning", "rl", "curiosidades"]
category: "data-ml"
subcategory: "reinforcement-learning"
---

Imaginate parado frente a diez tragamonedas. Cada una paga con una probabilidad distinta que vos no conocés. Tenés cien tiradas y nada más. Tirás tres veces en la máquina 4 y te paga dos. ¿Qué hacés con las 97 que te quedan? ¿Seguís en la 4, que viene buena, o probás las otras nueve por si alguna es mejor?

Eso es todo. Ese es el **problema del bandido de varios brazos** (*multi-armed bandit*, porque a las tragamonedas se las llamaba "bandidos de un brazo"). Y aunque suena a curiosidad de casino, es la versión más pura del trade-off que atraviesa absolutamente todo el aprendizaje por refuerzo: **explorar vs explotar**.

## Las dos tentaciones

- **Explotar** es quedarte con lo que ya sabés que funciona. Sacás el jugo a la mejor opción *conocida*. El riesgo: te perdés algo mejor que nunca probaste.
- **Explorar** es probar lo desconocido para ganar información. El riesgo: gastás tiradas en opciones que resultan malas.

Lo cruel es que no podés hacer las dos cosas con la misma tirada. Cada vez que explorás, pagás un costo de oportunidad; cada vez que explotás, te arriesgás a quedarte ciego. Y la respuesta correcta cambia con el tiempo: al principio, cuando no sabés nada, conviene explorar mucho; cerca del final, cuando ya tenés información, conviene explotar.

## Estrategias que la gente realmente usa

La más simple se llama **epsilon-greedy**: la mayoría de las veces elegís la mejor máquina conocida, pero con probabilidad ε (por ejemplo, 10%) tirás una al azar para seguir explorando.

```python
import random

def elegir_brazo(promedios, epsilon=0.1):
    if random.random() < epsilon:
        return random.randrange(len(promedios))   # explorar
    return max(range(len(promedios)), key=promedios.__getitem__)  # explotar
```

Funciona, pero es medio bruto: explora siempre igual, incluso cuando ya está bastante seguro. Estrategias más finas como **UCB** (*Upper Confidence Bound*) son más inteligentes: exploran más las opciones de las que tienen *poca información*, no al azar. La idea es "optimismo ante la incertidumbre" — si no sé cuánto paga una máquina, le doy el beneficio de la duda y la pruebo.

## Dónde aparece esto fuera del casino

El bandido no es teórico. Está corriendo ahora mismo en tu vida:

- **A/B testing** de webs: ¿cuánto tráfico le mandás a la versión nueva (explorar) vs la que ya convierte (explotar)? Los *bandits* baten al A/B clásico porque no desperdician tráfico en variantes malas.
- **Recomendadores**: Netflix o Spotify tienen que mostrarte lo que sabés que te gusta y, de vez en cuando, algo nuevo para descubrir tus gustos.
- **Tu propia carrera**: ¿seguís en el trabajo que conocés o probás algo distinto?

En el RL "completo" esto se vuelve aún más rico, porque las acciones no solo dan recompensa: cambian el estado del mundo. Esa es justamente la diferencia entre un bandido y [Q-learning](/data-ml/reinforcement-learning/q-learning-explicado), donde el agente tiene que pensar en las consecuencias de cada movida sobre las siguientes. Pero el dilema explorar/explotar sigue ahí, latiendo debajo de todo.

De hecho, una exploración bien hecha es lo que permite descubrir jugadas que nadie esperaba — como [la jugada 37 de AlphaGo](/data-ml/reinforcement-learning/alphago-jugada-37). Y cuando la exploración se rompe, aparecen los problemas: un agente que solo explota su recompensa termina haciendo [reward hacking](/data-ml/reinforcement-learning/reward-hacking), exprimiendo un atajo en vez de buscar algo mejor.

## Cuánto explorar

No hay una respuesta universal a cuánto explorar. Depende de cuántas tiradas te queden, de qué tan riesgoso sea equivocarte y de qué tan estable sea el mundo. Pero entender que *toda decisión bajo incertidumbre es este dilema* te cambia la cabeza. Cuando dudás entre el restaurante de siempre y el nuevo de la esquina, estás resolviendo un bandit. Y quedarte siempre en lo seguro tiene un costo que no ves: todo lo que nunca probaste.
