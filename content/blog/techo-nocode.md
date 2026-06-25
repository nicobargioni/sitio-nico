---
title: "El techo del no-code: hasta dónde llegan n8n y Make"
date: "2026-04-07"
excerpt: "El no-code resuelve el 80% en una tarde. El otro 20% es donde te das cuenta de que había un techo todo el tiempo."
tags: ["nocode", "automatizacion", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "n8n-make"
---

Hay un momento que se repite con casi todos los que arrancan con automatización visual. Armás un flujo en n8n o en Make en una tarde, conecta tres servicios, funciona, y pensás: "¿esto era todo? Programar es un curro". Y después llega el caso número 47, el que no entra en ningún nodo prearmado, y ahí aparece el techo.

No es un techo malo. Es importante saber dónde está antes de chocarlo.

## Qué resuelve increíblemente bien

El no-code brilla cuando el trabajo es **mover datos entre cajas que ya tienen API**. Un formulario que cae en una planilla, una notificación de Slack cuando se crea una factura, un lead que se sincroniza al CRM. Cada nodo encapsula la autenticación, el formato del request y el parseo de la respuesta. Vos ponés la lógica de negocio arriba, no la plomería.

Eso es muchísimo más de lo que parece. El 70-80% de las automatizaciones reales de una PyME son exactamente esto: pegamento entre SaaS. Y un flujo visual es además **autodocumentado** — alguien que no escribió el flujo lo entiende mirándolo, cosa que no pasa con 200 líneas de Python.

## Dónde aparece el techo

El límite no es "tareas difíciles", es un tipo concreto de problema:

- **Lógica condicional anidada.** Tres `if` adentro de un loop adentro de otro `if` se vuelve un plato de fideos imposible de leer en un canvas visual.
- **Transformaciones de datos complejas.** Reshapear un JSON anidado, deduplicar con reglas raras, agrupar y agregar. Terminás escribiendo JavaScript dentro de un nodo "Code" — y ahí ya no estás haciendo no-code.
- **Estado y coordinación.** Esperar a que terminen cinco procesos en paralelo y recién ahí seguir, o mantener un contador entre ejecuciones, pelea contra el modelo del canvas.
- **Volumen y costo.** Make cobra por operación; un flujo que itera sobre 50.000 ítems te funde la cuota. Acá conviene pensar en otra arquitectura, como mover la carga pesada a un proceso [event-driven en serverless](/cloud/serverless/event-driven).

La señal clara de que tocaste el techo: cuando el 60% de tu "flujo visual" son nodos de código. En ese punto el canvas dejó de ayudarte y se volvió un IDE peor.

## El techo se corre, no se rompe

Lo interesante es que el techo no es fijo. n8n te deja meter nodos de código y hasta [llamar APIs directamente con webhooks](/hiperautomatizacion/n8n-make/webhooks-pegamento), lo que extiende bastante el límite. Make es más cerrado pero más pulido — el clásico tradeoff de [open source vs comodidad](/hiperautomatizacion/n8n-make/n8n-vs-make).

Y hay una decisión de diseño que la mayoría ignora hasta que es tarde: garantizar que el flujo sea [idempotente](/hiperautomatizacion/n8n-make/idempotencia), porque estas plataformas reintentan solas cuando algo falla. Un flujo no-code mal pensado manda el mismo mail tres veces sin que nadie lo note.

## El criterio práctico

Antes de armar el flujo, una sola pregunta: **¿esto es mover datos entre APIs, o es lógica de negocio densa?** Lo primero, no-code todo el día. Lo segundo, escribí código de verdad y desplegalo en serio — no pelees diez horas contra un canvas para algo que en Python eran 30 líneas.

El no-code no es la versión barata de programar. Es una herramienta distinta, con un dominio donde gana por goleada y otro donde pierde feo. Saber cuál es cuál es la mitad del laburo.
