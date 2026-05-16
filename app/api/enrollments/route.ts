import { NextResponse } from 'next/server';
import { canAccessCourse, isCourseKey } from '@/lib/courseAccess';
import { ensureProfile, getUserFromRequest } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

const allowedStatuses = new Set(['pending', 'approved', 'rejected']);
const enrollmentSelect = '*, profiles:profiles!course_enrollments_user_id_fkey(email, full_name)';

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
    const course = searchParams.get('course');

    let query = supabaseAdmin
      .from('course_enrollments')
      .select(enrollmentSelect)
      .order('requested_at', { ascending: false });

    if (scope !== 'all' || profile.role !== 'teacher') {
      query = query.eq('user_id', user.id);
    }

    if (course) {
      if (!isCourseKey(course)) {
        return NextResponse.json({ error: 'Curso invalido' }, { status: 400 });
      }
      query = query.eq('course', course);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'No se pudieron cargar las solicitudes' },
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
    const { course } = body;

    if (!isCourseKey(course)) {
      return NextResponse.json({ error: 'Curso invalido' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const profile = await ensureProfile(user);

    if (await canAccessCourse(user.id, profile, course)) {
      return NextResponse.json({ data: { course, status: 'approved' } });
    }

    const { data, error } = await supabaseAdmin
      .from('course_enrollments')
      .upsert(
        {
          user_id: user.id,
          course,
          status: 'pending',
          requested_at: new Date().toISOString(),
          reviewed_at: null,
          reviewed_by: null,
        },
        { onConflict: 'user_id,course' },
      )
      .select(enrollmentSelect)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'No se pudo solicitar acceso' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { user, error: authError } = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: authError }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const profile = await ensureProfile(user);

    if (profile.role !== 'teacher') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !allowedStatuses.has(status)) {
      return NextResponse.json({ error: 'Solicitud o estado invalido' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('course_enrollments')
      .update({
        status,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
      })
      .eq('id', id)
      .select(enrollmentSelect)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'No se pudo actualizar la solicitud' },
      { status: 500 },
    );
  }
}
