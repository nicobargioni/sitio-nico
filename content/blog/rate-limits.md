---
title: "Rate limits: el muro contra el que choca toda automatización"
date: "2026-04-03"
excerpt: "Tu automatización es tan rápida que la API te bloquea. Bienvenido al muro que descubrís siempre en producción."
tags: ["nocode", "automatizacion", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "n8n-make"
---

Hay una ironía linda en la automatización: tu flujo funciona *demasiado* bien. Lo armaste para procesar 5.000 contactos de un saque, lo prendés, y a los 200 empieza a tirar error `429 Too Many Requests`. La API del otro lado te frenó. Acabás de chocar contra el rate limit, el muro que toda automatización descubre tarde o temprano —casi siempre en producción.

## Por qué las APIs te frenan a propósito

Un rate limit es un tope: cuántas llamadas podés hacer por segundo, por minuto o por día. No es la API portándose mal, es **autodefensa**. Sin ese tope, un solo cliente con un loop suelto podría saturar el servicio y tirarlo abajo para todos. El límite reparte la capacidad y mantiene el servicio en pie.

El detalle clave: la velocidad la dicta el **servicio más lento de tu cadena**, no tu flujo. Podés tener n8n volando, pero si la API de mails acepta 10 por segundo, esa es tu velocidad real. Tu automatización es tan rápida como el cuello de botella que tiene enfrente.

## La trampa de la combinación

En no-code el problema se duplica, porque hay **dos límites apilados**:

- **El del SaaS que llamás** (Gmail, HubSpot, Shopify, cada uno con su tope).
- **El de la propia plataforma.** Make cuenta operaciones y te cobra por ellas: un flujo que itera sobre miles de ítems no solo choca el límite de la API, también [quema tu cuota mensual](/hiperautomatizacion/n8n-make/n8n-vs-make). El límite no es solo técnico, es de billetera.

Por eso un flujo que en la prueba con 10 registros andaba perfecto, con 10.000 se rompe o sale carísimo. El volumen cambia el problema de naturaleza.

## Cómo se diseña para el muro

No se trata de pedir que te suban el límite (a veces se puede, casi nunca alcanza). Se trata de diseñar el flujo *sabiendo* que el muro existe:

- **Throttling.** Metés una pausa entre llamadas para no pasarte del tope. Lento a propósito, pero no te bloquean.
- **Batching.** Si la API acepta 100 ítems por request, mandá de a 100 en vez de 100 requests de a uno. Una llamada en lugar de cien.
- **Backoff exponencial.** Cuando igual te frenan, no reintentás al toque: esperás 1s, después 2, después 4. Le das aire al servicio en vez de empeorarlo golpeando más fuerte.

```
# Backoff exponencial al recibir 429
intento = 0
while intento < 5:
    r = llamar_api()
    if r.status != 429:
        break
    esperar(2 ** intento)   # 1s, 2s, 4s, 8s...
    intento += 1
```

Acá aparece una conexión que mucha gente pasa por alto: el backoff **reintenta**, y reintentar significa que la operación puede ejecutarse más de una vez. Por eso un flujo que respeta rate limits *necesita* además ser [idempotente](/hiperautomatizacion/n8n-make/idempotencia). Las dos ideas viajan juntas.

## El cambio de mentalidad

El rate limit obliga a pensar la automatización no como "hacé todo ya", sino como un **caudal sostenible** en el tiempo. Por eso los trabajos pesados de verdad —procesar cientos de miles de ítems— rara vez viven dentro del flujo no-code: se descargan a una [arquitectura por eventos](/cloud/serverless/event-driven) que los va consumiendo a un ritmo que el límite tolera, mientras el flujo visual queda para orquestar.

Es también, de fondo, una de las diferencias entre [automatizar por la API o forzando la interfaz](/hiperautomatizacion/rpa/rpa-vs-api): la API te dice explícitamente cuál es el límite. La interfaz no te avisa, simplemente se rompe.

El rate limit no es un obstáculo a esquivar. Es una restricción de diseño que, si la respetás desde el principio, te ahorra el clásico incendio del lunes a la mañana.
