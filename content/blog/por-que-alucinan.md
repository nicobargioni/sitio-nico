---
title: "Por qué los LLM alucinan con tanta seguridad"
date: "2026-05-09"
excerpt: "Un LLM puede inventarte una cita falsa con una bibliografía perfecta. No es un bug raro: es lo que hace siempre, solo que a veces acierta."
tags: ["llm", "prompting", "curiosidades"]
category: "ia-agentes"
subcategory: "llms-prompting"
---

Cuando un LLM "alucina" —te inventa un dato, una cita, un número— no está fallando en algo que normalmente hace bien. Está haciendo exactamente lo mismo de siempre. La alucinación no es un modo defectuoso: es el modo único, visto desde un caso donde no acertó.

> Un LLM no consulta una base de datos de verdades. Predice qué texto es plausible que siga. A veces lo plausible coincide con lo verdadero, y a veces no.

## Es un generador de plausibilidad, no de verdad

En el fondo, un modelo de lenguaje estima una distribución: dado lo que viene antes, ¿qué token es probable que siga? Esa probabilidad se aprende de patrones en el texto de entrenamiento, no de un registro de hechos. Cuando le preguntás por el autor de un paper que existe, el patrón "título → autor real" es fuerte y suele acertar. Cuando le preguntás por uno que no conoce, el modelo igual produce una respuesta con la **forma** de una cita correcta: un apellido verosímil, un año, una revista que suena bien. No tiene un mecanismo interno que le diga "esto me lo estoy inventando".

Por eso la seguridad con la que responde no es señal de nada. El tono confiado y el tono dudoso son, los dos, texto generado. No hay un medidor de certeza calibrado detrás de la prosa.

## Por qué suenan tan convincentes

La fluidez es justamente el problema. El modelo está optimizado para producir texto coherente y bien formado, y eso aplica tanto a lo cierto como a lo falso. Una cita inventada tiene la misma gramática impecable que una real. Eso explota un sesgo nuestro: tendemos a confundir fluidez con veracidad.

Algunos factores que empujan la alucinación:

- **Lagunas en el entrenamiento**: temas nicho, datos posteriores al corte, nombres poco frecuentes.
- **Preguntas que presuponen un hecho falso**: si das por sentado algo que no existe, el modelo suele "completar" en vez de corregirte.
- **Temperatura alta**: con [el dial de aleatoriedad](/ia-agentes/llms-prompting/temperatura-llm) subido, el modelo se anima a tokens menos probables, y ahí aumenta la invención.

## Cómo bajar el riesgo

No se elimina del todo, pero se contiene. La estrategia más efectiva es no pedirle que recite de memoria, sino darle el material: ese es el corazón de [RAG, darle los apuntes antes del examen](/ia-agentes/rag-embeddings/rag-apuntes-examen). Si el dato está en el contexto, el modelo lo copia en vez de inventarlo.

Otras prácticas que ayudan:

- Pedir **citas verificables** y chequearlas vos —nunca confiar en la bibliografía que genera.
- Permitir explícitamente el "no sé": muchos modelos alucinan menos si les das salida para reconocer ignorancia.
- Para tareas multi-paso, [hacerlo razonar paso a paso](/ia-agentes/llms-prompting/cadena-pensamiento) reduce errores de cálculo, aunque no garantiza la verdad de los hechos.

La conclusión es la de siempre, y conecta con [cuándo la IA suma de verdad](/ia-agentes/llms-prompting/cuando-la-ia-suma): el LLM es excelente generando borradores y procesando texto, pésimo como oráculo de hechos. La verificación no es opcional; es parte del trabajo.
