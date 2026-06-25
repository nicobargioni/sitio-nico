---
title: "RPA no es IA: el robot que copia y pega (y por qué importa)"
date: "2026-04-12"
excerpt: "El 'robot' de RPA no entiende nada: solo repite clicks. La diferencia con la IA cambia qué podés automatizar y qué no."
tags: ["rpa", "automatizacion", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "rpa"
---

> El "robot" de un proyecto de RPA no entiende absolutamente nada de lo que hace. Abre el sistema, hace click en el botón de la esquina superior derecha, copia el número de la celda 3 y lo pega en otra ventana. Punto. Si mañana movés ese botón un centímetro, el robot queda paralizado.

La palabra "robot" en RPA (Robotic Process Automation) genera una confusión enorme. Mucha gente asume que detrás de UiPath, Automation Anywhere o Power Automate hay algún tipo de inteligencia que "aprende" la tarea. No la hay. Hay una grabación de pasos, ejecutada con una fidelidad obsesiva y una flexibilidad nula.

## Qué hace realmente un bot de RPA

Un bot de RPA imita a un humano usando la interfaz gráfica de una aplicación: mueve el mouse, escribe en campos, lee píxeles o elementos del DOM, clickea. Es automatización **determinística basada en reglas**. Le decís: "si aparece esta pantalla, hacé esto". No hay ambigüedad permitida ni interpretación.

Esto tiene una consecuencia hermosa y otra terrible:

- **Lo bello:** es 100% predecible y auditable. El mismo input produce siempre el mismo output. No alucina, no improvisa, no "interpreta mal".
- **Lo terrible:** no tolera la mínima desviación. Un campo nuevo, un pop-up inesperado, un texto que cambió de "Aceptar" a "Confirmar" y el bot se detiene o, peor, hace algo incorrecto con total confianza.

La IA, en cambio, es **probabilística**. Un modelo de lenguaje no ejecuta una regla fija: estima la respuesta más probable dado el contexto. Por eso tolera variación —puede leer una factura con un layout que nunca vio— pero por eso mismo puede equivocarse de formas raras. Si querés entender ese costado, escribí sobre [por qué los LLM alucinan con tanta seguridad](/ia-agentes/llms-prompting/por-que-alucinan): es exactamente el reverso de la rigidez del bot.

## La regla práctica: ¿la tarea tiene reglas claras?

La pregunta que filtra todo es: **¿esta tarea se puede describir con reglas explícitas, sin zonas grises?**

| Tarea | Herramienta natural |
|---|---|
| Copiar un dato de un sistema legacy a otro | RPA |
| Decidir si un reclamo es "urgente" por su redacción | IA |
| Renombrar 5.000 archivos según un patrón | RPA |
| Clasificar el sentimiento de un comentario | IA |

Cuando una tarea mezcla ambas cosas —pasos rígidos *más* una decisión que requiere criterio— ahí aparece lo interesante. No es RPA *o* IA: es RPA que llama a un modelo en el paso que necesita criterio. Ese matrimonio es el corazón de [la hiperautomatización](/hiperautomatizacion/rpa/rpa-a-hiperautomatizacion), y también lo que separa una demo vistosa de algo que [suma valor de verdad](/ia-agentes/llms-prompting/cuando-la-ia-suma).

## Por qué importa la distinción

Confundir RPA con IA lleva a dos errores caros:

1. **Esperar que el bot "se adapte" solo.** No lo hace. Cada excepción que no programaste es una parada en seco. De ahí nace [la deuda técnica oculta de los bots](/hiperautomatizacion/rpa/rpa-deuda-tecnica).
2. **Meter IA donde alcanzaba una regla.** Si la tarea es determinística, ponerle un LLM es agregar costo, latencia y una fuente de error donde antes había certeza.

RPA es un mazo fenomenal para clavar el clavo de las tareas repetitivas y reglamentadas. Pero un mazo no piensa. Antes de arrancar un proyecto, separá con frialdad qué partes del proceso son reglas puras y cuáles necesitan criterio. A las primeras, automatización clásica. A las segundas, recién ahí, modelos. Y casi siempre vas a descubrir que lo que más rinde no es elegir una, sino orquestar las dos.
