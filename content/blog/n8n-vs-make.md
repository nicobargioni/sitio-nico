---
title: "n8n vs Make: open source vs comodidad"
date: "2026-04-04"
excerpt: "Uno te da las llaves del motor y la responsabilidad de mantenerlo. El otro te da un auto que anda y la factura mensual."
tags: ["nocode", "automatizacion", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "n8n-make"
---

Es la pregunta que cae siempre: "¿armo esto en n8n o en Make?" Y la respuesta honesta no es cuál es mejor, sino qué clase de tradeoff estás dispuesto a aceptar. Porque las dos hacen lo mismo en la superficie —arrastrar nodos para conectar APIs— pero te cobran filosofías opuestas.

## Make: la comodidad como producto

Make (ex Integromat) es **SaaS puro**. No instalás nada, no mantenés nada: entrás, armás el escenario, lo prendés. La interfaz es pulida, las integraciones son muchísimas y andan sin que toques una sola línea. Es la opción que elegís cuando querés que la automatización funcione y no querés ser, además, el que la hostea.

El precio de esa comodidad tiene dos caras:

- **Pagás por operación.** Cada acción de cada nodo cuenta. Un flujo que itera sobre miles de ítems consume cuota rápido, y ahí los [rate limits y la facturación](/hiperautomatizacion/n8n-make/rate-limits) dejan de ser un detalle.
- **Estás adentro del jardín.** Lo que Make no expone, no lo hacés. Es el [vendor lock-in](/cloud/serverless/vendor-lock-in) clásico del SaaS: comodidad a cambio de dependencia.

## n8n: el control como producto

n8n es **open source y self-hostable**. Lo corrés en tu propio servidor —un contenedor en [Cloud Run](/cloud/cloud-run/scale-to-zero), una VM, lo que sea— y a partir de ahí mandás vos. El modelo de precio cambia de raíz: no pagás por operación, pagás por la infraestructura que levantás. Diez mil ejecuciones o un millón cuestan casi lo mismo si el server aguanta.

Y como podés meter nodos de código y llamar lo que quieras, el [techo del no-code se corre mucho más arriba](/hiperautomatizacion/n8n-make/techo-nocode). Es la herramienta del que quiere las llaves del motor.

La contracara, claro, es que **el motor lo mantenés vos**: actualizaciones, backups, que no se caiga el server a las 3 AM. La comodidad que Make te vende, en n8n es tu responsabilidad.

## El eje real de la decisión

No es técnico, es organizacional. Preguntate:

- **¿Tenés quién mantenga infraestructura?** Si no, Make. Self-hostear sin alguien que se ocupe es deuda esperando a explotar.
- **¿El volumen es alto y predecible?** A escala, el modelo por-operación de Make se vuelve caro y el de infra de n8n gana claro.
- **¿Necesitás control fino o datos que no pueden salir de tu nube?** n8n, sin dudar — por compliance o por lógica que el SaaS no te deja hacer.
- **¿Es un MVP para validar una idea esta semana?** Make. Velocidad sobre todo lo demás.

## El falso dilema

La trampa es creer que tenés que casarte con una. Mucha gente prototipa en Make —porque arrancar es instantáneo— y migra a n8n los flujos que se vuelven críticos o caros. La decisión de open source vs comodidad no es de una vez para siempre; es por flujo y por etapa.

Y sea cual sea, las reglas duras no cambian: un flujo igual tiene que ser [idempotente](/hiperautomatizacion/n8n-make/idempotencia) y respetar los límites de las APIs. La plataforma elige cuánta plomería ves; no te exime de pensar la lógica.
