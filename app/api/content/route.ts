import { NextResponse } from 'next/server';
import { ensureProfile, getUserFromRequest } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import type { CourseContentType, CourseKey } from '@/lib/types';

const allowedCourses = new Set<CourseKey>(['python', 'cpp', 'java', 'databases', 'networks', 'webdev', 'cybersecurity']);
const allowedTypes = new Set<CourseContentType>(['module', 'lesson', 'exercise', 'challenge', 'quiz']);

type ContentPayload = {
  course?: unknown;
  content_type?: unknown;
  module_number?: unknown;
  item_number?: unknown;
  title?: unknown;
  summary?: unknown;
  body?: unknown;
  example?: unknown;
  expected_output?: unknown;
  published?: unknown;
};

function textOrNull(value: unknown) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function numberOrNull(value: unknown) {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function sanitizePayload(body: ContentPayload) {
  const course = typeof body.course === 'string' ? body.course : '';
  const contentType = typeof body.content_type === 'string' ? body.content_type : '';
  const title = textOrNull(body.title);

  if (!allowedCourses.has(course as CourseKey)) {
    return { error: 'Curso invalido' };
  }

  if (!allowedTypes.has(contentType as CourseContentType)) {
    return { error: 'Tipo de contenido invalido' };
  }

  if (!title) {
    return { error: 'El titulo es obligatorio' };
  }

  return {
    data: {
      course,
      content_type: contentType,
      module_number: numberOrNull(body.module_number),
      item_number: numberOrNull(body.item_number),
      title,
      summary: textOrNull(body.summary),
      body: textOrNull(body.body),
      example: textOrNull(body.example),
      expected_output: textOrNull(body.expected_output),
      published: typeof body.published === 'boolean' ? body.published : true,
      updated_at: new Date().toISOString(),
    },
  };
}

async function getAuthenticatedProfile(request: Request) {
  const { user, error: authError } = await getUserFromRequest(request);

  if (!user) {
    return { error: authError || 'No autenticado', status: 401 as const };
  }

  const profile = await ensureProfile(user);
  return { user, profile };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const course = searchParams.get('course');
    const type = searchParams.get('type');
    const published = searchParams.get('published');
    const limit = Math.min(Math.max(Number(searchParams.get('limit') || 12), 1), 25);
    const hasAuthorization = Boolean(request.headers.get('authorization'));
    const auth = hasAuthorization ? await getAuthenticatedProfile(request) : null;

    if (auth && 'error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const isTeacher = auth && !('error' in auth) && auth.profile.role === 'teacher';
    const supabaseAdmin = getSupabaseAdmin();

    let query = supabaseAdmin
      .from('course_content')
      .select('*')
      .order('course', { ascending: true })
      .order('content_type', { ascending: true })
      .order('module_number', { ascending: true, nullsFirst: false })
      .order('item_number', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (course && allowedCourses.has(course as CourseKey)) {
      query = query.eq('course', course);
    }

    if (type && allowedTypes.has(type as CourseContentType)) {
      query = query.eq('content_type', type);
    }

    if (!isTeacher) {
      query = query.eq('published', true);
    } else if (published === 'true' || published === 'false') {
      query = query.eq('published', published === 'true');
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const response = NextResponse.json({ data });

    if (!hasAuthorization) {
      response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'No se pudo cargar el contenido' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const auth = await getAuthenticatedProfile(request);

    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    if (auth.profile.role !== 'teacher') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const payload = sanitizePayload(await request.json());

    if ('error' in payload) {
      return NextResponse.json({ error: payload.error }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin.from('course_content').insert([payload.data]).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'No se pudo crear el contenido' },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await getAuthenticatedProfile(request);

    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    if (auth.profile.role !== 'teacher') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const body = await request.json();
    const id = typeof body.id === 'string' ? body.id : '';

    if (!id) {
      return NextResponse.json({ error: 'Falta el id del contenido' }, { status: 400 });
    }

    const payload = sanitizePayload(body);

    if ('error' in payload) {
      return NextResponse.json({ error: payload.error }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from('course_content')
      .update(payload.data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'No se pudo actualizar el contenido' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await getAuthenticatedProfile(request);

    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    if (auth.profile.role !== 'teacher') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Falta el id del contenido' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.from('course_content').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: { id } });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'No se pudo eliminar el contenido' },
      { status: 500 },
    );
  }
}
