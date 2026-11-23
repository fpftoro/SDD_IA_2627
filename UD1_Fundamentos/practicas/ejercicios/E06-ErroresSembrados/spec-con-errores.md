# Spec: Anotar una incidencia

## Metadatos

| Campo   | Valor               |
|---------|---------------------|
| Feature | Anotar una incidencia |
| Versión | 1.0                 |
| Autor   | <nombre>            |

---

## Contexto

Cuando un profesor detecta un problema en un portátil (no enciende, le
falta el cargador, tiene la pantalla rota…), tiene que poder anotarlo para
que la coordinación TIC lo sepa y nadie se lleve a clase un portátil que no
funciona.

**Historia de usuario:** como profesor, quiero anotar que un portátil no
enciende para que nadie se lo lleve a clase.

---

## Requisitos funcionales

- RF-01: El sistema deberá registrar la incidencia, marcar el portátil
  como averiado y avisar por correo a la coordinación TIC.
- RF-02: Cada incidencia tendrá un tipo, elegido de una lista adecuada, y
  una descripción.
- RF-03: Crear en `src/servicios/incidencias.js` una función
  `anotarIncidencia(portatilId, tipo, texto)` que haga
  `incidencias.push({ portatilId, tipo, texto })` y después
  `portatiles.find((p) => p.id === portatilId).estado = 'averiado'`.
- RF-04: El sistema guardará el nombre del alumno que estaba usando el
  portátil cuando se produjo la incidencia.
- RF-05: Si el portátil ya tiene una incidencia abierta, se hará lo que se
  considere oportuno.
- RF-06: Los errores deberán manejarse correctamente.

---

## Requisitos no funcionales

- RNF-01: Anotar una incidencia debe ser rápido.
- RNF-02: El sistema deberá ser seguro.

---

## Criterios de aceptación

- AC-01: Dado un portátil disponible, cuando un profesor anota que no
  enciende, entonces la incidencia queda registrada.
- AC-02: La pantalla para anotar incidencias debe ser intuitiva.
- AC-03: Se comprueba que la incidencia se guarda bien, que el portátil
  cambia de estado, que llega el correo y que aparece en el listado de la
  coordinación TIC.

---

## Edge cases y comportamiento ante errores

Los habituales.

---

## Pasos de implementación

1. Crear la tabla `incidencias` en la base de datos.
2. Programar el endpoint `POST /api/incidencias`.
3. Añadir un botón «Anotar incidencia» en la ficha del portátil.
4. Configurar el envío de correos con la librería que mejor funcione.
