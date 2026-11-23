---
name: error-api
description: "Procedimiento para que la API responda con un código de error HTTP que todavía no usa (por ejemplo, 409 o 403): la clase del error, su traducción en el controlador y sus tests. Úsala cuando una spec pida un código de error que no tiene ninguna clase en src/errores/."
---

# Un error nuevo en la API

## Antes de escribir

1. Busca en `src/errores/` si ya hay una clase para ese código HTTP. Si la
   hay, reutilízala y no sigas este procedimiento.
2. Apunta de la spec el código HTTP y el mensaje exacto de cada *edge case*
   que lo usa.

## Al escribir

3. Crea `src/errores/error-<nombre>.js` igual que
   `src/errores/error-validacion.js`: una clase que extiende `Error` y fija
   su `name`.
4. El **servicio** lanza el error con el mensaje exacto de la spec. El
   controlador no decide cuándo hay error: solo lo traduce.
5. En el controlador de la feature, añade la traducción al código HTTP
   **antes** de la respuesta 500 de los errores inesperados, con
   `{ error: error.message }`.
6. Tests: uno unitario del servicio (`toThrow` con el mensaje exacto) y uno
   de integración de la API (código y cuerpo), con el identificador del
   *edge case* al principio del nombre.

## Al terminar

7. Ejecuta `npm test`: los tests anteriores siguen en verde.
8. Di qué ficheros has creado o cambiado.
