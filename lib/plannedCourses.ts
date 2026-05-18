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

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

export function getLessonExample(course: PlannedCourse, lesson: string) {
  const normalized = lesson.toLowerCase();

  if (course.title === 'C#') {
    if (includesAny(normalized, ['variables', 'tipos', 'consola'])) {
      return `// Variables, tipos y consola\nusing System;\n\nstring alumno = "Ana";\nint creditos = 5;\ndouble promedio = 86.5;\nbool activo = true;\n\nConsole.WriteLine($"{alumno} cursa {creditos} creditos");\nConsole.WriteLine($"Promedio: {promedio} | Activo: {activo}");`;
    }

    if (includesAny(normalized, ['condicionales', 'ciclos'])) {
      return `// Condicionales y ciclos\nusing System;\n\nint nota = 78;\n\nif (nota >= 61)\n{\n    Console.WriteLine("Aprobado");\n}\nelse\n{\n    Console.WriteLine("Reprobado");\n}\n\nfor (int intento = 1; intento <= 3; intento++)\n{\n    Console.WriteLine($"Intento {intento} registrado");\n}`;
    }

    if (includesAny(normalized, ['metodos', 'parametros'])) {
      return `// Metodos y parametros\nusing System;\n\nstatic double CalcularPromedio(double a, double b, double c)\n{\n    return (a + b + c) / 3;\n}\n\nConsole.WriteLine($"Promedio: {CalcularPromedio(80, 90, 95):0.00}");`;
    }

    if (includesAny(normalized, ['list', 'dictionary', 'foreach', 'colecciones'])) {
      return `// List, Dictionary y foreach\nusing System;\nusing System.Collections.Generic;\n\nvar notas = new Dictionary<string, int>\n{\n    ["Ana"] = 90,\n    ["Luis"] = 75,\n};\n\nforeach (var registro in notas)\n{\n    Console.WriteLine($"{registro.Key}: {registro.Value}");\n}`;
    }

    if (includesAny(normalized, ['clases', 'objetos', 'propiedades'])) {
      return `// Clases, objetos y propiedades\nusing System;\n\nvar producto = new Producto("Teclado", 125);\nConsole.WriteLine(producto.Resumen());\n\nclass Producto\n{\n    public string Nombre { get; }\n    public decimal Precio { get; }\n\n    public Producto(string nombre, decimal precio)\n    {\n        Nombre = nombre;\n        Precio = precio;\n    }\n\n    public string Resumen() => $"{Nombre}: Q{Precio}";\n}`;
    }

    if (includesAny(normalized, ['herencia', 'interfaces'])) {
      return `// Herencia e interfaces\nusing System;\n\nIReporte reporte = new ReporteCurso("C#");\nConsole.WriteLine(reporte.Generar());\n\ninterface IReporte\n{\n    string Generar();\n}\n\nclass ReporteCurso : IReporte\n{\n    private readonly string curso;\n    public ReporteCurso(string curso) => this.curso = curso;\n    public string Generar() => $"Reporte activo para {curso}";\n}`;
    }

    if (includesAny(normalized, ['try', 'catch', 'archivos'])) {
      return `// try/catch y archivos\nusing System;\n\ntry\n{\n    string entrada = "95";\n    int nota = int.Parse(entrada);\n    Console.WriteLine($"Nota valida: {nota}");\n}\ncatch (FormatException)\n{\n    Console.WriteLine("La nota debe ser numerica");\n}`;
    }

    if (includesAny(normalized, ['linq', 'consultas'])) {
      return `// LINQ y consultas sobre colecciones\nusing System;\nusing System.Linq;\n\nvar notas = new[] { 55, 70, 88, 95 };\nvar aprobadas = notas.Where(nota => nota >= 61).OrderByDescending(nota => nota);\n\nConsole.WriteLine(string.Join(", ", aprobadas));`;
    }

    if (includesAny(normalized, ['api', 'asp.net', 'servicios'])) {
      return `// Introduccion a ASP.NET Web API\nvar endpoint = new\n{\n    Ruta = "/api/tareas",\n    Metodo = "GET",\n    Respuesta = new[] { "Estudiar C#", "Practicar LINQ" }\n};\n\nConsole.WriteLine($"{endpoint.Metodo} {endpoint.Ruta}");`;
    }

    return `// ${lesson}\nusing System;\n\nstring objetivo = "Aplicar ${lesson} en C#";\nConsole.WriteLine(objetivo);\nConsole.WriteLine("Define datos, procesa la informacion y muestra un resultado verificable.");`;
  }

  if (course.category === 'Bases de datos') {
    if (includesAny(normalized, ['que es una base', 'tablas', 'campos', 'tipos'])) {
      return `-- Tablas, campos y tipos\ncreate table alumnos (\n  id uuid primary key,\n  nombre text not null,\n  correo text unique not null,\n  promedio numeric(5,2) default 0,\n  activo boolean default true\n);`;
    }

    if (includesAny(normalized, ['llaves', 'cardinalidad', 'relaciones'])) {
      return `-- Llaves primarias, foraneas y relaciones\ncreate table cursos (\n  id uuid primary key,\n  nombre text not null\n);\n\ncreate table inscripciones (\n  alumno_id uuid references alumnos(id),\n  curso_id uuid references cursos(id),\n  primary key (alumno_id, curso_id)\n);`;
    }

    if (includesAny(normalized, ['normal', 'normalizacion'])) {
      return `-- Normalizacion: separar datos repetidos\ncreate table clientes (\n  id serial primary key,\n  nombre text not null\n);\n\ncreate table pedidos (\n  id serial primary key,\n  cliente_id int references clientes(id),\n  total numeric(10,2) not null\n);`;
    }

    if (includesAny(normalized, ['select', 'where', 'insert', 'update', 'limit'])) {
      return `-- SQL basico\ninsert into cursos (id, nombre) values (gen_random_uuid(), 'Bases de Datos');\n\nselect nombre\nfrom cursos\nwhere nombre ilike '%datos%'\norder by nombre\nlimit 5;`;
    }

    if (includesAny(normalized, ['join', 'agregaciones', 'group', 'having'])) {
      return `-- Joins y agregaciones\nselect c.nombre, count(i.alumno_id) as inscritos\nfrom cursos c\nleft join inscripciones i on i.curso_id = c.id\ngroup by c.nombre\nhaving count(i.alumno_id) >= 1\norder by inscritos desc;`;
    }

    if (includesAny(normalized, ['vista', 'subconsulta'])) {
      return `-- Vista reutilizable\ncreate view progreso_por_curso as\nselect curso, avg(score) as promedio, count(*) as actividades\nfrom progress\ngroup by curso;\n\nselect * from progreso_por_curso where promedio >= 70;`;
    }

    if (includesAny(normalized, ['index', 'indices', 'explain', 'planner'])) {
      return `-- Analisis de rendimiento\ncreate index progress_user_course_idx on progress (user_id, course);\n\nexplain analyze\nselect *\nfrom progress\nwhere user_id = '00000000-0000-0000-0000-000000000000'\n  and course = 'python';`;
    }

    if (includesAny(normalized, ['transaccion', 'aislamiento', 'bloqueos', 'deadlocks'])) {
      return `-- Transaccion segura\nbegin;\n\nupdate course_enrollments\nset status = 'approved', reviewed_at = now()\nwhere id = '00000000-0000-0000-0000-000000000000';\n\ninsert into progress (user_id, course, activity, completed)\nvalues ('00000000-0000-0000-0000-000000000000', 'python', 'Acceso aprobado', true);\n\ncommit;`;
    }

    if (includesAny(normalized, ['roles', 'privilegios', 'auditoria', 'respaldo', 'replicacion', 'monitoreo'])) {
      return `-- Seguridad y operacion\ncreate role lector_reportes;\ngrant select on progress to lector_reportes;\n\ncreate table audit_log (\n  id uuid primary key default gen_random_uuid(),\n  accion text not null,\n  creado_en timestamptz default now()\n);`;
    }

    return `-- ${lesson}\nselect curso, count(*) as total\nfrom progress\nwhere completed = true\ngroup by curso\norder by total desc;`;
  }

  if (course.category === 'Redes') {
    if (includesAny(normalized, ['osi', 'tcp/ip', 'puertos'])) {
      return `# Modelo OSI / TCP-IP\nAplicacion: HTTP puerto 80, HTTPS puerto 443\nTransporte: TCP confirma entrega; UDP prioriza velocidad\nInternet: IP enruta paquetes\nAcceso a red: Ethernet o Wi-Fi mueve tramas`;
    }

    if (includesAny(normalized, ['ipv4', 'mascaras', 'subnetting'])) {
      return `# Subnetting basico\nRed: 192.168.10.0/24\nSubred laboratorio: 192.168.10.0/26\nHosts validos: 192.168.10.1 - 192.168.10.62\nBroadcast: 192.168.10.63`;
    }

    if (includesAny(normalized, ['dns', 'dhcp'])) {
      return `# Diagnostico DNS y DHCP\nipconfig /all\nnslookup coddyumg.edu.gt\n\n# Verifica: IP asignada, gateway, DNS y tiempo de concesion DHCP.`;
    }

    if (includesAny(normalized, ['http', 'https', 'ssh', 'web', 'proxy', 'tls'])) {
      return `# Servicios web y acceso seguro\ncurl -I https://coddyumg.edu.gt\nssh alumno@servidor-lab\n\n# Revisa codigo HTTP, certificado TLS y autenticacion SSH.`;
    }

    if (includesAny(normalized, ['gateway', 'rutas', 'switching', 'vlan'])) {
      return `# Routing y switching\nRed alumnos: VLAN 10 -> 192.168.10.0/24\nRed docentes: VLAN 20 -> 192.168.20.0/24\nGateway VLAN 10: 192.168.10.1\nGateway VLAN 20: 192.168.20.1`;
    }

    if (includesAny(normalized, ['ping', 'tracert', 'nslookup', 'diagnostico', 'logs', 'metricas', 'monitoreo'])) {
      return `# Checklist de diagnostico\nping 8.8.8.8\ntracert coddyumg.edu.gt\nnslookup coddyumg.edu.gt\n\n# Si ping falla: revisar gateway.\n# Si nslookup falla: revisar DNS.\n# Si tracert se corta: revisar ruta o firewall.`;
    }

    return `# ${lesson}\nObjetivo: documentar configuracion, prueba ejecutada y resultado observado.\nEvidencia: comando, salida y conclusion tecnica.`;
  }

  if (course.category === 'Desarrollo Web' && course.title === 'Frontend') {
    if (includesAny(normalized, ['html', 'etiquetas', 'secciones', 'formularios'])) {
      return `<!-- HTML semantico -->\n<form aria-labelledby="titulo-acceso">\n  <h2 id="titulo-acceso">Solicitar acceso</h2>\n  <label>\n    Curso\n    <select name="curso"><option>Frontend</option></select>\n  </label>\n  <button type="submit">Enviar solicitud</button>\n</form>`;
    }

    if (includesAny(normalized, ['css', 'flexbox', 'grid', 'responsive'])) {
      return `/* CSS responsive */\n.catalogo {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 1rem;\n}\n\n.card {\n  border: 1px solid #d1d5db;\n  padding: 1rem;\n}`;
    }

    if (includesAny(normalized, ['javascript', 'arrays', 'dom', 'eventos'])) {
      return `// JavaScript: filtrar cursos\nconst cursos = ["Frontend", "Backend", "Bases de Datos"];\nconst filtrados = cursos.filter((curso) => curso.includes("end"));\nconsole.log(filtrados);`;
    }

    if (includesAny(normalized, ['react', 'componentes', 'props', 'estado', 'efectos'])) {
      return `// React: componente de curso\nfunction CourseCard({ title, progress }) {\n  return (\n    <article>\n      <h2>{title}</h2>\n      <p>Avance: {progress}%</p>\n    </article>\n  );\n}`;
    }

    if (includesAny(normalized, ['fetch', 'api', 'renderizado'])) {
      return `// Consumo de API\nasync function cargarCursos() {\n  const response = await fetch("/api/content?published=true");\n  if (!response.ok) throw new Error("No se pudo cargar");\n  return response.json();\n}`;
    }

    return `<!-- ${lesson} -->\n<section class="curso">\n  <h2>CoddyUMG</h2>\n  <p>Construye una interfaz clara, accesible y responsive.</p>\n</section>`;
  }

  if (course.category === 'Desarrollo Web') {
    if (includesAny(normalized, ['http', 'endpoints', 'json', 'codigos'])) {
      return `// Endpoint GET\nexport async function GET() {\n  return Response.json(\n    { data: [{ id: 1, title: "Backend y APIs" }] },\n    { status: 200 },\n  );\n}`;
    }

    if (includesAny(normalized, ['rutas', 'controladores', 'rest', 'crud'])) {
      return `// Controlador REST conceptual\nexport async function POST(request) {\n  const body = await request.json();\n  return Response.json({ created: true, title: body.title }, { status: 201 });\n}`;
    }

    if (includesAny(normalized, ['validacion', 'errores'])) {
      return `// Validacion de payload\nfunction validateCourse(body) {\n  if (!body.title || body.title.length < 3) {\n    return "El titulo debe tener al menos 3 caracteres";\n  }\n  return null;\n}`;
    }

    if (includesAny(normalized, ['tokens', 'sesiones', 'roles', 'autorizacion'])) {
      return `// Autorizacion por rol\nfunction canManageContent(profile) {\n  return profile?.role === "teacher";\n}\n\nif (!canManageContent(profile)) {\n  return Response.json({ error: "No autorizado" }, { status: 403 });\n}`;
    }

    if (includesAny(normalized, ['repositorios', 'consultas', 'persistencia', 'supabase'])) {
      return `// Consulta a Supabase\nconst { data, error } = await supabase\n  .from("course_content")\n  .select("*")\n  .eq("published", true)\n  .limit(10);`;
    }

    return `// ${lesson}\nexport async function GET() {\n  return Response.json({ curso: "CoddyUMG", estado: "ok" });\n}`;
  }

  if (course.title === 'Ethical Hacking') {
    if (includesAny(normalized, ['etica', 'alcance', 'permiso'])) {
      return `# Etica y alcance\nAlcance autorizado: app de laboratorio\nVentana de pruebas: sabado 09:00-12:00\nProhibido: denegacion de servicio, exfiltracion de datos reales\nEntrega: reporte con evidencia y mitigacion`;
    }

    if (includesAny(normalized, ['osint', 'inventario', 'reconocimiento'])) {
      return `# Reconocimiento autorizado\nActivos permitidos:\n- app-lab.coddyumg.local\n- api-lab.coddyumg.local\n\nEvidencia esperada:\n- tecnologias visibles\n- puertos publicados\n- responsables de validacion`;
    }

    if (includesAny(normalized, ['puertos', 'servicios', 'escaneo'])) {
      return `# Lectura de resultados de escaneo\nPuerto 80/tcp abierto: HTTP\nPuerto 443/tcp abierto: HTTPS\nPuerto 22/tcp filtrado: revisar politica de firewall\n\nConclusion: documentar exposicion sin intentar acceso no autorizado.`;
    }

    if (includesAny(normalized, ['owasp', 'vulnerabilidades', 'pruebas'])) {
      return `# Prueba web no destructiva\nCaso: formulario de busqueda\nEntrada de prueba: texto largo y caracteres especiales\nValidar: errores controlados, sin datos sensibles, respuesta estable\nReporte: riesgo, evidencia y recomendacion`;
    }

    if (includesAny(normalized, ['reporte', 'evidencia', 'severidad'])) {
      return `# Hallazgo responsable\nTitulo: validacion insuficiente en formulario\nSeveridad: media\nEvidencia: captura y pasos reproducibles\nImpacto: datos inconsistentes\nMitigacion: validar en servidor y registrar errores`;
    }

    return `# ${lesson}\n1. Confirmar autorizacion escrita.\n2. Definir alcance.\n3. Registrar evidencia sin afectar sistemas.\n4. Reportar hallazgos y mitigaciones.`;
  }

  if (course.category === 'Ciberseguridad') {
    if (includesAny(normalized, ['cia', 'riesgo', 'amenaza'])) {
      return `# Triada CIA\nActivo: cuenta institucional\nConfidencialidad: MFA y contrasena robusta\nIntegridad: bitacora de cambios\nDisponibilidad: respaldo y canal alterno\nRiesgo: phishing dirigido a estudiantes`;
    }

    if (includesAny(normalized, ['contrasenas', 'mfa', 'cuentas'])) {
      return `# Politica de cuentas\nLongitud minima: 12 caracteres\nMFA: obligatorio para docentes\nRecuperacion: correo alterno verificado\nRevision: cada cierre de semestre`;
    }

    if (includesAny(normalized, ['phishing', 'malware', 'ingenieria'])) {
      return `# Analisis de phishing\nSenal 1: dominio parecido al real\nSenal 2: urgencia artificial\nSenal 3: enlace acortado\nAccion: reportar, no responder, no descargar adjuntos`;
    }

    if (includesAny(normalized, ['validacion', 'sesiones', 'cookies', 'tokens', 'permisos', 'owasp'])) {
      return `# Control web defensivo\nValidar entradas en servidor\nUsar cookies HttpOnly y Secure\nAplicar autorizacion por rol\nRegistrar errores sin exponer secretos\nRevisar dependencias vulnerables`;
    }
  }

  return `# ${lesson}\n- Define el objetivo tecnico.\n- Aplica el procedimiento del modulo.\n- Documenta evidencia.\n- Verifica el resultado y propone mejora.`;
}

export function getLessonContent(course: PlannedCourse, moduleTitle: string, lesson: string) {
  const normalized = lesson.toLowerCase();
  const base = `En esta leccion de ${course.title} se trabaja ${lesson.toLowerCase()} dentro del modulo ${moduleTitle}.`;

  if (course.title === 'C#') {
    if (includesAny(normalized, ['variables', 'tipos', 'consola'])) return `${base} Aprenderas a elegir tipos de datos adecuados, declarar valores claros y mostrar resultados en consola para validar el flujo de un programa.`;
    if (includesAny(normalized, ['condicionales', 'ciclos'])) return `${base} Practicaras decisiones con if/else y repeticiones con for para resolver procesos comunes como validar notas, intentos o listas de registros.`;
    if (includesAny(normalized, ['clases', 'objetos', 'propiedades', 'herencia', 'interfaces'])) return `${base} El foco es modelar entidades con responsabilidades claras, separar datos de comportamiento y preparar codigo mantenible con POO.`;
    if (includesAny(normalized, ['linq', 'archivos', 'try', 'catch'])) return `${base} Trabajaras procesamiento de datos, control de errores y consultas sobre colecciones para crear programas mas robustos.`;
    return `${base} El objetivo es aplicar C# con entrada, proceso y salida verificable, manteniendo nombres claros y una estructura facil de probar.`;
  }

  if (course.category === 'Bases de datos') {
    if (includesAny(normalized, ['tablas', 'llaves', 'relaciones', 'normal'])) return `${base} Aprenderas a transformar reglas de negocio en estructuras relacionales consistentes, evitando duplicidad y protegiendo la integridad de los datos.`;
    if (includesAny(normalized, ['select', 'join', 'group', 'vista', 'subconsulta'])) return `${base} Practicaras consultas SQL para responder preguntas reales, combinar tablas y preparar datos para reportes o paneles.`;
    if (includesAny(normalized, ['index', 'explain', 'transaccion', 'roles', 'backup', 'replicacion'])) return `${base} El objetivo es operar bases de datos con rendimiento, seguridad y continuidad, pensando en escenarios de produccion.`;
    return `${base} Conectaras el concepto con un caso de almacenamiento, consulta o administracion de informacion academica.`;
  }

  if (course.category === 'Redes') {
    return `${base} Analizaras como viaja la informacion entre equipos, que servicio participa y que evidencia tecnica permite diagnosticar o documentar el resultado.`;
  }

  if (course.category === 'Desarrollo Web') {
    return `${base} Construiras una pieza concreta de una aplicacion web, cuidando estructura, validacion, estado, comunicacion con APIs y claridad para el usuario.`;
  }

  if (course.category === 'Ciberseguridad') {
    return `${base} Trabajaras desde una perspectiva defensiva y responsable: identificar riesgo, aplicar controles, documentar evidencia y proponer mitigaciones verificables.`;
  }

  return `${base} El objetivo es que el estudiante entienda el concepto, observe un ejemplo y pueda explicar donde se aplica en un caso academico o profesional.`;
}

function expandModuleLessons(module: PlannedModule) {
  return [
    module.lessons[0],
    module.lessons[1],
    `Aplicacion guiada de ${module.title}`,
    `Buenas practicas en ${module.title}`,
    `Proyecto aplicado: ${module.project.replace(/\.$/, '')}`,
  ];
}

export function getCourseLessons(courseSlug: string) {
  const course = plannedCourses[courseSlug];
  if (!course) return [];

  return course.modules.flatMap((module) =>
    expandModuleLessons(module).map((lesson) => ({
      lesson,
      module,
    })),
  );
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

function expandModuleExercises(module: PlannedModule, seed: string) {
  const lessons = expandModuleLessons(module);

  return [
    seed,
    `Practica: ${lessons[0]}`,
    `Practica: ${lessons[1]}`,
    `Caso aplicado: ${module.title}`,
    `Entrega del proyecto: ${module.project.replace(/\.$/, '')}`,
  ];
}

function expandModuleChallenges(module: PlannedModule, seed: string) {
  const lessons = expandModuleLessons(module);

  return [
    seed,
    `Resolver caso real de ${lessons[0].toLowerCase()}`,
    `Auditar o validar ${lessons[1].toLowerCase()}`,
    `Integrar ${module.title.toLowerCase()} con evidencia`,
    `Presentar ${module.project.replace(/\.$/, '').toLowerCase()}`,
  ];
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

  const exercises = course.modules.flatMap((module, moduleIndex) => expandModuleExercises(module, course.exercises[moduleIndex] || module.title));

  return exercises.map((exercise, index) => {
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

  const challenges = course.modules.flatMap((module, moduleIndex) => expandModuleChallenges(module, course.challenges[moduleIndex] || module.title));

  return challenges.map((challenge, index) => ({
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
