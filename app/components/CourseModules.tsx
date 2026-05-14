import Link from 'next/link';

export type CourseModule = {
  activities: string[];
  description: string;
  hrefs: {
    challenge: string;
    exercise: string;
    lesson: string;
  };
  level: string;
  outcomes: string[];
  project: string;
  title: string;
};

type CourseModulesProps = {
  accentClass: string;
  courseName: string;
  modules: CourseModule[];
  quizHref: string;
};

export default function CourseModules({ accentClass, courseName, modules, quizHref }: CourseModulesProps) {
  return (
    <div className="space-y-8">
      {modules.map((module, index) => (
        <section key={module.title} className="rounded-lg bg-white p-6 shadow">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className={`text-sm font-semibold uppercase tracking-wide ${accentClass}`}>{module.level}</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Módulo {index + 1}: {module.title}
              </h2>
              <p className="mt-3 max-w-3xl text-gray-600">{module.description}</p>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">{courseName}</span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div>
              <h3 className="font-semibold text-gray-900">Resultados esperados</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {module.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Actividades</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {module.activities.map((activity) => (
                  <li key={activity} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Proyecto del modulo</h3>
              <p className="mt-3 text-sm text-gray-600">{module.project}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={module.hrefs.lesson} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Estudiar lecciónes
            </Link>
            <Link href={module.hrefs.exercise} className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
              Practicar
            </Link>
            <Link href={module.hrefs.challenge} className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
              Resolver retos
            </Link>
          </div>
        </section>
      ))}

      <section className="rounded-lg bg-gray-900 p-6 text-white shadow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-300">Cierre del curso</p>
            <h2 className="mt-2 text-2xl font-bold">Evaluación final de {courseName}</h2>
            <p className="mt-2 text-gray-300">Completa los modulos y registra tu puntaje final para alimentar tu constancia.</p>
          </div>
          <Link href={quizHref} className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100">
            Ir a evaluación
          </Link>
        </div>
      </section>
    </div>
  );
}

