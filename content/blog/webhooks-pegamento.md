---
title: "Webhooks: el pegamento invisible de las automatizaciones"
date: "2026-04-06"
excerpt: "Polling es golpear la puerta cada cinco minutos. Un webhook es que te toquen el timbre. La diferencia cambia todo."
tags: ["nocode", "automatizacion", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "n8n-make"
---

Casi toda automatización que parece magia es, por abajo, un sistema avisándole a otro que pasó algo. Ese aviso, la mayoría de las veces, es un webhook. Y aunque suene a término técnico de nicho, es probablemente el concepto que más se usa y menos se entiende de toda la hiperautomatización.

## El timbre vs golpear la puerta

Hay dos formas de que un sistema se entere de que pasó algo en otro.

La primera es **polling**: preguntar cada tanto. "¿Hay pedidos nuevos? ¿Y ahora? ¿Y ahora?" Cada cinco minutos tu flujo le pega a la API a ver si cambió algo. Funciona, pero es ineficiente — gastás llamadas preguntando por la nada el 99% del tiempo, y encima introducís hasta cinco minutos de demora.

La segunda es el **webhook**: el sistema que tiene la novedad te avisa a vos. Vos le dejás una dirección (una URL) y le decís "cuando entre un pedido, mandame un POST acá". No preguntás más; te tocan el timbre. Es tiempo real y no desperdicia llamadas.

Un webhook no es más que **un HTTP POST a una URL tuya con un JSON adentro** describiendo qué pasó. Nada más. Esa simpleza es justo lo que lo hace el pegamento universal: cualquier sistema que sepa hacer un POST puede hablar con cualquier otro que sepa recibirlo.

## Por qué importa en n8n y Make

Cuando arrancás un flujo con un nodo "Webhook", la plataforma te da una URL. La pegás en el otro servicio y listo: ahora ese servicio dispara tu flujo cada vez que ocurre el evento. Sin esto, vivirías de triggers de polling que consumen operaciones (y en Make, las operaciones se pagan — clave para no chocar los [rate limits y la cuota](/hiperautomatizacion/n8n-make/rate-limits)).

El webhook es además lo que te deja salir del jardín cerrado de nodos prearmados. ¿No existe la integración que necesitás? No importa: si el servicio manda webhooks, lo enganchás igual. Es la herramienta con la que [se corre el techo del no-code](/hiperautomatizacion/n8n-make/techo-nocode).

## La parte que casi nadie maneja bien

Recibir webhooks tiene dos trampas que muerden en producción.

- **Reintentos.** Si tu endpoint no responde rápido un `200`, el emisor asume que falló y **reenvía el mismo evento**. Resultado: procesás el mismo pedido dos veces. Por eso un receptor de webhooks tiene que ser [idempotente](/hiperautomatizacion/n8n-make/idempotencia) — procesar el evento duplicado sin duplicar el efecto.
- **Seguridad.** Tu URL es pública: cualquiera que la adivine puede dispararte el flujo. Los servicios serios firman el payload con un secreto (HMAC); vos verificás la firma antes de confiar.

Una regla de oro: **respondé `200` rápido y procesá después.** Si tu flujo tarda 30 segundos, el emisor ya te reintentó tres veces antes de que termines.

```
POST /webhook/pedido-nuevo HTTP/1.1
X-Signature: sha256=8b2c... (verificá esto antes de confiar)

{ "evento": "pedido.creado", "id": "ord_8842", "total": 15990 }
```

## El modelo mental

Pensá los webhooks como el sistema nervioso de tus automatizaciones: cada evento es un impulso que viaja de un órgano a otro sin que nadie esté preguntando "¿pasó algo?" todo el día. Es la base de la [arquitectura por eventos](/cloud/serverless/event-driven), solo que acá la armás arrastrando nodos en vez de escribiendo código.

Entender bien esta pieza chiquita es lo que separa una automatización que anda en la demo de una que sobrevive a producción.
