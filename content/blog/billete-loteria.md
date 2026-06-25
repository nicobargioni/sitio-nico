---
title: "La hipótesis del billete de lotería: redes diminutas escondidas en las grandes"
date: "2026-06-02"
excerpt: "Dentro de una red gigante vive una subred minúscula que, entrenada sola, alcanza la misma performance. Si supieras cuál, te ahorrarías el 90%."
tags: ["deep-learning", "redes-neuronales", "curiosidades"]
category: "data-ml"
subcategory: "deep-learning"
---

Acá va una idea que cuando la entendés te reordena la cabeza: dentro de una red neuronal grande entrenada, existe una **subred diminuta** —a veces el 10% o menos de las conexiones— que si la hubieras entrenado sola desde el principio, con sus pesos iniciales originales, llegaría a la misma performance que la red entera. Esa subred afortunada es el "billete de lotería ganador". El problema es que no sabés cuál es hasta entrenar todo.

## El experimento que la fundó

La hipótesis es de Frankle y Carbin (2019), y el procedimiento para encontrar el billete ganador se llama poda iterativa:

1. Inicializás una red grande con pesos aleatorios y **anotás esa inicialización**.
2. La entrenás hasta el final.
3. Podás las conexiones más chicas en valor absoluto (las que menos pesan).
4. **Reseteás** las conexiones que sobreviven a sus valores iniciales originales —no a unos nuevos— y reentrenás.
5. Repetís.

> El detalle crucial es el reseteo a la inicialización original. Si en cambio reinicializás al azar, la subred ya no aprende bien. El billete ganador no es solo la estructura: es la estructura **más** su semilla de pesos inicial.

Eso es lo desconcertante. La capacidad de aprender de esa subred estaba codificada en el sorteo inicial de pesos, antes de ver un solo dato. La red grande funciona, en parte, porque al ser enorme **compra muchos billetes de lotería a la vez**, y basta con que uno salga ganador.

## Por qué encaja con todo lo demás

Esta idea conversa de manera hermosa con otras piezas del deep learning:

- Explica por qué la **sobreparametrización ayuda a entrenar**: más parámetros, más billetes, más chances de que el descenso por gradiente tropiece con una subred entrenable. Es otra cara del [doble descenso](/data-ml/deep-learning/doble-descenso).
- Conecta con el [dropout](/data-ml/deep-learning/dropout-azar): si entrenar es en parte un ensamble de subredes que comparten pesos, no sorprende que alguna de esas subredes sea suficiente por sí sola.
- Y vuelve a separar **representar** de **entrenar**: el [teorema de aproximación universal](/data-ml/deep-learning/aproximacion-universal) garantizaba que la solución existía en alguna red; el billete de lotería sugiere que también existe en una red mucho más chica, solo que recién la encontrás después de entrenar la grande.

## Lo que cambia en la práctica

La promesa obvia es eficiencia: si pudieras identificar el billete ganador temprano, entrenarías una red 10 veces más liviana, más barata de servir y más rápida en inferencia. El obstáculo es que, hasta ahora, encontrarlo cuesta entrenar la red completa. Líneas de trabajo posteriores buscan billetes que se detecten en las primeras épocas o que transfieran entre tareas, en la misma familia de ideas que hace funcionar el [transfer learning](/data-ml/transfer-learning/por-que-funciona-transfer): reutilizar lo aprendido en vez de empezar de cero.

Hay matices honestos: la hipótesis es robusta en redes y datasets medianos, y más esquiva en modelos enormes, donde la receta original de poda no escala tan limpio. No es una ley universal todavía.

Pero la imagen mental queda. Una red gigante no es un monolito monolítico donde cada peso importa por igual. Es un boleto enorme lleno de combinaciones, y casi toda la magia la hace una fracción minúscula que ganó el sorteo. El resto, en buena medida, fue el precio de comprar suficientes chances.
