# Tests que mienten

## Mentiras

| Test | ¿Miente? | Forma | Por qué |
|------|----------|-------|---------|
| A-RF-01, A-AC-01 | Sí | El código como oráculo | Compara la respuesta con `servicio.listarPortatiles()`: si el servicio ordena mal, los dos lados cambian a la vez |
| A-RF-02, A-AC-02 | Sí | Aserción que no distingue | `every` es cierto con una lista vacía; no comprueba qué portátiles ni el orden de AC-02 |
| A-EC-01 | Sí | Aserción débil | `toBeDefined` acepta cualquier mensaje |
| A-EC-04 | Sí | El *mock* sustituye lo que se prueba | Simula el servicio entero: comprueba el *mock*, no el filtro |
| A-EC-05 | Sí | Aserción incompleta | Solo comprueba el 500, no el cuerpo de EC-05 |
| A-RNF-01 | Sí | Test desactivado | `test.skip`: no se ejecuta, pero su identificador aparece en la búsqueda |
| A-EC-02 | Sí | Aserción que no se ejecuta | Sin `await`, el test termina antes de la respuesta |
| A-EC-03 | Sí | Aserción condicional | Si la respuesta no es 400, no comprueba nada |

## Mutantes

| Test | Cambio | Test original | Test corregido |
|------|--------|---------------|----------------|
| A-RF-01, A-AC-01 | `servicio-portatiles.js`: `b.codigo.localeCompare(a.codigo)` | Verde | Falla `A-RF-01, A-AC-01` (y `A-AC-02`) |
| A-RF-02, A-AC-02 | `servicio-portatiles.js`: el filtro pasa a `() => estado === undefined` | Verde | Falla `A-RF-02, A-AC-02` |
| A-EC-01 | `servicio-portatiles.js`: el mensaje pasa a `Invalid state` | Verde | Falla `A-EC-01` |
| A-EC-04 | `servicio-portatiles.js`: el filtro pasa a `() => true` | Verde (el de AC-02 falla, pero este no) | Fallan `A-EC-04` y `A-RF-02, A-AC-02` |
| A-EC-05 | `controlador-portatiles.js`: el mensaje pasa a `Internal Server Error` | Verde | Fallan los dos `A-EC-05` |
| A-RNF-01 | Cualquier cambio que haga lenta la lista | Saltado | Se ejecuta y falla si tarda más de 200 ms |
| A-EC-02 | `controlador-portatiles.js`: `status(404)` por `status(200)` | El test, en verde; al final, «Unhandled Rejection: expected 200 to be 404» | Falla `A-EC-02` |
| A-EC-03 | `servicio-portatiles.js`: la validación del identificador pasa a `if (false)` | Verde (`abc` da 404 y el `if` se salta) | Falla `A-EC-03` |

## Tests que faltan

| Identificador | Test añadido | Nivel y por qué |
|---------------|--------------|-----------------|
| A-RF-03, A-AC-03 | `A-RF-03, A-AC-03: responde 200 con el portátil` | Integración: AC-03 habla de la respuesta de `GET /api/portatiles/3`, y el plan lo pone en los dos ficheros |
| A-EC-05 (por identificador) | `A-EC-05: responde 500 si no se puede leer el portátil` | Integración: el 500 lo decide el controlador; hay que provocarlo en el otro endpoint, simulando que falla `obtenerPorId` |

## Resultado

```text
 ✓ tests/servicio-portatiles.test.js (12 tests)
 ✓ tests/api-portatiles.test.js (10 tests)

 Test Files  2 passed (2)
      Tests  22 passed (22)
```
