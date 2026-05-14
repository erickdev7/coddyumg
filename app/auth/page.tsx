'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SiteHeader from '@/app/components/SiteHeader';
import { getSupabaseClient } from '@/lib/supabaseClient';

export default function AuthPage() {
  const router = useRouter();
  const supabase = getSupabaseClient();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const result =
        mode === 'login'
          ? await supabase.auth.signInWithPassword({ email: normalizedEmail, password })
          : await supabase.auth.signUp({
              email: normalizedEmail,
              password,
              options: {
                data: {
                  full_name: fullName.trim(),
                },
              },
            });

      if (result.error) {
        setStatus(result.error.message);
        return;
      }

      if (mode === 'register' && !result.data.session) {
        setStatus('Cuenta creada. Revisa tu correo para confirmar el acceso antes de iniciar sesion.');
        return;
      }

      router.push('/dashboard');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'No se pudo completar la autenticacion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
          <section className="self-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">CoddyUMG</p>
            <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Acceso para alumnos y profesores
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-gray-600">
              Inicia sesion para guardar ejercicios, revisar tu avance y habilitar el monitoreo docente.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/courses" className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white">
                Ver cursos
              </Link>
              <Link href="/dashboard" className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
                Mi progreso
              </Link>
            </div>
          </section>

          <section className="rounded-lg bg-white p-6 shadow">
            <div className="grid grid-cols-2 rounded-md bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`rounded px-3 py-2 text-sm font-medium ${mode === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
              >
                Ingresar
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`rounded px-3 py-2 text-sm font-medium ${mode === 'register' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}
              >
                Registro
              </button>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-4">
              {mode === 'register' ? (
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Nombre completo</span>
                  <input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
                    required
                  />
                </label>
              ) : null}
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Correo</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Contrasena</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500"
                  minLength={6}
                  required
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {loading ? 'Procesando...' : mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
              </button>
              {status ? <p className="text-sm text-gray-600">{status}</p> : null}
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
