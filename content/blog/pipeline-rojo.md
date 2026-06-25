---
title: "El pipeline en rojo: por qué romper el build es sagrado"
date: "2026-02-21"
excerpt: "Dejar la rama principal en rojo frena a todo el equipo. Por eso, en buenos equipos, un build roto es la prioridad número uno."
tags: ["cicd", "devops", "curiosidades"]
category: "cloud"
subcategory: "cicd"
---

Hay una regla no escrita en los equipos que despliegan seguido: si rompés el build, lo arreglás vos, y lo arreglás ya. No es rigidez por capricho. Es que un pipeline en rojo no te frena solo a vos: frena a todos los que comparten esa rama.

## Qué significa "romper el build"

Cada vez que alguien hace push, un sistema de integración continua (CI) levanta el código, lo compila, corre los tests y revisa el estilo. Si todo pasa, queda en **verde**. Si algo falla, queda en **rojo**.

El detalle clave es que ese estado es compartido. La rama `main` es la fuente de verdad: lo que está ahí debería poder desplegarse en cualquier momento. Cuando vos rompés `main`, el próximo que quiera mergear su trabajo se encuentra con un rojo que no es suyo y no sabe si lo causó él. La duda se propaga más rápido que el bug.

> Un build roto en la rama principal no es un problema técnico: es un bloqueo organizacional.

## Por qué se vuelve sagrado

En equipos chicos esto parece exagerado. En equipos de verdad, con varias personas integrando a diario, romper `main` tiene un costo concreto:

- **Nadie puede confiar en la rama.** Si `main` está en rojo, no sabés si tu propio cambio anda o no.
- **Se acumulan errores.** Sobre un build ya roto se siguen mergeando cosas, y separar qué rompió qué se vuelve arqueología.
- **Frena los despliegues.** Si la regla es "solo se despliega lo verde", un rojo congela las salidas a producción de todo el equipo.

Por eso la cultura sana invierte la prioridad: arreglar (o revertir) el rojo le gana a cualquier feature nueva. Toyota tenía el *andon cord*, una cuerda que cualquier operario podía tirar para frenar la línea de montaje si veía un defecto. Frenar todo era preferible a fabricar autos con la falla adentro. El pipeline verde es el mismo principio aplicado al software.

## Cómo se protege en la práctica

No alcanza con pedir buena voluntad. Los equipos lo hacen cumplir con [tests que actúan como portero](/cloud/cicd/tests-portero): si no pasan, el merge ni siquiera se permite. Sumá *branch protection* (no se puede pushear directo a `main`, todo entra por pull request con CI en verde) y la regla se vuelve estructural, no moral.

```yaml
# Regla típica de protección de rama
required_status_checks:
  strict: true       # la rama debe estar al día con main
  contexts: [tests, lint, build]
# sin verde, el botón de merge queda deshabilitado
```

Y cuando algo igual se cuela y rompe producción, la respuesta no es heroica: es [revertir el deploy en un click](/cloud/cicd/rollback) y volver a verde antes de investigar. Primero frenás la hemorragia; después buscás la causa.

## El verdadero motivo

Detrás de todo esto hay una idea simple: **el estado verde es un bien común**. Cada quien que lo respeta hace que el siguiente pueda confiar en que la base sobre la que construye está sana. Es lo mismo que hace que [Docker mate el "funciona en mi máquina"](/cloud/docker/funciona-en-mi-maquina): reducir la incertidumbre sobre qué estado tiene el sistema.

Romper el build de vez en cuando es inevitable; todos lo hacemos. Lo que distingue a un buen equipo no es no romperlo nunca, sino tratar el rojo como una emergencia honesta y dejarlo en verde lo antes posible.
