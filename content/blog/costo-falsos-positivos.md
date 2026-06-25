---
title: "El costo oculto de los falsos positivos en detección de anomalías"
date: "2026-05-18"
excerpt: "Mover el umbral de un detector parece un ajuste técnico. En realidad es decidir cuánto cuesta cada error. Eso es negocio."
tags: ["anomalias", "ml", "curiosidades"]
category: "data-ml"
subcategory: "deteccion-anomalias"
---

Hay un momento, en todo proyecto de detección de anomalías, en que alguien pregunta: "¿y dónde ponemos el umbral?". Suena a una perilla técnica que se afina mirando una métrica. No lo es. Mover ese número es decidir, con plata real, a quién vas a molestar y qué vas a dejar pasar. Es la decisión más de negocio que hay, disfrazada de detalle de implementación.

## Los dos errores no cuestan lo mismo

Todo detector se equivoca de dos maneras, y casi nunca pesan igual:

- **Falso positivo:** marcás como anómalo algo que era normal. Bloqueás la tarjeta de un cliente que estaba comprando tranquilo, frenás una máquina sana, despertás a un equipo a las 3 AM por una alarma falsa.
- **Falso negativo:** dejás pasar la anomalía real. El fraude se concreta, la turbina falla en vuelo, el ataque entra.

El umbral es la perilla que regula el intercambio entre ambos. Bajalo y atrapás más anomalías reales (menos falsos negativos) a cambio de más falsas alarmas. Subilo y molestás a menos gente, pero se te escapan casos verdaderos. No existe el umbral que elimine los dos errores: solo existe el que **balancea sus costos**.

## La fórmula que ningún modelo te da

Acá está lo que el algoritmo no sabe: cuánto vale cada error en tu negocio. Eso lo ponés vos. El umbral óptimo no es el que maximiza una métrica abstracta, sino el que minimiza el costo esperado:

```
Costo = (FP × costo_falsa_alarma) + (FN × costo_anomalia_perdida)
```

En fraude, un falso negativo puede costar el monto completo de la transacción más el chargeback; un falso positivo, un cliente irritado y quizá perdido. En [detección de fraude con desbalance extremo](/data-ml/deteccion-anomalias/fraude-desbalance), donde el evento positivo es rarísimo, esos pesos asimétricos son todo el juego. En [mantenimiento predictivo](/data-ml/deteccion-anomalias/mantenimiento-predictivo), un falso negativo puede ser una turbina destruida, así que tolerás muchísimas falsas alarmas con tal de no perder una real.

## El enemigo silencioso: la fatiga de alertas

Hay un costo de los falsos positivos que no aparece en ninguna fórmula y que termina hundiendo sistemas enteros: la fatiga de alertas. Si tu detector grita demasiado seguido, el equipo deja de mirar. Después de la décima alarma falsa, la undécima —que era real— también se ignora. Un detector con recall altísimo pero precisión baja no es seguro: es ruido que la gente aprende a apagar. La paradoja es brutal: afinar de más el detector puede volverlo *menos* efectivo en la práctica.

Por eso conviene resistir dos tentaciones. La de pensar que más sensibilidad siempre es mejor —no lo es si nadie atiende las alertas. Y la de tomar el score de un método no supervisado como el [Isolation Forest](/data-ml/deteccion-anomalias/isolation-forest) como una verdad absoluta. Ese score ordena lo sospechoso; convertirlo en una acción es una decisión aparte que cargás vos. Cuidado, además, con el reflejo de validar el umbral mirando un solo número mágico: ahí se cuela todo tipo de autoengaño estadístico, primo del [malentendido del p-valor](/data-ml/estadistica/p-valor-malentendido).

El mejor detector de anomalías no es el más preciso en abstracto: es el que está calibrado para los costos reales de quien lo usa. Y esa calibración no sale de los datos —sale de sentarse a preguntar cuánto duele cada error. Lo cual, otra vez, es el criterio humano haciendo el trabajo que ningún modelo puede hacer por vos.
