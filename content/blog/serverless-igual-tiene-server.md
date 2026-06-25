---
title: "Serverless igual tiene servidores (solo que no son tuyos)"
date: "2026-02-26"
excerpt: "El nombre miente un poco: en serverless hay servidores como siempre. Lo que cambia es quién los administra y por qué eso te conviene."
tags: ["serverless", "cloud", "curiosidades"]
category: "cloud"
subcategory: "serverless"
---

Una de las primeras veces que escuché "serverless" pensé, como casi todos, que el código corría flotando en el aire. Falso: hay servidores. Físicos, con CPU, RAM y un ventilador que zumba en un datacenter de Iowa. El nombre es marketing, pero abajo de la abstracción hay fierro como siempre.

Lo interesante no es el nombre, es qué dejás de administrar cuando lo elegís.

## Qué delegás exactamente

En un servidor tradicional vos sos responsable de toda la torta: el sistema operativo, los parches de seguridad, cuántas máquinas prender, cuándo apagarlas, el balanceador de carga. Si te llega un pico de tráfico a las 3 de la mañana, alguien tiene que haber previsto esa capacidad de antemano (y pagarla mientras estaba ociosa).

Serverless invierte el trato. Vos subís una función o un contenedor y le decís al proveedor: "corré esto cuando haga falta". El proveedor se encarga de:

- **Aprovisionar** la máquina donde corre tu código.
- **Escalar** de cero a mil instancias según la demanda, sin que muevas un dedo.
- **Parchar y mantener** el sistema operativo abajo.
- **Apagar todo** cuando nadie te llama, para no cobrarte de más.

Lo que vos seguís teniendo en la cabeza es tu código y su configuración. El resto es problema de otro. Por eso conviene pensarlo como *no-ops* antes que *no-server*: lo que desaparece es la operación de infraestructura, no la infraestructura.

## La abstracción tiene su costo

Nada es gratis. Al delegar el control perdés algunas cosas que en un servidor propio dabas por sentadas.

La primera es la **persistencia**. Como tu instancia puede apagarse en cualquier momento, no podés guardar nada importante en su disco o en memoria entre una llamada y otra. El estado vive en otro lado (una base, un bucket). Es lo que en Cloud Run [te obliga a ser stateless](/cloud/cloud-run/stateless-obligado).

La segunda es el **arranque en frío**: si tu servicio estuvo dormido un rato, la primera llamada tiene que esperar a que se levante una instancia nueva. Ese retardo es el [talón de Aquiles de lo serverless](/cloud/serverless/cold-start-serverless) y conviene tenerlo medido antes de prometer latencias.

La tercera es el **modelo mental**. Serverless casi siempre va de la mano de una [arquitectura por eventos](/cloud/serverless/event-driven): tu código no corre en un bucle infinito esperando, se dispara cuando pasa algo. Pensar así requiere desaprender hábitos.

## Entonces, ¿qué es realmente serverless?

Mi definición de trabajo: serverless es cualquier modelo donde **no aprovisionás capacidad por adelantado y solo pagás por la ejecución real**. Funciones (Cloud Functions, Lambda), contenedores que [escalan a cero](/cloud/cloud-run/scale-to-zero), bases que cobran por query. El denominador común no es la ausencia de servidores, es la ausencia de servidores *ociosos en tu factura*.

La pregunta útil no es "¿hay servidores?" —siempre los hay—. Es: **¿quiero ser yo el que los cuida, o prefiero pagar para que otro lo haga?** Para un equipo chico que no quiere un SRE de guardia, delegar suele ganar. Para una carga constante y predecible, capaz que no. Pero esa es otra discusión: la del [punto de equilibrio del costo](/cloud/serverless/costo-por-invocacion).

Lo que no cambia nunca es que el ventilador en Iowa sigue girando. Solo que ahora no es tu problema.
