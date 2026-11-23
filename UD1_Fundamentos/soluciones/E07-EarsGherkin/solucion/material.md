# Material: Registrar el préstamo de un portátil

Material de partida del ejercicio E07. No modifiques este fichero: escribe los requisitos en EARS en el `README.md` y los escenarios en `docs/specs/C-registrar-prestamo/criterios.feature`.

---

## Datos de la feature

- El préstamo se registra con `POST /api/prestamos` y el cuerpo `{ "portatilId": 1 }`. El profesor es el usuario que ha iniciado sesión.
- Un préstamo guarda el portátil, el profesor, la fecha y hora del préstamo y la **fecha límite**: el mismo día a las 14:30, cuando acaba la jornada lectiva.
- Los portátiles pueden estar `disponible`, `prestado` o `averiado`.
- Al acabar el curso, la coordinación TIC activa el **modo inventario** para revisar todos los portátiles. Mientras está activo no se presta nada.
- Algunos centros activan en la configuración el **registro de cargadores**: entonces, al prestar un portátil hay que indicar si se lleva el cargador.
- Errores de la API, según la constitución: `{ error: "mensaje" }` en español con su código HTTP.

---

## Parte A. Requisitos vagos

| # | Requisito |
|---|-----------|
| V1 | Cada préstamo guarda quién se lleva el portátil. |
| V2 | Se puede prestar un portátil. |
| V3 | Al prestar un portátil, este pasa a estar prestado. |
| V4 | Los préstamos se devuelven el mismo día. |
| V5 | No se puede prestar un portátil averiado. |
| V6 | Un portátil prestado no se puede volver a prestar. |
| V7 | En el listado sale quién tiene cada portátil prestado. |
| V8 | Si un préstamo pasa de la hora límite, se ve como retrasado. |
| V9 | Si el centro usa el registro de cargadores, hay que apuntar lo del cargador. |
| V10 | En el inventario de fin de curso no se presta nada. |
| V11 | Todo tiene que funcionar bien aunque falle la base de datos. |

---

## Parte B. Criterios de aceptación en prosa

Los portátiles de partida para todos los criterios son: P-01 disponible, P-02 prestado y P-03 averiado.

- **AC-01.** Un profesor presta P-01. La API responde 201 con el préstamo, P-01 pasa a estar prestado y la fecha límite del préstamo es hoy a las 14:30.
- **AC-02.** Un profesor intenta prestar P-02. La API responde 409 con el error "El portátil ya está prestado".
- **AC-03.** Un profesor intenta prestar P-03. La API responde 409 con el error "El portátil está averiado".
- **AC-04.** Si el `portatilId` es un texto vacío, un texto como "abc", el número 0 o un número negativo, la API responde 400 con el error "El portátil no es válido".
- **AC-05.** Con el modo inventario activado, un profesor intenta prestar P-01. La API responde 409 con el error "Préstamos cerrados por inventario" y P-01 sigue disponible.

---

## Parte C. Escenarios imperativos

Dos escenarios que escribió un compañero. Funcionan como guion de pruebas manuales, pero describen la interfaz paso a paso en lugar del comportamiento.

```gherkin
Escenario: Prestar portátil
  Dado que abro el navegador en http://localhost:3000/portatiles
  Y hago clic en la fila de P-01
  Cuando pulso el botón azul «Prestar» de la esquina inferior derecha
  Y espero 2 segundos
  Entonces veo un aviso verde con el texto «OK»
  Y la celda de la columna «Estado» de la fila de P-01 dice «prestado»
```

```gherkin
Escenario: Error al prestar
  Dado que abro el navegador en http://localhost:3000/portatiles
  Cuando hago clic en la fila de P-03
  Y pulso el botón azul «Prestar»
  Entonces sale un recuadro rojo con el id «error-prestamo»
```
