# Plan: Registrar el préstamo

## Metadatos

| Campo   | Valor                  |
|---------|------------------------|
| Feature | Registrar el préstamo  |
| Spec    | spec.md, versión 1.0   |
| Estado  | Aprobado               |

## Visión general

La feature añade `POST /api/prestamos`. Sigue las capas de las features A y B y reutiliza el middleware `usuario-actual`, los errores `ErrorValidacion`, `ErrorNoEncontrado` y `ErrorConflicto` y el reloj. Es la primera feature que **crea préstamos**: añade el repositorio de préstamos y la forma de cambiar el estado de un portátil, que la feature D usará para la devolución.

## Contexto técnico

El de la sección Tecnología de la constitución. Datos en memoria (D-03). Sin dependencias nuevas.

## Comprobación de la constitución

- [x] Capas rutas → controladores → servicios → repositorios; las comprobaciones, en el servicio (D-02).
- [x] Respuestas JSON y errores `{ error: "mensaje" }` en español.
- [x] Ruta bajo `/api/` y en español: `/api/prestamos` (D-01).
- [x] Los préstamos no se borran: el estado cambia, no se elimina nada.
- [x] Fecha en formato AAAA-MM-DD, la pone el servicio con el reloj (D-05).
- [x] Sin datos personales del alumnado.
- [x] Sin dependencias nuevas.

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/repositorios/repositorio-prestamos.js | Nuevo | Préstamos en memoria: guardar, buscarPorId y vaciar |
| src/repositorios/repositorio-portatiles.js | Modificado | Añade cambiarEstado(id, estado) |
| src/servicios/servicio-prestamos.js | Nuevo | registrarPrestamo: valida, comprueba el portátil, guarda y cambia el estado |
| src/controladores/controlador-prestamos.js | Nuevo | Traduce la petición y los errores a HTTP |
| src/rutas/prestamos.js | Nuevo | POST / con usuarioActual |
| src/app.js | Modificado | Monta /api/prestamos |
| tests/servicio-prestamos.test.js, tests/api-prestamos.test.js | Nuevo | Pruebas de la feature |

## Decisiones técnicas

- **D-01: Ruta `POST /api/prestamos`**, montada en `app.js`. *Cubre:* RF-01, RF-02. *Alternativa descartada:* `POST /api/portatiles/:id/prestamo`; el préstamo es un recurso propio.
- **D-02: El servicio valida y orquesta**: valida el cuerpo, busca el portátil, comprueba que está disponible, guarda el préstamo y cambia el estado. *Cubre:* RF-01, RF-03, EC-02 a EC-05. *Alternativa descartada:* hacerlo en el controlador (rompe la constitución).
- **D-03: `repositorio-prestamos`** nuevo, con `guardar` (asigna un id numérico creciente y `estado: 'activo'`), `buscarPorId` y `vaciar`. *Cubre:* RF-01. *Alternativa descartada:* guardar los préstamos dentro del portátil (la devolución necesita buscar por id de préstamo).
- **D-04: `repositorioPortatiles.cambiarEstado(id, estado)`**, reutilizable para devolver el portátil a `disponible`. *Cubre:* RF-03. *Alternativa descartada:* una función solo para prestar.
- **D-05: Fecha de salida con `reloj.hoy()`** (Europe/Madrid). *Cubre:* RNF-02.
- **D-06: Se reutilizan** `usuarioActual` (RNF-01, EC-01) y las clases de error existentes; no se crea ninguna nueva. *Cubre:* EC-02, EC-03, EC-04.

## Secuencia

Tests; repositorios (préstamos y portátiles); servicio; controlador, ruta y montaje. De dentro afuera, como en B.

## Estrategia de pruebas

| Identificador | Prueba |
|---------------|--------|
| RF-01, RF-02, RF-03, AC-01 | Integración con supertest |
| AC-02, EC-03 | Integración |
| EC-01 | Integración |
| EC-02, EC-04, EC-05 | Unitaria del servicio |
| EC-06, RNF-01 | Integración |
| RNF-02 | Unitaria del servicio, con el reloj simulado |

## Riesgos

- La feature D necesita el mismo repositorio de préstamos: coordinar el orden (D trae `main` antes de planificar su parte).
