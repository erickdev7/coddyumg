'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppFooter from '@/app/components/AppFooter';
import SiteHeader from '@/app/components/SiteHeader';
import { useAuth } from '@/app/components/AuthProvider';
import type { ProgressEntry } from '@/lib/types';

const COURSE_LABELS: Record<string, string> = {
  python: 'Python',
  cpp: 'C++',
  java: 'Java',
};

const COURSE_TOTALS: Record<string, number> = {
  python: 80,
  cpp: 80,
  java: 80,
};

function formatDate(value?: string) {
  if (!value) return 'Sin actividad';

  return new Intl.DateTimeFormat('es-GT', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function TeacherPage() {
  const router = useRouter();
  const { session, profile, loading } = useAuth();
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [status, setStatus] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !session) {
      router.push('/auth');
    }
  }, [loading, router, session]);

  useEffect(() => {
    if (!loading && profile && profile.role !== 'teacher') {
      router.push('/dashboard');
    }
  }, [loading, profile, router]);

  useEffect(() => {
    if (!session || profile?.role !== 'teacher') return;

    fetch('/api/progress?scope=all', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || 'No se pudo cargar el panel');
        setProgress(body.data || []);
      })
      .catch((error) => setStatus(error.message));
  }, [profile, session]);

  const filteredProgress = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return progress.filter((entry) => {
      const email = entry.profiles?.email || entry.user_id;
      const name = entry.profiles?.full_name || email;
      const matchesCourse = courseFilter === 'all' || entry.course === courseFilter;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && entry.completed) ||
        (statusFilter === 'pending' && !entry.completed);
      const matchesSearch =
        !normalizedSearch ||
        email.toLowerCase().includes(normalizedSearch) ||
        name.toLowerCase().includes(normalizedSearch) ||
        entry.activity.toLowerCase().includes(normalizedSearch);

      return matchesCourse && matchesStatus && matchesSearch;
    });
  }, [courseFilter, progress, search, statusFilter]);

  const exportCsv = () => {
    const header = ['Alumno', 'Correo', 'Curso', 'Actividad', 'Completado', 'Puntaje', 'Actualizado'];
    const rows = filteredProgress.map((entry) => [
      entry.profiles?.full_name || '',
      entry.profiles?.email || entry.user_id,
      COURSE_LABELS[entry.course] || entry.course,
      entry.activity,
      entry.completed ? 'Si' : 'No',
      String(entry.score ?? 0),
      entry.updated_at,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'coddyumg-progreso.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const students = useMemo(() => {
    const map = new Map<
      string,
      {
        id: string;
        email: string;
        name: string;
        total: number;
        completed: number;
        score: number;
        lastActivity?: string;
        courses: Record<string, { completed: number; total: number; score: number }>;
      }
    >();

    filteredProgress.forEach((entry) => {
      const email = entry.profiles?.email || entry.user_id;
      const current = map.get(entry.user_id) || {
        id: entry.user_id,
        email,
        name: entry.profiles?.full_name || email,
        total: 0,
        completed: 0,
        score: 0,
        lastActivity: undefined,
        courses: {},
      };

      current.total += 1;
      current.completed += entry.completed ? 1 : 0;
      current.score += entry.score ?? 0;
      current.lastActivity =
        !current.lastActivity || new Date(entry.updated_at) > new Date(current.lastActivity)
          ? entry.updated_at
          : current.lastActivity;

      const course = current.courses[entry.course] || { completed: 0, total: 0, score: 0 };
      course.total += 1;
      course.completed += entry.completed ? 1 : 0;
      course.score += entry.score ?? 0;
      current.courses[entry.course] = course;

      map.set(entry.user_id, current);
    });

    return Array.from(map.values()).sort((a, b) => b.completed - a.completed);
  }, [filteredProgress]);

  const completed = filteredProgress.filter((entry) => entry.completed).length;
  const averageScore = filteredProgress.length
    ? Math.round(filteredProgress.reduce((sum, entry) => sum + (entry.score ?? 0), 0) / filteredProgress.length)
    : 0;
  const selectedStudent = students.find((student) => student.id === selectedStudentId) || null;
  const selectedStudentProgress = selectedStudent
    ? progress
        .filter((entry) => entry.user_id === selectedStudent.id)
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    : [];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Panel docente</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Monitoreo de alumnos</h1>
            <p className="mt-3 max-w-3xl text-gray-600">
              Vista de avance por alumno, curso, ultimo movimiento y promedio de actividades registradas.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-sm font-medium text-gray-500">Alumnos activos</p>
              <p className="mt-2 text-4xl font-bold text-gray-900">{students.length}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-sm font-medium text-gray-500">Registros</p>
              <p className="mt-2 text-4xl font-bold text-blue-600">{filteredProgress.length}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-sm font-medium text-gray-500">Completados</p>
              <p className="mt-2 text-4xl font-bold text-green-600">{completed}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-sm font-medium text-gray-500">Promedio general</p>
              <p className="mt-2 text-4xl font-bold text-gray-900">{averageScore}</p>
            </div>
          </div>

          <section className="mt-10 rounded-lg bg-white p-6 shadow">
            <div className="grid gap-4 md:grid-cols-[1fr_180px_180px_auto] md:items-end">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Buscar alumno o actividad</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
                  placeholder="Nombre, correo o actividad"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Curso</span>
                <select
                  value={courseFilter}
                  onChange={(event) => setCourseFilter(event.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="python">Python</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Estado</span>
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="completed">Completados</option>
                  <option value="pending">Pendientes</option>
                </select>
              </label>
              <button onClick={exportCsv} className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
                Exportar CSV
              </button>
            </div>
          </section>

          <section className="mt-10 overflow-hidden rounded-lg bg-white shadow">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">Alumnos</h2>
            </div>
            {status ? <p className="px-6 py-4 text-sm text-red-600">{status}</p> : null}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Alumno</th>
                    <th className="px-6 py-3 font-semibold">Avance</th>
                    <th className="px-6 py-3 font-semibold">Cursos</th>
                    <th className="px-6 py-3 font-semibold">Promedio</th>
                    <th className="px-6 py-3 font-semibold">Ultima actividad</th>
                    <th className="px-6 py-3 font-semibold">Detalle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.length ? (
                    students.map((student) => {
                      const expectedTotal = Object.values(COURSE_TOTALS).reduce((sum, total) => sum + total, 0);
                      const percent = Math.min(100, Math.round((student.completed / expectedTotal) * 100));
                      const average = student.total ? Math.round(student.score / student.total) : 0;

                      return (
                        <tr key={student.id}>
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-gray-500">{student.email}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="min-w-40">
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>{student.completed} completadas</span>
                                <span>{percent}%</span>
                              </div>
                              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                                <div className="h-full rounded-full bg-green-500" style={{ width: `${percent}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-2">
                              {Object.keys(COURSE_LABELS).map((course) => {
                                const summary = student.courses[course] || { completed: 0, total: 0, score: 0 };
                                const coursePercent = Math.min(100, Math.round((summary.completed / COURSE_TOTALS[course]) * 100));
                                return (
                                  <span key={course} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                    {COURSE_LABELS[course]} {coursePercent}%
                                  </span>
                                );
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900">{average}</td>
                          <td className="px-6 py-4 text-gray-600">{formatDate(student.lastActivity)}</td>
                          <td className="px-6 py-4">
                            <button
                              type="button"
                              onClick={() => setSelectedStudentId(student.id)}
                              className="rounded-md border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            >
                              Ver detalle
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="px-6 py-8 text-gray-600" colSpan={6}>
                        Todavía no hay alumnos con progreso registrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {selectedStudent ? (
            <section className="mt-10 rounded-lg bg-white p-6 shadow">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Detalle del alumno</p>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">{selectedStudent.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">{selectedStudent.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStudentId(null)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cerrar detalle
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {Object.keys(COURSE_LABELS).map((course) => {
                  const summary = selectedStudent.courses[course] || { completed: 0, total: 0, score: 0 };
                  const percent = Math.min(100, Math.round((summary.completed / COURSE_TOTALS[course]) * 100));
                  const average = summary.total ? Math.round(summary.score / summary.total) : 0;

                  return (
                    <article key={course} className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold text-gray-900">{COURSE_LABELS[course]}</h3>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{percent}%</span>
                      </div>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full rounded-full bg-green-500" style={{ width: `${percent}%` }} />
                      </div>
                      <p className="mt-3 text-sm text-gray-600">
                        {summary.completed} completadas, {summary.total} registradas, promedio {average}.
                      </p>
                    </article>
                  );
                })}
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Actividad</th>
                      <th className="px-4 py-3 font-semibold">Curso</th>
                      <th className="px-4 py-3 font-semibold">Puntaje</th>
                      <th className="px-4 py-3 font-semibold">Estado</th>
                      <th className="px-4 py-3 font-semibold">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedStudentProgress.map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-4 py-3 font-medium text-gray-900">{entry.activity}</td>
                        <td className="px-4 py-3 text-gray-600">{COURSE_LABELS[entry.course] || entry.course}</td>
                        <td className="px-4 py-3 text-gray-600">{entry.score ?? 0}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${entry.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {entry.completed ? 'Completado' : 'En progreso'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{formatDate(entry.updated_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
