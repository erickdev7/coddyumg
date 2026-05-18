import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import type { CourseKey, Profile } from '@/lib/types';

export const COURSE_LABELS: Record<CourseKey, string> = {
  python: 'Python',
  cpp: 'C++',
  java: 'Java',
  csharp: 'C#',
  databases: 'Bases de datos',
  networks: 'Redes',
  webdev: 'Desarrollo Web',
  cybersecurity: 'Ciberseguridad',
};

export const COURSE_KEYS = new Set<CourseKey>(['python', 'cpp', 'java']);

export function isCourseKey(value: unknown): value is CourseKey {
  return typeof value === 'string' && COURSE_KEYS.has(value as CourseKey);
}

export async function canAccessCourse(userId: string, profile: Profile, course: CourseKey) {
  if (profile.role === 'teacher') return true;

  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('course_enrollments')
    .select('status')
    .eq('user_id', userId)
    .eq('course', course)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data?.status === 'approved';
}
