export type UserRole = 'student' | 'teacher';
export type CourseKey =
  | 'python'
  | 'cpp'
  | 'java'
  | 'csharp'
  | 'database-fundamentals'
  | 'sql-intermediate'
  | 'database-advanced'
  | 'network-fundamentals'
  | 'network-services'
  | 'frontend'
  | 'backend-apis'
  | 'security-basics'
  | 'web-security'
  | 'ethical-hacking'
  | 'databases'
  | 'networks'
  | 'webdev'
  | 'cybersecurity';
export type CourseContentType = 'module' | 'lesson' | 'exercise' | 'challenge' | 'quiz';
export type CourseEnrollmentStatus = 'pending' | 'approved' | 'rejected';

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at?: string;
};

export type ProgressEntry = {
  id: string;
  user_id: string;
  course: string;
  activity: string;
  completed: boolean;
  score: number | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    email: string;
    full_name: string | null;
  } | null;
};

export type CourseEnrollment = {
  id: string;
  user_id: string;
  course: CourseKey;
  status: CourseEnrollmentStatus;
  requested_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  profiles?: {
    email: string;
    full_name: string | null;
  } | null;
};

export type CourseContent = {
  id: string;
  course: CourseKey;
  content_type: CourseContentType;
  module_number: number | null;
  item_number: number | null;
  title: string;
  summary: string | null;
  body: string | null;
  example: string | null;
  expected_output: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};
