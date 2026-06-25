---
title: "Particionar y clusterizar: la diferencia entre $1 y $100 por query"
date: "2026-03-06"
excerpt: "Dos opciones que se eligen al crear la tabla y deciden cuántos datos escanea cada query. Bien usadas, recortan el costo 100x."
tags: ["bigquery", "datos", "curiosidades"]
category: "cloud"
subcategory: "bigquery"
---

Ya sabemos que en BigQuery [pagás por bytes escaneados](/cloud/bigquery/select-star-caro) y que el [formato columnar](/cloud/bigquery/columnar-terabytes) te deja tocar solo las columnas que nombrás. Pero queda una pregunta: dentro de una columna, ¿el motor lee *todos* los valores o puede saltarse pedazos? La respuesta —y el ahorro de dos órdenes de magnitud— está en cómo organizás los datos en disco.

## Particionar: cortar la tabla en bloques por fecha

Particionar es dividir físicamente la tabla en segmentos, casi siempre por una columna de fecha. Una tabla de eventos particionada por día no es un bloque gigante: son cientos de mini-tablas, una por jornada.

¿Por qué importa? Porque si tu query dice `WHERE fecha = '2026-03-01'`, BigQuery lee **solo esa partición** y descarta el resto sin tocarlo. A esto se le llama *partition pruning*. Una tabla de tres años con consultas que miran un día pasa de escanear ~1095 días de datos a escanear 1. Ahí está, redondeando, tu factura de cien dólares convertida en una de uno.

```sql
CREATE TABLE ventas
PARTITION BY DATE(fecha) AS
SELECT * FROM origen;

-- Esta query solo lee la partición del día:
SELECT producto, monto FROM ventas
WHERE fecha = '2026-03-01';
```

El detalle que muerde: el filtro tiene que ser sobre la columna de partición y tiene que ser "podable". Si envolvés la fecha en una función rara o filtrás por otra cosa, perdés el pruning y volvés a escanear todo.

## Clusterizar: ordenar dentro de cada partición

Clusterizar es ordenar físicamente las filas dentro de cada partición según una o más columnas que solés usar para filtrar —`pais`, `cliente`, `categoria`. BigQuery guarda metadatos de qué rango de valores hay en cada bloque, así que cuando filtrás por una columna clusterizada puede saltarse bloques enteros que no contienen lo que buscás (*block pruning*).

La diferencia con particionar:

- **Partición**: divide en segmentos discretos, ideal para fechas, con un límite de cantidad de particiones.
- **Cluster**: ordena dentro del segmento, sirve para columnas de alta cardinalidad (muchos valores distintos) donde particionar no tendría sentido.
- Se combinan: particionás por día y clusterizás por país. El filtro por fecha poda particiones; el filtro por país poda bloques dentro de la partición.

El cluster es "best effort": no garantiza un recorte exacto como la partición, pero en tablas grandes el ahorro es consistente y no cuesta nada activarlo.

## Por qué esto se decide temprano

El punto incómodo: la mayoría de estas decisiones se toman **al crear la tabla**. Re-particionar después implica reescribirla. Por eso, antes de cargar un dataset grande, vale la pena el [EDA inicial](/data-ml/eda/valores-faltantes-gritan) que te dice por qué columnas vas a filtrar de verdad —no las que imaginás, las que el uso real va a pedir.

La intuición es la misma que aplica a toda la infraestructura de [GCP](/cloud/gcp/region-importa): el costo no lo define el tamaño del dato, lo define cuánto del dato tenés que mover para responder. Particionar y clusterizar son, en el fondo, dos formas de no mover lo que no necesitás. Y cuando entendés que el escaneo paralelo de ese subconjunto consume [slots](/cloud/bigquery/slots-moneda), cierra el círculo: menos datos tocados, menos cómputo, menos plata.
