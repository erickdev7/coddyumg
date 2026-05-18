import Link from 'next/link';
import { notFound } from 'next/navigation';
import AppFooter from '@/app/components/AppFooter';
import QuizRunner from '@/app/components/QuizRunner';
import SiteHeader from '@/app/components/SiteHeader';
import { getCourseQuestions, plannedCourses } from '@/lib/plannedCourses';

export function generateStaticParams() {
  return Object.keys(plannedCourses).map((course) => ({ course }));
}

export default async function PlannedQuizPage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  const data = plannedCourses[course];

  if (!data) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link href={`/courses/${course}`} className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Volver al curso
          </Link>
          <div className="mb-10 mt-6 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Evaluacion de {data.title}</h1>
            <p className="mt-4 text-xl text-gray-500">Mide la comprension de los modulos y guarda tu puntaje.</p>
          </div>
          <QuizRunner course={course} title={`${data.title} Evaluacion final`} questions={getCourseQuestions(course)} />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
