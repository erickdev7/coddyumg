import { NextResponse } from 'next/server';
import { canAccessCourse, isCourseKey } from '@/lib/courseAccess';
import { ensureProfile, getUserFromRequest } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(request: Request) {
  try {
    const { user, error: authError } = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const profile = await ensureProfile(user);
    const { searchParams } = new URL(request.url);
    const scope = searchParams.get('scope');

    const query = supabaseAdmin
      .from('progress')
      .select('*, profiles(email, full_name)')
      .order('updated_at', { ascending: false });

    if (scope !== 'all' || profile.role !== 'teacher') {
      query.eq('user_id', user.id);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'No se pudo cargar el progreso' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }

    const body = await request.json();
    const { course, activity, completed, score } = body;

    if (!course || !activity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!isCourseKey(course)) {
      return NextResponse.json({ error: 'Curso invalido' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const profile = await ensureProfile(user);

    if (!(await canAccessCourse(user.id, profile, course))) {
      return NextResponse.json({ error: 'Solicita acceso al curso antes de registrar progreso' }, { status: 403 });
    }

    const { data: existing, error: lookupError } = await supabaseAdmin
      .from('progress')
      .select('id')
      .eq('user_id', user.id)
      .eq('course', course)
      .eq('activity', activity)
      .maybeSingle();

    if (lookupError) {
      return NextResponse.json({ error: lookupError.message }, { status: 500 });
    }

    const payload = {
      user_id: user.id,
      course,
      activity,
      completed: completed ?? false,
      score: score ?? 0,
      updated_at: new Date().toISOString(),
    };

    const requestBuilder = existing
      ? supabaseAdmin.from('progress').update(payload).eq('id', existing.id)
      : supabaseAdmin.from('progress').insert([
          {
            ...payload,
          },
        ]);

    const { data, error } = await requestBuilder.select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'No se pudo guardar el progreso' },
      { status: 500 },
    );
  }
}
