import AppFooter from '@/app/components/AppFooter';
import CourseModules from '@/app/components/CourseModules';
import type { CourseModule } from '@/app/components/CourseModules';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import SiteHeader from '@/app/components/SiteHeader';

const modules: CourseModule[] = [
  {
    level: 'Basico I',
    title: 'Sintaxis y control',
    description: 'Variables, tipos, condiciones, ciclos y primeras funciones.',
    outcomes: ['Escribir scripts simples', 'Validar condiciones', 'Repetir procesos', 'Crear funciones pequeñas'],
    activities: ['Lecciónes 1 y 2', 'Ejercicios 1 y 2', 'Retos 1 y 2'],
    project: 'Calculadora de notas con mensaje de aprobado o reprobado.',
    hrefs: { lesson: '/courses/python/lessons#lesson-1', exercise: '/courses/python/exercises#exercise-1', challenge: '/courses/python/challenges#challenge-1' },
  },
  {
    level: 'Basico II',
    title: 'Colecciónes y validacion',
    description: 'Listas, diccionarios, manejo de errores y validacion de datos.',
    outcomes: ['Usar listas y diccionarios', 'Capturar errores', 'Validar entradas', 'Contar y filtrar datos'],
    activities: ['Lecciónes 3 y 4', 'Ejercicios 3 y 4', 'Retos 3 y 4'],
    project: 'Agenda de contactos con busqueda por nombre.',
    hrefs: { lesson: '/courses/python/lessons#lesson-3', exercise: '/courses/python/exercises#exercise-3', challenge: '/courses/python/challenges#challenge-3' },
  },
  {
    level: 'Intermedio',
    title: 'Archivos y POO',
    description: 'Persistencia en archivos y modelado con clases.',
    outcomes: ['Leer y escribir archivos', 'Crear clases', 'Guardar estado', 'Generar reportes simples'],
    activities: ['Lecciónes 5 y 6', 'Ejercicios 5 y 6', 'Retos 5 y 6'],
    project: 'Biblioteca con libros, prestamos y archivo de respaldo.',
    hrefs: { lesson: '/courses/python/lessons#lesson-5', exercise: '/courses/python/exercises#exercise-5', challenge: '/courses/python/challenges#challenge-5' },
  },
  {
    level: 'Avanzado',
    title: 'Módulos, CSV y APIs',
    description: 'Organizacion por modulos, lectura de CSV y consumo de APIs.',
    outcomes: ['Separar código', 'Procesar CSV', 'Leer JSON', 'Consultar servicios externos'],
    activities: ['Lecciónes 7 a 9', 'Ejercicios 7 a 9', 'Retos 7 a 9'],
    project: 'Analizador de alumnos desde CSV con consulta externa de datos.',
    hrefs: { lesson: '/courses/python/lessons#lesson-7', exercise: '/courses/python/exercises#exercise-7', challenge: '/courses/python/challenges#challenge-7' },
  },
  {
    level: 'Proyecto',
    title: 'Proyecto final Python',
    description: 'Aplicacion integradora con clases, archivos, reportes y evaluación.',
    outcomes: ['Disenar una app pequeña', 'Combinar temás del curso', 'Guardar informacion', 'Preparar entrega final'],
    activities: ['Lección 10', 'Ejercicio 10', 'Reto 10', 'Evaluación final'],
    project: 'Gestor de tareas completo con persistencia y reporte final.',
    hrefs: { lesson: '/courses/python/lessons#lesson-10', exercise: '/courses/python/exercises#exercise-10', challenge: '/courses/python/challenges#challenge-10' },
  },
];

export default function PythonModulesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Python</p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Módulos del curso</h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-600">Ruta completa con enlaces directos al contenido de cada modulo.</p>
          </div>
          <CourseModules courseName="Python" accentClass="text-blue-600" modules={modules} quizHref="/courses/python/quiz" />
          <PublishedContentPanel course="python" type="module" title="Módulos adicionales de Python" />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

