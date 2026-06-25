---
title: "Heurística admisible: la promesa que garantiza el camino óptimo"
date: "2026-04-16"
excerpt: "Por qué una heurística que nunca sobreestima es la condición exacta que vuelve a A* infalible para encontrar la ruta más corta."
tags: ["busqueda", "algoritmos", "curiosidades"]
category: "ia-agentes"
subcategory: "busqueda-heuristica"
---

Hay una palabra que aparece siempre que se habla de búsqueda informada y casi nunca se explica bien: **admisible**. Suena a tecnicismo aburrido, pero esconde una de las garantías más elegantes de toda la inteligencia artificial clásica. Una heurística admisible es una promesa: si la cumplís, encontrás el camino óptimo. Si la rompés, A* sigue funcionando, pero te puede mentir.

## Qué es, en una línea

Una heurística `h(n)` estima cuánto falta desde el nodo `n` hasta la meta. Es admisible si **nunca sobreestima** ese costo real. Formalmente:

```
h(n) ≤ h*(n)   para todo nodo n
```

donde `h*(n)` es la distancia verdadera (que en general no conocemos). En criollo: la heurística puede ser optimista o quedarse corta, pero jamás puede decir "falta mucho" cuando en realidad falta poco.

El ejemplo canónico es la distancia en línea recta entre dos puntos del mapa. Como la línea recta es la menor distancia posible entre dos lugares, ninguna ruta real por calles puede ser más corta. Esa estimación nunca se pasa. Es admisible por construcción.

## Por qué el optimismo garantiza optimalidad

A* expande nodos ordenándolos por `f(n) = g(n) + h(n)`: lo que ya recorriste más lo que estimás que falta. Si esa misma idea de combinar pasado y futuro te resulta familiar es porque es el corazón de [A*, el GPS que combina lo recorrido y lo que falta](/ia-agentes/busqueda-heuristica/a-estrella-gps).

La clave está en el final. Cuando A* está por sacar de la cola al nodo meta, lo hace solo si su `f` es el más chico de todos los candidatos pendientes. Si `h` nunca sobreestima, entonces el `f` de cualquier camino aún sin explorar es una **cota inferior honesta** de su costo total. A* no puede cerrar la meta por una ruta cara mientras exista una más barata escondida en la frontera: esa ruta más barata siempre tendrá un `f` menor o igual, y se expandirá antes. El optimismo te obliga a mirar todo lo que *podría* ser mejor antes de declarar ganador.

Si la heurística sobreestima —es pesimista— A* puede descartar prematuramente el camino bueno porque "parece" caro, y devolverte una solución subóptima. Rápida, pero no la mejor.

## El precio del optimismo y un primo más fuerte

- **Demasiado optimista** (`h = 0` para todo): admisible, pero inútil. A* se degrada a [Dijkstra, que busca a ciegas sin pista](/ia-agentes/busqueda-heuristica/dijkstra-vs-astar) y explora muchísimo.
- **Justo en el límite** (`h = h*`): A* va directo a la meta sin desvíos. Es el ideal inalcanzable.
- **Sobreestima**: rápido pero falible. Sirve cuando "bastante bueno" alcanza.

Existe una propiedad más exigente, la **consistencia** (o monotonía): `h(n) ≤ costo(n, n') + h(n')`. Toda heurística consistente es admisible, pero no al revés. La consistencia te ahorra tener que reabrir nodos ya cerrados, y por eso en problemas grandes —como ordenar [el 8-puzzle, ese juguete que enseñó a planificar a las máquinas](/ia-agentes/busqueda-heuristica/8-puzzle-juguete)— se busca diseñar heurísticas consistentes, no solo admisibles.

## El paralelo con aprender jugando

Esta tensión entre estimar el futuro y no engañarte tiene un eco directo en el aprendizaje por refuerzo: ahí también un agente arrastra una estimación de "cuánto valor falta por delante", y [el dilema de explorar o explotar](/data-ml/reinforcement-learning/explorar-explotar) decide cuánto confiar en esa estimación. En ambos mundos, la honestidad de la estimación es lo que separa una solución óptima de una apurada.

La moraleja es contraintuitiva y por eso me gusta: en búsqueda, ser **optimista** sobre lo que falta es lo que te hace riguroso sobre el resultado. Mentir hacia abajo es la única mentira que no te cuesta el camino correcto.
