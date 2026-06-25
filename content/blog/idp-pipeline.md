---
title: "De PDF a dato estructurado: el pipeline de IDP"
date: "2026-03-21"
excerpt: "Un PDF entra, una fila de base de datos sale. En el medio hay cinco etapas, y cada una tiene su forma de fallar."
tags: ["documentos", "idp", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "idp"
---

Cuando alguien dice "automaticé la carga de facturas", lo que casi siempre construyó es un pipeline de IDP — Intelligent Document Processing. Suena a caja negra mágica: entra un PDF arrugado y sale, prolijo, un registro listo para el ERP. Pero adentro hay una cadena de etapas bien definidas, donde cada una resuelve un problema distinto y tiene su manera particular de romperse. Vale la pena abrir la caja.

## Las cinco etapas

Un pipeline de IDP serio se parece bastante a esto, en orden:

1. **Ingesta y normalización**: el documento llega como PDF nativo, PDF escaneado, foto de WhatsApp o email con adjunto. Hay que enderezarlo (deskew), mejorar contraste, separar páginas y detectar la orientación. Basura que entra, basura que sale.
2. **OCR / extracción de texto**: convertir la imagen en texto y, clave, guardar la **posición** de cada palabra. Como expliqué en [por qué el OCR no alcanza](/hiperautomatizacion/idp/ocr-no-alcanza), esto es solo el insumo, no el resultado.
3. **Clasificación**: ¿esto es una factura, un remito, un contrato, una nota de crédito? Sin saber el tipo, no sabés qué campos buscar. Es una tarea de clasificación clásica, parecida a [distinguir clasificar de detectar y segmentar en visión](/ia-agentes/vision/clasificar-detectar-segmentar).
4. **Extracción de entidades**: acá se mapea cada valor a un campo del esquema — total, CUIT, fecha, ítems. Es donde el [layout pesa más que el texto](/hiperautomatizacion/idp/layout-importa).
5. **Validación y entrega**: chequeos de negocio (¿el subtotal + IVA da el total?), umbrales de confianza y entrega al sistema destino.

## Cada etapa tiene su talón de Aquiles

```text
PDF → [ingesta] → [OCR] → [clasificación] → [extracción] → [validación] → registro
        ↑           ↑          ↑                 ↑              ↑
     escaneo      texto     tipo mal         campo mal     no cierra
     torcido      sucio     detectado        mapeado       el cálculo
```

El error se **propaga**: si la ingesta endereza mal una página, el OCR lee peor, la clasificación duda y la extracción inventa. Por eso conviene medir la confianza en cada paso, no solo al final. Un pipeline que solo reporta "listo / falló" es ciego justo donde más necesitás ver.

## El humano no es opcional, es una etapa más

La etapa de validación casi nunca es 100% automática, y está bien que así sea. Lo sano es enrutar por **confianza**: si el modelo está seguro, pasa directo; si duda, va a una cola de revisión humana. Eso es [human-in-the-loop](/hiperautomatizacion/idp/human-in-the-loop), y es lo que separa una demo de un sistema que aguanta producción.

> El objetivo no es automatizar el 100% de los documentos. Es automatizar el 90% fácil con alta confianza y darle al humano solo el 10% difícil.

## Pipeline antes que modelo

La tentación es pensar que IDP es "un buen modelo de IA". No: es una **arquitectura de etapas** donde el modelo es una pieza. La diferencia entre un proyecto que funciona y uno que no suele estar en las partes aburridas — la normalización de la ingesta, los chequeos de validación, el ruteo por confianza — más que en el modelo estrella. Si querés ver por qué este enfoque por etapas escala mejor que un bot que copia y pega, mirá [por qué RPA no es IA](/hiperautomatizacion/rpa/rpa-no-es-ia). El PDF a dato estructurado no es un salto: es una escalera, y cada escalón cuenta.
