import AppFooter from '@/app/components/AppFooter';
import ChallengeList from '@/app/components/ChallengeList';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import SiteHeader from '@/app/components/SiteHeader';

const challenges = [
  {
    title: 'Reto 1: Convertidor de temperatura',
    description: 'Convierte Celsius a Fahrenheit y Kelvin usando metodos separados.',
    steps: ['Crea una clase Temperatura', 'Agrega metodos aFahrenheit() y aKelvin()', 'Imprime ambos resultados'],
    sample: 'Entrada: 25 C\nSalida: 77 F, 298.15 K',
  },
  {
    title: 'Reto 2: Clase Producto',
    description: 'Modela un producto con precio, nombre y descuento.',
    steps: ['Crea atributos nombre y precio', 'Agrega metodo aplicarDescuento()', 'Muestra el precio final'],
    sample: 'Entrada: precio 100, descuento 15%\nSalida: 85',
  },
  {
    title: 'Reto 3: Lista de tareas',
    description: 'Administra tareas con ArrayList: agregar, listar y eliminar.',
    steps: ['Crea un ArrayList<String>', 'Agrega tres tareas', 'Elimina una y muestra las restantes'],
    sample: 'Entrada: estudiar, practicar, entregar\nSalida: estudiar, entregar',
  },
  {
    title: 'Reto 4: Cuenta bancaria',
    description: 'Crea una clase Cuenta con saldo privado, deposito y retiro validado.',
    steps: ['Usa encapsulacion con private', 'Valida que el retiro no supere el saldo', 'Muestra saldo final'],
    sample: 'Entrada: saldo 100, retiro 30\nSalida: saldo final 70',
  },
  {
    title: 'Reto 5: Promedio de estudiantes',
    description: 'Usa una lista de estudiantes para calcular el promedio del grupo.',
    steps: ['Crea una clase Estudiante', 'Guarda nombre y nota', 'Recorre un ArrayList<Estudiante> para promediar'],
    sample: 'Entrada: Ana 90, Luis 80\nSalida: promedio del grupo 85',
  },
  {
    title: 'Reto 6: Sistema de figuras',
    description: 'Usa herencia para calcular areas de circulos y rectangulos.',
    steps: ['Crea clase abstracta Figura', 'Implementa area() en clases hijas', 'Recorre una lista de figuras'],
    sample: 'Entrada: rectangulo 4x3\nSalida: area 12',
  },
  {
    title: 'Reto 7: Pagos con interfaces',
    description: 'Modela pagos de empleados usando una interfaz Pagable.',
    steps: ['Define interfaz Pagable', 'Crea EmpleadoFijo y EmpleadoHora', 'Calcula pago total'],
    sample: 'Entrada: 8 horas, Q30\nSalida: pago Q240',
  },
  {
    title: 'Reto 8: Reporte en archivo',
    description: 'Genera un archivo de reporte con nombres y notas finales.',
    steps: ['Crea una lista de estudiantes', 'Escribe cada registro con FileWriter', 'Muestra mensaje de confirmacion'],
    sample: 'Entrada: Ana 90\nSalida archivo: Ana,90',
  },
  {
    title: 'Reto 9: Catalogo con streams',
    description: 'Procesa un catalogo de productos usando streams y filtros.',
    steps: ['Crea lista de productos', 'Filtra por precio o categoria', 'Cuenta y muestra resultados'],
    sample: 'Entrada: productos mayores a Q100\nSalida: 3 productos encontrados',
  },
  {
    title: 'Reto 10: Proyecto final Java',
    description: 'Construye un sistema de ventas con productos, carrito, excepciones y reporte.',
    steps: ['Modela Producto y Carrito', 'Valida stock', 'Genera reporte de compra en archivo'],
    sample: 'Entrada: comprar mouse\nSalida: total generado y reporte guardado',
  },
  ...[
    ['Reto 11: Productos con constructor', 'Inicializa productos obligando datos validos.', 'Constructor nombre/precio|Validacion|Mostrar resumen', 'Entrada: Mouse 50\nSalida: Mouse Q50'],
    ['Reto 12: Sobrecarga de totales', 'Calcula totales con distintos parametros.', 'Total producto|Total lista|Aplicar impuesto', 'Entrada: 100 + IVA\nSalida: 112'],
    ['Reto 13: Figuras abstractas', 'Usa clase abstracta para calcular areas.', 'Figura abstracta|Rectangulo|Circulo', 'Entrada: rectangulo 4x3\nSalida: 12'],
    ['Reto 14: Caja generica', 'Crea contenedor generico reutilizable.', 'Clase Caja<T>|Guardar valor|Obtener valor', 'Entrada: Java\nSalida: Java'],
    ['Reto 15: Proyecto por paquetes', 'Organiza una app en paquetes.', 'modelo|servicio|app', 'Entrada: estructura\nSalida: paquetes creados'],
    ['Reto 16: Acceso seguro', 'Controla atributos con modificadores.', 'private|getters|setters validos', 'Entrada: nota 90\nSalida: guardada'],
    ['Reto 17: Stock con HashMap', 'Administra existencias por codigo.', 'HashMap|put/get|Actualizar stock', 'Entrada: M01 +5\nSalida: 5'],
    ['Reto 18: Ranking con Comparator', 'Ordena estudiantes por nota.', 'Comparator|sort|Top 3', 'Entrada: Ana 90, Luis 80\nSalida: Ana primero'],
    ['Reto 19: Validador de dominio', 'Valida datos de productos antes de guardar.', 'Precio positivo|Stock no negativo|Errores claros', 'Entrada: precio -1\nSalida: invalido'],
    ['Reto 20: Refactor a servicios', 'Separa logica en servicios.', 'Modelo Producto|ProductoService|Repositorio simulado', 'Entrada: calcular total\nSalida: servicio responde'],
    ['Reto 21: Consultas JDBC', 'Prepara consultas para alumnos.', 'SELECT|INSERT|UPDATE', 'Entrada: listar alumnos\nSalida: SQL listo'],
    ['Reto 22: App MVC', 'Organiza estudiantes con MVC.', 'Modelo|Vista|Controlador', 'Entrada: crear alumno\nSalida: alumno mostrado'],
    ['Reto 23: Repositorio de productos', 'Simula repositorio en memoria.', 'Guardar|Buscar|Listar', 'Entrada: buscar mouse\nSalida: encontrado'],
    ['Reto 24: Pruebas de descuento', 'Define casos de prueba para descuentos.', 'Caso normal|Caso cero|Caso invalido', 'Entrada: 100,10%\nSalida: 90 esperado'],
    ['Reto 25: Demo final Java', 'Integra ventas, carrito, reporte y validaciones.', 'Productos|Carrito|Archivo|Presentacion', 'Entrada: demo\nSalida: venta completada'],
  ].map(([title, description, steps, sample]) => ({ title, description, steps: steps.split('|'), sample })),
];

export default function JavaChallenges() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Retos de Java</h1>
            <p className="mt-4 text-xl text-gray-500">Retos para reforzar clases, metodos y colecciones.</p>
          </div>

          <ChallengeList course="java" challenges={challenges} accentClass="text-red-600" />

          <PublishedContentPanel course="java" type="challenge" title="Retos adicionales de Java" />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
