# Plan: Reservar un carro

## Metadatos

| Campo   | Valor                |
|---------|----------------------|
| Feature | Reservar un carro    |
| Spec    | spec.md, versión 1.0 |
| Estado  | Aprobado             |

## Visión general

Un endpoint nuevo, POST /api/reservas, con las capas de la constitución.
Las reservas se guardan en memoria, en su propio repositorio.

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/repositorios/repositorio-reservas.js | Nuevo | guardar, obtenerTodas y vaciar (D-01) |
| src/servicios/servicio-reservas.js | Nuevo | crearReserva: validaciones en el orden de D-05 |
| src/controladores/controlador-reservas.js | Nuevo | Traduce peticiones y errores a respuestas |
| src/rutas/reservas.js | Nuevo | Ruta POST / |
| src/app.js | Modificado | Monta /api/reservas |
| src/errores/error-conflicto.js | Nuevo | ErrorConflicto (409) |
| tests/servicio-reservas.test.js | Nuevo | Tests unitarios de las validaciones |
| tests/api-reservas.test.js | Nuevo | Tests de la API |

## Decisiones técnicas

- D-01: Repositorio de reservas en memoria, exportado como objeto, con
  vaciar() para que cada test empiece sin reservas.
- D-02: Carros que existen (EC-01): los que tienen algún portátil en el
  repositorio de portátiles. El servicio de reservas lo consulta.
- D-03: Fecha de hoy (EC-03, RNF-02): Intl.DateTimeFormat con la zona
  Europe/Madrid y el formato AAAA-MM-DD.
  - Descartado: toISOString(). Da la fecha en UTC: pasada la medianoche
    en España, todavía sería ayer.
- D-04: Fecha válida (EC-05): formato AAAA-MM-DD y que exista
  (2030-02-30 no existe).
- D-05: Orden de las comprobaciones: datos que faltan (EC-06), fecha
  (EC-05), franja (EC-04), fecha pasada (EC-03), carro (EC-01) y franja
  ocupada (EC-02). Así cada error responde a lo primero que falla.
- D-06: Identificador (RNF-01): crypto.randomUUID().
- D-07: Errores: ErrorValidacion (400), ErrorNoEncontrado (404),
  ErrorConflicto (409) y cualquier otro, 500 (EC-07).
- D-08: En los tests, la fecha del sistema se fija a 2030-03-10 con
  vi.useFakeTimers({ toFake: ['Date'] }) y vi.setSystemTime, para que
  «hoy» no dependa del día en que se ejecutan.

## Estrategia de pruebas

| Spec | Cómo se comprueba | Dónde |
|------|-------------------|-------|
| B-RF-01, B-RF-02, B-AC-01 | Integración: 201 con la reserva completa | tests/api-reservas.test.js |
| B-RNF-01 | Integración: dos reservas, id distinto; el id del cuerpo se ignora | tests/api-reservas.test.js |
| B-AC-02, B-EC-02 | Integración: segunda reserva igual → 409 y mensaje | tests/api-reservas.test.js |
| B-AC-03, B-RNF-02 | Unitario e integración: la fecha de hoy se acepta; a las 23:30 UTC, en España ya es el día siguiente y la fecha UTC es pasada | Los dos ficheros |
| B-AC-04 | Integración: otra franja → 201 | tests/api-reservas.test.js |
| B-EC-01 | Integración: carro C → 404 | tests/api-reservas.test.js |
| B-EC-03 | Unitario e integración: ayer → 400 | Los dos ficheros |
| B-EC-04 | Unitario: 0, 7, 2.5 y "3" → error; 1 y 6 se aceptan | tests/servicio-reservas.test.js |
| B-EC-05 | Unitario: 12/03/2030, 2030-3-12 y 2030-02-30 → error | tests/servicio-reservas.test.js |
| B-EC-06 | Integración: cuerpo sin cada uno de los tres campos → 400 | tests/api-reservas.test.js |
| B-EC-07 | Integración: el repositorio falla → 500 | tests/api-reservas.test.js |
