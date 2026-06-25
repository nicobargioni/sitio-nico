---
title: "Contenedor vs máquina virtual: la analogía del departamento"
date: "2026-02-28"
excerpt: "Una VM es una casa con sus propios cimientos. Un contenedor es un departamento que comparte la estructura del edificio. La diferencia lo explica casi todo."
tags: ["docker", "contenedores", "curiosidades"]
category: "cloud"
subcategory: "docker"
---

Mucha gente usa "contenedor" y "máquina virtual" como si fueran lo mismo: dos formas de aislar software. Aíslan, sí, pero de maneras tan distintas que confundirlas te lleva a decisiones malas de arquitectura. La diferencia se entiende mejor con ladrillos que con diagramas.

## La casa y el departamento

Imaginá que necesitás vivienda para varias familias.

Una **máquina virtual** es construir una casa entera para cada una: cimientos propios, paredes, instalación eléctrica, todo desde cero. En términos técnicos, cada VM corre su **propio sistema operativo completo** —su propio kernel— sobre un hipervisor que simula hardware. Aislamiento total, pero pagás el costo de duplicar el sistema operativo entero por cada inquilino.

Un **contenedor** es un departamento en un edificio: tiene sus paredes, su puerta con llave, su privacidad, pero **comparte la estructura del edificio**: los cimientos, las cañerías maestras, el kernel. Todos los contenedores de una máquina usan el **mismo kernel del sistema operativo anfitrión**, y se aíslan entre sí con mecanismos del propio kernel (namespaces y cgroups, en Linux) que les hacen creer que tienen la máquina para ellos solos.

## Qué implica compartir el kernel

Esa única diferencia —¿cada uno trae su kernel o comparten el del anfitrión?— explica casi todo lo demás:

- **Peso**: una VM arrastra un sistema operativo completo (gigabytes). Un contenedor lleva solo tu app y sus dependencias, porque el kernel ya está puesto. Por eso podés [adelgazar imágenes hasta megabytes](/cloud/docker/imagen-gigante).
- **Arranque**: una casa se construye en minutos (bootear un OS). Un departamento ya está, abrís la puerta y entrás: los contenedores arrancan en milisegundos. Eso es lo que hace viable que una plataforma [escale a cero](/cloud/cloud-run/scale-to-zero) y prenda instancias por demanda.
- **Densidad**: en un servidor entran un puñado de VMs, pero decenas o cientos de contenedores, porque no estás duplicando el sistema operativo una y otra vez.

## El precio del aislamiento liviano

No es gratis. Compartir el kernel significa que el aislamiento de un contenedor es **más débil** que el de una VM. Si dos casas son independientes, un problema en los cimientos de una no afecta a la otra; en un edificio, una falla estructural grave en los cimientos compartidos las toca a todas. Por eso, para cargas con requisitos de seguridad muy estrictos o que necesitan un kernel distinto, las VMs siguen teniendo sentido. No es que una opción sea mejor: resuelven problemas distintos.

En la práctica, además, casi nunca es "o una o la otra". En la nube tus contenedores corren *adentro* de VMs gestionadas por el proveedor; vos ves el departamento, pero el edificio es una máquina virtual que no administrás. Es la misma idea de que [serverless igual tiene servidores](/cloud/serverless/serverless-igual-tiene-server): hay capas debajo que simplemente dejaste de ver.

## El cierre

La analogía del departamento no es solo didáctica: te dice cuándo elegir qué. Si necesitás arrancar rápido, empaquetar liviano y meter mucha densidad, el contenedor gana. Es la misma razón por la que [Docker pudo matar el "funciona en mi máquina"](/cloud/docker/funciona-en-mi-maquina) sin obligarte a cargar un sistema operativo entero en cada artefacto: comparte la estructura y empaqueta solo lo tuyo.
