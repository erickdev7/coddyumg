'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AppFooter from '@/app/components/AppFooter';
import SiteHeader from '@/app/components/SiteHeader';
import { useAuth } from '@/app/components/AuthProvider';
import type { ProgressEntry } from '@/lib/types';

const COURSE_TOTALS: Record<string, number> = {
  python: 80,
  cpp: 80,
  java: 80,
};

const COURSE_LABELS: Record<string, string> = {
  python: 'Python',
  cpp: 'C++',
  java: 'Java',
};

export default function CertificatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 p-8 text-gray-600">Cargando constancia...</div>}>
      <CertificateContent />
    </Suspense>
  );
}

function CertificateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, profile, loading } = useAuth();
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!loading && !session) {
      router.push('/auth');
    }
  }, [loading, router, session]);

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

  const studentName = profile?.full_name || profile?.email || 'Alumno';
  const courseSummary = useMemo(() => {
    return Object.keys(COURSE_LABELS).map((course) => {
      const entries = progress.filter((entry) => entry.course === course);
      const completedEntries = entries.filter((entry) => entry.completed);
      const average = entries.length ? Math.round(entries.reduce((sum, entry) => sum + (entry.score ?? 0), 0) / entries.length) : 0;
      const percent = Math.min(100, Math.round((completedEntries.length / COURSE_TOTALS[course]) * 100));

      return {
        course,
        label: COURSE_LABELS[course],
        average,
        completed: completedEntries.length,
        percent,
        total: COURSE_TOTALS[course],
      };
    });
  }, [progress]);
  const requestedCourse = searchParams.get('course') || '';
  const selectedCourseKey = COURSE_LABELS[requestedCourse]
    ? requestedCourse
    : courseSummary.find((course) => course.completed > 0)?.course || Object.keys(COURSE_LABELS)[0];
  const selectedCourse = courseSummary.find((course) => course.course === selectedCourseKey) || courseSummary[0];
  const certificateReady = selectedCourse.percent >= 80 && selectedCourse.average >= 70;
  const date = useMemo(() => new Intl.DateTimeFormat('es-GT', { dateStyle: 'long' }).format(new Date()), []);
  const folio = useMemo(() => {
    const source = `${profile?.id || profile?.email || 'coddyumg'}-${selectedCourseKey}-${new Date().getFullYear()}`;
    let hash = 0;
    for (let index = 0; index < source.length; index += 1) {
      hash = (hash * 31 + source.charCodeAt(index)) >>> 0;
    }
    return `CDY-${new Date().getFullYear()}-${String(hash).slice(0, 8).padStart(8, '0')}`;
  }, [profile?.email, profile?.id, selectedCourseKey]);

  return (
    <div className="certificate-print-page flex min-h-screen flex-col bg-gray-50">
      <div className="print:hidden">
        <SiteHeader />
      </div>
      <main className="flex-1">
        <div className="certificate-print-container mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
            <Link href="/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Volver a mi progreso
            </Link>
            <button onClick={() => window.print()} className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
              Imprimir o guardar PDF
            </button>
          </div>

          {status ? <p className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700 print:hidden">{status}</p> : null}

          <div className="mb-6 flex flex-wrap gap-2 print:hidden">
            {courseSummary.map((course) => (
              <Link
                key={course.course}
                href={`/certificate?course=${course.course}`}
                className={`rounded-md px-4 py-2 text-sm font-medium ${
                  course.course === selectedCourse.course
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {course.label}
              </Link>
            ))}
          </div>

          <section className="certificate-print-sheet rounded-lg border-4 border-blue-100 bg-white p-10 text-center shadow print:shadow-none">
            <div className="flex justify-center">
              <Image src="/logocoddyumg.png" alt="Logo CoddyUMG" width={150} height={150} className="h-28 w-28 object-contain" />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Constancia de avance</p>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900">CoddyUMG</h1>
            <p className="mt-3 text-sm font-semibold text-gray-500">Folio {folio}</p>
            <p className="mt-8 text-lg text-gray-600">Otorga la presente constancia a</p>
            <p className="mt-4 text-3xl font-bold text-gray-900">{studentName}</p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Por completar actividades de aprendizaje del curso de {selectedCourse.label} dentro de la plataforma CoddyUMG.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3 print:hidden">
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-blue-700">Avance del curso</p>
                <p className="text-3xl font-bold text-blue-900">{selectedCourse.percent}%</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-sm text-green-700">Promedio</p>
                <p className="text-3xl font-bold text-green-900">{selectedCourse.average}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-600">Estado</p>
                <p className="text-xl font-bold text-gray-900">{certificateReady ? 'Aprobado' : 'En progreso'}</p>
              </div>
            </div>
            <div className="mt-8 rounded-lg border border-gray-200 p-5 text-left print:hidden">
              <h2 className="text-center text-lg font-bold text-gray-900">Detalle de constancias por curso</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {courseSummary.map((course) => (
                  <Link
                    key={course.course}
                    href={`/certificate?course=${course.course}`}
                    className={`rounded-md p-4 print:text-inherit ${
                      course.course === selectedCourse.course ? 'bg-blue-50 ring-2 ring-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-gray-900">{course.label}</p>
                      <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-blue-700">{course.percent}%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                      <div className="h-full rounded-full bg-blue-600" style={{ width: `${course.percent}%` }} />
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      {course.completed}/{course.total} actividades | Promedio {course.average}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <p className="mt-10 text-sm text-gray-500">Emitida el {date}</p>
            <p className="mt-6 text-sm font-semibold text-gray-700">Erick Aguilar | Administrador CoddyUMG</p>
          </section>
        </div>
      </main>
      <div className="print:hidden">
        <AppFooter />
      </div>
    </div>
  );
}
