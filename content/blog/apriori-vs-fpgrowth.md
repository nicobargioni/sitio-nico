---
title: "Apriori vs FP-Growth: minar patrones sin que explote la combinatoria"
date: "2026-05-15"
excerpt: "Con 100 productos hay más combinaciones que átomos en tu cuerpo. Contar todo es imposible. Acá está el truco que lo vuelve viable."
tags: ["mineria", "patrones", "curiosidades"]
category: "data-ml"
subcategory: "mineria-de-datos"
---

Buscar reglas de asociación tiene un enemigo silencioso: la combinatoria. Si tu supermercado vende apenas 100 productos, la cantidad de conjuntos posibles que podrían aparecer juntos en un ticket es 2¹⁰⁰. Eso son más combinaciones que átomos en tu cuerpo. Contarlas una por una no es lento: es físicamente imposible. Y sin embargo, minar canastas de millones de tickets se hace todos los días. ¿Cómo se esquiva la explosión?

## El truco de Apriori: la poda

El algoritmo Apriori (1994) se apoya en una observación tan simple que parece tonta, pero lo cambia todo. Se la llama **propiedad de monotonía**:

> Si un conjunto de productos es poco frecuente, **cualquier conjunto más grande que lo contenga también lo será**.

Pensalo así: si {anchoas} aparece en apenas el 0,5% de los tickets, es imposible que {anchoas, vino, pan} aparezca *más* seguido. Como mucho, igual. Nunca más.

Eso habilita una poda brutal. Apriori arranca contando productos solos, descarta los que no llegan al [soporte mínimo](/data-ml/mineria-de-datos/soporte-confianza-lift), y solo combina los que sobrevivieron. Si {anchoas} no pasó el filtro, jamás se molesta en mirar ningún par o trío que la incluya. De golpe, en vez de 2¹⁰⁰ candidatos, evaluás un puñado manejable.

## El precio de Apriori

El problema es que Apriori sigue una estrategia de "generar y probar" por niveles: arma todos los candidatos de tamaño k, recorre **toda la base de datos** para contarlos, descarta, y vuelve a empezar con tamaño k+1. Esa relectura repetida del dataset completo es cara. En canastas grandes y con soporte bajo, Apriori escanea los datos una y otra vez y empieza a sufrir.

## FP-Growth: leer una vez y comprimir

FP-Growth (2000) ataca exactamente ese cuello de botella. La idea:

- **Lee la base solo dos veces**. La primera, para contar frecuencias. La segunda, para construir una estructura comprimida.
- Esa estructura es el **FP-tree**, un árbol donde los caminos compartidos entre tickets se fusionan. Tickets parecidos comparten ramas, así que el árbol suele ser muchísimo más chico que los datos originales.
- Después extrae los patrones recorriendo el árbol, **sin generar candidatos** ni volver a leer el disco.

El resultado: en la mayoría de los casos reales, FP-Growth le gana a Apriori por amplio margen, sobre todo cuando hay muchos patrones frecuentes. El costo es que el árbol vive en memoria, y si los datos son enormes y poco repetitivos, ese árbol puede no entrar.

## Cuál usar

La regla práctica:

- **Apriori**: didáctico, fácil de implementar, bien para datasets chicos o soportes altos donde poco sobrevive a la poda.
- **FP-Growth**: la opción por defecto en producción cuando el volumen aprieta.

Lo importante no es memorizar cuál gana, sino el patrón mental: en minería, **el arte está en evitar trabajo, no en hacerlo más rápido**. Apriori no acelera la fuerza bruta; la vuelve innecesaria con la poda. Es la misma filosofía que separa [minar patrones de predecir con machine learning](/data-ml/mineria-de-datos/mineria-vs-ml), y la que hace que la mítica regla de [pañales y cerveza](/data-ml/mineria-de-datos/panales-cerveza) fuera computable en primer lugar. La combinatoria asusta hasta que encontrás la propiedad que te deja ignorar el 99,99% del espacio.
