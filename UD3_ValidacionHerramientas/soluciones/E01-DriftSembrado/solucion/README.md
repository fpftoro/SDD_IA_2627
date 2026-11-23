# El drift que nadie vio

## Búsqueda de identificadores

```text
$ comm -23 \
  <(grep -oE '(RF|RNF|AC|EC)-[0-9]+' docs/specs/A-consultar-portatiles/spec.md | sed 's/^/A-/' | sort -u) \
  <(grep -rohE 'A-(RF|RNF|AC|EC)-[0-9]+' tests/ | sort -u)
A-EC-03

$ comm -13 \
  <(grep -oE '(RF|RNF|AC|EC)-[0-9]+' docs/specs/A-consultar-portatiles/spec.md | sed 's/^/A-/' | sort -u) \
  <(grep -rohE 'A-(RF|RNF|AC|EC)-[0-9]+' tests/ | sort -u)
A-EC-06
```

`A-EC-03` no tiene ningún test. `A-EC-06` aparece en un test, pero no existe en la spec.

## Matriz de trazabilidad

| Spec | Test | ¿Comprueba lo que dice? |
|------|------|-------------------------|
| A-RF-01 | `servicio-portatiles.test.js` › `A-RF-01: devuelve los portátiles ordenados`; `api-portatiles.test.js` › `A-RF-01, A-AC-01…` | **No**: esperan el orden por carro (`P-01, P-03, P-05, P-02…`); la spec pide por código |
| A-RF-02 | `servicio` › `A-RF-02: filtra por estado`; `api` › `A-RF-02, A-AC-02…` | El filtro sí (prestados: P-02 y P-06), pero el de la API espera el orden por carro (`P-01, P-05, P-04`) |
| A-RF-03 | `api` › `A-RF-03, A-AC-03…` | **No** del todo: solo comprueba `codigo`, no los cuatro campos |
| A-RNF-01 | `api` › `A-RNF-01: … con 500 portátiles` | **No**: mide con 50 |
| A-AC-01 | `api` › `A-RF-01, A-AC-01…` | **No**: el orden no es el de la spec |
| A-AC-02 | `api` › `A-RF-02, A-AC-02…` | **No**: espera `P-01, P-05, P-04`; la spec dice `P-01, P-04 y P-05` |
| A-AC-03 | `api` › `A-RF-03, A-AC-03…` | **No**: solo `codigo`; no comprueba carro ni estado |
| A-EC-01 | `servicio` › `A-EC-01: rechaza el estado %o` (`roto`, `''`); `api` › `A-EC-01…` | Sí para `roto` y la cadena vacía, con el mensaje exacto. Pero ya no prueba `Disponible`, que la spec rechaza |
| A-EC-02 | `api` › `A-EC-02: responde 404…` | **No**: comprueba `Portátil no encontrado`; la spec pide `El portátil no existe` |
| A-EC-03 | Sin test | — |
| A-EC-04 | `api` › `A-EC-04…` | Sí: 200 y lista vacía |
| A-EC-05 | `api` › `A-EC-05…` (lista y por identificador) | Sí: 500 y el mensaje exacto |

## Arquitectura

```text
$ grep -rn "repositorios" src/controladores/
src/controladores/controlador-portatiles.js:3:import { repositorioPortatiles } from '../repositorios/repositorio-portatiles.js';
```

Incumple la sección Arquitectura de la constitución: los controladores no acceden a los repositorios ni contienen lógica de negocio. `buscarPortatilHttp` valida el identificador y busca en el repositorio él mismo.

## Hallazgos

| # | Dónde | Qué pasa | Identificador o principio | Forma de drift | Dónde se corrige |
|---|-------|----------|---------------------------|----------------|------------------|
| 1 | `src/servicios/servicio-portatiles.js:19-22` | Ordena por carro y después por código; los tests lo esperan así | A-RF-01, A-AC-01, A-AC-02 | Cambio que no llega a la spec; los tests se ajustaron al código | Código y tests (vuelven al orden por código). Si la coordinación quiere ordenar por carro, primero una versión nueva de la spec |
| 2 | `src/servicios/servicio-portatiles.js:8`; `tests/servicio-portatiles.test.js:23` | Acepta el estado en mayúsculas; un test con un identificador inventado lo da por bueno | A-EC-01 (y `A-EC-06`, que no existe) | Cambio que no llega a la spec; *drift* de los tests | Código y tests, salvo que se decida cambiar la spec |
| 3 | `src/controladores/controlador-portatiles.js:36`; `tests/api-portatiles.test.js:107` | El mensaje de 404 no es el de la spec, y el test comprueba el del código | A-EC-02 | Interpretación; el test comprueba el código | Código y test |
| 4 | `tests/` | Ningún test de A-EC-03 | A-EC-03 | *Drift* de los tests | Tests: valores `0`, `-1`, `abc`, `1.5` en las dos capas |
| 5 | `src/controladores/controlador-portatiles.js:3, 26-37` | El controlador valida y lee del repositorio | Constitución, Arquitectura; plan D-01 y D-02 | Arquitectura | Código: vuelve `buscarPortatil` al servicio |
| 6 | `src/controladores/controlador-portatiles.js:29` | `Number.isInteger(Number(id))` acepta `01` y `1e0` | A-EC-03 | Interpretación; la spec es ambigua («número entero positivo» escrito cómo) | Spec (aclarar: solo dígitos, sin ceros a la izquierda) y después test y código |
| 7 | `tests/api-portatiles.test.js:77, 90` | El test de rendimiento usa 50 portátiles | A-RNF-01 | *Drift* de los tests | Test |
| 8 | `tests/api-portatiles.test.js:100` | Solo comprueba el código del portátil | A-RF-03, A-AC-03 | *Drift* de los tests (aserción débil) | Test: `toEqual` con los cuatro campos |

## ¿Pueden fallar?

| Cambio (fichero y qué cambias) | Test que debería fallar | Resultado de npm test |
|--------------------------------|-------------------------|-----------------------|
| `controlador-portatiles.js`: `status(404)` por `status(200)` | `A-EC-02: responde 404…` | Falla `A-EC-02` (1 de 14): el test protege el código HTTP |
| `controlador-portatiles.js`: responder `{ ...portatil, estado: 'disponible' }` en `buscarPortatilHttp` | `A-RF-03, A-AC-03` | Todo en verde (14): el test no comprueba el estado del portátil |

## Historial

- Tres commits **después** de la fusión (`91aa6e2`, `b25f0d3`, `e7c41a9`) cambian código de la feature A sin tocar `docs/specs/A-consultar-portatiles/` ni pasar por una rama de la feature.
- Los tres cambian **a la vez el código y los tests**: los tests se ajustaron al código nuevo, por eso todo sigue en verde.
- Los mensajes son de arreglos (`Arreglo rápido`, `Acepta…`), no siguen la convención de los commits de una feature.
- El `TODO` de `servicio-portatiles.js:19` confirma que el orden por carro no estaba decidido.
