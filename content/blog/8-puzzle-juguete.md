---
title: "El 8-puzzle: el juguete que enseñó a planificar a las máquinas"
date: "2026-04-14"
excerpt: "Un rompecabezas de plástico con ocho fichas esconde el concepto que sostiene toda la planificación automática: el espacio de estados."
tags: ["busqueda", "algoritmos", "curiosidades"]
category: "ia-agentes"
subcategory: "busqueda-heuristica"
---

Hay un juguete barato que aparece en casi todos los cursos de inteligencia artificial: una grilla de 3×3 con ocho fichas numeradas y un hueco. Deslizás fichas hacia el hueco hasta ordenarlas. Parece un pasatiempo de kiosco, pero el 8-puzzle es probablemente el mejor profesor que tiene la IA para enseñar *qué significa planificar*. Todo lo grande —desde resolver un cubo Rubik hasta rutear un robot— se entiende primero acá.

## El truco mental: pensar en estados, no en movimientos

La trampa intuitiva es pensar el puzzle como "una serie de movimientos". El salto conceptual es pensarlo como un **espacio de estados**: cada configuración posible del tablero es un *nodo*, y cada deslizamiento válido es una *arista* que conecta dos nodos.

Con esa lente, resolver el puzzle deja de ser "mover fichas" y pasa a ser **encontrar un camino** desde el nodo "tablero actual" hasta el nodo "tablero ordenado". Y buscar caminos en un grafo es un problema que ya sabemos atacar con [A*, que combina lo recorrido y lo que falta](/ia-agentes/busqueda-heuristica/a-estrella-gps).

El 8-puzzle tiene 9!/2 = 181.440 estados alcanzables (la mitad de las permutaciones son imposibles por paridad). Es chico: cabe entero en memoria. Por eso es perfecto para *ver* cómo trabaja un buscador sin que la máquina explote.

## Dos heurísticas para el mismo juguete

Acá es donde el 8-puzzle se vuelve didáctico de verdad. Hay dos pistas clásicas para estimar cuánto falta:

- **Fichas mal ubicadas**: contás cuántas de las ocho no están en su lugar. Simple, barata, pero floja.
- **Distancia Manhattan**: para cada ficha, sumás cuántas casillas la separan —en horizontal y vertical— de su destino. Más cara de calcular, mucho más informada.

```
Estado:  1 2 3      Meta:  1 2 3
         4 _ 6             4 5 6
         7 5 8             7 8 _

Manhattan: el 5 está a 1 paso, el 8 a 1 paso → h = 2
```

Las dos son [admisibles: nunca sobreestiman lo que falta](/ia-agentes/busqueda-heuristica/heuristica-admisible), porque ninguna ficha puede acercarse a su lugar en menos movimientos de los que dice la fórmula. Y entre dos heurísticas admisibles, **la que da números más altos siempre gana**: domina a la otra y expande menos nodos. Manhattan le saca años luz a contar fichas mal puestas. Es la demostración más limpia de que no toda pista vale igual.

## Por qué un juguete y no algo "serio"

El 8-puzzle es deliberadamente trivial, y esa es su virtud. Te deja aislar el concepto sin que el tamaño te tape la idea:

- Es lo bastante chico para resolverlo a mano y comparar contra el algoritmo.
- Es lo bastante grande para que [Dijkstra a ciegas sufra y A* con pista vuele](/ia-agentes/busqueda-heuristica/dijkstra-vs-astar): la diferencia se nota en los nodos expandidos.
- Escala de forma natural al 15-puzzle (4×4) y al 24-puzzle, donde la búsqueda exhaustiva ya no entra en memoria y *necesitás* heurísticas buenas.

## El puente hacia los agentes que aprenden

Lo que el 8-puzzle enseña —representar el mundo como estados y transiciones, y estimar el valor de cada estado— es exactamente el andamiaje sobre el que se monta el aprendizaje por refuerzo. Cuando [una máquina aprende a jugar con Q-learning](/data-ml/reinforcement-learning/q-learning-explicado), está estimando ese mismo "cuánto falta para ganar" que acá calculamos a mano con Manhattan. El juguete de plástico es la versión transparente del problema que después se vuelve opaco. Por eso sigue en todos los cursos: una vez que lo *ves*, ya no podés dejar de ver estados de búsqueda en todos lados.
