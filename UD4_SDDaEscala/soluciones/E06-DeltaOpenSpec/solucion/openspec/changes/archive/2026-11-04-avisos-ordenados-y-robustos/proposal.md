## Why

La coordinación TIC reclama los portátiles empezando por el aviso que lee primero, y hoy el primero es el del profesor que alfabéticamente va antes, no el del préstamo más antiguo. Además, un préstamo sin profesor sale como «undefined» y una fecha inválida hace que un portátil desaparezca del aviso sin que nadie lo sepa. Producto decidió corregir estos cuatro fallos conocidos (FC-01 a FC-04 de la spec de G).

## What Changes

- Los avisos se ordenan por antigüedad (primero el más antiguo); a igual antigüedad, por profesor sin distinguir mayúsculas; y a igualdad total, en el orden de entrada.
- Un préstamo sin profesor se redacta «con un profesor desconocido».
- Una fecha de salida inválida en un préstamo no devuelto lanza un error que dice qué préstamo es.
- Una fecha de «hoy» inválida lanza un error.
- La spec de la feature G (`docs/specs/G-avisos-devolucion/spec.md`) sube a la versión 1.1.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `avisos-devolucion`: cambia el orden y se añaden los casos de profesor desconocido y fechas inválidas.

## Impact

- `src/servicios/servicio-avisos.js` y `src/avisos.js`; un error nuevo, `src/errores/error-validacion.js`.
- Los tests de caracterización de los fallos (CAR-09 a CAR-14) se sustituyen por los del cambio; los demás no se tocan.
- Sin dependencias nuevas.
