# Plan: Ver la lista de tareas

## Metadatos

| Campo   | Valor                  |
|---------|------------------------|
| Feature | Ver la lista de tareas |
| Spec    | spec.md, versión 1.1   |
| Estado  | Aprobado               |
| Fecha   | AAAA-MM-DD             |
| Autor   | <nombre>               |

## Visión general

La feature añade GET /tareas y hace que la página cargue la lista al
abrirse. Reutiliza el repositorio y el servicio de la feature A, y el
párrafo de errores de su página.

## Contexto técnico

El de la sección Tecnología de la constitución. Datos en memoria, en el
repositorio de la feature A.

## Comprobación de la constitución

- [x] Capas controladores → servicios → repositorios (D-02, D-03).
- [x] Respuestas JSON y errores { error: "mensaje" } en español (D-03).
- [x] Sin dependencias nuevas.
- [x] Tests antes que el código, y cada identificador con su test o su
  comprobación a mano (estrategia de pruebas).

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/repositorios/repositorio-tareas.js | Modificado | vaciar(), para que los tests empiecen sin tareas |
| src/servicios/servicio-tareas.js | Modificado | listarTareas() |
| src/controladores/controlador-tareas.js | Modificado | listarTareasHttp |
| src/rutas/tareas.js | Modificado | Ruta GET / |
| public/index.html | Modificado | Mensaje «Todavía no hay tareas» |
| public/app.js | Modificado | Cargar la lista al abrir la página |
| tests/repositorio-tareas.test.js | Modificado | Test de vaciar() |
| tests/api-tareas.test.js | Modificado | Tests de integración de GET /tareas |

## Decisiones técnicas

- D-01: Orden (RF-01). La lista sale de repositorioTareas.obtenerTodas(),
  que devuelve las tareas en el orden en que se guardaron.
- D-02: listarTareas() en el servicio de tareas.
- D-03: Ruta GET / en src/rutas/tareas.js. El controlador responde 200 con
  la lista y, ante cualquier error, 500 con el mensaje de EC-02.
- D-04: Página (RF-02, RF-03, EC-03, EC-04). Al cargarse, pide
  GET /tareas y muestra cada tarea con mostrarTarea. El mensaje «Todavía
  no hay tareas» es un párrafo fuera de la lista. Los errores, en el
  párrafo de errores de la feature A.
  - Descartado: el mensaje como un elemento más de la lista. La lista
    tendría un elemento que no es una tarea.
- D-05: Tests independientes. El repositorio añade vaciar(), y los tests
  de GET /tareas lo llaman antes de cada test.

## Dependencias

Ninguna.

## Secuencia de implementación

1. Tests de vaciar() y de GET /tareas (D-05, D-03).
2. vaciar(), listarTareas(), el controlador y la ruta (D-01 a D-03, D-05).
3. La página (D-04), con su comprobación a mano.

## Estrategia de pruebas

| Spec | Cómo se comprueba | Dónde |
|------|-------------------|-------|
| RF-01, AC-03 | Integración: 200 con las tareas creadas, en ese orden | tests/api-tareas.test.js |
| EC-01 | Integración: sin tareas, 200 y [] | tests/api-tareas.test.js |
| EC-02 | Integración: el repositorio falla, 500 y el mensaje | tests/api-tareas.test.js |
| RNF-01 | Integración: con 1.000 tareas, menos de 200 ms | tests/api-tareas.test.js |
| RF-02, RF-03, AC-01, AC-02, AC-04, EC-03, EC-04 | A mano en el navegador | Lista de comprobación de la task de la página |
| D-05 | Unitario: vaciar() deja el repositorio sin tareas | tests/repositorio-tareas.test.js |

## Riesgos y dudas

- Las tareas se pierden al reiniciar el servidor (decisión de la feature
  A).
