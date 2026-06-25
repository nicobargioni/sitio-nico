---
title: "Lo que los valores faltantes te están gritando"
date: "2026-06-18"
excerpt: "El patrón de los datos faltantes casi nunca es ruido: suele ser una señal que conviene escuchar antes de imputar."
tags: ["eda", "datos", "curiosidades"]
category: "data-ml"
subcategory: "eda"
---

> ¿Sabías que el solo hecho de que un dato falte puede ser, a veces, más informativo que el dato en sí?

Cuando abrimos un dataset y vemos huecos, el reflejo es taparlos: rellenar con la media, con cero, con el valor anterior. Pero antes de imputar conviene preguntarse algo incómodo: **¿por qué falta?** Porque el patrón de lo que no está casi nunca es aleatorio, y entenderlo cambia todo lo que viene después.

## Tres formas de faltar (y no son lo mismo)

La estadística clásica —el marco se lo debemos a Donald Rubin— distingue tres mecanismos. La diferencia parece sutil pero es decisiva.

- **MCAR (Missing Completely At Random).** El dato falta por puro azar, sin relación con nada. Un sensor que se cuelga al azar, un papel que se traspapeló. Es el caso ideal y el más raro: descartar esas filas no introduce sesgo, solo te baja la muestra.
- **MAR (Missing At Random).** Que falte depende de **otras variables observadas**, no del valor faltante en sí. Por ejemplo: los hombres reportan menos su peso que las mujeres. El faltante se explica por el género, que sí tenés. Acá la imputación condicionada (usando las variables que explican el hueco) funciona bien.
- **MNAR (Missing Not At Random).** Lo más traicionero: que falte depende **del propio valor que no ves**. Las personas con ingresos muy altos tienden a no declarar su ingreso. El faltante esconde la información justo en el extremo que te importa. Acá cualquier imputación ingenua te va a sesgar el resultado.

## La señal escondida en el hueco

Acá está la curiosidad de fondo: en MAR y, sobre todo, en MNAR, **la "faltancia" es una variable más**. El hecho de que un cliente no haya completado su nivel de ingresos puede predecir su comportamiento mejor que muchos campos completos.

Por eso una técnica simple y a menudo subestimada es crear una **bandera de ausencia**: una columna binaria que vale 1 cuando el dato original faltaba. No tirás la información del hueco; la convertís en feature.

```python
df["ingreso_faltaba"] = df["ingreso"].isna().astype(int)
df["ingreso"] = df["ingreso"].fillna(df["ingreso"].median())
# el modelo ahora puede aprender DEL patrón de ausencia
```

Si esa bandera resulta predictiva, te está confirmando que el faltante no era ruido: era señal.

## El error caro: imputar sin mirar

Rellenar todo con la media es cómodo y peligroso. Aplana la varianza, inventa una falsa certeza y, si el mecanismo es MNAR, te corre el promedio hacia donde no debería. Antes de imputar, hacé EDA del faltante: un mapa de calor de nulos, conteos por grupo, correlaciones entre "qué falta" y "qué resultado".

Esa disciplina de mirar antes de actuar es la misma que predica [el cuarteto de Anscombe](/data-ml/eda/anscombe-cuarteto): no confíes en el resumen, mirá la forma. Y cuidado con concluir de más, porque el patrón de ausencia agrupado puede invertirse al agregar grupos, tal como pasa en [la paradoja de Simpson](/data-ml/eda/paradoja-simpson). Imputar con la media también es, en el fondo, asumir que el faltante "no aporta", una hipótesis que conviene testear y no dar por sentada —el mismo cuidado que merece [interpretar bien un p-valor](/data-ml/estadistica/p-valor-malentendido).

## Qué te llevás

- **Preguntá por qué falta** antes de decidir cómo rellenar. MCAR, MAR y MNAR piden estrategias distintas.
- **Guardá la ausencia como feature** con una bandera binaria. El hueco puede ser tu mejor predictor.
- **Desconfiá de imputar con la media** a ciegas: aplana la varianza y, si el mecanismo es MNAR, sesga el resultado justo en el extremo que importa.

Lo que falta, bien escuchado, te está gritando algo. Conviene prestarle atención antes de taparle la boca con un promedio.
