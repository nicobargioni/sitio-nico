---
title: "Agente vs pipeline: cuándo conviene dejar que decida solo"
date: "2026-04-30"
excerpt: "Un pipeline ejecuta los pasos que vos definiste. Un agente decide los pasos. Esa diferencia tiene un costo, y conviene saber cuándo pagarlo."
tags: [agentes, llm, curiosidades]
category: "ia-agentes"
subcategory: "agentes"
---

Hay una decisión de arquitectura que se toma antes de escribir una sola línea: ¿esto lo resuelvo con un pipeline o con un agente? La diferencia parece sutil, pero define cuánto control tenés sobre lo que va a pasar. Y como casi todo en ingeniería, no hay respuesta universal: hay un trade-off.

## La diferencia real

Un **pipeline** es una secuencia de pasos que vos definiste de antemano. Extraer texto, clasificar, generar un resumen, guardar. El orden es fijo. Si querés cambiar la lógica, editás el código. Es determinista en su estructura: siempre pasa por los mismos nodos, aunque el contenido varíe.

Un **agente** es otra cosa. Vos no le decís *qué pasos dar*, le decís *qué objetivo lograr* y le das herramientas. El propio modelo decide en cada vuelta qué hacer: buscar, calcular, volver a buscar, responder. Esa elección la toma el LLM en tiempo de ejecución, y por eso la trayectoria cambia entre una corrida y otra. Si querés entender el motor que hace posible esa toma de decisiones, el patrón de fondo es [ReAct: agentes que razonan y actúan en bucle](/ia-agentes/agentes/react-razonar-actuar), y la capacidad de operar el mundo viene de [function calling](/ia-agentes/agentes/function-calling).

## El costo de la flexibilidad

La autonomía no es gratis. Cada paso que decide el agente es una llamada al modelo, y cada llamada puede equivocarse. Si tu tarea tiene cinco pasos y el modelo acierta el 95% en cada uno, la probabilidad de que la cadena entera salga bien es:

```
0.95^5 ≈ 0.77
```

Casi un cuarto de las veces algo se tuerce. Un pipeline no tiene ese problema porque el orden no se decide: se ejecuta. El error solo aparece dentro de cada paso, no en cómo se encadenan.

Entonces, ¿qué ganás con el agente? Adaptabilidad. Si la tarea es siempre la misma —misma forma de input, mismo objetivo— el pipeline gana por goleada: es barato, predecible, fácil de testear. Pero si el input es impredecible y el camino correcto depende de lo que el modelo descubra a mitad de camino, ahí el agente brilla.

## Un criterio para decidir

Antes de elegir, tres preguntas:

- **¿Conozco los pasos de antemano?** Si la respuesta es sí, no necesitás un agente. Un pipeline con un LLM adentro de un paso alcanza.
- **¿El camino depende de resultados intermedios?** Si para saber el paso 3 necesito ver qué dio el paso 2, y eso cambia seguido, el agente empieza a justificarse.
- **¿Puedo tolerar resultados no deterministas?** Un agente puede resolver lo mismo de dos formas distintas. Si tu negocio necesita auditoría exacta, eso es un problema.

Hay un patrón intermedio que suele ser el ganador real: pipeline rígido en el esqueleto, con uno o dos pasos donde un LLM toma una microdecisión acotada. Te quedás con la previsibilidad de la estructura y metés inteligencia solo donde hace falta. Es el mismo criterio que aplico para decidir [cuándo la IA suma de verdad](/ia-agentes/llms-prompting/cuando-la-ia-suma): delegá el trabajo, no el control.

## El cierre

La pregunta no es "¿agentes o pipelines?" como si fuera una guerra de religión. Es "¿cuánta libertad le doy a este sistema, y estoy dispuesto a pagar el costo en imprevisibilidad?". El default sensato es el menos autónomo que resuelva el problema. La autonomía se gana, no se regala: cada grado de libertad que le das al modelo es un grado de control que perdés vos, y conviene que sea una decisión consciente, no una moda.
