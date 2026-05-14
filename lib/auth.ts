import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import type { Profile } from '@/lib/types';

const ADMIN_EMAIL = 'eduaguilar619@gmail.com';

type ProfileRow = {
  id: string;
  email: string;
  full_name: string | null;
  role?: Profile['role'] | null;
  created_at?: string;
};

function normalizeProfile(profile: ProfileRow): Profile {
  const email = profile.email.toLowerCase();

  return {
    id: profile.id,
    email: profile.email,
    full_name: profile.full_name,
    role: email === ADMIN_EMAIL ? 'teacher' : 'student',
    created_at: profile.created_at,
  };
}

export async function getUserFromRequest(request: Request) {
  const authorization = request.headers.get('authorization');
  const token = authorization?.replace(/^Bearer\s+/i, '');

  if (!token) {
    return { user: null, error: 'No autenticado' };
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    return { user: null, error: error?.message || 'Sesión inválida' };
  }

  return { user: data.user, error: null };
}

export async function ensureProfile(user: {
  id: string;
  email?: string | null;
  user_metadata?: { full_name?: string };
}) {
  const supabaseAdmin = getSupabaseAdmin();
  const email = user.email || '';
  const fullName = user.user_metadata?.full_name || email.split('@')[0] || 'Alumno';
  const role = email.toLowerCase() === ADMIN_EMAIL ? 'teacher' : 'student';

  const { data: existing, error: existingError } = await supabaseAdmin
    .from('profiles')
    .select('id,email,full_name,role,created_at')
    .eq('id', user.id)
    .maybeSingle();

  if (existingError && existingError.code !== '42703') {
    throw existingError;
  }

  if (existing) {
    return normalizeProfile(existing as ProfileRow);
  }

  if (existingError?.code === '42703') {
    const { data: legacyExisting, error: legacyExistingError } = await supabaseAdmin
      .from('profiles')
      .select('id,email,full_name,created_at')
      .eq('id', user.id)
      .maybeSingle();

    if (legacyExistingError) {
      throw legacyExistingError;
    }

    if (legacyExisting) {
      return normalizeProfile(legacyExisting as ProfileRow);
    }
  }

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .insert({
      id: user.id,
      email,
      full_name: fullName,
      role,
    })
    .select('id,email,full_name,role,created_at')
    .single();

  if (error && error.code !== '42703') {
    throw error;
  }

  if (data) {
    return normalizeProfile(data as ProfileRow);
  }

  const { data: legacyData, error: legacyError } = await supabaseAdmin
    .from('profiles')
    .insert({
      id: user.id,
      email,
      full_name: fullName,
    })
    .select('id,email,full_name,created_at')
    .single();

  if (legacyError) {
    throw legacyError;
  }

  return normalizeProfile(legacyData as ProfileRow);
}
