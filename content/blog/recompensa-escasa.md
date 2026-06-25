---
title: "El problema de la recompensa escasa: cuando el premio llega tarde"
date: "2026-05-24"
excerpt: "Un agente hace 200 movidas y recién al final le decís 'ganaste'. ¿Cuál de las 200 fue la buena? Ese es el problema más frustrante del RL."
tags: ["reinforcement-learning", "rl", "curiosidades"]
category: "data-ml"
subcategory: "reinforcement-learning"
---

Imaginate que aprendés a jugar al ajedrez con una sola regla de feedback: nadie te dice nada durante toda la partida, y recién al final te avisan "ganaste" o "perdiste". Cuarenta movidas, y un único bit de información al cerrar. ¿Cómo sabés cuál de esas cuarenta movidas fue la genial y cuál el desastre? No lo sabés. Y sin embargo, así aprenden muchos agentes de aprendizaje por refuerzo.

Eso es la **recompensa escasa** (*sparse reward*): el premio existe, pero llega tarde y rara vez. La mayoría de las acciones devuelven cero. Y eso dispara el problema más difícil del RL: la **asignación de crédito temporal**. Si tu recompensa llegó después de una larga cadena de decisiones, ¿a cuál de todas le atribuís el mérito?

## Por qué es tan duro

Pensalo desde el agente. Si premiás solo al final, casi todo lo que hace devuelve cero. El agente prueba acciones al azar y sigue recibiendo cero, cero, cero... no tiene ninguna señal que le diga "vas por buen camino". Es como buscar la salida de un laberinto a oscuras donde solo te avisan si encontraste la puerta, pero nunca si te estás acercando.

Para tareas largas esto es letal. Un robot que tiene que armar algo en veinte pasos puede tardar una eternidad en *tropezar por azar* con la secuencia completa que da recompensa. Y hasta que no la encuentra al menos una vez, no tiene de dónde aprender. Es el mismo motor de [Q-learning](/data-ml/reinforcement-learning/q-learning-explicado), pero sin nada que propagar hacia atrás: si nunca ganaste, no hay valor que actualizar.

## Las salidas que se inventaron

La gente desarrolló varios trucos para no depender del milagro del azar:

- **Reward shaping**: agregar recompensas intermedias que guíen ("te acercaste a la puerta, tomá un poquito de premio"). Funciona, pero es peligroso: si las diseñás mal, el agente optimiza el atajo y aparece el [reward hacking](/data-ml/reinforcement-learning/reward-hacking). El premio intermedio se vuelve el objetivo y la tarea real queda olvidada.
- **Curiosidad intrínseca**: premiar al agente por visitar estados nuevos, por sorprenderse. Así explora aunque el mundo no le pague, lo cual conecta directo con el dilema de [explorar vs explotar](/data-ml/reinforcement-learning/explorar-explotar).
- **Aprendizaje por currículum**: empezar con versiones fáciles de la tarea (premio cercano) y aumentar la dificultad de a poco, como un buen profesor.
- **Imitación**: arrancar copiando demostraciones humanas para que el agente vea al menos un camino exitoso antes de soltarlo a explorar.

## La tensión de fondo

Acá hay una tensión hermosa. La recompensa escasa es frustrante para entrenar, pero también es la *más honesta*. "Ganaste la partida" es exactamente lo que querés; "te acercaste un poco a la puerta" es una invención tuya que puede no representar bien el objetivo real.

Cuanto más densa hacés la recompensa para facilitar el aprendizaje, más te arriesgás a especificar mal lo que querés y a que el agente encuentre el atajo equivocado. Cuanto más escasa la dejás para mantenerla honesta, más difícil se vuelve aprender. No hay almuerzo gratis.

Por eso la recompensa escasa es, en el fondo, la versión extrema de un problema que ya vimos: en [RL no le decís al agente qué hacer, le decís qué puntuar](/data-ml/reinforcement-learning/rl-vs-supervisado). Y cuando ese puntaje es raro y tardío, el agente queda navegando casi a ciegas, igual que cualquiera de nosotros tratando de aprender de feedback que llega meses después y sin saber qué decisión, entre cientos, fue la que importó.
