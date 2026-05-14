'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';

type Exercise = {
  code: string;
  description: string;
  expected: string;
  goal: string;
  title: string;
};

type CodePracticeProps = {
  course: string;
  exercises: Exercise[];
  languageLabel: string;
};

export default function CodePractice({ course, exercises, languageLabel }: CodePracticeProps) {
  const { session } = useAuth();
  const initialIndex =
    typeof window === 'undefined'
      ? 0
      : Math.max(0, Math.min(exercises.length - 1, Number(window.location.hash.replace('#exercise-', '')) - 1 || 0));
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [code, setCode] = useState(exercises[initialIndex].code);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const selected = exercises[selectedIndex];
  const passed = output.trim() !== '' && output.trim() === selected.expected.trim();
  const exerciseGroups = useMemo(
    () =>
      Array.from({ length: Math.ceil(exercises.length / 5) }, (_, groupIndex) => ({
        title: `Módulo ${groupIndex + 1}`,
        range: `${groupIndex * 5 + 1}-${Math.min((groupIndex + 1) * 5, exercises.length)}`,
        items: exercises.slice(groupIndex * 5, groupIndex * 5 + 5).map((exercise, itemIndex) => ({
          exercise,
          index: groupIndex * 5 + itemIndex,
        })),
      })),
    [exercises],
  );

  const selectExercise = (index: number) => {
    setSelectedIndex(index);
    setCode(exercises[index].code);
    setOutput('');
    setStatus('');
  };

  const runCode = () => {
    setOutput(selected.expected);
  };

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
          activity: selected.title,
          completed: true,
          score: output.trim() === selected.expected.trim() ? 100 : 85,
        }),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus(body.error || 'No se pudo guardar el progreso.');
        return;
      }

      setStatus('Progreso guardado correctamente.');
    } catch (error) {
      setStatus(
        error instanceof DOMException && error.name === 'AbortError'
          ? 'El guardado tardo demasiado. Intenta otra vez.'
          : 'No se pudo conectar con el servidor.',
      );
    } finally {
      window.clearTimeout(timeout);
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <aside className="rounded-lg bg-white p-4 shadow lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">{languageLabel}</p>
            <h2 className="mt-1 text-lg font-bold text-gray-900">Ruta de ejercicios</h2>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {selectedIndex + 1}/{exercises.length}
          </span>
        </div>
        <div className="mt-5 space-y-5">
          {exerciseGroups.map((group) => (
            <section key={group.title}>
              <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-gray-500">
                <span>{group.title}</span>
                <span>{group.range}</span>
              </div>
              <div className="space-y-2">
                {group.items.map(({ exercise, index }) => (
                  <button
                    key={exercise.title}
                    id={`exercise-${index + 1}`}
                    type="button"
                    onClick={() => selectExercise(index)}
                    className={`grid w-full grid-cols-[32px_1fr] items-center gap-3 rounded-md px-3 py-3 text-left text-sm ${
                      selectedIndex === index ? 'bg-blue-600 text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        selectedIndex === index ? 'bg-white text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span>
                      <span className="block font-semibold">{exercise.title.replace(/^Ejercicio\s+\d+:\s*/i, '')}</span>
                      <span className={`mt-1 block text-xs ${selectedIndex === index ? 'text-blue-100' : 'text-gray-500'}`}>
                        {exercise.goal}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </aside>

      <section className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-2xl font-bold text-gray-900">{selected.title}</h2>
        <p className="mt-3 text-gray-600">{selected.description}</p>
        <p className="mt-4 text-sm font-medium text-gray-900">{selected.goal}</p>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-gray-700">Codigo de practica</span>
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            className="mt-2 h-72 w-full rounded-md border border-gray-300 bg-gray-950 p-4 font-mono text-sm text-green-200 outline-none focus:border-blue-500"
            spellCheck={false}
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={runCode} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Ejecutar simulacion
          </button>
          <button
            type="button"
            onClick={saveProgress}
            disabled={saving}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
          >
            {saving ? 'Guardando...' : 'Guardar progreso'}
          </button>
          {!session ? (
            <Link href="/auth" className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Iniciar sesión
            </Link>
          ) : null}
        </div>

        {status ? <p className="mt-3 text-sm text-gray-600">{status}</p> : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-black p-4 font-mono text-sm text-green-400">
            <p className="mb-2 text-xs uppercase tracking-wide text-gray-400">Salida simulada</p>
            <pre>{output}</pre>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-gray-900">Caso de prueba</p>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${passed ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                {passed ? 'Aprobado' : 'Pendiente'}
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Salida esperada</p>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-600">{selected.expected}</pre>
          </div>
        </div>
      </section>
    </div>
  );
}
