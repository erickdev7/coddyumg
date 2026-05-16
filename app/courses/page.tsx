'use client';

import AppFooter from '@/app/components/AppFooter';
import CourseAccessActions from '@/app/components/CourseAccessActions';
import SiteHeader from '@/app/components/SiteHeader';
import { useAuth } from '@/app/components/AuthProvider';
import Link from 'next/link';
import type { CourseKey } from '@/lib/types';

const courses = [
  {
    title: 'Python',
    course: 'python' as CourseKey,
    href: '/courses/python',
    modulesHref: '/courses/python/modules',
    color: 'bg-blue-600 hover:bg-blue-700',
    description: 'Ideal para iniciar: sintaxis clara, automatizacion, datos y pensamiento logico.',
    topics: ['25 lecciónes completas', '25 ejercicios prácticos', '25 retos aplicados', '5 evaluaciónes'],
  },
  {
    title: 'C++',
    course: 'cpp' as CourseKey,
    href: '/courses/cpp',
    modulesHref: '/courses/cpp/modules',
    color: 'bg-green-600 hover:bg-green-700',
    description: 'Enfoque en fundamentos fuertes: memoria, estructuras, objetos y algoritmos.',
    topics: ['25 lecciónes completas', '25 ejercicios prácticos', '25 retos aplicados', '5 evaluaciónes'],
  },
  {
    title: 'Java',
    course: 'java' as CourseKey,
    href: '/courses/java',
    modulesHref: '/courses/java/modules',
    color: 'bg-red-600 hover:bg-red-700',
    description: 'Practica programación orientada a objetos para crear aplicaciónes ordenadas.',
    topics: ['25 lecciónes completas', '25 ejercicios prácticos', '25 retos aplicados', '5 evaluaciónes'],
  },
];

const levels = [
  {
    title: 'Basico',
    description: 'Variables, salida en consola, condicionales, ciclos y primeras estructuras.',
  },
  {
    title: 'Intermedio',
    description: 'Funciones, listas, vectores, clases, colecciónes y programación orientada a objetos.',
  },
  {
    title: 'Avanzado',
    description: 'Errores, archivos, herencia, interfaces, datos, retos integradores y evaluaciónes.',
  },
];

export default function CoursesPage() {
  const { profile } = useAuth();

  if (profile?.role === 'teacher') {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <SiteHeader />

        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Administracion CoddyUMG</p>
              <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">Gestion academica</h1>
              <p className="mt-4 text-xl text-gray-500">
                Esta cuenta es docente. Desde aqui puedes revisar solicitudes, monitorear progreso y administrar contenido publicado.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Link href="/teacher" className="rounded-lg bg-white p-6 shadow transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Panel</p>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900">Solicitudes y progreso</h2>
                <p className="mt-3 text-gray-600">Aprueba accesos por curso, revisa avance de alumnos y exporta reportes.</p>
              </Link>

              <Link href="/teacher/content" className="rounded-lg bg-white p-6 shadow transition hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Contenido</p>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900">Gestionar material</h2>
                <p className="mt-3 text-gray-600">Crea, edita, duplica, publica u oculta contenido adicional para los cursos.</p>
              </Link>
            </div>
          </div>
        </main>

        <AppFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Cursos CoddyUMG</p>
            <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">Rutas de aprendizaje</h1>
            <p className="mt-4 text-xl text-gray-500">
              Elige un lenguaje y avanza con 80 actividades por curso: lecciónes, ejercicios, retos y evaluaciónes por modulo.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {courses.map((course) => (
              <article key={course.title} className="flex flex-col rounded-lg bg-white p-6 shadow">
                <h2 className="text-2xl font-semibold text-gray-900">{course.title}</h2>
                <p className="mt-3 text-gray-600">{course.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-gray-600">
                  {course.topics.map((topic) => (
                    <li key={topic} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <CourseAccessActions course={course.course} href={course.href} modulesHref={course.modulesHref} color={course.color} />
                </div>
              </article>
            ))}
          </div>

          <section className="mt-16 rounded-lg bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-gray-900">Ruta por nivel</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {levels.map((level) => (
                <article key={level.title} className="rounded-lg border border-gray-200 p-5">
                  <h3 className="font-semibold text-gray-900">{level.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{level.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16 rounded-lg bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-gray-900">Como se mide tu avance</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <h3 className="font-semibold text-gray-900">Lecciónes</h3>
                <p className="mt-2 text-sm text-gray-600">Marca cada tema visto para construir tu historial de estudio.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ejercicios</h3>
                <p className="mt-2 text-sm text-gray-600">Practica conceptos concretos y guarda puntajes para comparar tu avance.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Retos</h3>
                <p className="mt-2 text-sm text-gray-600">Resuelve problemás más abiertos para preparar evaluaciónes y proyectos.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

