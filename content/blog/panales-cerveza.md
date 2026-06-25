---
title: "Pañales y cerveza: la regla de asociación más famosa (¿y falsa?)"
date: "2026-05-17"
excerpt: "La historia dice que un super descubrió que quien compra pañales también compra cerveza. Lindo relato. El problema es que casi nada de eso pasó."
tags: ["mineria", "patrones", "curiosidades"]
category: "data-ml"
subcategory: "mineria-de-datos"
---

Es la anécdota que aparece en cada charla de introducción a la minería de datos: un supermercado analizó sus tickets y descubrió que los hombres que compran pañales un viernes a la noche también se llevan cerveza. La conclusión fabulosa: pusieron los dos productos cerca y vendieron más. El cuento es tan bueno que sobrevivió treinta años. El problema es que casi nada de eso ocurrió como se cuenta.

## De dónde salió el mito

La versión rastreable arranca en 1992, con un consultor de Teradata llamado Thomas Blischok que analizó tickets de la cadena Osco Drug. Sí encontró una correlación entre pañales y cerveza en ciertos horarios. Pero ahí termina lo verificable. No hubo góndolas reorganizadas, no hubo aumento de ventas documentado, no hubo viernes a la noche. Todo eso se le fue agregando a la historia en cada recontada, como pasa con las leyendas.

Lo que tenemos es un dato real (una asociación estadística) envuelto en una capa de causalidad inventada. Y esa capa es justo la parte peligrosa.

## Por qué importa el malentendido

Una regla de asociación no dice "comprar pañales **causa** comprar cerveza". Dice que ambos eventos aparecen juntos más seguido de lo que el azar predeciría. Eso es todo. La explicación —padres primerizos agotados que se premian, o cualquier otra— es una historia que vos le pegás encima.

Acá conviene tener presentes dos trampas clásicas:

- **Correlación no es causalidad.** Que dos cosas pasen juntas no significa que una empuje a la otra. Es el mismo error de [las correlaciones espurias entre el queso y los doctorados](/data-ml/eda/correlacion-espuria).
- **El relato vende más que el número.** Una asociación con lift de 1,3 no entusiasma a nadie en una reunión. "Pañales y cerveza" sí. Por eso el mito ganó.

Y hay un punto más sutil: cuando minás millones de combinaciones de productos, **vas a encontrar asociaciones llamativas solo por casualidad**. Con suficientes pruebas, el azar te regala patrones. Es el mismo fenómeno que hace que [un p-valor bajo no signifique lo que casi todos creen](/data-ml/estadistica/p-valor-malentendido).

## Qué sí podés sacar en limpio

El market basket analysis es una técnica legítima y útil. Lo que no es legítimo es saltar de "estos productos co-ocurren" a "muevo la góndola y facturo más" sin un experimento que lo valide. La minería te entrega candidatos; la decisión de negocio necesita una prueba controlada.

Si querés entender la maquinaria real detrás de estas reglas, el siguiente paso es saber [cómo se miden con soporte, confianza y lift](/data-ml/mineria-de-datos/soporte-confianza-lift), y entender que [minar patrones no es lo mismo que predecir con machine learning](/data-ml/mineria-de-datos/mineria-vs-ml). Una cosa es describir lo que ya pasó en tus datos; otra muy distinta es afirmar qué va a pasar si tocás algo.

Hay algo acá que ya es casi un meme, pero aplica: cuando un caso de uso de datos suena demasiado redondo para ser real, probablemente le sacaron la mitad incómoda. El dato existía. La fábula la pusimos nosotros.
