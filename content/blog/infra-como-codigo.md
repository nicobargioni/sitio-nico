---
title: "Infraestructura como código: tu nube entera en un repo"
date: "2026-02-17"
excerpt: "Servidores, redes y bases de datos descritos en archivos de texto versionados. Por qué la infra como código cambió cómo se opera la nube."
tags: ["cicd", "devops", "curiosidades"]
category: "cloud"
subcategory: "cicd"
---

Durante años, montar infraestructura era un acto manual y artesanal: alguien entraba a una consola, clickeaba para crear servidores, configuraba redes, abría puertos. El conocimiento de "cómo está armado todo esto" vivía en la cabeza de esa persona y en una maraña de pantallas. La infraestructura como código (IaC) rompió con eso de raíz: tu nube entera, descrita en archivos de texto que viven en un repositorio.

## Describir, no clickear

La idea central es declarativa. En lugar de dar pasos ("creá un servidor, después configuralo, después conectalo a la red"), **describís el estado final que querés** y una herramienta —Terraform es la más conocida— se encarga de hacerlo realidad.

```hcl
# Esto no "crea" un bucket: declara que debe existir uno así
resource "google_storage_bucket" "datos" {
  name     = "nomadic-datos-prod"
  location = "southamerica-east1"
  versioning { enabled = true }
}
```

Vos no decís *cómo* crearlo. Decís *qué* querés que exista. La herramienta compara ese deseo con lo que hay y aplica solo la diferencia. Si el bucket ya existe igual, no hace nada. Si falta, lo crea. Si cambiaste la región, te avisa qué va a modificar.

> La infra deja de ser algo que hacés y pasa a ser algo que describís.

## Qué cambia cuando tu infra es texto

Que la infraestructura sea código no es un detalle estético. Hereda de golpe todas las prácticas que el software maduró durante décadas:

- **Versionado.** Cada cambio de infra es un commit. Podés ver quién cambió qué, cuándo y por qué. Y volver atrás, igual que con el [rollback de un deploy](/cloud/cicd/rollback).
- **Revisión.** Un cambio de red o de permisos pasa por un pull request y lo revisa otra persona antes de aplicarse. Abrir un puerto al mundo deja de ser un click silencioso.
- **Reproducibilidad.** ¿Necesitás un entorno de staging idéntico a producción? Corrés el mismo código apuntando a otro proyecto. Es la misma promesa que [Docker hace para una aplicación](/cloud/docker/funciona-en-mi-maquina), pero a escala de toda la infraestructura.
- **Pipeline.** El `apply` puede correr en CI, detrás de los mismos [tests y gates](/cloud/cicd/tests-portero) que el resto del código.

## Idempotencia, lo que lo sostiene

Hay una propiedad que hace que todo esto funcione: aplicar la misma descripción dos veces da el mismo resultado que aplicarla una. Si corrés `terraform apply` y todo ya está como pedís, no pasa nada. Esto te deja ejecutar el proceso sin miedo, una y otra vez, hasta que el estado real coincide con el deseado.

Esa propiedad —describir el destino y dejar que la herramienta reconcilie— es la misma que sostiene a las plataformas que [escalan a cero](/cloud/cloud-run/scale-to-zero): vos declarás "quiero que esto exista cuando haga falta" y el sistema lo materializa solo.

## El lado oscuro

Nada de esto sale gratis. El *state*, el archivo donde Terraform recuerda qué creó, es delicado: si se corrompe o dos personas lo tocan a la vez, la herramienta pierde la noción de qué existe. Y el *drift* —cuando alguien cambia algo a mano por la consola y la realidad deja de coincidir con el código— rompe la promesa entera: el repo dice una cosa, la nube tiene otra.

La regla de oro, entonces, es simple y dura: **si está en código, no se toca a mano**. La consola pasa a ser de solo lectura.

## Por qué importa

La infraestructura como código convirtió la operación de la nube de un oficio artesanal en una disciplina de ingeniería. Tu arquitectura entera —servidores, redes, permisos, bases— deja de ser un misterio en la cabeza de alguien y pasa a ser un documento legible, versionado y revisable. Y un sistema que podés leer es un sistema que podés entender, auditar y reconstruir. Eso, más que cualquier ahorro, es lo que cambió.
