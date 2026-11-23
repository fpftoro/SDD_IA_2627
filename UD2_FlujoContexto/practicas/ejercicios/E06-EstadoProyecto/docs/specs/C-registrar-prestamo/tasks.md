# Tasks: Registrar el préstamo

| Campo   | Valor                 |
|---------|-----------------------|
| Feature | Registrar el préstamo |
| Plan    | plan.md (aprobado)    |
| Estado  | Aprobadas             |

## Grupo 1 · Servicio (D-01, D-02, D-03)

- [x] T-01: Tests del servicio
  - Fichero: tests/servicio-prestamos.test.js
  - Cubre: RF-01 a RF-04, RNF-01, EC-02 a EC-06
  - Terminada cuando: los tests existen y fallan

- [x] T-02: Reloj, error, repositorios y servicio
  - Ficheros: src/utilidades/reloj.js, src/errores/error-conflicto.js,
    src/repositorios/repositorio-portatiles.js,
    src/repositorios/repositorio-prestamos.js,
    src/servicios/servicio-prestamos.js
  - Depende de: T-01
  - Terminada cuando: los tests de T-01 pasan

> Punto de control: revisar los cambios, ejecutar los tests y hacer commit.

## Grupo 2 · API (D-01)

- [x] T-03: Tests de la API
  - Fichero: tests/api-prestamos.test.js
  - Cubre: RF-01, RF-03, RNF-02, AC-01 a AC-03, EC-01 a EC-06
  - Depende de: T-02
  - Terminada cuando: los tests existen y fallan

- [x] T-04: Controlador, ruta y montaje
  - Ficheros: src/controladores/controlador-prestamos.js,
    src/rutas/prestamos.js, src/app.js
  - Depende de: T-03
  - Terminada cuando: todos los tests pasan

> Punto de control: revisar los cambios, ejecutar los tests y hacer commit.
