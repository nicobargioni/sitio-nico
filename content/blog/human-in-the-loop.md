---
title: "Human-in-the-loop: cuándo confiar en la extracción automática"
date: "2026-03-19"
excerpt: "La pregunta no es si confiar en la IA, sino cuándo. Un número entre 0 y 1 decide qué pasa solo y qué mira un humano."
tags: ["documentos", "idp", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "idp"
---

El sueño de automatizar documentos es que ninguna persona vuelva a tocar una factura. La realidad madura es otra: la mejor arquitectura no saca al humano del medio, lo pone en el lugar correcto. Eso es **human-in-the-loop** — y la decisión de cuándo intervenir no se toma a ojo, se toma con un número: la confianza del modelo.

## La confianza es un número, no una sensación

Cuando un modelo de [extracción de documentos](/hiperautomatizacion/idp/idp-pipeline) lee "Total: 1.250,00", no solo devuelve el valor: devuelve también una **confianza**, un score típicamente entre 0 y 1 que estima qué tan seguro está. `0.99` para un campo nítido y bien ubicado; `0.62` para uno borroso, ambiguo o en un layout que nunca vio.

Ese número es el que te deja diseñar el flujo. La idea central:

> No todos los documentos merecen revisión humana. Solo los que el modelo no está seguro de haber entendido.

## Umbrales: la perilla que define el sistema

Definís un umbral. Por encima, el dato pasa solo. Por debajo, va a una cola de revisión.

```python
UMBRAL = 0.90

def rutear(campo, valor, confianza):
    if confianza >= UMBRAL:
        return ("auto", valor)        # carga directa al ERP
    return ("revisar", valor)         # cola humana
```

La gracia está en dónde ponés el umbral, y eso depende del **costo del error**:

- **Costo alto** (un CUIT mal carga la factura a otra empresa): umbral alto, 0.95+. Mandás más cosas a revisión, pero dormís tranquilo.
- **Costo bajo** (clasificar un ticket por tema): umbral más laxo, 0.75. Aceptás algún error a cambio de automatizar más.

Subir el umbral reduce errores automáticos pero aumenta el trabajo humano. Bajarlo, al revés. No hay un valor "correcto" universal: hay un equilibrio según lo que cuesta equivocarse.

## El humano también entrena al sistema

Acá está la parte elegante. Cada vez que una persona corrige un campo dudoso, esa corrección es una etiqueta nueva. Si la guardás, alimentás el reentrenamiento del modelo: los casos difíciles de hoy se vuelven los fáciles de mañana. El loop no es solo un colador de errores — es un **mecanismo de mejora continua**. Con el tiempo, el porcentaje que cae bajo el umbral debería bajar.

Esto es lo que distingue un sistema de IDP serio de [un bot de RPA que copia y pega](/hiperautomatizacion/rpa/rpa-no-es-ia): el bot repite ciego y rompe cuando algo cambia; el sistema con humano en el loop aprende de cada excepción.

## El criterio: automatizá la certeza, escalá la duda

La regla que uso: **automatizá lo que el modelo entiende con confianza, y enrutá a un humano lo que duda.** No busques el 100% automático — buscá el 90% fácil resuelto solo y el 10% difícil bien atendido. Eso es lo que separa una demo que anda con la factura modelo de un sistema que aguanta el mundo real, donde los documentos vienen [llenos de layouts raros](/hiperautomatizacion/idp/layout-importa) y casos que nadie previó. El humano no es el fracaso de la automatización: es su red de seguridad y su maestro.
