---
title: "Mantenimiento predictivo: escuchar una máquina antes de que falle"
date: "2026-05-19"
excerpt: "Una turbina no se rompe de golpe: avisa. El truco está en escuchar la anomalía en los sensores antes del desastre."
tags: ["anomalias", "ml", "curiosidades"]
category: "data-ml"
subcategory: "deteccion-anomalias"
---

Un mecánico viejo apoya la mano en un motor, escucha un segundo y dice "esto va a romper". No tiene poderes: tiene años de oído entrenado para detectar la vibración que no estaba antes, el calor de más, el ritmo raro. El mantenimiento predictivo es ese oído, pero hecho de sensores y datos. La premisa es simple y poderosa: una máquina casi nunca falla de golpe. Se degrada, y mientras se degrada, **avisa** —solo que en señales tan sutiles que un humano no las nota.

## Las tres formas de mantener una máquina

- **Reactivo:** la arreglás cuando se rompe. Barato hasta que la rotura te frena la planta entera o te lastima a alguien.
- **Preventivo:** la revisás cada X horas, pase lo que pase. Seguro, pero tirás vida útil y plata cambiando piezas que estaban perfectas.
- **Predictivo:** la revisás cuando los datos dicen que va a fallar. El equilibrio inteligente: ni esperás el desastre ni desperdiciás componentes sanos.

El predictivo es atractivo justo porque ataca el desperdicio del preventivo sin el riesgo del reactivo. Pero exige algo que los otros dos no: detectar la anomalía a tiempo.

## El dataset que volvió famoso al problema

El caso de referencia es C-MAPSS, un conjunto de datos que la NASA liberó a partir de simulaciones de turbinas de avión. Tenés decenas de sensores —temperaturas, presiones, revoluciones— registrados a lo largo de la vida de cada motor, desde que está sano hasta que falla. El objetivo clásico es estimar la **RUL** (Remaining Useful Life): cuántos ciclos le quedan de vida.

Lo interesante para detección de anomalías es que el fallo no aparece como un único evento, sino como una **desviación progresiva** del comportamiento normal. Los sensores empiezan a alejarse, despacio, del patrón sano. Y ahí están casi todos los desafíos del campo juntos:

- Cuando una serie tiene muchos sensores a la vez, las nociones de "lejos del patrón normal" se vuelven escurridizas: es la [maldición de la dimensionalidad](/data-ml/clustering-pca/maldicion-dimensionalidad) en acción, y conviene reducir señales antes de modelar.
- Los fallos catastróficos son rarísimos en los datos —son los [cisnes negros](/data-ml/deteccion-anomalias/cisne-negro) de la ingeniería— así que rara vez tenés ejemplos suficientes para aprenderlos de forma supervisada.
- Por eso se recurre a métodos no supervisados que modelan lo sano y marcan lo que se desvía, como el [Isolation Forest](/data-ml/deteccion-anomalias/isolation-forest) o autoencoders que aprenden a reconstruir el comportamiento normal y fallan al reconstruir el anómalo.

## El detalle que arruina todo: los datos sucios

Antes de cualquier modelo, está el problema aburrido y decisivo: los sensores mienten. Se desconectan, se saturan, mandan ceros. Y un valor faltante en mantenimiento no es ruido neutro —puede ser el síntoma. [Los valores faltantes te están gritando](/data-ml/eda/valores-faltantes-gritan): un sensor que deja de reportar justo antes de un fallo es, él mismo, una anomalía. Tratarlo como "dato perdido" y rellenarlo con un promedio es tapar exactamente la alarma que te importaba.

El mantenimiento predictivo cambió la pregunta de la ingeniería. Ya no es "¿cuándo toca el próximo service?" sino "¿qué me está diciendo esta máquina hoy?". Y la respuesta, casi siempre, ya estaba en los datos: el problema nunca fue que la máquina no avisara, sino que nadie estaba escuchando.
