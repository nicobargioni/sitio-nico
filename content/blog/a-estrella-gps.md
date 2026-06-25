---
title: "A*: el GPS que combina lo recorrido y lo que falta"
date: "2026-04-17"
excerpt: "A* es el algoritmo detrás de tu navegador y de casi todo videojuego. Su secreto cabe en una sola fórmula: f = g + h."
tags: ["busqueda", "algoritmos", "curiosidades"]
category: "ia-agentes"
subcategory: "busqueda-heuristica"
---

Cada vez que tu celular calcula la ruta más corta a un lugar, hay un algoritmo de 1968 trabajando por debajo. Se llama A* (se pronuncia "A estrella") y es uno de esos inventos que, una vez que entendés su idea central, ves en todos lados: en el GPS, en los enemigos de un videojuego que te persiguen esquivando paredes, en un robot que cruza una habitación. Lo lindo es que toda su inteligencia cabe en una sola ecuación corta.

## La fórmula que lo explica todo

A* explora un mapa decidiendo, en cada paso, qué punto conviene visitar después. Para eso le asigna a cada candidato un puntaje:

```
f(n) = g(n) + h(n)
```

- **g(n)**: lo que ya recorriste para llegar hasta ese punto. Es un hecho, un costo real y medido.
- **h(n)**: una *estimación* de lo que te falta para llegar al destino. Es la corazonada, la heurística.
- **f(n)**: la suma, o sea el costo total estimado de la ruta completa si pasás por ahí.

En cada iteración, A* elige expandir el nodo con menor f. Pensalo como manejar mirando el GPS: no elegís la próxima calle solo por lo que ya recorriste, ni solo por lo cerca que parece estar el destino en línea recta. Combinás las dos cosas. Eso es exactamente lo que hace f = g + h.

## Por qué la corazonada cambia todo

Si ignoraras h y te guiaras solo por g, estarías explorando en círculos concéntricos alrededor del punto de partida, gastando tiempo en zonas que apuntan en dirección contraria al destino. Esa versión "ciega" existe y tiene nombre propio; la comparo en detalle en [Dijkstra vs A*](/ia-agentes/busqueda-heuristica/dijkstra-vs-astar).

La heurística h es lo que le da intuición a la búsqueda. En un mapa, una h típica es la distancia en línea recta al destino: nunca podés llegar más rápido que la línea recta, así que es una estimación honesta. Esa honestidad no es un detalle estético, es la condición que garantiza que A* encuentre el camino *óptimo* y no uno cualquiera. Ese requisito tiene su propia historia y la cuento en [heurística admisible](/ia-agentes/busqueda-heuristica/heuristica-admisible).

## No solo para mapas

Lo que vuelve a A* tan general es que un "mapa" puede ser cualquier cosa donde haya estados y transiciones con costo:

- Las posiciones de un rompecabezas, como en [el 8-puzzle](/ia-agentes/busqueda-heuristica/8-puzzle-juguete), donde cada movida es un paso.
- Las configuraciones de un tablero de juego.
- Los pasos de un plan que un agente arma para cumplir un objetivo, parecido a cómo razona [un agente que decide solo](/ia-agentes/agentes/agente-vs-pipeline).

En todos los casos, la receta es la misma: medí lo recorrido, estimá lo que falta, sumá, y avanzá siempre por donde la suma es menor.

## El truco está en el equilibrio

A* es elegante porque equilibra dos sesgos opuestos. La parte g lo mantiene con los pies en la tierra, sin olvidar el costo real. La parte h le da ambición, lo empuja hacia el objetivo. Una búsqueda que solo usa g es prudente pero lenta; una que solo usa h es entusiasta pero se choca contra obstáculos.

Cuando el GPS recalcula la ruta en un segundo, detrás hay una idea simple: sumar lo que ya hiciste con una estimación honesta de lo que te falta. Casi toda la búsqueda inteligente nace de ese equilibrio.
