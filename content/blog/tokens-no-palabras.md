---
title: "Los LLM no leen palabras: el mundo visto en tokens"
date: "2026-05-11"
excerpt: "¿Sabías que un modelo top puede fallar al contar las erres de 'strawberry'? No es tonto: es que nunca vio la palabra como vos."
tags: ["llm", "prompting", "curiosidades"]
category: "ia-agentes"
subcategory: "llms-prompting"
---

> ¿Sabías que podés pedirle a un LLM enorme que cuente cuántas veces aparece la letra "r" en *strawberry* y te conteste, muy seguro, que dos? La respuesta correcta es tres. Y no es estupidez del modelo: es cómo lee el mundo.

Un LLM no procesa letras ni palabras. Procesa **tokens**: pedazos de texto que un algoritmo definió de antemano. Entender esto explica un montón de rarezas.

## Cómo se parte el texto

El método más usado se llama **BPE** (*Byte Pair Encoding*). La idea es simple y elegante: arrancás tratando cada carácter como una unidad y, mirando un corpus gigante, vas fusionando los pares de símbolos que más aparecen juntos. Si `t` y `h` aparecen pegados millones de veces, nace el token `th`. Después `the`, y así. El resultado es un vocabulario de decenas de miles de tokens donde las palabras frecuentes son una sola pieza y las raras se parten en varias.

Por eso `the` o `casa` suelen ser un token, pero una palabra poco común, un nombre propio o un término técnico puede partirse en tres o cuatro pedazos. Y el español, con menos peso en muchos corpus, tiende a fragmentarse más que el inglés: por la misma idea, escribirla en español puede costar **más tokens** que en inglés.

## Volvamos a "strawberry"

Para el modelo, `strawberry` probablemente no son nueve letras: es algo como `straw` + `berry`, dos tokens. Cuando le pedís contar las "r", le estás pidiendo que mire *dentro* de unidades que para él son indivisibles, como pedirte a vos que cuentes los átomos de una mesa de un vistazo. No tiene acceso directo al deletreo; lo reconstruye, y ahí se equivoca.

Esto aclara por qué los LLM son flojos en tareas que parecen triviales:

- Contar letras o sílabas.
- Invertir una palabra carácter por carácter.
- Hacer rimas o acrósticos perfectos.
- Aritmética con números largos (cada dígito o grupo es un token distinto).

No es que "no razonen": es que el sustrato sobre el que razonan no son los caracteres.

## Por qué te conviene saberlo

Tres consecuencias prácticas, más allá de la curiosidad:

1. **Pagás por token, no por palabra.** El costo y la [ventana de contexto](/ia-agentes/llms-prompting/ventana-contexto) se miden en tokens. Un prompt en español "abultado" puede salir más caro de lo que parece.
2. **Para tareas de deletreo, dale una mano.** Si necesitás que cuente o invierta letras, pedile que escriba la palabra separada por guiones primero. Al forzar el deletreo, lo sacás del problema de los tokens.
3. **Los embeddings nacen de acá.** Esos tokens son el punto de partida que después se convierte en vectores; sobre esa base se construye [la aritmética de los embeddings](/ia-agentes/rag-embeddings/rey-reina-embeddings) y todo el RAG.

## Para llevarte

La próxima vez que un modelo falle en algo "obvio" como contar letras, no asumas que es malo: fijate si el problema vive *debajo* del token. Esa misma lógica de elegir el próximo token, uno tras otro, es la que hace que [a veces alucine con seguridad](/ia-agentes/llms-prompting/por-que-alucinan) y la que conviene tener clara antes de evaluar [cuándo la IA suma de verdad](/ia-agentes/llms-prompting/cuando-la-ia-suma) en un proceso real.
