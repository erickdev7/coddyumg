'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppFooter from '@/app/components/AppFooter';
import SiteHeader from '@/app/components/SiteHeader';
import { useAuth } from '@/app/components/AuthProvider';
import type { CourseContent, CourseContentType, CourseKey } from '@/lib/types';

type ContentForm = {
  course: CourseKey;
  content_type: CourseContentType;
  module_number: string;
  item_number: string;
  title: string;
  summary: string;
  body: string;
  example: string;
  expected_output: string;
  published: boolean;
};

const emptyForm: ContentForm = {
  course: 'python',
  content_type: 'lesson',
  module_number: '1',
  item_number: '1',
  title: '',
  summary: '',
  body: '',
  example: '',
  expected_output: '',
  published: true,
};

const courses: Array<{ value: CourseKey; label: string }> = [
  { value: 'python', label: 'Python' },
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'database-fundamentals', label: 'Fundamentos de Bases de Datos' },
  { value: 'sql-intermediate', label: 'SQL Intermedio' },
  { value: 'database-advanced', label: 'Bases de Datos Avanzadas' },
  { value: 'network-fundamentals', label: 'Fundamentos de Redes' },
  { value: 'network-services', label: 'Servicios de Red' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend-apis', label: 'Backend y APIs' },
  { value: 'security-basics', label: 'Seguridad Basica' },
  { value: 'web-security', label: 'Seguridad Web' },
  { value: 'ethical-hacking', label: 'Ethical Hacking' },
  { value: 'databases', label: 'Bases de datos' },
  { value: 'networks', label: 'Redes' },
  { value: 'webdev', label: 'Desarrollo Web' },
  { value: 'cybersecurity', label: 'Ciberseguridad' },
];

const contentTypes: Array<{ value: CourseContentType; label: string }> = [
  { value: 'module', label: 'Módulo' },
  { value: 'lesson', label: 'Lección' },
  { value: 'exercise', label: 'Ejercicio' },
  { value: 'challenge', label: 'Reto' },
  { value: 'quiz', label: 'Evaluación' },
];

function toForm(item: CourseContent): ContentForm {
  return {
    course: item.course,
    content_type: item.content_type,
    module_number: item.module_number?.toString() ?? '',
    item_number: item.item_number?.toString() ?? '',
    title: item.title,
    summary: item.summary ?? '',
    body: item.body ?? '',
    example: item.example ?? '',
    expected_output: item.expected_output ?? '',
    published: item.published,
  };
}

function buildPayload(form: ContentForm) {
  return {
    ...form,
    module_number: form.module_number ? Number(form.module_number) : null,
    item_number: form.item_number ? Number(form.item_number) : null,
  };
}

export default function TeacherContentPage() {
  const router = useRouter();
  const { session, profile, loading } = useAuth();
  const [items, setItems] = useState<CourseContent[]>([]);
  const [form, setForm] = useState<ContentForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [courseFilter, setCourseFilter] = useState<'all' | CourseKey>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | CourseContentType>('all');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !session) router.push('/auth');
    if (!loading && profile && profile.role !== 'teacher') router.push('/dashboard');
  }, [loading, profile, router, session]);

  const loadContent = useCallback(async (accessToken: string) => {
    setIsLoadingContent(true);
    setStatus('');

    try {
      const response = await fetch('/api/content', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error || 'No se pudo cargar el contenido');
      }

      setItems(body.data || []);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo cargar el contenido');
    } finally {
      setIsLoadingContent(false);
    }
  }, []);

  useEffect(() => {
    if (!session?.access_token || profile?.role !== 'teacher') return;

    const accessToken = session.access_token;
    queueMicrotask(() => {
      void loadContent(accessToken);
    });
  }, [loadContent, profile?.role, session?.access_token]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCourse = courseFilter === 'all' || item.course === courseFilter;
      const matchesType = typeFilter === 'all' || item.content_type === typeFilter;
      const matchesSearch =
        !normalizedSearch ||
        item.title.toLowerCase().includes(normalizedSearch) ||
        (item.summary ?? '').toLowerCase().includes(normalizedSearch);

      return matchesCourse && matchesType && matchesSearch;
    });
  }, [courseFilter, items, search, typeFilter]);

  const totals = useMemo(
    () => ({
      all: items.length,
      published: items.filter((item) => item.published).length,
      drafts: items.filter((item) => !item.published).length,
    }),
    [items],
  );

  const contentMatrix = useMemo(() => {
    return courses.map((course) => ({
      ...course,
      types: contentTypes.map((type) => ({
        ...type,
        count: items.filter((item) => item.course === course.value && item.content_type === type.value).length,
      })),
    }));
  }, [items]);

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setStatus('');
    setPreviewOpen(false);
  }

  function duplicateContent(item: CourseContent) {
    const nextItemNumber = item.item_number ? item.item_number + 1 : '';
    setEditingId(null);
    setForm({
      ...toForm(item),
      item_number: nextItemNumber.toString(),
      title: `${item.title} copia`,
      published: false,
    });
    setPreviewOpen(true);
    setStatus('Copia preparada como borrador. Revisa y guarda cuando este lista.');
  }

  async function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!session?.access_token) return;

    setIsSaving(true);
    setStatus(editingId ? 'Actualizando contenido...' : 'Creando contenido...');

    try {
      const response = await fetch('/api/content', {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingId ? { id: editingId, ...buildPayload(form) } : buildPayload(form)),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error || 'No se pudo guardar el contenido');
      }

      setStatus(editingId ? 'Contenido actualizado.' : 'Contenido creado.');
      resetForm();
      await loadContent(session.access_token);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo guardar el contenido');
    } finally {
      setIsSaving(false);
    }
  }

  async function togglePublished(item: CourseContent) {
    if (!session?.access_token) return;

    setStatus(item.published ? 'Ocultando contenido...' : 'Publicando contenido...');

    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: item.id, ...toForm(item), published: !item.published }),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error || 'No se pudo actualizar la publicacion');
      }

      setStatus(!item.published ? 'Contenido publicado.' : 'Contenido ocultado.');
      await loadContent(session.access_token);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo actualizar la publicacion');
    }
  }

  async function deleteContent(item: CourseContent) {
    if (!session?.access_token) return;
    const confirmed = window.confirm(`Eliminar "${item.title}"?`);

    if (!confirmed) return;

    setStatus('Eliminando contenido...');

    try {
      const response = await fetch(`/api/content?id=${item.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error || 'No se pudo eliminar el contenido');
      }

      setStatus('Contenido eliminado.');
      if (editingId === item.id) resetForm();
      await loadContent(session.access_token);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo eliminar el contenido');
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Admin</p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Gestión de contenido</h1>
              <p className="mt-3 max-w-3xl text-gray-600">
                Crea, edita y publica material para los cursos. El contenido queda guardado en Supabase en la tabla `course_content`.
              </p>
            </div>
            <Link href="/teacher" className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white">
              Volver al panel
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-sm font-medium text-gray-500">Total</p>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">{totals.all}</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-sm font-medium text-gray-500">Publicados</p>
              <p className="mt-2 text-3xl font-extrabold text-green-700">{totals.published}</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-sm font-medium text-gray-500">Borradores</p>
              <p className="mt-2 text-3xl font-extrabold text-amber-700">{totals.drafts}</p>
            </div>
          </div>

          <section className="mt-8 rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-bold text-gray-900">Resumen por curso y tipo</h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {contentMatrix.map((course) => (
                <article key={course.value} className="rounded-lg border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-900">{course.label}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {course.types.map((type) => (
                      <span key={type.value} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                        {type.label}: {type.count}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-8 grid gap-8 lg:grid-cols-[420px_1fr]">
            <section className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold text-gray-900">{editingId ? 'Editar contenido' : 'Nuevo contenido'}</h2>
                {editingId && (
                  <button type="button" onClick={resetForm} className="text-sm font-semibold text-blue-700 hover:text-blue-900">
                    Cancelar
                  </button>
                )}
              </div>

              <form className="mt-6 space-y-4" onSubmit={saveContent}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-gray-700">
                    Curso
                    <select
                      value={form.course}
                      onChange={(event) => setForm((current) => ({ ...current, course: event.target.value as CourseKey }))}
                      className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    >
                      {courses.map((course) => (
                        <option key={course.value} value={course.value}>
                          {course.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm font-medium text-gray-700">
                    Tipo
                    <select
                      value={form.content_type}
                      onChange={(event) => setForm((current) => ({ ...current, content_type: event.target.value as CourseContentType }))}
                      className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                    >
                      {contentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-gray-700">
                    Módulo
                    <input
                      min="1"
                      type="number"
                      value={form.module_number}
                      onChange={(event) => setForm((current) => ({ ...current, module_number: event.target.value }))}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                    />
                  </label>

                  <label className="text-sm font-medium text-gray-700">
                    Numero
                    <input
                      min="1"
                      type="number"
                      value={form.item_number}
                      onChange={(event) => setForm((current) => ({ ...current, item_number: event.target.value }))}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                    />
                  </label>
                </div>

                <label className="text-sm font-medium text-gray-700">
                  Titulo
                  <input
                    required
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                    placeholder="Variables y tipos de datos"
                  />
                </label>

                <label className="text-sm font-medium text-gray-700">
                  Resumen
                  <textarea
                    value={form.summary}
                    onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
                    className="mt-1 min-h-20 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                    placeholder="Describe que aprendera el estudiante."
                  />
                </label>

                <label className="text-sm font-medium text-gray-700">
                  Contenido
                  <textarea
                    value={form.body}
                    onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
                    className="mt-1 min-h-32 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm text-gray-900"
                    placeholder="Explicacion teorica, pasos y notas importantes."
                  />
                </label>

                <label className="text-sm font-medium text-gray-700">
                  Ejemplo
                  <textarea
                    value={form.example}
                    onChange={(event) => setForm((current) => ({ ...current, example: event.target.value }))}
                    className="mt-1 min-h-28 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm text-gray-900"
                    placeholder="print('Hola CoddyUMG')"
                  />
                </label>

                <label className="text-sm font-medium text-gray-700">
                  Salida esperada
                  <textarea
                    value={form.expected_output}
                    onChange={(event) => setForm((current) => ({ ...current, expected_output: event.target.value }))}
                    className="mt-1 min-h-20 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm text-gray-900"
                    placeholder="Hola CoddyUMG"
                  />
                </label>

                <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(event) => setForm((current) => ({ ...current, published: event.target.checked }))}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Publicado
                </label>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? 'Guardando...' : editingId ? 'Actualizar contenido' : 'Crear contenido'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewOpen((current) => !current)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  {previewOpen ? 'Ocultar vista previa' : 'Vista previa'}
                </button>
              </form>

              {previewOpen && (
                <article className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                    Vista previa | {courses.find((course) => course.value === form.course)?.label} |{' '}
                    {contentTypes.find((type) => type.value === form.content_type)?.label}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-gray-900">{form.title || 'Titulo pendiente'}</h3>
                  {form.summary && <p className="mt-2 text-sm text-gray-700">{form.summary}</p>}
                  {form.body && <p className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-700">{form.body}</p>}
                  {form.example && (
                    <pre className="mt-4 overflow-x-auto rounded-md bg-gray-950 p-4 text-sm text-green-200">
                      <code>{form.example}</code>
                    </pre>
                  )}
                  {form.expected_output && (
                    <p className="mt-3 text-sm text-gray-700">
                      <span className="font-semibold">Salida esperada:</span> <span className="font-mono">{form.expected_output}</span>
                    </p>
                  )}
                </article>
              )}
            </section>

            <section className="rounded-lg bg-white p-6 shadow">
              <div className="flex flex-wrap items-end gap-3">
                <label className="min-w-36 flex-1 text-sm font-medium text-gray-700">
                  Buscar
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
                    placeholder="Titulo o resumen"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Curso
                  <select
                    value={courseFilter}
                    onChange={(event) => setCourseFilter(event.target.value as 'all' | CourseKey)}
                    className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                  >
                    <option value="all">Todos</option>
                    {courses.map((course) => (
                      <option key={course.value} value={course.value}>
                        {course.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Tipo
                  <select
                    value={typeFilter}
                    onChange={(event) => setTypeFilter(event.target.value as 'all' | CourseContentType)}
                    className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900"
                  >
                    <option value="all">Todos</option>
                    {contentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {status && (
                <p className="mt-4 rounded-md border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-800">{status}</p>
              )}

              <div className="mt-5 space-y-3">
                {isLoadingContent && <p className="text-sm text-gray-500">Cargando contenido...</p>}
                {!isLoadingContent && filteredItems.length === 0 && (
                  <p className="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
                    Aún no hay contenido con esos filtros.
                  </p>
                )}
                {filteredItems.map((item) => {
                  const courseLabel = courses.find((course) => course.value === item.course)?.label ?? item.course;
                  const typeLabel = contentTypes.find((type) => type.value === item.content_type)?.label ?? item.content_type;

                  return (
                    <article key={item.id} className="rounded-lg border border-gray-200 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
                            <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">{courseLabel}</span>
                            <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">{typeLabel}</span>
                            <span className={item.published ? 'rounded-full bg-green-50 px-2 py-1 text-green-700' : 'rounded-full bg-amber-50 px-2 py-1 text-amber-700'}>
                              {item.published ? 'Publicado' : 'Borrador'}
                            </span>
                          </div>
                          <h3 className="mt-3 text-lg font-bold text-gray-900">{item.title}</h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Módulo {item.module_number ?? '-'} · Item {item.item_number ?? '-'}
                          </p>
                          {item.summary && <p className="mt-2 text-sm text-gray-600">{item.summary}</p>}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingId(item.id);
                              setForm(toForm(item));
                              setStatus('');
                            }}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => void togglePublished(item)}
                            className="rounded-md border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                          >
                            {item.published ? 'Ocultar' : 'Publicar'}
                          </button>
                          <button
                            type="button"
                            onClick={() => duplicateContent(item)}
                            className="rounded-md border border-green-200 px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
                          >
                            Duplicar
                          </button>
                          <button
                            type="button"
                            onClick={() => void deleteContent(item)}
                            className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
