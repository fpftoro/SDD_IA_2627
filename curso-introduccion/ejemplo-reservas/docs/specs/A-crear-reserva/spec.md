# Spec: Crear una reserva

## Metadatos

| Campo   | Valor |
|---------|-------|
| Feature | Crear una reserva |
| Estado  | Aprobada |
| Versión | 1.0 |

## Contexto

Quien trabaja en el centro necesita reservar una sala para una franja de un día y saber enseguida si la tiene. La reserva se rechaza si no cumple las reglas del centro o si la sala ya está ocupada.

**Historia de usuario:** como docente, quiero reservar una sala en una franja para tener el espacio garantizado.

Las salas son «Aula 1», «Aula 2» y «Sala de reuniones» (PRD). Un error se devuelve con un **código** y un **mensaje**.

## Requisitos funcionales

- RF-01: Cuando se solicite una reserva indicando sala, fecha, hora de inicio, hora de fin y nombre de la persona, el sistema deberá crear la reserva con estado `activa` y un identificador único, y devolverla.
- RF-02: La reserva devuelta deberá incluir el identificador, la sala, la fecha, las horas de inicio y fin, el nombre y el estado.
- RF-03: El sistema deberá guardar el nombre sin los espacios del principio y del final.

## Requisitos no funcionales

- RNF-01: El identificador lo genera el sistema, nunca quien solicita la reserva.
- RNF-02: Las fechas se expresan como AAAA-MM-DD y las horas como HH:MM en formato de 24 horas.

## Criterios de aceptación

- AC-01: Mientras hoy sea el 1 de marzo y «Aula 1» esté libre, cuando se reserve «Aula 1» el 10 de marzo de 10:00 a 11:00 a nombre de «Marta», el sistema deberá crear una reserva activa con identificador y esos mismos datos.
- AC-02: Mientras hoy sea el 1 de marzo y «Aula 1» tenga una reserva activa el 10 de marzo de 10:00 a 11:00, cuando se reserve «Aula 2» el 10 de marzo de 10:00 a 11:00, el sistema deberá crear la reserva.
- AC-03: Mientras hoy sea el 1 de marzo y «Aula 1» tenga una reserva activa el 10 de marzo de 10:00 a 11:00, cuando se reserve «Aula 1» el 10 de marzo de 11:00 a 12:00, el sistema deberá crear la reserva.
- AC-04: Cuando se creen dos reservas, el sistema deberá asignarles identificadores distintos.

## Edge cases y comportamiento ante errores

- EC-01: Si falta alguno de los cinco datos, o el nombre solo tiene espacios, entonces el sistema deberá rechazar la reserva con el error `datos_incompletos` y el mensaje «Faltan datos de la reserva».
- EC-02: Si la sala no es una de las tres, entonces el error será `sala_desconocida` con el mensaje «La sala no existe».
- EC-03: Si la fecha es anterior a hoy, entonces el error será `fecha_pasada` con el mensaje «No se puede reservar en una fecha pasada». La fecha de hoy es válida.
- EC-04: Si la hora de fin no es posterior a la de inicio, entonces el error será `franja_invalida` con el mensaje «La hora de fin debe ser posterior a la de inicio».
- EC-05: Si el inicio o el fin no son una hora en punto o y media, entonces el error será `franja_no_alineada` con el mensaje «Las horas deben ser en punto o y media».
- EC-06: Si la duración es menor de 30 minutos o mayor de 120, entonces el error será `duracion_no_permitida` con el mensaje «La reserva debe durar entre 30 y 120 minutos».
- EC-07: Si el inicio es anterior a las 08:00 o el fin es posterior a las 21:00, entonces el error será `fuera_de_horario` con el mensaje «La sala solo se puede reservar de 08:00 a 21:00».
- EC-08: Si la franja se solapa con la de otra reserva **activa** de la misma sala y el mismo día, entonces el error será `sala_ocupada` con el mensaje «La sala ya está reservada en esa franja». Dos franjas se solapan si el inicio de una es anterior al fin de la otra y su fin es posterior al inicio de la otra.
- EC-09: Si la fecha no tiene el formato AAAA-MM-DD o no existe en el calendario, entonces el error será `fecha_invalida` con el mensaje «La fecha no es válida».
- EC-10: Si la hora de inicio o la de fin no tiene el formato HH:MM, de 00:00 a 23:59, entonces el error será `hora_invalida` con el mensaje «La hora no es válida».
- EC-11: Si se incumple más de una condición a la vez, el sistema deberá devolver el error de la primera de esta lista: EC-01, EC-02, EC-09, EC-10, EC-03, EC-04, EC-05, EC-06, EC-07, EC-08.

## Fuera de alcance

- Cancelar una reserva (feature B) y consultar reservas (feature C).
- Comprobar si la hora de hoy ya ha pasado: una reserva para hoy es válida aunque la franja haya empezado.
- Cuentas de usuario, reservas periódicas y avisos.
