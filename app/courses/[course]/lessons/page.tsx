import Link from 'next/link';
import { notFound } from 'next/navigation';
import AppFooter from '@/app/components/AppFooter';
import ProgressButton from '@/app/components/ProgressButton';
import SiteHeader from '@/app/components/SiteHeader';
import { getCourseLessons, getLessonContent, getLessonExample, plannedCourses } from '@/lib/plannedCourses';

export function generateStaticParams() {
  return Object.keys(plannedCourses).map((course) => ({ course }));
}

export default async function PlannedLessonsPage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  const data = plannedCourses[course];

  if (!data) notFound();

  const lessons = getCourseLessons(course);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link href={`/courses/${course}`} className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Volver al curso
          </Link>
          <div className="mt-6 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Lecciones de {data.title}</h1>
            <p className="mt-4 text-xl text-gray-500">Concepto, explicacion, ejemplo y practica por tema.</p>
          </div>

          <div className="mt-16 space-y-8">
            {lessons.map(({ lesson, module }, index) => (
              <section key={`${module.title}-${lesson}`} id={`lesson-${index + 1}`} className="scroll-mt-24 rounded-lg bg-white p-8 shadow">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                    Modulo {Math.floor(index / 5) + 1}
                  </span>
                  <h2 className="text-2xl font-semibold text-gray-900">{index + 1}. {lesson}</h2>
                </div>
                <p className="mt-3 text-gray-600">{getLessonContent(data, module.title, lesson)}</p>
                <pre className="mt-5 overflow-x-auto rounded-md bg-gray-950 p-4 text-sm text-green-200">
                  <code>{getLessonExample(data, lesson)}</code>
                </pre>
                <div className="mt-5 rounded-md bg-blue-50 p-4">
                  <p className="text-sm font-semibold text-blue-900">Practica sugerida</p>
                  <p className="mt-1 text-sm text-blue-800">Adapta el ejemplo a un caso propio de {data.title} y documenta el resultado.</p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link href={`/courses/${course}/lessons/${index + 1}`} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Vista individual
                  </Link>
                  <ProgressButton course={course} activity={`${index + 1}. ${lesson}`} />
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
