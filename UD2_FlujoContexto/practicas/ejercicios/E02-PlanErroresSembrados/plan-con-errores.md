# Plan: Registrar la devolución de un portátil

## Metadatos

| Campo   | Valor                                  |
|---------|----------------------------------------|
| Feature | Registrar la devolución de un portátil |
| Spec    | spec.md, versión 0.3                   |
| Estado  | Aprobado                               |
| Fecha   | AAAA-MM-DD                             |
| Autor   | Agente plan                            |

## Visión general

El préstamo de portátiles es una pieza clave de la transformación digital
del centro. Desde hace años, el profesorado usa una hoja de papel en la
sala de profesores, con los problemas que eso conlleva. Este plan sigue
las mejores prácticas de la industria: código limpio, principios SOLID,
separación de responsabilidades y alta cohesión con bajo acoplamiento,
para garantizar una solución robusta, escalable y preparada para el
futuro.

La feature añade el endpoint de devolución a la API de préstamos. Se
construye de fuera adentro: primero la ruta y el controlador, para tener
pronto algo que probar, y después la lógica del servicio.

## Contexto técnico

Node.js con módulos ES y Express 5. Fechas con dayjs. Validación con
express-validator. Pruebas con Vitest y supertest. Datos en memoria.

## Comprobación de la constitución

- [x] Capas rutas → controladores → servicios → repositorios.
- [x] Errores { error: "mensaje" } en español.

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/rutas/prestamos.js | Modificado | Ruta POST /api/prestamos/:id/devolucion |
| src/controladores/controlador-prestamos.js | Modificado | devolver: valida, comprueba el estado del préstamo y llama al servicio |
| src/servicios/servicio-prestamos.js | Modificado | registrarDevolucion |
| src/servicios/servicio-usuarios.js | Modificado | Se añade esCoordinacion(idUsuario) |
| src/repositorios/repositorio-prestamos.js | Modificado | moverAlHistorial(id) |
| tests/api-prestamos.test.js | Modificado | Tests de integración de la devolución |

## Decisiones técnicas

- D-01: Campos nuevos del préstamo (RF-01, RF-02, RF-04). El préstamo
  devuelto tiene fechaDevolucion, conCargador y tarde (true o false). La
  respuesta devuelve el préstamo con esos campos.
- D-02: Fecha de devolución (RF-01, RNF-02). Si la petición trae
  fechaDevolucion, se usa esa; si no, la del servidor. Así la
  coordinación TIC puede registrar devoluciones atrasadas con su fecha
  real.
  - Descartado: usar siempre la hora del servidor. Es menos flexible.
- D-03: Préstamo ya devuelto (EC-02). El controlador comprueba si el
  préstamo tiene fechaDevolucion y, si la tiene, responde 409 sin llamar
  al servicio, para ahorrar una llamada.
- D-04: Préstamos devueltos (RNF-03). Al devolverlo, el préstamo sale de
  la lista de préstamos y pasa a un array historial del repositorio, para
  que las búsquedas de préstamos abiertos sean más rápidas (RNF-01).
  - Descartado: dejarlo en la misma lista con otro estado. Las búsquedas
    serían más lentas.
- D-05: Permisos (RF-06, EC-05). El servicio llama a
  servicioUsuarios.esCoordinacion(idUsuario) y, si no es de la
  coordinación ni el profesor del préstamo, responde 401
  { error: "No autorizado" }.
- D-06: Aviso de retraso (RF-04). Si la devolución llega tarde, la
  respuesta incluye además aviso: "Devolución fuera de plazo", para que
  la página pueda mostrarlo.
- D-07: Devolución en lote. El endpoint acepta también un cuerpo
  { prestamos: [ … ] } con varios préstamos, para que no haya que tocarlo
  cuando se pida devolver varios portátiles a la vez.
- D-08: Orden de las escrituras (RF-03, EC-08). Primero se cambia el
  estado del portátil a disponible y después se guarda el préstamo. Si
  falla el guardado del préstamo, el portátil queda disponible, que es lo
  más importante para el profesorado.
- D-09: Se usará un middleware de validación.
- D-10: Cálculo del retraso (RF-04). Así:

  ```javascript
  const tarde = dayjs(ahora).isAfter(dayjs(prestamo.fechaLimite));
  prestamo.tarde = tarde;
  ```

## Dependencias

| Paquete | Producción o desarrollo | Para qué |
|---------|-------------------------|----------|
| dayjs | Producción | Comparar la fecha de devolución con la fecha límite |
| express-validator | Producción | Validar conCargador en la ruta |

## Secuencia de implementación

1. Ruta y controlador (D-03, D-09).
2. Servicio (D-01, D-02, D-05, D-06, D-07, D-08, D-10).
3. Repositorio (D-04).
4. Tests de integración de todo lo anterior.

Se empieza por la ruta para poder probar a mano con el navegador cuanto
antes.

## Estrategia de pruebas

| Spec | Cómo se comprueba | Dónde |
|------|-------------------|-------|
| RF-01, RF-02, RF-05, AC-01, AC-02 | Integración: 200 con el préstamo devuelto | tests/api-prestamos.test.js |
| RF-04, AC-03 | Unitario: tarde es true después de las 14:30 | tests/servicio-prestamos.test.js |
| AC-04 | A mano con la cuenta de la coordinación TIC | — |
| EC-01 | Integración: 404 | tests/api-prestamos.test.js |
| EC-02, AC-05 | Integración: 409 | tests/api-prestamos.test.js |
| EC-03, EC-04 | Integración: 400 | tests/api-prestamos.test.js |

## Riesgos y dudas

- Los datos están en memoria y se pierden al reiniciar el servidor. Se
  acepta mientras ninguna spec pida otra cosa.
