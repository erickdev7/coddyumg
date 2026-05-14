import Link from 'next/link';
import AppFooter from '@/app/components/AppFooter';
import SiteHeader from '@/app/components/SiteHeader';

const sections = [
  {
    title: 'Módulos',
    description: 'Ruta organizada por nivel con objetivos, actividades y proyecto por modulo.',
    href: '/courses/python/modules',
    color: 'bg-blue-700 hover:bg-blue-800',
  },
  {
    title: 'Lecciónes',
    description: 'Conceptos explicados con ejemplos de variables, condiciones, ciclos, funciones y estructuras.',
    href: '/courses/python/lessons',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    title: 'Ejercicios',
    description: 'Prácticas interactivas con editor para guardar progreso y puntaje.',
    href: '/courses/python/exercises',
    color: 'bg-green-600 hover:bg-green-700',
  },
  {
    title: 'Retos',
    description: 'Problemás más completos con pasos sugeridos y ejemplos de entrada y salida.',
    href: '/courses/python/challenges',
    color: 'bg-red-600 hover:bg-red-700',
  },
  {
    title: 'Evaluación',
    description: 'Quiz corto para medir comprension y guardar puntaje automatico.',
    href: '/courses/python/quiz',
    color: 'bg-gray-900 hover:bg-gray-700',
  },
];

export default function PythonCourse() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Curso de Python</h1>
            <p className="mt-4 text-xl text-gray-500">Aprende Python desde cero con teoria, ejemplos, ejercicios y retos.</p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {sections.map((section) => (
              <article key={section.title} className="rounded-lg bg-white p-6 shadow">
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                <p className="mt-3 text-sm text-gray-600">{section.description}</p>
                <Link href={section.href} className={`mt-5 inline-flex rounded-md px-4 py-2 text-sm font-medium text-white ${section.color}`}>
                  Abrir
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

