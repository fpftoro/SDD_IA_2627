# Tasks: Borrar una tarea

| Campo   | Valor            |
|---------|------------------|
| Feature | Borrar una tarea |
| Plan    | plan.md          |
| Estado  | Aprobadas        |

## Grupo 1 · Tests de la feature (D-06, D-07)

- [x] T-01: Test unitario de borrar() (tests/repositorio-tareas.test.js)
- [x] T-02: Tests de la API (tests/api-tareas.test.js)
- [x] T-03: Pruebas de la página (e2e/borrar-tarea.e2e.js), aserciones de
  texto de e2e/lista-tareas.e2e.js y workers: 1 en playwright.config.js

> Punto de control: revisar con la spec al lado, comprobar el rojo y
> hacer commit.

## Grupo 2 · API (D-01, D-02, D-03, D-05)

- [x] T-04: borrar() en el repositorio, ErrorNoEncontrado y borrarTarea()
- [x] T-05: Controlador y ruta DELETE /:id

## Grupo 3 · Página (D-04)

- [x] T-06: Botón «Borrar» en public/app.js
