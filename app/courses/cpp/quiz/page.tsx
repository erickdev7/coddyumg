import AppFooter from '@/app/components/AppFooter';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import QuizRunner from '@/app/components/QuizRunner';
import SiteHeader from '@/app/components/SiteHeader';

const quizzes = [
  {
    title: 'C++ Módulo 1: Fundamentos',
    questions: [
      { prompt: 'Qué instruccion lee desde consola?', options: ['cout', 'cin', 'read', 'scan'], answer: 1 },
      { prompt: 'Qué estructura repite por contador?', options: ['for', 'class', 'include', 'return'], answer: 0 },
      { prompt: 'Qué guarda varios valores del mismo tipo?', options: ['arreglo', 'namespace', 'main', 'header'], answer: 0 },
    ],
  },
  {
    title: 'C++ Módulo 2: Funciones y clases',
    questions: [
      { prompt: 'Qué palabra devuelve un valor?', options: ['return', 'break', 'using', 'public'], answer: 0 },
      { prompt: 'Qué define un molde de objetos?', options: ['class', 'cout', 'vector', 'if'], answer: 0 },
      { prompt: 'Qué inicializa objetos?', options: ['constructor', 'include', 'for', 'map'], answer: 0 },
    ],
  },
  {
    title: 'C++ Módulo 3: Memoria y herencia',
    questions: [
      { prompt: 'Qué guarda una direccion de memoria?', options: ['puntero', 'vector', 'string', 'cola'], answer: 0 },
      { prompt: 'Qué simbolo obtiene direccion?', options: ['&', '#', '@', '$'], answer: 0 },
      { prompt: 'Qué permite crear clases hijas?', options: ['herencia', 'fstream', 'sort', 'cin'], answer: 0 },
    ],
  },
  {
    title: 'C++ Módulo 4: STL y archivos',
    questions: [
      { prompt: 'Qué permite escribir archivos?', options: ['ofstream', 'cout', 'vector', 'stack'], answer: 0 },
      { prompt: 'Qué estructura guarda clave-valor?', options: ['map', 'array', 'int', 'double'], answer: 0 },
      { prompt: 'Qué algoritmo ordena un vector?', options: ['sort', 'findAll', 'order', 'print'], answer: 0 },
    ],
  },
  {
    title: 'C++ Evaluación final',
    questions: [
      { prompt: 'Qué permite código genérico?', options: ['template', 'main', 'cin', 'private'], answer: 0 },
      { prompt: 'Qué usa LIFO?', options: ['stack', 'queue', 'map', 'vector'], answer: 0 },
      { prompt: 'Qué usa FIFO?', options: ['queue', 'stack', 'class', 'sort'], answer: 0 },
      { prompt: 'Qué debe tener un proyecto final?', options: ['clases, menu, archivo y validaciones', 'solo cout', 'solo variables', 'solo comentarios'], answer: 0 },
    ],
  },
];

export default function CppQuizPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
          {quizzes.map((quiz) => (
            <QuizRunner key={quiz.title} course="cpp" title={quiz.title} questions={quiz.questions} />
          ))}
          <PublishedContentPanel course="cpp" type="quiz" title="Evaluaciónes adicionales de C++" />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

