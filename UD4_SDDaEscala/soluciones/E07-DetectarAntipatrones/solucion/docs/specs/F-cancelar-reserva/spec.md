# Spec: Cancelar una reserva

## Metadatos

| Campo   | Valor                |
|---------|----------------------|
| Feature | Cancelar una reserva |
| Estado  | Borrador             |
| Versión | 1.1                  |

---

## Contexto

El profesorado necesita cancelar una reserva cuando ya no va a usar el carro, para que otra persona pueda reservarlo.

**Historia de usuario:** como profesor, quiero cancelar una reserva mía que ya no necesito para dejar el carro libre.

**Dependencias:** feature B (Reservar un carro). Una reserva se cancela con `DELETE /api/reservas/:id`. Pueden cancelar todas las personas que identifica el sistema del centro (profesorado y coordinación TIC), con las reglas de abajo.

---

## Requisitos funcionales

- RF-01: Cuando un profesor cancele una reserva suya, el sistema deberá dejarla con el estado `cancelada` y no deberá borrarla.
- RF-02: Cuando la coordinación TIC cancele una reserva de cualquier profesor, el sistema deberá cancelarla del mismo modo.
- RF-03: Cuando se cancele una reserva, el sistema deberá responder 200 con la reserva, con los campos `id`, `carro`, `dia`, `hora`, `profesor` y `estado`, y `estado` igual a `cancelada`.
- RF-04: Cuando se pidan las reservas de un día, el sistema no deberá incluir las canceladas.
- RF-05: Cuando se cancele una reserva, el sistema deberá dejar el carro libre para reservarlo de nuevo ese día y esa hora.

## Requisitos no funcionales

- RNF-01: El profesor que cancela se tomará de la identificación del sistema del centro, nunca del cuerpo de la petición.
- RNF-02: Cancelar una reserva deberá tardar menos de 300 ms con 500 reservas guardadas.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Cancelar una reserva

  Antecedentes:
    Dado que Ana y Luis son profesores identificados
    Y que la coordinación TIC está identificada
    Y que Ana tiene la reserva r1 del carro A el 2027-03-02 a 3.ª hora

  Escenario: AC-01 Cancelar una reserva propia
    Cuando Ana cancela la reserva r1
    Entonces la respuesta tiene el código 200
    Y la respuesta es la reserva r1 con el estado "cancelada"

  Escenario: AC-02 La coordinación cancela la reserva de otro profesor
    Cuando la coordinación TIC cancela la reserva r1
    Entonces la respuesta tiene el código 200
    Y la respuesta es la reserva r1 con el estado "cancelada"

  Escenario: AC-03 Un profesor no cancela la reserva de otro
    Cuando Luis cancela la reserva r1
    Entonces la respuesta tiene el código 403
    Y el cuerpo contiene el error "Solo puedes cancelar tus reservas"
    Y la reserva r1 sigue activa

  Escenario: AC-04 Una reserva cancelada deja el carro libre
    Dado que Ana ha cancelado la reserva r1
    Cuando Luis reserva el carro A el 2027-03-02 a 3.ª hora
    Entonces la respuesta tiene el código 201
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si la petición no trae la identificación del sistema del centro, entonces el sistema deberá responder 401 con `{ error: "Tienes que identificarte" }`.
- EC-02: Si la reserva no existe, entonces el sistema deberá responder 404 con `{ error: "La reserva no existe" }`.
- EC-03: Si un profesor cancela una reserva de otro profesor, entonces el sistema deberá responder 403 con `{ error: "Solo puedes cancelar tus reservas" }` y no deberá cambiar nada.
- EC-04: Si la reserva ya está cancelada, entonces el sistema deberá responder 409 con `{ error: "La reserva ya está cancelada" }`.
- EC-05: Si se pide el listado de un día cuyas reservas están todas canceladas, entonces el sistema deberá responder 200 con una lista vacía.

---

## Fuera de alcance

- Cancelar varias reservas a la vez.
- Avisar por correo a la persona que cancela o a la coordinación TIC.
- Deshacer una cancelación.
