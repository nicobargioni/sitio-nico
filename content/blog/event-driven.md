---
title: "Arquitectura por eventos: el código que reacciona"
date: "2026-02-25"
excerpt: "En serverless tu código no corre en un bucle esperando. Duerme hasta que pasa algo, y entonces reacciona. Ese cambio de mentalidad lo cambia todo."
tags: ["serverless", "cloud", "curiosidades"]
category: "cloud"
subcategory: "serverless"
---

La mayoría aprendimos a programar pensando en un proceso que arranca, hace cosas en un bucle y sigue vivo hasta que lo matás. Un servidor web clásico es eso: un programa que se queda escuchando en un puerto, día y noche, gaste o no gaste recursos esperando una visita que tal vez no llega.

La arquitectura por eventos da vuelta esa idea. Tu código no espera: **duerme, y reacciona cuando algo lo despierta.**

## El cambio: del "preguntar" al "ser avisado"

Hay dos formas de enterarte de que algo pasó. La vieja escuela es el *polling*: preguntar cada tantos segundos "¿hay algo nuevo? ¿hay algo nuevo?". Funciona, pero gastás recursos preguntando al pedo el 99% de las veces, y reaccionás tarde.

El modelo por eventos es al revés: vos no preguntás, te avisan. Algo ocurre —llega un archivo, alguien aprieta un botón, vence un timer— y eso **dispara** tu función. El código corre, hace lo suyo y se apaga. No hay bucle, no hay espera, no hay máquina prendida de gusto.

Los disparadores típicos:

- **HTTP**: alguien hace una request a tu endpoint.
- **Archivos**: se sube un objeto a un bucket de storage.
- **Mensajes**: llega un mensaje a una cola o a un topic (Pub/Sub, SQS).
- **Tiempo**: un scheduler te dispara cada hora, como un cron.
- **Cambios en datos**: se inserta una fila, se modifica un documento.

Si esto te suena a los [webhooks](/hiperautomatizacion/n8n-make/webhooks-pegamento) que pegan automatizaciones entre apps, es porque es exactamente la misma idea, escalada a la arquitectura entera.

## Por qué encaja tan bien con serverless

Una función que reacciona a un evento y después se apaga es el caso de uso ideal para algo que [escala a cero](/cloud/cloud-run/scale-to-zero). No tiene sentido pagar una máquina prendida todo el día si tu código solo corre tres veces por hora. El evento llega, se levanta una instancia, procesa y se vuelve a dormir. Pagás solo esos segundos.

Por eso serverless y eventos van casi siempre juntos. El modelo de [pagar por invocación](/cloud/serverless/costo-por-invocacion) solo cierra si tu código efectivamente arranca y para, en vez de quedarse vivo.

```
[Usuario sube foto] --> evento --> [Función redimensiona]
                                          |
                                   [Guarda thumbnail]
                                          |
                                   evento --> [Función notifica]
```

Cada paso es independiente, se dispara solo cuando el anterior terminó, y nada corre mientras no hay trabajo.

## La trampa: ahora todo es asincrónico

Este modelo es elegante pero tiene su precio mental. Como las cosas pasan en respuesta a eventos sueltos, perdés el hilo lineal del "primero esto, después aquello". El sistema se vuelve un grafo de piezas que se hablan por mensajes, y razonar sobre el orden, los reintentos y los fallos parciales cuesta más.

Dos cosas que aprendés a la mala:

- Un evento puede llegar **dos veces**. Tu función tiene que ser [idempotente](/hiperautomatizacion/n8n-make/idempotencia): correrla dos veces no debe romper nada.
- Un evento puede **perderse o llegar tarde**. Diseñá pensando en que el mensaje quizás no aparezca cuando esperabas.

Pensar por eventos es desaprender el bucle. Pero cuando hace clic, te das cuenta de que casi todo lo interesante en una empresa —una venta, un alta, un pago— *es* un evento. Modelar el sistema así no es un truco técnico: es describir el negocio como realmente pasa.
