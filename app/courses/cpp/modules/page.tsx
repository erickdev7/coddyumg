import AppFooter from '@/app/components/AppFooter';
import CourseModules from '@/app/components/CourseModules';
import type { CourseModule } from '@/app/components/CourseModules';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import SiteHeader from '@/app/components/SiteHeader';

const modules: CourseModule[] = [
  {
    level: 'Basico I',
    title: 'Sintaxis y control',
    description: 'Entrada/salida, variables, condicionales, ciclos y arreglos.',
    outcomes: ['Leer datos con cin', 'Mostrar datos con cout', 'Usar if y for', 'Trabajar con arreglos'],
    activities: ['Lecciónes 1 y 2', 'Ejercicios 1 y 2', 'Retos 1 y 2'],
    project: 'Calculadora de notas con ordenamiento basico.',
    hrefs: { lesson: '/courses/cpp/lessons#lesson-1', exercise: '/courses/cpp/exercises#exercise-1', challenge: '/courses/cpp/challenges#challenge-1' },
  },
  {
    level: 'Basico II',
    title: 'Funciones, clases y objetos',
    description: 'Funciones reutilizables y primeras clases para modelar entidades.',
    outcomes: ['Crear funciones', 'Usar parametros', 'Definir clases', 'Instanciar objetos'],
    activities: ['Lecciónes 3 y 4', 'Ejercicios 3 y 4', 'Retos 3 y 4'],
    project: 'Inventario simple con clases y calculo de totales.',
    hrefs: { lesson: '/courses/cpp/lessons#lesson-3', exercise: '/courses/cpp/exercises#exercise-3', challenge: '/courses/cpp/challenges#challenge-3' },
  },
  {
    level: 'Intermedio',
    title: 'Vectores, memoria y herencia',
    description: 'Colecciónes dinamicas, referencias, punteros y clases derivadas.',
    outcomes: ['Usar vector', 'Modificar por referencia', 'Entender punteros', 'Aplicar herencia'],
    activities: ['Lecciónes 5 a 7', 'Ejercicios 5 a 7', 'Retos 5 a 7'],
    project: 'Sistema de biblioteca con prestamos y jerarquia de usuarios.',
    hrefs: { lesson: '/courses/cpp/lessons#lesson-5', exercise: '/courses/cpp/exercises#exercise-5', challenge: '/courses/cpp/challenges#challenge-5' },
  },
  {
    level: 'Avanzado',
    title: 'Archivos y STL',
    description: 'Persistencia con fstream y estructuras de la biblioteca estandar como map.',
    outcomes: ['Guardar archivos', 'Leer registros', 'Usar map', 'Buscar y filtrar datos'],
    activities: ['Lecciónes 8 y 9', 'Ejercicios 8 y 9', 'Retos 8 y 9'],
    project: 'Control de existencias con bitacora en archivo.',
    hrefs: { lesson: '/courses/cpp/lessons#lesson-8', exercise: '/courses/cpp/exercises#exercise-8', challenge: '/courses/cpp/challenges#challenge-8' },
  },
  {
    level: 'Proyecto',
    title: 'Proyecto final C++',
    description: 'Aplicacion de consola con clases, vectores, busqueda, map y archivo.',
    outcomes: ['Disenar menu', 'Organizar clases', 'Persistir datos', 'Preparar entrega final'],
    activities: ['Lección 10', 'Ejercicio 10', 'Reto 10', 'Evaluación final'],
    project: 'Inventario completo con altas, busqueda, existencias y guardado.',
    hrefs: { lesson: '/courses/cpp/lessons#lesson-10', exercise: '/courses/cpp/exercises#exercise-10', challenge: '/courses/cpp/challenges#challenge-10' },
  },
];

export default function CppModulesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-600">C++</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Módulos del curso</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-600">Ruta completa con enlaces directos al contenido de cada modulo.</p>
          </div>
          <CourseModules courseName="C++" accentClass="text-green-600" modules={modules} quizHref="/courses/cpp/quiz" />
          <PublishedContentPanel course="cpp" type="module" title="Módulos adicionales de C++" />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

