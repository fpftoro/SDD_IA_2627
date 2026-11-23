# Spec: Reservar un carro

## Metadatos

| Campo   | Valor             |
|---------|-------------------|
| Feature | Reservar un carro |
| Estado  | Aprobada          |
| Versión | 1.0               |
| Fecha   | AAAA-MM-DD        |
| Autor   | <nombre>          |

---

## Contexto

El profesorado reserva un carro de portátiles para una fecha y una franja
horaria, y el sistema impide que dos grupos cuenten con el mismo carro a
la vez. Versión simplificada para este ejercicio: sin calendario lectivo
ni límite de antelación.

**Historia de usuario:** como profesor, quiero reservar un carro para una
clase para tener los portátiles cuando los necesite.

**Dependencias:** feature A (los carros son los de los portátiles).

Una reserva se crea con `POST /api/reservas` y el cuerpo
`{ "carro": "A", "fecha": "2030-03-12", "franja": 3 }`.

---

## Requisitos funcionales

- RF-01: Cuando se envíe una reserva con un carro, una fecha y una
  franja, el sistema deberá guardarla con un identificador, el carro, la
  fecha y la franja.
- RF-02: Cuando el sistema guarde una reserva, deberá responder 201 con
  la reserva completa, con los campos id, carro, fecha y franja.

---

## Requisitos no funcionales

- RNF-01: El identificador de la reserva lo genera el servidor.
- RNF-02: «Hoy» es la fecha en la hora peninsular española.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Reservar un carro

  Antecedentes:
    Dado que hoy es 2030-03-10
    Y que existen los carros "A" y "B"

  Escenario: AC-01 Reservar un carro libre
    Cuando se reserva el carro "A" el 2030-03-12 en la franja 3
    Entonces la respuesta tiene el código 201
    Y el cuerpo tiene un id, el carro "A", la fecha "2030-03-12" y la franja 3

  Escenario: AC-02 La misma franja, dos veces
    Dado que el carro "A" está reservado el 2030-03-12 en la franja 3
    Cuando se reserva el carro "A" el 2030-03-12 en la franja 3
    Entonces la respuesta tiene el código 409

  Escenario: AC-03 Reservar para hoy
    Cuando se reserva el carro "B" el 2030-03-10 en la franja 1
    Entonces la respuesta tiene el código 201

  Escenario: AC-04 El mismo carro, en otra franja
    Dado que el carro "A" está reservado el 2030-03-12 en la franja 3
    Cuando se reserva el carro "A" el 2030-03-12 en la franja 4
    Entonces la respuesta tiene el código 201
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si el carro no existe, entonces el sistema deberá responder 404
  con { error: "El carro no existe" }.
- EC-02: Si el carro ya está reservado en esa fecha y franja, entonces el
  sistema deberá responder 409 con
  { error: "El carro ya está reservado en esa franja" }.
- EC-03: Si la fecha es anterior a hoy, entonces el sistema deberá
  responder 400 con { error: "No se puede reservar en una fecha pasada" }.
- EC-04: Si la franja no es un número entero del 1 al 6, entonces el
  sistema deberá responder 400 con
  { error: "La franja debe ser un número del 1 al 6" }.
- EC-05: Si la fecha no es una fecha real con el formato AAAA-MM-DD,
  entonces el sistema deberá responder 400 con
  { error: "La fecha debe tener el formato AAAA-MM-DD" }.
- EC-06: Si falta el carro, la fecha o la franja, entonces el sistema
  deberá responder 400 con
  { error: "Faltan datos: carro, fecha y franja son obligatorios" }.
- EC-07: Si el servidor no puede guardar la reserva, entonces deberá
  responder 500 con { error: "Error al guardar la reserva" }.

---

## Fuera de alcance

- Cancelar una reserva (feature F).
- Consultar las reservas.
- El calendario lectivo y los límites de antelación.
- Quién reserva: la aplicación no guarda datos personales.

---

## Referencias

- docs/prd.md
- docs/specs/A-consultar-portatiles/spec.md
