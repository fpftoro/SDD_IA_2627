# PRD: Préstamo de portátiles del centro

## Objetivo

Que el profesorado reserve y tome prestados los portátiles de los carros
del centro sin la hoja de papel de la sala de profesores, y que la
coordinación TIC sepa en todo momento dónde está cada portátil.

## Problema

Hoy las reservas se apuntan a mano. Hay reservas duplicadas, portátiles
que se devuelven sin cargador o averiados sin que nadie lo anote, y cuando
falta un portátil no se sabe quién lo tuvo el último.

## Usuarios

- **Profesorado** (unas 60 personas): reserva carros, recoge y devuelve
  portátiles.
- **Coordinación TIC** (dos personas): mantiene el inventario y resuelve
  las incidencias.

## Casos de uso

- Consultar los portátiles y su estado.
- Reservar un carro para una hora de clase.
- Registrar el préstamo de un portátil.
- Registrar la devolución de un portátil.
- Anotar una incidencia (avería, falta el cargador…).

## Métricas de éxito

- Ninguna reserva duplicada durante un trimestre.
- Cada portátil tiene en todo momento un estado y, si está prestado,
  una persona responsable.

## Fuera de alcance

- Préstamos al alumnado para llevar a casa.
- Penalizaciones por devolución tardía (las decide la dirección del centro).
- Un inicio de sesión propio: la aplicación usa la identificación del
  sistema del centro, que añade a cada petición el usuario y su papel
  (cabeceras `X-Usuario` y `X-Papel`).
