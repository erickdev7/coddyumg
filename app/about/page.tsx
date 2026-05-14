import Image from 'next/image';
import AppFooter from '@/app/components/AppFooter';
import SiteHeader from '@/app/components/SiteHeader';

const features = [
  'Cursos completos de Python, C++ y Java.',
  'Lecciones, ejercicios, retos y evaluaciones por módulo.',
  'Progreso personalizado para cada alumno.',
  'Panel docente para monitoreo y gestion de contenido.',
  'Contenido adicional publicado desde Supabase con uso controlado.',
];

const technologies = ['Next.js', 'React', 'Tailwind CSS', 'Supabase Auth', 'Supabase Database'];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Acerca de</p>
            <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">CoddyUMG</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              CoddyUMG es una plataforma educativa creada para apoyar el aprendizaje de programación mediante rutas claras,
              practicas guiadas, retos y seguimiento de avance. Esta pensada para que el alumno estudie a su ritmo y para que el
              docente pueda revisar progreso y agregar contenido sin modificar código.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <section className="rounded-lg bg-white p-6 shadow">
                <h2 className="text-xl font-bold text-gray-900">Objetivo</h2>
                <p className="mt-3 text-gray-600">
                  Facilitar una experiencia ordenada para aprender fundamentos, practicar con ejemplos y completar actividades
                  evaluables en los lenguajes principales del curso.
                </p>
              </section>
              <section className="rounded-lg bg-white p-6 shadow">
                <h2 className="text-xl font-bold text-gray-900">Creador</h2>
                <p className="mt-3 font-semibold text-gray-900">Erick Aguilar</p>
                <p className="mt-1 text-gray-600">eduaguilar619@gmail.com</p>
              </section>
            </div>

            <section className="mt-8 rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-bold text-gray-900">Funciones principales</h2>
              <ul className="mt-4 grid gap-3 text-gray-600 md:grid-cols-2">
                {features.map((feature) => (
                  <li key={feature} className="rounded-md bg-gray-50 px-4 py-3">
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8 rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-bold text-gray-900">Tecnologias usadas</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <span key={technology} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                    {technology}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <aside className="rounded-lg bg-white p-8 text-center shadow lg:sticky lg:top-24 lg:self-start">
            <Image src="/logocoddyumg.png" alt="Logo CoddyUMG" width={260} height={260} className="mx-auto h-52 w-52 object-contain" />
            <h2 className="mt-6 text-2xl font-bold text-gray-900">Plataforma educativa de programación</h2>
            <p className="mt-3 text-sm text-gray-600">
              Aprende, practica, guarda progreso y demuestra tus avances.
            </p>
          </aside>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
