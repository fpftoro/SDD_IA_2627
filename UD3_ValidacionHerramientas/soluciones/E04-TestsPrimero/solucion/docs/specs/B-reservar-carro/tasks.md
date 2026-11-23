# Tasks: Reservar un carro

| Campo   | Valor             |
|---------|-------------------|
| Feature | Reservar un carro |
| Plan    | plan.md           |
| Estado  | Aprobadas         |

## Grupo 1 · Tests de la feature (D-08)

- [x] T-01: Tests unitarios del servicio de reservas
  - Fichero: tests/servicio-reservas.test.js
  - Cubre: B-AC-03, B-RNF-02, B-EC-03, B-EC-04, B-EC-05
  - Terminada cuando: los tests existen y fallan porque el servicio no
    existe

- [x] T-02: Tests de la API de reservas
  - Fichero: tests/api-reservas.test.js
  - Cubre: B-RF-01, B-RF-02, B-RNF-01, B-AC-01 a B-AC-04, B-EC-01,
    B-EC-02, B-EC-03, B-EC-06, B-EC-07
  - Terminada cuando: los tests existen y fallan porque la ruta no existe

> Punto de control: revisar los tests con la spec al lado, comprobar que
> fallan por el motivo correcto y hacer commit. Desde aquí, los tests no
> se tocan sin un commit propio.

## Grupo 2 · Repositorio y servicio (D-01 a D-06)

- [x] T-03: Repositorio de reservas y ErrorConflicto
  - Ficheros: src/repositorios/repositorio-reservas.js,
    src/errores/error-conflicto.js

- [x] T-04: Servicio de reservas
  - Fichero: src/servicios/servicio-reservas.js
  - Depende de: T-01 y T-03
  - Terminada cuando: pasan los tests de T-01

> Punto de control: revisar los cambios, ejecutar los tests y hacer commit.

## Grupo 3 · API (D-07)

- [x] T-05: Controlador, ruta y aplicación
  - Ficheros: src/controladores/controlador-reservas.js,
    src/rutas/reservas.js, src/app.js
  - Depende de: T-02 y T-04
  - Terminada cuando: pasan todos los tests

> Punto de control: revisar los cambios, ejecutar los tests, comprobar con
> git diff que los tests no han cambiado y hacer commit.
