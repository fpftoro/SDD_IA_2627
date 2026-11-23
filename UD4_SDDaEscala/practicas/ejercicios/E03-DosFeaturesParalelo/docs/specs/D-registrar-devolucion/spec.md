# Spec: Registrar la devolución

## Metadatos

| Campo   | Valor                  |
|---------|------------------------|
| Feature | Registrar la devolución |
| Estado  | 🔜 Aprobada            |
| Versión | 1.0                    |

---

## Contexto

Cuando alguien devuelve un portátil, hay que anotarlo para que vuelva a estar disponible y para saber si falta el cargador.

**Historia de usuario:** como profesor, quiero registrar la devolución de un portátil para que conste que ya no lo tengo y si devuelvo el cargador.

**Dependencias:** feature A (Consultar los portátiles). Un préstamo tiene los campos `id`, `portatil`, `profesor`, `fechaSalida`, `cargador` y `estado` (`activo` o `devuelto`). Pueden registrar una devolución todas las personas que identifica el sistema del centro.

Una devolución se registra con `POST /api/prestamos/:id/devolucion` y este cuerpo:

```json
{ "cargadorDevuelto": true }
```

---

## Requisitos funcionales

- RF-01: Cuando un usuario identificado registre la devolución de un préstamo activo, el sistema deberá marcar el préstamo como `devuelto` y guardar la fecha de devolución y si el cargador se ha devuelto.
- RF-02: Cuando se registre una devolución, el sistema deberá responder 200 con el préstamo, con los campos `id`, `portatil`, `profesor`, `fechaSalida`, `fechaDevolucion`, `cargadorDevuelto` y `estado`.
- RF-03: Cuando se registre una devolución, el sistema deberá dejar el portátil como `disponible`.

## Requisitos no funcionales

- RNF-01: La fecha de devolución es la de hoy en `Europe/Madrid`, en formato AAAA-MM-DD, y la pone el sistema, no el cliente.
- RNF-02: Un préstamo nunca se borra: se cambia su estado.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Registrar la devolución

  Antecedentes:
    Dado que hoy es el miércoles 2027-03-03
    Y que Ana es una profesora identificada
    Y que Ana tiene un préstamo activo, el 1, del portátil 4 desde el 2027-03-01

  Escenario: AC-01 Devolver un portátil con su cargador
    Cuando Ana registra la devolución del préstamo 1 con el cargador
    Entonces la respuesta tiene el código 200
    Y la respuesta es el préstamo 1 devuelto el 2027-03-03, con el cargador devuelto
    Y el portátil 4 queda como disponible

  Escenario: AC-02 Devolver un préstamo que ya está devuelto
    Dado que el préstamo 1 ya está devuelto
    Cuando Ana registra la devolución del préstamo 1 con el cargador
    Entonces la respuesta tiene el código 409
    Y el cuerpo contiene el error "El préstamo ya está devuelto"
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si la petición no trae la identificación del sistema del centro, entonces el sistema deberá responder 401 con `{ error: "Tienes que identificarte" }`.
- EC-02: Si el préstamo no existe, entonces el sistema deberá responder 404 con `{ error: "El préstamo no existe" }`.
- EC-03: Si el préstamo ya está devuelto, entonces el sistema deberá responder 409 con `{ error: "El préstamo ya está devuelto" }` y no deberá cambiar nada.
- EC-04: Si el identificador del préstamo no es un número entero positivo, entonces el sistema deberá responder 400 con `{ error: "El identificador debe ser un número entero positivo" }`.
- EC-05: Si `cargadorDevuelto` falta o no es verdadero o falso, entonces el sistema deberá responder 400 con `{ error: "El campo cargadorDevuelto es obligatorio y debe ser verdadero o falso" }`.
- EC-06: Si el cuerpo trae otros campos que no se esperan, entonces el sistema deberá ignorarlos.

---

## Fuera de alcance

- Anotar una incidencia por el cargador que falta (feature E).
- Devolver un portátil que no estaba prestado a quien lo devuelve.
