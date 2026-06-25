---
title: "El arte del 'te paso con un humano'"
date: "2026-03-31"
excerpt: "El peor pecado de un chatbot no es no saber: es no darse cuenta de que no sabe y dejarte dando vueltas en círculos."
tags: ["chatbots", "conversacional", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "agentes-conversacionales"
---

Pensá en la última vez que un bot te hizo enojar de verdad. Apuesto a que no fue porque no supo algo. Fue porque, sin saberlo, te insistió tres veces con la misma respuesta inútil antes de soltarte. El problema casi nunca es la falta de conocimiento: es el **fallback que no escala a tiempo**.

## Saber que no se sabe

La habilidad más subestimada de un chatbot es reconocer su propio límite. Suena raro, pero un bot que dice "esto se me escapa, te conecto con alguien" es infinitamente mejor que uno que improvisa con confianza. Especialmente porque los LLM tienden a [responder con seguridad incluso cuando alucinan](/ia-agentes/llms-prompting/por-que-alucinan): el tono firme no garantiza nada.

Las señales de que llegó el momento de escalar suelen ser claras si las medís:

- **Baja confianza.** El modelo recuperó documentos poco relevantes o la similitud semántica fue floja. Si el contexto es débil, la respuesta también.
- **Repetición.** El usuario reformuló lo mismo dos o tres veces. Eso es frustración, no curiosidad.
- **Cambio de tono.** Aparecen mayúsculas, insultos, "quiero hablar con una persona". Pedido explícito: respetalo al instante.
- **Tema sensible.** Reclamos de plata, bajas, temas legales o de salud. Acá el costo de equivocarse es alto y conviene un humano.

## El handoff bien hecho

Escalar no es tirar al usuario a una cola y desaparecer. Un buen traspaso conserva el contexto. Nada peor que contarle todo al bot y que el humano arranque con "hola, ¿en qué puedo ayudarte?" como si nada hubiera pasado.

```
# Lo que debería viajar en el handoff:
- transcripción de la conversación
- intención detectada (aunque el bot no la haya resuelto)
- datos ya recolectados (nº de cliente, pedido, etc.)
- razón del escalado (baja confianza / pedido explícito / tema sensible)
```

Mantener ese hilo es el mismo desafío de [conservar la memoria a lo largo de una conversación larga](/hiperautomatizacion/agentes-conversacionales/memoria-conversacion): si el contexto no sobrevive al traspaso, la experiencia se rompe justo en el peor momento.

## El equilibrio que casi nadie calibra

Acá está lo difícil. Si el bot escala demasiado rápido, no resuelve nada y los humanos se saturan: tu inversión en automatización se evapora. Si escala demasiado tarde, quema al usuario antes de pasarlo. El punto óptimo no se adivina, se mide.

Por eso el fallback es, en el fondo, una decisión de negocio disfrazada de detalle técnico. Cada escalado de más cuesta tiempo de un agente humano; cada escalado de menos cuesta un cliente enojado. Ese balance se ve directamente en la [tasa de contención y el CSAT](/hiperautomatizacion/agentes-conversacionales/metricas-chatbot), que son las métricas donde el fallback deja su huella.

Y ojo: un bot que **propone** una acción pero deja la decisión final al humano es, muchas veces, mejor que uno totalmente autónomo. Es la misma lógica de [cuándo conviene un agente y cuándo un pipeline más controlado](/ia-agentes/agentes/agente-vs-pipeline): la autonomía no es un fin en sí mismo.

## La regla de oro

Un chatbot no se mide por lo que sabe, sino por lo que hace cuando **no** sabe. El que reconoce su límite y te pasa a un humano con todo el contexto ya cargado te resolvió el problema igual, aunque no lo haya resuelto él. Ese es el arte: saber retirarse a tiempo, y hacerlo elegante.
