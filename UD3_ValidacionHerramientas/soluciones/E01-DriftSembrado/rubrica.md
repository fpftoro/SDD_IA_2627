# Rúbrica · E01 El drift que nadie vio

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** el `README.md` del alumno. Los problemas sembrados y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Búsqueda de identificadores y matriz

| Campo | Valor |
|-------|-------|
| OA | OA3 a |
| Peso | 3 |
| Dónde mirar | `README.md`, secciones «Búsqueda de identificadores» y «Matriz de trazabilidad» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Salida de las dos búsquedas (`A-EC-03` sin test y `A-EC-06` que sobra) y matriz con los doce identificadores, en la que al menos cinco filas dicen **no** con lo que compara la aserción (orden, mensaje, 50 portátiles, solo `codigo`) |
| 2 | 2 | Las dos búsquedas y la matriz completa, pero solo tres o cuatro filas detectan que la aserción no comprueba la spec |
| 1 | 1 | Falta una búsqueda o faltan filas en la matriz, o la matriz solo dice si el test existe |
| 0 | 0 | Faltan las dos secciones o están vacías |

### C2 · Hallazgos clasificados

| Campo | Valor |
|-------|-------|
| OA | OA3 a |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «Hallazgos» |

Un hallazgo cuenta si es real (de la lista sembrada u otro justificado) y dice dónde está, qué identificador o principio afecta y qué forma de *drift* es.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Seis o más hallazgos reales con fichero y línea, entre ellos el orden (1) y la arquitectura (5), y cada uno con un sitio de corrección coherente que no legaliza el código en la spec |
| 2 | 2 | Cuatro o cinco hallazgos reales, o seis sin el del orden o el de la arquitectura |
| 1 | 1 | Dos o tres hallazgos reales, o hallazgos sin dónde ni forma de *drift* |
| 0 | 0 | Falta la sección o no tiene ningún hallazgo real |

### C3 · Arquitectura

| Campo | Valor |
|-------|-------|
| OA | OA3 a |
| Peso | 1 |
| Dónde mirar | `README.md`, sección «Arquitectura» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Orden de búsqueda, salida con la importación del repositorio en el controlador y principio de la constitución citado |
| 0 | 0 | Falta la sección o no localiza la importación |

### C4 · Tests que pueden fallar

| Campo | Valor |
|-------|-------|
| OA | OA3 a |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «¿Pueden fallar?» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Dos cambios concretos (fichero y cambio): uno que hace fallar un test concreto y otro que debería detectarse y deja `npm test` en verde, con el test esperado y el resultado |
| 1 | 1 | Solo uno de los dos cambios, o cambios que rompen todos los tests (sintaxis) |
| 0 | 0 | Falta la sección |

### C5 · Señales en el historial

| Campo | Valor |
|-------|-------|
| OA | OA3 a |
| Peso | 1 |
| Dónde mirar | `README.md`, sección «Historial» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Señala los commits posteriores a la fusión que cambian código sin tocar la spec y que cambian código y tests a la vez |
| 0 | 0 | Falta la sección o no identifica esos commits |
