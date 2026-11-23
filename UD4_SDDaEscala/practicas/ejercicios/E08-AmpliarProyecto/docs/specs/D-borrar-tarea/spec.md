# Spec: Borrar una tarea

## Metadatos

| Campo   | Valor            |
|---------|------------------|
| Feature | Borrar una tarea |
| Estado  | 🔜 Aprobada      |
| Versión | 1.0              |

---

## Contexto

Los miembros del equipo borran las tareas que sobran (una repetida, una mal escrita) para que la lista no se llene de ruido.

**Historia de usuario:** como miembro del equipo, quiero borrar una tarea que sobra para que la lista solo tenga lo que hay que hacer.

**Dependencias:** features A y B. Una tarea se borra con `DELETE /tareas/:id`.

---

## Requisitos funcionales

- RF-01: Cuando se borre una tarea existente, el sistema deberá eliminarla, de modo que deje de aparecer en la lista.
- RF-02: Cuando el sistema borre una tarea, deberá responder 204 sin cuerpo.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Borrar una tarea

  Antecedentes:
    Dado que existen las tareas "Comprar leche" y "Pagar la luz"

  Escenario: AC-01 Borrar una tarea
    Cuando se borra la tarea "Comprar leche"
    Entonces la respuesta tiene el código 204
    Y la respuesta no tiene cuerpo

  Escenario: AC-02 La tarea borrada desaparece de la lista
    Cuando se borra la tarea "Comprar leche"
    Y se pide la lista de tareas
    Entonces la lista contiene solo la tarea "Pagar la luz"
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si la tarea no existe, entonces el sistema deberá responder 404 con `{ error: "La tarea no existe" }`.
- EC-02: Si se borra dos veces la misma tarea, entonces la segunda vez el sistema deberá responder 404 con `{ error: "La tarea no existe" }`.

---

## Fuera de alcance

- Deshacer el borrado.
- Borrar varias tareas a la vez.
- Los botones de la página.
