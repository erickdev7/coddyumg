'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useAuth } from '@/app/components/AuthProvider';

type QuizQuestion = {
  answer: number;
  options: string[];
  prompt: string;
};

type QuizRunnerProps = {
  course: string;
  questions: QuizQuestion[];
  title: string;
};

export default function QuizRunner({ course, questions, title }: QuizRunnerProps) {
  const { session } = useAuth();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const completed = Object.keys(answers).length === questions.length;
  const score = useMemo(() => {
    const correct = questions.filter((question, index) => answers[index] === question.answer).length;
    return Math.round((correct / questions.length) * 100);
  }, [answers, questions]);
  const correctAnswers = useMemo(
    () => questions.filter((question, index) => answers[index] === question.answer).length,
    [answers, questions],
  );
  const passed = completed && score >= 60;

  const saveQuiz = async () => {
    if (!session) {
      setStatus('Inicia sesión para guardar tu evaluación.');
      return;
    }

    if (!completed) {
      setStatus('Responde todas las preguntas antes de guardar.');
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
          activity: `Evaluación: ${title}`,
          completed: score >= 60,
          score,
        }),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus(body.error || 'No se pudo guardar la evaluación.');
        return;
      }

      setStatus(score >= 60 ? `Evaluación guardada. Puntaje: ${score}` : `Evaluación guardada. Repite para mejorar: ${score}`);
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
    <section className="rounded-lg bg-white p-6 shadow">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="mt-2 text-gray-600">Responde todas las preguntas y guarda tu puntaje en el panel de progreso.</p>
        </div>
        <div className="rounded-lg bg-blue-50 px-4 py-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Puntaje</p>
          <p className="text-3xl font-bold text-blue-900">{score}</p>
          <p className="mt-1 text-xs font-semibold text-blue-700">
            {correctAnswers}/{questions.length} correctas
          </p>
        </div>
      </div>

      {completed ? (
        <div className={`mt-5 rounded-md px-4 py-3 text-sm font-semibold ${passed ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
          {passed ? 'Resultado aprobado. Puedes guardar tu evaluación.' : 'Resultado en práctica. Puedes guardar el intento y repetir para mejorar.'}
        </div>
      ) : null}

      <div className="mt-8 space-y-6">
        {questions.map((question, questionIndex) => (
          <fieldset key={question.prompt} className="rounded-lg border border-gray-200 p-5">
            <legend className="px-1 font-semibold text-gray-900">{questionIndex + 1}. {question.prompt}</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {question.options.map((option, optionIndex) => (
                <label key={option} className="flex cursor-pointer items-center gap-3 rounded-md border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    checked={answers[questionIndex] === optionIndex}
                    onChange={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))}
                    className="h-4 w-4"
                  />
                  <span>{option}</span>
                  {completed && optionIndex === question.answer ? (
                    <span className="ml-auto rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">Correcta</span>
                  ) : null}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={saveQuiz}
          disabled={saving}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
        >
          {saving ? 'Guardando...' : 'Guardar evaluación'}
        </button>
        {!session ? (
          <Link href="/auth" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Iniciar sesión
          </Link>
        ) : null}
        {status ? <p className="text-sm text-gray-600">{status}</p> : null}
      </div>
    </section>
  );
}

