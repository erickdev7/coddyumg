import Image from 'next/image';
import Link from 'next/link';
import AppFooter from '@/app/components/AppFooter';
import SiteHeader from '@/app/components/SiteHeader';

const courses = [
  {
    title: 'Python',
    description: 'Sintaxis clara, ejercicios con editor, manejo de errores, archivos y retos aplicados.',
    href: '/courses/python',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    title: 'C++',
    description: 'Fundamentos fuertes, funciones, vectores, clases y problemás de algoritmos.',
    href: '/courses/cpp',
    color: 'bg-green-600 hover:bg-green-700',
  },
  {
    title: 'Java',
    description: 'Programación orientada a objetos, encapsulacion, excepciones y colecciónes.',
    href: '/courses/java',
    color: 'bg-red-600 hover:bg-red-700',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">CoddyUMG</p>
              <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-6xl">
                Plataforma educativa para aprender programación
              </h1>
              <p className="mt-5 text-xl text-gray-600">
              Cursos de Python, C++ y Java con 25 lecciónes por lenguaje, ejercicios prácticos, retos, evaluaciónes por modulo, progreso del alumno y monitoreo docente.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/courses" className="rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700">
                  Ver rutas
                </Link>
                <Link href="/dashboard" className="rounded-md border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-white">
                  Mi progreso
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="rounded-lg bg-white p-6 shadow">
                <Image
                  src="/logocoddyumg.png"
                  alt="Logo CoddyUMG"
                  width={320}
                  height={320}
                  className="h-56 w-56 object-contain sm:h-72 sm:w-72"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {courses.map((course) => (
              <article key={course.title} className="rounded-lg bg-white p-6 shadow">
                <h2 className="text-2xl font-semibold text-gray-900">{course.title}</h2>
                <p className="mt-3 text-gray-600">{course.description}</p>
                <Link href={course.href} className={`mt-6 inline-flex rounded-md px-4 py-2 text-sm font-medium text-white ${course.color}`}>
                  Abrir curso
                </Link>
              </article>
            ))}
          </div>

          <section className="mt-16 rounded-lg bg-white p-8 shadow">
            <h2 className="text-2xl font-bold text-gray-900">Qué incluye</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-4">
              {['Lecciones con ejemplos', 'Ejercicios prácticos', 'Retos por tema', 'Evaluaciones y constancia'].map((item) => (
                <div key={item} className="rounded-lg border border-gray-200 p-5">
                  <p className="font-semibold text-gray-900">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

