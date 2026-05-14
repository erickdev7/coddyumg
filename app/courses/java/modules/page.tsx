import AppFooter from '@/app/components/AppFooter';
import CourseModules from '@/app/components/CourseModules';
import type { CourseModule } from '@/app/components/CourseModules';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import SiteHeader from '@/app/components/SiteHeader';

const modules: CourseModule[] = [
  {
    level: 'Basico I',
    title: 'Sintaxis y clases iniciales',
    description: 'Estructura de un programa, clases simples, atributos, metodos y ciclos.',
    outcomes: ['Crear Main', 'Imprimir resultados', 'Definir clases simples', 'Usar ciclos'],
    activities: ['Lecciónes 1 y 2', 'Ejercicios 1 y 2', 'Retos 1 y 2'],
    project: 'Aplicacion de productos con descuento y salida formateada.',
    hrefs: { lesson: '/courses/java/lessons#lesson-1', exercise: '/courses/java/exercises#exercise-1', challenge: '/courses/java/challenges#challenge-1' },
  },
  {
    level: 'Basico II',
    title: 'Colecciónes y encapsulacion',
    description: 'ArrayList, atributos privados, metodos publicos y validaciones.',
    outcomes: ['Usar ArrayList', 'Aplicar encapsulacion', 'Validar saldos', 'Promediar datos'],
    activities: ['Lecciónes 3 y 4', 'Ejercicios 3 y 4', 'Retos 3 y 4'],
    project: 'Administrador de tareas y cuenta bancaria validada.',
    hrefs: { lesson: '/courses/java/lessons#lesson-3', exercise: '/courses/java/exercises#exercise-3', challenge: '/courses/java/challenges#challenge-3' },
  },
  {
    level: 'Intermedio',
    title: 'Excepciones, herencia e interfaces',
    description: 'Control de errores, clases hijas, polimorfismo y contratos con interfaces.',
    outcomes: ['Capturar excepciones', 'Usar extends', 'Sobrescribir metodos', 'Implementar interfaces'],
    activities: ['Lecciónes 5 a 7', 'Ejercicios 5 a 7', 'Retos 5 a 7'],
    project: 'Sistema de pagos con empleados fijos y por hora.',
    hrefs: { lesson: '/courses/java/lessons#lesson-5', exercise: '/courses/java/exercises#exercise-5', challenge: '/courses/java/challenges#challenge-5' },
  },
  {
    level: 'Avanzado',
    title: 'Archivos y streams',
    description: 'Reportes con archivos y procesamiento funcional de colecciónes con streams.',
    outcomes: ['Escribir archivos', 'Filtrar listas', 'Contar resultados', 'Crear reportes'],
    activities: ['Lecciónes 8 y 9', 'Ejercicios 8 y 9', 'Retos 8 y 9'],
    project: 'Catalogo de productos con filtros y reporte en archivo.',
    hrefs: { lesson: '/courses/java/lessons#lesson-8', exercise: '/courses/java/exercises#exercise-8', challenge: '/courses/java/challenges#challenge-8' },
  },
  {
    level: 'Proyecto',
    title: 'Proyecto final Java',
    description: 'Aplicacion con POO, colecciónes, validaciones, interfaces, streams y reporte.',
    outcomes: ['Modelar dominio', 'Validar stock', 'Calcular totales', 'Guardar reporte final'],
    activities: ['Lección 10', 'Ejercicio 10', 'Reto 10', 'Evaluación final'],
    project: 'Sistema de ventas con productos, carrito, pagos y archivo de reporte.',
    hrefs: { lesson: '/courses/java/lessons#lesson-10', exercise: '/courses/java/exercises#exercise-10', challenge: '/courses/java/challenges#challenge-10' },
  },
];

export default function JavaModulesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-600">Java</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Módulos del curso</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-600">Ruta completa con enlaces directos al contenido de cada modulo.</p>
          </div>
          <CourseModules courseName="Java" accentClass="text-red-600" modules={modules} quizHref="/courses/java/quiz" />
          <PublishedContentPanel course="java" type="module" title="Módulos adicionales de Java" />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

