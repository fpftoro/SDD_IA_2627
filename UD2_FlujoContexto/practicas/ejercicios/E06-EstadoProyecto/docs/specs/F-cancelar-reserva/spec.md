# Spec: Cancelar una reserva

## Metadatos

| Campo   | Valor               |
|---------|---------------------|
| Feature | Cancelar una reserva |
| Estado  | En revisión         |
| Versión | 1.0                 |
| Fecha   | AAAA-MM-DD          |
| Autor   | <nombre>            |

---

## Contexto

Un profesor que ha reservado un carro y ya no lo necesita tiene que poder
cancelar la reserva para que otro compañero lo use. Sin esta feature, una
reserva equivocada deja el carro bloqueado toda la hora.

**Historia de usuario:** como profesor, quiero cancelar mi reserva para que
otro compañero pueda usar el carro.

**Dependencias:** feature B (Reservar un carro).

La cancelación se hace con `DELETE /api/reservas/:id`.

---

## Requisitos funcionales

- RF-01: Cuando el profesor que hizo una reserva la cancele, el sistema
  deberá cambiar su estado a "cancelada".
- RF-02: El sistema deberá liberar el hueco de forma eficiente.
- RF-03: Cuando se cancele una reserva, el sistema deberá ejecutar
  `reservas.get(id).estado = 'cancelada'` y después llamar a
  `guardarReservas()`.
- RF-04: La coordinación TIC puede cancelar cualquier reserva.

---

## Requisitos no funcionales

- RNF-01: La cancelación debe ser rápida.
- RNF-02: Las reservas se guardarán en un `Map` de JavaScript indexado por
  `id`, para que la búsqueda sea O(1).

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Cancelar una reserva

  Escenario: AC-01 Cancelar una reserva propia
    Dado que un profesor tiene reservado el carro A el próximo martes a 3.ª hora
    Cuando cancela esa reserva
    Entonces la respuesta tiene el código 200
    Y la reserva tiene el estado "cancelada"
    Y el carro A queda libre el próximo martes a 3.ª hora

  Escenario: AC-02 Cancelar desde el calendario
    Dado que abro el calendario en http://localhost:3000/reservas
    Cuando pulso el botón rojo «Cancelar» de mi reserva
    Y confirmo en la ventana emergente
    Entonces la casilla se pone gris

  Escenario: AC-03 Cancelar una reserva que no existe
    Cuando un profesor cancela la reserva 9999
    Entonces se gestiona correctamente
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si la reserva no existe, entonces el sistema deberá responder 404
  con { error: "La reserva no existe" }.
- EC-02: Si quien cancela no es quien hizo la reserva ni la coordinación
  TIC, entonces el sistema deberá responder 403 con
  { error: "No puedes cancelar esta reserva" }.
- EC-03: Si la reserva ya está cancelada, el sistema deberá avisar al
  usuario.
- EC-04: Si la cancelación es de última hora, se gestionará adecuadamente.

---

## Fuera de alcance

- Avisar por correo al profesor cuando la coordinación TIC cancela su
  reserva.
- Cancelar varias reservas a la vez.
- Deshacer una cancelación.
