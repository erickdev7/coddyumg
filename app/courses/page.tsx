'use client';

import Link from 'next/link';
import AppFooter from '@/app/components/AppFooter';
import CourseAccessActions from '@/app/components/CourseAccessActions';
import SiteHeader from '@/app/components/SiteHeader';
import { useAuth } from '@/app/components/AuthProvider';
import type { CourseKey } from '@/lib/types';

const activeCourses = [
  {
    title: 'Python',
    course: 'python' as CourseKey,
    href: '/courses/python',
    modulesHref: '/courses/python/modules',
    color: 'bg-blue-600 hover:bg-blue-700',
    description: 'Ideal para iniciar: sintaxis clara, automatizacion, datos y pensamiento logico.',
    topics: ['25 lecciones completas', '25 ejercicios practicos', '25 retos aplicados', '5 evaluaciones'],
  },
  {
    title: 'C++',
    course: 'cpp' as CourseKey,
    href: '/courses/cpp',
    modulesHref: '/courses/cpp/modules',
    color: 'bg-green-600 hover:bg-green-700',
    description: 'Enfoque en fundamentos fuertes: memoria, estructuras, objetos y algoritmos.',
    topics: ['25 lecciones completas', '25 ejercicios practicos', '25 retos aplicados', '5 evaluaciones'],
  },
  {
    title: 'Java',
    course: 'java' as CourseKey,
    href: '/courses/java',
    modulesHref: '/courses/java/modules',
    color: 'bg-red-600 hover:bg-red-700',
    description: 'Practica programacion orientada a objetos para crear aplicaciones ordenadas.',
    topics: ['25 lecciones completas', '25 ejercicios practicos', '25 retos aplicados', '5 evaluaciones'],
  },
];

const upcomingCategories = [
  {
    title: 'Bases de datos',
    description: 'Categoria lista para material de modelado, SQL, PostgreSQL, Supabase y administracion de datos.',
    courses: [
      {
        title: 'Fundamentos de Bases de Datos',
        description: 'Modelo relacional, tablas, llaves, normalizacion y consultas basicas.',
        topics: ['Modelo entidad-relacion', 'SQL basico', 'Normalizacion', 'PostgreSQL y Supabase'],
      },
      {
        title: 'SQL Intermedio',
        description: 'Joins, agregaciones, vistas, indices y buenas practicas para consultas.',
        topics: ['Joins', 'Group by', 'Vistas', 'Indices'],
      },
    ],
  },
  {
    title: 'Redes',
    description: 'Categoria preparada para fundamentos de redes, servicios, seguridad y diagnostico.',
    courses: [
      {
        title: 'Fundamentos de Redes',
        description: 'Modelo OSI/TCP-IP, direccionamiento, subredes, routing basico y herramientas.',
        topics: ['TCP/IP', 'Subnetting', 'DNS y DHCP', 'Diagnostico'],
      },
      {
        title: 'Servicios de Red',
        description: 'Configuracion conceptual de servicios comunes y monitoreo basico.',
        topics: ['HTTP', 'DNS', 'SSH', 'Monitoreo'],
      },
    ],
  },
  {
    title: 'Desarrollo Web',
    description: 'Ruta futura para frontend, backend, APIs, autenticacion, despliegue e integracion con bases de datos.',
    courses: [
      {
        title: 'Frontend',
        description: 'HTML, CSS, JavaScript, componentes, estado y consumo de APIs.',
        topics: ['HTML/CSS', 'JavaScript', 'React', 'UI responsive'],
      },
      {
        title: 'Backend y APIs',
        description: 'Rutas, controladores, validacion, autenticacion, REST y conexion a datos.',
        topics: ['REST APIs', 'Auth', 'Validacion', 'Integracion con DB'],
      },
    ],
  },
  {
    title: 'Ciberseguridad',
    description: 'Categoria adicional preparada para fundamentos de seguridad, buenas practicas y defensa de aplicaciones.',
    courses: [
      {
        title: 'Seguridad Basica',
        description: 'Principios de seguridad, contrasenas, amenazas comunes y proteccion de datos.',
        topics: ['Amenazas comunes', 'Buenas practicas', 'OWASP inicial', 'Proteccion de cuentas'],
      },
      {
        title: 'Seguridad Web',
        description: 'Validacion de entradas, sesiones, permisos, errores seguros y hardening basico.',
        topics: ['Validacion', 'Sesiones', 'Permisos', 'Hardening'],
      },
    ],
  },
];

const levels = [
  {
    title: 'Basico',
    description: 'Variables, salida en consola, condicionales, ciclos y primeras estructuras.',
  },
  {
    title: 'Intermedio',
    description: 'Funciones, listas, vectores, clases, colecciones y programacion orientada a objetos.',
  },
  {
    title: 'Avanzado',
    description: 'Errores, archivos, herencia, interfaces, datos, retos integradores y evaluaciones.',
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
              Explora las categorias de CoddyUMG. Programacion Basica ya esta activa; las demas quedan listas para crear su estructura y contenido.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            <section>
              <div className="mb-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Categoria activa</p>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">Programacion Basica</h2>
                <p className="mt-2 max-w-3xl text-gray-600">Cursos actuales con ruta completa, acceso por autorizacion y progreso del alumno.</p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {activeCourses.map((course) => (
                  <article key={course.title} className="flex flex-col rounded-lg bg-white p-6 shadow">
                    <h3 className="text-2xl font-semibold text-gray-900">{course.title}</h3>
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
            </section>

            {upcomingCategories.map((category) => (
              <section key={category.title}>
                <div className="mb-5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Listo para estructurar</p>
                  <h2 className="mt-2 text-3xl font-bold text-gray-900">{category.title}</h2>
                  <p className="mt-2 max-w-3xl text-gray-600">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {category.courses.map((course) => (
                    <article key={course.title} className="flex flex-col rounded-lg border border-dashed border-gray-300 bg-white p-6 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-2xl font-semibold text-gray-900">{course.title}</h3>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
                          Proximamente
                        </span>
                      </div>
                      <p className="mt-3 text-gray-600">{course.description}</p>
                      <ul className="mt-5 space-y-2 text-sm text-gray-600">
                        {course.topics.map((topic) => (
                          <li key={topic} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 rounded-md bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">
                        El admin ya puede preparar contenido para esta categoria desde Gestionar contenido.
                      </p>
                    </article>
                  ))}
                </div>
              </section>
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
                <h3 className="font-semibold text-gray-900">Lecciones</h3>
                <p className="mt-2 text-sm text-gray-600">Marca cada tema visto para construir tu historial de estudio.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ejercicios</h3>
                <p className="mt-2 text-sm text-gray-600">Practica conceptos concretos y guarda puntajes para comparar tu avance.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Retos</h3>
                <p className="mt-2 text-sm text-gray-600">Resuelve problemas mas abiertos para preparar evaluaciones y proyectos.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
