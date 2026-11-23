# Rúbrica · E03 Tests que mienten

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valora **leyendo** el `README.md` del alumno y su `tests/api-portatiles.test.js`. Las mentiras sembradas, los mutantes comprobados y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Mentiras identificadas

| Campo | Valor |
|-------|-------|
| OA | OA3 b |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «Mentiras» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Siete u ocho tests correctamente clasificados con su forma, incluidos el que no tiene `await` y el condicional |
| 2 | 2 | Cinco o seis bien clasificados |
| 1 | 1 | Tres o cuatro bien clasificados |
| 0 | 0 | Falta la sección o menos de tres |

### C2 · Mutantes

| Campo | Valor |
|-------|-------|
| OA | OA3 b |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Mutantes» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Un mutante concreto (fichero y cambio) para al menos cinco tests que mienten, con el resultado del test original en verde y del corregido en rojo |
| 1 | 1 | Mutantes para dos a cuatro tests, o sin el resultado del test corregido |
| 0 | 0 | Falta la sección o los cambios no incumplen la spec |

### C3 · Tests corregidos

| Campo | Valor |
|-------|-------|
| OA | OA3 b |
| Peso | 3 |
| Dónde mirar | `tests/api-portatiles.test.js` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Ninguna mentira queda: oráculo escrito en el test, valores exactos de la spec con `toEqual`, todas las peticiones con `await`, sin `if`, sin `skip`, y el *mock* solo del repositorio; nombres con la letra de la feature y el identificador |
| 2 | 2 | Queda una mentira de la lista |
| 1 | 1 | Quedan dos o tres |
| 0 | 0 | El fichero no cambia o quedan más de tres |

### C4 · Tests que faltan, en su nivel

| Campo | Valor |
|-------|-------|
| OA | OA3 b |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Tests que faltan», y `tests/api-portatiles.test.js` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Añade A-RF-03/A-AC-03 con el portátil completo y justifica el nivel de integración con la spec o el plan; la salida de `npm test` está en verde |
| 1 | 1 | Añade el test pero sin justificar el nivel, o el test es débil, o falta la salida |
| 0 | 0 | No añade ningún test |
