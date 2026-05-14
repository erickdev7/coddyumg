import AppFooter from '@/app/components/AppFooter';
import ChallengeList from '@/app/components/ChallengeList';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import SiteHeader from '@/app/components/SiteHeader';

const challenges = [
  {
    title: 'Reto 1: Ordenar numeros',
    description: 'Ordena tres numeros ingresados por el usuario de menor a mayor.',
    steps: ['Lee tres enteros con cin', 'Compara valores con if', 'Muestra el orden final con cout'],
    sample: 'Entrada: 9 2 5\nSalida: 2 5 9',
  },
  {
    title: 'Reto 2: Clase Rectangulo',
    description: 'Crea una clase Rectangulo con base, altura, area y perimetro.',
    steps: ['Define atributos base y altura', 'Crea metodos area() y perimetro()', 'Instancia un objeto y muestra resultados'],
    sample: 'Entrada: base 4, altura 3\nSalida: area 12, perimetro 14',
  },
  {
    title: 'Reto 3: Inventario simple',
    description: 'Registra productos con precio y calcula el total del inventario.',
    steps: ['Usa arreglos para nombres y precios', 'Recorre con for', 'Acumula el total'],
    sample: 'Entrada: Mouse 50, Teclado 120\nSalida: Total 170',
  },
  {
    title: 'Reto 4: Promedio con vector',
    description: 'Guarda notas en un vector y calcula promedio, mayor y menor.',
    steps: ['Lee cuantas notas ingresara el usuario', 'Agrega cada nota con push_back', 'Recorre el vector para calcular resultados'],
    sample: 'Entrada: 70 90 80\nSalida: promedio 80, mayor 90, menor 70',
  },
  {
    title: 'Reto 5: Sistema de biblioteca',
    description: 'Modela libros con titulo, autor y disponibilidad usando una clase.',
    steps: ['Crea una clase Libro', 'Agrega metodos prestar() y devolver()', 'Muestra el estado del libro'],
    sample: 'Entrada: prestar "POO en C++"\nSalida: Libro no disponible',
  },
  {
    title: 'Reto 6: Ranking de notas',
    description: 'Ordena un vector de notas de mayor a menor y muestra el top 3.',
    steps: ['Guarda notas en vector', 'Usa sort con orden descendente', 'Muestra las primeras tres notas'],
    sample: 'Entrada: 70 95 80 100\nSalida: 100 95 80',
  },
  {
    title: 'Reto 7: Jerarquia de empleados',
    description: 'Usa herencia para representar empleados por hora y empleados fijos.',
    steps: ['Crea clase base Empleado', 'Crea clases derivadas', 'Calcula pago segun tipo'],
    sample: 'Entrada: 8 horas, Q25\nSalida: pago Q200',
  },
  {
    title: 'Reto 8: Bitacora en archivo',
    description: 'Guarda eventos de un programa en un archivo de texto.',
    steps: ['Abre archivo en modo append', 'Escribe fecha y mensaje', 'Lee la bitacora al final'],
    sample: 'Entrada: inicio, cierre\nSalida archivo: inicio | cierre',
  },
  {
    title: 'Reto 9: Control de existencias',
    description: 'Usa map para controlar entradas y salidas de inventario.',
    steps: ['Crea map producto-existencia', 'Permite sumar y restar existencias', 'Evita existencias negativas'],
    sample: 'Entrada: mouse +5, mouse -2\nSalida: mouse 3',
  },
  {
    title: 'Reto 10: Proyecto final C++',
    description: 'Construye un inventario de consola con clases, vectores, busqueda y archivo.',
    steps: ['Crea clase Producto', 'Agrega menu de opciones', 'Guarda el inventario en archivo'],
    sample: 'Entrada: agregar teclado 120\nSalida: producto guardado',
  },
  ...[
    ['Reto 11: Areas sobrecargadas', 'Calcula areas usando funciones sobrecargadas.', 'Crea area(lado)|Crea area(base,altura)|Muestra resultados', 'Entrada: 4, 4x3\nSalida: 16 y 12'],
    ['Reto 12: Productos con constructor', 'Crea productos validos desde constructor.', 'Constructor con nombre/precio|Valida precio|Muestra producto', 'Entrada: Mouse 50\nSalida: Mouse Q50'],
    ['Reto 13: Cuenta encapsulada', 'Protege saldo con metodos seguros.', 'Atributo private|Depositar|Retirar con validacion', 'Entrada: saldo 100 retiro 30\nSalida: 70'],
    ['Reto 14: Figuras polimorficas', 'Calcula area de varias figuras usando virtual.', 'Clase base Figura|Clases hijas|Vector de punteros', 'Entrada: cuadrado 4\nSalida: area 16'],
    ['Reto 15: Utilidades template', 'Crea utilidades genericas para mayor y menor.', 'Template mayor|Template menor|Prueba int/double', 'Entrada: 4,9\nSalida: 9'],
    ['Reto 16: Calculadora segura', 'Lanza excepcion al dividir entre cero.', 'Valida divisor|throw runtime_error|catch y mensaje', 'Entrada: 10/0\nSalida: error controlado'],
    ['Reto 17: Proyecto separado', 'Organiza clase Producto en .h y .cpp.', 'Declaracion h|Definicion cpp|Uso en main', 'Entrada: compilar\nSalida: ok'],
    ['Reto 18: Analisis de complejidad', 'Clasifica algoritmos por complejidad.', 'Identifica loops|Cuenta anidaciones|Explica Big O', 'Entrada: doble for\nSalida: O(n2)'],
    ['Reto 19: Busqueda eficiente', 'Ordena y busca productos por codigo.', 'sort|binary_search|Mostrar encontrado', 'Entrada: codigo 10\nSalida: encontrado'],
    ['Reto 20: Historial con pila', 'Implementa deshacer usando stack.', 'push acciones|top actual|pop deshacer', 'Entrada: editar, borrar, undo\nSalida: editar'],
    ['Reto 21: Sistema de turnos', 'Atiende alumnos usando queue.', 'Registrar turno|Atender primero|Mostrar pendientes', 'Entrada: Ana,Luis\nSalida: atiende Ana'],
    ['Reto 22: Menu robusto', 'Crea menu con validaciones.', 'do while|switch|opcion salir', 'Entrada: opcion invalida\nSalida: mensaje error'],
    ['Reto 23: Inventario CSV', 'Carga y guarda inventario en CSV.', 'Leer archivo|Parsear lineas|Guardar cambios', 'Entrada: mouse,5\nSalida: inventario cargado'],
    ['Reto 24: Busqueda por mapa', 'Usa map para buscar productos rapido.', 'map codigo-producto|find|Actualizar stock', 'Entrada: M01\nSalida: mouse'],
    ['Reto 25: Demo final C++', 'Integra todo el sistema para presentacion.', 'Menu|Clases|Archivo|Reporte final', 'Entrada: demo\nSalida: sistema listo'],
  ].map(([title, description, steps, sample]) => ({ title, description, steps: steps.split('|'), sample })),
];

export default function CppChallenges() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Retos de C++</h1>
            <p className="mt-4 text-xl text-gray-500">Problemas para combinar logica, estructuras y objetos.</p>
          </div>

          <ChallengeList course="cpp" challenges={challenges} accentClass="text-green-600" />

          <PublishedContentPanel course="cpp" type="challenge" title="Retos adicionales de C++" />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
