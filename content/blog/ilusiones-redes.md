---
title: "Las ilusiones ópticas de las redes neuronales"
date: "2026-04-26"
excerpt: "Pegale piel de elefante a un gato y una CNN dirá 'elefante'. Las redes miran textura mucho más que forma, y eso explica errores raros."
tags: ["vision", "cnn", "curiosidades"]
category: "ia-agentes"
subcategory: "vision"
---

Tomá la silueta inconfundible de un gato y rellenale el interior con la textura arrugada de la piel de un elefante. Vos seguís viendo un gato sin dudar: la forma manda. Una red convolucional típica, en cambio, dice "elefante" con toda confianza. Este experimento, popularizado por un grupo de Tübingen, reveló algo incómodo: las CNN no ven el mundo como nosotros.

## Las personas vemos formas; las CNN ven texturas

Cuando un humano reconoce un objeto, el contorno global pesa muchísimo. Por eso entendés un dibujo a línea, una silueta o un boceto. Las redes entrenadas sobre fotos naturales desarrollan el sesgo opuesto: se apoyan desproporcionadamente en la **textura local** y bastante poco en la **forma global**.

Tiene su lógica. Para minimizar el error en millones de fotos reales, la textura es una pista barata y casi siempre correcta: el pelaje, la corteza, la piel. La red toma el atajo estadístico que mejor le funciona en el set de entrenamiento, no el que más se parece a la percepción humana.

- Pelaje rayado → "tigre", sin importar mucho la silueta.
- Piel rugosa gris → "elefante".
- Textura de canasto → "canasta", aunque la forma diga otra cosa.

## Por qué esto no es solo una curiosidad

El sesgo de textura es la raíz de varios problemas prácticos:

- **Fragilidad ante cambios de estilo**. Un modelo entrenado con fotos nítidas puede fallar feo con dibujos, pinturas o imágenes con ruido, porque la textura cambió aunque la forma siga ahí.
- **Generalización pobre**. Si el objeto aparece con una textura inusual, la red se pierde.
- **Puerta a los engaños**. Que el modelo se cuelgue de patrones locales en vez del concepto global es justamente lo que explotan los [ataques con stickers contra autos autónomos](/ia-agentes/vision/sticker-adversario) y los [ejemplos adversarios tipo panda-gibón](/data-ml/deep-learning/panda-gibon).

Todo esto conecta con [cómo una CNN construye lo que ve](/ia-agentes/vision/como-ve-una-cnn): si las capas profundas dan demasiado peso a las features de textura de las capas intermedias, el contorno global queda relegado.

## Cómo se corrige el sesgo

La buena noticia es que el sesgo no es destino. La intervención más efectiva fue de datos, no de arquitectura: entrenar con imágenes **estilizadas**, donde a cada objeto se le cambia la textura por otra al azar. Si la textura ya no es una pista confiable, la red se ve forzada a aprender la forma.

Esto es [data augmentation](/ia-agentes/vision/data-augmentation) llevado al extremo conceptual: no solo rotás o recortás, sino que rompés deliberadamente la correlación que la red estaba abusando. Modelos entrenados así no solo se vuelven más robustos a ataques y a cambios de dominio, sino que se acercan un poco más a la forma en que percibimos nosotros.

Me gusta esta historia porque desarma un mito. La red no "ve mal" por torpeza: ve distinto porque optimizó algo distinto. Vio millones de fotos y dedujo que la textura era la apuesta ganadora. El día que cambiamos las reglas del juego de los datos, cambió su forma de mirar. La percepción de una máquina es, al final, un reflejo de lo que le dimos para aprender.
