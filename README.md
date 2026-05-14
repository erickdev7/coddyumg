# CoddyUMG

CoddyUMG es una plataforma educativa para aprender programacion con cursos de Python, C++ y Java. Incluye lecciones, ejercicios practicos, retos, evaluaciones, progreso por alumno, panel docente y gestion de contenido con Supabase.

## Funciones Principales

- Cursos completos de Python, C++ y Java.
- 25 lecciones, 25 ejercicios, 25 retos y evaluaciones por curso.
- Editor de practica y salida simulada para ejercicios.
- Registro de progreso por alumno.
- Panel docente con monitoreo, filtros, exportacion CSV y detalle por alumno.
- Gestion de contenido adicional desde Supabase.
- Certificado/constancia con folio, promedio y avance por curso.
- Pagina "Acerca de CoddyUMG" para presentacion del proyecto.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Monaco Editor
- Supabase Auth
- Supabase PostgreSQL

## Instalacion

```bash
npm install
npm run dev
```

Abre:

```text
http://localhost:3000
```

## Variables de Entorno

Crea `.env.local` usando `.env.example` como base:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Configuracion de Supabase

1. Crea un proyecto en Supabase.
2. Copia la URL del proyecto y la clave `anon`.
3. Copia la clave `service_role` desde `Settings > API`.
4. Ejecuta en el SQL Editor:

```text
db/supabase_schema.sql
```

5. Opcionalmente ejecuta el contenido semilla ligero:

```text
db/seed_course_content.sql
```

La cuenta administradora principal es:

```text
eduaguilar619@gmail.com
```

El rol docente se asigna automaticamente para ese correo desde la aplicacion y tambien queda documentado en el SQL.

## Uso

### Alumno

1. Inicia sesion.
2. Entra a cursos.
3. Estudia lecciones.
4. Completa ejercicios, retos y evaluaciones.
5. Revisa el avance en `Mi progreso`.
6. Genera constancia desde `/certificate`.

### Docente

1. Inicia sesion con la cuenta administradora.
2. Entra a `Admin`.
3. Revisa alumnos, progreso y promedios.
4. Entra a `Contenido`.
5. Crea, edita, duplica, publica u oculta contenido adicional.

## Cuidado del Plan Gratis de Supabase

La plataforma evita cargas innecesarias:

- El contenido base vive en codigo.
- Supabase guarda usuarios, perfiles, progreso y contenido extra.
- El contenido publicado se consulta por curso/tipo y con limite.
- El progreso se carga una vez por sesion mediante `ProgressProvider`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Estructura

```text
app/
  api/
    content/
    me/
    progress/
  about/
  auth/
  certificate/
  courses/
  dashboard/
  teacher/
db/
  supabase_schema.sql
  seed_course_content.sql
lib/
  auth.ts
  supabaseAdmin.ts
  supabaseClient.ts
```

## Checklist de Prueba

1. Crear o iniciar sesion con un alumno.
2. Completar una leccion y verificar que el boton cambie a `Completado`.
3. Completar un ejercicio, reto y evaluacion.
4. Revisar `/dashboard`.
5. Revisar `/certificate`.
6. Iniciar sesion como `eduaguilar619@gmail.com`.
7. Revisar `/teacher`.
8. Abrir detalle de un alumno.
9. Crear contenido en `/teacher/content`.
10. Publicarlo y confirmar que aparece como contenido adicional en el curso.

## Autor

Erick Aguilar  
eduaguilar619@gmail.com
