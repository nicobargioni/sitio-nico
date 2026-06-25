---
title: "Data augmentation: enseñar con la misma foto mil veces"
date: "2026-04-25"
excerpt: "Rotar, recortar y espejar una imagen no es trampa: es la forma más barata de que un modelo de visión generalice en vez de memorizar."
tags: ["vision", "cnn", "curiosidades"]
category: "ia-agentes"
subcategory: "vision"
---

Tenés mil fotos de gatos y una red que se las aprende de memoria. En entrenamiento clava el 99%; con un gato nuevo, en otra pose y otra luz, se confunde. El problema clásico: pocos datos, sobreajuste asegurado. La solución más elegante y barata no es conseguir más fotos. Es enseñar con la misma foto mil veces, apenas distinta cada vez.

## La misma información, otra apariencia

La idea de fondo es que un gato sigue siendo un gato si lo rotás 15 grados, lo espejás, le subís el brillo o le recortás una esquina. La **etiqueta no cambia**, pero los píxeles sí. Cada variación es, para la red, una imagen nueva que carga exactamente el mismo concepto.

Las transformaciones más usadas:

- **Geométricas**: rotación, espejado horizontal, recortes (crops), zoom, traslaciones.
- **Fotométricas**: cambios de brillo, contraste, saturación, tinte de color.
- **De ruido y oclusión**: ruido gaussiano, *cutout* (tapar un parche al azar), blur.
- **Combinadas**: *mixup* (promediar dos imágenes y sus etiquetas), *CutMix* (pegar un recorte de una sobre otra).

En la práctica se aplican **al vuelo**, distintas en cada época, así la red casi nunca ve dos veces la misma imagen idéntica:

```python
import torchvision.transforms as T

aug = T.Compose([
    T.RandomResizedCrop(224),
    T.RandomHorizontalFlip(),
    T.ColorJitter(brightness=0.2, contrast=0.2),
])
```

## Por qué funciona: invarianzas a mano

Lo interesante es lo que le estás enseñando sin decírselo. Al mostrarle el mismo gato espejado, le marcás que **la orientación no importa** para la clase. Al variarle el brillo, que la iluminación tampoco. Estás inyectando *invarianzas* que querés que el modelo respete, conocimiento del dominio metido por la puerta de atrás.

Y hay un detalle fino: las aumentaciones tienen que ser **plausibles**. Espejar un gato horizontalmente está bien; espejar un dígito manuscrito convierte un 2 en algo que no existe, o peor, un 6 en un 9. La rotación de 180° de un auto en una foto de tránsito es ruido, no señal. Elegir mal las transformaciones le enseña al modelo cosas falsas.

> Data augmentation no crea información nueva. Redistribuye la que ya tenés para que el modelo aprenda **el concepto** y no la foto puntual.

Esto se apoya en cómo [una CNN construye su representación de bordes a conceptos](/ia-agentes/vision/como-ve-una-cnn): si las primeras capas detectan bordes y texturas, mostrarles esos mismos bordes en otra escala o ángulo refuerza detectores robustos en vez de memorias frágiles.

## El primo de la regularización

Aumentar datos cumple un rol parecido al de otras técnicas que combaten el sobreajuste, como [apagar neuronas al azar con dropout](/data-ml/deep-learning/dropout-azar): le ponés ruido controlado al entrenamiento para que el modelo no se aferre a detalles espurios. Es también lo que vuelve viable el [transfer learning con pocos ejemplos](/data-ml/transfer-learning/few-shot): partís de una red preentrenada y, con un puñado de imágenes bien aumentadas, la adaptás a tu problema sin que colapse.

Eso sí, no es magia infinita. Si tu modelo aprende invarianzas falsas —que la textura define la clase más que la forma— podés caer en [las ilusiones ópticas de las redes](/ia-agentes/vision/ilusiones-redes), donde un cambio de textura tira abajo la predicción. La augmentation bien diseñada ayuda justamente a evitar eso, forzando a mirar la forma global.

La moraleja que me llevo: antes de salir a etiquetar diez mil imágenes más, conviene preguntarse qué transformaciones dejan intacto el significado. Muchas veces, los datos que faltan ya los tenés. Solo hay que mostrarlos de otra manera.
