---
title: "Whisper: el modelo que transcribe en 99 idiomas"
date: "2026-04-21"
excerpt: "Cómo un modelo entrenado con 680.000 horas de audio crudo de internet terminó transcribiendo casi cualquier idioma sin afinarse para ninguno."
tags: ["audio", "habla", "curiosidades"]
category: "ia-agentes"
subcategory: "procesamiento-habla"
---

Le pasás un audio de un podcast en español con ruido de fondo, otro de una clase en japonés, un memo de voz en swahili. Y los tres salen transcritos. El mismo modelo, sin que nadie lo haya ajustado para ninguno de esos idiomas en particular. Eso es Whisper, y vale la pena entender por qué funciona tan bien.

## La receta secreta es la cantidad

La mayoría de los sistemas de reconocimiento de voz anteriores se entrenaban con datasets prolijos: audio limpio, transcripto a mano, en un solo idioma. Whisper hizo lo contrario. OpenAI lo entrenó con **680.000 horas** de audio sacado de internet —videos, charlas, lo que hubiera— con sus transcripciones tal cual venían, ruido incluido.

Ese desorden, que parecería un problema, es justo lo que lo hace robusto. El modelo nunca vio audio de laboratorio, así que no se rompe con el de la vida real: acentos raros, música de fondo, alguien que tose. De esas horas, una buena parte no era inglés, y ahí aparecieron los 99 idiomas casi de regalo.

## No solo transcribe: decide qué tarea hacer

Lo elegante de Whisper es que es un solo modelo *seq2seq* que aprende varias tareas a la vez. Al audio lo convierte primero en un [espectrograma](/ia-agentes/procesamiento-habla/espectrograma) —una imagen del sonido— y a partir de ahí predice texto. Pero antes del texto predice unos **tokens especiales** que le dicen qué hacer:

- En qué idioma está el audio (lo detecta solo).
- Si tiene que transcribir o directamente traducir al inglés.
- Marcas de tiempo, si las pedís.

Es la misma idea de que un modelo grande no "lee palabras" sino piezas: acá los comandos viajan como [tokens](/ia-agentes/llms-prompting/tokens-no-palabras) mezclados con la salida. Cambiar de transcribir a traducir es solo cambiar un token al principio.

## Robusto no es infalible

Whisper alucina. Con silencios largos o audio muy degradado, a veces inventa frases enteras que suenan plausibles pero no se dijeron —el mismo fenómeno por el que [los LLM alucinan con tanta seguridad](/ia-agentes/llms-prompting/por-que-alucinan): el modelo está entrenado para producir texto fluido, no para callarse cuando no entiende.

También arrastra el sesgo de sus datos: transcribe bárbaro los idiomas con mucho material en internet (inglés, español) y bastante peor los que tienen poco. Los 99 idiomas no rinden todos igual.

```python
import whisper

model = whisper.load_model("base")
result = model.transcribe("audio.mp3")  # detecta idioma solo
print(result["text"])
```

La lección de fondo se repite en casi todo el deep learning moderno: a veces el salto de calidad no viene de un algoritmo más astuto, sino de tragar muchísimos más datos, desprolijos y todo. Whisper no es más inteligente que sus antecesores. Vio mucho más mundo.
