# Plan: Registrar la devolución de un portátil

## Metadatos

| Campo   | Valor                                  |
|---------|----------------------------------------|
| Feature | Registrar la devolución de un portátil |
| Spec    | spec.md, versión 1.0                   |
| Estado  | Borrador                               |
| Fecha   | AAAA-MM-DD                             |
| Autor   | <nombre>                               |

## Visión general

La feature añade a la API de préstamos el endpoint
POST /api/prestamos/:id/devolucion. La lógica va en el servicio de
préstamos, que ya existe: comprueba el cuerpo, el préstamo y los permisos,
cierra el préstamo con la hora del servidor y deja el portátil disponible
si no está averiado. Se construye de dentro afuera: primero el servicio,
después el controlador y la ruta, cada parte con sus tests antes.

## Contexto técnico

El de la sección Tecnología de la constitución: Node.js con módulos ES,
Express 5, Vitest y supertest, y datos en memoria en los repositorios. Sin
dependencias nuevas. Se reutilizan el middleware usuario-actual, reloj.ahora()
y los errores ErrorValidacion, ErrorNoEncontrado y ErrorConflicto.

## Comprobación de la constitución

- [x] Capas rutas → controladores → servicios → repositorios. Toda la
  lógica de la devolución está en el servicio; el controlador solo
  traduce (D-01, D-03).
- [x] Respuestas JSON y errores { error: "mensaje" } en español, con su
  código (D-03, D-04).
- [x] Rutas bajo /api/ y en español: POST /api/prestamos/:id/devolucion.
- [x] Los préstamos no se borran: el préstamo devuelto se actualiza
  (D-06).
- [x] Fechas en ISO 8601 y UTC: la fecha de devolución sale de
  reloj.ahora() (D-05).
- [x] Sin datos personales del alumnado: la feature no añade ninguno.
- [x] Datos en memoria, en los repositorios: se usan los que ya existen.
- [x] Sin dependencias nuevas.
- [x] La spec dice el qué y este plan el cómo: lo que se nota desde fuera
  y la spec no decide está marcado en «Riesgos y dudas».
- [x] Tests antes que el código, y cada identificador de la spec con su
  test (secuencia y estrategia de pruebas).

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/errores/error-permiso.js | Nuevo | Clase ErrorPermiso, para el 403 |
| src/servicios/servicio-prestamos.js | Modificado | registrarDevolucion: comprueba, cierra el préstamo y actualiza el portátil |
| src/controladores/controlador-prestamos.js | Modificado | devolver: pasa al servicio el id, el usuario y conCargador; traduce ErrorPermiso a 403 |
| src/rutas/prestamos.js | Modificado | Ruta POST /api/prestamos/:id/devolucion |
| tests/servicio-prestamos.test.js | Modificado | Tests unitarios de registrarDevolucion |
| tests/api-prestamos.test.js | Modificado | Tests de integración de la devolución, con supertest |

## Decisiones técnicas

- D-01: Dónde va la lógica (RF-01 a RF-04, EC-01 a EC-06). Una función
  registrarDevolucion del servicio de préstamos hace todas las
  comprobaciones y los cambios. Lanza ErrorValidacion, ErrorNoEncontrado,
  ErrorConflicto o ErrorPermiso con el mensaje exacto de la spec.
  - Descartado: comprobar en el controlador si el préstamo ya está
    devuelto, para ahorrar una llamada. Pone lógica de negocio en la capa
    HTTP, que la constitución prohíbe.
- D-02: Validación de conCargador (EC-03, EC-04). En el servicio: si no es
  true ni false, ErrorValidacion con «Indica si devuelves el cargador».
  - Descartado: express-validator en la ruta. Pone la validación en la
    capa HTTP y añade una dependencia que la constitución no recoge.
- D-03: Permisos (RF-06, EC-05, AC-04). El controlador pasa al servicio
  el peticion.usuario que deja el middleware usuario-actual. El servicio
  permite la devolución si usuario.papel es "coordinacion" o usuario.id es
  el idProfesor del préstamo; si no, lanza un ErrorPermiso nuevo, que el
  controlador traduce a 403 { error: "No puedes registrar esta
  devolución" }.
  - Descartado: un servicio de usuarios con esCoordinacion(). No existe y
    no hace falta: el papel ya llega en la petición.
- D-04: Errores inesperados (EC-08). Cualquier otro error termina en el
  controlador como 500 { error: "No se ha podido registrar la
  devolución" }, igual que en la feature C.
- D-05: Fecha de devolución (RF-01, RNF-02, EC-07). Siempre
  reloj.ahora(). El controlador solo lee conCargador del cuerpo: una fecha
  u otro campo de la petición no llegan al servicio.
  - Descartado: usar la fecha de la petición si viene. Lo prohíben RNF-02
    y EC-07.
- D-06: Cerrar el préstamo (RF-01, RF-02, RF-04, RNF-03). El préstamo
  se actualiza con repositorioPrestamos.actualizar: pasa a estado
  devuelto, con la fecha de devolución, si trae el cargador y si llega con
  retraso. No se borra.
  - Descartado: moverlo a un array de historial. La constitución y
    RNF-03 dicen que los préstamos no se borran, y con 5.000 préstamos en
    memoria buscar por id no necesita otra estructura (RNF-01).
- D-07: Retraso (RF-04, AC-03). La devolución tiene retraso si la fecha
  de devolución es posterior a la fechaLimite del préstamo. Las dos están
  en ISO 8601 y UTC, así que se comparan como fechas de JavaScript.
  - Descartado: dayjs. Para una comparación, Date basta.
- D-08: Estado del portátil (RF-03, EC-06). Si el portátil está
  averiado, no se cambia; si no, pasa a disponible con
  repositorioPortatiles.cambiarEstado.
- D-09: Sin cambios a medias (EC-08). Primero se guarda el préstamo y
  después se cambia el portátil. Si falla el cambio del portátil, el
  servicio vuelve a guardar el préstamo como estaba antes de lanzar el
  error, para que no cambie ni el préstamo ni el portátil.
  - Descartado: cambiar primero el portátil. Si después falla el
    préstamo, el portátil queda disponible con un préstamo abierto, que
    es justo lo que EC-08 prohíbe.

## Dependencias

Ninguna.

## Secuencia de implementación

1. Tests unitarios de registrarDevolucion (D-01 a D-03 y D-05 a D-09).
2. ErrorPermiso y registrarDevolucion en el servicio.
3. Tests de integración de la devolución (todas las filas «Integración»
   de la estrategia de pruebas).
4. Controlador y ruta (D-03, D-04, D-05).

El controlador llama al servicio, así que el servicio va antes. En cada
parte, los tests van antes que el código, como pide la constitución.

## Estrategia de pruebas

Todos los tests fijan la hora sustituyendo reloj.ahora().

| Spec | Cómo se comprueba | Dónde |
|------|-------------------|-------|
| RF-01, AC-01 | Unitario e integración: 200, préstamo devuelto con la fecha de devolución y el portátil disponible | Los dos ficheros |
| RF-02, AC-02 | Unitario e integración: se guarda si trae el cargador (con y sin él) | Los dos ficheros |
| RF-03 | Unitario: el portátil pasa a disponible | tests/servicio-prestamos.test.js |
| RF-04, AC-03 | Unitario e integración: a las 15:00 hay retraso, a las 13:00 no | Los dos ficheros |
| RF-05 | Integración: 200 con el préstamo actualizado | tests/api-prestamos.test.js |
| RF-06, AC-04 | Unitario e integración: el profesor del préstamo y la coordinación TIC pueden devolver | Los dos ficheros |
| RNF-01 | Integración: con 5.000 préstamos guardados, la devolución tarda menos de 300 ms | tests/api-prestamos.test.js |
| RNF-02, EC-07 | Integración: una fechaDevolucion y otros campos en el cuerpo se ignoran; la fecha es la del reloj | tests/api-prestamos.test.js |
| RNF-03 | Unitario: tras devolverlo, el préstamo sigue en el repositorio | tests/servicio-prestamos.test.js |
| EC-01 | Integración: préstamo inexistente → 404 con su mensaje | tests/api-prestamos.test.js |
| EC-02, AC-05 | Unitario e integración: préstamo ya devuelto → 409 con su mensaje y sin cambios | Los dos ficheros |
| EC-03, EC-04 | Unitario e integración: sin conCargador, o que no es true ni false → 400 con su mensaje | Los dos ficheros |
| EC-05 | Unitario e integración: otro profesor → 403 con su mensaje | Los dos ficheros |
| EC-06 | Unitario: un portátil averiado sigue averiado tras la devolución | tests/servicio-prestamos.test.js |
| EC-08 | Unitario e integración: si falla guardar el préstamo o cambiar el portátil → 500 y ni el préstamo ni el portátil cambian | Los dos ficheros |

## Riesgos y dudas

- [NECESITA ACLARACIÓN: nombres de los campos nuevos del préstamo en la
  respuesta (fecha de devolución, cargador y retraso) y el valor del
  estado del préstamo devuelto. RF-05 dice «el préstamo actualizado»,
  pero no los nombra, y quien use la API los verá. Propuesta en la spec
  1.1.]
- [NECESITA ACLARACIÓN: qué error se responde cuando hay varios a la vez
  (por ejemplo, un préstamo que no existe y una petición sin
  conCargador). Se nota en la respuesta y la spec no lo decide.]
- D-09 deshace el cambio del préstamo a mano porque los datos están en
  memoria. Si una spec pide guardarlos en una base de datos, se
  sustituirá por una transacción.
- Los datos se pierden al reiniciar el servidor. Se acepta mientras
  ninguna spec pida otra cosa (constitución).
