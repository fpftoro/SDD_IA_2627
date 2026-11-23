# Tasks: Consultar los portátiles

| Campo   | Valor                    |
|---------|--------------------------|
| Feature | Consultar los portátiles |
| Plan    | plan.md (aprobado)       |
| Estado  | Aprobadas                |

## Grupo 1 · Servicio (D-01, D-02, D-03, D-05)

- [x] T-01: Tests del servicio
  - Ficheros: package.json (Vitest y el script test), .gitignore
    (node_modules/), tests/servicio-portatiles.test.js
  - Cubre: RF-01, RF-02, RF-03, EC-01, EC-02, EC-03
  - Terminada cuando: los tests existen y fallan, porque el servicio aún
    no existe

- [x] T-02: Errores, repositorio y servicio
  - Ficheros: src/errores/error-validacion.js,
    src/errores/error-no-encontrado.js,
    src/repositorios/repositorio-portatiles.js,
    src/servicios/servicio-portatiles.js
  - Depende de: T-01
  - Terminada cuando: los tests de T-01 pasan

> Punto de control: revisar los cambios, ejecutar los tests y hacer commit.

## Grupo 2 · API (D-04, D-06)

- [x] T-03: Tests de la API
  - Ficheros: package.json (Express y supertest),
    tests/api-portatiles.test.js
  - Cubre: RF-01 a RF-03, AC-01 a AC-03, EC-01 a EC-05, RNF-01
  - Depende de: T-02
  - Terminada cuando: los tests existen y fallan, porque la aplicación
    aún no existe

- [x] T-04: Controlador, rutas, aplicación y servidor
  - Ficheros: src/controladores/controlador-portatiles.js,
    src/rutas/portatiles.js, src/app.js, src/servidor.js
  - Depende de: T-03
  - Terminada cuando: todos los tests pasan y GET /api/portatiles
    responde con el servidor arrancado

> Punto de control: revisar los cambios, ejecutar los tests y hacer commit.
