# Constitución — Préstamo de portátiles

Principios del proyecto. No se negocian en cada tarea: si alguno tiene que
cambiar, se acuerda con el equipo y se cambia aquí primero.

## Arquitectura

Capas: rutas → servicios → datos. Las rutas no contienen lógica de
negocio: reciben la petición, llaman a un servicio y devuelven la
respuesta. Solo los servicios acceden a los datos.

## API

- Todas las respuestas son JSON.
- Las rutas empiezan por `/api/` y están en español (`/api/portatiles`).
- Los errores devuelven `{ error: "mensaje" }`, con el mensaje en español
  y el código HTTP adecuado (400, 404, 409…).

## Datos

- Los préstamos no se borran nunca: son el historial del portátil.
- Las fechas se guardan y se devuelven en formato ISO 8601, en UTC.
- La aplicación no guarda datos personales del alumnado.

## Pruebas

Cada función de un servicio tiene sus tests con Vitest, en `test/`, que
cubren el caso normal y los casos límite.
