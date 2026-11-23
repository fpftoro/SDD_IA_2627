# Un cambio con delta de OpenSpec

## Qué instala OpenSpec

| Qué aparece | Para qué sirve |
|-------------|----------------|
| `openspec/config.yaml` | Configuración del proyecto: el esquema (`spec-driven`) y el idioma de los artefactos |
| `openspec/changes/` (con `archive/`) | Los cambios en curso y, en `archive/`, los ya terminados |
| `.opencode/commands/opsx-*.md` | Seis comandos de OpenCode (`/opsx-propose`, `/opsx-apply`, `/opsx-archive`…) |
| `.opencode/skills/openspec-*/` | Seis skills con las instrucciones que usan esos comandos |
| `openspec/specs/` | Ya existía: la spec vigente de cada capacidad |

## Refactorización

| Fichero | Qué contiene ahora |
|---------|--------------------|
| `src/avisos.js` | `generarAvisos` (punto de entrada) y `redactarAviso` |
| `src/servicios/servicio-avisos.js` | `prestamosConAviso` (qué préstamos avisan) y `ordenarAvisos` (con el mismo comparador de antes) |
| `src/utilidades/dias.js` | `diasEntre`: los días completos entre dos fechas |

```text
$ npm test
 Test Files  1 passed (1)
      Tests  14 passed (14)

$ git diff --stat main -- tests
(vacío)
```

## Sesión con el agente

| Paso | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|--------|--------|-------------|-----------------------|
| 1 | `implementador` | «Reorganiza `src/avisos.js` en `src/servicios/servicio-avisos.js` (qué préstamos avisan y cómo se ordenan), `src/utilidades/dias.js` (cálculo de días) y `src/avisos.js` (redacción). No toques los tests. Conserva el comportamiento actual, incluido el orden por profesor, aunque parezca un fallo» | Tres ficheros; el agente «mejoró» el orden con un comparador que devolvía 0 | Lo deshice: los tests `CAR-09` a `CAR-11` fallaban. Se volvió a pedir con el comparador original |

(Ejemplo de cómo rellenarlo: la sesión real depende del modelo.)

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| Dividir en tres módulos | Aceptada | Separa selección, orden y redacción |
| Arreglar el comparador del orden | Rechazada | Es un cambio de comportamiento: va en el cambio, no en la refactorización |
| Sustituir `== false` por `=== false` | Rechazada | Cambia lo que pasa con `cargador: 0` (CAR-08) |

## La delta

| Sección | Requisito | Por qué esa sección |
|---------|-----------|---------------------|
| `MODIFIED` | Orden de los avisos | Ya existía; cambia su regla. Se copia **entero**, con los tres escenarios (uno conserva el nombre «Mayúsculas y minúsculas» y cambia su contenido) |
| `ADDED` | Profesor desconocido | No existía |
| `ADDED` | Fechas inválidas | No existía; cubre la de salida y la de hoy, y dice que un préstamo devuelto no se valida |

- **Qué enseñó el error de validación:** la primera versión de la delta llamaba al escenario del orden «A igual antigüedad, por profesor» y `openspec validate --strict` falló: *MODIFIED "Orden de los avisos" omits scenario(s) the current spec still has: "Mayúsculas y minúsculas"*. Un `MODIFIED` **sustituye todo el bloque**, así que no deja que se pierda un escenario sin decirlo; si cambia, se conserva con el mismo nombre y el contenido nuevo.

## Tests

| Retirado | Lo sustituye | Por qué |
|----------|--------------|---------|
| `CAR-09` (orden por nombre con mayúsculas) | `CAMBIO-02` | El orden cambia: sin distinguir mayúsculas |
| `CAR-10` (el más antiguo no va el primero) | `CAMBIO-01` | Ahora el más antiguo va el primero |
| `CAR-11` (mismo profesor, orden inverso) | `CAMBIO-03` y `CAMBIO-04` | Del más antiguo al más reciente, y estable a igualdad total |
| `CAR-12` (con `undefined`) | `CAMBIO-05` | «un profesor desconocido» |
| `CAR-13` (fecha inválida omitida) | `CAMBIO-06` y `CAMBIO-07` | Error; y el devuelto no se valida |
| `CAR-14` («hoy» inválido da «Sin avisos») | `CAMBIO-08` | Error |

- **Rojo antes de implementar:** 7 de los 8 tests nuevos fallaban. `CAMBIO-07` (un préstamo devuelto con fecha inválida no importa) **ya se cumplía**: el código actual salta los devueltos antes de mirar la fecha. Los 8 `CAR-01` a `CAR-08` siguieron en verde.

## Refactorizar y cambiar por separado

Si se hubieran mezclado, al fallar un test no se sabría si la causa era la reorganización o el cambio de comportamiento. Con dos ciclos, la refactorización tiene una prueba objetiva (los 14 tests intactos y en verde) y el cambio llega con una delta, unos tests nuevos y su commit. Si algo falla, se sabe en qué paso fue.

## Commits

```text
$ git log --oneline --graph
*   75338c6 Fusiona el cambio avisos-ordenados-y-robustos
|\
| * 2cee961 Cambio avisos-ordenados-y-robustos: archivado
| * 5f8718c Cambio avisos-ordenados-y-robustos: implementación
| * 172e266 Tests del cambio avisos-ordenados-y-robustos: sustituyen a los de los fallos
| * 800f640 Cambio avisos-ordenados-y-robustos: propuesta (aprobada)
| * 7a6af7e Refactorización de los avisos: capas, sin cambiar el comportamiento
| * 0753202 OpenSpec en el proyecto
|/
* e1a6389 Proyecto de partida
```
