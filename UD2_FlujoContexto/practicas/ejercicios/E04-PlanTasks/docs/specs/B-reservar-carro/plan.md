# Plan: Reservar un carro

## Metadatos

| Campo   | Valor                |
|---------|----------------------|
| Feature | Reservar un carro    |
| Spec    | spec.md, versión 1.0 |
| Estado  | Aprobado             |
| Fecha   | AAAA-MM-DD           |
| Autor   | <nombre>             |

## Visión general

La feature añade a la API dos endpoints: POST /api/reservas, para crear
una reserva, y GET /api/reservas, para consultar las de un día. Sigue las
capas de la feature A y reutiliza el middleware usuario-actual y los
errores que ya existen. Se construye de dentro afuera: el reloj y el
repositorio, el servicio con todas las comprobaciones y, al final, la
capa HTTP.

## Contexto técnico

El de la sección Tecnología de la constitución: Node.js con módulos ES,
Express 5, Vitest y supertest. Datos en memoria (D-07). Sin dependencias
nuevas: las fechas se resuelven con Date e Intl, que vienen con Node.

## Comprobación de la constitución

- [x] Capas rutas → controladores → servicios → repositorios; todas las
  comprobaciones, en el servicio (D-02).
- [x] Respuestas JSON y errores { error: "mensaje" } en español (D-02,
  D-08).
- [x] Rutas bajo /api/ y en español: /api/reservas.
- [x] Las reservas no se borran: esta feature solo las crea y las lee.
- [x] Fechas en ISO 8601: el día se guarda y se devuelve como AAAA-MM-DD
  (D-04).
- [x] Sin datos personales del alumnado: la reserva guarda el
  identificador del profesor, no del alumnado.
- [x] Datos en memoria, en el repositorio (D-07).
- [x] Sin dependencias nuevas (D-04).
- [x] Tests antes que el código, y una fila de pruebas por identificador.

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/utilidades/reloj.js | Nuevo | hoy(): la fecha de hoy en Europe/Madrid, como AAAA-MM-DD |
| src/errores/error-conflicto.js | Nuevo | Clase ErrorConflicto (409) |
| src/repositorios/repositorio-reservas.js | Nuevo | Reservas en memoria: guardar, buscar, obtenerPorDia y vaciar |
| src/servicios/servicio-reservas.js | Nuevo | crearReserva y listarReservasDelDia, con todas las comprobaciones |
| src/controladores/controlador-reservas.js | Nuevo | Traduce la petición al servicio y los errores a respuestas |
| src/rutas/reservas.js | Nuevo | POST / y GET /, las dos con el middleware usuario-actual |
| src/app.js | Modificado | Monta las rutas en /api/reservas |
| tests/reloj.test.js | Nuevo | Test unitario de reloj.hoy() |
| tests/servicio-reservas.test.js | Nuevo | Tests unitarios del servicio |
| tests/api-reservas.test.js | Nuevo | Tests de integración de la API, con supertest |

## Decisiones técnicas

- D-01: Identificación (EC-01, RNF-02). Las dos rutas usan el middleware
  usuarioActual, que ya responde 401 con el mensaje de la spec. El
  profesor de la reserva es peticion.usuario.id.
  - Descartado: leer el profesor del cuerpo. Lo prohíbe RNF-02.
- D-02: Comprobaciones (EC-02 a EC-10, EC-16). Todas en el servicio, en
  el orden de la lista de *edge cases*, para que gane la primera que se
  incumple. Lanza ErrorValidacion (400), ErrorNoEncontrado (404) o
  ErrorConflicto (409) con el mensaje exacto de la spec.
  - Descartado: validar el cuerpo en el controlador. Pone lógica de
    negocio en la capa HTTP.
- D-03: Carros (EC-04). Una constante con A, B y C en el servicio.
  - Descartado: sacarlos de los portátiles de la feature A. La spec fija
    los tres carros, y en los datos de A el carro C no tiene portátiles.
- D-04: Fechas (EC-03, EC-06 a EC-09, RNF-03, RNF-04). El día se valida
  con el patrón AAAA-MM-DD; es una fecha real si, al crearla en UTC,
  conserva el mismo año, mes y día; el día de la semana sale de esa
  fecha en UTC. «Hoy» lo da reloj.hoy(), con Intl.DateTimeFormat en la
  zona Europe/Madrid. Los días se comparan como texto AAAA-MM-DD, y el
  límite de 14 días se calcula sumando días a hoy en UTC.
  - Descartado: una librería de fechas (dayjs, date-fns). Date e Intl
    bastan y la constitución no deja añadir dependencias sin acordarlo.
- D-05: Reloj sustituible (EC-08, EC-09, AC-01 a AC-05). reloj.hoy() vive
  en un módulo propio, exportado como objeto, para que los tests fijen el
  día de hoy en 2027-03-01 con vi.spyOn.
- D-06: Carro ocupado (EC-10, AC-02, RF-04). Antes de guardar, el
  servicio busca una reserva con el mismo carro, día y hora. El profesor
  no cuenta: el mismo profesor puede tener dos carros a la misma hora.
- D-07: Almacenamiento (RF-01, EC-12). Un array en memoria en el
  repositorio, exportado como objeto para que los tests puedan provocar
  un fallo, y con una función vaciar() para que cada test empiece sin
  reservas. Guardar es una sola operación (añadir al array), así que no
  queda ninguna reserva a medias si falla.
  - Descartado: un fichero JSON. Ninguna spec pide todavía que los datos
    sobrevivan a un reinicio.
- D-08: Errores inesperados (EC-12, EC-15). El controlador responde 500
  con «No se ha podido guardar la reserva» en POST y con «No se han podido
  consultar las reservas» en GET.
- D-09: Campos (RF-02, EC-11). El controlador pasa al servicio solo
  carro, dia y hora; la reserva se construye con id, carro, dia, hora y
  profesor, sin nada más.
- D-10: Identificador (RF-01). crypto.randomUUID(), en el servicio.
  - Descartado: un contador. Obliga a guardar el último número usado y
    no aporta nada a la spec.
- D-11: Consulta (RF-03, EC-13, EC-14). El servicio comprueba el
  formato del día y pide al repositorio las reservas de ese día.

## Dependencias

Ninguna.

## Secuencia de implementación

1. Tests unitarios del servicio (todas las filas «Unitario» de la
   estrategia de pruebas).
2. Reloj, ErrorConflicto, repositorio y servicio (D-02 a D-07, D-09 a
   D-11).
3. Tests de integración (todas las filas «Integración»).
4. Controlador, rutas y montaje en app.js (D-01, D-08, D-09).

El servicio necesita el reloj y el repositorio, y el controlador necesita
el servicio. Los tests de cada parte van antes que su código, como pide
la constitución.

## Estrategia de pruebas

Todos los tests fijan hoy en el lunes 2027-03-01 (D-05).

| Spec | Cómo se comprueba | Dónde |
|------|-------------------|-------|
| RF-01, RF-02, AC-01 | Unitario e integración: 201 con id, carro, dia, hora y profesor; la reserva queda guardada | Los dos ficheros |
| RF-03, AC-05 | Unitario e integración: las dos reservas del 2027-03-02, y ninguna del 2027-03-03 | Los dos ficheros |
| RF-04, AC-04 | Unitario: el mismo profesor reserva A y B a la misma hora | tests/servicio-reservas.test.js |
| AC-03 | Integración: carro B, 2027-03-15, 6.ª hora → 201 | tests/api-reservas.test.js |
| RNF-01 | Integración: con 500 reservas guardadas, menos de 300 ms | tests/api-reservas.test.js |
| RNF-02, EC-11 | Integración: un campo profesor y otros campos en el cuerpo no cambian la reserva | tests/api-reservas.test.js |
| RNF-03 | Unitario: el día se guarda y se devuelve como AAAA-MM-DD | tests/servicio-reservas.test.js |
| RNF-04 | Unitario: reloj.hoy() con la hora fijada a las 23:30 UTC del 2027-03-01 da 2027-03-02 | tests/reloj.test.js |
| EC-01 | Integración: sin identificación → 401, en POST y en GET | tests/api-reservas.test.js |
| EC-02 | Unitario e integración: falta carro, dia u hora → 400 | Los dos ficheros |
| EC-03 | Unitario e integración: carro número, hora 2.5 o "3", dia "02/03/2027" → 400 | Los dos ficheros |
| EC-04 | Unitario e integración: carro Z → 404 | Los dos ficheros |
| EC-05 | Unitario: horas 0 y 7 → 400; 1 y 6 se aceptan | tests/servicio-reservas.test.js |
| EC-06 | Unitario: 2027-02-30 → 400 | tests/servicio-reservas.test.js |
| EC-07 | Unitario: sábado 2027-03-06 → 400 | tests/servicio-reservas.test.js |
| EC-08 | Unitario: 2027-02-26 → 400; hoy (2027-03-01) se acepta | tests/servicio-reservas.test.js |
| EC-09 | Unitario: 2027-03-16 → 400; 2027-03-15 se acepta | tests/servicio-reservas.test.js |
| EC-10, AC-02 | Unitario e integración: carro ocupado → 409 | Los dos ficheros |
| EC-12 | Integración: el repositorio falla al guardar → 500, y no queda la reserva | tests/api-reservas.test.js |
| EC-13 | Unitario e integración: sin dia o con dia mal escrito → 400 | Los dos ficheros |
| EC-14 | Integración: día sin reservas → 200 [] | tests/api-reservas.test.js |
| EC-15 | Integración: el repositorio falla al leer → 500 | tests/api-reservas.test.js |
| EC-16 | Unitario: una reserva con carro Z y hora 9 → 404 (EC-04 va antes que EC-05) | tests/servicio-reservas.test.js |

## Riesgos y dudas

- Las reservas se pierden al reiniciar el servidor (D-07). Se acepta
  mientras ninguna spec pida otra cosa.
- RNF-04: el día de hoy cambia a medianoche en la hora peninsular, no en
  UTC. El test de reloj.hoy() fija una hora en la que las dos fechas son
  distintas, para que no pase por casualidad.
- RNF-01 se mide en un test: en un equipo muy lento podría fallar sin que
  el código sea el problema.
