'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/components/AuthProvider';
import type { CourseEnrollmentStatus, CourseKey } from '@/lib/types';

type EnrollmentState = CourseEnrollmentStatus | 'none';

const statusLabel: Record<EnrollmentState, string> = {
  none: 'Sin acceso',
  pending: 'Pendiente',
  approved: 'Aprobado',
  rejected: 'Rechazado',
};

export default function CourseAccessActions({ course, href, modulesHref, color }: { course: CourseKey; href: string; modulesHref: string; color: string }) {
  const { session, profile, loading } = useAuth();
  const [status, setStatus] = useState<EnrollmentState>('none');
  const [busy, setBusy] = useState(false);

  const loadStatus = useCallback(async () => {
    if (!session || profile?.role === 'teacher') return;

    const response = await fetch(`/api/enrollments?course=${course}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    const body = await response.json();

    if (response.ok) {
      setStatus(body.data?.[0]?.status || 'none');
    }
  }, [course, profile?.role, session]);

  useEffect(() => {
    if (!loading) {
      // The effect synchronizes the displayed enrollment state with the API.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadStatus();
    }
  }, [loadStatus, loading]);

  const requestAccess = async () => {
    if (!session) return;

    setBusy(true);
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
    }
    setBusy(false);
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Revisando acceso...</p>;
  }

  if (profile?.role === 'teacher' || status === 'approved') {
    return (
      <>
        <Link href={href} className={`inline-flex w-fit rounded-md px-4 py-2 text-sm font-medium text-white ${color}`}>
          Ir al curso
        </Link>
        <Link href={modulesHref} className="inline-flex w-fit rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Ver modulos
        </Link>
      </>
    );
  }

  if (!session) {
    return (
      <Link href="/auth" className={`inline-flex w-fit rounded-md px-4 py-2 text-sm font-medium text-white ${color}`}>
        Ingresar para solicitar
      </Link>
    );
  }

  return (
    <>
      <span className="inline-flex w-fit rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">{statusLabel[status]}</span>
      <button
        type="button"
        onClick={requestAccess}
        disabled={busy || status === 'pending'}
        className={`inline-flex w-fit rounded-md px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-400 ${color}`}
      >
        {status === 'pending' ? 'Solicitud enviada' : busy ? 'Enviando...' : 'Solicitar acceso'}
      </button>
    </>
  );
}
