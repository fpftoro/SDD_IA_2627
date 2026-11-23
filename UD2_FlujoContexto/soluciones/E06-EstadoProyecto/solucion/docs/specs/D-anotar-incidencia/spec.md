# Spec: Anotar una incidencia

## Metadatos

| Campo   | Valor                 |
|---------|-----------------------|
| Feature | Anotar una incidencia |
| Estado  | Aprobada              |
| Versión | 1.0                   |
| Fecha   | AAAA-MM-DD            |
| Autor   | <nombre>              |

---

## Contexto

Cuando un profesor detecta un problema en un portátil (no enciende, le
falta el cargador, tiene la pantalla rota…), lo anota para que la
coordinación TIC lo sepa y nadie se lleve a clase un portátil que no
funciona.

**Historia de usuario:** como profesor, quiero anotar que un portátil no
enciende para que nadie se lo lleve a clase.

**Dependencias:** feature A (Consultar los portátiles). La feature E
(Registrar la devolución, `docs/specs/E-registrar-devolucion/`) usará estas
incidencias para no dejar disponible un portátil averiado.

---

## Requisitos funcionales

- RF-01: El sistema deberá registrar una incidencia de un portátil con un
  identificador, el portátil, el tipo, la descripción, el profesor que la
  anota y la fecha y hora de creación.
- RF-02: El tipo de incidencia deberá ser uno de estos cuatro: averia,
  falta-cargador, dano-fisico u otro.
- RF-03: Si la incidencia es de tipo averia o dano-fisico, el sistema
  deberá cambiar el estado del portátil a averiado.
- RF-04: Si la incidencia es de tipo falta-cargador u otro, el sistema no
  deberá cambiar el estado del portátil.
- RF-05: El sistema deberá devolver la incidencia creada como
  confirmación.

La incidencia se anota con `POST /api/incidencias` y este cuerpo:

```json
{ "portatilId": 1, "tipo": "averia", "descripcion": "No enciende" }
```

---

## Requisitos no funcionales

- RNF-01: El endpoint de incidencias responderá en menos de 300 ms con
  1.000 incidencias guardadas.
- RNF-02: El profesor de la incidencia se toma del usuario que ha iniciado
  sesión, nunca del cuerpo de la petición.
- RNF-03: La descripción es obligatoria y tiene como mucho 500 caracteres.
- RNF-04: La incidencia no tiene ningún campo para identificar al alumno
  que usaba el portátil (la aplicación no guarda datos personales del
  alumnado).

---

## Criterios de aceptación

- AC-01: Dado el portátil P-01 disponible, cuando un profesor anota una
  incidencia de tipo averia con la descripción "No enciende", entonces
  recibe un 201 con la incidencia creada y P-01 pasa a estar averiado.
- AC-02: Dado el portátil P-04 disponible, cuando un profesor anota una
  incidencia de tipo falta-cargador, entonces recibe un 201 y P-04 sigue
  disponible.
- AC-03: Dado un portátil disponible, cuando un profesor anota una
  incidencia de tipo "roto", entonces recibe un 400 y no se crea ninguna
  incidencia.

---

## Edge cases y comportamiento ante errores

- EC-01: Si falta portatilId, tipo o descripcion, el sistema responderá
  400 con { error: "Los campos portatilId, tipo y descripcion son obligatorios" }.
- EC-02: Si el portátil no existe, responderá 404 con
  { error: "El portátil no existe" }.
- EC-03: Si el tipo no es uno de los cuatro de RF-02, responderá 400 con
  { error: "El tipo de incidencia no es válido" }.
- EC-04: Si la descripción está vacía o solo tiene espacios, responderá
  400 con { error: "La descripción es obligatoria" }.
- EC-05: Si la descripción supera 500 caracteres, responderá 400 con
  { error: "La descripción no puede superar 500 caracteres" }.
- EC-06: Si el portátil ya está averiado y se anota otra incidencia de
  tipo averia o dano-fisico, la incidencia se registra y el portátil sigue
  averiado.
- EC-07: Si el portátil ya tiene una incidencia abierta del mismo tipo, el
  sistema registrará una nueva.
- EC-08: Si el portátil está prestado cuando se anota una incidencia de
  tipo averia, el sistema lo cambiará a averiado en ese momento.
- EC-09: Si no se puede guardar la incidencia, responderá 500 con
  { error: "No se ha podido guardar la incidencia" } y el estado del
  portátil no cambiará.

---

## Fuera de alcance

- Avisos por correo a la coordinación TIC (por ahora no los quiere).
- El listado de incidencias para la coordinación TIC (será otra feature).
- Resolver o cerrar incidencias y seguir la reparación (épico de
  mantenimiento, fuera de este PRD).
- Adjuntar fotos a la incidencia.
- Anotar qué alumno estaba usando el portátil.

---

## Referencias

- docs/prd.md
- constitution.md
