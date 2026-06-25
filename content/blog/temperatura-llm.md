---
title: "La temperatura de un LLM: el dial entre el robot y el poeta"
date: "2026-05-12"
excerpt: "¿Sabías que un solo número decide si un modelo responde como un manual técnico o como un improvisador? Se llama temperature."
tags: ["llm", "prompting", "curiosidades"]
category: "ia-agentes"
subcategory: "llms-prompting"
---

> ¿Sabías que el mismo modelo, con el mismo prompt, puede darte una respuesta distinta cada vez —o exactamente la misma siempre— según un solo número que casi nadie toca?

Ese número es la **temperatura** (`temperature`), y es uno de los pocos diales que de verdad cambia el carácter de un LLM. Te cuento qué hace por debajo, porque entenderlo te ahorra mucho prueba y error.

## Qué pasa adentro

Cuando un modelo va a elegir la próxima palabra (en realidad, el próximo *token*), no tiene una sola candidata: tiene una distribución de probabilidades sobre todo su vocabulario. Quizá `gato` tiene 60%, `perro` 25%, `dragón` 0,3%. La temperatura entra justo antes de ese sorteo, dividiendo los *logits* (los puntajes crudos) antes de pasarlos por la función softmax:

```
p_i = softmax(logit_i / T)
```

Con `T` baja (cerca de 0), las diferencias se exageran: la opción más probable se come casi toda la torta y el modelo se vuelve casi determinista, elige siempre lo más seguro. Con `T` alta (1,5 o 2), la distribución se aplana: tokens improbables ganan chances reales y aparecen giros inesperados —y también incoherencias.

Por eso lo pienso como un dial: **a la izquierda el robot** (predecible, repetitivo, conservador), **a la derecha el poeta** (creativo, sorpresivo, a veces delirante).

## Cuándo subirla y cuándo bajarla

- **Bajá a 0–0,3** cuando necesitás precisión y reproducibilidad: extracción de datos, clasificación, generar JSON, responder con hechos. No querés que invente.
- **Subí a 0,7–1,0** para escritura, brainstorming, variantes de copy, nombres de productos. Ahí la diversidad es la gracia.
- **Arriba de 1,3** solo para experimentar. Suele degenerar en texto raro.

Un detalle que confunde: temperatura 0 **no garantiza** determinismo total. Influyen el redondeo en punto flotante, la infraestructura y otros parámetros como `top_p` (que recorta la cola de la distribución antes de muestrear). Si necesitás reproducibilidad real, fijá también la `seed` cuando la API lo permita.

## El error que veo seguido

Mucha gente pelea con el prompt cuando el problema es la temperatura. Si tu clasificador "a veces acierta y a veces no" con el mismo input, no es que el prompt esté mal: es que lo dejaste en la temperatura por defecto y le pediste creatividad para una tarea que necesitaba disciplina. Y al revés: si tus textos suenan acartonados y repetitivos, bajarle la temperatura no ayuda; subila.

Este dial se entiende mejor cuando ves cómo el modelo arma cada respuesta token a token —algo que conté en [los LLM no leen palabras sino tokens](/ia-agentes/llms-prompting/tokens-no-palabras)—, y se conecta directo con [por qué a veces alucinan con tanta seguridad](/ia-agentes/llms-prompting/por-que-alucinan): una temperatura alta empuja al modelo hacia tokens menos probables, justo el terreno donde más fácil se va de tema. Si encima querés que el modelo razone mejor, el truco no es la temperatura sino [pedirle que piense paso a paso](/ia-agentes/llms-prompting/cadena-pensamiento).

## Para llevarte

La temperatura no hace al modelo "más inteligente": solo cambia cuánto se arriesga al elegir cada palabra. Antes de reescribir un prompt diez veces, fijate dónde está el dial. Y como siempre, vale la pena recordar [cuándo la IA suma de verdad](/ia-agentes/llms-prompting/cuando-la-ia-suma): el parámetro perfecto no salva un caso de uso que no debería existir.
