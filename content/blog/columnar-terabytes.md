---
title: "Por qué BigQuery escanea terabytes en segundos: el formato columnar"
date: "2026-03-08"
excerpt: "BigQuery lee un terabyte en segundos no por magia, sino por una decisión de diseño: guardar los datos por columna, no por fila."
tags: ["bigquery", "datos", "curiosidades"]
category: "cloud"
subcategory: "bigquery"
---

La primera vez que corrés una query sobre una tabla de mil millones de filas y volvés en tres segundos, la sensación es de truco. No lo es. Es una decisión de diseño tomada hace más de una década: BigQuery no guarda los datos como los imaginás.

## Filas vs columnas

Una base de datos tradicional (Postgres, MySQL) guarda los datos **por fila**. Una fila de ventas con `fecha`, `producto`, `monto`, `cliente`, `región` queda junta en disco, byte tras byte. Eso es óptimo cuando querés traer un registro completo: "dame la venta número 4521". El disco lee un bloque contiguo y listo.

Pero el análisis casi nunca pregunta eso. Pregunta cosas como "sumá el `monto` de todo 2025". Si los datos están por fila, para sumar una sola columna el motor igual tiene que leer la fila entera —fecha, producto, cliente, región— y descartar casi todo. Estás pagando lecturas por datos que no mirás.

BigQuery hace lo opuesto. Guarda cada columna por separado, en su propio bloque. Todos los `monto` juntos, todos los `producto` juntos. Esto se llama almacenamiento **columnar** (en el motor de Google, originalmente Capacitor). Si tu query toca dos columnas de una tabla de veinte, leés dos veinteavos de los datos. El resto ni se toca.

## Por qué eso lo hace rápido (y barato)

Hay tres efectos que se potencian:

- **Menos lectura de disco.** Tocás solo las columnas que nombrás. Es la diferencia directa entre escanear 50 GB o 500 GB.
- **Compresión brutal.** Una columna tiene valores del mismo tipo y, muchas veces, repetidos: el campo `país` puede tener "AR" cien millones de veces seguidas. Eso comprime muchísimo mejor que filas heterogéneas mezcladas. Menos bytes en disco = menos bytes que leer.
- **Paralelismo masivo.** Con los datos partidos en bloques de columna, BigQuery reparte el trabajo entre miles de unidades de cómputo que escanean en paralelo. Mil máquinas leyendo un pedacito cada una terminan en segundos lo que una sola tardaría horas.

La contracara: lo columnar es malo para escrituras fila por fila y para traer registros individuales. Por eso BigQuery es un **warehouse analítico**, no una base transaccional. No lo uses para el carrito de un e-commerce; usalo para analizar todos los carritos juntos.

## La consecuencia que te va a cambiar la forma de escribir SQL

Si el costo y la velocidad dependen de **cuántas columnas tocás**, entonces el `SELECT *` deja de ser inocente: te obliga a leer las veinte columnas aunque uses dos. Esa es la raíz de todo el modelo de precios de BigQuery, que desarrollo en [SELECT * es caro](/cloud/bigquery/select-star-caro). Y si encima sabés *cómo* están ordenados los bloques en disco, podés recortar todavía más con [particionado y clustering](/cloud/bigquery/particionar-clusterizar).

El cómputo que hace ese escaneo paralelo no es infinito ni gratis: se mide en una unidad propia que cuento en [slots, la moneda invisible](/cloud/bigquery/slots-moneda). Y todo esto vive dentro del ecosistema más amplio de [Google Cloud](/cloud/gcp/vertex-sin-modelo), donde el mismo principio —pagás por lo que consumís— se repite servicio tras servicio.

BigQuery no es rápido por fuerza bruta. Es rápido porque guarda los datos de la forma en que vos los vas a preguntar. Entender eso es lo que separa una factura de diez dólares de una de mil.
