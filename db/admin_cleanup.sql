-- Limpia datos de avance/solicitudes guardados accidentalmente para el admin.
-- Ejecuta esto en Supabase SQL Editor si el docente aparece con vista o progreso de alumno.

delete from progress
where user_id in (
  select id from profiles where email = 'eduaguilar619@gmail.com'
);

delete from course_enrollments
where user_id in (
  select id from profiles where email = 'eduaguilar619@gmail.com'
);

update profiles
set full_name = 'Erick',
    role = 'teacher'
where email = 'eduaguilar619@gmail.com';
