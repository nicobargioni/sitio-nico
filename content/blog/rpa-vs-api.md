---
title: "RPA vs API: automatizar por la ventana o por la puerta"
date: "2026-04-10"
excerpt: "RPA y una API pueden resolver lo mismo, pero uno entra por la ventana y el otro por la puerta. Cuándo el bot es un parche y cuándo la integración real."
tags: ["rpa", "automatizacion", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "rpa"
---

> Cuando un bot de RPA "lee" tu sistema de facturación, está haciendo lo mismo que un ladrón que entra por la ventana en vez de tocar el timbre. Llega al mismo lugar, pero por un camino que nunca fue pensado para él.

La metáfora suena dura, pero captura algo exacto. Una API es la **puerta de entrada oficial** de un sistema: un contrato pensado para que otros programas le hablen. RPA es entrar **por la ventana de la interfaz humana**, simulando que sos una persona usando el mouse y el teclado. Los dos automatizan; lo que cambia es la solidez del camino.

## La diferencia, en concreto

Imaginá que querés traer el saldo de un cliente desde un sistema viejo.

**Con API:**

```http
GET /api/v1/clientes/4821/saldo
→ { "saldo": 15230.50, "moneda": "ARS" }
```

Un dato limpio, estructurado, con un contrato que el proveedor se comprometió a mantener. Rápido, confiable, versionado.

**Con RPA:** el bot abre la aplicación, hace login, navega tres menús, espera que cargue la grilla, ubica la fila del cliente 4821 y "lee" el número que aparece en pantalla. Llega al mismo `15230.50`, pero pasando por toda la frágil cadena de la interfaz —la misma que [se rompe con cualquier rediseño](/hiperautomatizacion/rpa/rpa-deuda-tecnica).

## Entonces, ¿por qué existe RPA?

Si la API es tan superior, ¿por qué la industria de RPA mueve miles de millones? Por una razón muy terrenal: **muchísimos sistemas no tienen API**, o la tienen capada, o exponerla cuesta un proyecto de meses que nadie quiere financiar.

RPA brilla justo ahí:

- **Sistemas legacy** —un AS/400, un ERP de los 90— sin ninguna interfaz programática.
- **SaaS que no expone** el endpoint que necesitás, o lo cobra como plan enterprise.
- **Soluciones tácticas y urgentes:** necesitás conectar dos sistemas *para ayer* y no podés esperar a que IT priorice la integración.

En esos casos, RPA no es un parche feo: es la única forma realista de cerrar el hueco. Es el mismo rol de "pegamento" que cumplen los [webhooks](/hiperautomatizacion/n8n-make/webhooks-pegamento) o las plataformas no-code, solo que operando sobre la interfaz visual en vez de sobre endpoints.

## El criterio para elegir

La regla mental que uso:

| Situación | Elegí |
|---|---|
| El sistema tiene API estable y documentada | **API**, siempre |
| No hay API, pero la tarea es de alto volumen y crítica | **RPA ahora, presupuestando reemplazo por API** |
| No hay API y la tarea es puntual o de bajo volumen | **RPA** sin culpa |
| El proveedor va a publicar API pronto | Esperá, o RPA con fecha de vencimiento |

La clave es no enamorarse del bot. RPA es **deuda táctica deliberada**: lo tomás sabiendo que entraste por la ventana y que algún día querés mudar esa integración a la puerta. El error caro es tratar el parche como solución permanente y construir veinte procesos críticos encima de él. Lo mismo vale para [el techo del no-code](/hiperautomatizacion/n8n-make/techo-nocode): herramientas excelentes hasta que el problema crece y necesitás la integración real.

Una buena pregunta de cierre para cualquier proyecto de RPA: *si este sistema sacara una API mañana, ¿cuánto tardaría en tirar el bot a la basura?* Si la respuesta es "muchísimo", quizás construiste demasiado sobre la ventana.
