---
title: "Aprender de pocos ejemplos: few-shot y el poder de lo preentrenado"
date: "2026-05-28"
excerpt: "Un chico ve un quokka una vez y lo reconoce para siempre. ¿Por qué una IA necesita miles de fotos? Salvo que ya haya aprendido a ver antes."
tags: ["transfer-learning", "deep-learning", "curiosidades"]
category: "data-ml"
subcategory: "transfer-learning"
---

Mostrale a un chico de tres años la foto de un animal que nunca vio —un quokka, digamos— una sola vez. Después señalá quokkas en un grupo de fotos. Acierta. Una red neuronal entrenada desde cero, en cambio, necesitaría miles de imágenes etiquetadas para llegar ahí. ¿Por qué la diferencia es tan brutal? Y, más interesante: ¿cómo se achica?

## El problema de los pocos datos

El aprendizaje profundo clásico es hambriento. Aprender una categoría nueva desde cero implica ajustar millones de parámetros, y para que esos parámetros no memoricen sino que generalicen, hacen falta muchos ejemplos. Con cinco fotos de un quokka, una red entrenada de cero sobreajusta sin remedio: aprende las cinco fotos, no el concepto.

El **few-shot learning** apunta justo a eso: aprender clases nuevas con un puñado de ejemplos —cinco, uno (one-shot), o incluso cero (zero-shot)—. Y la clave para lograrlo es no empezar de cero.

## El truco: ya saber ver antes de aprender

El chico no reconoce al quokka desde cero. Trae años de experiencia visual: sabe qué es pelo, orejas, ojos, postura, proporción. Solo tiene que ubicar al quokka *dentro* de un espacio de conceptos que ya domina.

Un modelo preentrenado hace lo mismo. Gracias al transfer learning —ese que arranca con [features universales aprendidas en millones de imágenes](/data-ml/transfer-learning/por-que-funciona-transfer)— el modelo ya tiene un espacio rico de representaciones visuales. Aprender una clase nueva no es construir todo de cero, sino **ubicarla en un espacio que ya existe**. Y para eso, pocos ejemplos alcanzan.

El enfoque más intuitivo es el aprendizaje por métrica: en vez de un clasificador rígido, el modelo aprende a *medir parecido*. Convierte cada imagen en un vector y compara:

- Mostrás un ejemplo de cada clase nueva (el "soporte").
- Llega una imagen nueva, la convertís en vector.
- La asignás a la clase cuyo ejemplo tenga el vector más cercano.

No reentrenás nada: solo medís distancias en un espacio que el preentrenamiento ya construyó. Las "prototypical networks" llevan esto al extremo representando cada clase por el promedio de sus pocos ejemplos.

## Few-shot vs fine-tuning

¿Cuándo few-shot y cuándo fine-tuning común? Es una cuestión de cuántos datos tenés, una decisión emparentada con [cuándo congelar y cuándo descongelar capas](/data-ml/transfer-learning/congelar-o-no):

- **Cientos o miles de ejemplos** por clase: fine-tuning clásico.
- **Un puñado** (1 a 10) por clase: few-shot, apoyándote en métrica o en clasificadores livianos sobre features congeladas.
- **Cero ejemplos**: zero-shot, donde describís la clase con texto y modelos multimodales (tipo CLIP) la ubican sin haber visto ni una imagen.

Una ventaja extra del enfoque por métrica: como no reentrenás los pesos del cuerpo, esquivás de paso el [olvido catastrófico](/data-ml/transfer-learning/olvido-catastrofico). Agregar una clase nueva es agregar un prototipo, no resobreescribir la red.

## Por qué importa

El few-shot es lo que vuelve práctica la IA en el mundo real, donde casi nadie tiene millones de ejemplos etiquetados. Un control de calidad industrial con cinco fotos de cada defecto. Un reconocimiento de especies raras. Un clasificador de documentos con tres muestras por tipo.

La moraleja es elegante: la inteligencia no está solo en aprender rápido, sino en **tener una buena base sobre la cual aprender**. El quokka se reconoce fácil porque ya sabías ver. Y a las máquinas les pasa lo mismo.
