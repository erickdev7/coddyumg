import Link from 'next/link';
import AppFooter from '@/app/components/AppFooter';
import ProgressButton from '@/app/components/ProgressButton';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import SiteHeader from '@/app/components/SiteHeader';

const lessons = [
  {
    title: '1. Variables y tipos de datos',
    description: 'Una variable guarda informacion para usarla despues. En Python no declaras el tipo: el lenguaje lo reconoce por el valor.',
    example: 'nombre = "Erick"\nedad = 22\npromedio = 87.5\nactivo = True\nprint(nombre, edad, promedio, activo)',
    practice: 'Crea variables para tu nombre, edad y carrera. Luego imprime una frase usando esos valores.',
    topics: ['Texto con str', 'Numeros con int y float', 'Booleanos con True o False'],
  },
  {
    title: '2. Condicionales y ciclos',
    description: 'Los condicionales permiten tomar decisiones y los ciclos repiten instrucciones mientras una condicion se cumpla.',
    example: 'nota = 75\nif nota >= 61:\n    print("Aprobado")\nelse:\n    print("Reprobado")\n\nfor numero in range(1, 4):\n    print(numero)',
    practice: 'Pide una nota y muestra si el alumno aprobo. Luego imprime los numeros del 1 al 10.',
    topics: ['if, elif y else', 'for con range', 'while para repetir por condicion'],
  },
  {
    title: '3. Funciones, listas y diccionarios',
    description: 'Las funciones organizan codigo reutilizable. Las listas guardan varios elementos y los diccionarios guardan pares clave-valor.',
    example: 'def calcular_promedio(notas):\n    return sum(notas) / len(notas)\n\nalumno = {"nombre": "Ana", "notas": [80, 95, 90]}\nprint(calcular_promedio(alumno["notas"]))',
    practice: 'Crea una funcion que reciba tres notas y devuelva el promedio. Guarda el nombre del alumno en un diccionario.',
    topics: ['def y return', 'Listas e indices', 'Diccionarios con claves'],
  },
  {
    title: '4. Manejo de errores',
    description: 'Los errores pueden detener un programa. Con try y except puedes capturarlos y responder con mensajes utiles.',
    example: 'try:\n    numero = int(input("Ingresa un numero: "))\n    print(10 / numero)\nexcept ValueError:\n    print("Debes ingresar un numero valido")\nexcept ZeroDivisionError:\n    print("No se puede dividir entre cero")',
    practice: 'Pide una edad al usuario. Si escribe texto o un valor negativo, muestra un mensaje claro.',
    topics: ['try y except', 'ValueError', 'Validaciones antes de procesar'],
  },
  {
    title: '5. Archivos de texto',
    description: 'Python puede leer y escribir archivos para guardar informacion fuera de la memoria del programa.',
    example: 'with open("notas.txt", "w") as archivo:\n    archivo.write("Ana: 90\\nLuis: 85")\n\nwith open("notas.txt", "r") as archivo:\n    contenido = archivo.read()\n    print(contenido)',
    practice: 'Crea un archivo con tres tareas pendientes. Luego leelo e imprime cada tarea.',
    topics: ['open()', 'Modo escritura y lectura', 'with para cerrar archivos automaticamente'],
  },
  {
    title: '6. Programacion orientada a objetos',
    description: 'La POO permite modelar entidades reales con clases, atributos y metodos.',
    example: 'class Estudiante:\n    def __init__(self, nombre, carnet):\n        self.nombre = nombre\n        self.carnet = carnet\n\n    def presentarse(self):\n        return f"Soy {self.nombre}"\n\nalumno = Estudiante("Ana", "A001")\nprint(alumno.presentarse())',
    practice: 'Crea una clase Curso con nombre, creditos y un metodo que muestre la informacion.',
    topics: ['class', '__init__', 'self y metodos'],
  },
  {
    title: '7. Modulos y paquetes',
    description: 'Los modulos permiten separar codigo en archivos y reutilizar funciones en varios programas.',
    example: '# archivo operaciones.py\n# def sumar(a, b):\n#     return a + b\n\nfrom math import sqrt\nprint(sqrt(25))',
    practice: 'Crea un modulo llamado utilidades.py con una funcion para calcular promedio.',
    topics: ['import', 'from', 'Organizacion por archivos'],
  },
  {
    title: '8. Introduccion a datos con CSV',
    description: 'CSV es un formato simple para guardar tablas. Python puede leerlo para analizar registros.',
    example: 'import csv\n\nwith open("alumnos.csv") as archivo:\n    lector = csv.reader(archivo)\n    for fila in lector:\n        print(fila)',
    practice: 'Lee un CSV de alumnos con nombre y nota. Muestra solo quienes aprobaron.',
    topics: ['csv.reader', 'Filas y columnas', 'Procesamiento de datos'],
  },
  {
    title: '9. APIs y peticiones HTTP',
    description: 'Una API permite que un programa consulte datos de otro servicio. En Python puedes usar requests para consumir informacion externa.',
    example: 'import requests\n\nrespuesta = requests.get("https://api.github.com")\nprint(respuesta.status_code)\nprint(respuesta.json()["current_user_url"])',
    practice: 'Consulta una API publica, valida el codigo de estado y muestra un campo del JSON.',
    topics: ['GET', 'JSON', 'Codigos de estado HTTP'],
  },
  {
    title: '10. Proyecto integrador en Python',
    description: 'Integra funciones, archivos, clases y datos para construir una aplicacion pequena y mantenible.',
    example: 'class GestorTareas:\n    def __init__(self):\n        self.tareas = []\n\n    def agregar(self, tarea):\n        self.tareas.append(tarea)\n\n    def listar(self):\n        return "\\n".join(self.tareas)',
    practice: 'Crea un gestor de tareas con clase, guardado en archivo y reporte de pendientes.',
    topics: ['Diseno de clases', 'Persistencia', 'Reporte final'],
  },
  {
    title: '11. Comprension de listas',
    description: 'Las comprensiones permiten crear listas nuevas de forma compacta y legible.',
    example: 'numeros = [1, 2, 3, 4, 5]\ncuadrados = [numero ** 2 for numero in numeros]\nprint(cuadrados)',
    practice: 'Crea una lista con los numeros pares del 1 al 20 usando comprension.',
    topics: ['List comprehension', 'Filtros con if', 'Transformacion de datos'],
  },
  {
    title: '12. Lambdas y funciones anonimas',
    description: 'Una lambda es una funcion corta que se usa cuando necesitas una operacion simple.',
    example: 'duplicar = lambda numero: numero * 2\nprint(duplicar(6))',
    practice: 'Crea una lambda que calcule el impuesto de un precio.',
    topics: ['lambda', 'Funciones de una linea', 'Uso con sorted y map'],
  },
  {
    title: '13. map, filter y sorted',
    description: 'Estas funciones ayudan a transformar, filtrar y ordenar colecciones.',
    example: 'notas = [55, 70, 90]\naprobadas = list(filter(lambda nota: nota >= 61, notas))\nprint(aprobadas)',
    practice: 'Filtra productos mayores a Q100 y ordenalos por precio.',
    topics: ['map', 'filter', 'sorted'],
  },
  {
    title: '14. Fechas y tiempo',
    description: 'El modulo datetime permite trabajar con fechas, horas y duraciones.',
    example: 'from datetime import datetime\nhoy = datetime.now()\nprint(hoy.year)',
    practice: 'Calcula cuantos dias faltan para una fecha de entrega.',
    topics: ['datetime', 'Fechas actuales', 'Diferencia entre fechas'],
  },
  {
    title: '15. Entornos virtuales y dependencias',
    description: 'Los entornos virtuales separan dependencias por proyecto para evitar conflictos.',
    example: 'python -m venv .venv\n# activar entorno\npip install requests\npip freeze > requirements.txt',
    practice: 'Crea un archivo requirements.txt con las dependencias de un proyecto.',
    topics: ['venv', 'pip', 'requirements.txt'],
  },
  {
    title: '16. Pruebas unitarias',
    description: 'Las pruebas verifican que tus funciones sigan funcionando cuando el proyecto crece.',
    example: 'def sumar(a, b):\n    return a + b\n\ndef test_sumar():\n    assert sumar(2, 3) == 5',
    practice: 'Escribe pruebas para una funcion que calcule promedio.',
    topics: ['assert', 'pytest', 'Casos esperados'],
  },
  {
    title: '17. Depuracion',
    description: 'Depurar consiste en inspeccionar el programa para entender errores y valores intermedios.',
    example: 'def dividir(a, b):\n    breakpoint()\n    return a / b\n\nprint(dividir(10, 2))',
    practice: 'Usa prints o breakpoint para encontrar un error en un calculo.',
    topics: ['breakpoint', 'Inspeccion de variables', 'Seguimiento de errores'],
  },
  {
    title: '18. Programacion funcional basica',
    description: 'La programacion funcional favorece funciones puras y transformaciones de datos.',
    example: 'def aplicar_descuento(precio):\n    return precio * 0.9\n\nprecios = [100, 50]\nprint(list(map(aplicar_descuento, precios)))',
    practice: 'Transforma una lista de precios aplicando descuento sin modificar la lista original.',
    topics: ['Funciones puras', 'Inmutabilidad', 'Transformaciones'],
  },
  {
    title: '19. Manejo de configuracion',
    description: 'Las configuraciones separan valores como claves, URLs o modos de ejecucion.',
    example: 'import os\nmodo = os.getenv("APP_MODE", "development")\nprint(modo)',
    practice: 'Lee una variable de entorno para cambiar el nombre de la aplicacion.',
    topics: ['os.getenv', 'Variables de entorno', 'Configuracion por ambiente'],
  },
  {
    title: '20. Buenas practicas de codigo',
    description: 'Nombrar bien, separar funciones y mantener codigo simple facilita mantenimiento.',
    example: 'def calcular_total(precios):\n    return sum(precios)\n\n# Nombre claro, funcion pequena, resultado predecible',
    practice: 'Refactoriza un bloque largo en tres funciones pequenas.',
    topics: ['Nombres claros', 'Funciones pequenas', 'Legibilidad'],
  },
  {
    title: '21. Introduccion a bases de datos',
    description: 'Una base de datos permite guardar informacion estructurada de forma permanente.',
    example: 'usuarios = [\n    {"nombre": "Ana", "rol": "student"},\n    {"nombre": "Luis", "rol": "teacher"},\n]\nprint(usuarios[0]["nombre"])',
    practice: 'Modela una lista de usuarios y filtra solo alumnos.',
    topics: ['Tablas', 'Registros', 'Consultas basicas'],
  },
  {
    title: '22. SQL basico desde Python',
    description: 'SQL permite consultar, insertar y actualizar datos en bases relacionales.',
    example: 'consulta = "select nombre, nota from alumnos where nota >= 61"\nprint(consulta)',
    practice: 'Escribe consultas SQL para alumnos aprobados y promedio por curso.',
    topics: ['SELECT', 'WHERE', 'INSERT'],
  },
  {
    title: '23. Arquitectura de una app pequena',
    description: 'Una app mantenible separa entrada, logica, almacenamiento y presentacion.',
    example: 'def obtener_datos():\n    return []\n\ndef procesar(datos):\n    return datos\n\ndef mostrar(resultado):\n    print(resultado)',
    practice: 'Divide un gestor de tareas en capas: datos, logica y pantalla.',
    topics: ['Capas', 'Separacion de responsabilidades', 'Mantenibilidad'],
  },
  {
    title: '24. Seguridad basica',
    description: 'La seguridad empieza por validar datos, proteger claves y no confiar en entradas externas.',
    example: 'password = input("Clave: ")\nif len(password) < 8:\n    print("Clave debil")',
    practice: 'Valida una contrasena y evita guardar claves directamente en codigo.',
    topics: ['Validacion', 'Secretos', 'Entradas confiables'],
  },
  {
    title: '25. Preparacion de proyecto final',
    description: 'Planifica entregables, pruebas, documentacion y demostracion del proyecto final.',
    example: 'README = ["Descripcion", "Instalacion", "Uso", "Pruebas"]\nfor seccion in README:\n    print(seccion)',
    practice: 'Crea el README y checklist final para tu proyecto de Python.',
    topics: ['Documentacion', 'Checklist', 'Presentacion'],
  },
];

function getLessonModule(lessonNumber: number) {
  return Math.ceil(lessonNumber / 5);
}

export default function PythonLessons() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Lecciones de Python</h1>
            <p className="mt-4 text-xl text-gray-500">Aprende el concepto, revisa un ejemplo y completa una practica corta.</p>
          </div>

          <div className="mt-16 space-y-8">
            {lessons.map((lesson, index) => (
              <section key={lesson.title} id={`lesson-${index + 1}`} className="scroll-mt-24 rounded-lg bg-white p-8 shadow">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                    Módulo {getLessonModule(index + 1)}
                  </span>
                  <h2 className="text-2xl font-semibold text-gray-900">{lesson.title}</h2>
                </div>
                <p className="mt-3 text-gray-600">{lesson.description}</p>
                <ul className="mt-4 list-inside list-disc space-y-2 text-gray-600">
                  {lesson.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
                <pre className="mt-5 overflow-x-auto rounded-md bg-gray-950 p-4 text-sm text-green-200">
                  <code>{lesson.example}</code>
                </pre>
                <div className="mt-5 rounded-md bg-blue-50 p-4">
                  <p className="text-sm font-semibold text-blue-900">Practica sugerida</p>
                  <p className="mt-1 text-sm text-blue-800">{lesson.practice}</p>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link href={`/courses/python/lessons/${index + 1}`} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Vista individual
                  </Link>
                  <ProgressButton course="python" activity={lesson.title} />
                </div>
              </section>
            ))}
          </div>

          <PublishedContentPanel course="python" type="lesson" title="Lecciones adicionales de Python" />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
