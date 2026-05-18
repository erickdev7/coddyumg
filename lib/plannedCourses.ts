export type PlannedModule = {
  title: string;
  goal: string;
  lessons: string[];
  project: string;
};

export type PlannedCourse = {
  category: string;
  description: string;
  evaluations: string[];
  exercises: string[];
  modules: PlannedModule[];
  challenges: string[];
  title: string;
};

export const plannedCourses: Record<string, PlannedCourse> = {
  csharp: {
    category: 'Programacion Basica',
    title: 'C#',
    description: 'Ruta preparada para sintaxis de C#, POO, colecciones, LINQ, archivos y APIs con .NET.',
    modules: [
      { title: 'Sintaxis y tipos', goal: 'Dominar variables, operadores, consola y control de flujo.', lessons: ['Variables, tipos y consola', 'Condicionales y ciclos'], project: 'Calculadora de notas en consola.' },
      { title: 'Funciones y colecciones', goal: 'Organizar codigo con metodos, arreglos, listas y diccionarios.', lessons: ['Metodos y parametros', 'List, Dictionary y foreach'], project: 'Registro simple de alumnos.' },
      { title: 'POO con C#', goal: 'Crear clases con propiedades, constructores, encapsulacion y herencia.', lessons: ['Clases, objetos y propiedades', 'Herencia e interfaces'], project: 'Sistema de productos con validaciones.' },
      { title: 'Datos y archivos', goal: 'Trabajar con archivos, excepciones, LINQ y serializacion basica.', lessons: ['try/catch y archivos', 'LINQ y consultas sobre colecciones'], project: 'Reporte de ventas desde archivo.' },
      { title: '.NET y APIs', goal: 'Preparar fundamentos para construir endpoints y servicios web.', lessons: ['Servicios y arquitectura', 'Introduccion a ASP.NET Web API'], project: 'API basica de tareas.' },
    ],
    exercises: ['Promedio de notas', 'Filtro de productos', 'Clase CuentaBancaria', 'Lectura de archivo CSV', 'Endpoint conceptual de tareas'],
    challenges: ['Validador de contrasenas', 'Agenda con busqueda', 'Inventario con POO', 'Reporte con LINQ', 'Mini API documentada'],
    evaluations: ['Quiz de sintaxis', 'Quiz de colecciones', 'Quiz de POO', 'Quiz de datos', 'Evaluacion final C#'],
  },
  'database-fundamentals': {
    category: 'Bases de datos',
    title: 'Fundamentos de Bases de Datos',
    description: 'Ruta para modelar, consultar y administrar informacion estructurada desde cero.',
    modules: [
      { title: 'Conceptos base', goal: 'Entender datos, tablas, registros, campos y relaciones.', lessons: ['Que es una base de datos', 'Tablas, campos y tipos'], project: 'Inventario modelado en tablas.' },
      { title: 'Modelo relacional', goal: 'Crear relaciones con llaves primarias y foraneas.', lessons: ['Llaves primarias y foraneas', 'Cardinalidad y relaciones'], project: 'Modelo de cursos y alumnos.' },
      { title: 'Normalizacion', goal: 'Reducir duplicidad y mejorar consistencia.', lessons: ['Primera y segunda forma normal', 'Tercera forma normal'], project: 'Normalizar ventas de una tienda.' },
      { title: 'SQL basico', goal: 'Consultar, insertar, actualizar y eliminar registros.', lessons: ['SELECT, INSERT y UPDATE', 'WHERE, ORDER BY y LIMIT'], project: 'Consultas de alumnos aprobados.' },
      { title: 'PostgreSQL y Supabase', goal: 'Preparar tablas para aplicaciones web.', lessons: ['Esquemas e indices basicos', 'Supabase como backend'], project: 'Tabla de contenido educativo.' },
    ],
    exercises: ['Crear diagrama ER', 'Definir llaves', 'Normalizar una tabla', 'Consultar registros', 'Crear tabla en Supabase'],
    challenges: ['Modelo de biblioteca', 'Sistema de inscripciones', 'Reporte de ventas', 'Migracion de datos sucios', 'Diseno completo de BD'],
    evaluations: ['Conceptos de BD', 'Relaciones', 'Normalizacion', 'SQL basico', 'Evaluacion final de BD'],
  },
  'sql-intermediate': {
    category: 'Bases de datos',
    title: 'SQL Intermedio',
    description: 'Ruta para consultas mas expresivas con joins, agregaciones, vistas, indices y transacciones.',
    modules: [
      { title: 'Joins', goal: 'Combinar datos de varias tablas.', lessons: ['INNER y LEFT JOIN', 'Alias y relaciones multiples'], project: 'Reporte de alumnos por curso.' },
      { title: 'Agregaciones', goal: 'Resumir informacion con funciones de grupo.', lessons: ['COUNT, SUM y AVG', 'GROUP BY y HAVING'], project: 'Dashboard de ventas.' },
      { title: 'Subconsultas y vistas', goal: 'Encapsular consultas reutilizables.', lessons: ['Subconsultas', 'Vistas y seguridad'], project: 'Vista de progreso por alumno.' },
      { title: 'Indices', goal: 'Mejorar busquedas y ordenar datos estrategicamente.', lessons: ['Indices simples', 'Analisis de consultas'], project: 'Optimizar busqueda de contenido.' },
      { title: 'Transacciones', goal: 'Mantener integridad en operaciones relacionadas.', lessons: ['BEGIN, COMMIT y ROLLBACK', 'Buenas practicas'], project: 'Registro seguro de compra.' },
    ],
    exercises: ['Join de alumnos y cursos', 'Promedio por grupo', 'Vista publicada', 'Indice por correo', 'Transaccion de inscripcion'],
    challenges: ['Reporte academico', 'Consulta con HAVING', 'Vista para docente', 'Optimizar busqueda lenta', 'Flujo de pago transaccional'],
    evaluations: ['Joins', 'Agregaciones', 'Vistas', 'Indices', 'Evaluacion final SQL'],
  },
  'database-advanced': {
    category: 'Bases de datos',
    title: 'Bases de Datos Avanzadas',
    description: 'Ruta para administrar bases de datos en escenarios reales: rendimiento, integridad, seguridad, respaldo y operacion.',
    modules: [
      { title: 'Optimizacion de consultas', goal: 'Leer planes de ejecucion y detectar cuellos de botella.', lessons: ['EXPLAIN y query planner', 'Indices compuestos y parciales'], project: 'Optimizar consultas lentas de un panel academico.' },
      { title: 'Transacciones y concurrencia', goal: 'Proteger la integridad cuando varios usuarios operan al mismo tiempo.', lessons: ['Aislamiento y bloqueos', 'Deadlocks y reintentos'], project: 'Flujo transaccional de inscripcion.' },
      { title: 'Seguridad y auditoria', goal: 'Aplicar roles, permisos, politicas y bitacoras.', lessons: ['Roles y privilegios', 'Auditoria y trazabilidad'], project: 'Modelo de permisos para docente/alumno.' },
      { title: 'Respaldo y recuperacion', goal: 'Planificar backups, restauraciones y pruebas de continuidad.', lessons: ['Backups logicos y fisicos', 'RPO, RTO y restauracion'], project: 'Plan de recuperacion para plataforma educativa.' },
      { title: 'Escalabilidad y operacion', goal: 'Preparar bases para monitoreo, replicacion y crecimiento.', lessons: ['Replicacion y particionamiento', 'Monitoreo y mantenimiento'], project: 'Plan operativo de base de datos en produccion.' },
    ],
    exercises: ['Interpretar EXPLAIN', 'Crear indice compuesto', 'Simular transaccion segura', 'Definir rol de lectura', 'Plan de backup verificable'],
    challenges: ['Optimizar reporte pesado', 'Resolver conflicto de concurrencia', 'Auditoria de cambios sensibles', 'Restauracion ante incidente', 'Plan de escalabilidad'],
    evaluations: ['Query planner', 'Concurrencia', 'Seguridad', 'Backups', 'Evaluacion final BD avanzada'],
  },
  'network-fundamentals': {
    category: 'Redes',
    title: 'Fundamentos de Redes',
    description: 'Ruta base para entender comunicacion, direccionamiento, subredes y diagnostico.',
    modules: [
      { title: 'Modelos de red', goal: 'Relacionar OSI, TCP/IP y encapsulamiento.', lessons: ['Modelo OSI', 'TCP/IP y puertos'], project: 'Mapa de comunicacion cliente-servidor.' },
      { title: 'Direccionamiento IP', goal: 'Calcular redes, hosts y mascaras.', lessons: ['IPv4 y mascaras', 'Subnetting basico'], project: 'Plan de direccionamiento para laboratorio.' },
      { title: 'Servicios esenciales', goal: 'Comprender DNS, DHCP, HTTP y SSH.', lessons: ['DNS y DHCP', 'HTTP, HTTPS y SSH'], project: 'Diagrama de servicios de una red.' },
      { title: 'Routing y switching', goal: 'Entender rutas, gateways, VLANs y segmentos.', lessons: ['Gateway y rutas', 'Switching y VLANs'], project: 'Segmentacion de red academica.' },
      { title: 'Diagnostico', goal: 'Usar herramientas para encontrar fallas comunes.', lessons: ['ping, tracert y nslookup', 'Lectura de sintomas'], project: 'Checklist de diagnostico.' },
    ],
    exercises: ['Identificar capas OSI', 'Calcular subred', 'Resolver DNS', 'Trazar ruta', 'Diagnosticar conectividad'],
    challenges: ['Red para laboratorio', 'Plan de subredes', 'Falla DNS', 'Segmentacion segura', 'Caso completo de diagnostico'],
    evaluations: ['Modelo OSI', 'Subnetting', 'Servicios', 'Routing', 'Evaluacion final Redes'],
  },
  'network-services': {
    category: 'Redes',
    title: 'Servicios de Red',
    description: 'Ruta para planificar y operar servicios comunes de infraestructura.',
    modules: [
      { title: 'DNS', goal: 'Entender nombres, registros y resolucion.', lessons: ['Registros A, CNAME y MX', 'Resolucion y cache'], project: 'Mapa DNS de una app.' },
      { title: 'DHCP', goal: 'Asignar direcciones de forma controlada.', lessons: ['Rangos y reservas', 'Opciones comunes'], project: 'Plan DHCP para oficina.' },
      { title: 'Web y proxy', goal: 'Comprender HTTP, HTTPS y proxy inverso.', lessons: ['Servidor web', 'TLS y proxy'], project: 'Publicacion conceptual de sitio.' },
      { title: 'Acceso remoto', goal: 'Usar SSH y politicas basicas.', lessons: ['SSH seguro', 'Usuarios y llaves'], project: 'Politica de acceso remoto.' },
      { title: 'Monitoreo', goal: 'Preparar alertas y bitacoras utiles.', lessons: ['Logs y metricas', 'Disponibilidad'], project: 'Tablero de monitoreo basico.' },
    ],
    exercises: ['Definir registros DNS', 'Configurar rango DHCP', 'Explicar HTTPS', 'Crear politica SSH', 'Definir alerta'],
    challenges: ['Dominio institucional', 'Migracion de DHCP', 'Proxy para app', 'Acceso remoto seguro', 'Plan de monitoreo'],
    evaluations: ['DNS', 'DHCP', 'Web', 'SSH', 'Evaluacion final Servicios'],
  },
  frontend: {
    category: 'Desarrollo Web',
    title: 'Frontend',
    description: 'Ruta para construir interfaces web responsivas con HTML, CSS, JavaScript y React.',
    modules: [
      { title: 'HTML semantico', goal: 'Estructurar contenido accesible.', lessons: ['Etiquetas y secciones', 'Formularios'], project: 'Pagina de perfil academico.' },
      { title: 'CSS responsive', goal: 'Crear layouts adaptables y consistentes.', lessons: ['Flexbox y Grid', 'Responsive design'], project: 'Dashboard responsive.' },
      { title: 'JavaScript', goal: 'Manipular datos, eventos y estado basico.', lessons: ['Funciones y arrays', 'DOM y eventos'], project: 'Lista interactiva de tareas.' },
      { title: 'React', goal: 'Crear componentes reutilizables.', lessons: ['Componentes y props', 'Estado y efectos'], project: 'Catalogo de cursos.' },
      { title: 'Consumo de APIs', goal: 'Integrar datos externos con estados de carga.', lessons: ['fetch y errores', 'Renderizado de datos'], project: 'Panel con datos de API.' },
    ],
    exercises: ['Formulario semantico', 'Grid responsive', 'Filtro con JS', 'Componente de tarjeta', 'Fetch con loading'],
    challenges: ['Landing academica', 'Panel responsive', 'Buscador interactivo', 'App de componentes', 'Consumo completo de API'],
    evaluations: ['HTML', 'CSS', 'JavaScript', 'React', 'Evaluacion final Frontend'],
  },
  'backend-apis': {
    category: 'Desarrollo Web',
    title: 'Backend y APIs',
    description: 'Ruta para crear servicios, rutas, validaciones, autenticacion e integracion con datos.',
    modules: [
      { title: 'Fundamentos backend', goal: 'Entender cliente, servidor, rutas y respuestas.', lessons: ['HTTP y endpoints', 'JSON y codigos de estado'], project: 'API conceptual de cursos.' },
      { title: 'Rutas y controladores', goal: 'Separar entrada, logica y respuesta.', lessons: ['Rutas REST', 'Controladores'], project: 'CRUD de contenido.' },
      { title: 'Validacion', goal: 'Proteger datos antes de guardarlos.', lessons: ['Validacion de payloads', 'Errores de API'], project: 'Validar solicitudes.' },
      { title: 'Autenticacion', goal: 'Controlar usuarios, roles y permisos.', lessons: ['Tokens y sesiones', 'Roles y autorizacion'], project: 'Acceso docente/alumno.' },
      { title: 'Persistencia', goal: 'Conectar API con base de datos.', lessons: ['Repositorios', 'Consultas y transacciones'], project: 'API con Supabase.' },
    ],
    exercises: ['Endpoint GET', 'CRUD simple', 'Validar body', 'Middleware de auth', 'Consulta a BD'],
    challenges: ['API de inscripciones', 'Panel administrativo', 'Errores consistentes', 'Roles por ruta', 'Backend completo'],
    evaluations: ['HTTP', 'REST', 'Validacion', 'Auth', 'Evaluacion final Backend'],
  },
  'security-basics': {
    category: 'Ciberseguridad',
    title: 'Seguridad Basica',
    description: 'Ruta para comprender amenazas, controles, contrasenas, permisos y proteccion de cuentas.',
    modules: [
      { title: 'Principios', goal: 'Entender confidencialidad, integridad y disponibilidad.', lessons: ['Triada CIA', 'Riesgo y amenaza'], project: 'Mapa de riesgos personales.' },
      { title: 'Cuentas seguras', goal: 'Aplicar contrasenas robustas y MFA.', lessons: ['Contrasenas y gestores', 'MFA y recuperacion'], project: 'Politica de cuentas.' },
      { title: 'Amenazas comunes', goal: 'Reconocer phishing, malware e ingenieria social.', lessons: ['Phishing', 'Malware y social engineering'], project: 'Campana de concientizacion.' },
      { title: 'Datos sensibles', goal: 'Clasificar y proteger informacion.', lessons: ['Clasificacion', 'Cifrado conceptual'], project: 'Matriz de datos sensibles.' },
      { title: 'Buenas practicas', goal: 'Crear habitos defensivos y checklist.', lessons: ['Actualizaciones y respaldos', 'Respuesta inicial'], project: 'Checklist de seguridad.' },
    ],
    exercises: ['Identificar riesgo', 'Crear politica MFA', 'Detectar phishing', 'Clasificar datos', 'Checklist de equipo'],
    challenges: ['Plan de seguridad personal', 'Analisis de correo sospechoso', 'Respaldo seguro', 'Politica de aula', 'Caso de respuesta inicial'],
    evaluations: ['Principios', 'Cuentas', 'Amenazas', 'Datos', 'Evaluacion final Seguridad'],
  },
  'web-security': {
    category: 'Ciberseguridad',
    title: 'Seguridad Web',
    description: 'Ruta defensiva para proteger aplicaciones web con validacion, sesiones, permisos y controles basicos.',
    modules: [
      { title: 'Fundamentos web seguros', goal: 'Entender superficie de ataque y controles.', lessons: ['HTTP seguro', 'Modelo cliente-servidor'], project: 'Mapa de riesgos web.' },
      { title: 'Validacion', goal: 'Evitar entradas inesperadas.', lessons: ['Validacion en cliente y servidor', 'Errores seguros'], project: 'Formulario validado.' },
      { title: 'Sesiones', goal: 'Cuidar cookies, tokens y cierre de sesion.', lessons: ['Cookies seguras', 'Tokens y expiracion'], project: 'Checklist de sesion.' },
      { title: 'Permisos', goal: 'Separar roles y proteger rutas.', lessons: ['Autorizacion', 'Control por rol'], project: 'Rutas alumno/docente.' },
      { title: 'OWASP inicial', goal: 'Reconocer riesgos comunes y mitigaciones.', lessons: ['Inyeccion y XSS conceptual', 'Dependencias y configuracion'], project: 'Reporte de hallazgos defensivo.' },
    ],
    exercises: ['Validar formulario', 'Mensaje de error seguro', 'Configurar cookie conceptual', 'Proteger ruta', 'Clasificar riesgo OWASP'],
    challenges: ['Formulario robusto', 'Sesion segura', 'Panel por rol', 'Revision de dependencias', 'Hardening basico'],
    evaluations: ['HTTP seguro', 'Validacion', 'Sesiones', 'Permisos', 'Evaluacion final Seguridad Web'],
  },
  'ethical-hacking': {
    category: 'Ciberseguridad',
    title: 'Ethical Hacking',
    description: 'Ruta de pruebas autorizadas enfocada en metodologia, alcance, reconocimiento, analisis y reporte responsable.',
    modules: [
      { title: 'Etica y alcance', goal: 'Definir autorizacion, reglas y limites.', lessons: ['Etica profesional', 'Alcance y permiso'], project: 'Documento de alcance.' },
      { title: 'Reconocimiento', goal: 'Recolectar informacion sin exceder permisos.', lessons: ['OSINT basico', 'Inventario de activos'], project: 'Perfil de objetivo autorizado.' },
      { title: 'Escaneo autorizado', goal: 'Identificar servicios y configuraciones visibles.', lessons: ['Puertos y servicios', 'Lectura de resultados'], project: 'Mapa de superficie autorizada.' },
      { title: 'Analisis web', goal: 'Reconocer vulnerabilidades comunes de forma controlada.', lessons: ['OWASP Top 10 conceptual', 'Pruebas no destructivas'], project: 'Checklist de app de laboratorio.' },
      { title: 'Reporte', goal: 'Comunicar impacto, evidencia y mitigacion.', lessons: ['Evidencia responsable', 'Severidad y recomendaciones'], project: 'Reporte ejecutivo y tecnico.' },
    ],
    exercises: ['Definir alcance', 'Recolectar datos publicos', 'Clasificar servicios', 'Identificar riesgo web', 'Redactar hallazgo'],
    challenges: ['Plan de pentest autorizado', 'OSINT de laboratorio', 'Analisis de superficie', 'Caso OWASP controlado', 'Reporte final'],
    evaluations: ['Etica', 'Reconocimiento', 'Escaneo', 'Analisis web', 'Evaluacion final Ethical Hacking'],
  },
};

export function getLessonExample(course: PlannedCourse, lesson: string) {
  if (course.title === 'C#') {
    return `// ${lesson}\nusing System;\n\nvar tema = "${lesson}";\nConsole.WriteLine($"Practica: {tema}");`;
  }

  if (course.category === 'Bases de datos') {
    return `-- ${lesson}\nselect curso, count(*) as total\nfrom progreso\nwhere completado = true\ngroup by curso\norder by total desc;`;
  }

  if (course.category === 'Redes') {
    return `# ${lesson}\nping 8.8.8.8\nnslookup coddyumg.edu.gt\ntracert coddyumg.edu.gt`;
  }

  if (course.category === 'Desarrollo Web' && course.title === 'Frontend') {
    return `<!-- ${lesson} -->\n<section class="curso">\n  <h2>CoddyUMG</h2>\n  <button>Continuar</button>\n</section>`;
  }

  if (course.category === 'Desarrollo Web') {
    return `// ${lesson}\nexport async function GET() {\n  return Response.json({ curso: "CoddyUMG", estado: "ok" });\n}`;
  }

  if (course.title === 'Ethical Hacking') {
    return `# ${lesson}\n1. Confirmar autorizacion escrita.\n2. Definir alcance.\n3. Registrar evidencia sin afectar sistemas.\n4. Reportar hallazgos y mitigaciones.`;
  }

  return `# ${lesson}\n- Identifica el riesgo.\n- Propone un control.\n- Documenta evidencia.\n- Verifica la mitigacion.`;
}

export function getLessonContent(course: PlannedCourse, moduleTitle: string, lesson: string) {
  return `En esta leccion de ${course.title} se trabaja ${lesson.toLowerCase()} dentro del modulo ${moduleTitle}. El objetivo es que el estudiante entienda el concepto, observe un ejemplo y pueda explicar donde se aplica en un caso academico o profesional.`;
}

export function getExerciseDetail(course: PlannedCourse, exercise: string, index: number) {
  const starter =
    course.category === 'Bases de datos'
      ? `-- Punto de partida\nselect * from tabla_base where id = ${index + 1};`
      : course.category === 'Redes'
        ? `# Punto de partida\nDocumenta objetivo, comando usado y resultado observado.`
        : course.category === 'Desarrollo Web'
          ? `// Punto de partida\nconst actividad = "${exercise}";\nconsole.log(actividad);`
          : course.title === 'C#'
            ? `// Punto de partida\nvar actividad = "${exercise}";\nConsole.WriteLine(actividad);`
            : `# Punto de partida\nDescribe el alcance autorizado y el control que vas a validar.`;

  return {
    objective: `Resolver "${exercise}" aplicando lo aprendido y dejando evidencia clara del resultado.`,
    starter,
    expected: 'Entrega valida: solucion documentada, resultado comprobable y una breve explicacion de por que funciona.',
  };
}

export function getChallengeSteps(challenge: string) {
  return [
    `Analiza el caso "${challenge}" y define el objetivo principal.`,
    'Divide la solucion en pasos verificables.',
    'Prepara evidencia del resultado: consulta, captura, reporte o salida esperada.',
    'Redacta una conclusion con mejoras posibles.',
  ];
}

export function getEvaluationQuestion(course: PlannedCourse, evaluation: string) {
  return {
    question: `Que debe demostrar el estudiante en "${evaluation}" dentro de ${course.title}?`,
    options: ['Comprension del concepto y aplicacion practica', 'Solo memorizacion de definiciones', 'Uso de herramientas sin explicar resultados'],
    answer: 0,
  };
}

export function getCourseExercises(courseSlug: string) {
  const course = plannedCourses[courseSlug];
  if (!course) return [];

  return course.exercises.map((exercise, index) => {
    const detail = getExerciseDetail(course, exercise, index);

    return {
      title: `Ejercicio ${index + 1}: ${exercise}`,
      description: detail.objective,
      goal: `Practicar ${exercise.toLowerCase()}.`,
      code: detail.starter,
      expected: detail.expected,
    };
  });
}

export function getCourseChallenges(courseSlug: string) {
  const course = plannedCourses[courseSlug];
  if (!course) return [];

  return course.challenges.map((challenge, index) => ({
    title: `Reto ${index + 1}: ${challenge}`,
    description: `Caso aplicado para demostrar dominio de ${challenge.toLowerCase()}.`,
    steps: getChallengeSteps(challenge),
    sample: `Entrega: ${challenge}\nEvidencia: procedimiento, resultado y recomendacion.`,
  }));
}

export function getCourseQuestions(courseSlug: string) {
  const course = plannedCourses[courseSlug];
  if (!course) return [];

  return course.evaluations.map((evaluation) => {
    const detail = getEvaluationQuestion(course, evaluation);

    return {
      prompt: detail.question,
      options: detail.options,
      answer: detail.answer,
    };
  });
}
