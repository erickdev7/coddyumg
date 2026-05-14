import CourseAccessGate from '@/app/components/CourseAccessGate';

export default function PythonCourseLayout({ children }: { children: React.ReactNode }) {
  return <CourseAccessGate course="python">{children}</CourseAccessGate>;
}
