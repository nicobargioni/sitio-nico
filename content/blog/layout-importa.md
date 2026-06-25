---
title: "El layout importa: leer una factura no es leer texto"
date: "2026-03-22"
excerpt: "En un documento, dónde está cada cosa dice tanto como qué dice. La posición no es decoración: es dato."
tags: ["documentos", "idp", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "idp"
---

Tapá los rótulos de una factura y dejá solo los números y su posición. Apuesto a que igual adivinás cuál es el total: el número grande, abajo a la derecha. No leíste la palabra "total" — leíste el **layout**. Esa intuición, que para vos es automática, es justo lo que un sistema de documentos tiene que aprender a recuperar. Porque el lugar donde está cada dato es, literalmente, información.

## La página es una grilla con significado

Un documento de negocio no es prosa: es un formulario disfrazado. Los datos del emisor van arriba a la izquierda. El comprobante y la fecha, arriba a la derecha. El detalle, en una tabla al medio. Los totales, abajo. Esa convención espacial está tan internalizada que la usamos sin pensar.

Cuando un OCR convierte la página a texto plano, esa grilla se aplasta en una sola línea y la señal desaparece. Por eso [el OCR solo no alcanza](/hiperautomatizacion/idp/ocr-no-alcanza): tira a la basura la mitad del mensaje. Los modelos modernos de documentos hacen lo contrario — tratan la posición como una feature de primera clase.

> A cada palabra no le guardan solo el texto, sino también su **bounding box**: las coordenadas (x, y, ancho, alto) de dónde aparece en la página.

## Modelos que leen en 2D

La familia de modelos tipo LayoutLM cambió las reglas justamente por esto: combinan tres señales para cada token.

- **El texto** en sí (lo que diría un OCR).
- **La posición 2D**: las coordenadas del recuadro que rodea la palabra.
- **La imagen**: el aspecto visual del recorte — negrita, tamaño, si está dentro de una celda.

```python
# Cada token lleva texto + posición, no solo texto
{"texto": "1.250,00", "bbox": [410, 880, 90, 22], "pagina": 1}
# x alto + y bajo en la página = esquina inferior derecha = probablemente el total
```

Con eso el modelo aprende patrones espaciales: "lo que está alineado a la derecha, debajo de una línea horizontal, en negrita, suele ser un total". Es parecido a [cómo una red de visión pasa de bordes a conceptos](/ia-agentes/vision/como-ve-una-cnn) — solo que acá los conceptos son campos de un formulario.

## Tablas: el caso donde el layout es todo

Las tablas son el ejemplo más brutal. Un precio sin su fila y su columna no significa nada. ¿`1.500` es el precio unitario del producto 3 o el subtotal del producto 7? La respuesta vive enteramente en la geometría: qué fila comparte, bajo qué encabezado cae. Reconstruir esa estructura —fusionar celdas, alinear columnas torcidas, manejar filas que se parten entre páginas— es una de las partes más difíciles del [pipeline de IDP](/hiperautomatizacion/idp/idp-pipeline), y la que más se rompe cuando el documento no es perfecto.

## El criterio: tratá la posición como dato, no como estilo

La lección práctica: cuando diseñes una extracción de documentos, no preguntes solo "¿qué texto hay?". Preguntá "¿dónde está y qué tiene al lado?". Un layout consistente es tu mejor amigo —por eso los formularios estructurados se automatizan casi perfecto— y un layout caótico, tu peor enemigo. Si el proveedor te manda la factura en un formato distinto cada mes, ninguna cantidad de OCR te va a salvar: vas a necesitar un modelo que entienda la geometría y, casi seguro, [una persona que revise los casos raros](/hiperautomatizacion/idp/human-in-the-loop).
