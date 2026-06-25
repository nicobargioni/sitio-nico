---
title: "Pagar por invocación: cuándo conviene y cuándo no"
date: "2026-02-23"
excerpt: "Serverless cobra por ejecución, el servidor fijo cobra por hora prendida. Existe un punto de equilibrio, y conviene saber de qué lado estás."
tags: ["serverless", "cloud", "curiosidades"]
category: "cloud"
subcategory: "serverless"
---

"Serverless es más barato" es una de esas frases que es verdad y mentira al mismo tiempo, según el caso. Lo más útil que podés hacer antes de elegir es entender que estás comparando dos modelos de costo distintos, y que se cruzan en algún punto.

## Dos formas de pagar la nube

El servidor fijo es como **alquilar un departamento**: pagás el mes completo, lo uses una hora o veinticuatro. Si está vacío, igual pagás. A cambio, el costo por hora de uso real es bajísimo y predecible.

Serverless es como **un Uber**: pagás cada viaje, exacto. Si no lo usás, no pagás nada —[escala a cero](/cloud/cloud-run/scale-to-zero)—. Pero cada viaje individual sale más caro por unidad que tener auto propio.

La pregunta no es cuál es "mejor". Es **cuántos viajes hacés por mes.** Para ir al aeropuerto dos veces al año, Uber gana sin discusión. Para manejar tres horas todos los días, conviene el auto.

## El punto de equilibrio

Hagamos el número sencillo. Supongamos que un servidor chico fijo te sale unos 25 dólares al mes, esté ocioso o no. Y que la misma carga en serverless te cuesta, digamos, una fracción de centavo por invocación más el cómputo de esos segundos.

- Si tu servicio recibe **unas pocas miles de llamadas al mes**, serverless te puede salir centavos. El servidor fijo te cobra los 25 dólares igual, aunque esté dormido el 95% del tiempo. **Serverless gana.**
- Si tu servicio recibe **millones de llamadas sostenidas**, el modelo por invocación se acumula y supera con holgura el costo plano del servidor. **El fijo gana.**

En algún punto intermedio las dos curvas se cruzan. Ese cruce es tu punto de equilibrio, y depende de tu patrón de tráfico:

- **Tráfico bajo, esporádico o impredecible** → serverless. No pagás los valles.
- **Tráfico alto y constante 24/7** → servidor fijo o instancias reservadas. La utilización alta amortiza el costo plano.
- **Picos fuertes sobre una base baja** → híbrido: una base fija para lo predecible y serverless para absorber los picos.

## Los costos que no aparecen en la calculadora

El precio por invocación es solo la parte visible. Antes de declarar un ganador, sumá lo que no figura en el simulador del proveedor:

- **Operación**: el servidor fijo necesita que alguien lo parche, lo monitoree y lo escale a mano. Esa hora de ingeniería tiene un costo real que serverless te ahorra.
- **El cold start**: en serverless, ese [medio segundo del arranque en frío](/cloud/serverless/cold-start-serverless) es un costo de *experiencia*, no de factura, pero existe.
- **Lock-in**: optimizar para el modelo de un proveedor te ata a él. Mudarte después tiene su precio, y de eso hablo en [la letra chica del vendor lock-in](/cloud/serverless/vendor-lock-in).

Mi regla práctica: si tu carga es chica, irregular o recién arranca, empezá serverless y no te hagas problema. El día que el tráfico se vuelva grande y predecible, hacé el número de nuevo. Migrar de Uber a auto propio cuando ya manejás todos los días es una decisión sana —y mucho mejor que haber comprado el auto para usarlo dos veces al año—.
