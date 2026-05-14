# Checklist de Prueba CoddyUMG

## Flujo Alumno

- Iniciar sesion con una cuenta de alumno.
- Entrar a `/courses`.
- Abrir un curso.
- Completar una leccion.
- Confirmar que el boton cambia a `Completado`.
- Completar un ejercicio.
- Completar un reto.
- Responder una evaluacion.
- Revisar `/dashboard`.
- Revisar `/certificate`.

## Flujo Docente

- Iniciar sesion con `eduaguilar619@gmail.com`.
- Entrar a `/teacher`.
- Confirmar que aparecen alumnos activos.
- Usar filtros por curso y estado.
- Exportar CSV.
- Abrir detalle de un alumno.
- Entrar a `/teacher/content`.
- Crear contenido como borrador.
- Usar vista previa.
- Publicar contenido.
- Confirmar que aparece como contenido adicional en el curso correspondiente.

## Responsive

- Probar inicio, cursos, dashboard y certificado en pantalla movil.
- Revisar que el header no oculte enlaces.
- Revisar tablas con scroll horizontal.
- Revisar que tarjetas de ejercicios y retos no se desborden.

## Supabase Free

- Confirmar que no se cargan grandes volumenes de contenido.
- Usar `db/seed_course_content.sql` solo si se quiere contenido extra inicial.
- Mantener el contenido principal en codigo y usar Supabase para progreso y contenido adicional.
