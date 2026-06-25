---
title: "min-instances: el truco caliente que infla la factura"
date: "2026-03-10"
excerpt: "Una línea de config mata el cold start para siempre. También te cobra por una instancia prendida 24/7, la use alguien o no."
tags: ["cloud-run", "serverless", "curiosidades"]
category: "cloud"
subcategory: "cloud-run"
---

Te cansaste del [cold start](/cloud/cloud-run/cold-start). Buscás "cómo evitarlo", encontrás `--min-instances=1`, lo aplicás, y magia: nunca más esa primera request lenta. Un mes después abrís la factura y hay un cargo que antes no estaba. Bienvenido al truco más tentador y más caro de Cloud Run.

## Qué hace exactamente min-instances

Por default Cloud Run [escala a cero](/cloud/cloud-run/scale-to-zero): sin tráfico, sin instancias, sin costo de cómputo. `min-instances` rompe ese cero. Le decís a la plataforma: *"mantené siempre al menos N contenedores vivos, haya tráfico o no"*.

El beneficio es directo y real: esas instancias ya están arrancadas, así que la request entra a un contenedor caliente y **el cold start desaparece**. El problema es igual de directo: un contenedor vivo se factura **aunque no atienda ni una sola request**.

## La cuenta que conviene hacer antes

Cloud Run sin min-instances te cobra solo por el tiempo en que tu código procesa requests (más el arranque). Con min-instances=1 pagás, como piso, **una instancia las 24 horas, los 30 días**. La diferencia no es sutil:

- **Scale-to-zero:** pagás los segundos reales de cómputo. Un servicio de bajo tráfico puede costar centavos al mes.
- **min-instances=1:** pagás ~720 horas de una instancia viva al mes, uses 50 requests o 50 millones.

Para tráfico alto y constante, ese piso se diluye y vale la pena. Para una herramienta interna o un MVP de bajo uso, podés multiplicar tu factura por diez para arreglar un cold start que molestaba a tres personas. Es el mismo análisis de [cuándo conviene pagar por invocación](/cloud/serverless/costo-por-invocacion): depende del patrón de uso, no del miedo al frío.

## Las alternativas que casi nadie evalúa

Antes de prender una instancia 24/7, mirá si alcanza con algo más barato:

- **Pings periódicos.** Un cron que golpea tu `/health` cada pocos minutos mantiene un contenedor tibio durante las horas que importan, sin pagarlo de noche. Costo casi nulo.
- **Achicar el arranque.** Imagen más liviana, [capas bien ordenadas](/cloud/docker/capas-cache) y lazy loading recortan el cold start sin pagar instancias.
- **min-instances solo en horario pico.** Programá un piso de 1 durante el día y 0 a la noche. Pagás caliente cuando hay gente, frío cuando no.

```bash
# El truco caliente, pero a horario: piso de 1 solo de día
# (lo agendás con Cloud Scheduler, no a mano)
gcloud run services update mi-api --min-instances=1   # 9:00
gcloud run services update mi-api --min-instances=0   # 20:00
```

## El criterio

min-instances no es malo: es una palanca con precio. La trampa es activarlo por reflejo, sin medir cuánto molesta el cold start ni cuánto cuesta tenerlo prendido. Primero **medí** el arranque en frío real; después preguntate si el ping periódico no resuelve el 90% del problema a una fracción del costo. Mantener algo caliente las 24 horas debería ser una decisión, no un default que te encontrás en la factura.
