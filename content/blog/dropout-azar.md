---
title: "Dropout: por qué apagar neuronas al azar evita el sobreajuste"
date: "2026-06-03"
excerpt: "Romper la red a propósito durante el entrenamiento, apagando neuronas al azar, la vuelve más robusta. La intuición de por qué es preciosa."
tags: ["deep-learning", "redes-neuronales", "curiosidades"]
category: "data-ml"
subcategory: "deep-learning"
---

Imaginate que para entrenar a un equipo de fútbol, en cada práctica mandás a sentarse a la mitad de los jugadores, elegidos al azar. Suena a sabotaje. Y sin embargo es, más o menos, una de las técnicas más efectivas para que una red neuronal generalice mejor. Se llama dropout y la idea —Srivastava, Hinton et al. (2014)— es deliberadamente romper la red mientras aprende.

## Apagar para fortalecer

En cada paso de entrenamiento, dropout "apaga" cada neurona de una capa con probabilidad $p$ (típicamente 0,5). Esa neurona, en ese paso, no aporta nada: su salida es cero. En el paso siguiente se sortea de nuevo, así que en cada iteración la red entrena con una arquitectura ligeramente distinta.

```python
import torch.nn as nn

modelo = nn.Sequential(
    nn.Linear(512, 256), nn.ReLU(),
    nn.Dropout(p=0.5),          # apaga la mitad, al azar, en cada paso
    nn.Linear(256, 10),
)
```

> La clave: una neurona no puede confiar en que sus vecinas vayan a estar ahí. Tiene que aprender features que sirvan por sí solas.

Eso ataca de raíz la **coadaptación**: cuando varias neuronas se vuelven dependientes entre sí y memorizan en conjunto un detalle del dataset que no generaliza. Si en cualquier momento tu compañera puede desaparecer, te conviene aprender algo robusto y autónomo.

## La intuición que lo vuelve hermoso: un ensamble implícito

Acá está lo que me parece más elegante. Cada combinación de neuronas apagadas define una **subred distinta**. Una capa con $n$ neuronas tiene $2^n$ subredes posibles. Entrenar con dropout es, en la práctica, entrenar de a pedacitos un número exponencial de redes que **comparten pesos**.

Y al momento de predecir, en vez de muestrear, se usan todas las neuronas con sus salidas escaladas por $p$. Eso aproxima el **promedio** de todas esas subredes. Es decir: dropout es un método de ensamble disfrazado, parecido en espíritu a juntar muchos árboles en un Random Forest, pero sin pagar el costo de entrenar y guardar miles de modelos separados. Un solo entrenamiento, el efecto de un comité enorme.

Esto explica por qué dropout reduce la varianza del modelo: promediar muchas hipótesis suaviza los caprichos de cada una.

## Cuándo conviene y cuándo no

Dropout es una de varias herramientas contra el sobreajuste, y no siempre la mejor:

- **Rinde** en redes densas grandes con muchos parámetros y datos limitados.
- **Estorba** a veces en redes convolucionales modernas, donde la batch normalization suele cumplir mejor el rol regularizador.
- **Pelea** con la idea del [doble descenso](/data-ml/deep-learning/doble-descenso): a veces el remedio al sobreajuste no es regularizar más, sino agrandar el modelo. No son contradictorios, pero sí dos filosofías distintas de atacar el mismo problema.

Hay una conexión más profunda. Si entrenar con dropout equivale a un ensamble de subredes que comparten pesos, no es raro que dentro de una red entrenada viva una subred chica capaz de sostener sola la performance: justo lo que propone la [hipótesis del billete de lotería](/data-ml/deep-learning/billete-loteria). Y todo esto descansa sobre el hecho de que la red **podía** representar la solución desde el arranque, lo que garantiza el [teorema de aproximación universal](/data-ml/deep-learning/aproximacion-universal); el problema, otra vez, era entrenarla para que generalice.

Dropout no agrega capacidad. Le pone trabas a la red para que no se vuelva floja ni dependiente. A veces la mejor forma de que algo aprenda de verdad es no dejarle el camino tan fácil.
