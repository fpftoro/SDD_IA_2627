# Spec: Marcar una tarea como hecha

## Metadatos

| Campo   | Valor                       |
|---------|-----------------------------|
| Feature | Marcar una tarea como hecha |
| Estado  | Implementada                |
| Versión | 1.1                         |
| Fecha   | AAAA-MM-DD                  |
| Autor   | <nombre>                    |

---

## Contexto

Los miembros del equipo marcan como hecha una tarea de la lista cuando la
terminan, y pueden desmarcarla si se equivocan. Así todos saben qué queda
por hacer sin preguntarlo en el chat.

**Historia de usuario:** como miembro del equipo, quiero marcar una tarea
como hecha para que los demás sepan que está resuelta.

**Dependencias:** feature A (Añadir una tarea) y feature B (Ver la lista de
tareas).

Una tarea se marca o se desmarca con `PATCH /tareas/:id` y el cuerpo
`{ "hecha": true }` o `{ "hecha": false }`.

---

## Requisitos funcionales

- RF-01: Cuando se marque como hecha una tarea pendiente, el sistema
  deberá cambiar su estado a "hecha".
- RF-02: Cuando se marque como hecha una tarea pendiente, el sistema
  deberá guardar la fecha y hora en que se completó, en el campo
  fechaCompletado.
- RF-03: Cuando se desmarque una tarea hecha, el sistema deberá cambiar su
  estado a "pendiente".
- RF-04: Cuando se desmarque una tarea hecha, el sistema deberá dejar
  fechaCompletado a null.
- RF-05: Cuando se marque o se desmarque una tarea, el sistema deberá
  responder 200 con la tarea actualizada.
- RF-06: Mientras una tarea esté hecha, la página deberá mostrar su texto
  tachado.
- RF-07: Cuando el usuario marque o desmarque una tarea en la página, la
  página deberá mostrar el cambio sin recargarse.

---

## Requisitos no funcionales

- RNF-01: El sistema deberá responder a un cambio de estado en menos de
  200 ms con 1.000 tareas guardadas.
- RNF-02: La fecha en que se completó una tarea la pone el servidor, nunca
  el cliente.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Marcar una tarea como hecha

  Antecedentes:
    Dado que existe la tarea "Comprar leche" en estado "pendiente"

  Escenario: AC-01 Marcar una tarea pendiente
    Cuando se marca "Comprar leche" como hecha
    Entonces la respuesta tiene el código 200
    Y la tarea tiene el estado "hecha"
    Y la tarea tiene una fecha de completado en formato ISO 8601

  Escenario: AC-02 Desmarcar una tarea hecha
    Dado que "Comprar leche" está hecha
    Cuando se desmarca
    Entonces la respuesta tiene el código 200
    Y la tarea tiene el estado "pendiente"
    Y la tarea no tiene fecha de completado

  Escenario: AC-03 Marcar una tarea que ya está hecha
    Dado que "Comprar leche" está hecha
    Cuando se vuelve a marcar como hecha
    Entonces la respuesta tiene el código 200
    Y la fecha de completado no cambia

  Esquema del escenario: AC-04 Valor de hecha no válido
    Cuando se envía el valor <valor> en el campo hecha de "Comprar leche"
    Entonces la respuesta tiene el código 400
    Y la tarea sigue en estado "pendiente"

    Ejemplos:
      | valor |
      | "sí"  |
      | 1     |
      | null  |

  Escenario: AC-05 Ver una tarea hecha en la página
    Cuando un miembro del equipo marca "Comprar leche" en la página
    Entonces su texto aparece tachado sin que la página se recargue
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si la tarea no existe, entonces el sistema deberá responder 404
  con { error: "La tarea no existe" }.
- EC-02: Si el cuerpo no incluye el campo hecha, o su valor no es true ni
  false, entonces el sistema deberá responder 400 con
  { error: "El campo hecha es obligatorio y debe ser true o false" }.
- EC-03: Si se marca como hecha una tarea que ya está hecha, entonces el
  sistema deberá responder 200 sin cambiar la fecha en que se completó.
- EC-04: Si se desmarca una tarea que ya está pendiente, entonces el
  sistema deberá responder 200 sin cambiar nada.
- EC-05: Si dos miembros del equipo cambian a la vez el estado de la misma
  tarea, entonces el sistema deberá aplicar la última petición que reciba y
  responder 200 a las dos.
- EC-06: Si el cuerpo incluye otros campos (por ejemplo, text), entonces el
  sistema deberá ignorarlos: esta feature no cambia el texto.
- EC-07: Si el servidor no puede guardar el cambio, entonces el sistema
  deberá responder 500 con { error: "Error al guardar la tarea" } y la
  tarea no cambiará.
- EC-08: Si la tarea no existe y el campo hecha no es válido, entonces el
  sistema deberá responder el error de EC-02.

---

## Fuera de alcance

- Guardar quién marcó la tarea: el PRD deja fuera los usuarios.
- Limitar quién puede marcar o desmarcar una tarea: el PRD deja fuera los
  permisos.
- El historial de cambios de estado de una tarea.
- Marcar varias tareas a la vez.
- Ocultar o filtrar las tareas hechas en la lista.
- Avisar al equipo cuando se completa una tarea (el PRD deja fuera las
  notificaciones).

---

## Referencias

- docs/prd.md
- docs/specs/A-añadir-tarea/spec.md
