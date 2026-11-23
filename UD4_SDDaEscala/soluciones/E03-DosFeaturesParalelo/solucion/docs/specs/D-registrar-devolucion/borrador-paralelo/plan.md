# Plan: Registrar la devolución

## Metadatos

| Campo   | Valor                    |
|---------|--------------------------|
| Feature | Registrar la devolución  |
| Spec    | spec.md, versión 1.0     |
| Estado  | Borrador                 |

## Visión general

La feature añade `POST /api/prestamos/:id/devolucion`. Sigue las capas de A y B y reutiliza `usuario-actual`, los errores existentes y el reloj. Necesita acceder a los préstamos y devolver el portátil a `disponible`.

## Comprobación de la constitución

- [x] Capas respetadas; comprobaciones en el servicio (D-02).
- [x] Errores JSON en español; ruta bajo `/api/`.
- [x] Los préstamos no se borran: cambia su estado (D-03).
- [x] Fecha AAAA-MM-DD con el reloj.

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/repositorios/repositorio-prestamos.js | Nuevo | Préstamos en memoria: guardar, buscarPorId, marcarDevuelto y vaciar |
| src/repositorios/repositorio-portatiles.js | Modificado | Añade marcarDisponible(id) |
| src/servicios/servicio-prestamos.js | Nuevo | registrarDevolucion |
| src/controladores/controlador-prestamos.js | Nuevo | Traduce a HTTP |
| src/rutas/prestamos.js | Nuevo | POST /:id/devolucion |
| src/app.js | Modificado | Monta /api/prestamos |
| tests/servicio-prestamos.test.js, tests/api-devolucion.test.js | Nuevo | Pruebas |

## Decisiones técnicas

- **D-01: Ruta `POST /api/prestamos/:id/devolucion`.** *Cubre:* RF-01, RF-02.
- **D-02: El servicio valida y orquesta**: identificador y cuerpo, busca el préstamo, comprueba el estado, lo marca devuelto y devuelve el portátil a `disponible`. *Cubre:* RF-01, RF-03, EC-02 a EC-05.
- **D-03: `repositorio-prestamos`** nuevo, con `guardar`, `buscarPorId`, `marcarDevuelto` y `vaciar`; los ids son de quien guarda. *Cubre:* RF-01, RNF-02.
- **D-04: `repositorioPortatiles.marcarDisponible(id)`.** *Cubre:* RF-03.
- **D-05: Fecha con `reloj.hoy()`.** *Cubre:* RNF-01.

## Estrategia de pruebas

| Identificador | Prueba |
|---------------|--------|
| RF-01 a RF-03, AC-01, AC-02 | Integración |
| EC-01, EC-02, EC-03 | Integración |
| EC-04, EC-05, EC-06 | Unitaria del servicio |
| RNF-01 | Unitaria con el reloj simulado |
