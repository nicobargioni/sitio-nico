---
title: "Cold starts: el medio segundo que arruina la experiencia"
date: "2026-03-13"
excerpt: "Tu API responde en 50 ms... salvo la primera request, que tarda 3 segundos. Eso es un cold start, y casi siempre se puede domar."
tags: ["cloud-run", "serverless", "curiosidades"]
category: "cloud"
subcategory: "cloud-run"
---

Hacés una demo. La primera persona que entra espera tres segundos para que cargue, frunce el ceño, y a partir de ahí todo vuela. Vos no entendés nada: en tu máquina anda instantáneo. Lo que acabás de ver es un **cold start**, y es una de las curiosidades más mal entendidas de lo serverless.

## Qué pasa realmente en ese arranque

Cuando una request llega a Cloud Run y no hay ningún contenedor vivo para atenderla, la plataforma tiene que hacer todo esto **antes** de que tu código vea la request:

- Programar el contenedor en una máquina física.
- Bajar la imagen de Docker (o usar una capa cacheada).
- Arrancar el runtime: levantar el proceso, importar dependencias, abrir conexiones.
- Recién ahí ejecutar tu handler.

Eso es el medio segundo (o los tres segundos) que el usuario percibe. Si tu app importa medio PyPI al arrancar o levanta un modelo de 400 MB en memoria, ese costo lo pagás **en cada arranque en frío**, no una sola vez.

El detalle clave: el cold start no es un bug, es el precio de [escalar a cero](/cloud/cloud-run/scale-to-zero). Si no hay tráfico, no hay contenedor; si no hay contenedor, la próxima request paga el arranque. Es el mismo fenómeno que afecta a [todo lo serverless](/cloud/serverless/cold-start-serverless), no solo a Cloud Run.

## Cómo se mide (y por qué tu medición miente)

La trampa más común: probás el endpoint, ves 50 ms, y concluís que no hay problema. Pero acabás de "calentar" el contenedor con esa primera llamada. El cold start solo aparece cuando la instancia estaba apagada.

Para medirlo de verdad necesitás forzar el frío: esperar a que escale a cero y recién ahí medir la primera request. En la consola de Cloud Run, la métrica *Startup latency* te separa el arranque del tiempo de respuesta real.

## Cómo achicar el medio segundo

No siempre podés eliminarlo, pero casi siempre achicarlo:

- **Imagen liviana.** Menos para bajar, menos para descomprimir. Acá manda el [orden de capas del Dockerfile](/cloud/docker/capas-cache) y, si podés, una base mínima.
- **Lazy loading.** No importes ni cargues en memoria lo que no necesitás para responder. Diferí el modelo pesado hasta la primera vez que de verdad se use.
- **Menos trabajo en el arranque.** Abrir conexiones a la base, leer config, validar credenciales: hacelo perezoso, no en el import global.
- **La opción cara:** mantener una instancia caliente con [min-instances](/cloud/cloud-run/min-instances-factura). Mata el cold start, pero te cobra por tenerla viva 24/7.

```bash
# Forzar el frío y medir la primera request honestamente
gcloud run services update mi-api --min-instances=0
sleep 60   # dejá que escale a cero
curl -w "tiempo total: %{time_total}s\n" -o /dev/null -s https://mi-api.run.app/health
```

## El criterio

El cold start importa según **quién** espera. Un cron que corre de noche puede tardar tres segundos y a nadie le importa. Una API que responde a un click de usuario, no. Antes de pagar por instancias calientes, preguntate si el frío realmente molesta a alguien — muchas veces optimizás un problema que el usuario nunca ve.
