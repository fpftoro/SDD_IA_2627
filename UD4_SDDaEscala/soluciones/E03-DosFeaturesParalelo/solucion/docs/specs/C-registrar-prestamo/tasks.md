# Tasks: Registrar el préstamo

| Campo | Valor |
|-------|-------|
| Plan  | plan.md |
| Estado | Aprobadas |

## Grupo 1 · Tests

- [ ] T-01: Tests del servicio y de la API
  - Ficheros: tests/servicio-prestamos.test.js, tests/api-prestamos.test.js
  - Cubre: RF-01, RF-02, RF-03, AC-01, AC-02, EC-01 a EC-06, RNF-01, RNF-02
  - Terminada cuando: los tests existen y fallan

## Grupo 2 · Repositorios

- [ ] T-02: Repositorio de préstamos y cambiarEstado
  - Ficheros: src/repositorios/repositorio-prestamos.js, src/repositorios/repositorio-portatiles.js
  - Cubre: D-03, D-04
  - Depende de: T-01
  - Terminada cuando: los tests de la feature que usan los repositorios dejan de fallar por falta de ellos

## Grupo 3 · Servicio

- [ ] T-03: Servicio registrarPrestamo
  - Ficheros: src/servicios/servicio-prestamos.js
  - Cubre: D-02, D-05, D-06
  - Depende de: T-02
  - Terminada cuando: los tests del servicio pasan

## Grupo 4 · API

- [ ] T-04: Controlador, ruta y montaje
  - Ficheros: src/controladores/controlador-prestamos.js, src/rutas/prestamos.js, src/app.js
  - Cubre: D-01
  - Depende de: T-03
  - Terminada cuando: todos los tests de la feature pasan
