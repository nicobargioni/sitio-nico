/**
 * Soluciones: qué resuelvo con datos e IA, contado para un público NO técnico.
 * Organizado por problema de negocio. Cada solución linkea a su "prueba"
 * técnica dentro del sitio (silo/notebook) para cerrar el círculo hacer×decir.
 *
 * `icon` mapea a un ícono en app/components/SolutionCard.tsx (SOLUTION_ICONS).
 */
export type Solution = {
  slug: string;
  icon: string;
  titulo: string; // nombre de la solución
  dolor: string; // el problema en 1 línea (gancho de la card)
  resumen: string; // 1-2 líneas para la card / meta
  problema: string; // párrafo en lenguaje de negocio
  ejemplo: string; // un caso concreto y cotidiano
  queHago: string; // párrafo, en llano
  proceso: { paso: string; detalle: string }[]; // cómo es el trabajo, paso a paso
  resultados: string[]; // qué obtenés
  senales: string[]; // señales de que tu negocio lo necesita
  paraQuien: string;
  prueba?: { label: string; href: string };
};

export const solutions: Solution[] = [
  {
    slug: "prediccion-de-demanda",
    icon: "trending",
    titulo: "Predecir cuánto vas a vender",
    dolor: "Comprás de más o te quedás sin stock porque la demanda te agarra desprevenido.",
    resumen:
      "Modelos que estiman la demanda de las próximas semanas para que compres y produzcas con datos, no con corazonadas.",
    problema:
      "La mayoría planifica compras y producción mirando el mes pasado y un poco de intuición. El resultado es plata inmovilizada en stock que no rota, o ventas perdidas por faltantes justo cuando había demanda.",
    queHago:
      "Tomo tu historial de ventas y lo que lo afecta —estacionalidad, promociones, feriados— y entreno un modelo que proyecta la demanda por producto y período. Te lo dejo en un tablero simple, no en una caja negra.",
    resultados: [
      "Menos quiebres de stock y menos sobrestock",
      "Compras y producción planificadas con anticipación",
      "Una proyección que se actualiza sola con tus ventas nuevas",
    ],
    ejemplo:
      "Pensá en una tienda de indumentaria: cada cambio de temporada compra “a ojo” y termina liquidando lo que no salió o quedándose corta con lo que voló. Con una proyección por producto sabe cuánto pedir de cada talle antes de que arranque la temporada.",
    proceso: [
      { paso: "Reviso tus datos", detalle: "Miramos tu historial de ventas y qué tenés cargado: fechas, productos, promociones." },
      { paso: "Encuentro el patrón", detalle: "Entreno un modelo que separa la tendencia, la estacionalidad y el efecto de promos o feriados." },
      { paso: "Te lo dejo usable", detalle: "La proyección queda en un tablero claro y se recalcula sola con cada venta nueva." },
    ],
    senales: [
      "Comprás stock “por intuición” o copiando el año pasado",
      "Te quedás sin lo que más se vende justo en temporada alta",
      "Tenés capital dormido en productos que no rotan",
    ],
    paraQuien: "Comercios, e-commerce y producción con historial de ventas.",
    prueba: { label: "Cómo modelo esto", href: "/data-ml/estadistica" },
  },
  {
    slug: "retencion-de-clientes",
    icon: "churn",
    titulo: "Anticipar qué clientes están por irse",
    dolor: "Te enterás de que un cliente se fue cuando ya dejó de comprar.",
    resumen:
      "Detecto señales tempranas de abandono para que actúes antes de perder al cliente, no después.",
    problema:
      "Conseguir un cliente nuevo cuesta bastante más que retener uno. Pero casi todos reaccionan cuando el cliente ya se fue, justo cuando no queda nada por hacer.",
    queHago:
      "Analizo el comportamiento de tus clientes —cada cuánto compran, cuánto gastan, hace cuánto que no aparecen— y armo un modelo que marca quiénes tienen alto riesgo de irse, con tiempo para llegarles con una acción concreta.",
    resultados: [
      "Una lista priorizada de clientes en riesgo",
      "Acciones de retención antes de perderlos",
      "Entender qué dispara el abandono",
    ],
    ejemplo:
      "Un gimnasio con cuota mensual: la mayoría de las bajas se ven venir —el socio que dejó de ir hace tres semanas casi seguro no renueva—. Detectarlo a tiempo es poder llamarlo antes, no después.",
    proceso: [
      { paso: "Defino qué es “irse”", detalle: "Acordamos qué cuenta como abandono en tu negocio: no renovar, dejar de comprar por X meses, etc." },
      { paso: "Leo el comportamiento", detalle: "El modelo aprende las señales que anticipan la baja: caída de frecuencia, menor gasto, menos interacción." },
      { paso: "Te doy la lista accionable", detalle: "Cada semana tenés a los clientes en riesgo, ordenados por prioridad, para actuar con tiempo." },
    ],
    senales: [
      "Te enterás de las bajas cuando ya pasaron",
      "No sabés qué clientes están “tibios”",
      "Gastás más en captar que en retener",
    ],
    paraQuien: "Negocios con clientes recurrentes, suscripciones o cartera.",
    prueba: { label: "Cómo lo predigo", href: "/data-ml/mineria-de-datos" },
  },
  {
    slug: "deteccion-de-anomalias",
    icon: "anomaly",
    titulo: "Detectar lo raro antes de que cueste caro",
    dolor: "Errores, fraudes o fallas que aparecen tarde, cuando ya hicieron daño.",
    resumen:
      "Sistemas que avisan cuando algo se sale del patrón —un gasto, una transacción, una máquina— antes de que escale.",
    problema:
      "Lo anómalo es, casi por definición, lo que nadie está mirando: un cobro raro, un pico de devoluciones, una máquina que empieza a fallar. Para cuando se nota a ojo, ya costó plata.",
    queHago:
      "Entreno modelos que aprenden cómo se ve “lo normal” en tus datos y marcan automáticamente lo que se aparta. Vos definís el umbral según cuánto te cuesta una falsa alarma frente a dejar pasar una real.",
    resultados: [
      "Alertas tempranas de fraude, errores o fallas",
      "Menos pérdidas por cosas que se detectan tarde",
      "Un umbral ajustado a tu costo real",
    ],
    ejemplo:
      "Un e-commerce con cientos de operaciones por día: un patrón raro de devoluciones o un pico de contracargos se pierde entre el ruido hasta que el daño ya está hecho. Un detector lo levanta el mismo día.",
    proceso: [
      { paso: "Aprendo tu normalidad", detalle: "El modelo estudia cómo se comportan tus datos cuando todo está en orden." },
      { paso: "Marco lo que se aparta", detalle: "Cualquier cosa que se sale del patrón queda señalada automáticamente." },
      { paso: "Ajustamos el umbral", detalle: "Calibramos cuán sensible es, según cuánto te cuesta una falsa alarma frente a dejar pasar una real." },
    ],
    senales: [
      "Los problemas se detectan tarde y a mano",
      "Tenés mucho volumen y poca gente para mirarlo",
      "Un error o fraude no detectado te sale caro",
    ],
    paraQuien: "Finanzas, operaciones, e-commerce y mantenimiento.",
    prueba: { label: "Cómo detecto anomalías", href: "/data-ml/deteccion-anomalias" },
  },
  {
    slug: "segmentacion-de-clientes",
    icon: "segment",
    titulo: "Entender a tus clientes en grupos reales",
    dolor: "Le hablás a todos tus clientes igual y no sabés bien quién te compra.",
    resumen:
      "Descubro los grupos naturales de tu base —sin suponerlos de antemano— para que comuniques y vendas distinto a cada uno.",
    problema:
      "Tratar a toda tu base igual desperdicia plata: el que compra una vez al año no es el que compra todas las semanas, pero a los dos les llega el mismo mensaje.",
    queHago:
      "Agrupo a tus clientes por comportamiento real —qué, cuánto y cada cuánto compran— usando los datos y no categorías inventadas. Te explico quién es cada grupo y qué conviene hacer con cada uno.",
    resultados: [
      "Segmentos claros y accionables de tu base",
      "Campañas y precios diferenciados por grupo",
      "Saber dónde está tu cliente más valioso",
    ],
    ejemplo:
      "Una marca que le manda el mismo mail a toda su base: el que compra todas las semanas recibe lo mismo que el que compró una vez hace un año. Con segmentos reales, a cada uno le hablás distinto.",
    proceso: [
      { paso: "Junto el comportamiento", detalle: "Reúno qué, cuánto y cada cuánto compra cada cliente." },
      { paso: "Encuentro los grupos", detalle: "El modelo separa los grupos naturales de tu base, sin que yo los invente de antemano." },
      { paso: "Te los explico", detalle: "Te cuento quién es cada grupo y qué acción concreta conviene para cada uno." },
    ],
    senales: [
      "Le hablás igual a toda tu base",
      "No sabés quién es tu cliente más valioso",
      "Tus campañas rinden parejo y bajo",
    ],
    paraQuien: "Marketing, ventas y e-commerce con base de clientes.",
    prueba: { label: "Cómo segmento", href: "/data-ml/clustering-pca" },
  },
  {
    slug: "asistente-con-tu-conocimiento",
    icon: "chat",
    titulo: "Un asistente que responde con la info de tu empresa",
    dolor: "Tu equipo pierde horas respondiendo siempre las mismas preguntas.",
    resumen:
      "Un chatbot que contesta con tus documentos, manuales y procesos —no con lo que “sabe” un modelo genérico—, citando de dónde sacó cada respuesta.",
    problema:
      "Los modelos genéricos inventan cuando no saben. Y la información de tu empresa —manuales, políticas, catálogos— vive dispersa en PDFs y carpetas que nadie quiere leer.",
    queHago:
      "Conecto un modelo de lenguaje a TUS documentos (la técnica se llama RAG): el asistente busca primero en tu material y responde sobre eso, mostrando la fuente. Sirve para soporte interno o atención al cliente.",
    resultados: [
      "Respuestas correctas, basadas en tu información",
      "Menos horas del equipo en preguntas repetidas",
      "Cada respuesta cita su fuente: nada de inventos",
    ],
    ejemplo:
      "Un equipo de soporte que responde 200 veces por mes “¿cómo configuro X?”: la respuesta está en el manual, pero nadie lo abre. Un asistente conectado a ese manual responde al instante y muestra de dónde lo sacó.",
    proceso: [
      { paso: "Reúno tu material", detalle: "Juntamos tus documentos, manuales, FAQs y políticas." },
      { paso: "Conecto el asistente", detalle: "El modelo busca primero en TU material y responde sobre eso, citando la fuente." },
      { paso: "Lo ponés a trabajar", detalle: "Queda disponible para tu equipo o tus clientes, donde lo necesites." },
    ],
    senales: [
      "Tu equipo responde siempre lo mismo",
      "La información está, pero dispersa y nadie la lee",
      "Probaste un bot genérico y te inventaba respuestas",
    ],
    paraQuien: "Soporte, atención al cliente y equipos con mucha documentación.",
    prueba: { label: "Cómo funciona (RAG)", href: "/ia-agentes/rag-embeddings" },
  },
  {
    slug: "automatizacion-de-procesos",
    icon: "automate",
    titulo: "Automatizar el trabajo repetitivo",
    dolor: "Tu gente copia y pega datos entre sistemas en vez de pensar.",
    resumen:
      "Conecto tus herramientas y armo flujos que hacen solos las tareas manuales y repetitivas, de punta a punta.",
    problema:
      "Hay tareas que se repiten todos los días —pasar datos de un sistema a otro, armar reportes, mandar avisos— que consumen horas y se hacen con errores cuando las hace una persona cansada.",
    queHago:
      "Mapeo el proceso, veo qué se puede automatizar y armo el flujo con la herramienta que mejor encaje (n8n, Make, APIs o agentes de IA). Lo que era media hora de copy-paste pasa a correr solo.",
    resultados: [
      "Horas del equipo liberadas para lo que importa",
      "Procesos sin errores de tipeo ni olvidos",
      "Tareas que corren 24/7 sin que nadie las dispare",
    ],
    ejemplo:
      "Cada mañana alguien baja un reporte, copia los números a una planilla, arma un resumen y lo manda por mail. Media hora, todos los días, siempre igual. Eso puede correr solo.",
    proceso: [
      { paso: "Mapeo el proceso", detalle: "Miramos paso a paso cómo se hace hoy y dónde se va el tiempo." },
      { paso: "Armo el flujo", detalle: "Conecto tus herramientas con la pieza que mejor encaje: n8n, Make, APIs o agentes de IA." },
      { paso: "Lo dejo corriendo", detalle: "El proceso pasa a ejecutarse solo, con avisos si algo falla." },
    ],
    senales: [
      "Hay tareas repetitivas entre sistemas todos los días",
      "Aparecen errores por carga manual",
      "Tenés gente capaz haciendo trabajo de copy-paste",
    ],
    paraQuien: "Cualquier equipo con tareas manuales repetidas entre sistemas.",
    prueba: { label: "Sobre hiperautomatización", href: "/hiperautomatizacion" },
  },
  {
    slug: "lectura-de-documentos",
    icon: "docs",
    titulo: "Leer facturas y documentos en automático",
    dolor: "Alguien carga a mano los datos de facturas y PDFs, uno por uno.",
    resumen:
      "Extraigo los datos de tus documentos —facturas, remitos, formularios— y los paso a una planilla o sistema, sin carga manual.",
    problema:
      "Cargar a mano datos de documentos es lento, caro y propenso a errores. Y el grueso de la información de una empresa vive en documentos que nadie llega a aprovechar.",
    queHago:
      "Armo un pipeline que lee tus documentos —no solo el texto, también la estructura, como dónde está el total en una factura—, extrae los campos que te importan y los entrega listos para tu sistema, con revisión humana donde haga falta.",
    resultados: [
      "Datos de documentos cargados solos",
      "Menos errores y menos horas de data-entry",
      "Tus PDFs convertidos en datos usables",
    ],
    ejemplo:
      "Una administración que recibe 300 facturas de proveedores por mes y las carga a mano, una por una. El pipeline lee cada factura, saca proveedor, fecha, total e ítems, y los deja en el sistema.",
    proceso: [
      { paso: "Definimos qué extraer", detalle: "Acordamos qué campos te importan de cada tipo de documento." },
      { paso: "Armo el lector", detalle: "El pipeline entiende el texto y la estructura —dónde está cada dato—, no solo transcribe." },
      { paso: "Con red de seguridad", detalle: "Donde la confianza es baja, lo deriva a revisión humana antes de cargar." },
    ],
    senales: [
      "Alguien carga datos de PDFs o facturas a mano",
      "Tenés mucho papeleo repetitivo",
      "Los errores de tipeo te cuestan tiempo y plata",
    ],
    paraQuien: "Administración, contabilidad y operaciones con papeleo.",
    prueba: { label: "Sobre documentos inteligentes", href: "/hiperautomatizacion/idp" },
  },
  {
    slug: "analisis-de-datos",
    icon: "analytics",
    titulo: "Sacar conclusiones claras de tus números",
    dolor: "Tenés datos por todos lados, pero te cuesta sacar decisiones de ahí.",
    resumen:
      "Ordeno y analizo tus datos para responder preguntas concretas de negocio, y te lo dejo en un tablero que entendés de un vistazo.",
    problema:
      "Tener datos no es lo mismo que entenderlos. Muchos negocios acumulan planillas y reportes pero no logran responder las preguntas que de verdad mueven la aguja.",
    queHago:
      "Junto tus fuentes, las limpio, hago el análisis —qué pasó, por qué y qué se repite— y te entrego conclusiones accionables en un tablero claro. Antes de modelar nada complejo, primero entender bien lo que ya tenés.",
    resultados: [
      "Respuestas a las preguntas que te importan",
      "Un tablero claro en lugar de planillas sueltas",
      "Una base sólida para decidir (y para modelos futuros)",
    ],
    ejemplo:
      "Un negocio con las ventas en un sistema, los gastos en una planilla y las métricas web en otro lado, que no puede responder “¿qué producto me deja más margen?”. Junto todo y esa pregunta pasa a tener respuesta.",
    proceso: [
      { paso: "Junto y ordeno", detalle: "Reúno tus fuentes y las dejo limpias y consistentes." },
      { paso: "Hago las preguntas", detalle: "Analizo qué pasó, por qué y qué se repite, enfocado en lo que te mueve la aguja." },
      { paso: "Te lo dejo claro", detalle: "Conclusiones accionables en un tablero que entendés de un vistazo." },
    ],
    senales: [
      "Tenés datos pero no decisiones",
      "Vivís pidiendo reportes que tardan en llegar",
      "Decidís “a sentimiento” por falta de claridad",
    ],
    paraQuien: "Dueños y equipos que tienen datos pero no claridad.",
    prueba: { label: "Cómo encaro el análisis", href: "/data-ml/eda" },
  },
  {
    slug: "pricing-dinamico",
    icon: "tag",
    titulo: "Poner el precio justo, no a ojo",
    dolor: "Ponés precios por intuición y dejás margen —o ventas— sobre la mesa.",
    resumen: "Modelos que calculan el precio que más te conviene para cada producto, según cómo responde tu demanda y qué hace la competencia.",
    problema: "Muchos negocios fijan precios sumando un porcentaje fijo al costo y se olvidan del resto del año. Así terminan caros cuando podrían vender más, o regalados cuando la gente igual pagaba más. Ese punto medio que maximiza ganancia casi nunca lo buscan en serio.",
    ejemplo: "Pensá en una cafetería con servicio de delivery: cobra lo mismo un martes a la tarde que un viernes a la noche cuando explota la demanda. Ajustando el precio según el momento y la zona, gana más en los picos sin espantar clientes en las horas flojas.",
    queHago: "Analizo cómo cambian tus ventas cuando cambia el precio —tu elasticidad— y le sumo costos, estacionalidad y competencia. Con eso armo un precio sugerido por producto que apunta a tu mejor resultado, y te lo dejo en un tablero donde ves el porqué de cada número.",
    proceso: [
      { paso: "Mido tu sensibilidad al precio", detalle: "Cruzo tu historial de ventas y precios para ver cuánto cae o sube la demanda en cada nivel." },
      { paso: "Calculo el punto óptimo", detalle: "Combino esa sensibilidad con tus costos y la estacionalidad para encontrar el precio que más rinde." },
      { paso: "Te dejo precios sugeridos", detalle: "Cada producto queda con un precio recomendado en un tablero claro, que se recalcula cuando cambian tus datos." },
    ],
    resultados: [
      "Mejor margen sin perder volumen de ventas",
      "Precios que acompañan la demanda real",
      "Decisiones de precio con un número detrás",
    ],
    senales: [
      "Ponés todos los precios con el mismo porcentaje sobre el costo",
      "Sospechás que algunos productos podrían valer más y no te animás",
      "Hacés descuentos sin saber si te convienen",
    ],
    paraQuien: "Comercios, e-commerce y servicios con varios productos y precios propios.",
    prueba: { label: "Cómo lo modelo", href: "/data-ml/estadistica" },
  },
  {
    slug: "recomendador-de-productos",
    icon: "shopping",
    titulo: "Recomendar lo que cada cliente querría comprar",
    dolor: "Tus clientes no descubren los productos que les servirían.",
    resumen: "Un recomendador que aprende de lo que cada cliente mira y compra para mostrarle lo que más probablemente quiera llevar.",
    problema: "En la mayoría de las tiendas el cliente ve siempre la misma vidriera, igual para todos. Productos que le encantarían quedan enterrados tres clics más abajo y nunca los encuentra. Esa venta que estaba al alcance simplemente no pasa.",
    ejemplo: "Pensá en una librería online con miles de títulos: alguien que compró tres policiales seguidos sigue viendo en la home los más vendidos genéricos. Con un recomendador, lo recibe con novelas del mismo estilo y autores parecidos, y vuelve a comprar más seguido.",
    queHago: "Tomo el historial de navegación y compras y armo un recomendador que entiende qué productos se parecen y qué clientes se parecen entre sí. Lo conecto a tu tienda o newsletter para que cada persona vea sugerencias pensadas para ella, no para el promedio.",
    proceso: [
      { paso: "Mapeo gustos y productos", detalle: "Represento cada producto y cada cliente según comportamiento y características, para medir afinidades reales." },
      { paso: "Genero las recomendaciones", detalle: "Para cada persona calculo qué productos tienen más chances de interesarle y los ordeno." },
      { paso: "Lo enchufo a tu canal", detalle: "Las sugerencias aparecen en la tienda, el mail o donde le hables al cliente, y se actualizan con cada interacción." },
    ],
    resultados: [
      "Más ventas cruzadas y ticket promedio más alto",
      "Clientes que descubren productos que no buscaban",
      "Recomendaciones que mejoran cuanto más se usan",
    ],
    senales: [
      "Todos tus clientes ven la misma vidriera",
      "Tenés catálogo grande y poca rotación en buena parte de él",
      "Mandás newsletters iguales para toda tu base",
    ],
    paraQuien: "E-commerce y plataformas con catálogo amplio e historial de clientes.",
    prueba: { label: "Cómo funciona (embeddings)", href: "/ia-agentes/rag-embeddings" },
  },
  {
    slug: "prevision-de-cobros",
    icon: "dollar",
    titulo: "Anticipar cuánta plata vas a cobrar",
    dolor: "No sabés cuánto vas a cobrar el mes que viene y el flujo de caja te sorprende.",
    resumen: "Modelos que proyectan tus cobros de los próximos meses según el comportamiento histórico de pago de tus clientes.",
    problema: "Tener ventas no es lo mismo que tener la plata en la cuenta. Entre lo que facturás y lo que efectivamente entra hay clientes que pagan tarde, otros que no pagan y temporadas más flojas. Sin esa proyección, planificás gastos a ciegas y te agarran apretones de caja evitables.",
    ejemplo: "Pensá en una empresa de servicios que factura a 30 días: el dueño cree que en marzo cobra todo lo de febrero, pero la mitad de los clientes paga recién a los 50 días. Con una proyección de cobros sabe cuánto entra cada semana y decide cuándo puede comprometer un gasto.",
    queHago: "Tomo tu historial de facturación y pagos y modelo cómo y cuándo paga cada tipo de cliente. Con eso proyecto cuánto vas a cobrar semana a semana o mes a mes, y te lo dejo en un tablero donde ves el ingreso esperado y los casos de riesgo.",
    proceso: [
      { paso: "Reviso tu ciclo de cobro", detalle: "Miro facturación y pagos reales para entender los plazos y la morosidad por tipo de cliente." },
      { paso: "Proyecto los ingresos", detalle: "Entreno un modelo que estima cuándo y cuánto vas a cobrar a futuro, con sus rangos." },
      { paso: "Te lo dejo a la vista", detalle: "La proyección queda en un tablero que marca lo esperado y lo que conviene seguir de cerca." },
    ],
    resultados: [
      "Flujo de caja proyectado con anticipación",
      "Menos sorpresas en los meses flojos",
      "Detección temprana de clientes que se atrasan",
    ],
    senales: [
      "Confundís facturado con cobrado al planificar",
      "Te agarran apretones de caja que no veías venir",
      "No tenés idea de cuánto va a entrar el mes que viene",
    ],
    paraQuien: "Empresas de servicios, B2B y cualquier negocio que cobre a plazo.",
    prueba: { label: "Cómo proyecto", href: "/data-ml/estadistica" },
  },
  {
    slug: "clasificacion-de-tickets",
    icon: "inbox",
    titulo: "Ordenar solas las consultas que entran",
    dolor: "Todas las consultas caen a la misma bandeja, sin prioridad ni ruteo.",
    resumen: "Un clasificador que lee cada consulta que entra, la etiqueta por tema y urgencia, y la manda directo a quien corresponde.",
    problema: "Cuando todo cae al mismo lugar, alguien tiene que leer mensaje por mensaje para repartir. Mientras tanto, un reclamo urgente queda mezclado entre consultas de rutina y se responde tarde. Se pierde tiempo en clasificar a mano y se enfría la atención justo donde más importa.",
    ejemplo: "Pensá en una inmobiliaria que recibe por mail consultas de alquiler, ventas, reclamos de inquilinos y dudas administrativas, todo junto. Con un clasificador, cada mail llega etiquetado y ruteado al área correcta, y los reclamos urgentes saltan a la cima de la lista.",
    queHago: "Entreno un modelo que entiende el texto de cada consulta y la clasifica por tema, área y urgencia. Lo conecto a tu bandeja o sistema de tickets para que cada mensaje se etiquete y se rutee solo al llegar, sin que nadie tenga que repartir a mano.",
    proceso: [
      { paso: "Defino tus categorías", detalle: "Armamos juntos los temas, áreas y niveles de urgencia que tienen sentido para tu operación." },
      { paso: "Entreno el clasificador", detalle: "Uso tus consultas históricas para que el modelo aprenda a etiquetar texto como lo harías vos." },
      { paso: "Lo conecto a tu bandeja", detalle: "Cada consulta nueva entra etiquetada y ruteada automáticamente a quien corresponde." },
    ],
    resultados: [
      "Consultas ruteadas al área correcta sin intervención",
      "Reclamos urgentes atendidos primero",
      "Menos tiempo perdido clasificando a mano",
    ],
    senales: [
      "Alguien dedica horas a repartir mensajes entre áreas",
      "Las consultas urgentes se mezclan con las de rutina",
      "Los tiempos de respuesta dependen de quién mira la bandeja",
    ],
    paraQuien: "Negocios con alto volumen de consultas, soporte o atención por mail.",
    prueba: { label: "Cómo clasifico texto", href: "/ia-agentes/llms-prompting" },
  },
  {
    slug: "sentimiento-de-marca",
    icon: "message",
    titulo: "Saber qué dicen de tu marca, a escala",
    dolor: "Tenés cientos de reseñas y menciones que nadie alcanza a leer.",
    resumen: "Análisis automático de reseñas, comentarios y menciones para saber qué se valora, qué molesta y cómo cambia el ánimo en el tiempo.",
    problema: "Las opiniones de tus clientes están repartidas en reseñas, redes y encuestas, y son demasiadas para leerlas todas. Así, un problema que empieza a repetirse en los comentarios se descubre tarde, cuando ya afectó las ventas o la reputación. La voz del cliente queda sin escuchar.",
    ejemplo: "Pensá en un restaurante con cientos de reseñas en distintas apps: el dueño lee algunas sueltas y se queda con una impresión vaga. Con un análisis de sentimiento ve que en el último mes crecieron las quejas por demoras en la cocina, y actúa antes de que le baje la calificación.",
    queHago: "Junto tus reseñas, comentarios y menciones, y un modelo que entiende el texto las clasifica por sentimiento y por tema. Te dejo un tablero donde ves qué se elogia, qué se critica y cómo evoluciona el ánimo, para que actúes sobre lo que de verdad importa.",
    proceso: [
      { paso: "Reúno las opiniones", detalle: "Concentro reseñas, comentarios y menciones de tus distintas fuentes en un solo lugar." },
      { paso: "Detecto sentimiento y temas", detalle: "El modelo clasifica cada texto entre positivo, neutro o negativo y agrupa los temas recurrentes." },
      { paso: "Te lo muestro en el tiempo", detalle: "Un tablero te muestra qué se valora, qué molesta y cómo cambia la percepción mes a mes." },
    ],
    resultados: [
      "Una lectura clara de cientos de opiniones",
      "Problemas detectados antes de que escalen",
      "Decisiones guiadas por lo que dicen tus clientes",
    ],
    senales: [
      "Acumulás reseñas y comentarios que nadie procesa",
      "Te enterás tarde de un problema recurrente",
      "Tu idea de qué piensan los clientes es solo una impresión",
    ],
    paraQuien: "Marcas, comercios y servicios con presencia en reseñas y redes.",
    prueba: { label: "Cómo analizo texto", href: "/ia-agentes/llms-prompting" },
  },
  {
    slug: "lead-scoring",
    icon: "target",
    titulo: "Priorizar los leads que de verdad compran",
    dolor: "Ventas persigue a todos los contactos por igual y pierde tiempo.",
    resumen: "Un sistema que le pone puntaje a cada lead según su probabilidad de comprar, para que tu equipo arranque por los que valen la pena.",
    problema: "Cuando todos los contactos parecen iguales, ventas se desgasta llamando a curiosos que nunca iban a cerrar, mientras los que estaban listos para comprar se enfrían esperando.",
    ejemplo: "Una inmobiliaria recibe 200 consultas por semana. El vendedor las contesta en orden de llegada y para cuando atiende al que tenía la plata y las ganas, ya compró en otro lado.",
    queHago: "Cruzo tu historial de contactos que sí compraron contra los que no, encuentro qué tienen en común los buenos y armo un puntaje automático que ordena tu lista de mayor a menor probabilidad.",
    proceso: [
      { paso: "Estudio tus cierres", detalle: "Miramos qué leads terminaron comprando y qué los diferenciaba del resto." },
      { paso: "Armo el puntaje", detalle: "Entreno un modelo que le asigna a cada contacto una probabilidad de compra." },
      { paso: "Te ordeno la lista", detalle: "Ventas recibe los contactos rankeados y ataca primero a los más calientes." },
    ],
    resultados: [
      "Ventas dedica el tiempo a quien sí va a comprar",
      "Más cierres con el mismo equipo",
      "Menos contactos buenos que se enfrían en la cola",
    ],
    senales: [
      "Tu equipo contesta los leads por orden de llegada",
      "Sentís que se pierden oportunidades por falta de tiempo",
      "No sabés cuáles de tus contactos valen la pena perseguir",
    ],
    paraQuien: "Equipos comerciales, inmobiliarias y negocios con muchas consultas entrantes.",
    prueba: { label: "Cómo lo predigo", href: "/data-ml/mineria-de-datos" },
  },
  {
    slug: "resumen-de-reuniones",
    icon: "mic",
    titulo: "Resúmenes y tareas de cada reunión, solos",
    dolor: "Lo que se habla en las reuniones se pierde o nadie lo pasa en limpio.",
    resumen: "Un sistema que escucha la reunión y te devuelve un resumen claro con los temas tratados y las tareas que quedaron, sin que nadie tome nota.",
    problema: "En las reuniones se deciden cosas importantes, pero a la semana nadie se acuerda qué se acordó ni quién quedó a cargo de qué. Lo que no quedó escrito, no pasó.",
    ejemplo: "Una agencia tiene tres reuniones con clientes por día. Cada una deja compromisos, pero al no anotarlos en el momento, la mitad se olvida y el cliente reclama lo que se había prometido.",
    queHago: "Tomo el audio de la reunión, lo paso a texto, identifico de qué se habló y extraigo las tareas con su responsable. Te llega un resumen ordenado apenas termina el encuentro.",
    proceso: [
      { paso: "Capto el audio", detalle: "El sistema toma la grabación de la reunión y la transcribe completa." },
      { paso: "Entiendo lo hablado", detalle: "Separo los temas importantes y detecto los compromisos que se asumieron." },
      { paso: "Te lo entrego listo", detalle: "Recibís un resumen con puntos clave y tareas asignadas, sin escribir una línea." },
    ],
    resultados: [
      "Cada reunión queda documentada sin esfuerzo",
      "Las tareas quedan claras y con responsable",
      "Nadie pierde tiempo pasando notas en limpio",
    ],
    senales: [
      "Salís de las reuniones sin un registro claro",
      "Se repiten discusiones porque nadie anotó lo anterior",
      "Las tareas que se acordaron se diluyen con los días",
    ],
    paraQuien: "Agencias, equipos de proyecto y cualquiera con muchas reuniones semanales.",
    prueba: { label: "Cómo proceso el audio", href: "/ia-agentes/procesamiento-habla" },
  },
  {
    slug: "optimizacion-de-rutas",
    icon: "map",
    titulo: "Optimizar rutas de reparto y visitas",
    dolor: "Planificás los recorridos a mano y gastás de más en tiempo y combustible.",
    resumen: "Un sistema que arma el mejor orden de paradas para tus repartos o visitas, recortando kilómetros, horas y combustible.",
    problema: "Planificar recorridos a ojo casi siempre deja vueltas innecesarias, zonas mal agrupadas y choferes que vuelven tarde. Cada kilómetro de más es nafta y tiempo que pagás sin necesidad.",
    ejemplo: "Una distribuidora reparte a 40 clientes por día. El encargado arma el recorrido como puede y los camiones cruzan la ciudad dos veces porque las paradas no estaban bien ordenadas.",
    queHago: "Tomo tus direcciones, restricciones y horarios, y calculo el orden de paradas que minimiza distancia y tiempo. Le entrego a cada chofer un recorrido optimizado, listo para salir.",
    proceso: [
      { paso: "Junto tus paradas", detalle: "Cargamos las direcciones, ventanas horarias y la capacidad de cada vehículo." },
      { paso: "Calculo el mejor recorrido", detalle: "El sistema busca entre miles de combinaciones la ruta más corta y eficiente." },
      { paso: "Te lo paso al chofer", detalle: "Cada vehículo sale con su orden de paradas optimizado." },
    ],
    resultados: [
      "Menos kilómetros y menos gasto de combustible",
      "Más entregas o visitas en la misma jornada",
      "Recorridos que se arman solos, sin planillas a mano",
    ],
    senales: [
      "Armás los recorridos a mano todos los días",
      "Tus vehículos hacen vueltas que parecen evitables",
      "El combustible y las horas extra se te van de las manos",
    ],
    paraQuien: "Distribuidoras, logística, servicios a domicilio y equipos de visitas comerciales.",
    prueba: { label: "La lógica de búsqueda", href: "/ia-agentes/busqueda-heuristica" },
  },
  {
    slug: "mantenimiento-predictivo",
    icon: "tool",
    titulo: "Predecir fallas antes de que paren la producción",
    dolor: "Tus equipos fallan sin aviso y cada parada te cuesta carísimo.",
    resumen: "Un sistema que vigila tus máquinas y avisa cuando algo empieza a comportarse raro, para que repares antes de que se rompa.",
    problema: "Esperar a que una máquina se rompa para arreglarla significa producción parada, pedidos atrasados y reparaciones de urgencia que salen el doble. La falla casi siempre da señales antes, pero nadie las está mirando.",
    ejemplo: "Una planta tiene un motor clave que se recalienta de a poco durante días. Nadie lo nota hasta que se funde en plena jornada y frena toda la línea por dos días.",
    queHago: "Tomo los datos de tus equipos —temperatura, vibración, consumo— y entreno un modelo que aprende cómo se ven funcionando bien. Cuando empiezan a desviarse de ese patrón, te avisa.",
    proceso: [
      { paso: "Conecto los datos", detalle: "Recolectamos las mediciones de tus máquinas funcionando con normalidad." },
      { paso: "Aprendo lo normal", detalle: "El modelo entiende el comportamiento sano de cada equipo." },
      { paso: "Te aviso a tiempo", detalle: "Cuando algo se desvía del patrón, recibís una alerta para intervenir antes de la falla." },
    ],
    resultados: [
      "Menos paradas inesperadas de producción",
      "Reparaciones planificadas en vez de urgencias caras",
      "Vida más larga para tus equipos",
    ],
    senales: [
      "Tus máquinas fallan sin previo aviso",
      "Cada parada te frena pedidos y te cuesta plata",
      "Hacés mantenimiento por calendario, no por necesidad real",
    ],
    paraQuien: "Plantas industriales, producción y cualquier negocio que dependa de maquinaria.",
    prueba: { label: "Cómo detecto la señal", href: "/data-ml/deteccion-anomalias" },
  },
  {
    slug: "buscador-semantico",
    icon: "search",
    titulo: "Que encuentren lo que buscan en tu sitio",
    dolor: "Tu buscador interno no entiende lo que la gente realmente pide.",
    resumen: "Un buscador que entiende la intención detrás de las palabras, así la gente encuentra lo que busca aunque no use el término exacto.",
    problema: "Los buscadores comunes solo matchean palabras idénticas. Si alguien escribe 'zapatillas para correr' y vos lo cargaste como 'calzado running', no aparece nada y esa persona se va a comprar a otro lado.",
    ejemplo: "Un e-commerce de muebles tiene un sofá cargado como 'sillón modular', pero los clientes buscan 'sillón para living grande' y el buscador les devuelve cero resultados.",
    queHago: "Reemplazo la búsqueda por palabra exacta por una que entiende significado. Convierto tus productos y las consultas en representaciones que captan la intención, así matchea por lo que la gente quiere decir.",
    proceso: [
      { paso: "Mapeo tu catálogo", detalle: "Convierto tus productos o contenidos en representaciones que capturan su significado." },
      { paso: "Interpreto la consulta", detalle: "Cuando alguien busca, entiendo qué quiere decir aunque use otras palabras." },
      { paso: "Devuelvo lo que importa", detalle: "El buscador muestra resultados por intención, no por coincidencia literal de texto." },
    ],
    resultados: [
      "La gente encuentra lo que busca a la primera",
      "Menos búsquedas sin resultados y menos abandonos",
      "Más ventas de productos que antes quedaban escondidos",
    ],
    senales: [
      "Tu buscador devuelve 'sin resultados' demasiado seguido",
      "Los clientes no encuentran productos que sí tenés",
      "Sospechás que perdés ventas en el propio buscador",
    ],
    paraQuien: "E-commerce, catálogos grandes y sitios con mucho contenido o productos.",
    prueba: { label: "Cómo funciona (embeddings)", href: "/ia-agentes/rag-embeddings" },
  },
  {
    slug: "descripciones-de-producto",
    icon: "edit",
    titulo: "Generar descripciones de producto a escala",
    dolor: "Tenés miles de productos sin descripción o con textos pobres.",
    resumen: "Genero descripciones que venden para todo tu catálogo, en tu tono y a la velocidad que necesitás.",
    problema: "Escribir a mano producto por producto es eterno, así que la mayoría quedan sin texto o con una línea genérica copiada del proveedor. Eso te baja el posicionamiento en Google y le complica la decisión al que está por comprar.",
    ejemplo: "Una ferretería online con 8.000 artículos donde la mitad dice solo 'Tornillo 5mm' y nadie tiene tiempo de redactar el resto.",
    queHago: "Armo un sistema que toma los datos de cada producto (nombre, categoría, atributos) y arma una descripción clara, con tu estilo y pensada para que aparezca en las búsquedas. Lo corro sobre todo el catálogo de una.",
    proceso: [
      { paso: "Defino el estilo", detalle: "Acordamos tono, largo y qué tiene que destacar cada ficha." },
      { paso: "Lo conecto a tu catálogo", detalle: "Tomo los datos que ya tenés cargados y armo las descripciones en lote." },
      { paso: "Te lo dejo revisable", detalle: "Quedan listas para subir, con una pasada de control antes de publicar." },
    ],
    resultados: ["Catálogo completo en días, no en meses", "Textos pensados para aparecer en Google", "Mismo tono en toda la tienda"],
    senales: ["Mitad del catálogo sin descripción", "Copiás los textos del proveedor", "No das abasto para redactar a mano"],
    paraQuien: "E-commerce y catálogos grandes que necesitan fichas a escala.",
    prueba: { label: "Cómo genero texto", href: "/ia-agentes/llms-prompting" },
  },
  {
    slug: "monitoreo-de-competencia",
    icon: "eye",
    titulo: "Vigilar precios y movidas de la competencia",
    dolor: "No sabés a qué precio vende la competencia ni cuándo cambia.",
    resumen: "Un sistema que mira a tus competidores todos los días y te avisa cuando algo cambia.",
    problema: "Chequear precios de la competencia a mano es tedioso y se hace una vez cada tanto. Para cuando te enterás de que bajaron un producto clave, ya perdiste ventas o quedaste caro sin darte cuenta.",
    ejemplo: "Una tienda de electro que se entera tarde de que el competidor liquidó heladeras y se quedó vendiendo al precio viejo todo el fin de semana.",
    queHago: "Configuro un proceso que revisa de forma automática los precios y publicaciones que te interesan, los guarda día a día y te manda un aviso cuando hay un cambio relevante.",
    proceso: [
      { paso: "Elegimos qué seguir", detalle: "Definimos competidores, productos y qué considerás un cambio importante." },
      { paso: "Lo dejo corriendo solo", detalle: "El sistema recolecta los datos todos los días sin que toques nada." },
      { paso: "Te llega el aviso", detalle: "Recibís alertas y un tablero con la evolución de cada precio." },
    ],
    resultados: ["Reaccionás el mismo día que cambia el mercado", "Decisiones de precio con datos frescos", "Cero tiempo perdido chequeando a mano"],
    senales: ["Mirás precios de la competencia a ojo", "Te enterás tarde de las ofertas ajenas", "Ajustás precios por intuición"],
    paraQuien: "Comercios y e-commerce en mercados donde el precio se mueve seguido.",
    prueba: { label: "Sobre automatización", href: "/hiperautomatizacion" },
  },
  {
    slug: "analisis-de-encuestas",
    icon: "clipboard",
    titulo: "Leer todas las respuestas abiertas de tus encuestas",
    dolor: "Juntás cientos de respuestas abiertas (NPS, encuestas) que nadie analiza.",
    resumen: "Convierto montañas de respuestas escritas en los temas concretos que tus clientes te están diciendo.",
    problema: "Las preguntas de opción múltiple se leen fácil, pero los comentarios libres se acumulan sin que nadie los procese. Ahí suele estar lo más valioso: por qué se quejan, qué piden, qué los hizo recomendarte.",
    ejemplo: "Un servicio que manda NPS cada mes, junta 600 comentarios y termina leyendo de apuro los primeros diez antes de archivar el resto.",
    queHago: "Tomo todas las respuestas abiertas y las agrupo por tema, separo lo positivo de lo negativo y te muestro qué problemas se repiten y cuánto pesa cada uno.",
    proceso: [
      { paso: "Junto las respuestas", detalle: "Tomo lo que tengas, de la plataforma de encuestas o una planilla." },
      { paso: "Agrupo por tema", detalle: "Detecto los asuntos recurrentes y el sentimiento de cada comentario." },
      { paso: "Te muestro el panorama", detalle: "Quedan los temas ordenados por frecuencia en un informe claro." },
    ],
    resultados: ["Sabés qué se repite y cuánto", "Priorizás mejoras con evidencia", "Aprovechás respuestas que hoy se pierden"],
    senales: ["Tenés comentarios que nadie lee", "Leés solo una muestra al azar", "Intuís el problema pero no lo podés mostrar"],
    paraQuien: "Empresas con encuestas, NPS o feedback escrito que se acumula.",
    prueba: { label: "Cómo analizo texto", href: "/ia-agentes/llms-prompting" },
  },
  {
    slug: "recuperacion-de-carritos",
    icon: "cart",
    titulo: "Detectar y recuperar carritos que no se compran",
    dolor: "Se llenan carritos que se abandonan y no sabés a quién ni cuándo insistir.",
    resumen: "Detecto quién está por abandonar la compra y te marco a quién conviene contactar para cerrarla.",
    problema: "Mucha gente arma el carrito y se va sin pagar. Mandarle un recordatorio a todos por igual molesta y rinde poco; la clave es saber quién tiene chances reales de volver y en qué momento.",
    ejemplo: "Un e-commerce de cosmética donde tres de cada cuatro carritos quedan sin cerrar y el mismo mail de 'volvé a tu compra' va para todos sin distinción.",
    queHago: "Analizo el comportamiento de cada visitante y le pongo un puntaje de probabilidad de compra. Con eso definimos a quién contactar, cuándo y con qué mensaje, para no disparar al voleo.",
    proceso: [
      { paso: "Miro el comportamiento", detalle: "Tomo tu historial de carritos y qué hizo cada usuario." },
      { paso: "Estimo quién vuelve", detalle: "Entreno un modelo que calcula la probabilidad de que termine comprando." },
      { paso: "Te marco la acción", detalle: "Definimos a quién contactar y en qué momento para recuperarlo." },
    ],
    resultados: ["Más carritos convertidos en venta", "Contactás solo a quien conviene", "Menos mensajes que molestan de gusto"],
    senales: ["Muchos carritos quedan sin pagar", "Mandás el mismo recordatorio a todos", "No sabés cuándo insistir"],
    paraQuien: "Tiendas online con tráfico y carritos que se abandonan seguido.",
    prueba: { label: "Cómo lo predigo", href: "/data-ml/mineria-de-datos" },
  },
  {
    slug: "agente-que-actua",
    icon: "cpu",
    titulo: "Un agente que no solo responde: hace",
    dolor: "Querés un asistente que ejecute tareas —agendar, consultar, cargar—, no solo que conteste.",
    resumen: "Un asistente que entiende lo que le pedís y lo ejecuta de verdad en tus sistemas.",
    problema: "Un chatbot común te contesta y ahí queda; la acción la tenés que hacer vos a mano. Lo que mueve la aguja es que el asistente agende la reunión, consulte el stock o cargue el pedido sin que nadie intervenga.",
    ejemplo: "Una clínica donde el paciente escribe 'quiero turno el jueves a la tarde' y el asistente revisa la agenda, reserva el horario y confirma, sin pasar por recepción.",
    queHago: "Armo un agente conectado a tus herramientas (agenda, base de datos, sistema de pedidos) con permisos claros, para que interprete el pedido y haga la tarea de punta a punta.",
    proceso: [
      { paso: "Defino qué puede hacer", detalle: "Listamos las tareas y a qué sistemas necesita acceder." },
      { paso: "Lo conecto y le pongo límites", detalle: "Lo integro a tus herramientas con permisos y reglas claras." },
      { paso: "Lo pongo a trabajar", detalle: "Queda resolviendo pedidos solo, con registro de cada acción." },
    ],
    resultados: ["Tareas resueltas sin intervención manual", "Atención disponible las 24 horas", "Tu equipo libre de lo repetitivo"],
    senales: ["Tu chatbot solo contesta y no resuelve", "Repetís tareas que podría hacer un asistente", "Perdés consultas fuera de horario"],
    paraQuien: "Negocios con tareas repetitivas y sistemas que se pueden conectar.",
    prueba: { label: "Cómo son los agentes", href: "/ia-agentes/agentes" },
  },
  {
    slug: "control-de-calidad-visual",
    icon: "camera",
    titulo: "Control de calidad por imagen",
    dolor: "Revisás calidad a ojo, pieza por pieza, y se escapan defectos.",
    resumen: "Una cámara que mira cada pieza y marca las que tienen fallas, sin frenar la línea.",
    problema: "El control manual depende de cuán cansado esté quien revisa. A última hora del turno o con volumen alto, los defectos pasan y llegan al cliente. Y revisar todo en serio es lento y caro.",
    ejemplo: "Un taller que arma muebles y recién se entera del rayón o la veta mal cortada cuando el cliente abre la caja y reclama.",
    queHago: "Junto fotos de piezas buenas y con falla, y entreno un modelo que aprende a distinguirlas. Lo conecto a una cámara sobre la línea para que marque al instante lo que no pasa.",
    proceso: [
      { paso: "Armo el muestrario", detalle: "Reunimos fotos de piezas correctas y de cada tipo de defecto." },
      { paso: "Entreno el ojo", detalle: "El modelo aprende a ver la diferencia entre una pieza buena y una fallada." },
      { paso: "Lo pongo en la línea", detalle: "Queda mirando en vivo y avisa cuál apartar." },
    ],
    resultados: ["Menos defectos que llegan al cliente", "Revisión pareja a toda hora", "Registro de qué falló y cuándo"],
    senales: ["Revisás todo a mano", "Te llegan reclamos por fallas evitables", "El control depende de quién esté de turno"],
    paraQuien: "Producción, fábricas y talleres con control visual de calidad.",
    prueba: { label: "Cómo ve una CNN", href: "/ia-agentes/vision" },
  },
  {
    slug: "analisis-de-llamadas",
    icon: "phone",
    titulo: "Entender qué pasa en tus llamadas",
    dolor: "No sabés qué se dice realmente en las llamadas de ventas o soporte.",
    resumen: "Convierto tus llamadas en texto y las analizo para ver qué funciona y qué se traba.",
    problema: "Las llamadas son una mina de información que se pierde apenas cuelgan. Nadie tiene tiempo de escuchar cientos de grabaciones, así que las objeciones que se repiten, los motivos de queja y lo que cierra ventas quedan invisibles.",
    ejemplo: "Un call center donde el mismo reclamo aparece en decenas de llamadas, pero como nadie las escucha juntas, nunca se ataca la causa.",
    queHago: "Transcribo las llamadas a texto y las proceso para detectar temas, objeciones, tono y motivos de contacto. Te lo dejo resumido en un tablero por período y por agente.",
    proceso: [
      { paso: "Paso audio a texto", detalle: "Transcribo las grabaciones de forma automática." },
      { paso: "Busco los patrones", detalle: "Detecto temas que se repiten, objeciones y momentos clave." },
      { paso: "Te lo muestro claro", detalle: "Resumen por agente, motivo y tendencia en un tablero." },
    ],
    resultados: ["Sabés por qué te llaman de verdad", "Detectás objeciones que frenan ventas", "Capacitás con datos, no con suposiciones"],
    senales: ["Tenés grabaciones que nadie escucha", "No sabés por qué se caen las ventas", "Los reclamos se repiten sin solución"],
    paraQuien: "Ventas, soporte y call centers con llamadas grabadas.",
    prueba: { label: "Cómo proceso el audio", href: "/ia-agentes/procesamiento-habla" },
  },
  {
    slug: "visibilidad-en-buscadores",
    icon: "globe",
    titulo: "Aparecer en Google y cuando le preguntan a la IA",
    dolor: "No aparecés cuando te buscan, ni cuando alguien le pregunta a ChatGPT o Gemini.",
    resumen: "Trabajo tu presencia para que te encuentren en Google y te mencionen los asistentes de IA.",
    problema: "Cada vez más gente busca proveedores preguntándole directo a un asistente. Si tu sitio no está bien armado ni tiene contenido que responda lo que buscan, no aparecés en Google ni te recomienda la IA. Te ganan los que sí trabajaron eso.",
    ejemplo: "Una consultora que existe hace años pero cuando alguien le pregunta a ChatGPT 'quién hace esto en mi ciudad', nunca la nombra.",
    queHago: "Reviso cómo te ve Google y qué dicen de vos los asistentes, detecto qué falta y armo el contenido y los ajustes técnicos para que te encuentren por los términos que importan.",
    proceso: [
      { paso: "Mido dónde estás", detalle: "Veo cómo aparecés hoy en buscadores y en respuestas de IA." },
      { paso: "Encuentro los huecos", detalle: "Detecto qué buscan tus clientes y qué contenido te falta." },
      { paso: "Construyo presencia", detalle: "Armo contenido y ajustes para que te encuentren y te citen." },
    ],
    resultados: ["Más visibilidad en Google", "Te empiezan a mencionar los asistentes de IA", "Te encuentran por los términos que te interesan"],
    senales: ["No aparecés cuando te buscan", "La IA nunca te nombra", "Dependés del boca a boca para que te conozcan"],
    paraQuien: "Negocios y profesionales que quieren que los encuentren online.",
  },
  {
    slug: "clasificacion-de-catalogo",
    icon: "layers",
    titulo: "Categorizar y etiquetar tu catálogo solo",
    dolor: "Categorizar y etiquetar miles de productos a mano es interminable.",
    resumen: "Un sistema que ordena, categoriza y etiqueta tu catálogo automáticamente.",
    problema: "Cargar y clasificar productos a mano consume horas y siempre queda disparejo: el mismo artículo termina en dos categorías distintas según quién lo cargó. Eso ensucia el catálogo y hace que el cliente no encuentre lo que busca.",
    ejemplo: "Un e-commerce con diez mil productos donde los buzos aparecen unos en 'abrigo' y otros en 'invierno', y el filtro del sitio se vuelve un caos.",
    queHago: "Tomo la descripción y los datos de cada producto y entreno un modelo que los clasifica y etiqueta según tus categorías. Procesa el catálogo entero y mantiene un criterio parejo.",
    proceso: [
      { paso: "Defino el criterio", detalle: "Acordamos las categorías y etiquetas que usás." },
      { paso: "Entreno el clasificador", detalle: "El modelo aprende a ubicar cada producto donde va." },
      { paso: "Proceso todo el catálogo", detalle: "Etiqueta lo que tenés y lo nuevo que entra." },
    ],
    resultados: ["Catálogo ordenado y consistente", "Horas de carga manual que recuperás", "El cliente encuentra lo que busca"],
    senales: ["Clasificás productos a mano", "El mismo ítem queda en categorías distintas", "Tu catálogo creció más rápido que tu equipo"],
    paraQuien: "E-commerce, marketplaces y distribuidoras con catálogos grandes.",
    prueba: { label: "Cómo clasifico", href: "/data-ml/mineria-de-datos" },
  },
  {
    slug: "alertas-de-kpis",
    icon: "bell",
    titulo: "Que te avisen cuando un número se sale de control",
    dolor: "Te enterás tarde de que una métrica clave se cayó.",
    resumen: "Un sistema que vigila tus números clave y te avisa apenas algo se desvía.",
    problema: "Para cuando alguien abre el reporte de fin de mes, la venta ya cayó tres semanas seguidas o el costo se disparó. Mirar tableros todos los días no escala, y los desvíos importantes aparecen cuando ya hicieron daño.",
    ejemplo: "Un negocio que recién al cerrar el mes descubre que las ventas web venían cayendo desde una falla en el checkout que nadie notó.",
    queHago: "Conecto tus métricas clave y armo un sistema que aprende su comportamiento normal. Cuando un número se sale de lo esperado, te llega un aviso al instante por donde lo mires.",
    proceso: [
      { paso: "Elijo qué vigilar", detalle: "Definimos las métricas que de verdad importan." },
      { paso: "Aprendo lo normal", detalle: "El sistema entiende cómo se comporta cada número y su variación esperable." },
      { paso: "Te aviso a tiempo", detalle: "Cuando algo se desvía, llega la alerta donde la veas." },
    ],
    resultados: ["Reaccionás a tiempo, no al cierre de mes", "Menos sorpresas en los números", "Dejás de vivir pegado a los tableros"],
    senales: ["Te enterás tarde de las caídas", "Revisás reportes a mano todos los días", "Un problema chico crece sin que nadie lo vea"],
    paraQuien: "Negocios que siguen ventas, costos o tráfico de cerca.",
    prueba: { label: "Cómo detecto lo raro", href: "/data-ml/deteccion-anomalias" },
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
