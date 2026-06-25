---
title: "Escalar a cero: pagar exactamente por lo que usás"
date: "2026-03-12"
excerpt: "Si nadie usa tu servicio, no pagás nada. Suena perfecto, hasta que entendés qué te cobra ese cero a cambio."
tags: ["cloud-run", "serverless", "curiosidades"]
category: "cloud"
subcategory: "cloud-run"
---

La promesa de Cloud Run cabe en una frase: si nadie usa tu servicio, baja a **cero instancias** y no pagás nada. Cero tráfico, cero costo de cómputo. Para un proyecto chico, un MVP o una herramienta interna que se usa tres veces por semana, es casi mágico. Pero todo lo que es mágico tiene letra chica, y acá vale la pena leerla.

## Qué significa "cero" exactamente

Cuando no llegan requests, Cloud Run apaga los contenedores. No hay proceso corriendo, no hay RAM reservada, no hay factura por cómputo. La próxima request hace que la plataforma levante un contenedor de nuevo.

Eso cambia el modelo mental respecto de un servidor tradicional. Un servidor es un taxi con el motor encendido esperándote: pagás aunque no te subas. Cloud Run con scale-to-zero es un taxi que aparece cuando lo llamás — no pagás la espera, pero pagás el ratito en que **arranca el motor**. Ese ratito es el [cold start](/cloud/cloud-run/cold-start), y es la contracara directa de escalar a cero.

## La contracara, punto por punto

- **Cold start en la primera request.** Sin instancias vivas, alguien paga el arranque. Inevitable mientras estés en cero.
- **Nada de estado en memoria.** Si el contenedor se apaga, se borra todo lo que tenías en RAM o en disco local. Esto es lo que [te obliga a ser stateless](/cloud/cloud-run/stateless-obligado): el estado tiene que vivir afuera.
- **Conexiones que se caen.** Pools a la base de datos, websockets, cualquier conexión persistente desaparece al apagarse. Hay que reabrir.
- **Tareas en segundo plano que mueren.** Si arrancaste un proceso "para después" y la request terminó, Cloud Run puede apagar el contenedor antes de que ese trabajo corra.

## Cuándo el cero conviene de verdad

Escalar a cero brilla cuando el tráfico es **intermitente o impredecible**:

- Herramientas internas que se usan en horario de oficina.
- Webhooks que disparan cada tanto.
- APIs de baja frecuencia, dashboards de uso esporádico, demos.

Y conviene menos cuando hay tráfico constante: si siempre tenés instancias arriba igual, el cero nunca se activa y el modelo [por invocación](/cloud/serverless/costo-por-invocacion) puede salirte más caro que una VM fija. El cálculo cambia según el patrón de uso, no según la moda.

## El detalle que casi nadie revisa

Scale-to-zero es el **default**, pero no siempre el adecuado. Si tu servicio atiende usuarios reales y el cold start molesta, la salida es mantener un piso de instancias con [min-instances](/cloud/cloud-run/min-instances-factura) — y entonces ya no estás en cero, estás pagando por estar listo.

```bash
# Ver el comportamiento actual: si min-instances es 0, escala a cero
gcloud run services describe mi-api \
  --format="value(spec.template.metadata.annotations['autoscaling.knative.dev/minScale'])"
```

La pregunta correcta no es "¿escalo a cero?" sino "¿qué me cuesta más: el cold start ocasional o tener una instancia prendida todo el día?". Y eso depende de tu tráfico y de quién está del otro lado esperando.
