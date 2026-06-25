---
title: "Minería de datos vs machine learning: no son lo mismo"
date: "2026-05-14"
excerpt: "Se usan como sinónimos en LinkedIn, pero responden preguntas distintas: una descubre lo que ya pasó, la otra apuesta a lo que va a pasar."
tags: ["mineria", "patrones", "curiosidades"]
category: "data-ml"
subcategory: "mineria-de-datos"
---

En LinkedIn se usan como intercambiables: "data mining", "machine learning", "IA", todo en la misma bolsa. Pero son cosas distintas, y confundirlas lleva a usar la herramienta equivocada para la pregunta equivocada. La distinción más útil que conozco es esta: **la minería de datos descubre, el machine learning predice**.

## La pregunta que responde cada una

La minería de datos mira un montón de datos que ya tenés y pregunta: *¿qué patrones, asociaciones o estructuras escondidas hay acá?* Es retrospectiva y descriptiva. No le pedís que adivine el futuro; le pedís que te muestre lo que ya está en los datos pero no ves a simple vista. Las [reglas de asociación del changuito del super](/data-ml/mineria-de-datos/soporte-confianza-lift) son el ejemplo clásico: encontrás que A y B van juntos, y listo.

El machine learning mira datos del pasado y pregunta otra cosa: *¿qué función aprendo para predecir un valor nuevo que todavía no vi?* Es prospectivo. Entrenás un modelo con casos etiquetados y después le tirás un caso nuevo para que apueste. ¿Este mail es spam? ¿Cuánto va a vender la sucursal el mes que viene?

## Descubrir no es lo mismo que apostar

La diferencia tiene una consecuencia práctica enorme. Cuando minás patrones, el peligro es leer causalidad donde solo hay coincidencia —el error detrás del mito de [pañales y cerveza](/data-ml/mineria-de-datos/panales-cerveza), y el mismo que produce [correlaciones espurias entre el queso y las sábanas](/data-ml/eda/correlacion-espuria). Encontrás un patrón real y le inventás una historia que no estaba en los datos.

Cuando hacés machine learning, el peligro es otro: el **sobreajuste**. El modelo memoriza el ruido del pasado y falla con lo nuevo. Por eso un buen pipeline de ML separa datos de entrenamiento y de prueba: necesitás medir si la predicción generaliza, no si recitó de memoria.

| | Minería de datos | Machine learning |
|---|---|---|
| Pregunta | ¿Qué hay en los datos? | ¿Qué va a pasar? |
| Orientación | Descriptiva, al pasado | Predictiva, al futuro |
| Salida | Patrones, reglas, grupos | Un modelo que predice |
| Riesgo típico | Confundir correlación con causa | Sobreajuste |

## El solapamiento real

Para complicar el cuadro: se pisan. La minería usa técnicas de ML (clustering, por ejemplo, para descubrir segmentos) y el ML necesita minería previa para entender los datos antes de modelar. No son cajas separadas; son fases distintas de un mismo trabajo con datos.

La forma sana de pensarlo: **minás primero para entender, modelás después para predecir**. Si te saltás la minería, entrenás un modelo sobre datos que no comprendés —y ahí aparecen los desastres, como descubrir tarde que [tus datos arrastraban un sesgo del superviviente](/data-ml/mineria-de-datos/sesgo-superviviente) o que [los valores faltantes te estaban gritando algo](/data-ml/eda/valores-faltantes-gritan).

No es una pelea por cuál es mejor. Es saber qué pregunta tenés sobre la mesa. ¿Querés entender lo que ya pasó, o querés apostar a lo que viene? La respuesta decide la herramienta.
