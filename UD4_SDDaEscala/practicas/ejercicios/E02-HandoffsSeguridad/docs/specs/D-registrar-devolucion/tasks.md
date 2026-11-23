# Tasks · D · Registrar la devolución

| Campo | Valor |
|-------|-------|
| Plan | plan.md |
| Estado | Aprobadas |

## Grupo 1 · Tests

- [ ] T-01: Tests de la devolución
  - Ficheros: tests/servicio-prestamos.test.js, tests/prestamos.test.js
  - Cubre: RF-01, RF-02, RF-03, EC-01, EC-03
  - Terminada cuando: los tests existen y fallan

## Grupo 2 · Servicio y repositorio

- [ ] T-02: Repositorio de préstamos
  - Ficheros: src/repositorios/repositorio-prestamos.js
  - Cubre: D-03
  - Depende de: T-01
  - Terminada cuando: los tests del repositorio pasan

- [ ] T-03: Servicio de devolución
  - Ficheros: src/servicios/servicio-prestamos.js
  - Cubre: D-02, D-04
  - Depende de: T-02
  - Terminada cuando: los tests del servicio pasan

## Grupo 3 · API

- [ ] T-04: Ruta y controlador
  - Ficheros: src/rutas/prestamos.js, src/controladores/controlador-prestamos.js
  - Cubre: D-01
  - Depende de: T-03
  - Terminada cuando: los tests de integración pasan
