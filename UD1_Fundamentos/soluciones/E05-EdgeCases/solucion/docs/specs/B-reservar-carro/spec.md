# Spec: Reservar un carro

## Metadatos

| Campo   | Valor             |
|---------|-------------------|
| Feature | Reservar un carro |
| Estado  | Borrador          |
| Versión | 0.2               |
| Fecha   | AAAA-MM-DD        |
| Autor   | <nombre>          |

---

## Contexto

El profesorado reserva un carro de portátiles para una hora de clase. Hoy
las reservas se apuntan en una hoja de papel y a menudo dos profesores
cuentan con el mismo carro a la misma hora.

**Historia de usuario:** como profesor, quiero reservar un carro para una
hora de clase para tenerlo asegurado sin bajar a la sala de profesores.

**Dependencias:** feature A (Consultar los portátiles). El centro tiene los
carros `A`, `B` y `C`. Hay clase de lunes a viernes, de 1.ª a 6.ª hora.

---

## Requisitos funcionales

- RF-01: El sistema deberá permitir reservar un carro para un día y una
  hora de clase (de 1.ª a 6.ª).
- RF-02: El sistema deberá guardar cada reserva con un identificador, el
  carro, el día, la hora y el profesor que la hace.
- RF-03: El sistema deberá mostrar en el calendario de la semana las
  reservas de cada carro, con el nombre del profesor.

La reserva se hace con `POST /api/reservas` y este cuerpo:

```json
{ "carro": "A", "dia": "AAAA-MM-DD", "hora": 3 }
```

---

## Requisitos no funcionales

- RNF-01: El endpoint de reservas responderá en menos de 300 ms con 500
  reservas guardadas.
- RNF-02: El profesor de la reserva se toma del usuario que ha iniciado
  sesión, nunca del cuerpo de la petición.
- RNF-03: El día se guarda y se devuelve en formato ISO 8601 (`AAAA-MM-DD`).

---

## Criterios de aceptación

- AC-01: Dado el carro A libre el próximo martes a 3.ª hora, cuando un
  profesor lo reserva, entonces recibe un 201 con la reserva creada.
- AC-02: Dado que un profesor ha reservado el carro A el martes a 3.ª hora,
  cuando cualquier profesor abre el calendario de esa semana, entonces ve
  la reserva en el martes, 3.ª hora, a nombre de quien la hizo.
- AC-03: Dado el carro A reservado el próximo martes a 3.ª hora, cuando
  otro profesor intenta reservarlo para el mismo día y la misma hora,
  entonces recibe un 409 con "El carro ya está reservado a esa hora" y el
  calendario sigue mostrando solo la primera reserva.
- AC-04: Dado un profesor con la sesión iniciada, cuando envía una reserva
  con la hora 7, entonces recibe un 400 con "La hora debe ser un número
  del 1 al 6" y no se crea ninguna reserva.
- AC-05: Dado el carro A libre el próximo martes a 6.ª hora, cuando un
  profesor lo reserva, entonces recibe un 201: la 6.ª hora es válida.

---

## Edge cases y comportamiento ante errores

- EC-01: Si falta el campo carro, dia u hora, el sistema responderá 400
  con { error: "Los campos carro, dia y hora son obligatorios" }.
- EC-02: Si carro no es un texto, hora no es un número entero o dia no
  tiene el formato AAAA-MM-DD, responderá 400 con
  { error: "Los datos de la reserva no tienen el formato correcto" }.
- EC-03: Si el carro no existe (por ejemplo, "Z"), responderá 404 con
  { error: "El carro no existe" }.
- EC-04: Si la hora es menor que 1 o mayor que 6, responderá 400 con
  { error: "La hora debe ser un número del 1 al 6" }. La 1.ª y la 6.ª
  hora son válidas.
- EC-05: Si el día tiene el formato correcto pero no es una fecha real
  (por ejemplo, 2027-02-30), responderá 400 con
  { error: "El día no es una fecha válida" }.
- EC-06: Si el día es sábado o domingo, responderá 400 con
  { error: "Solo se puede reservar de lunes a viernes" }.
- EC-07: Si el día es festivo o no lectivo, el sistema
  [NECESITA ACLARACIÓN: ¿se rechaza la reserva o solo se avisa? ¿Quién
  mantiene el calendario de días no lectivos y cómo llega al sistema:
  lo carga la coordinación TIC cada curso o se consulta en otro sitio?].
- EC-08: Si la hora reservada ya ha empezado o ha pasado, responderá 400
  con { error: "No se puede reservar una hora que ya ha empezado" }. Una
  hora de hoy que todavía no ha empezado sí se puede reservar.
- EC-09: Si la reserva es para dentro de más de
  [NECESITA ACLARACIÓN: ¿con cuánta antelación máxima se puede reservar?
  La coordinación TIC propuso dos semanas, pero no está aprobado. ¿O no
  hay límite?], el sistema responderá 400 con
  { error: "No se puede reservar con tanta antelación" }.
- EC-10: Si el carro ya está reservado ese día a esa hora, responderá 409
  con { error: "El carro ya está reservado a esa hora" }.
- EC-11: Si dos profesores reservan a la vez el mismo carro, día y hora,
  solo se creará una reserva (201); la otra petición recibirá el 409 de
  EC-10.
- EC-12: Si el profesor ya tiene otro carro reservado ese día a esa hora,
  el sistema [NECESITA ACLARACIÓN: ¿se permite (por ejemplo, para un
  desdoble con dos grupos) o se rechaza con 409?].
- EC-13: Si el cuerpo de la petición trae un campo profesor u otros
  campos que no se esperan, el sistema los ignorará: el profesor es
  siempre el de la sesión (RNF-02).
- EC-14: Si no se puede guardar la reserva (por ejemplo, la base de datos
  no responde), responderá 500 con
  { error: "No se ha podido guardar la reserva" } y no quedará ninguna
  reserva a medias.

---

## Fuera de alcance

- Cancelar o modificar una reserva (feature F, Cancelar una reserva).
- Reservas periódicas, como «todos los martes del trimestre».
- Reservar varias horas seguidas en una sola petición: se reservan de una
  en una.
- Reservar portátiles sueltos en lugar de un carro completo.
- Avisos por correo de confirmación o de recordatorio.
- Reservas hechas por el alumnado.
