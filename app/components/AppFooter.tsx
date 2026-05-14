import CreatorButton from '@/app/components/CreatorButton';

export default function AppFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">
          &copy; 2026 CoddyUMG. Todos los derechos reservados.
        </p>
        <CreatorButton />
      </div>
    </footer>
  );
}
