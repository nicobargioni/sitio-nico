---
title: "ReAct: agentes que razonan y actúan en bucle"
date: "2026-05-02"
excerpt: "El patrón pensar→actuar→observar que convierte un LLM en algo que parece decidir solo. Sin magia: solo un loop bien armado."
tags: [agentes, llm, curiosidades]
category: "ia-agentes"
subcategory: "agentes"
---

Pedile a un LLM que te diga el clima en Buenos Aires y te va a inventar un número convincente. No tiene termómetro. Pero si le das una herramienta para consultar el clima y le enseñás a usarla en el momento justo, deja de adivinar y empieza a chequear. Ese salto —de hablar a actuar— es el corazón del patrón **ReAct**.

## Pensar, actuar, observar

ReAct viene de *Reasoning + Acting*. La idea, propuesta en un paper de 2022, es entrelazar dos cosas que antes iban separadas: el razonamiento en lenguaje natural y la ejecución de acciones concretas. El loop es así:

1. **Thought** (pensamiento): el modelo razona en voz alta sobre qué necesita. "Para responder esto necesito saber el clima actual."
2. **Action** (acción): elige una herramienta y la invoca. `get_weather("Buenos Aires")`.
3. **Observation** (observación): recibe el resultado real del mundo. "18°C, nublado."

Y vuelve a empezar. Cada observación alimenta el próximo pensamiento, hasta que el modelo decide que ya tiene lo suficiente para responder. Es básicamente [chain-of-thought](/ia-agentes/llms-prompting/cadena-pensamiento) pero con una diferencia clave: en vez de razonar en el vacío, el razonamiento se ancla en datos que el modelo trae del mundo exterior.

## Por qué importa el bucle

Lo interesante no es la herramienta en sí —eso es [function calling](/ia-agentes/agentes/function-calling)— sino la **iteración**. Un solo paso no alcanza para tareas reales: buscar un dato, usarlo para decidir el siguiente paso, corregir si algo falla.

Mirá la diferencia con un razonamiento de un tiro:

```
Thought: necesito la población de Córdoba para calcular la densidad.
Action: search("población Córdoba Argentina")
Observation: 1.330.000 habitantes (2022)
Thought: ahora necesito la superficie.
Action: search("superficie ciudad de Córdoba km2")
Observation: 576 km²
Thought: densidad = 1.330.000 / 576 ≈ 2309 hab/km². Ya puedo responder.
```

Cada paso depende del anterior. El modelo no planeó todo de entrada: fue ajustando según lo que observaba. Esa capacidad de adaptarse sobre la marcha es lo que separa a un agente de una receta fija.

## El truco está en el contexto

Acá hay algo que se pierde fácil: cada pensamiento, acción y observación se va acumulando en la conversación. El modelo no tiene memoria propia entre llamadas —solo ve lo que está en su [ventana de contexto](/ia-agentes/llms-prompting/ventana-contexto). Por eso el historial completo del loop viaja en cada iteración. Si el bucle se hace muy largo, podés llenar el contexto de basura y el agente empieza a perder el hilo.

Y ojo: ReAct no garantiza nada. El modelo puede razonar mal, elegir la herramienta equivocada o quedar dando vueltas sin converger. Decidir cuánta libertad darle es una decisión de diseño en sí misma, y vale la pena pensar [cuándo conviene un agente y cuándo un pipeline rígido](/ia-agentes/agentes/agente-vs-pipeline).

## Lo que cambia

ReAct no es inteligencia nueva: es el mismo LLM, pero conectado al mundo en un loop. La gracia está en que con un patrón tan simple —pensá, actuá, observá, repetí— un modelo de texto deja de ser un loro elocuente y empieza a resolver cosas que requieren chequear la realidad. No es magia. Es un bucle bien armado, con frenos puestos a tiempo.
