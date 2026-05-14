'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';
import { useProgress } from '@/app/components/ProgressProvider';

type ProgressButtonProps = {
  activity: string;
  course: string;
  score?: number;
};

export default function ProgressButton({ activity, course, score = 100 }: ProgressButtonProps) {
  const { session } = useAuth();
  const { isCompleted, refreshProgress } = useProgress();
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const completed = isCompleted(course, activity) || status === 'Progreso guardado.';

  const saveProgress = async () => {
    if (!session) {
      setStatus('Inicia sesión para guardar tu progreso.');
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    setSaving(true);
    setStatus('');

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          course,
          activity,
          completed: true,
          score,
        }),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus(body.error || 'No se pudo guardar el progreso.');
        return;
      }

      setStatus('Progreso guardado.');
      await refreshProgress();
    } catch (error) {
      setStatus(
        error instanceof DOMException && error.name === 'AbortError'
          ? 'El guardado tardo demasiado. Revisa la conexion con Supabase e intenta otra vez.'
          : 'No se pudo conectar con el servidor.',
      );
    } finally {
      window.clearTimeout(timeout);
      setSaving(false);
    }
  };

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={saveProgress}
        disabled={saving}
        className={`rounded-md px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed ${
          completed ? 'bg-gray-900 hover:bg-gray-700' : 'bg-green-600 hover:bg-green-700 disabled:bg-green-300'
        }`}
      >
        {saving ? 'Guardando...' : completed ? 'Completado' : 'Marcar completado'}
      </button>
      {!session ? (
        <Link href="/auth" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Iniciar sesión
        </Link>
      ) : null}
      {status ? <p className="text-sm text-gray-600">{status}</p> : null}
    </div>
  );
}
