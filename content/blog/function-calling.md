---
title: "Function calling: cómo un LLM aprende a usar herramientas"
date: "2026-05-01"
excerpt: "Un LLM no ejecuta código ni llama APIs. Lo que hace es pedirlas con un formato prolijo. El truco que convierte texto en acción."
tags: [agentes, llm, curiosidades]
category: "ia-agentes"
subcategory: "agentes"
---

Hay un malentendido cómodo: que cuando un LLM "consulta tu base de datos" o "manda un mail", el modelo lo hace. No. Un LLM solo genera texto. Lo único que aprendió con *function calling* es a **pedir** que se ejecute algo, en un formato tan prolijo que tu código lo puede leer y actuar. El que ejecuta sos vos.

## El modelo no actúa: solicita

El flujo real es menos mágico de lo que parece:

1. Le pasás al modelo, junto al prompt, una lista de funciones disponibles con su descripción y sus parámetros.
2. El modelo, si lo cree necesario, en vez de responder en prosa devuelve un objeto estructurado: "quiero llamar a `buscar_pedido` con `id=4821`".
3. **Tu código** ejecuta esa función de verdad, contra tu API real.
4. Le devolvés el resultado al modelo, que recién ahí redacta la respuesta para el usuario.

El modelo nunca toca tu base de datos. Solo rellena un formulario y vos decidís si lo procesás. Esa separación es una bendición de seguridad: podés validar, loguear o rechazar cualquier pedido antes de ejecutarlo.

## Cómo se declara una herramienta

Lo que ve el modelo es algo así (esquema simplificado):

```json
{
  "name": "buscar_pedido",
  "description": "Busca un pedido por su ID y devuelve estado y total.",
  "parameters": {
    "type": "object",
    "properties": {
      "id": { "type": "integer", "description": "ID del pedido" }
    },
    "required": ["id"]
  }
}
```

Fijate que la `description` es tan importante como el código. El modelo decide *cuándo* y *con qué argumentos* llamar a la función leyendo esa descripción en lenguaje natural. Una descripción ambigua y elegirá mal la herramienta o inventará parámetros. Acá el prompt engineering no decora: define el comportamiento.

## El pegamento de los agentes

Function calling es el ladrillo que hace posible todo lo demás. El loop [ReAct de razonar y actuar](/ia-agentes/agentes/react-razonar-actuar) usa exactamente este mecanismo en su paso de "Action". Y es lo que separa un [chatbot que responde de un agente que hace cosas](/hiperautomatizacion/agentes-conversacionales/chatbot-vs-agente): el segundo tiene herramientas y sabe cuándo usarlas.

También es el patrón detrás de protocolos como MCP (Model Context Protocol), que estandariza cómo se le ofrecen herramientas a un modelo sin atarlo a una implementación particular.

## Dónde se rompe

Dos fallas típicas, y conviene tenerlas presentes:

- **Alucinar argumentos.** Si el usuario no dio el dato, el modelo puede inventarlo igual con tal de completar el formulario. Es la misma raíz por la que [los LLM alucinan con tanta seguridad](/ia-agentes/llms-prompting/por-que-alucinan): completan patrones plausibles, no verdades verificadas.
- **Elegir la herramienta equivocada** cuando hay varias parecidas, o encadenar llamadas que no van a ningún lado.

Por eso el código que rodea al modelo —validación de argumentos, límites de reintentos, manejo de errores— termina siendo tan importante como el modelo mismo. Function calling le da las manos al LLM. Pero las barandas las ponés vos.
