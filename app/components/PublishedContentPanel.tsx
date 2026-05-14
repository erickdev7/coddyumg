'use client';

import { useEffect, useState } from 'react';
import type { CourseContent, CourseContentType, CourseKey } from '@/lib/types';

type PublishedContentPanelProps = {
  course: CourseKey;
  type: CourseContentType;
  title: string;
  emptyText?: string;
  limit?: number;
};

const typeLabels: Record<CourseContentType, string> = {
  module: 'Módulo extra',
  lesson: 'Lección extra',
  exercise: 'Práctica extra',
  challenge: 'Reto extra',
  quiz: 'Evaluación extra',
};

export default function PublishedContentPanel({ course, type, title, emptyText, limit = 8 }: PublishedContentPanelProps) {
  const [items, setItems] = useState<CourseContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    queueMicrotask(async () => {
      try {
        const params = new URLSearchParams({
          course,
          type,
          published: 'true',
          limit: String(limit),
        });
        const response = await fetch(`/api/content?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) return;

        const body = await response.json();
        setItems(body.data || []);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setItems([]);
        }
      } finally {
        setLoading(false);
      }
    });

    return () => controller.abort();
  }, [course, limit, type]);

  if (loading) {
    return (
      <section className="mt-12 rounded-lg border border-dashed border-gray-300 bg-white p-6">
        <p className="text-sm font-medium text-gray-500">Cargando contenido adicional...</p>
      </section>
    );
  }

  if (items.length === 0) {
    return emptyText ? (
      <section className="mt-12 rounded-lg border border-dashed border-gray-300 bg-white p-6">
        <p className="text-sm text-gray-500">{emptyText}</p>
      </section>
    ) : null;
  }

  return (
    <section className="mt-12">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Desde Supabase</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-500">Se muestran máximo {limit} elementos publicados para cuidar el plan gratis.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-lg bg-white p-6 shadow">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide">
              <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">{typeLabels[item.content_type]}</span>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">
                Módulo {item.module_number ?? '-'} · Item {item.item_number ?? '-'}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-bold text-gray-900">{item.title}</h3>
            {item.summary && <p className="mt-2 text-gray-600">{item.summary}</p>}
            {item.body && <p className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-700">{item.body}</p>}
            {item.example && (
              <pre className="mt-4 overflow-x-auto rounded-md bg-gray-950 p-4 text-sm text-green-200">
                <code>{item.example}</code>
              </pre>
            )}
            {item.expected_output && (
              <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                <span className="font-semibold text-gray-900">Salida esperada: </span>
                <span className="font-mono">{item.expected_output}</span>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
