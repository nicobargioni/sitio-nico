---
title: "Idempotencia: por qué tu automatización no debe ejecutarse dos veces"
date: "2026-04-05"
excerpt: "El día que un cliente recibió el mismo mail siete veces, nadie escribió 'mandá esto siete veces'. Fue un reintento."
tags: ["nocode", "automatizacion", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "n8n-make"
---

Hay un bug que no aparece en la demo, no aparece en las pruebas, y un buen día le manda a un cliente la misma factura cuatro veces. Nadie lo programó. Es la consecuencia silenciosa de algo que las plataformas de automatización hacen por diseño: **reintentar cuando algo falla**. Y la única defensa se llama idempotencia.

## Qué quiere decir esa palabra

Una operación es **idempotente** si ejecutarla una vez o diez veces deja el sistema en el mismo estado. El botón del ascensor es idempotente: lo apretás quince veces y el ascensor viene una sola. Mandar un mail, en cambio, no lo es: cada ejecución manda un mail más.

La distinción parece académica hasta que entendés que **en automatización las cosas se ejecutan más de una vez todo el tiempo, sin que vos lo pidas.**

## Por qué se ejecuta dos veces

No es mala suerte, es arquitectura. Pasa por tres motivos muy comunes:

- **Reintentos automáticos.** Tu flujo le pega a una API, la API tarda y el request expira (timeout). La plataforma asume que falló y reintenta. Pero la API sí lo había recibido: ahora lo procesó dos veces.
- **Webhooks reenviados.** Como vimos con [los webhooks](/hiperautomatizacion/n8n-make/webhooks-pegamento), si tu endpoint no contesta `200` a tiempo, el emisor reenvía el mismo evento. Mismo pedido, dos disparos.
- **El usuario que hace doble click.** El clásico. Dos formularios, dos ejecuciones, dos cobros.

En un sistema distribuido —y una automatización que pega a cinco SaaS lo es— la entrega exactamente-una-vez es prácticamente imposible de garantizar. Lo realista es **al-menos-una-vez**, y diseñar para que la repetición no haga daño.

## Cómo se vuelve idempotente un flujo

La idea central: cada operación lleva una **clave de idempotencia** única, y antes de actuar chequeás si esa clave ya fue procesada.

```
# Pseudocódigo del nodo antes de cobrar
clave = evento.pedido_id          # estable: NO un timestamp ni un random
if ya_procesamos(clave):
    return "ok, ya estaba"        # no cobra de nuevo
cobrar(evento)
marcar_procesado(clave)
```

La clave tiene que venir del **dato del negocio** (el ID del pedido, no la hora de ejecución). Si usás algo que cambia en cada corrida, dos ejecuciones del mismo pedido generan dos claves distintas y la protección no sirve para nada.

Las APIs bien diseñadas te ayudan: Stripe, por ejemplo, acepta un header `Idempotency-Key` y se encarga de no cobrar dos veces aunque le mandes el mismo request repetido. Cuando la API no lo ofrece, el flujo tiene que llevar su propia tabla de "ya visto" — una hoja de cálculo o una base alcanzan.

## La regla práctica

Antes de poner un flujo en producción, mirá cada paso que **modifica algo afuera** (cobrar, mandar mail, crear un registro, postear) y preguntate: *si esto corre dos veces, ¿qué pasa?* Si la respuesta es "un desastre", ese paso necesita una clave de idempotencia.

Esto es justo el tipo de rigor que separa el [no-code de juguete del que aguanta producción](/hiperautomatizacion/n8n-make/techo-nocode), y es la misma disciplina que se exige en cualquier [sistema serverless por eventos](/cloud/serverless/event-driven), donde el reintento es parte del contrato. La diferencia es que en código se ve venir; en un canvas visual, donde el reintento está prendido por default y escondido en la config del nodo, te agarra desprevenido.

Idempotencia es una de esas ideas que suenan a paranoia hasta que el cliente te escribe preguntando por qué le cobraste tres veces.
