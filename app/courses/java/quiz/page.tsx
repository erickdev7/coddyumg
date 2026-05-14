import AppFooter from '@/app/components/AppFooter';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import QuizRunner from '@/app/components/QuizRunner';
import SiteHeader from '@/app/components/SiteHeader';

const quizzes = [
  {
    title: 'Java Módulo 1: Fundamentos',
    questions: [
      { prompt: 'Cual es el punto de entrada?', options: ['main()', 'start()', 'run()', 'open()'], answer: 0 },
      { prompt: 'Qué imprime en consola?', options: ['System.out.println', 'cout', 'print()', 'echo'], answer: 0 },
      { prompt: 'Qué define un objeto?', options: ['class', 'package', 'import', 'void'], answer: 0 },
    ],
  },
  {
    title: 'Java Módulo 2: Colecciónes',
    questions: [
      { prompt: 'Qué lista dinamica usa Java?', options: ['ArrayList', 'vector', 'dict', 'tuple'], answer: 0 },
      { prompt: 'Qué protege atributos?', options: ['private', 'main', 'static', 'new'], answer: 0 },
      { prompt: 'Qué metodo expone un dato privado?', options: ['getter', 'package', 'loop', 'throw'], answer: 0 },
    ],
  },
  {
    title: 'Java Módulo 3: POO avanzada',
    questions: [
      { prompt: 'Qué captura errores?', options: ['try/catch', 'if/else', 'for', 'class'], answer: 0 },
      { prompt: 'Qué crea herencia?', options: ['extends', 'implements', 'throws', 'final'], answer: 0 },
      { prompt: 'Qué define contrato?', options: ['interface', 'ArrayList', 'Scanner', 'String'], answer: 0 },
    ],
  },
  {
    title: 'Java Módulo 4: Datos',
    questions: [
      { prompt: 'Qué escribe archivos?', options: ['FileWriter', 'System.out', 'HashMap', 'main'], answer: 0 },
      { prompt: 'Qué procesa colecciónes funcionalmente?', options: ['stream', 'package', 'new', 'catch'], answer: 0 },
      { prompt: 'Qué guarda clave-valor?', options: ['HashMap', 'ArrayList', 'double', 'boolean'], answer: 0 },
    ],
  },
  {
    title: 'Java Evaluación final',
    questions: [
      { prompt: 'Qué organiza clases?', options: ['package', 'println', 'if', 'for'], answer: 0 },
      { prompt: 'Qué ordena con criterio propio?', options: ['Comparator', 'Scanner', 'FileWriter', 'void'], answer: 0 },
      { prompt: 'Qué separa modelo, vista y controlador?', options: ['MVC', 'CSV', 'JSON', 'PNG'], answer: 0 },
      { prompt: 'Qué debe incluir el proyecto final?', options: ['POO, validaciones, datos y reporte', 'solo main', 'solo variables', 'solo comentarios'], answer: 0 },
    ],
  },
];

export default function JavaQuizPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
          {quizzes.map((quiz) => (
            <QuizRunner key={quiz.title} course="java" title={quiz.title} questions={quiz.questions} />
          ))}
          <PublishedContentPanel course="java" type="quiz" title="Evaluaciónes adicionales de Java" />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

