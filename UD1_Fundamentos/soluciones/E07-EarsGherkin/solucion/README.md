# EARS y Gherkin

Escenarios: [`docs/specs/C-registrar-prestamo/criterios.feature`](./docs/specs/C-registrar-prestamo/criterios.feature)

## Requisitos en EARS

| # | Patrón | Requisito en EARS |
|---|--------|-------------------|
| V1 | ubicuo | El sistema deberá guardar en cada préstamo el profesor que ha iniciado sesión como responsable del portátil. |
| V2 | por evento | Cuando un profesor registre el préstamo de un portátil disponible, el sistema deberá guardar el préstamo con el portátil, el profesor, la fecha y hora del préstamo y la fecha límite, y responder 201 con el préstamo creado. |
| V3 | por evento | Cuando el sistema guarde un préstamo, deberá cambiar el estado del portátil a prestado. |
| V4 | ubicuo | El sistema deberá fijar como fecha límite de cada préstamo el mismo día a las 14:30. |
| V5 | no deseado | Si el portátil que se intenta prestar está averiado, entonces el sistema deberá responder 409 con { error: "El portátil está averiado" }. |
| V6 | no deseado | Si el portátil que se intenta prestar ya está prestado, entonces el sistema deberá responder 409 con { error: "El portátil ya está prestado" }. |
| V7 | por estado | Mientras un portátil esté prestado, el sistema deberá mostrar en el listado de portátiles el nombre del profesor que lo tiene. |
| V8 | por estado | Mientras un préstamo siga abierto después de su fecha límite, el sistema deberá mostrarlo como retrasado. |
| V9 | opcional | Donde esté activado el registro de cargadores, el sistema deberá guardar en cada préstamo si el profesor se lleva el cargador. |
| V10 | combinado | Mientras el modo inventario esté activado, cuando un profesor registre un préstamo, el sistema deberá responder 409 con { error: "Préstamos cerrados por inventario" } y no cambiar el estado del portátil. |
| V11 | no deseado | Si no se puede guardar el préstamo, entonces el sistema deberá responder 500 con { error: "No se ha podido registrar el préstamo" } y no cambiar el estado del portátil. |

## Escenarios declarativos

```gherkin
# language: es
Característica: Registrar el préstamo de un portátil

  Escenario: Prestar portátil
    Dado que P-01 está disponible
    Cuando un profesor registra el préstamo de P-01
    Entonces el préstamo se crea
    Y P-01 aparece como prestado en el listado de portátiles

  Escenario: Error al prestar
    Dado que P-03 está averiado
    Cuando un profesor registra el préstamo de P-03
    Entonces se le informa de que "El portátil está averiado"
    Y no se crea ningún préstamo
```

**Qué he quitado y por qué:**

- **Prestar portátil:** la URL de la página, el clic en la fila, el color y la posición del botón, la espera de 2 segundos y el aviso verde con «OK». Son detalles de **cómo está hecha la interfaz**: cambian con cualquier rediseño y no forman parte del comportamiento. Además, «OK» no comprueba nada: lo importante es que el préstamo existe y el portátil está prestado. También le dictarían al agente cómo construir la página.
- **Error al prestar:** la URL, el clic, el botón azul y el recuadro rojo con su `id`. El escenario original ni siquiera decía **qué error** sale ni que el préstamo no se crea, que es lo que hay que comprobar. El `Dado` explica ahora por qué falla (el portátil está averiado), que antes había que adivinar.

## Validación

```text
> prestamo-portatiles-specs@0.1.0 validar
> node herramientas/validar-gherkin.mjs

✅ 2 documentos de Gherkin sin errores
```
