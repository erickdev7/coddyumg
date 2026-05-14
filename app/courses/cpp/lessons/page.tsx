import Link from 'next/link';
import AppFooter from '@/app/components/AppFooter';
import ProgressButton from '@/app/components/ProgressButton';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import SiteHeader from '@/app/components/SiteHeader';

const lessons = [
  {
    title: '1. Variables, entrada y salida',
    description: 'C++ usa tipos definidos como int, double y string. cin lee datos y cout muestra resultados.',
    example: '#include <iostream>\nusing namespace std;\n\nint main() {\n  int edad;\n  cout << "Ingresa tu edad: ";\n  cin >> edad;\n  cout << "Edad: " << edad << endl;\n  return 0;\n}',
    practice: 'Lee el nombre y edad de un alumno. Muestra ambos datos en una sola linea.',
  },
  {
    title: '2. Condicionales, ciclos y arreglos',
    description: 'Los if toman decisiones, los ciclos repiten instrucciones y los arreglos almacenan varios valores del mismo tipo.',
    example: 'int notas[3] = {70, 85, 90};\nint suma = 0;\nfor (int i = 0; i < 3; i++) {\n  suma += notas[i];\n}\ncout << "Promedio: " << suma / 3 << endl;',
    practice: 'Guarda cinco notas en un arreglo, calcula el promedio y muestra si el grupo aprobo.',
  },
  {
    title: '3. Clases y objetos',
    description: 'Una clase define un molde. Un objeto es una instancia de ese molde con datos y comportamientos propios.',
    example: 'class Alumno {\npublic:\n  string nombre;\n  int carnet;\n\n  void saludar() {\n    cout << "Soy " << nombre << endl;\n  }\n};',
    practice: 'Crea una clase Curso con nombre, creditos y un metodo mostrarInformacion().',
  },
  {
    title: '4. Funciones y parametros',
    description: 'Las funciones dividen el programa en partes reutilizables. Los parametros permiten enviar datos a esas funciones.',
    example: 'int sumar(int a, int b) {\n  return a + b;\n}\n\nint main() {\n  cout << sumar(7, 5) << endl;\n  return 0;\n}',
    practice: 'Crea una funcion calcularPromedio que reciba tres notas y devuelva el promedio.',
  },
  {
    title: '5. Vectores',
    description: 'vector permite almacenar listas dinamicas de datos. A diferencia de un arreglo fijo, puede crecer durante la ejecucion.',
    example: '#include <vector>\nvector<int> notas = {80, 75, 95};\nnotas.push_back(88);\n\nfor (int nota : notas) {\n  cout << nota << endl;\n}',
    practice: 'Guarda cinco precios en un vector y calcula el total de la compra.',
  },
  {
    title: '6. Punteros y referencias',
    description: 'Los punteros guardan direcciones de memoria y las referencias permiten trabajar con el mismo valor sin copiarlo.',
    example: 'int edad = 20;\nint* puntero = &edad;\ncout << *puntero << endl;\n\nvoid duplicar(int& numero) {\n  numero *= 2;\n}',
    practice: 'Crea una funcion que reciba un numero por referencia y aumente su valor en 10.',
  },
  {
    title: '7. Herencia',
    description: 'La herencia permite crear una clase hija que reutiliza atributos y metodos de una clase base.',
    example: 'class Persona {\npublic:\n  string nombre;\n};\n\nclass Estudiante : public Persona {\npublic:\n  string carnet;\n};',
    practice: 'Crea una clase Empleado que herede de Persona y agregue salario.',
  },
  {
    title: '8. Archivos con fstream',
    description: 'fstream permite leer y escribir archivos desde programas en C++.',
    example: '#include <fstream>\nofstream archivo("datos.txt");\narchivo << "CoddyUMG";\narchivo.close();',
    practice: 'Guarda una lista de productos en un archivo y luego lee su contenido.',
  },
  {
    title: '9. STL: map y algoritmos',
    description: 'La biblioteca estandar incluye estructuras y algoritmos para resolver problemas comunes con menos codigo.',
    example: '#include <map>\n#include <algorithm>\nmap<string, int> inventario;\ninventario["mouse"] = 5;\ncout << inventario["mouse"];',
    practice: 'Crea un map de productos y existencias. Muestra los productos con existencia mayor a cero.',
  },
  {
    title: '10. Proyecto integrador en C++',
    description: 'Integra clases, vectores, archivos y algoritmos para crear una aplicacion de consola.',
    example: 'class Producto {\npublic:\n  string nombre;\n  double precio;\n};\n\nvector<Producto> productos;',
    practice: 'Crea un sistema de inventario con altas, listado, busqueda y guardado en archivo.',
  },
  {
    title: '11. Sobrecarga de funciones',
    description: 'C++ permite tener varias funciones con el mismo nombre si sus parametros son distintos.',
    example: 'int sumar(int a, int b) { return a + b; }\ndouble sumar(double a, double b) { return a + b; }',
    practice: 'Sobrecarga una funcion area para cuadrado y rectangulo.',
  },
  {
    title: '12. Constructores',
    description: 'Los constructores inicializan objetos al momento de crearlos.',
    example: 'class Alumno {\npublic:\n  string nombre;\n  Alumno(string n) { nombre = n; }\n};',
    practice: 'Crea una clase Producto con constructor para nombre y precio.',
  },
  {
    title: '13. Encapsulacion',
    description: 'La encapsulacion protege datos usando private y expone operaciones seguras con metodos publicos.',
    example: 'class Cuenta {\nprivate:\n  double saldo;\npublic:\n  void depositar(double monto) { if (monto > 0) saldo += monto; }\n};',
    practice: 'Encapsula una nota y permite cambiarla solo si esta entre 0 y 100.',
  },
  {
    title: '14. Polimorfismo',
    description: 'El polimorfismo permite usar una interfaz comun para distintos comportamientos.',
    example: 'class Figura { public: virtual double area() = 0; };',
    practice: 'Crea Figura, Rectangulo y Circulo con metodo area().',
  },
  {
    title: '15. Templates',
    description: 'Los templates permiten escribir codigo generico para varios tipos.',
    example: 'template <typename T>\nT mayor(T a, T b) { return a > b ? a : b; }',
    practice: 'Crea una funcion template para obtener el menor de dos valores.',
  },
  {
    title: '16. Manejo de excepciones',
    description: 'try/catch permite manejar errores controlados durante la ejecucion.',
    example: 'try { throw runtime_error("Error"); }\ncatch (exception& e) { cout << e.what(); }',
    practice: 'Lanza una excepcion si se intenta dividir entre cero.',
  },
  {
    title: '17. Organizacion en archivos',
    description: 'Los proyectos grandes separan declaraciones en .h y definiciones en .cpp.',
    example: '// producto.h\nclass Producto {\npublic:\n  string nombre;\n};',
    practice: 'Separa una clase Calculadora en archivo .h y .cpp.',
  },
  {
    title: '18. Complejidad algoritmica',
    description: 'La complejidad ayuda a estimar cuanto crece el tiempo de ejecucion con mas datos.',
    example: '// O(n)\nfor (int numero : numeros) cout << numero;',
    practice: 'Identifica si una busqueda lineal es O(1), O(n) u O(n2).',
  },
  {
    title: '19. Busqueda y ordenamiento',
    description: 'Buscar y ordenar datos son operaciones fundamentales en algoritmos.',
    example: 'sort(numeros.begin(), numeros.end());\nbool existe = binary_search(numeros.begin(), numeros.end(), 10);',
    practice: 'Ordena un vector y busca un elemento con binary_search.',
  },
  {
    title: '20. Buenas practicas en C++',
    description: 'Usa nombres claros, evita duplicacion y libera recursos correctamente.',
    example: 'const double IVA = 0.12;\n// Constantes para valores que no cambian',
    practice: 'Refactoriza un programa repetido usando funciones y constantes.',
  },
  {
    title: '21. Introduccion a estructuras de datos',
    description: 'Las estructuras de datos organizan informacion segun el tipo de operacion que necesitas.',
    example: 'stack<int> pila;\nqueue<int> cola;',
    practice: 'Compara cuando usar stack y cuando usar queue.',
  },
  {
    title: '22. Pilas y colas',
    description: 'Una pila usa LIFO y una cola usa FIFO.',
    example: 'stack<string> historial;\nhistorial.push("login");\ncout << historial.top();',
    practice: 'Crea una cola de turnos para atender estudiantes.',
  },
  {
    title: '23. Proyecto con menu',
    description: 'Un menu de consola organiza opciones de usuario y mantiene el programa activo.',
    example: 'int opcion;\ndo {\n  cin >> opcion;\n} while (opcion != 0);',
    practice: 'Crea un menu para agregar, listar y buscar productos.',
  },
  {
    title: '24. Persistencia de datos',
    description: 'Persistir datos permite que la informacion sobreviva al cierre del programa.',
    example: 'ofstream archivo("inventario.txt", ios::app);\narchivo << "mouse,5";',
    practice: 'Guarda productos en archivo CSV y cargalos al iniciar.',
  },
  {
    title: '25. Preparacion de proyecto final',
    description: 'El proyecto final debe tener menu, validaciones, clases, archivos y documentacion.',
    example: '// Checklist: clases, menu, archivo, validaciones, README',
    practice: 'Prepara un checklist y plan de pruebas para tu proyecto en C++.',
  },
];

function getLessonModule(lessonNumber: number) {
  return Math.ceil(lessonNumber / 5);
}

export default function CppLessons() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Lecciones de C++</h1>
            <p className="mt-4 text-xl text-gray-500">Fundamentos, ejemplos y practicas para escribir programas solidos.</p>
          </div>

          <div className="mt-16 space-y-8">
            {lessons.map((lesson, index) => (
              <section key={lesson.title} id={`lesson-${index + 1}`} className="scroll-mt-24 rounded-lg bg-white p-8 shadow">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                    Módulo {getLessonModule(index + 1)}
                  </span>
                  <h2 className="text-2xl font-semibold text-gray-900">{lesson.title}</h2>
                </div>
                <p className="mt-3 text-gray-600">{lesson.description}</p>
                <pre className="mt-5 overflow-x-auto rounded-md bg-gray-950 p-4 text-sm text-green-200">
                  <code>{lesson.example}</code>
                </pre>
                <div className="mt-5 rounded-md bg-green-50 p-4">
                  <p className="text-sm font-semibold text-green-900">Ejercicio del tema</p>
                  <p className="mt-1 text-sm text-green-800">{lesson.practice}</p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link href={`/courses/cpp/lessons/${index + 1}`} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Vista individual
                  </Link>
                  <ProgressButton course="cpp" activity={lesson.title} />
                </div>
              </section>
            ))}
          </div>

          <PublishedContentPanel course="cpp" type="lesson" title="Lecciones adicionales de C++" />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
