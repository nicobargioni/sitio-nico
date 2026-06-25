---
title: "Dijkstra vs A*: la diferencia que hace una buena pista"
date: "2026-04-15"
excerpt: "Buscar a ciegas o con una corazonada informada: por qué A* es Dijkstra con una pista, y cuándo esa pista cambia todo."
tags: ["busqueda", "algoritmos", "curiosidades"]
category: "ia-agentes"
subcategory: "busqueda-heuristica"
---

Imaginá que perdés las llaves en tu casa a oscuras. Una estrategia es tantear en círculos cada vez más amplios desde donde estás parado, sin prioridad. Otra es recordar que las dejaste cerca de la puerta y caminar para allá. La primera es Dijkstra. La segunda es A*. La diferencia entre ambas es una sola cosa: una **pista** sobre dónde está la meta.

## Dijkstra: rigor sin corazonadas

El algoritmo de Dijkstra (1959) resuelve el camino más corto desde un origen expandiendo siempre el nodo con menor costo acumulado `g(n)` —lo que ya recorriste—. Es impecable: garantiza la ruta óptima en grafos con pesos no negativos. Pero es **desinformado**. No tiene la menor idea de dónde queda la meta, así que crece como una mancha de aceite en todas las direcciones por igual.

```
Dijkstra: ordena la frontera por  g(n)
A*:       ordena la frontera por  g(n) + h(n)
```

Esa mancha uniforme es el problema. Si la meta está al este, Dijkstra igual gasta esfuerzo explorando el oeste, el norte y el sur con el mismo entusiasmo. En un mapa de ciudad eso son miles de nodos visitados al pedo.

## A*: el mismo rigor, ahora con dirección

A* (1968) agrega un solo término: `h(n)`, una **heurística** que estima cuánto falta hasta la meta. Ordena la frontera por `f(n) = g(n) + h(n)`. Es Dijkstra que además mira hacia adelante. Esa estructura —pasado más futuro estimado— la desarmo a fondo en [A*: el GPS que combina lo recorrido y lo que falta](/ia-agentes/busqueda-heuristica/a-estrella-gps).

El efecto visual es hermoso: en vez de un círculo uniforme, A* dibuja una elipse estirada *hacia* la meta. Explora poco a los costados y mucho en la dirección correcta. Mismo resultado óptimo, fracción del trabajo.

Y acá está el truco fino: A* **es** Dijkstra cuando `h(n) = 0` para todos los nodos. Sin pista, A* se degrada exactamente a buscar a ciegas. La heurística es lo único que los separa, y su calidad define cuánto te ahorrás.

## Cuándo conviene cada uno

- **Sin buena heurística** (grafos abstractos, sin noción de "distancia a la meta"): Dijkstra. No hay pista que dar, y A* no aportaría nada.
- **Con geometría o estructura** (mapas, rutas, juegos): A* casi siempre gana. La línea recta, la distancia Manhattan o el conteo de piezas mal ubicadas en [el 8-puzzle, el juguete de la planificación](/ia-agentes/busqueda-heuristica/8-puzzle-juguete) son pistas baratas y potentes.
- **Múltiples destinos a la vez**: Dijkstra calcula distancias a *todos* los nodos de una. A* está optimizado para *un* objetivo.

La condición para que A* no te mienta es que la pista sea [admisible: que nunca sobreestime lo que falta](/ia-agentes/busqueda-heuristica/heuristica-admisible). Una pista honesta acelera sin sacrificar la optimalidad.

## La lección que trasciende la búsqueda

Lo que me fascina de este par es la idea de fondo: la información dirigida vale oro. La diferencia entre tantear y avanzar con una corazonada no es de algoritmo, es de **cuánto sabés del problema**. Es el mismo principio que hace que un agente que [decide solo cuándo actuar](/ia-agentes/agentes/agente-vs-pipeline) sea más eficiente que uno que prueba todo: el conocimiento sobre la meta no cambia qué encontrás, cambia cuánto trabajo te cuesta encontrarlo. Dijkstra y A* son la prueba más limpia y medible de esa idea.
