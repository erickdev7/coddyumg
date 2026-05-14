import Link from 'next/link';
import AppFooter from '@/app/components/AppFooter';
import SiteHeader from '@/app/components/SiteHeader';

const sections = [
  {
    title: 'Módulos',
    description: 'Ruta organizada por nivel con objetivos, actividades y proyecto por modulo.',
    href: '/courses/cpp/modules',
    color: 'bg-green-700 hover:bg-green-800',
  },
  {
    title: 'Lecciónes',
    description: 'Fundamentos de entrada/salida, arreglos, ciclos, clases y objetos con ejemplos.',
    href: '/courses/cpp/lessons',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    title: 'Ejercicios',
    description: 'Prácticas guiadas para escribir programás pequeños y registrar progreso.',
    href: '/courses/cpp/exercises',
    color: 'bg-green-600 hover:bg-green-700',
  },
  {
    title: 'Retos',
    description: 'Problemás de logica y POO para reforzar algoritmos y estructuras.',
    href: '/courses/cpp/challenges',
    color: 'bg-red-600 hover:bg-red-700',
  },
  {
    title: 'Evaluación',
    description: 'Quiz corto para medir comprension y guardar puntaje automatico.',
    href: '/courses/cpp/quiz',
    color: 'bg-gray-900 hover:bg-gray-700',
  },
];

export default function CppCourse() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Curso de C++</h1>
            <p className="mt-4 text-xl text-gray-500">Domina fundamentos, estructuras y objetos con practica constante.</p>
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

