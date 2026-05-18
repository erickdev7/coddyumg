import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import type { CourseKey, Profile } from '@/lib/types';

export const COURSE_LABELS: Record<CourseKey, string> = {
  python: 'Python',
  cpp: 'C++',
  java: 'Java',
  csharp: 'C#',
  'database-fundamentals': 'Fundamentos de Bases de Datos',
  'sql-intermediate': 'SQL Intermedio',
  'database-advanced': 'Bases de Datos Avanzadas',
  'network-fundamentals': 'Fundamentos de Redes',
  'network-services': 'Servicios de Red',
  frontend: 'Frontend',
  'backend-apis': 'Backend y APIs',
  'security-basics': 'Seguridad Basica',
  'web-security': 'Seguridad Web',
  'ethical-hacking': 'Ethical Hacking',
  databases: 'Bases de datos',
  networks: 'Redes',
  webdev: 'Desarrollo Web',
  cybersecurity: 'Ciberseguridad',
};

export const ENROLLMENT_COURSE_KEYS = new Set<CourseKey>(['python', 'cpp', 'java']);

export const COURSE_KEYS = new Set<CourseKey>([
  'python',
  'cpp',
  'java',
  'csharp',
  'database-fundamentals',
  'sql-intermediate',
  'database-advanced',
  'network-fundamentals',
  'network-services',
  'frontend',
  'backend-apis',
  'security-basics',
  'web-security',
  'ethical-hacking',
  'databases',
  'networks',
  'webdev',
  'cybersecurity',
]);

export function isCourseKey(value: unknown): value is CourseKey {
  return typeof value === 'string' && COURSE_KEYS.has(value as CourseKey);
}

export async function canAccessCourse(userId: string, profile: Profile, course: CourseKey) {
  if (profile.role === 'teacher') return true;
  if (!ENROLLMENT_COURSE_KEYS.has(course)) return true;

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
