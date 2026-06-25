---
title: "Doble descenso: cuando tener más parámetros que datos mejora el modelo"
date: "2026-06-05"
excerpt: "La intuición clásica dice que un modelo enorme sobreajusta. El doble descenso muestra que pasada cierta línea, agrandarlo vuelve a funcionar."
tags: ["deep-learning", "redes-neuronales", "curiosidades"]
category: "data-ml"
subcategory: "deep-learning"
---

Toda la estadística clásica te enseña lo mismo: si tu modelo tiene demasiados parámetros, va a memorizar los datos de entrenamiento y fallar con los nuevos. Es el sobreajuste, y la cura era achicar el modelo. Después llegó el deep learning, entrenó redes con miles de millones de parámetros sobre datasets comparativamente chicos, y funcionó **mejor**. Esa anomalía tiene nombre: doble descenso.

## La curva que todos aprendimos (y está incompleta)

La teoría clásica dibuja una U. A medida que aumentás la complejidad del modelo, el error de test baja, toca un mínimo y después sube: ahí empieza el sobreajuste. El punto óptimo está en el fondo de la U, donde el modelo es "lo justo".

> El problema es que esa curva termina justo donde el deep learning recién empieza a ponerse interesante.

El punto crítico es la **frontera de interpolación**: el momento en que el modelo tiene exactamente la capacidad para ajustar perfectamente cada punto de entrenamiento, error de entrenamiento cero. Justo ahí, el error de test pega un pico horrible. La U clásica te dice "no cruces esa línea".

## Lo que pasa si la cruzás igual

El descubrimiento (Belkin et al., 2019) es que si seguís agrandando el modelo **más allá** de la frontera de interpolación, el error de test vuelve a bajar. Y a veces termina más bajo que el mínimo de la U clásica. La curva no es una U: es una U seguida de un segundo descenso. De ahí el nombre.

La idea de por qué pasa:

- En la **zona de interpolación exacta** hay una única manera fea de ajustar los datos, y es frágil: cualquier ruido la descalabra.
- En la **zona sobreparametrizada** hay infinitas soluciones que ajustan los datos. El descenso por gradiente, por cómo funciona, tiende a elegir entre ellas las más **suaves** y simples.

Esa preferencia implícita por soluciones simples se llama sesgo implícito del optimizador, y es la heroína silenciosa de toda esta historia. La red no solo puede representar la solución —eso ya lo garantizaba el [teorema de aproximación universal](/data-ml/deep-learning/aproximacion-universal)—, sino que entre las muchas que existen, el entrenamiento favorece las que generalizan.

## Por qué importa más allá de la curiosidad

El doble descenso reordena cómo pensamos el sobreajuste. La pregunta ya no es solo "¿cuántos parámetros?" sino "¿de qué lado de la frontera de interpolación estoy?". Un modelo mediano puede estar parado justo en el peor lugar posible —el pico— mientras que uno mucho más grande está en terreno seguro.

Esto conecta con otras herramientas que también combaten el sobreajuste por caminos distintos. El [dropout](/data-ml/deep-learning/dropout-azar) regulariza apagando neuronas al azar; el doble descenso sugiere que a veces el remedio no es regularizar más, sino agrandar. Y se vincula con la idea de que dentro de una red enorme vive una subred chica y eficaz, la [hipótesis del billete de lotería](/data-ml/deep-learning/billete-loteria): la sobreparametrización ayuda durante el entrenamiento aunque después puedas podar casi todo.

Conviene matizar: el doble descenso es claro en setups controlados y más difuso en producción, donde el ruido de las etiquetas y el tamaño real de los datos lo modulan. No es una licencia para agrandar modelos a ciegas. Pero sí derriba un dogma: que más parámetros que datos sea, por definición, un error. A veces es exactamente lo que necesitás.
