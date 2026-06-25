---
title: "La paradoja del cumpleaños: con 23 personas, apostá a que dos cumplen el mismo día"
date: "2026-06-16"
excerpt: "En un aula de 23 personas hay más del 50% de chances de que dos compartan cumpleaños. Acá la intuición miente feo."
tags: ["estadistica", "probabilidad", "curiosidades"]
category: "data-ml"
subcategory: "estadistica"
---

> Si te digo que en un grupo de 23 personas la probabilidad de que dos cumplan el mismo día supera el 50%, lo más probable es que no me creas. Tu cabeza piensa "365 días, 23 personas, imposible". Y sin embargo, es cierto.

Esto se conoce como la **paradoja del cumpleaños**. No es una paradoja lógica (no hay contradicción), sino una paradoja *psicológica*: el resultado choca de frente con la intuición. Y entender por qué nos equivocamos dice mucho sobre cómo razonamos —mal— con probabilidades.

## Por qué tu intuición falla

El error está en la pregunta que tu cabeza resuelve sin permiso. Vos pensás "¿qué chance hay de que alguien cumpla *mi* cumpleaños?". Esa pregunta sí tiene una respuesta baja. Pero la pregunta real es otra: "¿qué chance hay de que *cualquier par* de personas coincida?".

Y los pares crecen rapidísimo. Con 23 personas no hay 23 comparaciones, hay:

$$\binom{23}{2} = \frac{23 \times 22}{2} = 253 \text{ pares}$$

253 oportunidades de coincidencia. Ahí empieza a tener sentido. Es el mismo desencuentro entre intuición y combinatoria que aparece cuando una [correlación parece sólida pero en realidad es pura casualidad estadística](/data-ml/eda/correlacion-espuria): el cerebro subestima cuántas combinaciones está mirando en realidad.

## La cuenta exacta

El truco para calcularlo es dar vuelta el problema: en vez de calcular la probabilidad de que *haya* coincidencia, calculamos la del complemento —que *nadie* coincida— y restamos de 1.

La primera persona puede cumplir cualquier día. La segunda tiene 364/365 chances de no coincidir. La tercera, 363/365. Y así:

```python
def prob_coincidencia(n):
    p_sin = 1.0
    for k in range(n):
        p_sin *= (365 - k) / 365
    return 1 - p_sin

prob_coincidencia(23)  # ~0.507
prob_coincidencia(50)  # ~0.970
prob_coincidencia(70)  # ~0.999
```

Con 23 ya pasás el 50%. Con 50 personas es prácticamente seguro (97%). Con 70, una en mil de que *no* haya coincidencia. El crecimiento es muchísimo más rápido de lo que cualquiera anticiparía a ojo.

## Dónde aparece esto fuera del aula

Lejos de ser un truco de fiesta, este fenómeno tiene consecuencias serias:

- **Criptografía**: el "ataque del cumpleaños" explota exactamente esto. Para encontrar dos entradas con el mismo hash no necesitás probar $2^n$ combinaciones, sino del orden de $2^{n/2}$. Por eso las funciones hash necesitan ser tan largas.
- **Detección de duplicados**: en bases de datos grandes, las colisiones aparecen mucho antes de lo esperado.
- **Anomalías**: cuando un patrón "coincidente" salta en los datos, conviene preguntarse si es señal o simplemente el efecto cumpleaños operando. Esa misma sospecha es la que separa una alerta real de un falso positivo, algo que toda buena [estrategia de detección de anomalías tiene que pesar con cuidado](/data-ml/deteccion-anomalias/costo-falsos-positivos).

## Contá los pares, no los elementos

Lo que me llevo de esto no es la fórmula, sino el reflejo: **cuando algo parece coincidencia improbable, contá los pares, no los elementos**. Es la misma trampa que aparece en el [problema de Monty Hall](/data-ml/estadistica/monty-hall), donde reformular la pregunta cambia por completo la respuesta, o cuando uno se enamora de [un p-valor sin entender qué mide realmente](/data-ml/estadistica/p-valor-malentendido).

Si alguna vez te toca una mesa de 25 personas, animate a apostar que dos cumplen el mismo día. La probabilidad —y la combinatoria— juegan a tu favor.
