import AppFooter from '@/app/components/AppFooter';
import ChallengeList from '@/app/components/ChallengeList';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import SiteHeader from '@/app/components/SiteHeader';

const challenges = [
  {
    title: 'Reto 1: Contador de palabras',
    description: 'Recibe un texto y devuelve cuantas palabras unicas contiene.',
    steps: ['Convierte el texto a minusculas', 'Divide el texto con split()', 'Usa set() para eliminar repetidas'],
    sample: 'Entrada: "Python es facil y Python es util"\nSalida: 5',
  },
  {
    title: 'Reto 2: Analizador de notas',
    description: 'Recibe una lista de notas y calcula promedio, nota mayor y nota menor.',
    steps: ['Guarda las notas en una lista', 'Usa sum(), max() y min()', 'Muestra un mensaje si el promedio es aprobatorio'],
    sample: 'Entrada: [70, 90, 85]\nSalida: promedio 81.66, mayor 90, menor 70',
  },
  {
    title: 'Reto 3: Validar contrasena',
    description: 'Comprueba que una contrasena tenga minimo 8 caracteres, mayuscula, minuscula y numero.',
    steps: ['Valida longitud con len()', 'Revisa caracteres con isupper(), islower() e isdigit()', 'Devuelve True o False'],
    sample: 'Entrada: "Coddy2026"\nSalida: True',
  },
  {
    title: 'Reto 4: Agenda de contactos',
    description: 'Crea un diccionario para guardar contactos con nombre, telefono y correo.',
    steps: ['Usa el nombre como clave del diccionario', 'Guarda telefono y correo como otro diccionario', 'Permite buscar un contacto por nombre'],
    sample: 'Entrada: buscar "Ana"\nSalida: Ana | 5555-1111 | ana@correo.com',
  },
  {
    title: 'Reto 5: Registro de gastos',
    description: 'Recibe gastos por categoria y calcula el total gastado por cada una.',
    steps: ['Guarda gastos en una lista de diccionarios', 'Agrupa por categoria', 'Muestra el total general y el total por categoria'],
    sample: 'Entrada: comida 25, transporte 10, comida 15\nSalida: comida 40, transporte 10, total 50',
  },
  {
    title: 'Reto 6: Sistema de biblioteca',
    description: 'Modela libros con una clase y permite prestar o devolver ejemplares.',
    steps: ['Crea una clase Libro', 'Agrega atributo disponible', 'Implementa prestar() y devolver()'],
    sample: 'Entrada: prestar "Python Basico"\nSalida: Prestamo realizado',
  },
  {
    title: 'Reto 7: Promedio desde archivo',
    description: 'Lee notas desde un archivo de texto y calcula el promedio general.',
    steps: ['Lee cada linea del archivo', 'Convierte valores a numero', 'Calcula promedio y muestra aprobados'],
    sample: 'Entrada archivo: 80, 70, 90\nSalida: promedio 80',
  },
  {
    title: 'Reto 8: Mini analizador CSV',
    description: 'Procesa un archivo CSV de alumnos y muestra el mejor promedio.',
    steps: ['Lee el CSV', 'Convierte notas a float', 'Compara promedios por alumno'],
    sample: 'Entrada: Ana,90 | Luis,75\nSalida: Ana tiene el mejor promedio',
  },
  {
    title: 'Reto 9: Cliente de API',
    description: 'Consume una API publica y muestra datos importantes al usuario.',
    steps: ['Realiza una peticion GET', 'Valida status_code', 'Convierte la respuesta a JSON y muestra campos utiles'],
    sample: 'Entrada: API de usuarios\nSalida: nombre, correo y estado',
  },
  {
    title: 'Reto 10: Proyecto final Python',
    description: 'Construye un gestor de tareas con clases, archivos y reporte final.',
    steps: ['Crea clase GestorTareas', 'Permite agregar, completar y listar tareas', 'Guarda informacion en archivo'],
    sample: 'Entrada: agregar "Estudiar"\nSalida: tarea guardada y reporte actualizado',
  },
  ...[
    ['Reto 11: Transformador de listas', 'Transforma una lista de numeros en cuadrados pares.', 'Usa comprension de listas|Filtra pares|Eleva al cuadrado', 'Entrada: 1..6\nSalida: 4,16,36'],
    ['Reto 12: Orden de productos', 'Ordena productos por precio y muestra el mas barato.', 'Usa lista de diccionarios|Ordena con key|Muestra nombre y precio', 'Entrada: A 30, B 10\nSalida: B 10'],
    ['Reto 13: Calendario de entregas', 'Calcula dias restantes para varias entregas.', 'Usa datetime|Resta fechas|Ordena por urgencia', 'Entrada: entrega en 5 dias\nSalida: faltan 5 dias'],
    ['Reto 14: Configuracion de app', 'Carga configuracion desde variables de entorno con valores por defecto.', 'Usa os.getenv|Define modo app|Muestra configuracion activa', 'Entrada: sin APP_MODE\nSalida: development'],
    ['Reto 15: Suite de pruebas', 'Crea pruebas para funciones de notas.', 'Define funciones puras|Escribe asserts|Cubre aprobado y reprobado', 'Entrada: nota 70\nSalida: test ok'],
    ['Reto 16: Debug de calculadora', 'Encuentra y corrige errores en una calculadora de promedio.', 'Revisa variables|Agrega prints|Corrige division', 'Entrada: 80,90\nSalida: 85'],
    ['Reto 17: Descuentos funcionales', 'Aplica descuentos a productos sin modificar la lista original.', 'Usa map o comprension|Crea nueva lista|Muestra totales', 'Entrada: 100\nSalida: 90'],
    ['Reto 18: Usuarios por rol', 'Filtra usuarios por rol y genera resumen.', 'Crea lista de usuarios|Filtra students|Cuenta teachers', 'Entrada: 3 usuarios\nSalida: 2 alumnos'],
    ['Reto 19: Consultas SQL', 'Escribe consultas para reportes academicos.', 'SELECT aprobados|COUNT por curso|ORDER por nota', 'Entrada: alumnos\nSalida: SQL de reporte'],
    ['Reto 20: Arquitectura por capas', 'Separa una app de tareas en capas.', 'Capa datos|Capa logica|Capa presentacion', 'Entrada: listar\nSalida: tareas visibles'],
    ['Reto 21: Validador de seguridad', 'Valida claves y detecta entradas sospechosas.', 'Longitud minima|Numeros y letras|Mensajes claros', 'Entrada: abc\nSalida: clave debil'],
    ['Reto 22: Reporte README', 'Genera un README desde secciones obligatorias.', 'Define secciones|Valida faltantes|Imprime checklist', 'Entrada: sin pruebas\nSalida: falta pruebas'],
    ['Reto 23: Analizador de logs', 'Procesa lineas de log y cuenta errores.', 'Lee lineas|Filtra ERROR|Agrupa por tipo', 'Entrada: ERROR x2\nSalida: 2 errores'],
    ['Reto 24: Conversor de datos', 'Convierte datos crudos en estructuras limpias.', 'Recibe texto CSV|Separa columnas|Convierte tipos', 'Entrada: Ana,90\nSalida: dict alumno'],
    ['Reto 25: Presentacion final', 'Prepara una demo automatizada del proyecto.', 'Carga datos ejemplo|Ejecuta flujo completo|Muestra resumen final', 'Entrada: demo\nSalida: proyecto listo'],
  ].map(([title, description, steps, sample]) => ({ title, description, steps: steps.split('|'), sample })),
];

export default function PythonChallenges() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Retos de Python</h1>
            <p className="mt-4 text-xl text-gray-500">Retos con pasos sugeridos, ejemplo de salida y registro de progreso.</p>
          </div>

          <ChallengeList course="python" challenges={challenges} accentClass="text-blue-600" />

          <PublishedContentPanel course="python" type="challenge" title="Retos adicionales de Python" />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
