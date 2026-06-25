---
title: "Cuándo la IA suma de verdad"
date: "2026-06-23"
excerpt: "Un criterio simple para decidir cuándo un modelo o un LLM aporta valor real y cuándo es solo una demo."
tags: ["ia", "machine-learning"]
category: "ia-agentes"
subcategory: "llms-prompting"
---

Hay mucho ruido alrededor de la IA. Demos espectaculares que no sobreviven al contacto con un caso real, herramientas que prometen reemplazarte, métricas infladas. Este es el criterio que uso para decidir cuándo un modelo aporta valor de verdad.

## La pregunta que filtra todo

Antes de meter IA en un proceso, una sola pregunta:

> ¿Esto reduce un trabajo repetitivo y **verificable**, o me pide confiar a ciegas en algo que no puedo chequear?

La IA brilla en lo primero y falla en lo segundo.

## Tres usos donde rinde

- **Clasificar y etiquetar** grandes volúmenes (queries, tickets, documentos) donde antes hacía falta un humano leyendo uno por uno.
- **Generar borradores** que un experto edita — no que un experto reemplaza.
- **Resumir y extraer** estructura de texto desordenado.

```python
# Ejemplo: clasificar intención en lote con un LLM
from anthropic import Anthropic

client = Anthropic()
def clasificar(texto: str) -> str:
    msg = client.messages.create(
        model="claude-opus-4-8",
        max_tokens=10,
        messages=[{"role": "user",
                   "content": f"Intención de '{texto}': informacional, transaccional o navegacional. Una palabra."}],
    )
    return msg.content[0].text.strip()
```

## El criterio humano sigue siendo el superpoder

La IA acelera, pero la decisión de **qué** hacer y **por qué** sigue siendo tuya. El que delega el criterio —no el trabajo— es el que se mete en problemas.
