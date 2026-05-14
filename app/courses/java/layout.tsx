import CourseAccessGate from '@/app/components/CourseAccessGate';

export default function JavaCourseLayout({ children }: { children: React.ReactNode }) {
  return <CourseAccessGate course="java">{children}</CourseAccessGate>;
}
