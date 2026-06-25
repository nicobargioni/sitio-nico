---
title: "Cuando un agente entra en bucle: los riesgos de la autonomía"
date: "2026-04-29"
excerpt: "Le diste un objetivo y herramientas, y de golpe el agente lleva 40 vueltas, gastó USD 12 y sigue sin terminar. Por qué pasa y cómo ponerle freno."
tags: [agentes, llm, curiosidades]
category: "ia-agentes"
subcategory: "agentes"
---

La primera vez que armás un agente y lo dejás correr solo, hay un momento de magia: razona, usa una herramienta, vuelve a razonar, avanza. La segunda vez, a veces, hay un momento de pánico: lleva cuarenta vueltas, gastó doce dólares en tokens y todavía no terminó. Bienvenido al lado oscuro de la autonomía.

## Por qué un agente se queda pegado

Un agente trabaja en un loop: observa, decide, actúa, observa el resultado y vuelve a decidir. Es el patrón [ReAct: razonar y actuar en bucle](/ia-agentes/agentes/react-razonar-actuar). Ese loop es justo lo que le da poder —y también lo que lo puede atrapar. Los bucles aparecen por motivos muy concretos:

- **Objetivo mal definido.** Si el agente no tiene un criterio claro de "listo", nunca sabe cuándo parar. Sigue mejorando algo que ya estaba bien.
- **Herramienta que falla en silencio.** Llama a una API, recibe un error, no lo interpreta como error y vuelve a llamar. Otra vez. Y otra. Cada [function call](/ia-agentes/agentes/function-calling) que no devuelve una señal de fallo entendible es una invitación a repetir.
- **Estado que no cambia.** El agente toma una decisión, el mundo no se mueve como esperaba, y vuelve a tomar la misma decisión. Dos pasos que se reflejan eternamente.
- **Contexto que crece.** Cada vuelta agrega tokens al historial. Si nada lo corta, el costo sube de forma lineal mientras el progreso se queda en cero.

## El detalle incómodo: el modelo no sabe que está en bucle

Esto es lo contraintuitivo. El LLM en cada paso ve el historial y elige lo que parece mejor *en ese instante*. No tiene una vista de pájaro que le diga "che, esto ya lo intentaste tres veces". A diferencia de un humano que se frustra y cambia de estrategia, el modelo puede repetir con total convicción. La autonomía no trae auto-conciencia del fracaso.

Esto se parece bastante al [reward hacking del aprendizaje por refuerzo](/data-ml/reinforcement-learning/reward-hacking): el sistema optimiza la señal que le diste, no la intención que tenías. Si tu señal de "terminado" es ambigua, el agente va a encontrar formas raras de no terminar nunca.

## Cómo ponerle límites

No hay arquitectura prolija sin frenos. Los que nunca me arrepentí de poner:

- **Tope de iteraciones.** Un `max_steps` duro. Si llega, corta y avisa. Crudo pero infalible.
- **Presupuesto de tokens o de plata.** Sumá el costo en cada vuelta y abortá al pasar el umbral. El bolsillo es el mejor límite.
- **Detector de repetición.** Si las últimas N acciones son idénticas, asumí que está pegado y rompé el loop.
- **Criterio de éxito explícito.** Definí "listo" con una condición chequeable, no con una vibra. "El JSON valida contra el schema", no "la respuesta está buena".

```python
def correr(agente, max_pasos=15, tope_usd=1.0):
    gastado = 0.0
    for paso in range(max_pasos):
        accion, costo = agente.siguiente_paso()
        gastado += costo
        if agente.listo() or gastado > tope_usd:
            return agente.resultado()
    raise RuntimeError("Tope de pasos alcanzado sin terminar")
```

## El cierre

Darle autonomía a un sistema es darle la posibilidad de equivocarse de formas que vos no anticipaste. El loop infinito no es un bug exótico: es el comportamiento por defecto de un agente sin límites. El trabajo del ingeniero no es solo definir el objetivo, es definir las condiciones de borde —cuándo parar, cuánto gastar, qué cuenta como éxito. Un agente sin frenos no es más inteligente, es más caro.
