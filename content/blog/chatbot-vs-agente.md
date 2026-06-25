---
title: "Chatbot vs agente conversacional: el salto de FAQ a acción"
date: "2026-04-02"
excerpt: "Un chatbot responde; un agente conversacional hace. La diferencia no es de palabras: es de qué pasa después del 'enter'."
tags: ["chatbots", "conversacional", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "agentes-conversacionales"
---

Le escribís a un bot "¿cuánto cuesta el plan premium?" y te tira el precio. Le escribís "quiero pasarme al premium" y… te tira el precio otra vez. Ahí, en esa frustración, está toda la diferencia entre un chatbot y un agente conversacional.

## El chatbot responde, el agente hace

Un **chatbot** clásico es, en el fondo, un buscador con cara de charla. Vos preguntás, él recupera una respuesta de un repertorio (un FAQ, una base de conocimiento, un árbol de decisiones) y te la devuelve. Es informativo. Útil, pero pasivo: nunca toca nada del mundo real.

Un **agente conversacional** suma una capa que lo cambia todo: puede *ejecutar acciones*. No solo te dice el precio del premium; te cambia el plan, te emite la factura, te agenda la llamada. Pasa de hablar **sobre** las cosas a operar **sobre** las cosas.

La frontera técnica que separa a uno del otro tiene nombre: la capacidad de invocar herramientas. Es exactamente el mismo salto que hace un LLM cuando aprende [function calling](/ia-agentes/agentes/function-calling): traducir una intención en lenguaje natural a una llamada concreta a una API.

## Qué necesita un agente que un chatbot no tiene

- **Herramientas conectadas.** APIs reales para crear, modificar o cancelar. Sin esto, todo queda en conversación.
- **Permisos y autenticación.** Si va a cambiarte el plan, primero tiene que saber quién sos y qué tenés permitido tocar.
- **Confirmación antes de actuar.** "Voy a cambiarte al premium, ¿confirmás?" El agente que ejecuta sin preguntar es un accidente esperando ocurrir.
- **Manejo de errores.** La API falló, el pago se rechazó, el turno ya no está. Un chatbot nunca se entera de estas cosas; un agente vive de ellas.

Hay una versión más autónoma todavía, donde el agente razona y actúa en bucle —el patrón [ReAct](/ia-agentes/agentes/react-razonar-actuar)— decidiendo por sí mismo qué herramienta usar en cada paso. Potente, pero también más difícil de gobernar: por algo conviene saber [cuándo dejar que decida solo y cuándo no](/ia-agentes/agentes/agente-vs-pipeline).

## El costo escondido de "hacer cosas"

Acá viene lo interesante para quien decide. Un chatbot que se equivoca te da una respuesta mala: molesto, recuperable. Un agente que se equivoca te **cancela una suscripción que no querías cancelar**. El error deja de ser textual y pasa a tener consecuencias.

Por eso el salto de FAQ a acción no es solo técnico, es de responsabilidad. Cada herramienta que conectás amplía lo que el agente puede hacer bien… y lo que puede romper. La pregunta de diseño no es "¿puede ejecutar esto?", sino "¿qué pasa si lo ejecuta cuando no debía?".

Mi regla práctica: empezá como chatbot que **propone** la acción y deja que el humano la confirme con un click. Recién cuando los logs muestran que la propuesta es correcta el 99% de las veces, automatizás la ejecución. Es el mismo principio de [human-in-the-loop](/hiperautomatizacion/idp/human-in-the-loop) que se usa en extracción de documentos: la máquina sugiere, el humano valida, y el control se suelta solo cuando los números lo justifican.

## El resumen

Chatbot: te informa. Agente conversacional: te resuelve. El primero vive en el lenguaje; el segundo cruza al mundo donde las cosas cambian de verdad. Y justo por eso, el segundo merece muchísimo más cuidado antes de soltarlo a producción.
