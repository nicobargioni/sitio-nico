"""Plan maestro del blog: 125 posts "curiosos" (5 por subcategoría × 25).

Fuente de verdad de slugs/títulos/ángulos para que el interlinking entre posts
nunca quede roto. Emite:
  - content/blog/_index.json : índice global {slug -> title, url, cat, sub}
  - imprime el conteo y qué falta generar (cuántos .md ya existen)

Cada agente recibe su lista de specs + el índice global para interlinkear.
"""
import json, os, datetime

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), ".."))
BLOG = os.path.join(ROOT, "content", "blog")

# (slug, title, angle) por subcategoría. El angle guía al agente: el gancho curioso.
PLAN = {
 "data-ml": {
  "eda": [
   ("anscombe-cuarteto", "El cuarteto de Anscombe: cuatro datasets idénticos en los números, opuestos en el gráfico", "Cuatro datasets con misma media, varianza y correlación pero formas totalmente distintas; por qué SIEMPRE hay que graficar antes de modelar."),
   ("datasaurio-docena", "El Datasaurio: doce datasets con la misma estadística que esconden un dinosaurio", "La versión moderna de Anscombe (Datasaurus Dozen): mismas estadísticas resumen, gráficos absurdamente distintos."),
   ("paradoja-simpson", "La paradoja de Simpson: cuando una tendencia se da vuelta al juntar los datos", "El caso de admisiones de Berkeley; cómo agrupar/desagrupar invierte conclusiones."),
   ("valores-faltantes-gritan", "Lo que los valores faltantes te están gritando", "Missingness no aleatorio (MCAR/MAR/MNAR) como señal, no como ruido a tapar."),
   ("correlacion-espuria", "Correlaciones espurias: el queso, las sábanas y los doctorados", "Spurious correlations; por qué correlación altísima puede ser pura casualidad."),
  ],
  "estadistica": [
   ("paradoja-cumpleanos", "La paradoja del cumpleaños: con 23 personas, apostá a que dos cumplen el mismo día", "Por qué la intuición falla con probabilidades combinatorias."),
   ("ley-benford", "La ley de Benford: por qué el 1 aparece más y cómo atrapa fraudes", "Distribución del primer dígito; uso forense en contabilidad y elecciones."),
   ("monty-hall", "Monty Hall: por qué cambiar de puerta duplica tus chances", "El problema que enfureció a matemáticos; probabilidad condicional."),
   ("tanque-aleman", "El problema del tanque alemán: estimar producción enemiga con números de serie", "Estimación estadística real en la WWII; estimadores insesgados."),
   ("p-valor-malentendido", "Lo que un p-valor NO significa (y casi todos creen que sí)", "Los malentendidos clásicos del p-valor y el p-hacking."),
  ],
  "clustering-pca": [
   ("maldicion-dimensionalidad", "La maldición de la dimensionalidad: por qué en muchas dimensiones todo está lejos", "En alta dimensión las distancias se vuelven casi iguales; impacto en kNN/clustering."),
   ("kmeans-trampas", "Las trampas de K-Means: cuando los clusters que ves no existen", "K-Means siempre devuelve k grupos aunque no haya estructura; asunciones ocultas."),
   ("pca-sombra", "PCA explicado sin álgebra: la sombra que conserva más información", "Intuición de proyección que maximiza varianza."),
   ("codo-vs-silueta", "Codo vs silueta: cómo elegir k sin engañarte", "Dos métodos para el número de clusters y cuándo discrepan."),
   ("tsne-umap-mienten", "t-SNE y UMAP: mapas hermosos que a veces mienten", "Por qué distancias y tamaños en estos mapas no se deben sobreinterpretar."),
  ],
  "deep-learning": [
   ("aproximacion-universal", "El teorema que dice que una red puede aprender casi cualquier cosa (y por qué no alcanza)", "Teorema de aproximación universal vs la realidad del entrenamiento."),
   ("doble-descenso", "Doble descenso: cuando tener más parámetros que datos mejora el modelo", "El fenómeno que rompe la intuición clásica del sobreajuste."),
   ("panda-gibon", "El panda que la red ve como gibón: ejemplos adversarios", "Ruido imperceptible que engaña a una CNN con 99% de confianza."),
   ("dropout-azar", "Dropout: por qué apagar neuronas al azar evita el sobreajuste", "Regularización por azar; intuición de ensamble implícito."),
   ("billete-loteria", "La hipótesis del billete de lotería: redes diminutas escondidas en las grandes", "Lottery ticket hypothesis; subredes que solas alcanzan la misma performance."),
  ],
  "transfer-learning": [
   ("por-que-funciona-transfer", "Por qué una red entrenada en gatos sirve para radiografías", "Las primeras capas aprenden features universales (bordes, texturas)."),
   ("congelar-o-no", "Fine-tuning vs feature extraction: cuándo congelar y cuándo descongelar capas", "Decisión práctica según tamaño de datos y similitud de dominio."),
   ("olvido-catastrofico", "Olvido catastrófico: cuando aprender algo nuevo borra lo viejo", "Catastrophic forgetting y por qué el aprendizaje continuo es difícil."),
   ("momento-imagenet", "El momento ImageNet 2012: el experimento que cambió todo", "AlexNet y el quiebre que disparó la era del deep learning."),
   ("few-shot", "Aprender de pocos ejemplos: few-shot y el poder de lo preentrenado", "Cómo un modelo preentrenado aprende clases nuevas con un puñado de muestras."),
  ],
  "reinforcement-learning": [
   ("reward-hacking", "Reward hacking: agentes que hacen trampa para ganar puntos", "Casos reales donde el agente explota la recompensa en vez de resolver la tarea."),
   ("explorar-explotar", "Explorar vs explotar: el dilema del bandido de varios brazos", "El trade-off fundamental del RL contado con tragamonedas."),
   ("alphago-jugada-37", "La jugada 37 de AlphaGo: la creatividad que ningún humano jugaría", "La movida que sorprendió a los maestros de Go y qué revela del RL."),
   ("recompensa-escasa", "El problema de la recompensa escasa: cuando el premio llega tarde", "Sparse rewards y el reto del crédito temporal."),
   ("rl-vs-supervisado", "Por qué el RL no es como el aprendizaje supervisado", "Sin etiquetas, con feedback demorado: la diferencia de fondo."),
  ],
  "deteccion-anomalias": [
   ("cisne-negro", "Cisnes negros: por qué lo raro es justo lo que más importa", "Eventos rarísimos de alto impacto y por qué los modelos los ignoran."),
   ("isolation-forest", "Isolation Forest: aislar lo anómalo en pocas preguntas", "La idea elegante de que lo raro se separa con menos cortes."),
   ("fraude-desbalance", "Detección de fraude: cuando el 0,1% es todo lo que importa", "El problema del desbalance extremo y por qué la accuracy engaña."),
   ("mantenimiento-predictivo", "Mantenimiento predictivo: escuchar una máquina antes de que falle", "Anomalías en sensores como aviso temprano (caso CMAPSS de la NASA)."),
   ("costo-falsos-positivos", "El costo oculto de los falsos positivos en detección de anomalías", "Por qué afinar el umbral es una decisión de negocio, no técnica."),
  ],
  "mineria-de-datos": [
   ("panales-cerveza", "Pañales y cerveza: la regla de asociación más famosa (¿y falsa?)", "El mito del market basket analysis y qué hay de cierto."),
   ("soporte-confianza-lift", "Reglas de asociación: soporte, confianza y lift sin misterio", "Las tres métricas clave explicadas con el changuito del super."),
   ("apriori-vs-fpgrowth", "Apriori vs FP-Growth: minar patrones sin que explote la combinatoria", "Por qué contar todos los conjuntos es inviable y cómo se esquiva."),
   ("mineria-vs-ml", "Minería de datos vs machine learning: no son lo mismo", "Descubrir patrones vs predecir; dónde se separan."),
   ("sesgo-superviviente", "El sesgo del superviviente: los aviones de Wald y los datos que no ves", "Abraham Wald y los agujeros de bala; el dato ausente que decide."),
  ],
 },
 "ia-agentes": {
  "llms-prompting": [
   ("temperatura-llm", "La temperatura de un LLM: el dial entre el robot y el poeta", "Qué hace el parámetro temperature y cuándo subirlo o bajarlo."),
   ("tokens-no-palabras", "Los LLM no leen palabras: el mundo visto en tokens", "Tokenización; por qué 'strawberry' confunde a un modelo."),
   ("cadena-pensamiento", "Chain-of-thought: por qué pedirle que 'piense paso a paso' funciona", "El truco de prompting que mejora el razonamiento."),
   ("por-que-alucinan", "Por qué los LLM alucinan con tanta seguridad", "La naturaleza generativa que produce datos falsos convincentes."),
   ("ventana-contexto", "La ventana de contexto: la memoria de trabajo de un LLM", "Qué es, por qué importa y qué pasa cuando se llena."),
  ],
  "rag-embeddings": [
   ("rey-reina-embeddings", "Rey − hombre + mujer = reina: la aritmética de los embeddings", "Word2vec y la geometría del significado."),
   ("similitud-coseno", "Por qué el coseno y no la distancia para comparar significados", "Cosine similarity en espacios de embeddings, explicada simple."),
   ("rag-apuntes-examen", "RAG: darle a un LLM los apuntes antes del examen", "La idea central de retrieval-augmented generation."),
   ("chunking-arte", "El arte de partir documentos: chunking que no rompe el sentido", "Estrategias de chunking y su impacto en la calidad del RAG."),
   ("sesgos-embeddings", "Los sesgos escondidos en los embeddings", "Cómo los modelos heredan prejuicios del texto de entrenamiento."),
  ],
  "agentes": [
   ("react-razonar-actuar", "ReAct: agentes que razonan y actúan en bucle", "El patrón pensar→actuar→observar que da autonomía a un LLM."),
   ("function-calling", "Function calling: cómo un LLM aprende a usar herramientas", "Del texto a la acción: invocar APIs y funciones."),
   ("agente-vs-pipeline", "Agente vs pipeline: cuándo conviene dejar que decida solo", "Autonomía vs control; el costo de la flexibilidad."),
   ("agente-en-bucle", "Cuando un agente entra en bucle: los riesgos de la autonomía", "Loops infinitos, costos descontrolados y cómo ponerle límites."),
   ("multiagente", "Sistemas multiagente: cuando varios LLM colaboran (y discuten)", "Arquitecturas donde agentes se reparten o debaten tareas."),
  ],
  "vision": [
   ("como-ve-una-cnn", "Cómo 've' una CNN: de bordes a conceptos", "Jerarquía de features: de líneas a ojos a caras."),
   ("ilusiones-redes", "Las ilusiones ópticas de las redes neuronales", "Texturas vs formas: por qué una CNN ve un elefante con piel de gato."),
   ("data-augmentation", "Data augmentation: enseñar con la misma foto mil veces", "Rotar, recortar, espejar para que el modelo generalice."),
   ("clasificar-detectar-segmentar", "Clasificar, detectar, segmentar: tres tareas distintas en visión", "La diferencia entre 'qué hay', 'dónde está' y 'qué píxel es qué'."),
   ("sticker-adversario", "Un sticker que engaña a un auto autónomo", "Ataques adversarios físicos contra señales de tránsito."),
  ],
  "procesamiento-habla": [
   ("espectrograma", "El espectrograma: ver el sonido para que la IA lo entienda", "Cómo el audio se vuelve una imagen para la red."),
   ("whisper-99-idiomas", "Whisper: el modelo que transcribe en 99 idiomas", "Qué lo hace robusto y por qué cambió la transcripción."),
   ("mfcc-oido-humano", "MFCC: cómo se imita el oído humano para extraer features", "Por qué la escala mel y no los hertz crudos."),
   ("valle-inquietante-voz", "Voces sintéticas y el valle inquietante del audio", "Por qué una voz TTS casi perfecta nos da más rechazo que una robótica."),
   ("wake-word", "'Hey Siri': cómo un dispositivo te escucha sin escuchar", "Wake-word detection on-device y la privacidad."),
  ],
  "busqueda-heuristica": [
   ("a-estrella-gps", "A*: el GPS que combina lo recorrido y lo que falta", "f = g + h explicado como un navegador."),
   ("heuristica-admisible", "Heurística admisible: la promesa que garantiza el camino óptimo", "Por qué no sobreestimar es la clave de la optimalidad de A*."),
   ("dijkstra-vs-astar", "Dijkstra vs A*: la diferencia que hace una buena pista", "Buscar a ciegas vs con una corazonada informada."),
   ("8-puzzle-juguete", "El 8-puzzle: el juguete que enseñó a planificar a las máquinas", "Un problema chico que ilustra todo el espacio de estados."),
   ("factor-ramificacion", "El factor de ramificación: por qué el ajedrez es tan difícil", "La explosión combinatoria y por qué la heurística importa tanto."),
  ],
 },
 "hiperautomatizacion": {
  "rpa": [
   ("rpa-no-es-ia", "RPA no es IA: el robot que copia y pega (y por qué importa)", "La diferencia entre automatizar clicks y razonar."),
   ("rpa-deuda-tecnica", "La deuda técnica oculta de los bots de RPA", "Por qué un cambio de UI rompe el bot y multiplica el mantenimiento."),
   ("rpa-vs-api", "RPA vs API: automatizar por la ventana o por la puerta", "Cuándo el bot es un parche y cuándo la integración real."),
   ("swivel-chair", "El 'swivel chair' que RPA vino a matar", "El humano que copia datos de un sistema a otro como tarea fantasma."),
   ("rpa-a-hiperautomatizacion", "De RPA a hiperautomatización: el salto que cambia el ROI", "Sumar IA, process mining y orquestación al bot simple."),
  ],
  "n8n-make": [
   ("techo-nocode", "El techo del no-code: hasta dónde llegan n8n y Make", "Cuándo conviene y cuándo te frena una automatización visual."),
   ("webhooks-pegamento", "Webhooks: el pegamento invisible de las automatizaciones", "Cómo los sistemas se avisan entre sí en tiempo real."),
   ("idempotencia", "Idempotencia: por qué tu automatización no debe ejecutarse dos veces", "El bug silencioso de los reintentos y cómo evitarlo."),
   ("n8n-vs-make", "n8n vs Make: open source vs comodidad", "Self-hosting y control vs facilidad y mantenimiento."),
   ("rate-limits", "Rate limits: el muro contra el que choca toda automatización", "Por qué las APIs te frenan y cómo diseñar para eso."),
  ],
  "agentes-conversacionales": [
   ("chatbot-vs-agente", "Chatbot vs agente conversacional: el salto de FAQ a acción", "De responder a hacer cosas por vos."),
   ("intent-vs-llm", "Del intent clásico al LLM: cómo cambió el chatbot", "Por qué los árboles de intents quedaron viejos."),
   ("fallback-humano", "El arte del 'te paso con un humano'", "Cuándo y cómo escalar; el peor pecado del bot."),
   ("memoria-conversacion", "Mantener el hilo: memoria en conversaciones largas", "Cómo un bot recuerda lo que dijiste hace 10 mensajes."),
   ("metricas-chatbot", "Las métricas que dicen si tu chatbot sirve", "Contención, CSAT y la trampa de medir solo volumen."),
  ],
  "bpmn": [
   ("process-mining-rayos-x", "Process mining: la radiografía de cómo trabaja tu empresa", "Reconstruir el proceso real desde los logs."),
   ("proceso-real-vs-dibujado", "El proceso que dibujaste vs el que de verdad ocurre", "La brecha entre el flowchart y la realidad."),
   ("bpmn-lenguaje-universal", "BPMN: el lenguaje universal de los procesos", "Notación estándar para que negocio y TI hablen igual."),
   ("cuello-botella-invisible", "Cuellos de botella invisibles que solo el dato revela", "Esperas y reprocesos que nadie ve hasta medirlos."),
   ("happy-path-mentira", "El 'happy path' que esconde el 80% del trabajo real", "Las excepciones son la regla; modelarlas cambia todo."),
  ],
  "idp": [
   ("ocr-no-alcanza", "Por qué el OCR no alcanza para entender un documento", "Leer letras no es entender una factura."),
   ("layout-importa", "El layout importa: leer una factura no es leer texto", "La posición y estructura como información clave."),
   ("idp-pipeline", "De PDF a dato estructurado: el pipeline de IDP", "Las etapas reales del procesamiento inteligente de documentos."),
   ("datos-no-estructurados", "El 80% de los datos de una empresa que nadie usa", "Documentos, mails y PDFs como mina sin explotar."),
   ("human-in-the-loop", "Human-in-the-loop: cuándo confiar en la extracción automática", "Umbrales de confianza y revisión humana selectiva."),
  ],
 },
 "cloud": {
  "gcp": [
   ("vertex-sin-modelo", "Vertex AI: entrenar un modelo sin escribir el modelo", "AutoML y cuándo conviene vs hacerlo a mano."),
   ("region-importa", "Por qué la región de tu nube cambia la latencia y la factura", "Elegir región: costo, latencia y soberanía del dato."),
   ("maquinas-preemptibles", "Máquinas preemptibles: 80% más baratas si tolerás que se apaguen", "Spot/preemptible VMs y cargas tolerantes a interrupción."),
   ("vertex-vs-diy", "Vertex AI vs montarlo vos: el cálculo real", "Costo total: managed vs infraestructura propia."),
   ("cuotas-gcp", "Las cuotas de GCP: el límite que descubrís en producción", "Quotas y por qué planificarlas antes de escalar."),
  ],
  "cloud-run": [
   ("cold-start", "Cold starts: el medio segundo que arruina la experiencia", "Qué es el arranque en frío y cómo mitigarlo."),
   ("scale-to-zero", "Escalar a cero: pagar exactamente por lo que usás", "La promesa serverless y su contracara."),
   ("stateless-obligado", "Por qué Cloud Run te obliga a ser stateless", "No guardar estado local; dónde va el estado entonces."),
   ("min-instances-factura", "min-instances: el truco caliente que infla la factura", "Mantener contenedores vivos vs costo fijo; alternativas."),
   ("concurrency-dial", "Concurrency en Cloud Run: el dial que casi nadie toca", "Cuántas requests por contenedor y cómo cambia el costo."),
  ],
  "bigquery": [
   ("columnar-terabytes", "Por qué BigQuery escanea terabytes en segundos: el formato columnar", "Almacenamiento por columnas y procesamiento masivo."),
   ("select-star-caro", "SELECT * es caro: cómo BigQuery te cobra por columna", "El modelo de precios por bytes escaneados."),
   ("particionar-clusterizar", "Particionar y clusterizar: la diferencia entre $1 y $100 por query", "Dos técnicas que recortan el escaneo drásticamente."),
   ("bigquery-ml-sql", "BQML: entrenar modelos de machine learning con SQL", "Modelos sin salir del warehouse."),
   ("slots-moneda", "Slots: la moneda invisible del cómputo en BigQuery", "Cómo se asigna la capacidad de cálculo."),
  ],
  "docker": [
   ("funciona-en-mi-maquina", "'Funciona en mi máquina': el problema que Docker mató", "Reproducibilidad y por qué cambió el desarrollo."),
   ("capas-cache", "Las capas de Docker: por qué el orden del Dockerfile importa", "Cache de capas y builds rápidos vs lentos."),
   ("imagen-gigante", "Tu imagen pesa 2GB y no debería: multi-stage builds", "Adelgazar imágenes para deploys rápidos y seguros."),
   ("contenedor-vs-vm", "Contenedor vs máquina virtual: la analogía del departamento", "Compartir el kernel vs simular una máquina entera."),
   ("distroless", "Imágenes distroless: menos es más seguro", "Quitar shell y paquetes para reducir superficie de ataque."),
  ],
  "serverless": [
   ("serverless-igual-tiene-server", "Serverless igual tiene servidores (solo que no son tuyos)", "Desmitificar el término y entender qué delegás."),
   ("event-driven", "Arquitectura por eventos: el código que reacciona", "Funciones que se disparan ante un evento, no en bucle."),
   ("cold-start-serverless", "El cold start, el talón de Aquiles de lo serverless", "Por qué la primera invocación tarda y a quién le importa."),
   ("costo-por-invocacion", "Pagar por invocación: cuándo conviene y cuándo no", "El punto de equilibrio entre serverless y servidor fijo."),
   ("vendor-lock-in", "Vendor lock-in: la letra chica de lo serverless", "Qué tan atado quedás a un proveedor y cómo mitigarlo."),
  ],
  "cicd": [
   ("pipeline-rojo", "El pipeline en rojo: por qué romper el build es sagrado", "Cultura de no dejar la rama principal rota."),
   ("blue-green", "Deploy blue-green: cambiar el motor en pleno vuelo", "Desplegar sin downtime alternando entornos."),
   ("rollback", "El arte del rollback: deshacer un deploy en un click", "Por qué poder volver atrás vale más que no fallar."),
   ("tests-portero", "Tests como portero: lo que no pasa, no se despliega", "Gates de calidad automáticos en el pipeline."),
   ("infra-como-codigo", "Infraestructura como código: tu nube entera en un repo", "Terraform/IaC y por qué cambió la operación."),
  ],
 },
}

# Tags por subcategoría (se suma "curiosidades" a todos).
SUBTAGS = {
 "eda": ["eda","datos"], "estadistica": ["estadistica","probabilidad"],
 "clustering-pca": ["clustering","pca"], "deep-learning": ["deep-learning","redes-neuronales"],
 "transfer-learning": ["transfer-learning","deep-learning"], "reinforcement-learning": ["reinforcement-learning","rl"],
 "deteccion-anomalias": ["anomalias","ml"], "mineria-de-datos": ["mineria","patrones"],
 "llms-prompting": ["llm","prompting"], "rag-embeddings": ["rag","embeddings"],
 "agentes": ["agentes","llm"], "vision": ["vision","cnn"],
 "procesamiento-habla": ["audio","habla"], "busqueda-heuristica": ["busqueda","algoritmos"],
 "rpa": ["rpa","automatizacion"], "n8n-make": ["nocode","automatizacion"],
 "agentes-conversacionales": ["chatbots","conversacional"], "bpmn": ["procesos","process-mining"],
 "idp": ["documentos","idp"], "gcp": ["gcp","cloud"], "cloud-run": ["cloud-run","serverless"],
 "bigquery": ["bigquery","datos"], "docker": ["docker","contenedores"],
 "serverless": ["serverless","cloud"], "cicd": ["cicd","devops"],
}

# Posts existentes (ya escritos) — entran al índice para interlinkear hacia ellos.
EXISTING = [
 ("cuando-la-ia-suma", "Cuándo la IA suma de verdad", "ia-agentes", "llms-prompting"),
 ("q-learning-explicado", "Q-learning explicado: cómo una máquina aprende a jugar", "data-ml", "reinforcement-learning"),
 ("seis-pilares-hiperautomatizacion", "De automatización a hiperautomatización: los 6 pilares", "hiperautomatizacion", "bpmn"),
]


def all_specs():
    """Enumera todos los posts planificados con su fecha asignada."""
    out = []
    for cat, subs in PLAN.items():
        for sub, posts in subs.items():
            for slug, title, angle in posts:
                out.append(dict(slug=slug, title=title, angle=angle, category=cat,
                                subcategory=sub, tags=SUBTAGS[sub] + ["curiosidades"]))
    # fechas: una cadencia "creíble" hacia atrás desde el 2026-06-21, 1 día por post
    base = datetime.date(2026, 6, 21)
    for i, s in enumerate(out):
        s["date"] = (base - datetime.timedelta(days=i)).isoformat()
    return out


def build_index():
    specs = all_specs()
    idx = [dict(slug=s["slug"], title=s["title"], category=s["category"],
                subcategory=s["subcategory"],
                url=f"/{s['category']}/{s['subcategory']}/{s['slug']}") for s in specs]
    for slug, title, cat, sub in EXISTING:
        idx.append(dict(slug=slug, title=title, category=cat, subcategory=sub,
                        url=f"/{cat}/{sub}/{slug}"))
    os.makedirs(BLOG, exist_ok=True)
    with open(os.path.join(BLOG, "_index.json"), "w") as f:
        json.dump(idx, f, ensure_ascii=False, indent=1)
    return specs, idx


if __name__ == "__main__":
    specs, idx = build_index()
    existing_files = {f[:-3] for f in os.listdir(BLOG) if f.endswith(".md")}
    todo = [s for s in specs if s["slug"] not in existing_files]
    print(f"Planificados: {len(specs)} · en índice (con existentes): {len(idx)}")
    print(f"Ya escritos: {len(specs)-len(todo)} · faltan: {len(todo)}")
    # desglose por subcategoría de lo que falta
    from collections import Counter
    c = Counter((s['category'], s['subcategory']) for s in todo)
    for (cat, sub), n in sorted(c.items()):
        print(f"  faltan {n}: {cat}/{sub}")
