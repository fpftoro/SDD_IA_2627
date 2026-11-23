# Plan: Registrar la devolución

## Metadatos

| Campo   | Valor                    |
|---------|--------------------------|
| Feature | Registrar la devolución  |
| Spec    | spec.md, versión 1.0     |
| Estado  | Borrador (1.1, tras traer main con la feature C) |

## Visión general

La feature añade `POST /api/prestamos/:id/devolucion`. Sigue las capas de A y B y reutiliza `usuario-actual`, los errores existentes y el reloj. Los préstamos y el cambio de estado de un portátil **ya existen** (feature C): esta feature los reutiliza y solo añade la devolución.

## Comprobación de la constitución

- [x] Capas respetadas; comprobaciones en el servicio (D-02).
- [x] Errores JSON en español; ruta bajo `/api/`.
- [x] Los préstamos no se borran: cambia su estado (D-03).
- [x] Reutiliza lo que ya hay de la feature C antes de crear nada (D-03, D-04).
- [x] Fecha AAAA-MM-DD con el reloj.

## Ficheros

| Fichero | Nuevo o modificado | Responsabilidad |
|---------|--------------------|-----------------|
| src/repositorios/repositorio-prestamos.js | Modificado | Añade marcarDevuelto(id, fechaDevolucion, cargadorDevuelto) |
| src/servicios/servicio-prestamos.js | Modificado | Añade registrarDevolucion |
| src/controladores/controlador-prestamos.js | Modificado | Añade el controlador de la devolución |
| src/rutas/prestamos.js | Modificado | Añade POST /:id/devolucion |
| tests/servicio-prestamos.test.js | Modificado | Añade las pruebas del servicio de la devolución |
| tests/api-devolucion.test.js | Nuevo | Pruebas de la ruta |

## Decisiones técnicas

- **D-01: Ruta `POST /api/prestamos/:id/devolucion`.** *Cubre:* RF-01, RF-02.
- **D-02: El servicio valida y orquesta**: identificador y cuerpo, busca el préstamo, comprueba el estado, lo marca devuelto y devuelve el portátil a `disponible`. *Cubre:* RF-01, RF-03, EC-02 a EC-05.
- **D-03: Se reutiliza `repositorio-prestamos` de la feature C** (`guardar`, `buscarPorId`, `vaciar`) y se le añade `marcarDevuelto`. Los tests crean los préstamos con `guardar`. *Cubre:* RF-01, RNF-02. *Alternativa descartada:* un repositorio propio (duplicaría el de C).
- **D-04: Se reutiliza `repositorioPortatiles.cambiarEstado(id, 'disponible')` de la feature C.** No se crea `marcarDisponible`. *Cubre:* RF-03.
- **D-05: Fecha con `reloj.hoy()`.** *Cubre:* RNF-01.

## Estrategia de pruebas

| Identificador | Prueba |
|---------------|--------|
| RF-01 a RF-03, AC-01, AC-02 | Integración |
| EC-01, EC-02, EC-03 | Integración |
| EC-04, EC-05, EC-06 | Unitaria del servicio |
| RNF-01 | Unitaria con el reloj simulado |
