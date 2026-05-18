'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SiteHeader from '@/app/components/SiteHeader';
import { useAuth } from '@/app/components/AuthProvider';
import { plannedCourses } from '@/lib/plannedCourses';
import type { ProgressEntry } from '@/lib/types';

const COURSE_LABELS: Record<string, string> = {
  python: 'Python',
  cpp: 'C++',
  java: 'Java',
  ...Object.fromEntries(Object.entries(plannedCourses).map(([key, course]) => [key, course.title])),
};

const COURSE_TOTALS: Record<string, number> = {
  python: 80,
  cpp: 80,
  java: 80,
  ...Object.fromEntries(Object.keys(plannedCourses).map((course) => [course, 25])),
};

const COURSE_CATEGORY_TOTALS: Record<string, Record<string, number>> = {
  python: {
    lesson: 25,
    exercise: 25,
    challenge: 25,
    quiz: 5,
  },
  cpp: {
    lesson: 25,
    exercise: 25,
    challenge: 25,
    quiz: 5,
  },
  java: {
    lesson: 25,
    exercise: 25,
    challenge: 25,
    quiz: 5,
  },
  ...Object.fromEntries(
    Object.keys(plannedCourses).map((course) => [
      course,
      {
        lesson: 10,
        exercise: 5,
        challenge: 5,
        quiz: 5,
      },
    ]),
  ),
};

const NEXT_LINKS: Record<string, string> = {
  python: '/courses/python',
  cpp: '/courses/cpp',
  java: '/courses/java',
  ...Object.fromEntries(Object.keys(plannedCourses).map((course) => [course, `/courses/${course}`])),
};

const COURSE_ROUTE_LINKS: Record<string, Array<{ href: string; label: string }>> = {
  python: [
    { href: '/courses/python/modules', label: 'Modulos' },
    { href: '/courses/python/lessons', label: 'Lecciones' },
    { href: '/courses/python/exercises', label: 'Ejercicios' },
    { href: '/courses/python/challenges', label: 'Retos' },
    { href: '/courses/python/quiz', label: 'Evaluacion' },
  ],
  cpp: [
    { href: '/courses/cpp/modules', label: 'Modulos' },
    { href: '/courses/cpp/lessons', label: 'Lecciones' },
    { href: '/courses/cpp/exercises', label: 'Ejercicios' },
    { href: '/courses/cpp/challenges', label: 'Retos' },
    { href: '/courses/cpp/quiz', label: 'Evaluacion' },
  ],
  java: [
    { href: '/courses/java/modules', label: 'Modulos' },
    { href: '/courses/java/lessons', label: 'Lecciones' },
    { href: '/courses/java/exercises', label: 'Ejercicios' },
    { href: '/courses/java/challenges', label: 'Retos' },
    { href: '/courses/java/quiz', label: 'Evaluacion' },
  ],
  ...Object.fromEntries(
    Object.keys(plannedCourses).map((course) => [
      course,
      [
        { href: `/courses/${course}/modules`, label: 'Modulos' },
        { href: `/courses/${course}/lessons`, label: 'Lecciones' },
        { href: `/courses/${course}/exercises`, label: 'Ejercicios' },
        { href: `/courses/${course}/challenges`, label: 'Retos' },
        { href: `/courses/${course}/quiz`, label: 'Evaluacion' },
      ],
    ]),
  ),
};

const CATEGORY_LABELS: Record<string, string> = {
  lesson: 'Lecciones',
  exercise: 'Ejercicios',
  challenge: 'Retos',
  quiz: 'Evaluaciones',
  other: 'Otras actividades',
};

function getActivityCategory(activity: string) {
  const normalized = activity.toLowerCase();

  if (normalized.includes('evaluacion') || normalized.includes('evaluación')) return 'quiz';
  if (normalized.includes('ejercicio')) return 'exercise';
  if (normalized.includes('reto')) return 'challenge';
  if (/^\d+\./.test(normalized) || normalized.includes('leccion')) return 'lesson';
  return 'other';
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-GT', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function DashboardPage() {
  const router = useRouter();
  const { session, profile, loading } = useAuth();
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!loading && !session) {
      router.push('/auth');
    }
  }, [loading, router, session]);

  useEffect(() => {
    if (!loading && profile?.role === 'teacher') {
      router.push('/teacher');
    }
  }, [loading, profile?.role, router]);

  useEffect(() => {
    if (!session) return;

    fetch('/api/progress', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || 'No se pudo cargar el progreso');
        setProgress(body.data || []);
      })
      .catch((error) => setStatus(error.message));
  }, [session]);

  const completed = progress.filter((entry) => entry.completed).length;
  const averageScore = progress.length
    ? Math.round(progress.reduce((total, entry) => total + (entry.score ?? 0), 0) / progress.length)
    : 0;

  const byCourse = useMemo(() => {
    return progress.reduce<Record<string, { total: number; completed: number; score: number }>>((accumulator, entry) => {
      const current = accumulator[entry.course] || { total: 0, completed: 0, score: 0 };
      current.total += 1;
      current.completed += entry.completed ? 1 : 0;
      current.score += entry.score ?? 0;
      accumulator[entry.course] = current;
      return accumulator;
    }, {});
  }, [progress]);

  const byCourseCategory = useMemo(() => {
    return progress.reduce<Record<string, Record<string, { total: number; completed: number; score: number }>>>((accumulator, entry) => {
      const category = getActivityCategory(entry.activity);
      const courseSummary = accumulator[entry.course] || {};
      const current = courseSummary[category] || { total: 0, completed: 0, score: 0 };
      current.total += 1;
      current.completed += entry.completed ? 1 : 0;
      current.score += entry.score ?? 0;
      courseSummary[category] = current;
      accumulator[entry.course] = courseSummary;
      return accumulator;
    }, {});
  }, [progress]);

  const courseCards = Object.keys(COURSE_LABELS).map((course) => {
    const summary = byCourse[course] || { total: 0, completed: 0, score: 0 };
    const expectedTotal = COURSE_TOTALS[course] || 1;
    const percent = Math.min(100, Math.round((summary.completed / expectedTotal) * 100));

    return {
      course,
      label: COURSE_LABELS[course],
      total: summary.total,
      completed: summary.completed,
      percent,
      average: summary.total ? Math.round(summary.score / summary.total) : 0,
      href: NEXT_LINKS[course],
    };
  });

  const bestCourse = [...courseCards].sort((a, b) => b.percent - a.percent)[0];
  const nextCourse = courseCards.find((course) => course.percent < 100) || bestCourse;
  const studentName = profile?.full_name || 'Alumno';
  const studentEmail = profile?.email || session?.user.email || '';
  const certificateCourse = bestCourse;
  const certificateReady = certificateCourse.percent === 100;
  const lastActivity = progress[0];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
            <section>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Mi progreso</p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Panel del alumno</h1>
              <p className="mt-3 max-w-2xl text-gray-600">
                Revisa tus avances, puntajes y entra a la ruta completa de cada curso: lecciones, ejercicios, retos y evaluaciones.
              </p>
            </section>

            <aside className="rounded-lg bg-white p-6 shadow">
              <p className="text-sm font-medium text-gray-500">Alumno</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">{studentName}</p>
              {studentEmail ? <p className="mt-1 text-sm text-gray-500">{studentEmail}</p> : null}
              <Link
                href={nextCourse.href}
                className="mt-5 inline-flex w-full justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                Abrir ruta de {nextCourse.label}
              </Link>
            </aside>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-sm font-medium text-gray-500">Actividades</p>
              <p className="mt-2 text-4xl font-bold text-gray-900">{progress.length}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-sm font-medium text-gray-500">Completadas</p>
              <p className="mt-2 text-4xl font-bold text-green-600">{completed}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-sm font-medium text-gray-500">Cursos activos</p>
              <p className="mt-2 text-4xl font-bold text-blue-600">{Object.keys(byCourse).length}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-sm font-medium text-gray-500">Promedio</p>
              <p className="mt-2 text-4xl font-bold text-gray-900">{averageScore}</p>
            </div>
          </div>

          {lastActivity ? (
            <section className="mt-10 rounded-lg bg-white p-6 shadow">
              <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Ultima actividad</p>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">{lastActivity.activity}</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {COURSE_LABELS[lastActivity.course] || lastActivity.course} | Puntaje {lastActivity.score ?? 0} |{' '}
                    {formatDate(lastActivity.updated_at)}
                  </p>
                </div>
                <Link
                  href={NEXT_LINKS[lastActivity.course] || '/courses'}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Abrir curso completo
                </Link>
              </div>
            </section>
          ) : null}

          <section className="mt-10">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Avance por curso</h2>
                <p className="mt-1 text-sm text-gray-500">Porcentaje estimado segun las actividades disponibles actualmente.</p>
              </div>
              <Link href="/courses" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                Ver cursos
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {courseCards.map((course) => (
                <article key={course.course} className="rounded-lg bg-white p-6 shadow">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-gray-900">{course.label}</h3>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">{course.percent}%</span>
                  </div>
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-green-500" style={{ width: `${course.percent}%` }} />
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    {course.completed} completadas, {course.total} registradas, promedio {course.average}.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link href={course.href} className="inline-flex rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
                      Ruta completa
                    </Link>
                    {(COURSE_ROUTE_LINKS[course.course] || []).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Avance por tipo de actividad</h2>
              <p className="mt-1 text-sm text-gray-500">Separacion por curso contra el total disponible en cada ruta.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {Object.keys(COURSE_LABELS).map((course) => {
                const courseCategoryTotals = COURSE_CATEGORY_TOTALS[course] || {};
                const categoryKeys = Object.keys(CATEGORY_LABELS).filter(
                  (category) => courseCategoryTotals[category] || byCourseCategory[course]?.[category]?.total,
                );

                return (
                  <article key={course} className="rounded-lg bg-white p-5 shadow">
                    <h3 className="text-lg font-semibold text-gray-900">{COURSE_LABELS[course]}</h3>
                    <div className="mt-4 space-y-4">
                      {categoryKeys.map((category) => {
                        const summary = byCourseCategory[course]?.[category] || { total: 0, completed: 0, score: 0 };
                        const expectedTotal = courseCategoryTotals[category] || summary.total;
                        const percent = expectedTotal ? Math.min(100, Math.round((summary.completed / expectedTotal) * 100)) : 0;
                        const average = summary.total ? Math.round(summary.score / summary.total) : 0;

                        return (
                          <div key={category}>
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-sm font-medium text-gray-700">{CATEGORY_LABELS[category]}</p>
                              <p className="text-sm font-semibold text-blue-700">{percent}%</p>
                            </div>
                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                              <div className="h-full rounded-full bg-blue-500" style={{ width: `${percent}%` }} />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              {summary.completed}/{expectedTotal} | Promedio {average}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="mt-10 rounded-lg bg-white p-6 shadow">
            <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Constancia</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {certificateReady ? 'Constancia lista para presentar' : 'Constancia en progreso'}
                </h2>
                <p className="mt-3 text-gray-600">
                  {certificateReady
                    ? `Has completado el 100% de ${certificateCourse.label} y puedes mostrar tu constancia.`
                    : `Completa el 100% de ${certificateCourse.label} para desbloquear la constancia.`}
                </p>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-blue-600" style={{ width: `${certificateCourse.percent}%` }} />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {certificateCourse.label}: {certificateCourse.percent}% | Promedio: {certificateCourse.average}
                </p>
                <Link
                  href={`/certificate?course=${certificateCourse.course}`}
                  className="mt-5 inline-flex rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Ver constancia formal
                </Link>
              </div>
              <div className={`rounded-lg border p-5 text-center ${certificateReady ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">CoddyUMG</p>
                <p className="mt-3 text-xl font-bold text-gray-900">{studentName}</p>
                <p className="mt-2 text-sm text-gray-600">
                  {certificateReady ? 'Reconocimiento por completar el curso de programacion.' : 'Sigue practicando para desbloquear esta constancia.'}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-lg bg-white shadow">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">Actividad reciente del alumno</h2>
            </div>
            {status ? <p className="px-6 py-4 text-sm text-red-600">{status}</p> : null}
            <div className="divide-y divide-gray-100">
              {progress.length ? (
                progress.map((entry) => (
                  <div key={entry.id} className="grid gap-3 px-6 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <p className="font-medium text-gray-900">{entry.activity}</p>
                      <p className="text-sm text-gray-500">
                        {COURSE_LABELS[entry.course] || entry.course} | Puntaje {entry.score ?? 0} | {formatDate(entry.updated_at)}
                      </p>
                    </div>
                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${entry.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {entry.completed ? 'Completado' : 'En progreso'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="px-6 py-8 text-gray-600">Aún no hay progreso guardado. Completa una lección, ejercicio o reto para iniciar tu historial.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
