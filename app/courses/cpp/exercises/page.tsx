import AppFooter from '@/app/components/AppFooter';
import CodePractice from '@/app/components/CodePractice';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import SiteHeader from '@/app/components/SiteHeader';

const exercises = [
  {
    title: 'Ejercicio 1: Hola Mundo',
    description: 'Escribe un programa que muestre "Hola, mundo!" en la consola.',
    goal: 'Practicar estructura basica, include, main y salida con cout.',
    code: '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hola, mundo!" << endl;\n  return 0;\n}',
    expected: 'Hola, mundo!',
  },
  {
    title: 'Ejercicio 2: Suma de numeros',
    description: 'Pide dos numeros al usuario y muestra su suma.',
    goal: 'Usar variables, cin, cout y operaciones aritmeticas.',
    code: 'int a = 8;\nint b = 5;\ncout << "Suma: " << a + b << endl;',
    expected: 'Suma: 13',
  },
  {
    title: 'Ejercicio 3: Mayor de tres',
    description: 'Lee tres numeros e imprime cual es el mayor.',
    goal: 'Practicar condicionales if, else if y else.',
    code: 'int a = 5, b = 12, c = 9;\nif (a >= b && a >= c) cout << a;\nelse if (b >= a && b >= c) cout << b;\nelse cout << c;',
    expected: '12',
  },
  {
    title: 'Ejercicio 4: Funcion de promedio',
    description: 'Crea una funcion que reciba tres notas y devuelva el promedio.',
    goal: 'Practicar funciones, parametros y return.',
    code: 'double promedio(double a, double b, double c) {\n  return (a + b + c) / 3;\n}\n\ncout << promedio(70, 80, 90);',
    expected: '80',
  },
  {
    title: 'Ejercicio 5: Total con vector',
    description: 'Guarda varios precios en un vector y calcula el total.',
    goal: 'Practicar vector, push_back y ciclos for-each.',
    code: 'vector<double> precios = {25.5, 10.0, 8.75};\ndouble total = 0;\nfor (double precio : precios) {\n  total += precio;\n}\ncout << total << endl;',
    expected: '44.25',
  },
  {
    title: 'Ejercicio 6: Modificar por referencia',
    description: 'Crea una funcion que reciba un numero por referencia y lo duplique.',
    goal: 'Practicar referencias y modificacion directa de variables.',
    code: 'void duplicar(int& numero) {\n  numero *= 2;\n}\n\nint valor = 6;\nduplicar(valor);\ncout << valor;',
    expected: '12',
  },
  {
    title: 'Ejercicio 7: Herencia simple',
    description: 'Crea una clase Estudiante que herede nombre desde Persona.',
    goal: 'Practicar herencia publica y reutilizacion de atributos.',
    code: 'class Persona { public: string nombre = "Ana"; };\nclass Estudiante : public Persona { public: string carnet = "A001"; };\nEstudiante e;\ncout << e.nombre;',
    expected: 'Ana',
  },
  {
    title: 'Ejercicio 8: Escribir archivo',
    description: 'Simula guardar texto en un archivo con fstream.',
    goal: 'Practicar ofstream y cierre de archivo.',
    code: 'ofstream archivo("salida.txt");\narchivo << "Curso C++";\narchivo.close();\ncout << "Guardado";',
    expected: 'Guardado',
  },
  {
    title: 'Ejercicio 9: Inventario con map',
    description: 'Usa map para guardar existencias por producto.',
    goal: 'Practicar map, claves string y acceso por indice.',
    code: 'map<string, int> inventario;\ninventario["mouse"] = 5;\ninventario["teclado"] = 2;\ncout << inventario["mouse"];',
    expected: '5',
  },
  {
    title: 'Ejercicio 10: Buscar producto',
    description: 'Busca un producto dentro de un vector de nombres.',
    goal: 'Practicar ciclos, bandera booleana y busqueda lineal.',
    code: 'vector<string> productos = {"mouse", "teclado", "monitor"};\nbool existe = false;\nfor (string producto : productos) {\n  if (producto == "monitor") existe = true;\n}\ncout << (existe ? "Encontrado" : "No encontrado");',
    expected: 'Encontrado',
  },
  ...[
    ['Ejercicio 11: Sobrecarga de area', 'Calcula area de cuadrado y rectangulo.', 'Practicar sobrecarga de funciones.', 'int area(int lado) { return lado * lado; }\nint area(int base, int altura) { return base * altura; }\ncout << area(4, 3);', '12'],
    ['Ejercicio 12: Constructor Producto', 'Inicializa un producto con constructor.', 'Practicar constructores.', 'class Producto { public: string nombre; Producto(string n) { nombre = n; } };\nProducto p("Mouse");\ncout << p.nombre;', 'Mouse'],
    ['Ejercicio 13: Encapsular nota', 'Valida una nota antes de guardarla.', 'Practicar private y metodos.', 'class Nota { private: int valor; public: void set(int v) { if (v >= 0 && v <= 100) valor = v; } int get(){ return valor; } };\nNota n; n.set(90); cout << n.get();', '90'],
    ['Ejercicio 14: Polimorfismo area', 'Usa una clase base con metodo virtual.', 'Practicar virtual.', 'class Figura { public: virtual int area(){ return 0; } };\nclass Cuadrado: public Figura { public: int area(){ return 16; } };\nFigura* f = new Cuadrado(); cout << f->area();', '16'],
    ['Ejercicio 15: Template mayor', 'Obtiene el mayor de dos valores.', 'Practicar templates.', 'template <typename T>\nT mayor(T a, T b) { return a > b ? a : b; }\ncout << mayor(8, 3);', '8'],
    ['Ejercicio 16: Excepcion division', 'Controla division entre cero.', 'Practicar try/catch.', 'try { throw runtime_error("No se puede dividir"); }\ncatch (exception& e) { cout << e.what(); }', 'No se puede dividir'],
    ['Ejercicio 17: Constante IVA', 'Calcula precio con constante.', 'Practicar const.', 'const double IVA = 0.12;\ndouble precio = 100;\ncout << precio + (precio * IVA);', '112'],
    ['Ejercicio 18: Complejidad O(n)', 'Cuenta elementos recorriendo vector.', 'Comprender recorrido lineal.', 'vector<int> datos = {1,2,3,4};\nint contador = 0;\nfor (int n : datos) contador++;\ncout << contador;', '4'],
    ['Ejercicio 19: Ordenar vector', 'Ordena numeros con sort.', 'Practicar algoritmos STL.', 'vector<int> numeros = {3, 1, 2};\nsort(numeros.begin(), numeros.end());\ncout << numeros[0];', '1'],
    ['Ejercicio 20: Stack historial', 'Usa pila para guardar historial.', 'Practicar stack.', 'stack<string> historial;\nhistorial.push("login");\nhistorial.push("curso");\ncout << historial.top();', 'curso'],
    ['Ejercicio 21: Queue turnos', 'Atiende el primer turno de una cola.', 'Practicar queue.', 'queue<string> turnos;\nturnos.push("Ana");\nturnos.push("Luis");\ncout << turnos.front();', 'Ana'],
    ['Ejercicio 22: Menu opcion', 'Simula una opcion de menu.', 'Practicar switch.', 'int opcion = 2;\nswitch(opcion) { case 2: cout << "Listar"; break; default: cout << "Menu"; }', 'Listar'],
    ['Ejercicio 23: CSV producto', 'Crea una linea CSV.', 'Practicar formato de persistencia.', 'string nombre = "mouse";\nint stock = 5;\ncout << nombre << "," << stock;', 'mouse,5'],
    ['Ejercicio 24: Buscar en map', 'Valida existencia en map.', 'Practicar find.', 'map<string, int> stock;\nstock["mouse"] = 5;\ncout << (stock.find("mouse") != stock.end() ? "si" : "no");', 'si'],
    ['Ejercicio 25: Checklist final', 'Cuenta tareas pendientes del proyecto.', 'Practicar vector y size.', 'vector<string> tareas = {"clases", "menu", "archivo"};\ncout << tareas.size();', '3'],
  ].map(([title, description, goal, code, expected]) => ({ title, description, goal, code, expected })),
];

export default function CppExercises() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Ejercicios de C++</h1>
            <p className="mt-4 text-xl text-gray-500">Practica con código editable, salida simulada y progreso guardable.</p>
          </div>
          <CodePractice course="cpp" languageLabel="C++" exercises={exercises} />
          <PublishedContentPanel course="cpp" type="exercise" title="Prácticas adicionales de C++" />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
