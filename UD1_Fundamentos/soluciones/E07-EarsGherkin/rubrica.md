# Rúbrica · E07 EARS y Gherkin

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** el `README.md` del alumno y `docs/specs/C-registrar-prestamo/criterios.feature`, sin ejecutar nada. La validez sintáctica se comprueba con la salida pegada en «Validación» y leyendo el fichero; si hay dudas, se anotan para el profesor, que puede ejecutar `npm run validar`. La clave y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Patrones de EARS

| Campo | Valor |
|-------|-------|
| OA | OA1 f |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «Requisitos en EARS», columna «Patrón» y palabra clave de cada requisito |

Una fila es **correcta** si el patrón coincide con la clave (o con una alternativa válida) y el requisito empieza por la palabra clave de ese patrón, con el estado antes que el evento en los combinados.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Diez u once filas correctas, entre ellas V8 como *Mientras* (no como *Si… entonces*) y V10 como combinado; se usan los cinco patrones |
| 2 | 2 | Ocho o nueve filas correctas, o diez con V8 mal |
| 1 | 1 | Cinco a siete filas correctas |
| 0 | 0 | Falta la sección o tiene menos de cinco filas correctas |

### C2 · Respuestas de EARS

| Campo | Valor |
|-------|-------|
| OA | OA1 f |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Requisitos en EARS», columna «Requisito en EARS» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Todos los requisitos terminan con *el sistema deberá* y una respuesta concreta (los errores, con código HTTP y mensaje en formato `{ error }`), con una sola respuesta por fila, y V11 dice qué se responde y qué pasa con el portátil |
| 1 | 1 | Una a tres filas con respuestas vagas («avisar», «impedirlo», «funcionar bien») o con varias respuestas juntas |
| 0 | 0 | Más de tres filas con respuestas vagas, o la mayoría sin *el sistema deberá* |

### C3 · Escenarios de Gherkin

| Campo | Valor |
|-------|-------|
| OA | OA1 f |
| Peso | 3 |
| Dónde mirar | `docs/specs/C-registrar-prestamo/criterios.feature`; `README.md`, sección «Validación» |

**Requisito previo:** si el fichero no existe o no está en español (`# language: es`), el nivel es 0.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Sintaxis válida (salida de la validación con dos documentos sin errores), `Antecedentes` con una tabla de datos de los tres portátiles, un escenario por cada criterio AC-01 a AC-05 con su identificador en el nombre, AC-04 como `Esquema del escenario` con al menos cuatro ejemplos, y cada *Entonces* comprobable (código, error o estado) |
| 2 | 2 | Sintaxis válida y los cinco criterios, pero falla uno de estos puntos: la tabla de datos, el esquema, los identificadores o algún *Entonces* no comprobable |
| 1 | 1 | Faltan uno o dos criterios, o fallan dos o más de los puntos anteriores |
| 0 | 0 | Sintaxis inválida o menos de tres criterios |

### C4 · Escenarios declarativos

| Campo | Valor |
|-------|-------|
| OA | OA1 f |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Escenarios declarativos»; también los escenarios de `criterios.feature` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Los dos escenarios de la parte C reescritos sin botones, colores, URL de páginas, `id` ni esperas, con un resultado que se puede comprobar (que se crea o no el préstamo, qué error); la explicación nombra los detalles quitados y por qué; y ningún escenario de `criterios.feature` es imperativo |
| 1 | 1 | Uno de los dos bien reescrito, o los dos sin detalles de interfaz pero sin resultado comprobable, o la explicación es genérica |
| 0 | 0 | Falta la sección o los escenarios siguen describiendo la interfaz |
