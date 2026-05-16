'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AppFooter from '@/app/components/AppFooter';
import SiteHeader from '@/app/components/SiteHeader';
import { useAuth } from '@/app/components/AuthProvider';
import type { CourseEnrollmentStatus, CourseKey } from '@/lib/types';

const courseLabels: Record<CourseKey, string> = {
  python: 'Python',
  cpp: 'C++',
  java: 'Java',
};

type EnrollmentState = CourseEnrollmentStatus | 'none';

export default function CourseAccessGate({ children, course }: { children: React.ReactNode; course: CourseKey }) {
  const { session, profile, loading } = useAuth();
  const [status, setStatus] = useState<EnrollmentState>('none');
  const [message, setMessage] = useState('');
  const [checking, setChecking] = useState(true);
  const [requesting, setRequesting] = useState(false);

  const courseName = courseLabels[course];
  const isTeacher = profile?.role === 'teacher';
  const isApproved = status === 'approved';

  const loadStatus = useCallback(async () => {
    if (!session) {
      setStatus('none');
      setChecking(false);
      return;
    }

    if (isTeacher) {
      setChecking(false);
      return;
    }

    setChecking(true);
    const response = await fetch(`/api/enrollments?course=${course}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    const body = await response.json();

    if (response.ok) {
      setStatus(body.data?.[0]?.status || 'none');
      setMessage('');
    } else {
      setMessage(body.error || 'No se pudo revisar el acceso');
    }
    setChecking(false);
  }, [course, isTeacher, session]);

  useEffect(() => {
    if (!loading) {
      // The effect synchronizes the course gate with the enrollment API.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadStatus();
    }
  }, [loadStatus, loading]);

  const requestAccess = async () => {
    if (!session) return;

    setRequesting(true);
    setMessage('');
    const response = await fetch('/api/enrollments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ course }),
    });
    const body = await response.json();

    if (response.ok) {
      setStatus(body.data?.status || 'pending');
      setMessage('Solicitud enviada. Un administrador debe aprobar tu acceso.');
    } else {
      setMessage(body.error || 'No se pudo solicitar acceso');
    }
    setRequesting(false);
  };

  const title = useMemo(() => {
    if (!session) return 'Inicia sesion para acceder';
    if (status === 'pending') return 'Solicitud pendiente';
    if (status === 'rejected') return 'Solicitud no aprobada';
    return 'Curso bloqueado';
  }, [session, status]);

  if (loading || checking) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center px-4">
          <p className="text-sm font-medium text-gray-600">Revisando acceso al curso...</p>
        </main>
        <AppFooter />
      </div>
    );
  }

  if (isTeacher) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <SiteHeader />
        <main className="flex-1">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <section className="rounded-lg bg-white p-8 shadow">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Administracion</p>
              <h1 className="mt-2 text-3xl font-extrabold text-gray-900">Panel docente</h1>
              <p className="mt-4 text-gray-600">
                Esta cuenta administra cursos y alumnos. Usa el panel para aprobar accesos, revisar progreso y gestionar contenido.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/teacher" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Ir a Admin
                </Link>
                <Link href="/teacher/content" className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Gestionar contenido
                </Link>
              </div>
            </section>
          </div>
        </main>
        <AppFooter />
      </div>
    );
  }

  if (isApproved) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <section className="rounded-lg bg-white p-8 shadow">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{courseName}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">{title}</h1>
            <p className="mt-4 text-gray-600">
              Para ver las lecciones, modulos, ejercicios, retos y evaluaciones de este curso necesitas que un administrador apruebe tu acceso.
            </p>

            {message ? <p className="mt-4 rounded-md bg-blue-50 p-3 text-sm font-medium text-blue-800">{message}</p> : null}

            <div className="mt-6 flex flex-wrap gap-3">
              {!session ? (
                <Link href="/auth" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Ingresar
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={requestAccess}
                  disabled={requesting || status === 'pending'}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {status === 'pending' ? 'Solicitud enviada' : requesting ? 'Enviando...' : 'Solicitar acceso'}
                </button>
              )}
              <Link href="/courses" className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Volver a cursos
              </Link>
            </div>
          </section>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
