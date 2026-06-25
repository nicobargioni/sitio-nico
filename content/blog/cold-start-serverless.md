---
title: "El cold start, el talón de Aquiles de lo serverless"
date: "2026-02-24"
excerpt: "La primera invocación de una función dormida tarda más. Por qué pasa, cuánto duele y a quién le importa de verdad."
tags: ["serverless", "cloud", "curiosidades"]
category: "cloud"
subcategory: "serverless"
---

Probás tu función serverless después de un rato sin usarla y la primera respuesta tarda un segundo entero. La segunda vuela. La tercera también. Pensás que algo está roto, pero no: acabás de chocar con el *cold start*, el arranque en frío. Es el peaje que pagás por no tener una máquina prendida todo el día.

## Qué pasa en ese segundo

Cuando tu servicio está dormido —escaló a cero porque nadie lo llamaba— no hay ninguna instancia esperando. Entonces la primera request tiene que pagar todo el costo de levantar una de cero:

1. **Aprovisionar** un sandbox o microVM donde correr.
2. **Descargar y descomprimir** tu imagen o tu código.
3. **Arrancar el runtime** (la JVM, el intérprete de Python, Node).
4. **Ejecutar tu código de inicialización**: imports, conexión a la base, carga de un modelo en memoria.

Recién después atiende la request. Ese conjunto es el cold start. Una vez caliente, la instancia se queda un rato disponible y las llamadas siguientes saltan todos estos pasos: eso es el *warm start*, de milisegundos.

El detalle clave es que **el código que escribís influye fuerte**. Un runtime liviano y pocas dependencias arrancan rápido; cargar un modelo de 2GB o abrir veinte conexiones en el import te clava el arranque. Lo mismo aplica al tamaño de tu [imagen de contenedor](/cloud/docker/imagen-gigante): cuanto más pesa, más tarda en descargarse y descomprimirse.

## ¿A quién le importa de verdad?

Acá está la parte que casi nadie matiza. El cold start es un problema **real para algunos casos y casi irrelevante para otros**.

Te importa mucho si:

- Servís una **API interactiva** donde el usuario espera del otro lado y un segundo se siente.
- Tu tráfico es **esporádico**: justo porque viene poco, casi siempre encontrás la instancia fría.

No te importa casi nada si:

- Procesás trabajos **en batch o asincrónicos**: a un job que tarda 4 minutos, medio segundo extra no le mueve la aguja.
- Tenés **tráfico constante**: las instancias se mantienen calientes solas porque siempre hay alguien llamando.

Es la misma historia que el [medio segundo que arruina la experiencia](/cloud/cloud-run/cold-start) en Cloud Run: duele donde hay un humano esperando, no donde hay una cola.

## Cómo se mitiga (y qué cuesta)

Hay palancas, pero casi todas tienen un costo que conviene mirar de frente:

- **Mantener instancias calientes** (min-instances): el proveedor deja una prendida siempre. Mata el cold start, pero le pega a la idea de pagar solo por lo que usás. Es el [truco caliente que infla la factura](/cloud/cloud-run/min-instances-factura).
- **Pings periódicos**: un scheduler que llama tu servicio cada pocos minutos para que no se duerma. Más barato que reservar instancias, pero un parche.
- **Adelgazar el arranque**: runtime liviano, lazy loading de lo pesado, imagen chica. Lo más sano y lo que más rinde.

La conclusión incómoda es que eliminar el cold start del todo casi siempre significa renunciar a una de las dos gracias de serverless —el costo cercano a cero cuando no hay tráfico—. Antes de pelearte con el arranque en frío, preguntate si tu caso de uso realmente lo sufre. La mitad de las veces, la respuesta honesta es que no.
