---
title: "Fine-tuning vs feature extraction: cuándo congelar y cuándo descongelar capas"
date: "2026-05-31"
excerpt: "La decisión que define todo proyecto de transfer learning se reduce a dos preguntas: cuántos datos tenés y cuán parecido es tu dominio."
tags: ["transfer-learning", "deep-learning", "curiosidades"]
category: "data-ml"
subcategory: "transfer-learning"
---

Agarraste una red preentrenada y la querés adaptar a tu problema. Ahora viene la pregunta que separa a quien sabe de quien copia un tutorial: ¿dejás las capas originales congeladas o las descongelás para reentrenarlas? La respuesta no es de gusto. Es una decisión de ingeniería con reglas claras.

## Dos estrategias, una misma red

Hay dos formas de reaprovechar una red preentrenada:

- **Feature extraction (congelar)**: dejás los pesos del cuerpo de la red intactos y solo entrenás una cabeza nueva encima. La red preentrenada actúa como un extractor fijo de features; vos solo aprendés a clasificar a partir de ellas.
- **Fine-tuning (descongelar)**: además de la cabeza nueva, permitís que algunas (o todas) las capas originales ajusten sus pesos a tu dominio, normalmente con un learning rate chico para no destruir lo aprendido.

Feature extraction es rápido, barato y resistente al sobreajuste. Fine-tuning es más potente pero más caro y más fácil de arruinar.

## La matriz que decide por vos

La elección depende de dos ejes: **cuántos datos tenés** y **cuán parecido es tu dominio** al original de la red. Cruzándolos salen cuatro escenarios:

| | Dominio parecido | Dominio distinto |
|---|---|---|
| **Pocos datos** | Congelar todo, entrenar solo la cabeza | Congelar la mayoría, reentrenar capas medias |
| **Muchos datos** | Fine-tuning suave de capas altas | Fine-tuning amplio (o entrenar de cero) |

La lógica detrás: con pocos datos, descongelar mucho es pedirle a la red que aprenda millones de parámetros con un puñado de ejemplos —receta segura de sobreajuste. Con muchos datos podés permitirte ajustar más sin que la red memorice.

Y el eje del dominio se apoya en algo que vimos en [por qué una red de gatos sirve para radiografías](/data-ml/transfer-learning/por-que-funciona-transfer): las primeras capas aprenden features universales (bordes, texturas) que casi nunca conviene tocar. Las capas profundas codifican conceptos específicos del dominio original; esas son las primeras candidatas a descongelar cuando tu problema se aleja.

## La regla práctica del descongelado gradual

Cuando hacés fine-tuning, no descongeles todo de golpe. El patrón que mejor funciona:

1. **Empezá congelando todo** y entrená solo la cabeza nueva hasta que estabilice.
2. **Descongelá de arriba hacia abajo**: primero las capas más profundas (las más específicas), después las medias.
3. **Bajá el learning rate** al descongelar, típicamente 10x menos que el de la cabeza. Pesos preentrenados valiosos se arruinan con pasos grandes.
4. **No toques las primeras capas** salvo que tengas muchísimos datos y un dominio muy distinto.

Saltarse el paso 3 es el error más común: un learning rate alto sobre capas preentrenadas borra de un saco lo que la red había aprendido en millones de imágenes. Ese fenómeno tiene nombre, lo cuento en [olvido catastrófico](/data-ml/transfer-learning/olvido-catastrofico).

## El sesgo que conviene tener

Ante la duda, **congelá más de lo que tu intuición pide**. Feature extraction casi nunca te deja peor que un baseline, mientras que un fine-tuning agresivo con pocos datos puede dejarte por debajo de no haber transferido nada. Si tenés tan pocos ejemplos que ni eso alcanza, ya estás en territorio de [few-shot learning](/data-ml/transfer-learning/few-shot), donde el preentrenamiento hace todavía más trabajo.

La pregunta no es "¿fine-tuning o feature extraction?" como si una fuera mejor. Es "¿cuánto puedo permitirme mover sin romper lo que ya funciona?". Y casi siempre, la respuesta es: menos de lo que creías.
