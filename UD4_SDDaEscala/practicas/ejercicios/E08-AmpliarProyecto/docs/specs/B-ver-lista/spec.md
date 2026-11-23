# Spec: Ver la lista de tareas

## Metadatos

| Campo   | Valor                  |
|---------|------------------------|
| Feature | Ver la lista de tareas |
| Estado  | Implementada           |
| Versión | 1.1                    |
| Fecha   | AAAA-MM-DD             |
| Autor   | <nombre>               |

---

## Contexto

Al abrir la página, los miembros del equipo ven todas las tareas de la
lista compartida, en el orden en que se añadieron.

**Historia de usuario:** como miembro del equipo, quiero ver todas las
tareas al abrir la página para saber qué queda por hacer.

**Dependencias:** feature A (las tareas se crean con ella).

---

## Requisitos funcionales

- RF-01: Cuando se pida la lista de tareas, el sistema deberá devolver
  todas las tareas guardadas, cada una con los campos id, text, estado y
  fechaCreacion, de la más antigua a la más reciente.
- RF-02: Cuando el usuario abra la página, la página deberá mostrar
  todas las tareas guardadas, con su texto y su estado, en el orden de
  RF-01.
- RF-03: Mientras no haya ninguna tarea guardada, la página deberá
  mostrar el mensaje "Todavía no hay tareas".

---

## Requisitos no funcionales

- RNF-01: La petición de la lista deberá responder en menos de 200 ms
  con 1.000 tareas guardadas.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Ver la lista de tareas

  Escenario: AC-01 Ver las tareas al abrir la página
    Dado que se han añadido las tareas "Comprar leche", "Pagar la luz" y "Llamar al fontanero", en ese orden
    Cuando el usuario abre la página
    Entonces la lista muestra las 3 tareas en ese orden
    Y cada tarea muestra su texto y el estado "pendiente"

  Escenario: AC-02 Lista vacía
    Dado que no hay ninguna tarea
    Cuando el usuario abre la página
    Entonces la página muestra el mensaje "Todavía no hay tareas"
    Y la lista no muestra ninguna tarea

  Escenario: AC-03 Respuesta del servidor
    Dado que se han añadido las tareas "Comprar leche", "Pagar la luz" y "Llamar al fontanero", en ese orden
    Cuando se envía una petición GET /tareas
    Entonces la respuesta tiene el código 200
    Y el cuerpo es una lista con las 3 tareas en ese orden, cada una con id, text, estado y fechaCreacion

  Escenario: AC-04 La primera tarea
    Dado que no hay ninguna tarea
    Y el usuario tiene la página abierta
    Cuando el usuario añade la tarea "Comprar leche"
    Entonces deja de verse el mensaje "Todavía no hay tareas"
    Y la lista muestra la tarea "Comprar leche"
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si no hay ninguna tarea guardada, entonces el sistema deberá
  responder 200 con una lista vacía.
- EC-02: Si el servidor no puede obtener las tareas, entonces deberá
  responder 500 con { error: "Error al obtener las tareas" }.
- EC-03: Si el servidor responde con un error al pedir la lista,
  entonces la página deberá mostrar el mensaje de error de la respuesta,
  sin mostrar el mensaje "Todavía no hay tareas".
- EC-04: Si la página no recibe respuesta del servidor al pedir la
  lista, entonces deberá mostrar el mensaje "No se ha podido conectar
  con el servidor", sin mostrar el mensaje "Todavía no hay tareas".

---

## Fuera de alcance

- Paginar la lista o limitar cuántas tareas se muestran.
- Filtrar las tareas u ordenarlas de otra forma.
- Que la lista se actualice sola cuando otra persona añade una tarea:
  hay que recargar la página.
- Marcar una tarea como hecha (feature C) o borrarla (feature D).
