---
title: "Detección de fraude: cuando el 0,1% es todo lo que importa"
date: "2026-05-20"
excerpt: "Si el fraude es 1 de cada 1000 transacciones, un modelo que diga 'todo legítimo' acierta el 99,9%. Y es inútil."
tags: ["anomalias", "ml", "curiosidades"]
category: "data-ml"
subcategory: "deteccion-anomalias"
---

Te paso un dataset real de transacciones con tarjeta. De cada 1000 operaciones, una es fraude. Entrenás un modelo, mirás la accuracy y te da 99,8%. Aplausos. El problema es que un clasificador que responde "legítima" a **todo, siempre**, sin mirar nada, también te da 99,8%. Acaba de no detectar un solo fraude y aun así tiene una métrica envidiable. Bienvenido al desbalance extremo, el terreno donde casi toda la intuición estadística común se rompe.

## Por qué la accuracy te miente

La accuracy mide la proporción de aciertos sobre el total. Cuando una clase es el 99,9% de los datos, basta con apostar siempre a esa clase para ganar el juego de la accuracy y perder el del negocio. La métrica está dominada por la clase mayoritaria y se vuelve ciega a la única clase que te importa.

La salida es mirar otras cosas:

- **Precisión:** de lo que marqué como fraude, ¿cuánto era fraude de verdad?
- **Recall (sensibilidad):** de todos los fraudes que existieron, ¿cuántos atrapé?
- **F1 y AUC-PR:** el balance entre las dos, mucho más informativo que la curva ROC cuando el desbalance es brutal.

Y hay una tensión inevitable entre precisión y recall. Si querés atrapar todos los fraudes (recall alto), vas a marcar de más y molestar a clientes legítimos. Si querés no molestar a nadie (precisión alta), se te van a escapar fraudes. Dónde pararte en ese eje no es una pregunta técnica: es [una decisión de negocio sobre el costo de cada error](/data-ml/deteccion-anomalias/costo-falsos-positivos).

## El fraude es un problema de anomalías, no de clasificación

Es tentador tratarlo como un clasificador binario común, pero el desbalance extremo lo empuja hacia el mundo de las anomalías. Hay pocos ejemplos de la clase positiva, y peor: el fraude muta. Los patrones que viste el mes pasado no son los del mes que viene, porque del otro lado hay alguien adaptándose. Por eso conviene combinar dos enfoques:

```python
from sklearn.linear_model import LogisticRegression

# 'balanced' reajusta el peso de cada clase según su frecuencia:
# equivocarse en un fraude penaliza ~1000x más que en una legítima.
modelo = LogisticRegression(class_weight="balanced", max_iter=1000)
modelo.fit(X_train, y_train)
```

Por un lado, modelos supervisados que aprenden del fraude conocido, con técnicas para compensar el desbalance: reponderar clases, sobremuestrear la minoría (SMOTE) o submuestrear la mayoría. Por otro, métodos no supervisados como el [Isolation Forest](/data-ml/deteccion-anomalias/isolation-forest), que detectan lo anómalo sin necesitar etiquetas y pueden cazar fraudes de un tipo nunca visto —los verdaderos [cisnes negros](/data-ml/deteccion-anomalias/cisne-negro) del negocio.

## Una pista que viene de los dígitos

Hay trucos sorprendentemente baratos. En montos, cantidades y declaraciones, los primeros dígitos siguen un patrón predecible —el 1 aparece como primer dígito mucho más seguido que el 9. Cuando alguien inventa números, suele repartirlos parejo y rompe ese patrón. Es [la ley de Benford](/data-ml/estadistica/ley-benford), una de las herramientas forenses más usadas en auditoría para señalar dónde mirar con lupa.

Detectar fraude es, en el fondo, un ejercicio de humildad estadística: aceptar que el éxito no se mide por cuántas veces acertás, sino por si atrapaste lo único que importaba el día que pasó. El 99,9% de aciertos no significa nada si el 0,1% que se te escapó te costó la empresa.
