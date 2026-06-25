---
title: "SELECT * es caro: cómo BigQuery te cobra por columna"
date: "2026-03-07"
excerpt: "En BigQuery no pagás por fila ni por query: pagás por los bytes que escaneás. Y el SELECT * los multiplica sin que lo veas."
tags: ["bigquery", "datos", "curiosidades"]
category: "cloud"
subcategory: "bigquery"
---

En la mayoría de las bases de datos, un `SELECT *` es un mal hábito menor: traés columnas de más, ocupás un poco de red. En BigQuery es distinto. Ahí el `SELECT *` puede ser, literalmente, la diferencia entre una factura de un dólar y una de cien.

## El modelo de precios que casi nadie lee

BigQuery, en su modo por demanda, no te cobra por cuántas filas devuelve tu query ni por cuánto tarda. Te cobra por **los bytes que escanea para responderla**. El precio ronda los 5 dólares por terabyte leído, con la primera fracción gratis cada mes.

Acá entra lo que vimos del [formato columnar](/cloud/bigquery/columnar-terabytes): como cada columna se guarda por separado, el motor solo lee los bloques de las columnas que nombrás. Si tu tabla tiene veinte columnas y tu query usa dos, escaneás aproximadamente dos veinteavos de la tabla. Pagás por esos dos.

El `SELECT *` rompe justo eso. Le pedís las veinte columnas. Escaneás la tabla **entera**, todos los meses, cada vez que corrés esa query. La que parecía una comodidad inocente —"traeme todo, después filtro"— es la línea más cara que vas a escribir.

## La regla práctica

Nombrá solo las columnas que vas a usar. Suena obvio, pero el reflejo del `SELECT *` está muy metido. Compará:

```sql
-- Escanea las 20 columnas: caro
SELECT * FROM ventas WHERE pais = 'AR';

-- Escanea solo 2 columnas: ~10x más barato
SELECT fecha, monto FROM ventas WHERE pais = 'AR';
```

Tres detalles que conviene tener en la cabeza:

- **El `WHERE` no abarata el escaneo por sí solo.** Filtrar por `pais = 'AR'` reduce las *filas devueltas*, pero el motor igual tiene que leer la columna `pais` completa para evaluar el filtro. El ahorro real viene de tocar menos *columnas*, o de que esa columna esté particionada (otra historia).
- **El validador te dice el precio antes de pagarlo.** El editor de BigQuery muestra "esta consulta procesará X GB" antes de ejecutar. Ese número es tu factura en preview. Miralo siempre antes de apretar Run.
- **`SELECT *` con `LIMIT 10` igual es caro.** El `LIMIT` recorta lo que ves, no lo que escanea. Te puede leer la tabla entera para devolverte diez filas.

## El costo escondido de las vistas y los dashboards

Lo peligroso no es el `SELECT *` que corrés una vez. Es el que dejás enterrado en una vista que alimenta un dashboard que se refresca cada quince minutos. Ahí el escaneo se multiplica por la frecuencia y se vuelve un goteo constante en la factura que nadie audita.

Esta lógica de "pagás exactamente por lo que consumís" no es exclusiva de BigQuery: es el ADN de [lo serverless](/cloud/serverless/costo-por-invocacion) y de toda la facturación de [GCP](/cloud/gcp/cuotas-gcp). La diferencia es que acá la unidad es el byte, y el byte se acumula rápido.

Si querés bajar la factura de verdad, el siguiente paso después de cuidar las columnas es controlar *cuántos datos toca* cada query: ahí entran [particionar y clusterizar](/cloud/bigquery/particionar-clusterizar). Pero empezá por lo barato: dejá de pedir todo cuando solo necesitás dos columnas.
