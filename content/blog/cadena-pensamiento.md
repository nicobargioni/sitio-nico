---
title: "Chain-of-thought: por qué pedirle que 'piense paso a paso' funciona"
date: "2026-05-10"
excerpt: "Una frase de cinco palabras puede mejorar el razonamiento de un LLM. No es magia: tiene que ver con cómo genera texto."
tags: ["llm", "prompting", "curiosidades"]
category: "ia-agentes"
subcategory: "llms-prompting"
---

¿Sabías que agregar "pensá paso a paso" al final de un prompt puede subir notablemente la cantidad de respuestas correctas en problemas de razonamiento? No es un truco esotérico ni un easter egg: es una consecuencia directa de cómo un modelo de lenguaje produce su salida.

> Un LLM no calcula la respuesta y después la escribe. Escribe, y al escribir, calcula.

## Por qué una frase cambia el resultado

Un LLM genera texto de a un token por vez, y cada token nuevo se condiciona en todo lo que ya escribió. Si le pedís el resultado de golpe, tiene una sola "pasada" para llegar a la respuesta correcta: todo el cómputo tiene que caber en esa transición. Para una multiplicación de varios dígitos o un problema con tres pasos lógicos, eso muchas veces no alcanza.

Cuando le pedís que razone en voz alta, pasa algo distinto. Cada paso intermedio que escribe se vuelve parte del contexto del siguiente token. El modelo construye un andamiaje y se apoya en él. Es la diferencia entre resolver `17 × 24` de memoria y resolverlo con lápiz y papel: el papel no te hace más inteligente, te da dónde apoyar el cálculo.

Esto se llama **chain-of-thought** (cadena de pensamiento), y aparece en el paper de Wei y colegas de 2022. Lo curioso es que el efecto es mucho más fuerte en modelos grandes; en los chicos a veces ni se nota.

## Lo que NO es

Hay un malentendido frecuente que conviene desarmar: la cadena de pensamiento que ves **no es** necesariamente el razonamiento real del modelo. Es texto generado, igual que cualquier otro, y como tal puede sonar coherente y aun así llegar a una conclusión equivocada. De hecho, hay trabajos que muestran que un modelo puede escribir una justificación impecable para una respuesta que ya tenía sesgada de antemano. El "paso a paso" ayuda al cómputo, pero no es una ventana transparente a su mente, en parte por [la misma naturaleza generativa que lo hace alucinar](/ia-agentes/llms-prompting/por-que-alucinan).

Algunas formas prácticas de aprovecharlo:

- **Pedir los pasos explícitamente**: "resolvé mostrando cada paso antes de dar el total".
- **Few-shot con razonamiento**: darle uno o dos ejemplos resueltos con su lógica intermedia.
- **Self-consistency**: generar varias cadenas con [algo de temperatura](/ia-agentes/llms-prompting/temperatura-llm) y quedarse con la respuesta más votada.

## Cuándo conviene y cuándo no

No todo problema necesita esto. Para una clasificación simple o una extracción de datos, pedir razonamiento solo suma tokens, latencia y costo —recordá que [el modelo cobra por token, no por palabra](/ia-agentes/llms-prompting/tokens-no-palabras)—. La cadena de pensamiento rinde cuando hay varios pasos encadenados: aritmética, lógica, planificación. Por algo es el mecanismo que está debajo de [los agentes que razonan y actúan en bucle](/ia-agentes/agentes/react-razonar-actuar): cada vuelta del ciclo es, en el fondo, un paso de razonamiento explícito.

La moraleja, en clave de [cuándo la IA suma de verdad](/ia-agentes/llms-prompting/cuando-la-ia-suma): el "paso a paso" es una herramienta, no un conjuro. Le das al modelo lugar donde apoyar el cálculo, no una garantía de que el cálculo esté bien. Esa verificación sigue siendo tuya.
