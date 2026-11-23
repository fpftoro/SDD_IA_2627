# Spec: Consultar las reservas de una sala

## Metadatos

| Campo   | Valor |
|---------|-------|
| Feature | Consultar las reservas de una sala |
| Estado  | Aprobada |
| Versión | 1.0 |

## Contexto

Antes de reservar, y para saber qué tiene una sala en un día, hay que poder consultar sus reservas.

**Historia de usuario:** como docente, quiero ver las reservas de una sala en un día para elegir una franja libre.

Depende de las features A y B (AC-03 necesita una reserva cancelada).

## Requisitos funcionales

- RF-01: Cuando se consulte una sala y una fecha, el sistema deberá devolver las reservas **activas** de esa sala en esa fecha.
- RF-02: Las reservas deberán ir ordenadas por hora de inicio, de la más temprana a la más tardía.
- RF-03: Cada reserva deberá incluir los mismos datos que al crearla.

## Requisitos no funcionales

- RNF-01: Consultar no modifica ninguna reserva.

## Criterios de aceptación

- AC-01: Mientras haya tres reservas activas de «Aula 1» el 10 de marzo, creadas en este orden: 11:00–12:00, 09:00–10:00 y 10:00–11:00, cuando se consulte «Aula 1» el 10 de marzo, el sistema deberá devolverlas en el orden 09:00, 10:00 y 11:00.
- AC-02: Mientras haya reservas de «Aula 1» el 10 de marzo y de «Aula 2» ese día, y otra de «Aula 1» el 11 de marzo, cuando se consulte «Aula 1» el 10 de marzo, el sistema deberá devolver solo la de «Aula 1» el 10.
- AC-03: Mientras haya una reserva cancelada de «Aula 1» el 10 de marzo, cuando se consulte «Aula 1» el 10 de marzo, el sistema no deberá incluirla en el resultado.

## Edge cases y comportamiento ante errores

- EC-01: Si la sala no tiene reservas activas ese día, entonces el sistema deberá devolver una lista vacía, no un error.
- EC-02: Si la sala no existe, entonces el error será `sala_desconocida` con el mensaje «La sala no existe».
- EC-03: Si la fecha no tiene el formato AAAA-MM-DD o no existe en el calendario, entonces el error será `fecha_invalida` con el mensaje «La fecha no es válida».
- EC-04: Si falta la sala o la fecha, entonces el error será `datos_incompletos` con el mensaje «Faltan datos de la consulta».
- EC-05: Si se incumple más de una condición a la vez, el sistema deberá devolver el error de la primera de esta lista: EC-04, EC-02, EC-03.

## Fuera de alcance

- Consultar un rango de fechas, filtrar por persona o paginar.
- Las reservas canceladas.
