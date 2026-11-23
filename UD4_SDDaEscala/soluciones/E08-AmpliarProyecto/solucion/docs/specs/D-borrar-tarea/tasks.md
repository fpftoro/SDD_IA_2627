# Tasks: Borrar una tarea

| Campo  | Valor    |
|--------|----------|
| Plan   | plan.md  |
| Estado | Aprobadas (1.1) |

## Grupo 1 · Tests

- [x] T-01: Tests de la feature
  - Ficheros: tests/api-borrar.test.js
  - Cubre: RF-01, RF-02, AC-01, AC-02, EC-01, EC-02
  - Terminada cuando: los tests existen y fallan

## Grupo 2 · Datos y errores

- [x] T-02: eliminar en el repositorio
  - Ficheros: src/repositorios/repositorio-tareas.js
  - Cubre: D-04
  - Depende de: T-01
  - Terminada cuando: el repositorio tiene eliminar

## Grupo 3 · Servicio y API

- [x] T-03: Servicio, controlador y ruta
  - Ficheros: src/servicios/servicio-tareas.js, src/controladores/controlador-tareas.js, src/rutas/tareas.js
  - Cubre: D-01, D-02, D-03
  - Depende de: T-02
  - Terminada cuando: los tests de T-01 pasan y los anteriores siguen pasando
