# Rúbrica · E08 Ni vaga ni rígida

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** el repositorio del alumno y su historial, sin ejecutar nada. Es un ejercicio con agente: se valoran las decisiones del alumno y la spec final, no lo que propuso el modelo. La clave de la parte A, los problemas sembrados y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Clasificación de líneas

| Campo | Valor |
|-------|-------|
| OA | OA1 f |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «Clasificación» |

Una fila es **correcta** si el tipo y el sitio coinciden con la clave (o con una alternativa válida) y, si es vaga, la reescritura es medible o concreta; si es rígida, explica por qué va al plan.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Trece o más filas correctas, entre ellas L8 como adecuada en la spec y al menos dos de las tres líneas de alcance general (L4, L10, L15) en la constitución |
| 2 | 2 | Diez a doce filas correctas |
| 1 | 1 | Siete a nueve filas correctas, o más con reescrituras que siguen siendo vagas |
| 0 | 0 | Falta la sección o tiene menos de siete filas correctas |

### C2 · Decisiones sobre las propuestas del agente

| Campo | Valor |
|-------|-------|
| OA | OA1 f |
| Peso | 3 |
| Dónde mirar | `README.md`, secciones «Sesión con el agente» y «Decisiones»; `sesiones/revision.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | La exportación existe y contiene los dos prompts; «Decisiones» tiene una fila por propuesta del agente (de los dos prompts) con un motivo que aplica el criterio del tema 6 (se nota desde fuera, restricción acordada o implementación); hay al menos un rechazo razonado de una propuesta rígida, y ninguna propuesta rígida aceptada |
| 2 | 2 | Decisiones razonadas, pero falta el segundo prompt o hay una propuesta rígida aceptada sin justificación |
| 1 | 1 | Menos de la mitad de las propuestas tienen un motivo con criterio, o se aceptan todas sin rechazar ninguna |
| 0 | 0 | Falta la sección o la exportación, o las decisiones no tienen motivo |

### C3 · Spec revisada

| Campo | Valor |
|-------|-------|
| OA | OA1 f |
| Peso | 3 |
| Dónde mirar | `docs/specs/F-cancelar-reserva/spec.md` del último commit; `README.md`, secciones «Lista de comprobación» y «Validación» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Requisitos y *edge cases* en EARS con respuesta exacta; criterios en Gherkin declarativo y sin errores de sintaxis; usa las decisiones de la coordinación TIC (quién cancela, hasta cuándo, cancelada dos veces, hueco libre, 300 ms); ninguna palabra subjetiva, código, estructura interna ni librería; sin marcadores; versión 1.1 y `Aprobada`, y la lista de comprobación marcada |
| 2 | 2 | Cumple casi todo, pero queda uno de estos fallos: un requisito vago o sin EARS, un escenario imperativo, una decisión de la coordinación TIC sin aplicar o un detalle de implementación |
| 1 | 1 | Quedan dos o tres de esos fallos |
| 0 | 0 | La spec no se ha revisado, quedan marcadores o casi todos los problemas sembrados |

### C4 · Proceso e historial

| Campo | Valor |
|-------|-------|
| OA | OA1 f |
| Peso | 1 |
| Dónde mirar | Historial de commits; `docs/specs/README.md`; `README.md`, sección «Commits» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Al menos tres commits propios con los mensajes de las fases 1 a 3 en orden, la feature F en `🔜 Aprobada` en el índice, y la sección «Commits» coincide con el historial |
| 0 | 0 | Un único commit con todo, commits fuera de orden o el índice sin actualizar |
