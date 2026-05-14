'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/components/AuthProvider';

export default function SiteHeader() {
  const { profile, loading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth');
    router.refresh();
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <Image
              src="/logocoddyumg.png"
              alt="Logo CoddyUMG"
              width={44}
              height={44}
              className="h-11 w-11 rounded-md object-contain"
              priority
            />
            <span>CoddyUMG</span>
          </Link>
          <nav className="flex w-full flex-wrap items-center gap-x-5 gap-y-3 text-sm sm:w-auto sm:justify-end">
            <Link href="/courses" className="text-gray-500 hover:text-gray-900">
              Cursos
            </Link>
            <Link href="/about" className="text-gray-500 hover:text-gray-900">
              Acerca
            </Link>
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
              Mi progreso
            </Link>
            {profile?.role === 'teacher' ? (
              <>
                <Link href="/teacher" className="text-gray-500 hover:text-gray-900">
                  Admin
                </Link>
                <Link href="/teacher/content" className="text-gray-500 hover:text-gray-900">
                  Contenido
                </Link>
              </>
            ) : null}
            {loading ? null : profile ? (
              <button onClick={handleSignOut} className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-700">
                Salir
              </button>
            ) : (
              <Link href="/auth" className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                Ingresar
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
