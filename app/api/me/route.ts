import { NextResponse } from 'next/server';
import { ensureProfile, getUserFromRequest } from '@/lib/auth';

export async function GET(request: Request) {
  return POST(request);
}

export async function POST(request: Request) {
  const { user, error } = await getUserFromRequest(request);

  if (!user) {
    return NextResponse.json({ error }, { status: 401 });
  }

  try {
    const profile = await ensureProfile(user);
    return NextResponse.json({ data: profile });
  } catch (profileError) {
    return NextResponse.json(
      { error: profileError instanceof Error ? profileError.message : 'No se pudo cargar el perfil' },
      { status: 500 },
    );
  }
}
