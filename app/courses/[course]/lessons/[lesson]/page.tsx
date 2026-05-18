import Link from 'next/link';
import { notFound } from 'next/navigation';
import AppFooter from '@/app/components/AppFooter';
import ProgressButton from '@/app/components/ProgressButton';
import SiteHeader from '@/app/components/SiteHeader';
import { getLessonContent, getLessonExample, plannedCourses } from '@/lib/plannedCourses';

const courseLabels: Record<string, string> = {
  python: 'Python',
  cpp: 'C++',
  java: 'Java',
};

const lessonThemes: Record<string, string[]> = {
  python: [
    'Variables y tipos de datos', 'Condicionales y ciclos', 'Funciones, listas y diccionarios', 'Manejo de errores', 'Archivos de texto',
    'Programación orientada a objetos', 'Módulos y paquetes', 'Introducción a datos con CSV', 'APIs y peticiones HTTP', 'Proyecto integrador',
    'Comprension de listas', 'Lambdas y funciones anonimas', 'map, filter y sorted', 'Fechas y tiempo', 'Entornos virtuales',
    'Pruebas unitarias', 'Depuración', 'Programación funcional básica', 'Manejo de configuración', 'Buenas prácticas',
    'Bases de datos', 'SQL basico', 'Arquitectura de app', 'Seguridad básica', 'Preparación de proyecto final',
  ],
  cpp: [
    'Variables, entrada y salida', 'Condicionales, ciclos y arreglos', 'Clases y objetos', 'Funciones y parametros', 'Vectores',
    'Punteros y referencias', 'Herencia', 'Archivos con fstream', 'STL: map y algoritmos', 'Proyecto integrador',
    'Sobrecarga de funciones', 'Constructores', 'Encapsulacion', 'Polimorfismo', 'Templates',
    'Manejo de excepciones', 'Organizacion en archivos', 'Complejidad algoritmica', 'Busqueda y ordenamiento', 'Buenas prácticas',
    'Estructuras de datos', 'Pilas y colas', 'Proyecto con menu', 'Persistencia de datos', 'Preparación de proyecto final',
  ],
  java: [
    'Estructura de un programa Java', 'Objetos, atributos y metodos', 'Colecciónes con ArrayList', 'Encapsulacion', 'Manejo de excepciones',
    'Herencia y polimorfismo', 'Interfaces', 'Archivos con Java', 'Streams y filtros', 'Proyecto integrador',
    'Constructores', 'Sobrecarga de metodos', 'Clases abstractas', 'Generics', 'Paquetes',
    'Modificadores de acceso', 'Colecciónes avanzadas', 'Ordenamiento con Comparator', 'Validación de datos', 'Buenas prácticas',
    'Introducción a JDBC', 'Arquitectura MVC', 'Servicios y repositorios', 'Pruebas básicas', 'Preparación de proyecto final',
  ],
};

const courseExamples: Record<string, (title: string) => string> = {
  python: (title) =>
    `# ${title}\nvalor = "CoddyUMG"\nprint("Tema:", valor)\n\n# Modifica este ejemplo con datos propios.`,
  cpp: (title) =>
    `// ${title}\n#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Practica CoddyUMG" << endl;\n  return 0;\n}`,
  java: (title) =>
    `// ${title}\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Practica CoddyUMG");\n  }\n}`,
};

function getLessonModule(lessonNumber: number) {
  return Math.ceil(lessonNumber / 5);
}

function getLessonDetail(course: string, courseName: string, title: string, lessonNumber: number) {
  const moduleNumber = getLessonModule(lessonNumber);
  const languageExample = courseExamples[course]?.(title) || `// Practica: ${title}`;

  return {
    moduleNumber,
    objective: `Aplicar ${title.toLowerCase()} en un programa pequeno de ${courseName}, entendiendo el concepto antes de pasar a ejercicios y retos.`,
    explanation: [
      `Esta lección pertenece al modulo ${moduleNumber}. El objetivo no es memorizar sintaxis, sino reconocer cuándo usar el tema y cómo combinarlo con contenidos anteriores.`,
      `Antes de marcarla como completada, revisa el ejemplo, modifica al menos una parte del código y escribe con tus palabras qué problema ayuda a resolver.`,
    ],
    checklist: [
      'Identifica el concepto principal de la lección.',
      'Ejecuta o simula el ejemplo cambiando nombres, valores o condiciones.',
      'Relaciona el tema con un ejercicio y un reto del mismo modulo.',
      'Guarda el progreso cuando puedas explicar el resultado.',
    ],
    example: languageExample,
    practice: `Crea una version propia del ejemplo usando el tema "${title}". Incluye al menos una entrada, un proceso y una salida clara.`,
    exerciseHref: `/courses/${course}/exercises#exercise-${lessonNumber}`,
    challengeHref: `/courses/${course}/challenges#challenge-${lessonNumber}`,
  };
}

export function generateStaticParams() {
  const activeParams = Object.keys(courseLabels).flatMap((course) =>
    Array.from({ length: 25 }, (_, index) => ({ course, lesson: String(index + 1) })),
  );
  const plannedParams = Object.entries(plannedCourses).flatMap(([course, data]) =>
    Array.from({ length: data.modules.flatMap((module) => module.lessons).length }, (_, index) => ({ course, lesson: String(index + 1) })),
  );

  return [...activeParams, ...plannedParams];
}

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>;
}) {
  const { course, lesson } = await params;
  const lessonNumber = Number(lesson);
  const courseName = courseLabels[course];
  const title = lessonThemes[course]?.[lessonNumber - 1];
  const plannedCourse = plannedCourses[course];

  if (plannedCourse) {
    const lessons = plannedCourse.modules.flatMap((module) => module.lessons.map((lessonTitle) => ({ lessonTitle, module })));
    const plannedLesson = lessons[lessonNumber - 1];

    if (!plannedLesson || lessonNumber < 1) {
      notFound();
    }

    const previous = lessonNumber > 1 ? `/courses/${course}/lessons/${lessonNumber - 1}` : null;
    const next = lessonNumber < lessons.length ? `/courses/${course}/lessons/${lessonNumber + 1}` : `/courses/${course}/quiz`;

    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <SiteHeader />
        <main className="flex-1">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            <Link href={`/courses/${course}/lessons#lesson-${lessonNumber}`} className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Volver al listado de lecciones
            </Link>

            <article className="mt-6 rounded-lg bg-white p-8 shadow">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                {plannedCourse.title} | {plannedLesson.module.title} | Leccion {lessonNumber}
              </p>
              <h1 className="mt-3 text-4xl font-extrabold text-gray-900">{plannedLesson.lessonTitle}</h1>
              <p className="mt-5 text-lg leading-8 text-gray-600">
                {getLessonContent(plannedCourse, plannedLesson.module.title, plannedLesson.lessonTitle)}
              </p>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900">Explicacion guiada</h2>
                  <p className="mt-4 text-gray-600">
                    Relaciona este tema con el proyecto del modulo: {plannedLesson.module.project} Antes de continuar, adapta el ejemplo a un caso propio y documenta el resultado.
                  </p>
                </section>

                <aside className="rounded-lg bg-blue-50 p-5">
                  <h2 className="font-semibold text-blue-900">Checklist de estudio</h2>
                  <ul className="mt-3 space-y-2 text-sm text-blue-800">
                    <li>- Identifica el concepto principal.</li>
                    <li>- Revisa el ejemplo y modifica un dato.</li>
                    <li>- Explica el resultado con tus palabras.</li>
                    <li>- Marca la leccion como completada.</li>
                  </ul>
                </aside>
              </div>

              <div className="mt-8 rounded-md bg-gray-950 p-5 font-mono text-sm text-green-200">
                <pre>{getLessonExample(plannedCourse, plannedLesson.lessonTitle)}</pre>
              </div>

              <div className="mt-6 rounded-md bg-gray-50 p-5">
                <h2 className="font-semibold text-gray-900">Practica sugerida</h2>
                <p className="mt-2 text-sm text-gray-700">
                  Crea una version propia del ejemplo para {plannedCourse.title}. Incluye objetivo, pasos y salida esperada.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href={`/courses/${course}/exercises#exercise-${Math.ceil(lessonNumber / 2)}`} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white">
                    Ir al ejercicio relacionado
                  </Link>
                  <Link href={`/courses/${course}/challenges#challenge-${Math.ceil(lessonNumber / 2)}`} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white">
                    Ir al reto relacionado
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <ProgressButton course={course} activity={`${lessonNumber}. ${plannedLesson.lessonTitle}`} />
              </div>
            </article>

            <div className="mt-6 flex flex-wrap justify-between gap-3">
              {previous ? (
                <Link href={previous} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white">
                  Leccion anterior
                </Link>
              ) : <span />}
              <Link href={next} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                {lessonNumber < lessons.length ? 'Siguiente leccion' : 'Ir a evaluacion'}
              </Link>
            </div>
          </div>
        </main>
        <AppFooter />
      </div>
    );
  }

  if (!courseName || !title || lessonNumber < 1 || lessonNumber > 25) {
    notFound();
  }

  const previous = lessonNumber > 1 ? `/courses/${course}/lessons/${lessonNumber - 1}` : null;
  const next = lessonNumber < 25 ? `/courses/${course}/lessons/${lessonNumber + 1}` : `/courses/${course}/quiz`;
  const detail = getLessonDetail(course, courseName, title, lessonNumber);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <Link href={`/courses/${course}/lessons#lesson-${lessonNumber}`} className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Volver al listado de lecciónes
          </Link>

          <article className="mt-6 rounded-lg bg-white p-8 shadow">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              {courseName} | Módulo {detail.moduleNumber} | Lección {lessonNumber}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold text-gray-900">{title}</h1>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              {detail.objective}
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
              <section>
                <h2 className="text-2xl font-bold text-gray-900">Explicacion guiada</h2>
                <div className="mt-4 space-y-4 text-gray-600">
                  {detail.explanation.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <aside className="rounded-lg bg-blue-50 p-5">
                <h2 className="font-semibold text-blue-900">Checklist de estudio</h2>
                <ul className="mt-3 space-y-2 text-sm text-blue-800">
                  {detail.checklist.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </aside>
            </div>

            <div className="mt-8 rounded-md bg-gray-950 p-5 font-mono text-sm text-green-200">
              <pre>{detail.example}</pre>
            </div>

            <div className="mt-6 rounded-md bg-gray-50 p-5">
              <h2 className="font-semibold text-gray-900">Practica sugerida</h2>
              <p className="mt-2 text-sm text-gray-700">{detail.practice}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href={detail.exerciseHref} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white">
                  Ir al ejercicio relacionado
                </Link>
                <Link href={detail.challengeHref} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white">
                  Ir al reto relacionado
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <ProgressButton course={course} activity={`${lessonNumber}. ${title}`} />
            </div>
          </article>

          <div className="mt-6 flex flex-wrap justify-between gap-3">
            {previous ? (
              <Link href={previous} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white">
                Lección anterior
              </Link>
            ) : <span />}
            <Link href={next} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              {lessonNumber < 25 ? 'Siguiente lección' : 'Ir a evaluación'}
            </Link>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

