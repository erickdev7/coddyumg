import AppFooter from '@/app/components/AppFooter';
import CodePractice from '@/app/components/CodePractice';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import SiteHeader from '@/app/components/SiteHeader';

const exercises = [
  {
    title: 'Ejercicio 1: Clase Persona',
    description: 'Crea una clase Persona con nombre, edad y un metodo para presentarse.',
    goal: 'Practicar atributos, constructor y metodos de instancia.',
    code: 'class Persona {\n  String nombre = "Ana";\n  int edad = 20;\n\n  void presentarse() {\n    System.out.println("Hola, soy " + nombre);\n  }\n}',
    expected: 'Hola, soy Ana',
  },
  {
    title: 'Ejercicio 2: Ciclo for',
    description: 'Imprime los numeros del 1 al 10 usando un bucle for.',
    goal: 'Reforzar repeticion, contador y salida por consola.',
    code: 'for (int i = 1; i <= 10; i++) {\n  System.out.println(i);\n}',
    expected: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10',
  },
  {
    title: 'Ejercicio 3: Lista de nombres',
    description: 'Guarda varios nombres en una lista y recorre cada elemento.',
    goal: 'Practicar ArrayList, add y for-each.',
    code: 'ArrayList<String> nombres = new ArrayList<>();\nnombres.add("Ana");\nnombres.add("Luis");\nfor (String nombre : nombres) {\n  System.out.println(nombre);\n}',
    expected: 'Ana\nLuis',
  },
  {
    title: 'Ejercicio 4: Encapsular saldo',
    description: 'Crea una clase Cuenta con saldo privado y un metodo para depositar.',
    goal: 'Practicar private, metodos publicos y validacion.',
    code: 'class Cuenta {\n  private double saldo;\n\n  public void depositar(double monto) {\n    if (monto > 0) saldo += monto;\n  }\n}',
    expected: 'Deposito aplicado',
  },
  {
    title: 'Ejercicio 5: Capturar error',
    description: 'Convierte un texto a numero y captura la excepcion si falla.',
    goal: 'Practicar try, catch y NumberFormatException.',
    code: 'try {\n  int edad = Integer.parseInt("20");\n  System.out.println(edad);\n} catch (NumberFormatException error) {\n  System.out.println("Numero invalido");\n}',
    expected: '20',
  },
  {
    title: 'Ejercicio 6: Herencia Animal',
    description: 'Crea una clase Perro que herede de Animal y sobrescriba hablar().',
    goal: 'Practicar extends y sobreescritura de metodos.',
    code: 'class Animal { void hablar() { System.out.println("Sonido"); } }\nclass Perro extends Animal { void hablar() { System.out.println("Guau"); } }\nAnimal animal = new Perro();\nanimal.hablar();',
    expected: 'Guau',
  },
  {
    title: 'Ejercicio 7: Interface Pagable',
    description: 'Implementa una interfaz con un metodo para calcular pago.',
    goal: 'Practicar interfaces e implements.',
    code: 'interface Pagable { double calcularPago(); }\nclass Factura implements Pagable {\n  public double calcularPago() { return 150.0; }\n}\nSystem.out.println(new Factura().calcularPago());',
    expected: '150.0',
  },
  {
    title: 'Ejercicio 8: Escribir archivo',
    description: 'Simula guardar contenido en un archivo de texto.',
    goal: 'Practicar FileWriter y cierre de recursos.',
    code: 'FileWriter writer = new FileWriter("datos.txt");\nwriter.write("Curso Java");\nwriter.close();\nSystem.out.println("Guardado");',
    expected: 'Guardado',
  },
  {
    title: 'Ejercicio 9: Filtrar con stream',
    description: 'Filtra notas aprobadas usando stream.',
    goal: 'Practicar filter y count.',
    code: 'List<Integer> notas = List.of(50, 80, 90);\nlong aprobadas = notas.stream().filter(nota -> nota >= 61).count();\nSystem.out.println(aprobadas);',
    expected: '2',
  },
  {
    title: 'Ejercicio 10: Carrito simple',
    description: 'Calcula el total de una lista de precios.',
    goal: 'Practicar listas, ciclos y acumuladores.',
    code: 'List<Double> precios = List.of(20.0, 35.5, 10.0);\ndouble total = 0;\nfor (double precio : precios) total += precio;\nSystem.out.println(total);',
    expected: '65.5',
  },
  ...[
    ['Ejercicio 11: Constructor Producto', 'Inicializa un producto con constructor.', 'Practicar constructores.', 'class Producto { String nombre; Producto(String nombre) { this.nombre = nombre; } }\nProducto p = new Producto("Mouse");\nSystem.out.println(p.nombre);', 'Mouse'],
    ['Ejercicio 12: Sobrecarga sumar', 'Sobrecarga un metodo sumar.', 'Practicar sobrecarga.', 'int sumar(int a, int b) { return a + b; }\nSystem.out.println(sumar(4, 5));', '9'],
    ['Ejercicio 13: Figura abstracta', 'Implementa area en una clase hija.', 'Practicar abstract.', 'abstract class Figura { abstract int area(); }\nclass Cuadrado extends Figura { int area() { return 16; } }\nSystem.out.println(new Cuadrado().area());', '16'],
    ['Ejercicio 14: Caja generica', 'Guarda un texto en una clase generica.', 'Practicar generics.', 'class Caja<T> { T valor; Caja(T valor){ this.valor = valor; } }\nCaja<String> caja = new Caja<>("Java");\nSystem.out.println(caja.valor);', 'Java'],
    ['Ejercicio 15: Paquete simulado', 'Muestra nombre de paquete logico.', 'Entender organizacion.', 'String paquete = "com.coddyumg.modelos";\nSystem.out.println(paquete);', 'com.coddyumg.modelos'],
    ['Ejercicio 16: Getter saldo', 'Obtiene saldo con metodo publico.', 'Practicar acceso controlado.', 'class Cuenta { private double saldo = 100; public double getSaldo(){ return saldo; } }\nSystem.out.println(new Cuenta().getSaldo());', '100.0'],
    ['Ejercicio 17: HashMap stock', 'Guarda stock por producto.', 'Practicar Map.', 'Map<String, Integer> stock = new HashMap<>();\nstock.put("mouse", 5);\nSystem.out.println(stock.get("mouse"));', '5'],
    ['Ejercicio 18: Ordenar notas', 'Ordena una lista de notas.', 'Practicar Comparator.', 'List<Integer> notas = new ArrayList<>(List.of(70, 90, 80));\nnotas.sort(Comparator.reverseOrder());\nSystem.out.println(notas.get(0));', '90'],
    ['Ejercicio 19: Validar precio', 'Lanza error si precio es invalido.', 'Practicar validaciones.', 'double precio = 100;\nSystem.out.println(precio > 0 ? "valido" : "invalido");', 'valido'],
    ['Ejercicio 20: Servicio promedio', 'Calcula promedio en metodo de servicio.', 'Separar logica.', 'List<Double> notas = List.of(80.0, 90.0);\ndouble total = 0;\nfor (double n : notas) total += n;\nSystem.out.println(total / notas.size());', '85.0'],
    ['Ejercicio 21: SQL texto', 'Construye consulta SQL.', 'Introducir JDBC.', 'String sql = "SELECT * FROM alumnos";\nSystem.out.println(sql);', 'SELECT * FROM alumnos'],
    ['Ejercicio 22: MVC nombres', 'Representa capas MVC.', 'Practicar arquitectura.', 'String[] capas = {"Modelo", "Vista", "Controlador"};\nSystem.out.println(capas.length);', '3'],
    ['Ejercicio 23: Repositorio simulado', 'Cuenta elementos de repositorio.', 'Separar datos.', 'List<String> repo = List.of("Ana", "Luis");\nSystem.out.println(repo.size());', '2'],
    ['Ejercicio 24: Prueba descuento', 'Valida descuento esperado.', 'Practicar pruebas simples.', 'double total = 100 * 0.9;\nSystem.out.println(total == 90 ? "ok" : "error");', 'ok'],
    ['Ejercicio 25: Checklist final', 'Cuenta entregables del proyecto.', 'Preparar cierre.', 'List<String> checklist = List.of("README", "clases", "pruebas");\nSystem.out.println(checklist.size());', '3'],
  ].map(([title, description, goal, code, expected]) => ({ title, description, goal, code, expected })),
];

export default function JavaExercises() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Ejercicios de Java</h1>
            <p className="mt-4 text-xl text-gray-500">Practica Java con código editable, salida simulada y progreso guardable.</p>
          </div>
          <CodePractice course="java" languageLabel="Java" exercises={exercises} />
          <PublishedContentPanel course="java" type="exercise" title="Prácticas adicionales de Java" />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
