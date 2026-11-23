# Líneas para clasificar

Material de la parte A del ejercicio E08. Son líneas sueltas que distintas personas del equipo querían añadir a las specs del préstamo de portátiles. No modifiques este fichero: escribe tus respuestas en el `README.md`.

| # | Línea |
|---|-------|
| L1 | La cancelación de una reserva debe ser rápida. |
| L2 | Usar `Array.prototype.filter` para quitar la reserva del array `reservas`. |
| L3 | Si la reserva no existe, entonces el sistema deberá responder 404 con `{ error: "La reserva no existe" }`. |
| L4 | Los errores de toda la API siguen el formato `{ error: "mensaje" }`. |
| L5 | El sistema deberá gestionar adecuadamente las cancelaciones de última hora. |
| L6 | Crear la función `cancelarReserva(id, usuario)` en `src/servicios/reservas.js`. |
| L7 | Solo pueden cancelar una reserva quien la hizo y la coordinación TIC. |
| L8 | La reserva que se cancela se indica en la ruta: `DELETE /api/reservas/:id`. |
| L9 | Las reservas canceladas no se borran: se guardan con el estado `cancelada`. |
| L10 | Todas las fechas, en ISO 8601 y en UTC. |
| L11 | Guardar las reservas en un `Map` indexado por `id` para que la búsqueda sea O(1). |
| L12 | La pantalla de cancelación debe ser clara. |
| L13 | Usar la librería `date-fns` para comparar las fechas de las reservas. |
| L14 | Si la hora de la reserva ya ha empezado, entonces el sistema deberá responder 409 con `{ error: "La reserva ya ha empezado" }`. |
| L15 | Cada función de un servicio tiene sus tests con Vitest. |
