---
title: "Las cuotas de GCP: el límite que descubrís en producción"
date: "2026-03-14"
excerpt: "Tu código funciona, tu tarjeta tiene saldo, y aún así GCP te frena con un error 429. No es un bug: es una cuota que nadie te avisó que existía."
tags: ["gcp", "cloud", "curiosidades"]
category: "cloud"
subcategory: "gcp"
---

Hay un momento clásico en la vida de todo proyecto en la nube. Funciona en pruebas, lo lanzás, llega tráfico de verdad... y de golpe empieza a tirar `429 Quota exceeded` o `RESOURCE_EXHAUSTED`. Revisás el código: está bien. Revisás la tarjeta: tiene saldo. Y ahí descubrís que GCP tiene un límite que vos no pusiste y que nadie te mostró: las **cuotas**. El peor momento para conocerlas es cuando ya estás en producción y el tráfico no espera.

## Qué son y por qué existen

Una cuota es un techo que GCP le pone a cuánto de un recurso podés usar. Hay de dos sabores:

- **Cuotas de tasa (rate):** cuántas llamadas por minuto/segundo a una API. Por ejemplo, X requests por minuto a la API de Vertex, o a la de Cloud Storage.
- **Cuotas de asignación (allocation):** cuánto de un recurso podés tener al mismo tiempo. Por ejemplo, cuántas CPUs o GPUs en una región, cuántas IPs, cuántas VMs.

¿Por qué existen? Por dos razones, una para Google y una para vos. Para Google: evitan que un solo cliente acapare un recurso finito (no hay GPUs infinitas en ningún data center). Para vos: son un **freno de emergencia contra el desastre**. Si un bug entra en bucle y empieza a crear 10.000 VMs, la cuota te frena antes de que la factura te frene a vos. Es lo mismo que el [riesgo de un agente que entra en bucle](/ia-agentes/agentes/agente-en-bucle): un límite duro es lo que te salva de tu propio código.

## El detalle que muerde: las cuotas son por región

Una cuota de "8 GPUs" no es global: es **8 GPUs en `us-central1`**, otras tantas en `europe-west1`, y así. Esto sorprende a todo el mundo. Pedís capacidad, te la niega, y jurás que tenés cuota libre... pero estás mirando la de otra región. Es una razón más para [pensar bien la región desde el principio](/cloud/gcp/region-importa): no solo cambia latencia y costo, también es la unidad en la que se cuentan tus límites.

Y pega justo donde menos lo esperás. Querés levantar muchas [Spot VMs baratas para un batch](/cloud/gcp/maquinas-preemptibles) y chocás contra la cuota de CPUs de la región antes que contra el presupuesto. La máquina es barata; el permiso para tener tantas, limitado.

## Cómo no descubrirlas en producción

Tres hábitos que evitan el papelón:

- **Revisá tus cuotas antes de escalar**, no después. Están en la consola, en *IAM & Admin → Quotas*. Mirá las de los servicios que vas a empujar fuerte.
- **Pedí aumentos con anticipación.** Subir una cuota (sobre todo de GPUs) no es instantáneo: a veces lo aprueban en minutos, a veces tarda días y requiere justificar el uso. Pedilo *antes* del lanzamiento, no la noche del lanzamiento.
- **Manejá el 429 con dignidad.** Tu código debe reintentar con *exponential backoff* en vez de martillar la API. Pegarle más fuerte a algo que te dice "pará" solo empeora todo.

```python
# Reintento con backoff exponencial ante un 429
import time

def con_backoff(fn, intentos=5):
    for i in range(intentos):
        try:
            return fn()
        except QuotaExceeded:
            time.sleep(2 ** i)  # 1s, 2s, 4s, 8s, 16s
    raise RuntimeError("Cuota agotada tras varios reintentos")
```

## El cierre

Las cuotas no son tu enemigo: son la barandilla que evita que un bug o un pico te lleven puesta la factura. El error no es que existan; el error es enterarte de que existen cuando el tráfico ya está golpeando la puerta. Mirá tus límites el día que diseñás, no el día que escalás. La nube es elástica, pero la elasticidad tiene un techo que conviene conocer de antemano.
