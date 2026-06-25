---
title: "La jugada 37 de AlphaGo: la creatividad que ningún humano jugaría"
date: "2026-05-25"
excerpt: "En la segunda partida contra Lee Sedol, AlphaGo puso una piedra donde nadie la pondría. Los comentaristas pensaron que era un error. Era genialidad."
tags: ["reinforcement-learning", "rl", "curiosidades"]
category: "data-ml"
subcategory: "reinforcement-learning"
---

Marzo de 2016, Seúl. Segunda partida del match entre AlphaGo y Lee Sedol, uno de los mejores jugadores de Go de la historia. Movida 37. AlphaGo coloca una piedra en la línea cinco, en un punto del tablero que ningún profesional consideraría seriamente. El comentarista europeo, jugador profesional él mismo, dice en vivo: "Es un error muy extraño". Otro pensó que el sistema se había colgado. Lee Sedol se levantó de la mesa y necesitó casi quince minutos para responder.

No era un error. Cincuenta movidas después, esa piedra resultó ser el centro de gravedad de toda la partida. AlphaGo ganó. Y la jugada 37 quedó en la historia como el momento en que una máquina mostró algo que se parece, peligrosamente, a la creatividad.

## Por qué ningún humano la jugaría

El Go tiene un espacio de jugadas tan gigantesco que no se puede calcular por fuerza bruta — ya hablé de ese tipo de explosión combinatoria en [el factor de ramificación](/ia-agentes/busqueda-heuristica/factor-ramificacion). Durante siglos, los humanos desarrollaron *intuición*: patrones, proverbios, formas "buenas" y "malas" transmitidas de maestro a alumno. La línea cinco en esa posición violaba esa tradición. Era, según todo el conocimiento humano acumulado, una jugada fea.

AlphaGo no aprendió de esa tradición. Aprendió jugando millones de partidas contra sí mismo mediante aprendizaje por refuerzo, premiándose solo por una cosa: ganar. No tenía proverbios que respetar ni maestros que lo miraran feo. Solo tenía la pregunta "¿esto aumenta mi probabilidad de victoria?". DeepMind estimó después que la probabilidad de que un humano jugara esa movida era de **1 en 10.000**. AlphaGo la eligió porque su evaluación decía que era buena, no porque alguien la hubiera jugado antes.

## La diferencia con aprender de ejemplos

Acá está lo profundo. Un sistema entrenado para *imitar* a humanos —aprendizaje supervisado puro— jamás habría jugado la 37, porque ningún humano de su dataset la jugó. Habría sido, como mucho, tan bueno como el mejor jugador que copió. Esa es la diferencia de fondo entre [RL y aprendizaje supervisado](/data-ml/reinforcement-learning/rl-vs-supervisado): el supervisado te lleva hasta el techo de tus ejemplos; el refuerzo puede *romper ese techo* porque optimiza el resultado, no la semejanza con lo conocido.

Es la misma maquinaria que vimos en [Q-learning](/data-ml/reinforcement-learning/q-learning-explicado), llevada a una escala enorme y con redes neuronales evaluando posiciones. Y es, también, hija directa del dilema de [explorar vs explotar](/data-ml/reinforcement-learning/explorar-explotar): para encontrar una jugada que nadie probó, primero tenés que estar dispuesto a probar cosas que parecen malas.

## El otro lado de la moneda

Pero ojo con romantizar. Esa misma libertad —optimizar el resultado sin atarse a lo que "debería" hacerse— es la que produce el [reward hacking](/data-ml/reinforcement-learning/reward-hacking), el agente que gira en círculos para farmear puntos en vez de terminar la carrera. La jugada 37 y el bote en llamas son el mismo fenómeno visto desde dos lados: un sistema que no comparte nuestras suposiciones encuentra caminos que no se nos ocurren. A veces eso es brillante. A veces es una trampa. La máquina no distingue.

Lo que sí cambió para siempre es la relación. Lee Sedol perdió el match 4 a 1, pero en la partida 4 jugó **su propia** movida brillante —la "jugada 78"— que dejó a AlphaGo descolocado. Después contó que jugar contra la máquina lo liberó de prejuicios sobre qué movidas eran "correctas". Hoy los profesionales de Go estudian partidas de IA y juegan mejor por eso.

La 37 no fue una máquina reemplazando a un humano. Fue una máquina mostrándonos un rincón del juego que llevábamos siglos sin ver. Y a veces ese es el mejor uso de todo esto: no que decida por nosotros, sino que nos enseñe a mirar distinto.
