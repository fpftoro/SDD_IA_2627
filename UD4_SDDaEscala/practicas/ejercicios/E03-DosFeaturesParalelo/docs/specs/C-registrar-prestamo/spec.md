# Spec: Registrar el préstamo

## Metadatos

| Campo   | Valor                |
|---------|----------------------|
| Feature | Registrar el préstamo |
| Estado  | 🔜 Aprobada          |
| Versión | 1.0                  |

---

## Contexto

Cuando alguien se lleva un portátil de un carro, hay que anotarlo para saber quién lo tiene. Hoy se apunta en una hoja de papel y a menudo no consta si el cargador salió con el portátil.

**Historia de usuario:** como profesor, quiero registrar que me llevo un portátil para que conste quién lo tiene y si se lleva el cargador.

**Dependencias:** feature A (Consultar los portátiles). Pueden registrar un préstamo todas las personas que identifica el sistema del centro.

Un préstamo se registra con `POST /api/prestamos` y este cuerpo:

```json
{ "portatil": 4, "cargador": true }
```

---

## Requisitos funcionales

- RF-01: Cuando un usuario identificado registre el préstamo de un portátil disponible, el sistema deberá guardar el préstamo con un identificador, el portátil, el usuario, la fecha de salida, si el cargador sale con él y el estado `activo`.
- RF-02: Cuando se registre un préstamo, el sistema deberá responder 201 con el préstamo creado, con los campos `id`, `portatil`, `profesor`, `fechaSalida`, `cargador` y `estado`.
- RF-03: Cuando se registre un préstamo, el sistema deberá dejar el portátil como `prestado`.

## Requisitos no funcionales

- RNF-01: El profesor del préstamo se tomará de la identificación del sistema del centro, nunca del cuerpo de la petición.
- RNF-02: La fecha de salida es la de hoy en `Europe/Madrid`, en formato AAAA-MM-DD, y la pone el sistema, no el cliente.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Registrar el préstamo

  Antecedentes:
    Dado que hoy es el lunes 2027-03-01
    Y que Ana es una profesora identificada
    Y que el portátil 4 está disponible

  Escenario: AC-01 Registrar el préstamo de un portátil disponible
    Cuando Ana registra el préstamo del portátil 4 con cargador
    Entonces la respuesta tiene el código 201
    Y la respuesta es un préstamo activo del portátil 4, a nombre de Ana, con salida el 2027-03-01
    Y el portátil 4 queda como prestado

  Escenario: AC-02 Registrar el préstamo de un portátil que ya está prestado
    Dado que el portátil 2 está prestado
    Cuando Ana registra el préstamo del portátil 2 con cargador
    Entonces la respuesta tiene el código 409
    Y el cuerpo contiene el error "El portátil no está disponible"
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si la petición no trae la identificación del sistema del centro, entonces el sistema deberá responder 401 con `{ error: "Tienes que identificarte" }`.
- EC-02: Si el portátil no existe, entonces el sistema deberá responder 404 con `{ error: "El portátil no existe" }`.
- EC-03: Si el portátil no está disponible (prestado o averiado), entonces el sistema deberá responder 409 con `{ error: "El portátil no está disponible" }` y no deberá cambiar nada.
- EC-04: Si `portatil` no es un número entero positivo o `cargador` no es verdadero o falso, entonces el sistema deberá responder 400 con `{ error: "Los datos del préstamo no tienen el formato correcto" }`.
- EC-05: Si falta `portatil` o `cargador`, entonces el sistema deberá responder 400 con `{ error: "Los campos portatil y cargador son obligatorios" }`.
- EC-06: Si el cuerpo trae un campo `profesor` u otros campos que no se esperan, entonces el sistema deberá ignorarlos.

---

## Fuera de alcance

- Comprobar que el portátil estaba reservado.
- Anotar incidencias (feature E).
