# Rúbrica · E01 Las decisiones que nadie tomó

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** el `README.md` del alumno. El [`README.md`](./README.md) de este ejercicio recoge los errores frecuentes y las otras soluciones válidas. La parte opcional («El mismo prompt, dos veces») **no puntúa**.

---

### C1 · Decisiones implícitas

| Campo | Valor |
|-------|-------|
| OA | OA1 a |
| Peso | 4 |
| Dónde mirar | `README.md`, sección «Decisiones implícitas» |

Una decisión es **correcta** si es real (está en el código o es algo que el código no hace), indica sus líneas o «—» y tiene una consecuencia concreta (quién y en qué situación). La lista de decisiones reales está en la solución de referencia.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 4 | 4 | Seis o más decisiones correctas, entre ellas la del préstamo de otra persona que se borra (`splice` con `indice` igual a `-1`) o la del portátil averiado que pasa a disponible, y la columna «Quién debería decidirlo» asigna el bloqueo de siete días a la dirección del centro o a la coordinación TIC |
| 3 | 3 | Seis o más decisiones correctas, pero sin ninguna de las dos más graves (préstamo borrado, portátil averiado) o con el bloqueo asignado al equipo o al agente |
| 2 | 2 | Cuatro o cinco decisiones correctas |
| 1 | 1 | Dos o tres decisiones correctas, o más decisiones pero con consecuencias genéricas («puede dar errores») |
| 0 | 0 | Falta la sección o tiene menos de dos decisiones correctas |

### C2 · Por qué el agente decide

| Campo | Valor |
|-------|-------|
| OA | OA1 a |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Por qué el agente decide» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Explica que el agente rellena los huecos del prompt con lo más probable en lugar de preguntar, que el código pasa a ser la única descripción del comportamiento (especificación de facto) y nombra el principio «especificar antes de construir» (o «humano en el bucle», si lo relaciona con revisar antes de programar) con lo que habría cambiado |
| 1 | 1 | Explica dos de las tres ideas, o las tres sin relacionarlas con este caso |
| 0 | 0 | Falta la sección o solo explica una idea |

### C3 · Vibe coding, prompt cuidado o SDD

| Campo | Valor |
|-------|-------|
| OA | OA1 a |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «¿Vibe coding, prompt cuidado o SDD?» |

Respuestas esperadas, en orden: *vibe coding*, SDD, prompt cuidado, *vibe coding* (o prompt cuidado, ver las otras soluciones válidas), SDD, prompt cuidado.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Cinco o seis enfoques correctos, cada uno con un motivo del tema 1 aplicado a la situación (duración, mantenimiento por varias personas, cambio pequeño, exploración) |
| 1 | 1 | Tres o cuatro enfoques correctos, o cinco o seis con motivos genéricos o ausentes |
| 0 | 0 | Falta la sección o tiene menos de tres enfoques correctos |

### C4 · Niveles de SDD

| Campo | Valor |
|-------|-------|
| OA | OA1 a |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Niveles de SDD» |

Respuestas esperadas: A, *spec-first* (fuente de verdad: el código); B, *spec-as-source* (la spec); C, *spec-anchored* (spec y código sincronizados).

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Los tres niveles y las tres fuentes de verdad son correctos, cada frase citada demuestra el nivel, y el nivel recomendado para la aplicación de préstamos está justificado con el tamaño del proyecto o quién lo mantendrá |
| 1 | 1 | Los tres niveles son correctos, pero falla alguna fuente de verdad, alguna frase no demuestra el nivel o falta la recomendación justificada; o acierta dos niveles con todo lo demás correcto |
| 0 | 0 | Falta la sección o acierta menos de dos niveles |
