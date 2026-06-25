---
title: "Cómo 've' una CNN: de bordes a conceptos"
date: "2026-04-27"
excerpt: "Una red convolucional no entiende una cara de golpe: la arma capa por capa, de líneas a texturas a ojos a rostros."
tags: ["vision", "cnn", "curiosidades"]
category: "ia-agentes"
subcategory: "vision"
---

Cuando una red convolucional "reconoce" un gato, no lo ve como vos. No empieza por el animal entero y va bajando al detalle. Hace exactamente lo contrario: arma el gato desde abajo, juntando piezas cada vez más complejas. Y lo curioso es que esa jerarquía no se la programó nadie a mano: emerge sola durante el entrenamiento.

## Capa por capa, de lo simple a lo abstracto

Imaginá que apilás filtros, uno tras otro. Cada filtro mira una región chiquita de lo que le pasa la capa anterior y aprende a responder a un patrón.

- **Primeras capas**: detectan lo más primitivo. Bordes, líneas en distintos ángulos, manchas de color. Casi indistinguible de lo que hacen las neuronas de tu corteza visual primaria.
- **Capas intermedias**: combinan esos bordes en **texturas y formas**. Rejillas, curvas, patrones de piel, esquinas.
- **Capas profundas**: ensamblan esas formas en **partes de objetos**. Un ojo, una rueda, una oreja.
- **Capas finales**: juntan las partes en el **concepto completo**. Una cara, un auto, un gato.

La intuición es que un ojo no es más que cierta combinación de curvas y manchas, y una cara no es más que dos ojos, una nariz y una boca en la posición correcta. La red descubre esa receta sola.

## ¿Cómo sabemos que pasa esto?

Acá viene lo lindo: se puede *mirar*. Hay técnicas de visualización de features que, dada una neurona de una capa, generan la imagen que más la activa. Cuando lo hacés, ves con tus propios ojos cómo las primeras neuronas se prenden con rayitas y las profundas con texturas de pelaje o con caras enteras. Es una de las pruebas más elegantes de que la red no memoriza píxeles: aprende una **jerarquía de representaciones**.

```
entrada → [bordes] → [texturas] → [partes] → [objetos] → "gato"
              capa 1     capa 3      capa 5     capa 7
```

Esta progresión también explica por qué [una red entrenada en gatos sirve para leer radiografías](/data-ml/transfer-learning/por-que-funciona-transfer): los detectores de bordes y texturas de las primeras capas son útiles para casi cualquier imagen, vengan de donde vengan. Es la base del transfer learning y de buena parte de lo que destrabó [el momento ImageNet de 2012](/data-ml/transfer-learning/momento-imagenet).

## Por qué importa entenderlo

Saber que la red construye conceptos a partir de texturas y bordes no es trivia: explica sus errores. Si una CNN se apoya demasiado en la textura y poco en la forma global, podés terminar con [ilusiones ópticas de la red](/ia-agentes/vision/ilusiones-redes) donde un elefante con piel de gato se clasifica como gato. Y entender qué features mira cada capa es la puerta a temas más finos, como las [tres tareas distintas de la visión](/ia-agentes/vision/clasificar-detectar-segmentar) o por qué un parche bien diseñado puede romper todo.

La moraleja para mí es casi filosófica: la inteligencia visual de estas redes no es un truco monolítico. Es una pila de abstracciones simples, cada una parándose sobre la anterior. Nadie le enseñó qué es un ojo. Le mostramos millones de imágenes y dejamos que la jerarquía se acomodara sola. Que algo tan ordenado emerja del puro gradiente descendente sigue pareciéndome de las cosas más raras y hermosas del deep learning.
