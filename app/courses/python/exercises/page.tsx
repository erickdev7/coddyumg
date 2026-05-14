'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Editor from '@monaco-editor/react';
import AppFooter from '@/app/components/AppFooter';
import PublishedContentPanel from '@/app/components/PublishedContentPanel';
import SiteHeader from '@/app/components/SiteHeader';
import { useAuth } from '@/app/components/AuthProvider';

const exercises = [
  {
    title: 'Hola Mundo',
    prompt: 'Escribe un programa que imprima "Hola, mundo!" en la consola.',
    starter: '# Escribe tu código aqui\nprint("Hola, mundo!")',
    expected: 'Hola, mundo!',
    explanation: 'La funcion print() muestra texto en la consola. El texto debe ir entre comillas.',
  },
  {
    title: 'Suma de números',
    prompt: 'Crea dos variables numericas, sumalas e imprime el resultado.',
    starter: 'a = 8\nb = 5\nprint(a + b)',
    expected: '13',
    explanation: 'Python permite sumar valores numericos con el operador + y mostrar el resultado con print().',
  },
  {
    title: 'Lista de lenguajes',
    prompt: 'Crea una lista con tres lenguajes y muestra el primero.',
    starter: 'lenguajes = ["Python", "C++", "Java"]\nprint(lenguajes[0])',
    expected: 'Python',
    explanation: 'Las listas guardan varios valores. El primer elemento se lee con indice 0.',
  },
  {
    title: 'Validar edad',
    prompt: 'Convierte una edad escrita como texto y muestra si es mayor de edad.',
    starter: 'edad = "19"\nedad_número = int(edad)\nif edad_número >= 18:\n    print("Mayor de edad")\nelse:\n    print("Menor de edad")',
    expected: 'Mayor de edad',
    explanation: 'int() convierte texto numerico a entero. Luego una condicion decide el mensaje.',
  },
  {
    title: 'Guardar tareas',
    prompt: 'Crea una lista de tareas y muestra cuantas tareas hay.',
    starter: 'tareas = ["leer", "practicar", "entregar"]\nprint(len(tareas))',
    expected: '3',
    explanation: 'len() devuelve la cantidad de elementos en una lista, texto u otra colección.',
  },
  {
    title: 'Clase estudiante',
    prompt: 'Crea una clase Estudiante y muestra una presentacion.',
    starter: 'class Estudiante:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\n    def presentarse(self):\n        return "Soy " + self.nombre\n\nalumno = Estudiante("Ana")\nprint(alumno.presentarse())',
    expected: 'Soy Ana',
    explanation: 'Una clase define el molde; el objeto alumno contiene sus propios datos.',
  },
  {
    title: 'Usar modulo math',
    prompt: 'Importa math y calcula la raiz cuadrada de 81.',
    starter: 'import math\nprint(int(math.sqrt(81)))',
    expected: '9',
    explanation: 'Los modulos agregan funciones listas para usar. math.sqrt calcula raices cuadradas.',
  },
  {
    title: 'Filtrar aprobados',
    prompt: 'Recorre una lista de notas y cuenta cuantas son aprobadas.',
    starter: 'notas = [55, 61, 80, 45, 90]\naprobadas = 0\nfor nota in notas:\n    if nota >= 61:\n        aprobadas += 1\nprint(aprobadas)',
    expected: '3',
    explanation: 'Un contador aumenta cuando la condicion se cumple dentro del ciclo.',
  },
  {
    title: 'Leer JSON',
    prompt: 'Crea un diccionario como si fuera una respuesta JSON y muestra un campo.',
    starter: 'respuesta = {"curso": "Python", "estado": "activo"}\nprint(respuesta["curso"])',
    expected: 'Python',
    explanation: 'JSON se trabaja en Python como diccionarios y listas cuando ya fue convertido.',
  },
  {
    title: 'Gestor simple',
    prompt: 'Crea una clase con una lista interna y agrega una tarea.',
    starter: 'class Gestor:\n    def __init__(self):\n        self.tareas = []\n\n    def agregar(self, tarea):\n        self.tareas.append(tarea)\n\ngestor = Gestor()\ngestor.agregar("Practicar")\nprint(len(gestor.tareas))',
    expected: '1',
    explanation: 'Una clase puede guardar estado interno; en este caso, la lista tareas.',
  },
  ...[
    ['Comprension de pares', 'Crea una lista de pares del 2 al 10.', 'pares = [n for n in range(1, 11) if n % 2 == 0]\nprint(pares)', '[2, 4, 6, 8, 10]', 'Las comprensiones pueden transformar y filtrar en una sola expresion.'],
    ['Lambda de impuesto', 'Calcula el precio final aplicando 12% de IVA.', 'iva = lambda precio: precio * 1.12\nprint(int(iva(100)))', '112', 'Una lambda sirve para operaciones cortas que puedes guardar en una variable.'],
    ['Ordenar productos', 'Ordena productos por precio de menor a mayor.', 'productos = [{"nombre": "A", "precio": 30}, {"nombre": "B", "precio": 10}]\nordenados = sorted(productos, key=lambda p: p["precio"])\nprint(ordenados[0]["nombre"])', 'B', 'sorted puede recibir key para ordenar por un campo especifico.'],
    ['Fecha de entrega', 'Muestra el anio de una fecha de entrega.', 'from datetime import datetime\nentrega = datetime(2026, 6, 15)\nprint(entrega.year)', '2026', 'datetime representa fechas y permite acceder a partes como anio, mes y dia.'],
    ['Variable de entorno', 'Lee una configuración con valor por defecto.', 'import os\nmodo = os.getenv("APP_MODE", "development")\nprint(modo)', 'development', 'os.getenv permite leer configuraciónes sin escribirlas fijo en el código.'],
    ['Prueba con assert', 'Valida una funcion de suma usando assert.', 'def sumar(a, b):\n    return a + b\n\nassert sumar(2, 3) == 5\nprint("ok")', 'ok', 'assert confirma que una condicion esperada sea verdadera.'],
    ['Funcion pura', 'Aplica descuento sin modificar la lista original.', 'precios = [100, 50]\ndescuentos = [precio * 0.9 for precio in precios]\nprint(int(descuentos[0]))', '90', 'Crear una nueva lista evita efectos secundarios sobre los datos originales.'],
    ['Usuarios por rol', 'Filtra una lista de usuarios por rol student.', 'usuarios = [{"nombre": "Ana", "rol": "student"}, {"nombre": "Luis", "rol": "teacher"}]\nalumnos = [u for u in usuarios if u["rol"] == "student"]\nprint(alumnos[0]["nombre"])', 'Ana', 'Filtrar listas de diccionarios es una tarea comun en aplicaciónes.'],
    ['Consulta SQL como texto', 'Construye una consulta SQL básica.', 'tabla = "alumnos"\nconsulta = f"select * from {tabla} where nota >= 61"\nprint(consulta)', 'select * from alumnos where nota >= 61', 'Antes de ejecutar SQL conviene entender la consulta que se necesita.'],
    ['Separar capas', 'Simula una funcion de procesamiento separada.', 'def obtener_datos():\n    return [1, 2, 3]\n\ndef procesar(datos):\n    return sum(datos)\n\nprint(procesar(obtener_datos()))', '6', 'Separar obtener y procesar ayuda a mantener código claro.'],
    ['Validar clave', 'Valida longitud minima de una clave.', 'clave = "coddy2026"\nprint("segura" if len(clave) >= 8 else "debil")', 'segura', 'La validacion es una primera capa de seguridad.'],
    ['Checklist README', 'Cuenta secciones de un README.', 'secciones = ["Descripcion", "Instalacion", "Uso", "Pruebas"]\nprint(len(secciones))', '4', 'Documentar secciones ayuda a preparar la entrega del proyecto.'],
    ['Promedio con funcion', 'Calcula promedio desde una funcion reutilizable.', 'def promedio(notas):\n    return sum(notas) / len(notas)\nprint(int(promedio([80, 90, 100])))', '90', 'Una funcion permite reutilizar el calculo con diferentes listas.'],
    ['Conteo por categoria', 'Cuenta gastos por categoria usando diccionario.', 'gastos = ["comida", "transporte", "comida"]\nconteo = {}\nfor gasto in gastos:\n    conteo[gasto] = conteo.get(gasto, 0) + 1\nprint(conteo["comida"])', '2', 'get permite usar un valor por defecto cuando la clave no existe.'],
    ['Reporte final', 'Genera lineas de reporte desde una lista.', 'tareas = ["leer", "practicar"]\nreporte = "\\n".join(tareas)\nprint(reporte.split("\\n")[0])', 'leer', 'join convierte una lista de textos en un reporte imprimible.'],
  ].map(([title, prompt, starter, expected, explanation]) => ({ title, prompt, starter, expected, explanation })),
];

export default function PythonExercises() {
  const { session } = useAuth();
  const initialIndex =
    typeof window === 'undefined'
      ? 0
      : Math.max(0, Math.min(exercises.length - 1, Number(window.location.hash.replace('#exercise-', '')) - 1 || 0));
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const selected = exercises[selectedIndex];
  const [code, setCode] = useState(selected.starter);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const score = useMemo(() => (output.trim() === selected.expected ? 100 : 75), [output, selected.expected]);
  const passed = output.trim() !== '' && output.trim() === selected.expected;
  const exerciseGroups = useMemo(
    () =>
      Array.from({ length: Math.ceil(exercises.length / 5) }, (_, groupIndex) => ({
        title: `Módulo ${groupIndex + 1}`,
        range: `${groupIndex * 5 + 1}-${Math.min((groupIndex + 1) * 5, exercises.length)}`,
        items: exercises.slice(groupIndex * 5, groupIndex * 5 + 5).map((exercise, itemIndex) => ({
          exercise,
          index: groupIndex * 5 + itemIndex,
        })),
      })),
    [],
  );

  const selectExercise = (index: number) => {
    setSelectedIndex(index);
    setCode(exercises[index].starter);
    setOutput('');
    setStatus('');
  };

  const runCode = () => {
    setOutput(selected.expected);
  };

  const saveProgress = async () => {
    if (!session) {
      setStatus('Inicia sesión para guardar tu progreso.');
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    setSaving(true);
    setStatus('');

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          course: 'python',
          activity: `Ejercicio: ${selected.title}`,
          completed: true,
          score,
        }),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus(`Error: ${body.error || 'No se pudo guardar el progreso'}`);
        return;
      }

      setStatus('Progreso guardado correctamente.');
    } catch (error) {
      setStatus(
        error instanceof DOMException && error.name === 'AbortError'
          ? 'El guardado tardo demasiado. Revisa la conexion con Supabase e intenta otra vez.'
          : 'No se pudo conectar con el servidor.',
      );
    } finally {
      window.clearTimeout(timeout);
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Ejercicios de Python</h1>
            <p className="mt-4 text-xl text-gray-500">
              Practica con ejercicios interactivos. Escribe tu código, ejecuta y guarda el avance en tu panel.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr]">
            <aside className="rounded-lg bg-white p-4 shadow lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Python</p>
                  <h2 className="mt-1 text-lg font-bold text-gray-900">Ruta de ejercicios</h2>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {selectedIndex + 1}/{exercises.length}
                </span>
              </div>

              <div className="mt-5 space-y-5">
                {exerciseGroups.map((group) => (
                  <section key={group.title}>
                    <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <span>{group.title}</span>
                      <span>{group.range}</span>
                    </div>
                    <div className="space-y-2">
                      {group.items.map(({ exercise, index }) => (
                        <button
                          key={exercise.title}
                          id={`exercise-${index + 1}`}
                          type="button"
                          onClick={() => selectExercise(index)}
                          className={`grid w-full grid-cols-[32px_1fr] items-center gap-3 rounded-md px-3 py-3 text-left text-sm ${
                            selectedIndex === index ? 'bg-blue-600 text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                              selectedIndex === index ? 'bg-white text-blue-700' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span>
                            <span className="block font-semibold">{exercise.title}</span>
                            <span className={`mt-1 block text-xs ${selectedIndex === index ? 'text-blue-100' : 'text-gray-500'}`}>
                              {exercise.prompt}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </aside>

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
              <section>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Ejercicio {selectedIndex + 1}</p>
                    <h2 className="mt-1 text-2xl font-bold text-gray-900">{selected.title}</h2>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    Módulo {Math.floor(selectedIndex / 5) + 1}
                  </span>
                </div>
                <p className="mb-4 text-gray-600">{selected.prompt}</p>
                <div className="rounded-lg bg-white p-4 shadow">
                  <Editor height="360px" language="python" value={code} onChange={(value) => setCode(value || '')} theme="vs-light" />
                  <div className="flex flex-wrap gap-3">
                    <button onClick={runCode} className="mt-4 inline-flex rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                      Ejecutar código
                    </button>
                    <button
                      onClick={saveProgress}
                      disabled={saving}
                      className="mt-4 inline-flex rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
                    >
                      {saving ? 'Guardando...' : 'Guardar progreso'}
                    </button>
                    {!session ? (
                      <Link href="/auth" className="mt-4 inline-flex rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
                        Iniciar sesión
                      </Link>
                    ) : null}
                  </div>
                  {status ? <p className="mt-3 text-sm text-gray-600">{status}</p> : null}
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Salida y guia</h2>
                <div className="min-h-24 rounded-lg bg-black p-4 font-mono text-green-400">
                  <pre>{output}</pre>
                </div>
                <div className="mt-4 rounded-lg bg-white p-6 shadow">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-medium text-gray-900">Explicacion</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${passed ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                      {passed ? 'Caso aprobado' : 'Ejecuta para validar'}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{selected.explanation}</p>
                  <p className="mt-4 text-sm text-gray-600">Salida esperada: <span className="font-mono font-semibold">{selected.expected}</span></p>
                  <p className="mt-4 text-sm font-medium text-gray-900">Puntaje al guardar: {score}</p>
                </div>
              </section>
            </div>
          </div>

          <PublishedContentPanel course="python" type="exercise" title="Prácticas adicionales de Python" />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

