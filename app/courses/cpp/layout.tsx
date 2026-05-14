import CourseAccessGate from '@/app/components/CourseAccessGate';

export default function CppCourseLayout({ children }: { children: React.ReactNode }) {
  return <CourseAccessGate course="cpp">{children}</CourseAccessGate>;
}
