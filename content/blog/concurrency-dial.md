---
title: "Concurrency en Cloud Run: el dial que casi nadie toca"
date: "2026-03-09"
excerpt: "¿Cuántas requests atiende un contenedor a la vez? La respuesta cambia tu factura, tu latencia y cuántas instancias prendés."
tags: ["cloud-run", "serverless", "curiosidades"]
category: "cloud"
subcategory: "cloud-run"
---

Hay un parámetro en Cloud Run que la mayoría deja en su valor por defecto sin saber que existe, y que decide en silencio cuánto pagás y qué tan bien escalás. Se llama **concurrency**: cuántas requests atiende *un mismo contenedor al mismo tiempo*. Es el dial menos tocado y uno de los más importantes.

## Qué controla en realidad

La mayoría imagina que cada request necesita su propio contenedor. No es así. Cloud Run puede mandar **varias requests al mismo contenedor en paralelo**, y `concurrency` fija el techo: con concurrency=80, un contenedor atiende hasta 80 simultáneas antes de que la plataforma levante otro.

De ahí salen dos efectos encadenados:

- **Menos instancias.** Si cada contenedor maneja 80 a la vez, necesitás muchos menos contenedores para el mismo tráfico que si cada uno manejara una sola.
- **Menos costo.** Cloud Run te cobra por instancia × tiempo. Menos instancias vivas, menos factura. Y menos arranques nuevos, menos [cold starts](/cloud/cloud-run/cold-start).

Es justo lo contrario del modelo clásico de [funciones serverless](/cloud/serverless/serverless-igual-tiene-server), donde cada invocación suele tener su propia ejecución aislada. Cloud Run te deja exprimir cada contenedor.

## Por qué el default no siempre te sirve

El truco es que la concurrency ideal **depende de qué hace tu código** en cada request:

- **Trabajo I/O-bound** (esperás a una base de datos, a una API externa, a disco): el contenedor pasa la mayor parte del tiempo esperando, así que puede atender muchas requests en paralelo sin despeinarse. Concurrency alta = aprovechás esa espera.
- **Trabajo CPU-bound** (inferencia de un modelo, procesar imágenes, cálculo pesado): cada request consume CPU de verdad. Apilás 80 y todas se vuelven lentas porque pelean por el mismo procesador. Acá conviene concurrency **baja**, a veces 1.

Subir la concurrency sin pensar te puede dar latencias horribles; bajarla sin pensar te puede multiplicar las instancias y la factura. No hay un número universal.

```bash
# Por defecto suele ser 80. Para una API I/O-bound podés subirla;
# para inferencia pesada, bajala para que las requests no se peleen por CPU.
gcloud run services update mi-api --concurrency=1     # CPU-bound (modelo pesado)
gcloud run services update mi-api --concurrency=200   # I/O-bound (espera mucho)
```

## Cómo elegir sin adivinar

- Mirá si tus requests **esperan** (I/O) o **trabajan** (CPU). Esa es la pregunta principal.
- Subí la concurrency de a poco y mirá la latencia p95, no el promedio. Si empieza a subir, te pasaste.
- Recordá que más concurrency aprieta cada contenedor: ajustá la RAM y la CPU asignadas en consecuencia.
- La concurrency interactúa con [min-instances](/cloud/cloud-run/min-instances-factura) y con que tu app sea [stateless](/cloud/cloud-run/stateless-obligado): varias requests en el mismo contenedor pisan cualquier estado global compartido.

## El detalle que cierra todo

Concurrency es la palanca que conecta latencia y costo. Bien calibrada, atendés el mismo tráfico con menos instancias, menos arranques y menos plata. Mal calibrada, o sufrís latencia o pagás de más. Es un dial que vale la pena tocar — pero con un número en la mano, midiendo, no de oído.
