---
title: "El teorema que dice que una red puede aprender casi cualquier cosa (y por qué no alcanza)"
date: "2026-06-06"
excerpt: "Una red de una sola capa puede aproximar cualquier función continua. Suena a magia. El problema es todo lo que el teorema no te dice."
tags: ["deep-learning", "redes-neuronales", "curiosidades"]
category: "data-ml"
subcategory: "deep-learning"
---

Hay un teorema que suena demasiado bueno para ser verdad: una red neuronal con **una sola capa oculta** puede aproximar cualquier función continua tan bien como quieras. Cualquiera. La que se te ocurra. Y sin embargo nadie entrena redes así. Esa contradicción esconde una de las lecciones más importantes del deep learning.

## Qué dice realmente el teorema

El teorema de aproximación universal (Cybenko, 1989; Hornik, 1991) afirma que dada una función continua $f$ sobre un dominio acotado y una tolerancia $\varepsilon$ por chica que sea, existe una red de una capa oculta con suficientes neuronas que aproxima $f$ con error menor a $\varepsilon$.

> Existe una red que lo logra. El teorema te promete que está ahí afuera. No te dice cómo encontrarla.

Y ahí está toda la trampa. Es un teorema de **existencia**, no de construcción. Es como decir "existe un número de teléfono que si lo marcás te toca la lotería". Probablemente sea cierto. Suerte buscándolo.

## Las tres letras chicas

El teorema calla tres cosas que en la práctica lo son todo:

- **Cuántas neuronas.** "Suficientes" puede significar una cantidad astronómica, que crece exponencialmente con la complejidad de la función. Inviable.
- **Si la vas a encontrar.** Garantiza que los pesos correctos existen, pero no que el descenso por gradiente los alcance. El optimizador puede quedarse a mitad de camino.
- **Si va a generalizar.** Aproximar bien los datos de entrenamiento no es lo mismo que funcionar con datos nuevos. Una red puede memorizar el dataset entero y fallar afuera.

Por eso el deep learning va por otro lado: en vez de una capa monstruosa, apila **muchas capas finas**. La profundidad permite representar funciones complejas con muchísimos menos parámetros que el ancho, componiendo features simples en otras cada vez más abstractas. Es exactamente lo que pasa cuando mirás [cómo 've' una CNN](/ia-agentes/vision/como-ve-una-cnn): bordes, después texturas, después objetos.

## La existencia no es el problema

El verdadero desafío del deep learning casi nunca es "¿puede esta red representar la solución?". Casi siempre es **"¿puedo entrenarla para que la encuentre y generalice?"**. Optimización y generalización, no capacidad de representación.

Esto explica fenómenos que parecen contradictorios. Que una red con más parámetros que datos a veces generalice mejor —el [doble descenso](/data-ml/deep-learning/doble-descenso)— o que dentro de una red gigante exista una subred diminuta que sola alcanza la misma performance, la [hipótesis del billete de lotería](/data-ml/deep-learning/billete-loteria). Si lo único que importara fuera la capacidad de aproximación, nada de eso tendría sentido.

Hay otra consecuencia incómoda: que una función exista y se pueda aproximar no garantiza que sea **robusta**. Una red puede aprender una frontera de decisión casi perfecta sobre los datos de entrenamiento y derrumbarse con un cambio imperceptible en la entrada, como en los [ejemplos adversarios](/data-ml/deep-learning/panda-gibon).

El teorema de aproximación universal es real y es hermoso. Pero es la base, no el edificio. Te asegura que la respuesta existe en algún lugar de un espacio inmenso. Encontrarla —y que sirva fuera del laboratorio— es el trabajo de verdad. Y ese trabajo no lo hace ningún teorema: lo hacés vos eligiendo arquitectura, datos y cómo entrenás.
