# Spec: Reservar un carro

## Metadatos

| Campo   | Valor             |
|---------|-------------------|
| Feature | Reservar un carro |
| Estado  | Implementada      |
| Versión | 1.1               |
| Fecha   | AAAA-MM-DD        |
| Autor   | <nombre>          |

---

## Contexto

El profesorado reserva un carro de portátiles para una hora de clase. Hoy
las reservas se apuntan en una hoja de papel y a menudo dos profesores
cuentan con el mismo carro a la misma hora.

**Historia de usuario:** como profesor, quiero reservar un carro para una
hora de clase para tenerlo asegurado sin bajar a la sala de profesores.

**Dependencias:** feature A (Consultar los portátiles). El centro tiene
los carros `A`, `B` y `C`. Hay clase de lunes a viernes, de 1.ª a 6.ª
hora. Pueden reservar todas las personas que identifica el sistema del
centro (profesorado y coordinación TIC).

Una reserva se crea con `POST /api/reservas` y este cuerpo:

```json
{ "carro": "A", "dia": "2027-03-02", "hora": 3 }
```

Las reservas de un día se consultan con `GET /api/reservas?dia=2027-03-02`.

---

## Requisitos funcionales

- RF-01: Cuando un usuario identificado reserve un carro libre para un
  día y una hora válidos, el sistema deberá guardar la reserva con un
  identificador, el carro, el día, la hora y el usuario que la hace.
- RF-02: Cuando se cree una reserva, el sistema deberá responder 201 con
  la reserva creada, con los campos id, carro, dia, hora y profesor (el
  identificador del usuario que la hace).
- RF-03: Cuando se pidan las reservas de un día, el sistema deberá
  responder 200 con todas las reservas de ese día, con los mismos campos,
  ordenadas por hora y, a la misma hora, por carro.
- RF-04: Cuando un usuario reserve un carro libre a una hora en la que ya
  tiene otro carro reservado, el sistema deberá crear la reserva
  igualmente.

---

## Requisitos no funcionales

- RNF-01: El sistema deberá responder a una reserva en menos de 300 ms con
  500 reservas guardadas.
- RNF-02: El profesor de la reserva se tomará de la identificación del
  sistema del centro, nunca del cuerpo de la petición.
- RNF-03: El día se guardará y se devolverá en formato AAAA-MM-DD.
- RNF-04: «Hoy» es la fecha actual en la hora peninsular española (zona
  horaria `Europe/Madrid`).

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Reservar un carro

  Antecedentes:
    Dado que hoy es el lunes 2027-03-01
    Y que Ana y Luis son profesores identificados

  Escenario: AC-01 Reservar un carro libre
    Cuando Ana reserva el carro A el 2027-03-02 a 3.ª hora
    Entonces la respuesta tiene el código 201
    Y la respuesta es la reserva del carro A, el 2027-03-02, a 3.ª hora, a nombre de Ana

  Escenario: AC-02 Reservar un carro ocupado
    Dado que Luis ha reservado el carro A el 2027-03-02 a 3.ª hora
    Cuando Ana reserva el carro A el 2027-03-02 a 3.ª hora
    Entonces la respuesta tiene el código 409
    Y el cuerpo contiene el error "El carro ya está reservado a esa hora"

  Escenario: AC-03 La 6.ª hora y el último día permitido son válidos
    Cuando Ana reserva el carro B el 2027-03-15 a 6.ª hora
    Entonces la respuesta tiene el código 201

  Escenario: AC-04 Dos carros a la misma hora para un desdoble
    Dado que Ana ha reservado el carro A el 2027-03-02 a 3.ª hora
    Cuando Ana reserva el carro B el 2027-03-02 a 3.ª hora
    Entonces la respuesta tiene el código 201

  Escenario: AC-05 Ver las reservas de un día
    Dado que Ana ha reservado el carro A el 2027-03-02 a 3.ª hora
    Y que Luis ha reservado el carro B el 2027-03-02 a 1.ª hora
    Y que Luis ha reservado el carro A el 2027-03-03 a 2.ª hora
    Cuando se piden las reservas del 2027-03-02
    Entonces la respuesta tiene el código 200
    Y la respuesta tiene la reserva de Ana y la de Luis del 2027-03-02, y ninguna más
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si la petición (de reserva o de consulta) no trae la
  identificación del sistema del centro, entonces el sistema deberá
  responder 401 con { error: "Tienes que identificarte" }.
- EC-02: Si falta el campo carro, dia u hora, entonces el sistema deberá
  responder 400 con
  { error: "Los campos carro, dia y hora son obligatorios" }.
- EC-03: Si carro no es un texto, hora no es un número entero o dia no
  tiene el formato AAAA-MM-DD, entonces el sistema deberá responder 400
  con { error: "Los datos de la reserva no tienen el formato correcto" }.
- EC-04: Si el carro no es A, B ni C, entonces el sistema deberá
  responder 404 con { error: "El carro no existe" }.
- EC-05: Si la hora es menor que 1 o mayor que 6, entonces el sistema
  deberá responder 400 con
  { error: "La hora debe ser un número del 1 al 6" }.
- EC-06: Si el día tiene el formato correcto pero no es una fecha real
  (por ejemplo, 2027-02-30), entonces el sistema deberá responder 400 con
  { error: "El día no es una fecha válida" }.
- EC-07: Si el día es sábado o domingo, entonces el sistema deberá
  responder 400 con { error: "Solo se puede reservar de lunes a viernes" }.
- EC-08: Si el día es anterior a hoy, entonces el sistema deberá
  responder 400 con
  { error: "No se puede reservar un día que ya ha pasado" }. Hoy sí se
  puede reservar.
- EC-09: Si el día es posterior a hoy más 14 días, entonces el sistema
  deberá responder 400 con
  { error: "Solo se puede reservar con 14 días de antelación como máximo" }.
  Hoy más 14 días sí se puede reservar.
- EC-10: Si el carro ya está reservado ese día a esa hora, entonces el
  sistema deberá responder 409 con
  { error: "El carro ya está reservado a esa hora" }.
- EC-11: Si el cuerpo trae un campo profesor u otros campos que no se
  esperan, entonces el sistema deberá ignorarlos.
- EC-12: Si no se puede guardar la reserva, entonces el sistema deberá
  responder 500 con { error: "No se ha podido guardar la reserva" } y no
  deberá quedar ninguna reserva a medias.
- EC-13: Si se piden las reservas sin el parámetro dia, o con un dia que
  no tiene el formato AAAA-MM-DD, entonces el sistema deberá responder 400
  con { error: "Indica el día con el formato AAAA-MM-DD" }.
- EC-14: Si se piden las reservas de un día que no tiene ninguna,
  entonces el sistema deberá responder 200 con una lista vacía.
- EC-15: Si no se pueden leer las reservas al consultarlas, entonces el
  sistema deberá responder 500 con
  { error: "No se han podido consultar las reservas" }.
- EC-16: Si una petición cumple las condiciones de varios *edge cases*,
  entonces el sistema deberá responder el primero de esta lista.

---

## Fuera de alcance

- Comprobar los festivos y los días no lectivos.
- Cancelar o modificar una reserva (feature F, Cancelar una reserva).
- Reservas periódicas, como «todos los martes del trimestre».
- Reservar varias horas seguidas en una sola petición.
- Reservar portátiles sueltos en lugar de un carro completo.
- Limitar cuántas reservas puede tener cada persona.
- Avisos por correo de confirmación o de recordatorio.
- La página web: esta feature es solo la API.

---

## Referencias

- docs/prd.md
- docs/specs/A-consultar-portatiles/spec.md
