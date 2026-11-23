# Spec: Cancelar una reserva

## Metadatos

| Campo   | Valor |
|---------|-------|
| Feature | Cancelar una reserva |
| Estado  | Aprobada |
| Versión | 1.0 |

## Contexto

Cuando una reserva ya no hace falta, hay que liberar la sala para que otra persona la use.

**Historia de usuario:** como docente, quiero cancelar una reserva para que la sala quede libre.

Depende de la feature A (las reservas existen y tienen identificador y estado).

## Requisitos funcionales

- RF-01: Cuando se solicite cancelar una reserva activa indicando su identificador, el sistema deberá cambiar su estado a `cancelada` y devolverla.
- RF-02: Una reserva cancelada deberá dejar libre su franja: se podrá volver a reservar esa sala en esa franja.

## Requisitos no funcionales

- RNF-01: Cancelar no borra la reserva: sigue existiendo con estado `cancelada`.

## Criterios de aceptación

- AC-01: Mientras hoy sea el 1 de marzo y exista una reserva activa de «Aula 1» el 10 de marzo de 10:00 a 11:00, cuando se cancele, el sistema deberá dejar su estado en `cancelada`.
- AC-02: Mientras hoy sea el 1 de marzo y haya una reserva cancelada de «Aula 1» el 10 de marzo de 10:00 a 11:00, cuando se reserve «Aula 1» ese día de 10:00 a 11:00, el sistema deberá crear la reserva.
- AC-03: Mientras hoy sea el 1 de marzo y haya dos reservas activas de «Aula 1» el 10 de marzo, de 10:00 a 11:00 y de 11:00 a 12:00, cuando se cancele la primera, el sistema deberá mantener la otra en estado `activa`.

## Edge cases y comportamiento ante errores

- EC-01: Si no se indica el identificador, entonces el sistema deberá devolver el error `datos_incompletos` con el mensaje «Falta el identificador de la reserva».
- EC-02: Si no existe ninguna reserva con ese identificador, entonces el error será `reserva_no_encontrada` con el mensaje «La reserva no existe».
- EC-03: Si la reserva ya estaba cancelada, entonces el error será `reserva_ya_cancelada` con el mensaje «La reserva ya estaba cancelada», y la reserva no cambia.
- EC-04: Si la fecha de la reserva es anterior a hoy, entonces el error será `reserva_pasada` con el mensaje «No se puede cancelar una reserva pasada».
- EC-05: Si se incumple más de una condición a la vez, el sistema deberá devolver el error de la primera de esta lista: EC-01, EC-02, EC-03, EC-04. Una reserva cancelada y pasada da `reserva_ya_cancelada`.

## Fuera de alcance

- Quién puede cancelar (no hay cuentas): cualquiera que conozca el identificador.
- Avisos y reservas periódicas.
