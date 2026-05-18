import Link from 'next/link';
import { notFound } from 'next/navigation';
import AppFooter from '@/app/components/AppFooter';
import CourseModules from '@/app/components/CourseModules';
import SiteHeader from '@/app/components/SiteHeader';
import { getCourseLessons, plannedCourses } from '@/lib/plannedCourses';

export function generateStaticParams() {
  return Object.keys(plannedCourses).map((course) => ({ course }));
}

export default async function PlannedModulesPage({
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
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link href={`/courses/${course}`} className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Volver al curso
          </Link>
          <div className="mb-12 mt-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{data.category}</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Modulos de {data.title}</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-600">Ruta completa con enlaces directos a lecciones, ejercicios y retos.</p>
          </div>
          <CourseModules
            courseName={data.title}
            accentClass="text-blue-600"
            quizHref={`/courses/${course}/quiz`}
            modules={data.modules.map((module, index) => ({
              level: `Modulo ${index + 1}`,
              title: module.title,
              description: module.goal,
              outcomes: lessons.slice(index * 5, index * 5 + 5).map(({ lesson }) => `Dominar ${lesson.toLowerCase()}`),
              activities: [`Lecciones ${index * 5 + 1} a ${index * 5 + 5}`, `Ejercicios ${index * 5 + 1} a ${index * 5 + 5}`, `Retos ${index * 5 + 1} a ${index * 5 + 5}`],
              project: module.project,
              hrefs: {
                lesson: `/courses/${course}/lessons#lesson-${index * 5 + 1}`,
                exercise: `/courses/${course}/exercises#exercise-${index * 5 + 1}`,
                challenge: `/courses/${course}/challenges#challenge-${index * 5 + 1}`,
              },
            }))}
          />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
