# Seis diagnósticos

## Diagnósticos

| Caso | Diagnóstico | Por qué | Dónde se corrige | Primer paso |
|------|-------------|---------|------------------|-------------|
| 1 | No hay fallo | ¿La spec lo decide? Sí, claramente: EC-01 pide el estado «escrito exactamente así», y el código responde 400 | Nada. Si se quiere aceptar mayúsculas, índice de features (un cambio de A) | Responder al profesor con la spec; si la coordinación quiere mayúsculas, anotar el cambio para replanificar |
| 2 | Error de implementación | La spec (EC-02) y el plan (D-02) lo dicen bien; el controlador devuelve `null` con 200 | Código | Un test `A-EC-02` que pide `/api/portatiles/99` y espera 404 con el mensaje: debe fallar |
| 3 | Error del plan | La spec (RNF-02) decide la hora peninsular; el plan (D-04) usa la fecha UTC y el código lo obedece | Plan, y después código y test | Corregir D-04 (fecha de hoy en `Europe/Madrid`) con el motivo y la alternativa descartada |
| 4 | Hueco en la spec | ¿La spec lo decide? No: ninguna spec dice qué pasa con un préstamo abierto si el portátil se avería. Y era parte de la feature E | Spec de E (versión nueva), después plan, tasks, tests y código | Preguntar a la coordinación TIC qué debe pasar con el préstamo y escribirlo como *edge case* |
| 5 | Error de implementación | EC-02 decide el mensaje; el código responde `Conflict`. El test no lo detecta porque solo comprueba el código | Código y test | Añadir al test la comprobación del cuerpo exacto: debe fallar |
| 6 | Petición nueva | ¿Era parte de la feature? No: el PRD deja fuera las notificaciones | Índice de features (o PRD, si se decide incluirlas) | Anotarla para la replanificación; no tocar B |
| 7 | Spec ambigua | La spec lo decide, pero «ese día» de EC-02 contradice las franjas de RF-01: admite dos lecturas | Spec (aclarar EC-02: «en esa fecha y franja»), después test y código | Preguntar qué se quiere y aclarar EC-02 en una versión nueva |
| 8 | Test que no comprueba lo que dice | El código cumple EC-04 (comprobado a mano), pero el test sustituye el servicio: comprueba el *mock* | Test | Reescribir el test simulando solo el repositorio (o con datos sin averiados) y comprobar que falla si se rompe el filtro |
| 9 | Test que no comprueba lo que dice | El código cumple EC-05; el test no comprueba el mensaje | Test | Añadir `toEqual({ error: 'Error al consultar los portátiles' })` y romper el mensaje a propósito para ver que falla |
| 10 | Error del plan | La spec dice de 1 a 6; D-03 decide de 1 a 5 y el código lo sigue | Plan, después código; los tests de los límites (6 se acepta, 7 no) | Corregir D-03 en el plan |
| 11 | Hueco en la spec | Ninguna spec de C decide qué pasa con un portátil averiado; era parte de registrar un préstamo | Spec de C (versión nueva) | Decidir con la coordinación y escribir el *edge case* (por ejemplo, 409 con un mensaje) |
| 12 | Spec ambigua | «Caracteres» admite varias lecturas (bytes, puntos de código, como los ve el usuario); el código eligió bytes | Spec (aclarar), después plan, test con tildes y código | Aclarar en la spec cómo se cuentan los caracteres |

## Dos casos, de cerca

### Error de implementación: caso 2

1. Escribo el test que reproduce el fallo, con el identificador:

   ```javascript
   test('A-EC-02: responde 404 si el portátil no existe', async () => {
     const respuesta = await request(app).get('/api/portatiles/99');

     expect(respuesta.status).toBe(404);
     expect(respuesta.body).toEqual({ error: 'El portátil no existe' });
   });
   ```

2. Lo ejecuto: falla con `expected 200 to be 404`. Es el rojo correcto.
3. Corrijo el código: el servicio lanza `ErrorNoEncontrado` y el controlador responde 404, como dice D-02.
4. Ejecuto todos los tests: en verde.
5. La spec no cambia. El plan tampoco: ya lo decía. Me pregunto por qué no había test: la estrategia de pruebas del plan tenía la fila, así que faltó en la revisión de los tests.

### Hueco en la spec: caso 4

1. Paro: no toco el código.
2. Pregunto a la coordinación TIC. Supongamos que decide que el préstamo se cierra al anotar la avería, con la fecha de la incidencia.
3. Lo escribo en la spec de E, versión nueva, en `En revisión` hasta aprobarla:

   ```markdown
   - EC-07: Si se anota una incidencia de tipo averia o dano-fisico en un
     portátil prestado, entonces el sistema deberá cerrar su préstamo con
     la fecha de la incidencia y dejar el portátil averiado.
   ```

4. El plan añade una decisión (en qué servicio se cierra el préstamo) y las tasks, un grupo nuevo.
5. Primero el test de EC-07 (rojo), después el código (verde), y todos los tests.

## Lo que no se hace

En el caso 7: como el código ya bloquea el día entero, alguien puede proponer cambiar RF-01 para quitar las franjas y que todo cuadre. Es un error porque **legaliza** lo que hizo el agente sin que nadie decida si es lo que necesita el profesorado: la spec dejaría de describir la necesidad para describir el código. Lo que se hace es preguntar qué se quiere, aclarar la spec con esa decisión y corregir el código si no coincide. Lo mismo valdría para el caso 12 (cambiar «500 caracteres» por «500 bytes»).
