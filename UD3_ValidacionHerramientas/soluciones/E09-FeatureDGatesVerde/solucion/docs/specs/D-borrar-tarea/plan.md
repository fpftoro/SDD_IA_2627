# Plan: Borrar una tarea

## Metadatos

| Campo   | Valor                |
|---------|----------------------|
| Feature | Borrar una tarea     |
| Spec    | spec.md, versión 1.0 |
| Estado  | Aprobado             |

## Visión general

Un endpoint nuevo, DELETE /tareas/:id, y un botón «Borrar» en cada
tarea de la página. Reutiliza el repositorio, el servicio y la página de
A y B.

## Comprobación de la constitución

- [x] Capas: el controlador llama al servicio; solo el repositorio toca
  el array.
- [x] Respuestas JSON en los errores; 204 sin cuerpo en el borrado.
- [x] Tests antes que el código, en el grupo 1.
- [x] Sin dependencias nuevas.

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/errores/error-no-encontrado.js | Nuevo | ErrorNoEncontrado (404) |
| src/repositorios/repositorio-tareas.js | Modificado | borrar(id), que dice si existía |
| src/servicios/servicio-tareas.js | Modificado | borrarTarea(id) |
| src/controladores/controlador-tareas.js | Modificado | borrarTareaHttp |
| src/rutas/tareas.js | Modificado | Ruta DELETE /:id |
| public/app.js | Modificado | Botón «Borrar» en cada tarea y su petición |
| tests/repositorio-tareas.test.js, tests/api-tareas.test.js | Modificados | Tests de D |
| e2e/borrar-tarea.e2e.js | Nuevo | Pruebas de la página de D |
| e2e/lista-tareas.e2e.js | Modificado | Las aserciones de texto de las tareas (D-06) |
| playwright.config.js | Modificado | workers: 1 (D-07) |

## Decisiones técnicas

- D-01: El repositorio añade borrar(id), que devuelve si la tarea
  existía.
  - Descartado: que el servicio lea todas las tareas para comprobarlo.
    Recorre la lista dos veces.
- D-02: El servicio lanza ErrorNoEncontrado si no existe (EC-01); el
  controlador responde 404 y, ante cualquier otro error, 500 (EC-02).
- D-03: 204 con res.status(204).end(), sin cuerpo (RF-02).
- D-04: Página: mostrarTarea pone el texto en un span y, después, un
  botón «Borrar». Si la respuesta es correcta, se quita el elemento y, si
  la lista queda vacía, se muestra el mensaje de B (AC-03). Si no, el
  error va al párrafo de errores de A (EC-03).
- D-05: Un id que no existe es un 404, no un 400: el id lo genera el
  servidor y no tiene un formato que el cliente deba conocer.
- D-06: Con el botón, el texto de cada elemento de la lista ya no es
  solo «texto (estado)». Las aserciones de texto de las pruebas de la
  página de A y B pasan a comprobar el principio del texto con una
  expresión regular. Cambia la forma de comprobar, no lo que se
  comprueba: lo hace una persona, en el commit de los tests.
- D-07: Las pruebas de Playwright comparten un servidor con las tareas en
  memoria: se ejecutan de una en una (workers: 1) y cada prueba de D deja
  la lista sin las tareas que ha creado.

## Estrategia de pruebas

| Spec | Cómo se comprueba | Dónde |
|------|-------------------|-------|
| D-RF-01, D-RF-02, D-AC-01 | Integración: 204 sin cuerpo y la tarea ya no está en GET /tareas | tests/api-tareas.test.js |
| D-EC-01 | Integración: id que no existe → 404 y el mensaje; no se borra nada | tests/api-tareas.test.js |
| D-EC-02 | Integración: el repositorio falla → 500, el mensaje y la tarea sigue | tests/api-tareas.test.js |
| D-RNF-01 | Integración: 1.000 tareas, menos de 200 ms | tests/api-tareas.test.js |
| D-RF-03, D-RF-04, D-AC-02, D-AC-03 | E2E: recorrido de borrar | e2e/borrar-tarea.e2e.js |
| D-EC-03 | Página con la respuesta simulada | e2e/borrar-tarea.e2e.js |
| D-01 | Unitario: borrar() dice si existía | tests/repositorio-tareas.test.js |
