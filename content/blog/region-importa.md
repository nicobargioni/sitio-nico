---
title: "Por qué la región de tu nube cambia la latencia y la factura"
date: "2026-03-17"
excerpt: "Elegir 'us-central1' por default parece inofensivo. Pero la región decide cuánto tarda tu app, cuánto pagás y dónde vive legalmente tu dato."
tags: ["gcp", "cloud", "curiosidades"]
category: "cloud"
subcategory: "gcp"
---

La primera vez que creás un recurso en GCP, hay un menú desplegable que casi todos ignoramos: la región. Le damos `us-central1` porque es el default y seguimos. Meses después descubrís que tu app va lenta para usuarios de Sudamérica, que pagás de más por mover datos, o —peor— que un cliente te pregunta dónde está alojada legalmente su información y no sabés qué contestar. Las tres cosas salen de ese desplegable que ignoraste.

## La región es física, no un nombre

`us-central1` es un lugar real: data centers en Iowa. `southamerica-east1` está en São Paulo. Esto importa porque la velocidad de la luz sigue siendo el límite. Un paquete de Buenos Aires a Iowa y de vuelta no baja de los ~120-150 ms solo por la distancia, antes de que tu código haga nada. Si tu base de datos está en una región y tu compute en otra, **cada query paga ese viaje**.

La regla práctica: poné el cómputo cerca del dato, y el dato cerca del usuario. Cuando esos dos no coinciden, tenés un problema de diseño, no de configuración.

## La factura también cambia con la región

Acá hay dos sorpresas:

- **El precio del mismo recurso varía por región.** Una VM idéntica puede costar 15-30% más en São Paulo que en Iowa. Las regiones "más baratas" suelen ser las grandes de EE.UU.
- **Mover datos entre regiones se cobra.** El *egress* (datos que salen de una región hacia otra, o hacia internet) tiene tarifa. Mover datos *dentro* de la misma región suele ser gratis o casi. Por eso un pipeline mal pensado, que cruza datos de región a región, sangra plata sin que nadie lo note hasta el resumen de fin de mes.

Esto pega fuerte en cosas como [entrenar un modelo en Vertex AI](/cloud/gcp/vertex-sin-modelo): si tu dataset vive en una región y el job de entrenamiento corre en otra, sumás transferencia y latencia por nada.

## Soberanía del dato: la parte que no es técnica

Hay un tercer eje que no aparece en los benchmarks: **dónde está legalmente permitido que viva el dato**. Regulaciones como GDPR en Europa, o normas locales de datos personales, pueden exigir que la información de ciudadanos de un país no salga de cierta jurisdicción. Elegir región no es solo performance y costo: a veces es cumplir la ley. Para un cliente bancario o de salud, esto puede ser el factor que manda sobre todos los demás.

## Cómo decidir sin marearte

Un orden mental que me funciona:

1. **¿Hay requisito legal de dónde vive el dato?** Si sí, eso cierra la discusión.
2. **¿Dónde están mis usuarios?** Elegí la región más cercana a la mayoría.
3. **¿Dónde vive el resto de mi stack?** Mantené todo junto para no pagar egress ni latencia interna.
4. **Recién ahí, el costo.** Entre regiones que cumplen lo anterior, elegí la más barata.

Y un detalle: si usás servicios serverless como [Cloud Run](/cloud/cloud-run/scale-to-zero), también se despliegan por región. Un servicio en Iowa sirviendo usuarios en Argentina arrastra ese cold start *más* el viaje físico. La región multiplica, no suma.

## El cierre

La región es una de esas decisiones que parecen triviales al crear el primer recurso y caras de revertir cuando ya tenés todo montado. No es un default: es una decisión de arquitectura disfrazada de menú desplegable. Tomátela treinta segundos antes de darle "crear".
