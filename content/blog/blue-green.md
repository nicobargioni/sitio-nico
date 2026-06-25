---
title: "Deploy blue-green: cambiar el motor en pleno vuelo"
date: "2026-02-20"
excerpt: "Cómo desplegar una versión nueva sin que el usuario note nada: dos entornos gemelos y un cambio de tráfico instantáneo."
tags: ["cicd", "devops", "curiosidades"]
category: "cloud"
subcategory: "cicd"
---

Hay una pregunta incómoda en todo despliegue: ¿cómo reemplazás la versión que está corriendo, atendiendo usuarios reales, sin apagarla? Apagar para actualizar significa downtime. La respuesta elegante se llama deploy **blue-green**, y la analogía justa es cambiar el motor del avión en pleno vuelo sin que los pasajeros se enteren.

## Dos entornos gemelos

La idea es mantener dos entornos de producción idénticos. Uno se llama **blue**, el otro **green**. En todo momento, uno está recibiendo el tráfico real y el otro está libre.

- Supongamos que **blue** está sirviendo a los usuarios.
- Desplegás la versión nueva en **green**, que está inactivo. Lo probás con tranquilidad: tiene la misma configuración que producción, pero todavía nadie lo usa.
- Cuando confirmás que green está sano, **cambiás el tráfico de blue a green** de golpe.
- Blue queda como respaldo, intacto, con la versión anterior.

El usuario que estaba navegando no nota nada: el cambio es a nivel del router o balanceador de carga que decide a quién mandar las requests.

> El truco no es desplegar más rápido. Es desplegar sobre algo que nadie está mirando todavía.

## Por qué importa el respaldo

Lo más valioso del blue-green no es el cero downtime. Es que **la versión anterior sigue viva**. Si después del cambio descubrís que green tiene un problema que los tests no agarraron, el [rollback es inmediato](/cloud/cicd/rollback): redirigís el tráfico de vuelta a blue, que nunca se tocó. Volver atrás es tan barato como avanzar.

Comparalo con el deploy clásico, donde sobrescribís la versión vieja: si algo sale mal, tenés que reconstruir lo anterior bajo presión, con usuarios afectados. Blue-green convierte ese momento de pánico en un cambio de switch.

```bash
# Conceptual: el balanceador apunta a un entorno u otro
# Antes:  100% del tráfico -> blue  (v1.4)
# Deploy: green levanta v1.5, se valida en aislamiento
# Switch: 100% del tráfico -> green (v1.5)
# Blue queda en standby con v1.4 por si hay que volver
```

## El costo y los matices

No es gratis. Mantener dos entornos completos puede duplicar el costo de infraestructura mientras conviven. Por eso encaja tan bien con plataformas que [escalan a cero](/cloud/cloud-run/scale-to-zero) y cobran por uso: el entorno inactivo casi no cuesta hasta que recibe tráfico.

Hay un detalle que muerde a los distraídos: **las migraciones de base de datos**. Si la versión nueva necesita un esquema distinto, blue y green comparten la misma base, y no podés tener dos esquemas incompatibles a la vez. La solución es hacer cambios de base compatibles hacia atrás (agregar columnas antes de usarlas, nunca borrar de golpe), lo cual exige que tu app sea [disciplinada sobre dónde guarda el estado](/cloud/cloud-run/stateless-obligado).

Una variante más fina es el *canary*: en lugar de cambiar el 100% del tráfico, mandás primero un 5% a la versión nueva, mirás métricas, y si todo va bien subís de a poco. Es blue-green con un dial gradual en vez de un interruptor.

## La lección

Blue-green es un ejemplo de una idea más general: **la mejor forma de hacer algo riesgoso es tener siempre el camino de vuelta listo**. No apostás a que el deploy salga perfecto; preparás el terreno para que, salga como salga, puedas elegir qué versión sirve a tus usuarios en segundos. Eso vale más que cualquier confianza ciega en que esta vez no se rompe.
