---
title: "Por qué el OCR no alcanza para entender un documento"
date: "2026-03-23"
excerpt: "Un OCR transcribe letras perfectas y aun así no sabe cuál es el total de la factura. Leer no es entender."
tags: ["documentos", "idp", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "idp"
---

Pasás una factura por un OCR y te devuelve, impecable, cada caracter: "TOTAL", "1.250,00", "CUIT", "30-71...". Letra por letra, sin un error. Y sin embargo, si le preguntás "¿cuánto hay que pagar?", no tiene la menor idea. Transcribió todo y entendió nada. Esa brecha es la razón por la que el OCR, solo, no sirve para automatizar documentos.

## OCR responde "qué dice", no "qué significa"

OCR (Optical Character Recognition) hace una sola cosa, y la hace bien: convierte píxeles de tinta en texto. Es un traductor de imagen a string. El problema es que un documento no es una bolsa de palabras: es un objeto con campos, relaciones y semántica.

En la factura hay quince números. ¿Cuál es el total, cuál el subtotal, cuál el IVA, cuál el número de comprobante, cuál el CUIT? Para un humano es obvio por dónde está cada cosa. Para un OCR son todos "texto" con la misma jerarquía: una lista plana donde `1.250,00` y `21%` valen lo mismo.

> El OCR resuelve la **transcripción**. La automatización necesita la **comprensión**: qué campo es cada cosa y cómo se relacionan entre sí.

## Dónde se rompe en la práctica

El salto de transcribir a entender es justo donde los pipelines ingenuos fallan:

- **Sinónimos y variantes**: una factura dice "Total", otra "Importe a pagar", otra "Monto final". Mismo concepto, tres strings distintos.
- **Tablas**: el OCR lee las celdas en orden de lectura, pero pierde a qué fila y columna pertenece cada valor. Un precio queda huérfano de su producto.
- **Multi-documento**: un PDF de 30 páginas puede tener factura + remito + nota de crédito. El OCR los aplasta en un único río de texto.
- **Ruido**: sellos, firmas, watermarks y manchas se transcriben como caracteres basura mezclados con los datos buenos.

Por eso un sistema serio de [procesamiento inteligente de documentos](/hiperautomatizacion/idp/idp-pipeline) usa el OCR como **primera etapa**, no como solución. Encima va una capa que clasifica el tipo de documento, identifica entidades y mapea cada valor a un campo del esquema que te interesa.

## El layout es información que el OCR tira

Hay algo que el texto plano destruye: en un documento, **la posición significa**. El número arriba a la derecha suele ser el total; el bloque de la izquierda, los datos del emisor; la grilla del medio, el detalle. Esa estructura espacial es una señal poderosísima que se pierde apenas convertís todo a una línea de texto. De eso hablo en detalle en [por qué el layout importa](/hiperautomatizacion/idp/layout-importa).

```python
# Lo que devuelve un OCR puro: texto plano, sin campos
"Factura A TOTAL 1.250,00 IVA 21% CUIT 30-71234567-8"

# Lo que necesita un proceso: estructura
{"tipo": "factura_A", "total": 1250.00, "iva_pct": 21, "cuit_emisor": "30-71234567-8"}
```

## OCR es el ladrillo, no la casa

El OCR es necesario pero nunca suficiente. Es el equivalente a saber leer en voz alta un idioma que no entendés. Para automatizar de verdad —cargar esa factura al ERP sin que nadie la mire— necesitás una capa de comprensión arriba, y casi siempre [un humano que valide los casos dudosos](/hiperautomatizacion/idp/human-in-the-loop). Confundir transcripción con comprensión es la trampa más común: la demo anda bárbaro con la factura modelo, y en producción se cae con la primera que viene torcida.
