---
title: "Q-learning explicado: cómo una máquina aprende a jugar"
date: "2026-06-22"
excerpt: "Sin datos etiquetados, sin saber las reglas. Solo prueba, error y recompensa. Cómo un agente aprende a equilibrar un palo con Q-learning, explicado de cero."
tags: ["machine-learning", "reinforcement-learning"]
category: "data-ml"
subcategory: "reinforcement-learning"
---

El aprendizaje supervisado necesita ejemplos etiquetados: esto es un gato, esto no. El aprendizaje por refuerzo no tiene nada de eso. Tiene un agente, un entorno y una sola señal: **recompensa**. Y aun así aprende a jugar, a caminar o a manejar. Q-learning es la puerta de entrada para entender cómo.

## El problema: equilibrar un palo

El ejemplo clásico es *CartPole*: un carro que se mueve a izquierda o derecha con un palo parado encima. El objetivo es que el palo no se caiga. El agente no sabe nada de física. Solo recibe:

- Un **estado** (posición y velocidad del carro y el palo).
- Dos **acciones** posibles (mover izquierda o derecha).
- Una **recompensa** de +1 por cada instante que el palo sigue parado.

Esto se formaliza como un *Markov Decision Process* (MDP): estados, acciones, transiciones y recompensas.

## La idea central: la tabla Q

Q-learning aprende una función `Q(estado, acción)` que estima **cuánta recompensa total** esperar si, estando en ese estado, tomo esa acción. Si conozco esos valores, mi política es trivial: en cada estado, elegir la acción con la Q más alta.

La pregunta es cómo aprender esos valores sin conocer las reglas del entorno. La respuesta es la regla de actualización:

```python
# Tras tomar la acción a en el estado s, observo recompensa r y nuevo estado s'
mejor_futuro = max(Q[s_next])          # lo mejor que puedo hacer desde s'
objetivo = r + gamma * mejor_futuro     # recompensa ahora + futuro descontado
Q[s][a] = Q[s][a] + alpha * (objetivo - Q[s][a])
```

Dos hiperparámetros mandan:

- **`alpha`** (tasa de aprendizaje): cuánto pesa cada nueva experiencia.
- **`gamma`** (descuento): cuánto importa el futuro frente a la recompensa inmediata. Cerca de 1, el agente piensa a largo plazo.

## Explorar vs. explotar

Si el agente siempre elige la mejor acción conocida, nunca descubre algo mejor. Si siempre prueba al azar, nunca aprovecha lo aprendido. El balance se resuelve con **epsilon-greedy**:

```python
import random
if random.random() < epsilon:
    accion = entorno.accion_aleatoria()   # explorar
else:
    accion = argmax(Q[estado])            # explotar
```

`epsilon` arranca alto (mucha exploración) y baja con el tiempo, a medida que el agente confía más en lo que sabe.

## Por qué importa más allá del juego

CartPole es un juguete, pero la estructura —estado, acción, recompensa diferida— aparece en problemas reales: pricing dinámico, asignación de recursos, recomendación secuencial, control. Entender Q-learning es entender el esqueleto sobre el que se montan los métodos modernos (Deep Q-Networks, policy gradients): los mismos conceptos, con una red neuronal estimando la Q cuando los estados son demasiados para una tabla.

La intuición clave que conviene llevarse: el agente no aprende de respuestas correctas, sino de **consecuencias**. Y eso, bien planteado, alcanza.
