# Tasks: Marcar una tarea como hecha

| Campo  | Valor     |
|--------|-----------|
| Plan   | plan.md   |
| Estado | Aprobadas |

## Grupo 1 · Tests

- [x] T-01: Tests de la feature
  - Ficheros: tests/api-completar.test.js
  - Cubre: RF-01 a RF-03, AC-01, AC-02, EC-01, EC-02
  - Terminada cuando: los tests existen y fallan

## Grupo 2 · Datos y errores

- [x] T-02: ErrorNoEncontrado, buscarPorId y actualizar
  - Ficheros: src/errores/error-no-encontrado.js, src/repositorios/repositorio-tareas.js
  - Cubre: D-03, D-04
  - Depende de: T-01
  - Terminada cuando: el repositorio tiene las dos funciones

## Grupo 3 · Servicio y API

- [x] T-03: Servicio, controlador y ruta
  - Ficheros: src/servicios/servicio-tareas.js, src/controladores/controlador-tareas.js, src/rutas/tareas.js
  - Cubre: D-01, D-02, D-03
  - Depende de: T-02
  - Terminada cuando: los tests de T-01 pasan y los anteriores siguen pasando
