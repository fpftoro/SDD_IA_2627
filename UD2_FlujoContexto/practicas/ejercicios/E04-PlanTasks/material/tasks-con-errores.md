# Tasks: Registrar la devolución de un portátil

| Campo   | Valor                                  |
|---------|----------------------------------------|
| Feature | Registrar la devolución de un portátil |
| Plan    | plan.md (aprobado)                     |
| Estado  | Aprobadas                              |

## Grupo 1 · Backend

- [ ] T-01 [P]: Implementar la devolución
  - Ficheros: src/errores/error-permiso.js,
    src/servicios/servicio-prestamos.js,
    src/controladores/controlador-prestamos.js, src/rutas/prestamos.js
  - Cubre: D-01 a D-09
  - Terminada cuando: la devolución funciona

- [ ] T-02: Registro de actividad
  - Fichero: src/servicios/registro.js
  - Cubre: RF-01
  - Depende de: T-01
  - Terminada cuando: cada devolución añade una línea con la fecha, el
    préstamo y el usuario a logs/devoluciones.log

## Grupo 2 · Tests

- [ ] T-03: Tests del servicio
  - Fichero: tests/servicio-prestamos.test.js
  - Cubre: RF-01, RF-02, RF-03, RF-04, EC-02, EC-03, EC-04, EC-06
  - Depende de: T-01
  - Terminada cuando: los tests pasan

- [ ] T-04: Tests de la API
  - Fichero: tests/api-prestamos.test.js
  - Cubre: RF-05, AC-01, AC-02, AC-03, AC-04, AC-05, EC-01
  - Depende de: T-05
  - Terminada cuando: los tests existen y fallan

## Grupo 3 · Ajustes

- [ ] T-05: Renombrar la variable ok del controlador
  - Fichero: src/controladores/controlador-prestamos.js
  - Terminada cuando: la variable se llama correcto

- [ ] T-06: Respuesta de permisos
  - Fichero: src/controladores/controlador-prestamos.js
  - Cubre: EC-05
  - Terminada cuando: el controlador responde 403 con
    { error: "No tienes permiso" }

## Grupo 4 · Ruta

- [ ] T-07: Ruta de la devolución
  - Fichero: src/rutas/prestamos.js
  - Terminada cuando: la ruta POST /api/prestamos/:id/devolucion existe
