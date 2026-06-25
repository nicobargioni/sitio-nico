---
title: "Vendor lock-in: la letra chica de lo serverless"
date: "2026-02-22"
excerpt: "Serverless te ahorra operación, pero a cambio enchufás tu código a las APIs de un proveedor. Qué tan atado quedás y cómo aflojar el nudo."
tags: ["serverless", "cloud", "curiosidades"]
category: "cloud"
subcategory: "serverless"
---

La gracia de serverless es que delegás un montón de problemas al proveedor. La trampa es la misma frase: delegás un montón de problemas *al proveedor*. Cuanto más cómodo te hace, más enganchado quedás a su forma de hacer las cosas. A eso se le dice *vendor lock-in*, y es la letra chica que casi nadie lee al firmar.

## Por qué serverless ata más que una VM

No todo lock-in es igual. Hay grados.

Una máquina virtual con Linux es bastante portable: corré lo mismo en cualquier proveedor con poco esfuerzo. Un [contenedor Docker](/cloud/docker/contenedor-vs-vm) es todavía más portable, esa es justamente su gracia: la misma imagen corre en tu compu, en Cloud Run, en AWS o en un cluster propio.

Serverless puro, en cambio, ata fuerte, porque tu código no vive solo. Para funcionar de verdad se enchufa a los servicios del proveedor:

- El **formato de los eventos** que disparan tu función es propio de cada nube.
- La **autenticación, los permisos y los roles** se configuran a su manera.
- Te apoyás en **sus** colas, **su** storage, **su** base, **su** sistema de logs.
- Hasta los límites y las cuotas son específicos de la plataforma.

El resultado es que migrar no es "copiar el código a otro lado". Es reescribir todo el pegamento que lo conecta con el mundo. Y ese pegamento suele ser la mitad del trabajo.

## Cómo se siente en la práctica

El lock-in casi nunca duele el día uno. Duele el día que querés moverte:

- Cuando aparece una **factura inesperada** —un pico de tráfico, una cuota que saltó— y descubrís que renegociar o mudarte es carísimo.
- Cuando el proveedor **deprecia** un servicio del que dependías y te obliga a migrar en su calendario, no en el tuyo.
- Cuando un **cliente o una regulación** te exige que los datos vivan en otra nube o en infraestructura propia.

No es que esté mal usar los servicios del proveedor. El problema es no haber medido qué tan caro sería desengancharse si algún día hace falta.

## Cómo aflojar el nudo (sin paranoia)

La salida no es evitar serverless —perderías casi todas sus ventajas—. Es ser consciente y poner algunas barreras baratas:

- **Aislá la lógica de negocio del pegamento.** Tu código que decide *qué* hacer no debería saber que corre en un proveedor X. Metelo en funciones puras y dejá los handlers específicos como una cáscara fina alrededor.
- **Contenedores antes que funciones propietarias** cuando puedas. Un servicio que corre en [Cloud Run](/cloud/cloud-run/scale-to-zero) o equivalente es serverless *y* portable: la misma imagen se muda a otra nube con mucho menos dolor que una función atada a su runtime.
- **Estándares abiertos donde existan.** Postgres antes que una base propietaria, colas con protocolos conocidos, infraestructura descrita como código para poder recrearla en otro lado.
- **Poné número al divorcio.** Antes de casarte con un servicio exclusivo, estimá qué costaría salir. Si es asumible, adelante. Si te deja sin salida, pensalo dos veces.

La decisión honesta es un trade-off, no un dogma. Atarte un poco a un proveedor a cambio de velocidad y de no operar infraestructura suele valer la pena —sobre todo cuando los números todavía favorecen [pagar por invocación](/cloud/serverless/costo-por-invocacion)—. Solo asegurate de que sea una decisión que tomaste, y no una a la que llegaste sin darte cuenta.
