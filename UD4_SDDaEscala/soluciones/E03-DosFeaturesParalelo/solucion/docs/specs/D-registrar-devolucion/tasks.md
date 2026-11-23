# Tasks: Registrar la devolución

| Campo | Valor |
|-------|-------|
| Plan  | plan.md |
| Estado | Borrador (1.1) |

## Grupo 1 · Tests

- [ ] T-01: Tests del servicio y de la API
  - Ficheros: tests/servicio-prestamos.test.js, tests/api-devolucion.test.js
  - Cubre: RF-01 a RF-03, AC-01, AC-02, EC-01 a EC-06, RNF-01
  - Terminada cuando: los tests existen y fallan

## Grupo 2 · Repositorios

- [ ] T-02: marcarDevuelto en el repositorio de préstamos
  - Ficheros: src/repositorios/repositorio-prestamos.js
  - Cubre: D-03
  - Depende de: T-01
  - Terminada cuando: los tests que usan los repositorios dejan de fallar por falta de ellos

## Grupo 3 · Servicio

- [ ] T-03: Servicio registrarDevolucion
  - Ficheros: src/servicios/servicio-prestamos.js
  - Cubre: D-02, D-04, D-05
  - Depende de: T-02
  - Terminada cuando: los tests del servicio pasan

## Grupo 4 · API

- [ ] T-04: Controlador, ruta y montaje
  - Ficheros: src/controladores/controlador-prestamos.js, src/rutas/prestamos.js
  - Cubre: D-01
  - Depende de: T-03
  - Terminada cuando: todos los tests de la feature pasan
