---
title: "Slots: la moneda invisible del cómputo en BigQuery"
date: "2026-03-04"
excerpt: "Detrás de cada query de BigQuery hay una unidad de cálculo que no ves: el slot. Entenderla explica por qué a veces la misma query vuela y otras se arrastra."
tags: ["bigquery", "datos", "curiosidades"]
category: "cloud"
subcategory: "bigquery"
---

Pagás por [bytes escaneados](/cloud/bigquery/select-star-caro), sí. Pero esa es solo la mitad de la historia. Hay otra unidad que decide qué tan rápido vuelve tu query y que nunca aparece en el SQL: el **slot**. Es la moneda invisible del cómputo en BigQuery, y entenderla explica por qué la misma consulta a veces vuela y a veces se arrastra.

## Qué es un slot

Un slot es una unidad virtual de capacidad de cálculo: una porción de CPU y memoria que BigQuery asigna para ejecutar una parte de tu query. Cuando lanzás una consulta, el motor no la corre en una sola máquina. La descompone en miles de pasos pequeños —leer este bloque, filtrar aquel, agrupar lo otro— y reparte esos pasos entre los slots disponibles.

Esa es la maquinaria detrás de la velocidad que vimos en el [escaneo columnar paralelo](/cloud/bigquery/columnar-terabytes). Mil slots trabajando a la vez sobre pedacitos distintos terminan en segundos lo que un solo núcleo tardaría horas. El slot **es** el paralelismo, hecho unidad contable.

## Por qué la misma query a veces tarda más

Esta es la parte que confunde a todo el mundo. Corrés una query a la mañana y vuelve en dos segundos. La misma query, mismos datos, a las tres de la tarde tarda quince. ¿Qué pasó?

Los slots son un recurso **compartido y finito**. Si estás en el modo por demanda, BigQuery te da slots de un pool común, sin garantía de cuántos. Si en ese momento hay mucha gente de tu organización corriendo consultas pesadas, hay menos slots libres para vos, y tu query espera o corre con menos paralelismo. No es que tu SQL empeoró: es que la pista estaba más llena.

Esto lleva a las dos formas de comprar cómputo:

- **On-demand**: pagás por bytes escaneados y compartís un pool de slots. Simple, sin compromiso, ideal para cargas variables o exploratorias.
- **Capacity / reservations**: comprás una cantidad fija de slots (capacidad reservada). El costo es predecible y los slots son tuyos, pero pagás por tenerlos haya o no queries corriendo.

La elección es la misma tensión de siempre en la nube: pagar por uso variable o reservar capacidad. Es exactamente el dilema de [min-instances en Cloud Run](/cloud/cloud-run/min-instances-factura) —tener el recurso caliente y predecible cuesta plata fija; pagar por demanda cuesta variabilidad y, a veces, espera.

## Cómo se traduce esto en tu día a día

Para la mayoría de los equipos chicos o medianos, on-demand alcanza y sobra: cuidás los bytes con buenas queries y listo. Las reservations empiezan a tener sentido cuando el gasto por demanda se vuelve grande e impredecible, o cuando necesitás garantizar performance para dashboards críticos que no pueden quedar esperando detrás de la query exploratoria de otro.

El consejo práctico es no obsesionarse con los slots antes de tiempo. Primero ordenás lo barato: nombrar columnas, [particionar y clusterizar](/cloud/bigquery/particionar-clusterizar), no dejar `SELECT *` enterrados en vistas. Eso reduce el trabajo que los slots tienen que hacer, lo que mejora velocidad y costo a la vez. Pensar en comprar slots para acelerar una query mal escrita es como comprar un auto más potente para llegar antes a un semáforo en rojo: primero arreglá el camino.

En BigQuery hay dos relojes corriendo. Uno cuenta los bytes que leés —tu factura directa. El otro cuenta los slots que usás —tu velocidad. Optimizar el primero casi siempre mejora el segundo, y por eso conviene empezar siempre por ahí.
