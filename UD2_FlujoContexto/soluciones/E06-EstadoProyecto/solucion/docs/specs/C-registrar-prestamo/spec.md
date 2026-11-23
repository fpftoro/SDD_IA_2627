# Spec: Registrar el préstamo

## Metadatos

| Campo   | Valor                 |
|---------|-----------------------|
| Feature | Registrar el préstamo |
| Estado  | Implementada          |
| Versión | 1.0                   |
| Fecha   | AAAA-MM-DD            |
| Autor   | <nombre>              |

---

## Contexto

Cuando un profesor recoge un portátil del carro, el préstamo se registra
para saber en todo momento quién tiene cada portátil.

**Historia de usuario:** como profesor, quiero registrar el préstamo de un
portátil para que conste que lo tengo yo.

**Dependencias:** feature A (Consultar los portátiles).

El préstamo se registra con `POST /api/prestamos` y el cuerpo
`{ "codigoPortatil": "P-01" }`.

---

## Requisitos funcionales

- RF-01: Cuando un usuario identificado registre el préstamo de un
  portátil disponible, el sistema deberá guardar el préstamo con un
  identificador, el código del portátil, el profesor, la fecha y hora del
  préstamo, la fecha límite y el estado abierto.
- RF-02: Cuando se guarde un préstamo, el sistema deberá cambiar el
  estado del portátil a prestado.
- RF-03: Cuando se guarde un préstamo, el sistema deberá responder 201
  con el préstamo, con los campos id, codigoPortatil, idProfesor,
  fechaPrestamo, fechaLimite y estado.
- RF-04: El sistema deberá fijar como fecha límite de cada préstamo el
  mismo día a las 14:30, hora peninsular.

---

## Requisitos no funcionales

- RNF-01: Las fechas se guardarán y se devolverán en ISO 8601, en UTC.
- RNF-02: El profesor del préstamo se tomará de la identificación del
  sistema del centro, nunca del cuerpo de la petición.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Registrar el préstamo

  Antecedentes:
    Dado que Ana es una profesora identificada

  Escenario: AC-01 Préstamo de un portátil disponible
    Dado que P-01 está disponible
    Cuando Ana registra el préstamo de P-01
    Entonces la respuesta tiene el código 201
    Y P-01 está prestado a nombre de Ana hasta hoy a las 14:30

  Escenario: AC-02 Préstamo de un portátil averiado
    Dado que P-03 está averiado
    Cuando Ana registra el préstamo de P-03
    Entonces la respuesta tiene el código 409
    Y el cuerpo contiene el error "El portátil está averiado"

  Escenario: AC-03 Préstamo de un portátil ya prestado
    Dado que P-02 está prestado
    Cuando Ana registra el préstamo de P-02
    Entonces la respuesta tiene el código 409
    Y el cuerpo contiene el error "El portátil ya está prestado"
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si la petición no trae la identificación del sistema del centro,
  entonces el sistema deberá responder 401 con
  { error: "Tienes que identificarte" }.
- EC-02: Si falta codigoPortatil o no es un texto, entonces el sistema
  deberá responder 400 con { error: "Indica el código del portátil" }.
- EC-03: Si el portátil no existe, entonces el sistema deberá responder
  404 con { error: "El portátil no existe" }.
- EC-04: Si el portátil está averiado, entonces el sistema deberá
  responder 409 con { error: "El portátil está averiado" }.
- EC-05: Si el portátil ya está prestado, entonces el sistema deberá
  responder 409 con { error: "El portátil ya está prestado" }.
- EC-06: Si no se puede guardar el préstamo, entonces el sistema deberá
  responder 500 con { error: "No se ha podido registrar el préstamo" } y
  no cambiar el estado del portátil.

---

## Fuera de alcance

- Registrar la devolución (feature E).
- Prestar varios portátiles a la vez.
- Comprobar que el profesor tiene reservado el carro del portátil.
- Préstamos para llevar a casa.

---

## Referencias

- docs/prd.md
