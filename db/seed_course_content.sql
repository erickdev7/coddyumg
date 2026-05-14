-- Contenido semilla ligero para CoddyUMG.
-- Opcional: ejecuta este archivo despues de db/supabase_schema.sql.
-- Incluye pocos registros para cuidar el plan gratis de Supabase.

insert into course_content (
  course,
  content_type,
  module_number,
  item_number,
  title,
  summary,
  body,
  example,
  expected_output,
  published
) values
(
  'python',
  'lesson',
  1,
  101,
  'Practica extra: variables con contexto real',
  'Refuerza variables creando datos de un alumno.',
  'Crea variables para nombre, carrera, semestre y promedio. Luego imprime una frase clara usando esos datos.',
  'nombre = "Ana"\ncarrera = "Ingenieria"\nsemestre = 3\nprint(nombre, carrera, semestre)',
  'Ana Ingenieria 3',
  true
),
(
  'python',
  'exercise',
  1,
  101,
  'Ejercicio extra: promedio simple',
  'Calcula el promedio de tres notas usando variables.',
  'Declara tres notas, calcula el promedio e imprime el resultado entero.',
  'nota1 = 80\nnota2 = 90\nnota3 = 100\nprint(int((nota1 + nota2 + nota3) / 3))',
  '90',
  true
),
(
  'python',
  'challenge',
  1,
  101,
  'Reto extra: clasificador de nota',
  'Clasifica una nota como aprobada o reprobada.',
  'Recibe una nota fija, valida si es mayor o igual a 61 y muestra el mensaje correspondiente.',
  'nota = 75\nprint("Aprobado" if nota >= 61 else "Reprobado")',
  'Aprobado',
  true
),
(
  'cpp',
  'lesson',
  1,
  101,
  'Practica extra: salida con formato',
  'Refuerza cout mostrando datos de un estudiante.',
  'Usa variables y cout para imprimir nombre, carnet y promedio.',
  'string nombre = "Luis";\nint carnet = 2026;\ncout << nombre << " " << carnet;',
  'Luis 2026',
  true
),
(
  'cpp',
  'exercise',
  1,
  101,
  'Ejercicio extra: total de compra',
  'Calcula el total de dos productos.',
  'Declara dos precios, sumalos e imprime el total.',
  'double a = 50;\ndouble b = 25;\ncout << a + b;',
  '75',
  true
),
(
  'cpp',
  'challenge',
  1,
  101,
  'Reto extra: mayor de dos numeros',
  'Compara dos numeros y muestra el mayor.',
  'Usa if para comparar dos enteros y muestra el valor mayor.',
  'int a = 8;\nint b = 12;\ncout << (a > b ? a : b);',
  '12',
  true
),
(
  'java',
  'lesson',
  1,
  101,
  'Practica extra: clase Main',
  'Refuerza la estructura minima de Java.',
  'Crea una clase Main con main e imprime un mensaje de bienvenida.',
  'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Bienvenido a Java");\n  }\n}',
  'Bienvenido a Java',
  true
),
(
  'java',
  'exercise',
  1,
  101,
  'Ejercicio extra: suma en Java',
  'Suma dos enteros e imprime el resultado.',
  'Declara dos variables int, calcula la suma y muestra el resultado con System.out.println.',
  'int a = 7;\nint b = 5;\nSystem.out.println(a + b);',
  '12',
  true
),
(
  'java',
  'challenge',
  1,
  101,
  'Reto extra: producto valido',
  'Valida que un precio sea mayor que cero.',
  'Declara un precio y muestra valido si es positivo.',
  'double precio = 100;\nSystem.out.println(precio > 0 ? "valido" : "invalido");',
  'valido',
  true
);
