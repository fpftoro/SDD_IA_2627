# Rúbrica · E05 Spec de un módulo heredado

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** los ficheros del alumno (sin ejecutar los tests). La clave está en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Qué hace y rarezas

| Campo | Valor |
|-------|-------|
| OA | OA4 d |
| Peso | 2 |
| Dónde mirar | `README.md`, secciones «Qué hace el módulo» y «Rarezas» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Descripción correcta y al menos siete rarezas distintas, cada una con la entrada y la salida exacta, incluidas el orden (con las mayúsculas y el mismo profesor) y las fechas inválidas |
| 1 | 1 | Cuatro a seis rarezas, o siete sin la entrada o la salida exactas |
| 0 | 0 | Menos de cuatro rarezas, o la descripción es incorrecta |

### C2 · Tests de caracterización

| Campo | Valor |
|-------|-------|
| OA | OA4 d |
| Peso | 3 |
| Dónde mirar | `tests/avisos.caracterizacion.test.js` |

Requisito previo: `src/avisos.js` sin cambios; si se ha modificado, el nivel es 0.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Doce o más tests `CAR-nn` con entradas completas, un test por cada rareza, valores esperados que coinciden con lo que devuelve el módulo (incluidos los fallos, fijados tal cual y marcados `FALLO`) y asertos exactos (`toBe`, `toEqual`), no débiles |
| 2 | 2 | Los tests son correctos pero faltan algunas rarezas, o alguno usa asertos débiles (`toContain` donde hay que fijar el texto) |
| 1 | 1 | Pocos tests, o valores esperados que parecen salir de la intuición (no coinciden con el módulo) |
| 0 | 0 | Falta el fichero o tests que corrigen el comportamiento en lugar de fijarlo |

### C3 · Decisiones

| Campo | Valor |
|-------|-------|
| OA | OA4 d |
| Peso | 1 |
| Dónde mirar | `README.md`, columna «Decisión», y los comentarios `FALLO` de los tests |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Cada rareza decidida con su motivo, coherente con producto (límite de 7 y «Sin avisos» como comportamiento; orden, «undefined» y fechas inválidas como fallo), y los fallos marcados con un identificador `FC-nn` |
| 0 | 0 | Decisiones sin motivo o contrarias a las respuestas de producto sin justificar |

### C4 · Spec del comportamiento actual

| Campo | Valor |
|-------|-------|
| OA | OA4 d |
| Peso | 4 |
| Dónde mirar | `docs/specs/G-avisos-devolucion/spec.md`, `docs/specs/README.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 4 | 4 | Versión 1.0, `✅ Implementada` e índice coherente; requisitos y *edge cases* en EARS que describen lo que hace **hoy** el módulo; cuatro criterios en Gherkin con `# language: es`; «Fallos conocidos» con lo que se corregirá, sin arreglarlos en los requisitos; los comportamientos que parecen raros (el 7, «Sin avisos») dichos expresamente; ningún detalle de implementación |
| 3 | 3 | Todo correcto salvo un fallo: por ejemplo, un fallo descrito ya corregido en los requisitos, o un comportamiento sin decir |
| 2 | 2 | La spec describe lo que el módulo «debería» hacer, o le faltan los criterios o los fallos conocidos |
| 1 | 1 | Spec incompleta (solo contexto y alguna frase) |
| 0 | 0 | Falta la spec |
