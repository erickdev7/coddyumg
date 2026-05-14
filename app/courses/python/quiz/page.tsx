import AppFooter from '@/app/components/AppFooter';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import QuizRunner from '@/app/components/QuizRunner';
import SiteHeader from '@/app/components/SiteHeader';

const quizzes = [
  {
    title: 'Python Módulo 1: Fundamentos',
    questions: [
      { prompt: 'Qué funcion muestra texto en consola?', options: ['input()', 'print()', 'len()', 'open()'], answer: 1 },
      { prompt: 'Qué estructura repite instrucciones?', options: ['for', 'def', 'class', 'import'], answer: 0 },
      { prompt: 'Qué tipo representa verdadero o falso?', options: ['str', 'float', 'bool', 'list'], answer: 2 },
    ],
  },
  {
    title: 'Python Módulo 2: Colecciónes',
    questions: [
      { prompt: 'Qué estructura guarda pares clave-valor?', options: ['list', 'dict', 'tuple', 'set'], answer: 1 },
      { prompt: 'Qué bloque captura errores?', options: ['try/except', 'for/in', 'if/else', 'def/return'], answer: 0 },
      { prompt: 'Qué funcion cuenta elementos?', options: ['sum()', 'len()', 'max()', 'type()'], answer: 1 },
    ],
  },
  {
    title: 'Python Módulo 3: Archivos y POO',
    questions: [
      { prompt: 'Qué palabra define una clase?', options: ['class', 'object', 'new', 'struct'], answer: 0 },
      { prompt: 'Qué instruccion abre archivos?', options: ['read()', 'file()', 'open()', 'csv()'], answer: 2 },
      { prompt: 'Qué representa self?', options: ['La instancia actual', 'Un modulo', 'Una lista', 'Un error'], answer: 0 },
    ],
  },
  {
    title: 'Python Módulo 4: Datos y APIs',
    questions: [
      { prompt: 'Qué formato se usa mucho en APIs?', options: ['JSON', 'PNG', 'MP3', 'ZIP'], answer: 0 },
      { prompt: 'Qué modulo trabaja con CSV?', options: ['csv', 'math', 'os', 'time'], answer: 0 },
      { prompt: 'Qué metodo HTTP consulta datos?', options: ['GET', 'DROP', 'PUSH', 'RUN'], answer: 0 },
    ],
  },
  {
    title: 'Python Evaluación final',
    questions: [
      { prompt: 'Qué ayuda a separar dependencias por proyecto?', options: ['venv', 'print', 'dict', 'for'], answer: 0 },
      { prompt: 'Qué permite validar comportamiento esperado?', options: ['assert', 'input', 'append', 'split'], answer: 0 },
      { prompt: 'Qué funcion lee variables de entorno?', options: ['os.getenv', 'len', 'range', 'sorted'], answer: 0 },
      { prompt: 'Qué debe incluir un proyecto final?', options: ['README y pruebas', 'Solo código', 'Solo logo', 'Nada'], answer: 0 },
    ],
  },
];

export default function PythonQuizPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
          {quizzes.map((quiz) => (
            <QuizRunner key={quiz.title} course="python" title={quiz.title} questions={quiz.questions} />
          ))}
          <PublishedContentPanel course="python" type="quiz" title="Evaluaciónes adicionales de Python" />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

