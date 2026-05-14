import Link from 'next/link';
import AppFooter from '@/app/components/AppFooter';
import ProgressButton from '@/app/components/ProgressButton';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import SiteHeader from '@/app/components/SiteHeader';

const lessons = [
  {
    title: '1. Estructura de un programa Java',
    description: 'Java organiza el codigo en clases. El metodo main es el punto de entrada de la aplicacion.',
    example: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hola, Java");\n  }\n}',
    practice: 'Crea una clase Main que imprima tu nombre, carrera y semestre.',
  },
  {
    title: '2. Objetos, atributos y metodos',
    description: 'La programacion orientada a objetos modela entidades con datos y acciones.',
    example: 'class Alumno {\n  String nombre;\n\n  void saludar() {\n    System.out.println("Soy " + nombre);\n  }\n}',
    practice: 'Crea una clase Libro con titulo, autor y un metodo mostrarResumen().',
  },
  {
    title: '3. Colecciones con ArrayList',
    description: 'ArrayList permite guardar una cantidad flexible de elementos y recorrerlos facilmente.',
    example: 'ArrayList<String> cursos = new ArrayList<>();\ncursos.add("Java");\ncursos.add("Python");\nfor (String curso : cursos) {\n  System.out.println(curso);\n}',
    practice: 'Crea una lista de tareas, agrega tres elementos y muestra cada uno en consola.',
  },
  {
    title: '4. Encapsulacion',
    description: 'La encapsulacion protege los datos internos de una clase usando atributos privados y metodos publicos.',
    example: 'class Cuenta {\n  private double saldo;\n\n  public void depositar(double monto) {\n    if (monto > 0) saldo += monto;\n  }\n\n  public double getSaldo() {\n    return saldo;\n  }\n}',
    practice: 'Crea una clase Estudiante con nombre privado y metodos getNombre y setNombre.',
  },
  {
    title: '5. Manejo de excepciones',
    description: 'Las excepciones ayudan a controlar errores sin cerrar el programa de forma inesperada.',
    example: 'try {\n  int resultado = 10 / 0;\n  System.out.println(resultado);\n} catch (ArithmeticException error) {\n  System.out.println("No se puede dividir entre cero");\n}',
    practice: 'Pide un numero como texto, conviertelo a entero y captura el error si no es valido.',
  },
  {
    title: '6. Herencia y polimorfismo',
    description: 'La herencia reutiliza codigo y el polimorfismo permite tratar objetos distintos con una misma referencia.',
    example: 'class Animal {\n  void hablar() { System.out.println("Sonido"); }\n}\n\nclass Perro extends Animal {\n  void hablar() { System.out.println("Guau"); }\n}',
    practice: 'Crea una clase Vehiculo y dos clases hijas: Carro y Moto, cada una con su metodo arrancar().',
  },
  {
    title: '7. Interfaces',
    description: 'Una interfaz define un contrato de metodos que varias clases pueden implementar.',
    example: 'interface Pagable {\n  double calcularPago();\n}\n\nclass Factura implements Pagable {\n  public double calcularPago() { return 150.0; }\n}',
    practice: 'Crea una interfaz Evaluacion con metodo calcularNotaFinal().',
  },
  {
    title: '8. Archivos con Java',
    description: 'Java permite leer y escribir archivos usando clases como FileWriter y Scanner.',
    example: 'FileWriter writer = new FileWriter("datos.txt");\nwriter.write("CoddyUMG");\nwriter.close();',
    practice: 'Guarda tres nombres en un archivo y luego muestra su contenido.',
  },
  {
    title: '9. Streams y filtros',
    description: 'Streams permiten procesar colecciones con operaciones como filter, map y count.',
    example: 'List<Integer> notas = List.of(50, 80, 90);\nlong aprobadas = notas.stream()\n  .filter(nota -> nota >= 61)\n  .count();\nSystem.out.println(aprobadas);',
    practice: 'Filtra una lista de productos y muestra los que tienen precio mayor a 100.',
  },
  {
    title: '10. Proyecto integrador en Java',
    description: 'Integra POO, colecciones, interfaces, excepciones y archivos en una aplicacion completa.',
    example: 'class Producto {\n  private String nombre;\n  private double precio;\n}',
    practice: 'Crea un sistema de ventas con productos, carrito, total y reporte en archivo.',
  },
  {
    title: '11. Constructores',
    description: 'Los constructores inicializan objetos y obligan a proporcionar datos necesarios.',
    example: 'class Alumno {\n  String nombre;\n  Alumno(String nombre) { this.nombre = nombre; }\n}',
    practice: 'Crea un constructor para Producto con nombre, precio y stock.',
  },
  {
    title: '12. Sobrecarga de metodos',
    description: 'Puedes tener varios metodos con el mismo nombre si reciben parametros distintos.',
    example: 'int sumar(int a, int b) { return a + b; }\ndouble sumar(double a, double b) { return a + b; }',
    practice: 'Sobrecarga calcularTotal para producto individual y lista de productos.',
  },
  {
    title: '13. Clases abstractas',
    description: 'Una clase abstracta define comportamiento comun y obliga a clases hijas a completar metodos.',
    example: 'abstract class Figura {\n  abstract double area();\n}',
    practice: 'Crea Figura abstracta y clases Rectangulo y Circulo.',
  },
  {
    title: '14. Generics',
    description: 'Los generics permiten escribir clases o metodos reutilizables con tipos seguros.',
    example: 'ArrayList<String> nombres = new ArrayList<>();',
    practice: 'Crea una caja generica Caja<T> para guardar cualquier tipo.',
  },
  {
    title: '15. Paquetes',
    description: 'Los paquetes organizan clases por responsabilidad dentro de un proyecto.',
    example: 'package com.coddyumg.modelos;\npublic class Producto {}',
    practice: 'Organiza clases en paquetes modelo, servicio y app.',
  },
  {
    title: '16. Modificadores de acceso',
    description: 'public, private y protected controlan que partes del codigo pueden acceder a miembros de una clase.',
    example: 'private double saldo;\npublic double getSaldo() { return saldo; }',
    practice: 'Define atributos privados y metodos publicos para una clase Cuenta.',
  },
  {
    title: '17. Manejo avanzado de colecciones',
    description: 'Map y Set permiten buscar datos por clave y evitar duplicados.',
    example: 'Map<String, Integer> stock = new HashMap<>();\nstock.put("mouse", 5);',
    practice: 'Crea un mapa de productos y existencias.',
  },
  {
    title: '18. Ordenamiento con Comparator',
    description: 'Comparator permite definir criterios personalizados para ordenar objetos.',
    example: 'productos.sort(Comparator.comparing(Producto::getPrecio));',
    practice: 'Ordena estudiantes por nota de mayor a menor.',
  },
  {
    title: '19. Validacion de datos',
    description: 'Validar datos evita estados incorrectos y errores en ejecucion.',
    example: 'if (precio <= 0) throw new IllegalArgumentException("Precio invalido");',
    practice: 'Valida que una nota este entre 0 y 100.',
  },
  {
    title: '20. Buenas practicas en Java',
    description: 'Mantener clases pequenas, nombres claros y responsabilidades separadas mejora el mantenimiento.',
    example: 'class CalculadoraNotas {\n  double promedio(List<Double> notas) { return 0; }\n}',
    practice: 'Divide una clase grande en modelo, servicio y vista.',
  },
  {
    title: '21. Introduccion a JDBC',
    description: 'JDBC permite conectar Java con bases de datos relacionales.',
    example: 'String sql = "SELECT * FROM alumnos";\nSystem.out.println(sql);',
    practice: 'Escribe consultas SQL para listar alumnos aprobados.',
  },
  {
    title: '22. Arquitectura MVC',
    description: 'MVC separa modelo, vista y controlador para ordenar aplicaciones.',
    example: 'class AlumnoModelo {}\nclass AlumnoVista {}\nclass AlumnoControlador {}',
    practice: 'Organiza un mini sistema de alumnos usando MVC.',
  },
  {
    title: '23. Servicios y repositorios',
    description: 'Un servicio contiene reglas de negocio y un repositorio maneja datos.',
    example: 'class AlumnoService {}\nclass AlumnoRepository {}',
    practice: 'Crea servicio y repositorio para productos.',
  },
  {
    title: '24. Pruebas basicas',
    description: 'Las pruebas verifican metodos importantes y reducen regresiones.',
    example: 'assert calcularTotal() == 100;',
    practice: 'Escribe casos de prueba para calcular descuentos.',
  },
  {
    title: '25. Preparacion de proyecto final',
    description: 'Prepara entregables, estructura, validaciones, datos de prueba y documentacion.',
    example: '// README: descripcion, requisitos, ejecucion, capturas',
    practice: 'Crea README y checklist de entrega para el sistema de ventas.',
  },
];

function getLessonModule(lessonNumber: number) {
  return Math.ceil(lessonNumber / 5);
}

export default function JavaLessons() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Lecciones de Java</h1>
            <p className="mt-4 text-xl text-gray-500">Conceptos clave de Java con ejemplos y practica por tema.</p>
          </div>

          <div className="mt-16 space-y-8">
            {lessons.map((lesson, index) => (
              <section key={lesson.title} id={`lesson-${index + 1}`} className="scroll-mt-24 rounded-lg bg-white p-8 shadow">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
                    Módulo {getLessonModule(index + 1)}
                  </span>
                  <h2 className="text-2xl font-semibold text-gray-900">{lesson.title}</h2>
                </div>
                <p className="mt-3 text-gray-600">{lesson.description}</p>
                <pre className="mt-5 overflow-x-auto rounded-md bg-gray-950 p-4 text-sm text-red-100">
                  <code>{lesson.example}</code>
                </pre>
                <div className="mt-5 rounded-md bg-red-50 p-4">
                  <p className="text-sm font-semibold text-red-900">Ejercicio del tema</p>
                  <p className="mt-1 text-sm text-red-800">{lesson.practice}</p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link href={`/courses/java/lessons/${index + 1}`} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Vista individual
                  </Link>
                  <ProgressButton course="java" activity={lesson.title} />
                </div>
              </section>
            ))}
          </div>

          <PublishedContentPanel course="java" type="lesson" title="Lecciones adicionales de Java" />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
