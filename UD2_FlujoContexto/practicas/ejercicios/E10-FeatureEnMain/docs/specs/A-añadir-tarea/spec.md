# Spec: Añadir una tarea

## Metadatos

| Campo   | Valor            |
|---------|------------------|
| Feature | Añadir una tarea |
| Estado  | Implementada     |
| Versión | 1.3              |
| Fecha   | AAAA-MM-DD       |
| Autor   | <nombre>         |

---

## Contexto

Los miembros del equipo pueden añadir tareas a la lista compartida
escribiendo un texto. Las tareas nuevas aparecen al final de la lista
como pendientes.

**Historia de usuario:** como miembro del equipo, quiero apuntar una
tarea para que no se pierda en el chat.

**Dependencias:** ninguna (es la primera feature).

---

## Requisitos funcionales

- RF-01: Cuando el usuario envíe el texto de una tarea nueva, el sistema
  deberá guardarla con un identificador único, el texto, el estado
  "pendiente" y la fecha de creación en formato ISO 8601.
- RF-02: Cuando el sistema guarde una tarea nueva, deberá devolverla
  completa como confirmación, con los campos id, text, estado y
  fechaCreacion.
- RF-03: Cuando el sistema confirme la creación de una tarea, la página
  deberá mostrarla al final de la lista sin recargarse.
- RF-04: Cuando el sistema guarde una tarea nueva, deberá guardar el
  texto sin los espacios del principio y del final.

---

## Requisitos no funcionales

- RNF-01: El endpoint de creación deberá responder en menos de 200 ms
  con 1.000 tareas guardadas.
- RNF-02: El texto de una tarea, sin los espacios del principio y del
  final, no podrá superar los 280 caracteres.
- RNF-03: El identificador lo generará el servidor, nunca el cliente.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Añadir una tarea

  Escenario: AC-01 Añadir una tarea desde la página
    Dado que la lista tiene 2 tareas
    Cuando el usuario escribe "Comprar leche" y pulsa "Añadir"
    Entonces la lista tiene 3 tareas
    Y la última tarea es "Comprar leche" con el estado "pendiente"

  Escenario: AC-02 Campo vacío en la página
    Dado que la lista tiene 2 tareas
    Cuando el usuario pulsa "Añadir" con el campo vacío
    Entonces la lista sigue teniendo 2 tareas
    Y el campo sigue vacío

  Escenario: AC-03 Respuesta del servidor al crear una tarea
    Cuando se envía una petición POST /tareas con el texto "Comprar leche"
    Entonces la respuesta tiene el código 201
    Y el cuerpo contiene un id, el texto "Comprar leche", el estado "pendiente" y una fecha en formato ISO 8601

  Escenario: AC-04 Tarea rechazada por el servidor
    Dado que la lista tiene 2 tareas
    Cuando el usuario escribe un texto de 281 caracteres y pulsa "Añadir"
    Entonces la lista sigue teniendo 2 tareas
    Y la página muestra el mensaje "El texto no puede superar 280 caracteres"
    Y el campo conserva el texto escrito
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si el texto está vacío o solo tiene espacios, entonces el
  sistema deberá responder 400 con
  { error: "El texto de la tarea no puede estar vacío" }.
- EC-02: Si el texto supera 280 caracteres, entonces el sistema deberá
  responder 400 con { error: "El texto no puede superar 280 caracteres" }.
- EC-03: Si el servidor no puede guardar la tarea, entonces deberá
  responder 500 con { error: "Error al guardar la tarea" }.
- EC-04: Si el cuerpo de la petición trae campos que no se esperan,
  entonces el sistema deberá ignorarlos.
- EC-05: Si el cuerpo no incluye el campo text, o no es un texto,
  entonces el sistema deberá responder 400 con
  { error: "El campo text es obligatorio y debe ser texto" }.
- EC-06: Si el servidor rechaza la tarea, entonces la página deberá
  mostrar el mensaje de error de la respuesta, sin añadir nada a la
  lista y sin borrar el texto del campo.

---

## Fuera de alcance

- Asignar la tarea a una persona.
- Fecha límite o prioridad.
- Editar el texto de una tarea creada (será otra feature).
- Ordenar las tareas de otra forma que no sea por fecha de creación.

---

## Referencias

- docs/prd.md
