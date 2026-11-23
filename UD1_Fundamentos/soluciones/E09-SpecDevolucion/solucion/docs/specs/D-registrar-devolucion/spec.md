# Spec: Registrar la devolución de un portátil

## Metadatos

| Campo   | Valor                                  |
|---------|----------------------------------------|
| Feature | Registrar la devolución de un portátil |
| Estado  | Aprobada                               |
| Versión | 1.0                                    |
| Fecha   | AAAA-MM-DD                             |
| Autor   | <nombre>                               |

---

## Contexto

Cuando un profesor devuelve un portátil, la devolución se registra para que
el portátil vuelva a estar disponible y quede el historial completo del
préstamo: quién lo tuvo, hasta cuándo y si devolvió el cargador, que es lo
que más se pierde.

**Historia de usuario:** como profesor, quiero registrar la devolución para
que conste que he devuelto el portátil.

**Dependencias:** feature C (Registrar el préstamo de un portátil).

La devolución se registra con `POST /api/prestamos/:id/devolucion`, donde
`:id` es el identificador del préstamo, y el cuerpo `{ "conCargador": true }`.

---

## Requisitos funcionales

- RF-01: Cuando se registre la devolución de un préstamo abierto, el
  sistema deberá guardar en el préstamo la fecha y hora de devolución.
- RF-02: Cuando se registre la devolución de un préstamo abierto, el
  sistema deberá guardar en el préstamo si se devuelve el cargador.
- RF-03: Cuando se registre la devolución de un préstamo cuyo portátil no
  está averiado, el sistema deberá cambiar el estado del portátil a
  disponible.
- RF-04: Cuando se registre una devolución después de la fecha límite del
  préstamo, el sistema deberá marcarla como «con retraso».
- RF-05: Cuando se registre una devolución, el sistema deberá responder
  200 con el préstamo actualizado.
- RF-06: El sistema deberá permitir registrar la devolución solo al
  profesor del préstamo y a las personas de la coordinación TIC.

---

## Requisitos no funcionales

- RNF-01: El sistema deberá responder a una devolución en menos de 300 ms
  con 5.000 préstamos guardados.
- RNF-02: La fecha y hora de devolución se tomarán del reloj del servidor,
  nunca de la petición.
- RNF-03: El préstamo devuelto no se borra: se conserva con su fecha de
  devolución.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Registrar la devolución de un portátil

  Antecedentes:
    Dado que la profesora Ana tiene prestado P-01 con fecha límite hoy a las 14:30

  Escenario: AC-01 Devolución a tiempo con cargador
    Dado que son las 13:00
    Cuando Ana registra la devolución con el cargador
    Entonces la respuesta tiene el código 200
    Y el préstamo tiene como fecha de devolución hoy a las 13:00
    Y P-01 está disponible

  Escenario: AC-02 Devolución sin cargador
    Cuando Ana registra la devolución sin el cargador
    Entonces la respuesta tiene el código 200
    Y la devolución queda anotada sin cargador
    Y P-01 está disponible

  Escenario: AC-03 Devolución con retraso
    Dado que son las 15:00
    Cuando Ana registra la devolución con el cargador
    Entonces la devolución queda marcada con retraso

  Escenario: AC-04 La coordinación TIC registra la devolución
    Cuando una persona de la coordinación TIC registra la devolución con el cargador
    Entonces la respuesta tiene el código 200
    Y P-01 está disponible

  Escenario: AC-05 Devolver un préstamo que ya está devuelto
    Dado que Ana ya ha registrado la devolución
    Cuando vuelve a registrar la devolución
    Entonces la respuesta tiene el código 409
    Y el cuerpo contiene el error "Este préstamo ya está devuelto"
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si el préstamo no existe, entonces el sistema deberá responder 404
  con { error: "El préstamo no existe" }.
- EC-02: Si el préstamo ya está devuelto, entonces el sistema deberá
  responder 409 con { error: "Este préstamo ya está devuelto" } y no
  cambiar nada.
- EC-03: Si la petición no incluye conCargador, entonces el sistema deberá
  responder 400 con { error: "Indica si devuelves el cargador" }.
- EC-04: Si conCargador no es true ni false, entonces el sistema deberá
  responder 400 con { error: "Indica si devuelves el cargador" }.
- EC-05: Si quien registra la devolución no es el profesor del préstamo ni
  una persona de la coordinación TIC, entonces el sistema deberá responder
  403 con { error: "No puedes registrar esta devolución" }.
- EC-06: Si el portátil está averiado cuando se devuelve, entonces el
  sistema deberá registrar la devolución y dejar el portátil averiado.
- EC-07: Si la petición incluye una fecha de devolución u otros campos que
  no se esperan, entonces el sistema deberá ignorarlos.
- EC-08: Si no se puede guardar la devolución, entonces el sistema deberá
  responder 500 con { error: "No se ha podido registrar la devolución" } y
  no cambiar ni el préstamo ni el estado del portátil.

---

## Fuera de alcance

- Penalizaciones por devolución tardía: las decidirá la dirección.
- Anotar una avería al devolver el portátil (feature E, Anotar una
  incidencia).
- Avisos para reclamar los cargadores que faltan.
- Registrar la devolución de varios préstamos a la vez.
- Modificar o deshacer una devolución ya registrada.

---

## Referencias

- docs/prd.md
- docs/notas-devolucion.md
- docs/respuestas-coordinacion.md
