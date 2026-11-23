# Spec: Marcar una tarea como hecha

## Metadatos

| Campo   | Valor                       |
|---------|-----------------------------|
| Feature | Marcar una tarea como hecha |
| Estado  | 🔜 Aprobada                 |
| Versión | 1.0                         |

---

## Contexto

Los miembros del equipo marcan una tarea como hecha cuando la terminan, para que la lista diga qué queda por hacer.

**Historia de usuario:** como miembro del equipo, quiero marcar una tarea como hecha para saber qué queda pendiente.

**Dependencias:** features A y B. Una tarea se marca con `POST /tareas/:id/hecha`.

---

## Requisitos funcionales

- RF-01: Cuando se marque como hecha una tarea existente, el sistema deberá cambiar su estado a `hecha`.
- RF-02: Cuando se marque una tarea como hecha, el sistema deberá responder 200 con la tarea, con los campos `id`, `text`, `estado` y `fechaCreacion`.
- RF-03: Cuando se marque una tarea como hecha, el sistema no deberá cambiar su texto ni su fecha de creación.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Marcar una tarea como hecha

  Antecedentes:
    Dado que existe la tarea "Comprar leche" en estado "pendiente"

  Escenario: AC-01 Marcar una tarea como hecha
    Cuando se marca como hecha la tarea "Comprar leche"
    Entonces la respuesta tiene el código 200
    Y la respuesta es la tarea "Comprar leche" con el estado "hecha"

  Escenario: AC-02 La lista refleja el cambio
    Cuando se marca como hecha la tarea "Comprar leche"
    Y se pide la lista de tareas
    Entonces la lista contiene la tarea "Comprar leche" con el estado "hecha"
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si la tarea no existe, entonces el sistema deberá responder 404 con `{ error: "La tarea no existe" }`.
- EC-02: Si la tarea ya está hecha, entonces el sistema deberá responder 200 con la tarea, sin cambiarla.

---

## Fuera de alcance

- Desmarcar una tarea hecha.
- Los botones de la página.
- Guardar la fecha en que se hizo.
