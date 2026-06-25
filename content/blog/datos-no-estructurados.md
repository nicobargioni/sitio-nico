---
title: "El 80% de los datos de una empresa que nadie usa"
date: "2026-03-20"
excerpt: "Las tablas que mirás son la punta del iceberg. El grueso del conocimiento está en mails, PDFs y contratos sin tocar."
tags: ["documentos", "idp", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "idp"
---

Hay una cifra que se repite en la industria y que, aun siendo aproximada, pinta bien el problema: cerca del **80% de los datos de una empresa no está estructurado**. No vive en tablas prolijas con filas y columnas. Vive en mails, PDFs, contratos firmados, actas de reunión, tickets de soporte, fotos de comprobantes, audios de llamadas. Es una mina enorme — y casi nadie la explota, porque sacar valor de ahí es incómodo.

## Estructurado vs no estructurado

La diferencia es simple de ver:

- **Estructurado**: una tabla de ventas. Cada columna tiene un tipo, cada fila un registro. Hacés un `SELECT` y listo.
- **No estructurado**: el contrato en PDF donde dice, en el párrafo 14, que ese cliente tiene una cláusula de renovación automática a 90 días. Esa info es oro, pero no hay query que la saque sola.

La paradoja es que las decisiones importantes suelen depender de lo no estructurado. Los términos reales están en el contrato, no en el CRM. El motivo de la baja está en el mail, no en el campo "estado: cancelado". Tirás la parte jugosa porque es la difícil de procesar.

> No es que falten datos. Es que el 80% está en un formato que las herramientas tradicionales no saben leer.

## Por qué quedó sin usar tanto tiempo

Durante décadas, convertir ese 80% en algo consultable requería que una persona lo leyera y lo cargara a mano. Caro, lento, propenso a errores. Las empresas hicieron lo razonable: estructuraron lo barato (formularios, transacciones) e ignoraron lo caro (el texto libre).

Dos cosas cambiaron el cálculo. Primero, el [pipeline de IDP](/hiperautomatizacion/idp/idp-pipeline) volvió viable extraer campos estructurados de documentos a escala. Segundo, los embeddings y el [RAG](/ia-agentes/rag-embeddings/rag-apuntes-examen) permitieron *preguntarle* a un corpus de documentos sin tener que estructurarlo del todo: buscás por significado, no por columna.

## Dos caminos para explotar la mina

No todo lo no estructurado se trata igual. Conviene elegir según la pregunta:

```text
¿Querés campos exactos para un sistema?   → IDP: extraé total, fecha, CUIT a una tabla.
¿Querés responder preguntas sobre el texto? → RAG: indexá y consultá por significado.
```

Una factura va por IDP: necesitás el número exacto en el ERP. Un repositorio de 5.000 contratos para preguntar "¿cuáles vencen este trimestre?" va por RAG, o por una combinación de ambos. Confundir los dos caminos es un error caro: meter texto libre largo en un esquema rígido frustra, y querer extraer un total con búsqueda semántica es inexacto.

## El criterio: empezá por la pregunta, no por la tecnología

Antes de comprar nada, preguntate qué decisión querés mejorar y qué dato no estructurado la traba hoy. La mina del 80% es enorme, pero no la explotás toda de una — la explotás por veta, ahí donde una pregunta concreta justifica el esfuerzo. Y ojo: estructurar por estructurar genera el mismo problema que [el "happy path" que esconde el 80% del trabajo real](/hiperautomatizacion/bpmn/happy-path-mentira) en los procesos. El valor no está en digitalizar todo, sino en convertir en consultable justo lo que mueve la aguja.
