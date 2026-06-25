---
title: "Por qué el RL no es como el aprendizaje supervisado"
date: "2026-05-23"
excerpt: "En el supervisado hay un profesor con las respuestas. En el RL hay un mundo que solo te dice 'frío' o 'caliente', y a veces tarde. La diferencia lo cambia todo."
tags: ["reinforcement-learning", "rl", "curiosidades"]
category: "data-ml"
subcategory: "reinforcement-learning"
---

Mucha gente mete todo el machine learning en la misma bolsa, pero el aprendizaje por refuerzo juega un juego distinto al del aprendizaje supervisado. No es una variante más sofisticada: es otra manera de aprender, con otras reglas, otros problemas y otras virtudes. Y entender la diferencia te ahorra elegir la herramienta equivocada.

## El profesor vs el mundo

En **aprendizaje supervisado** tenés un profesor con la hoja de respuestas. Le mostrás una foto y le decís "esto es un gato"; le mostrás mil fotos etiquetadas y el modelo aprende a imitar esas respuestas. Para cada entrada existe *la* respuesta correcta, conocida de antemano. El modelo se equivoca, mide su error contra la verdad y se corrige. Así funciona desde clasificar imágenes hasta el [transfer learning](/data-ml/transfer-learning/few-shot).

En **aprendizaje por refuerzo** no hay hoja de respuestas. Hay un mundo que reacciona. El agente toma una acción y el mundo le devuelve una recompensa —"frío", "caliente"— pero nunca le dice cuál *hubiera sido* la mejor acción. Tiene que descubrirla probando. Es la diferencia entre estudiar con un profesor que te corrige el examen y aprender a andar en bici: nadie te dice el ángulo exacto del manubrio, te caés o no te caés.

## Tres diferencias que lo cambian todo

- **El feedback es evaluativo, no instructivo.** El supervisado te dice "la respuesta era gato". El RL solo te dice "esa acción estuvo buena (o mala)", sin decirte qué deberías haber hecho. Tenés mucha menos información por intento.
- **Tus acciones cambian el mundo.** En el supervisado, clasificar una foto no afecta la siguiente. En el RL, cada movida modifica el estado y las opciones futuras. Tenés que pensar en cadena, no de a una. Ese pensar en cadena es justo lo que formaliza [Q-learning](/data-ml/reinforcement-learning/q-learning-explicado).
- **La recompensa puede llegar tardísimo.** En el supervisado el error es inmediato. En el RL podés hacer 200 movidas antes de saber si ganaste, y entonces aparece el infierno de la [recompensa escasa](/data-ml/reinforcement-learning/recompensa-escasa) y la pregunta de cuál movida mereció el crédito.

## La consecuencia más linda

Por estas diferencias, el RL puede hacer algo que el supervisado no: **superar a sus maestros**. Un modelo supervisado, en el mejor de los casos, iguala a los humanos que generaron sus etiquetas — su techo es la calidad de los datos. Un agente de RL, al optimizar el resultado en vez de imitar ejemplos, puede descubrir estrategias que ningún humano le mostró. Eso es exactamente lo que pasó con [la jugada 37 de AlphaGo](/data-ml/reinforcement-learning/alphago-jugada-37): nadie la jugó nunca en el dataset, y por eso un sistema imitador jamás la habría encontrado.

Pero esa misma libertad tiene su precio. Como el agente persigue la recompensa y no "la intención", una recompensa mal diseñada produce [reward hacking](/data-ml/reinforcement-learning/reward-hacking): el agente cumple la letra y traiciona el espíritu. En el supervisado, una etiqueta mala te da un error puntual; en el RL, una recompensa mal pensada puede producir un comportamiento entero, persistente y creativamente tramposo.

## Cuándo usar cada uno

La regla práctica que uso: si tenés ejemplos abundantes con respuesta conocida y cada predicción es independiente —clasificar, predecir, etiquetar— andá a supervisado, es más simple y más estable. Si tu problema es una *secuencia de decisiones* donde cada acción afecta a las siguientes y solo podés medir el resultado final —jugar, controlar un robot, optimizar una estrategia a lo largo del tiempo— ahí el RL gana, aunque te cueste mucho más entrenarlo.

No son rivales: resuelven problemas con formas distintas. Confundirlos es como traer una llave inglesa a clavar un clavo. Funciona, pero hay una herramienta mejor esperando.
