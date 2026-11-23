# Spec: Borrar una tarea

## Metadatos

| Campo   | Valor            |
|---------|------------------|
| Feature | Borrar una tarea |
| Estado  | Implementada     |
| Versión | 1.0              |
| Fecha   | AAAA-MM-DD       |
| Autor   | <nombre>         |

---

## Contexto

Los miembros del equipo borran las tareas que ya no tienen sentido (una
tarea repetida, una que se escribió mal), para que la lista no se llene
de ruido.

**Historia de usuario:** como miembro del equipo, quiero borrar una
tarea que sobra para que la lista solo tenga lo que hay que hacer.

**Dependencias:** feature A (las tareas) y feature B (la lista en la
página).

Una tarea se borra con `DELETE /tareas/:id`.

---

## Requisitos funcionales

- RF-01: Cuando se borre una tarea existente, el sistema deberá
  eliminarla, de forma que deje de aparecer en la lista.
- RF-02: Cuando el sistema borre una tarea, deberá responder 204 sin
  cuerpo.
- RF-03: Mientras la página muestre una tarea, deberá mostrar junto a
  ella un botón "Borrar".
- RF-04: Cuando el usuario pulse "Borrar", la página deberá quitar esa
  tarea de la lista sin recargarse.

---

## Requisitos no funcionales

- RNF-01: La petición de borrar deberá responder en menos de 200 ms con
  1.000 tareas guardadas.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Borrar una tarea

  Escenario: AC-01 Borrar una tarea por la API
    Dado que existen las tareas "Comprar pan" y "Regar las plantas"
    Cuando se envía una petición DELETE /tareas con el id de "Comprar pan"
    Entonces la respuesta tiene el código 204
    Y la lista de tareas solo contiene "Regar las plantas"

  Escenario: AC-02 Borrar una tarea desde la página
    Dado que la página muestra las tareas "Comprar pan" y "Regar las plantas"
    Cuando el usuario pulsa "Borrar" junto a "Comprar pan"
    Entonces la lista deja de mostrar "Comprar pan" sin recargar la página
    Y sigue mostrando "Regar las plantas"

  Escenario: AC-03 Borrar la última tarea
    Dado que la página muestra una sola tarea
    Cuando el usuario la borra
    Entonces la lista no muestra ninguna tarea
    Y la página muestra el mensaje "Todavía no hay tareas"
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si la tarea no existe, entonces el sistema deberá responder 404
  con { error: "La tarea no existe" }.
- EC-02: Si el servidor no puede borrar la tarea, entonces deberá
  responder 500 con { error: "Error al borrar la tarea" }, y la tarea no
  se borrará.
- EC-03: Si el servidor responde con un error al borrar, entonces la
  página deberá mostrar el mensaje de error de la respuesta y no quitará
  la tarea de la lista.

---

## Fuera de alcance

- Pedir confirmación antes de borrar.
- Deshacer un borrado o una papelera.
- Borrar varias tareas a la vez.
- Restringir quién puede borrar: el PRD deja fuera los permisos.

---

## Referencias

- docs/prd.md
- docs/specs/B-ver-lista/spec.md
