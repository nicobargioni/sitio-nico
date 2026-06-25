---
title: "Máquinas preemptibles: 80% más baratas si tolerás que se apaguen"
date: "2026-03-16"
excerpt: "Google te alquila su capacidad sobrante a una fracción del precio. La letra chica: te la puede sacar con 30 segundos de aviso. La gracia es saber cuándo eso no importa."
tags: ["gcp", "cloud", "curiosidades"]
category: "cloud"
subcategory: "gcp"
---

Hay un descuento en GCP tan grande que parece error de tipeo: las mismas VMs, hasta un 80% más baratas. Se llaman **Spot VMs** (antes "preemptibles"), y no es un error. Es un trato: Google te alquila la capacidad que tiene ociosa en sus data centers, pero se reserva el derecho de quitártela cuando la necesite para un cliente que paga precio completo. Te avisa con unos **30 segundos** y apaga la máquina. La pregunta interesante no es "¿es seguro?", sino "¿qué cargas no se enojan si la máquina muere a la mitad?".

## Por qué Google regala ese descuento

Un data center se planifica para el pico de demanda, no para el promedio. Eso significa que la mayor parte del tiempo hay servidores prendidos sin hacer nada. Esa capacidad ociosa no se puede "guardar para mañana": o se usa ahora o se desperdicia. Entonces Google la malvende: mejor cobrar el 20% que el 0%. Cuando vuelve a necesitarla, te la saca. El descuento es el precio de esa incertidumbre.

## El truco está en la palabra "tolerante"

La clave es separar las cargas que **toleran interrupción** de las que no:

- **Toleran (usá Spot, ahorrá):** entrenamiento de modelos con checkpoints, procesamiento de batch, renderizado, encoding de video, jobs de análisis grandes, CI que corre y termina. Si el job guarda su progreso cada tanto, perder una VM solo cuesta reanudar desde el último checkpoint.
- **No toleran (no las uses):** una base de datos, una API que sirve usuarios en vivo, una sesión con estado. Si la máquina se apaga, el usuario se cae.

El patrón ganador es el **checkpointing**: que tu proceso guarde su estado periódicamente en almacenamiento persistente. Así, si te sacan la VM, otra retoma desde donde quedó. En entrenamiento de redes esto es casi gratis de implementar porque ya guardás pesos cada N pasos.

## La cuenta que hace que valga la pena

Pensá un entrenamiento de 10 horas que necesita 4 VMs potentes:

- A precio normal: digamos $40.
- En Spot, con 75% de descuento: ~$10.

Aunque te interrumpan dos o tres veces y pierdas algunos minutos reanudando, terminás pagando una fracción. El ahorro le gana al fastidio por goleada. Por eso los pipelines de ML serios corren el entrenamiento pesado en Spot casi por default — y reservan VMs normales solo para lo que sirve en vivo.

Esto se conecta directo con [entrenar en Vertex AI](/cloud/gcp/vertex-sin-modelo): los jobs de entrenamiento son el caso de uso perfecto para capacidad interrumpible, porque corren, terminan y no le importa a ningún usuario si tardan un toque más.

## Dónde encaja en la arquitectura

Una buena división de tu nube termina pareciéndose a esto:

- **Lo que sirve en vivo** (APIs, fronts) → en plataformas que escalan solas como [Cloud Run, que escala a cero](/cloud/cloud-run/scale-to-zero) cuando nadie las usa.
- **Lo que procesa en batch** → en Spot VMs baratas y tolerantes a interrupción.
- **Lo que guarda estado** → en servicios gestionados, nunca en una VM que se puede esfumar.

Y ojo con un detalle que suele morder: las Spot VMs también consumen tu [cuota de GCP](/cloud/gcp/cuotas-gcp). Pedir 50 VMs baratas de golpe puede chocar contra un límite de la cuenta antes que contra el presupuesto.

## El cierre

Spot es una de las pocas optimizaciones de nube donde el ahorro es enorme y el riesgo es acotado *si* diseñaste pensando en la interrupción. No es para todo. Pero para todo lo que corre, termina y guarda progreso, dejar plata sobre la mesa pagando precio completo es casi un descuido.
