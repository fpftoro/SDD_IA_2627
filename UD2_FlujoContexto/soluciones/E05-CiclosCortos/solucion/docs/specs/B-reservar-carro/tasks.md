# Tasks: Reservar un carro

| Campo   | Valor              |
|---------|--------------------|
| Feature | Reservar un carro  |
| Plan    | plan.md (aprobado) |
| Estado  | Aprobadas          |

## Grupo 1 · Reloj (D-04, D-05)

- [x] T-01: Tests del reloj
  - Fichero: tests/reloj.test.js
  - Cubre: RNF-04
  - Terminada cuando: el test existe y falla, porque el reloj aún no
    existe

- [x] T-02: Reloj
  - Fichero: src/utilidades/reloj.js
  - Cubre: D-04, D-05
  - Depende de: T-01
  - Terminada cuando: el test de T-01 pasa

> Punto de control: revisar los cambios, ejecutar los tests y hacer commit.

## Grupo 2 · Servicio (D-02, D-03, D-04, D-06, D-07, D-09, D-10, D-11)

- [x] T-03: Tests del servicio
  - Fichero: tests/servicio-reservas.test.js
  - Cubre: RF-01, RF-02, RF-03 (con el orden de la spec 1.1), RF-04,
    AC-04, AC-05, RNF-03, EC-02 a EC-10, EC-13, EC-16
  - Depende de: T-02
  - Terminada cuando: los tests existen y fallan, porque el servicio aún
    no existe; fijan hoy en el lunes 2027-03-01 sustituyendo reloj.hoy()

- [x] T-04: Error de conflicto, repositorio y servicio
  - Ficheros: src/errores/error-conflicto.js,
    src/repositorios/repositorio-reservas.js,
    src/servicios/servicio-reservas.js
  - Cubre: D-02, D-03, D-04, D-06, D-07, D-09, D-10, D-11
  - Depende de: T-03
  - Terminada cuando: los tests de T-03 pasan y los anteriores siguen en
    verde
  - Tres ficheros: el error y el repositorio son de pocas líneas, solo los
    usa el servicio y sus tests son los del servicio.

> Punto de control: revisar los cambios, ejecutar los tests y hacer commit.

## Grupo 3 · API (D-01, D-08, D-09)

- [x] T-05: Tests de la API
  - Fichero: tests/api-reservas.test.js
  - Cubre: RF-01, RF-02, RF-03, AC-01, AC-02, AC-03, AC-05, RNF-01,
    RNF-02, EC-01, EC-02, EC-03, EC-04, EC-10, EC-11, EC-12, EC-13, EC-14,
    EC-15
  - Depende de: T-04
  - Terminada cuando: los tests existen y fallan, porque la ruta aún no
    existe

- [x] T-06: Controlador, rutas y montaje en la aplicación
  - Ficheros: src/controladores/controlador-reservas.js,
    src/rutas/reservas.js, src/app.js
  - Cubre: D-01, D-08, D-09
  - Depende de: T-05
  - Terminada cuando: todos los tests pasan y POST /api/reservas responde
    con el servidor arrancado
  - Tres ficheros: es el «cableado» de la capa HTTP, que no tiene sentido
    por separado.

> Punto de control: revisar los cambios, ejecutar los tests y hacer commit.
