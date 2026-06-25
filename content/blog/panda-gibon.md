---
title: "El panda que la red ve como gibón: ejemplos adversarios"
date: "2026-06-04"
excerpt: "Sumale a una foto de panda un ruido invisible al ojo humano y una CNN top dirá 'gibón' con 99% de confianza. No es un bug raro: es estructural."
tags: ["deep-learning", "redes-neuronales", "curiosidades"]
category: "data-ml"
subcategory: "deep-learning"
---

Hay una imagen que ya es un clásico del deep learning. A la izquierda, una foto de panda que un clasificador identifica como "panda" con 57% de confianza. En el medio, un patrón de ruido que parece estática de tele vieja. A la derecha, la suma de ambos: para vos sigue siendo idénticamente un panda, pero la red ahora dice "gibón" con **99,3% de confianza**. El ejemplo es de Goodfellow et al. (2015) y abrió una caja de la que todavía no salimos.

## No es un error de borde: es estructura

La tentación es pensar que la red se "confundió" por mala suerte. No. El ruido fue calculado a propósito para empujar la entrada en la dirección exacta donde el modelo es más sensible. Y se calcula con una fórmula casi insultante de simple:

```python
# FGSM: Fast Gradient Sign Method
ruido = epsilon * signo(gradiente_de_la_perdida_respecto_a_la_imagen)
imagen_adversaria = imagen + ruido
```

Se toma el gradiente de la pérdida respecto a los **píxeles** —no a los pesos— y se da un pasito en la dirección que más sube el error. Con un `epsilon` minúsculo, el cambio es imperceptible para el ojo pero devastador para la red.

> El modelo no está roto. Aprendió correlaciones reales en sus datos. El problema es que esas correlaciones viven en dimensiones que a nosotros nos resultan invisibles.

## Por qué pasa: la maldición de las dimensiones

Una imagen tiene cientos de miles de dimensiones. La red traza fronteras de decisión en ese espacio gigante, y resulta que casi cualquier punto está peligrosamente cerca de una frontera. Un empujón chiquito repartido entre miles de píxeles —cada uno casi imperceptible— suma un desplazamiento enorme en total. Es pariente directo de la [maldición de la dimensionalidad](/data-ml/clustering-pca/maldicion-dimensionalidad): en muchas dimensiones, "cerca" y "lejos" dejan de significar lo que creemos.

Lo más inquietante es que estos ejemplos **transfieren**: un ataque diseñado contra una red suele funcionar contra otra distinta, entrenada por separado. Eso sugiere que no es la idiosincrasia de un modelo, sino algo de cómo todas estas redes ven el mundo. Conecta con la idea de que aproximar bien los datos no garantiza robustez, el agujero que ya asomaba detrás del [teorema de aproximación universal](/data-ml/deep-learning/aproximacion-universal).

## Del paper al mundo real

Esto dejó de ser un juego de laboratorio. Un [sticker pegado en una señal de tránsito](/ia-agentes/vision/sticker-adversario) puede hacer que un auto autónomo lea "ceda el paso" donde dice "pare". Y al revés, los ejemplos adversarios son una herramienta de diagnóstico: muestran qué features espurias aprendió de verdad un modelo, no las que creemos que aprendió.

Algunas defensas que se usan:

- **Entrenamiento adversario:** meter ejemplos atacados en el set de entrenamiento para que la red los aprenda a resistir. Es lo más efectivo, pero caro.
- **Aumentar y diversificar datos** para reducir la dependencia de patrones frágiles, en la línea de la [data augmentation](/ia-agentes/vision/data-augmentation).
- **Destilación y suavizado** de las fronteras de decisión.

Ninguna resuelve el problema del todo: es una carrera armamentista permanente entre ataques y defensas. Lo que me queda es más sobrio que técnico. Una red puede tener 99% de accuracy y a la vez ser engañada por un ruido que vos ni ves. Confianza alta no es lo mismo que comprensión. Y esa distinción, en sistemas que toman decisiones reales, no es un detalle.
