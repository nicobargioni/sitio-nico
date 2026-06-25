---
title: "Por qué una red entrenada en gatos sirve para radiografías"
date: "2026-06-01"
excerpt: "Una red que aprendió a ver gatos puede detectar neumonías. El truco está en las primeras capas, y es más profundo de lo que parece."
tags: ["transfer-learning", "deep-learning", "curiosidades"]
category: "data-ml"
subcategory: "transfer-learning"
---

Suena absurdo: agarrás una red neuronal entrenada para distinguir gatos de perros y, con poco esfuerzo, la convertís en un detector de neumonías en radiografías de tórax. Funciona. Y no es magia ni casualidad: es una de las propiedades más profundas y útiles del deep learning.

## Las primeras capas no aprenden gatos

Cuando una red convolucional aprende a ver, no empieza por el concepto "gato". Empieza por lo básico. Si mirás qué activa a las neuronas de las primeras capas, encontrás detectores de bordes, de manchas de color, de cambios de contraste. En la capa siguiente, combinaciones: esquinas, texturas, gradientes. Recién mucho más arriba aparecen partes reconocibles —un ojo, una oreja— y al final, el concepto completo.

Lo curioso es que **ese vocabulario inicial es universal**. Un borde es un borde en una foto de un gato, en una radiografía o en una imagen satelital. La luz cambia de intensidad de la misma forma en todos lados. Por eso las primeras capas, entrenadas con millones de fotos de cualquier cosa, ya saben hacer el 80% del trabajo visual de bajo nivel para casi cualquier dominio nuevo.

Si querés ver con detalle cómo una red pasa de bordes a conceptos, lo desarrollé en [cómo "ve" una CNN](/ia-agentes/vision/como-ve-una-cnn). Acá lo que importa es la consecuencia: ese conocimiento de bajo nivel es transferible.

## Reusar en vez de reaprender

La idea de transfer learning es simple. En lugar de entrenar una red desde cero —lo que exigiría millones de radiografías etiquetadas, que casi nadie tiene— tomás una red ya entrenada en ImageNet y reutilizás su "cuerpo". Las capas que aprendieron a ver bordes y texturas se quedan casi intactas; solo reemplazás la "cabeza" final, la que decide entre 1000 categorías de ImageNet, por una nueva que decida "neumonía / no neumonía".

El ahorro es brutal:

- **Datos**: en vez de millones de ejemplos, alcanzan unos pocos miles.
- **Cómputo**: horas en una GPU modesta en lugar de semanas en un cluster.
- **Estabilidad**: arrancás de un punto razonable, no de pesos aleatorios.

Esto es lo que vuelve viable hacer deep learning en dominios donde los datos escasean —medicina, industria, agricultura— sin el presupuesto de un laboratorio grande.

## Dónde está el límite

No todo transfiere igual de bien. Cuanto más se parece el dominio nuevo al original, mejor: fotos naturales transfieren mejor a fotos naturales que a radiografías, que son grises, planas y con estadísticas de imagen distintas. Las capas profundas, las que ya codifican conceptos específicos de ImageNet, sirven menos en un dominio lejano y a veces conviene volver a entrenarlas.

Ahí aparece la decisión central de todo proyecto de transfer learning: ¿qué capas dejo congeladas y qué capas reentreno? La respuesta depende de cuántos datos tenés y de cuán lejos está tu dominio del original; lo desarrollo en [fine-tuning vs feature extraction](/data-ml/transfer-learning/congelar-o-no). Y si vas a reentrenar, cuidado con borrar lo que la red ya sabía: ese es el problema del [olvido catastrófico](/data-ml/transfer-learning/olvido-catastrofico).

## Por qué importa

Que las features de bajo nivel sean universales no es un detalle técnico: es la razón por la que el deep learning se democratizó. Sin transfer learning, entrenar un buen modelo de visión sería un privilegio de unas pocas empresas. Con él, una clínica con tres mil radiografías puede tener un detector decente. La red aprendió a ver gatos, sí, pero en el camino aprendió a *ver*. Y eso, resulta, sirve para casi todo.
