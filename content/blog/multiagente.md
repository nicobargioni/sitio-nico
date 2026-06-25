---
title: "Sistemas multiagente: cuando varios LLM colaboran (y discuten)"
date: "2026-04-28"
excerpt: "Si un agente es bueno, ¿muchos son mejores? A veces sí, a veces es un teléfono descompuesto carísimo. Cuándo dividir el trabajo y cuándo no."
tags: [agentes, llm, curiosidades]
category: "ia-agentes"
subcategory: "agentes"
---

La idea es seductora: en vez de un agente que haga todo, armás varios, cada uno especialista en algo, y los hacés trabajar juntos. Uno investiga, otro escribe, otro revisa. Como un equipo. El problema es que los equipos también tienen reuniones interminables, malos entendidos y gente que se pisa. Los sistemas multiagente heredan todo eso.

## Las dos formas de juntar agentes

Hay básicamente dos arquitecturas, y conviene no confundirlas:

- **Colaboración por división.** Un orquestador reparte el trabajo en subtareas y se las da a agentes especializados. Cada uno resuelve lo suyo y devuelve su parte. Es como un jefe de proyecto repartiendo tickets. Funciona bien cuando la tarea se puede *descomponer* en piezas independientes.
- **Debate o crítica.** Varios agentes atacan el mismo problema y discuten. Uno propone, otro critica, un tercero arbitra. La apuesta es que el ida y vuelta filtra errores que un agente solo no vería —algo así como una revisión de pares automática.

Las dos se construyen sobre el mismo ladrillo: cada agente individual sigue siendo un loop de [razonar y actuar](/ia-agentes/agentes/react-razonar-actuar) con acceso a sus propias [herramientas vía function calling](/ia-agentes/agentes/function-calling). Lo nuevo no es el agente, es el protocolo de cómo se hablan entre ellos.

## Por qué el debate a veces mejora las cosas

Hay algo real detrás de hacer discutir a los modelos. Cuando un LLM responde solo, su [cadena de pensamiento](/ia-agentes/llms-prompting/cadena-pensamiento) puede tomar un camino equivocado y nunca corregirlo —se queda convencido. Un segundo agente que solo critica tiene una ventaja: parte de la respuesta ya hecha y su único trabajo es buscarle el error. Es más fácil encontrar una falla que generar la solución perfecta de cero.

Por eso un patrón que rinde es **generador + crítico**: uno produce, el otro busca agujeros, el primero corrige. Dos roles, no dos cerebros idénticos. Si ponés dos agentes iguales a "discutir", muchas veces solo se dan la razón con más palabras.

## El costo que nadie te cuenta

Acá viene el balde de agua fría. Cada agente es una serie de llamadas al modelo. Tres agentes que conversan tres rondas no son tres llamadas: son nueve o más, con todo el contexto acumulándose en cada una. Multiagente es, casi siempre, **más lento y más caro** que un solo agente bien armado.

Y aparece un riesgo nuevo: el teléfono descompuesto. Si el agente A malinterpreta la tarea y le pasa instrucciones torcidas al B, el error se propaga y se amplifica. Más agentes significan más superficie para que las cosas se desalineen. Sumale que ahora tenés varios loops que pueden [quedarse pegados en bucle](/ia-agentes/agentes/agente-en-bucle), no uno solo.

## Cuándo sí, cuándo no

Mi regla práctica, después de romperme la cabeza con esto:

- **Empezá con un agente.** Casi siempre alcanza. Multiagente es la optimización, no el punto de partida.
- **Dividí solo si la tarea se descompone de verdad.** Si las subtareas son independientes y paralelizables, ganás. Si todo depende de todo, el orquestador se vuelve el cuello de botella.
- **Usá debate solo donde la calidad justifica el costo.** Para un borrador rápido, no. Para una decisión cara o un análisis que se va a publicar, el par crítico vale lo que cuesta.

## El cierre

Un sistema multiagente no es "más inteligencia", es "más coordinación". Y la coordinación tiene un costo que crece rápido. La pregunta correcta no es cuántos agentes poner, sino si el problema realmente se beneficia de dividirlo. La mayoría de las veces, un solo agente bien diseñado le gana a un comité de modelos hablando entre sí.
