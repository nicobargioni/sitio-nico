---
title: "Olvido catastrófico: cuando aprender algo nuevo borra lo viejo"
date: "2026-05-30"
excerpt: "Enseñale a una red una tarea nueva y se olvida de la anterior. No medio: la borra casi por completo. Por qué pasa y por qué es tan difícil de resolver."
tags: ["transfer-learning", "deep-learning", "curiosidades"]
category: "data-ml"
subcategory: "transfer-learning"
---

Imaginá un alumno que aprende a multiplicar y, en el acto de aprender a dividir, se olvida por completo de multiplicar. No medio confundido: cero, no le queda nada. A las redes neuronales les pasa exactamente eso, y tiene un nombre tan dramático como preciso: **olvido catastrófico**.

## El experimento que lo muestra

Entrená una red para clasificar dígitos del 0 al 4. Aprende bien. Ahora, sin volver a mostrarle los dígitos viejos, entrenala con los del 5 al 9. Aprende los nuevos... y su precisión en los del 0 al 4 se desploma, a veces a niveles de azar. La red no "agregó" conocimiento: **lo sobreescribió**.

Esto choca de frente con la intuición humana. Nosotros acumulamos. Una red, en cambio, no tiene un casillero separado para cada cosa que aprende.

## Por qué pasa: pesos compartidos

La causa está en cómo una red guarda lo que sabe. El conocimiento no vive en una neurona específica, sino **distribuido en los pesos de toda la red**. Entrenar es ajustar esos pesos por descenso de gradiente para minimizar el error en la tarea *actual*.

El problema es que el gradiente no tiene memoria. Cuando empuja los pesos hacia lo óptimo para la tarea nueva, no sabe ni le importa que algunos de esos pesos eran cruciales para la tarea vieja. Los mueve igual. Y como el conocimiento está distribuido, mover unos pocos pesos clave alcanza para destruir la representación anterior.

Es, en cierto sentido, la otra cara de [por qué el transfer learning funciona](/data-ml/transfer-learning/por-que-funciona-transfer): los pesos son compartidos y reutilizables, lo cual es genial cuando querés transferir, pero peligroso cuando querés acumular sin pisar.

## Cómo se intenta frenar

No hay una solución perfecta, pero sí varias familias de trucos:

- **Rehearsal (repaso)**: mientras entrenás la tarea nueva, intercalás ejemplos de las viejas. Funciona, pero exige guardar datos antiguos —no siempre posible por privacidad o espacio.
- **Regularización**: penalizás mover los pesos que fueron importantes para tareas anteriores. EWC (Elastic Weight Consolidation) estima qué tan crítico es cada peso y lo "ancla" con un resorte proporcional.
- **Arquitecturas dinámicas**: agregás capacidad nueva (neuronas o módulos) para la tarea nueva y congelás lo viejo, evitando la sobreescritura a costa de un modelo que crece.

Y el más simple de todos: en transfer learning clásico, **congelar capas**. Si no permitís que ciertos pesos se muevan, no se pueden olvidar. Es la razón profunda por la que congelar es tan común; lo desarrollo en [cuándo congelar y cuándo descongelar](/data-ml/transfer-learning/congelar-o-no).

## Por qué importa

El olvido catastrófico es uno de los grandes obstáculos del **aprendizaje continuo**: la idea de modelos que aprendan toda la vida, sumando habilidades como hacemos las personas, sin tener que reentrenar desde cero cada vez. Hoy, en la práctica, cada vez que querés que un modelo aprenda algo realmente nuevo, lo más seguro suele ser reentrenarlo con *todos* los datos juntos —caro e incómodo.

Resolverlo de verdad cambiaría cómo construimos sistemas de IA: en lugar de modelos congelados que reemplazamos enteros, tendríamos modelos que evolucionan. Es un recordatorio incómodo de que estas redes, por más impresionantes que sean, todavía no aprenden como nosotros. Aprenden, y en el camino, olvidan.
