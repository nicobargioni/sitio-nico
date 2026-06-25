---
title: "Tests como portero: lo que no pasa, no se despliega"
date: "2026-02-18"
excerpt: "En un buen pipeline los tests no son una sugerencia: son un portero que decide qué código llega a producción y qué se queda afuera."
tags: ["cicd", "devops", "curiosidades"]
category: "cloud"
subcategory: "cicd"
---

En muchos proyectos los tests son algo que "se corre cuando hay tiempo". En un pipeline serio cambian de rol por completo: dejan de ser una sugerencia para convertirse en un **portero**. Lo que pasa la prueba, entra a producción. Lo que no, se queda afuera. Sin discusión, sin excepciones, sin que importe quién hizo el cambio.

## De checklist opcional a quality gate

Un *quality gate* es una compuerta automática en el medio del camino entre tu commit y producción. El código no avanza al siguiente paso hasta que cumple una serie de condiciones objetivas:

- Los **tests unitarios** pasan (cada función hace lo que dice).
- Los **tests de integración** pasan (las piezas se entienden entre sí).
- El **linter** no encuentra problemas de estilo o errores tontos.
- La **cobertura** no baja de un umbral.
- A veces, que no haya **vulnerabilidades conocidas** en las dependencias.

Lo central es que el gate es ciego al contexto. No le importa si es viernes a las 18 ni si el cambio "es chiquito". Si una condición falla, el [merge ni siquiera se habilita](/cloud/cicd/pipeline-rojo). Esa rigidez es justamente lo que lo hace útil: saca la decisión del terreno del juicio humano apurado y la pone en reglas explícitas.

> Un buen gate no te pregunta si confiás en tu cambio. Te lo demuestra, o no te deja pasar.

## Por qué un portero automático y no una persona

Podrías poner a alguien a revisar cada deploy. Pero las personas se cansan, tienen un mal día, ceden ante la presión de "necesitamos esto ya". El portero automático no:

- Es **consistente**: aplica la misma vara siempre.
- Es **rápido**: corre en minutos, no espera a que alguien tenga un rato.
- Es **trazable**: queda registrado qué pasó y qué falló.

```yaml
# El gate vive en el pipeline; sin verde, no hay deploy
jobs:
  test:
    steps:
      - run: pytest --cov=app --cov-fail-under=80
      - run: ruff check .
  deploy:
    needs: test          # el deploy depende del gate
    if: success()         # solo corre si test pasó
```

Esa palabra `needs` es todo el secreto: el despliegue **depende** del test. No hay forma de saltearlo sin reescribir el pipeline a propósito, lo cual deja rastro.

## El portero no es infalible (y está bien)

Un gate es tan bueno como los tests que lo componen. Si tus pruebas no cubren un caso, ese caso pasa igual. Por eso el portero no reemplaza pensar qué probar; lo que hace es garantizar que lo que *decidiste* probar se verifique siempre, sin que se te escape por descuido.

Y cuando algo igual se cuela —porque va a pasar—, la red de atrás es poder [revertir el deploy en un click](/cloud/cicd/rollback). El portero reduce la cantidad de errores que llegan a producción; el rollback limita el daño de los que se cuelan. Las dos capas juntas son lo que te deja desplegar tranquilo.

## La idea de fondo

El portero automático encarna una filosofía: **la calidad no se negocia bajo presión, se codifica antes**. Definís una vez qué significa "listo para producción", lo escribís en el pipeline, y a partir de ahí la regla se aplica sola. Es la misma lógica que hace que [Docker garantice que lo que probaste es lo que corre](/cloud/docker/funciona-en-mi-maquina): sacar la incertidumbre del momento crítico y resolverla de antemano. Lo que no pasa, no se despliega. Y eso, lejos de frenarte, es lo que te permite ir rápido sin miedo.
