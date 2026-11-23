# Rúbrica · E09 La spec de una feature

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** el repositorio del alumno y su historial, sin ejecutar nada. Es un ejercicio con agente: se valoran el proceso documentado, las decisiones y la spec final, no lo que produjo el modelo. La tabla de dudas que dejan las notas y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Spec completa

| Campo | Valor |
|-------|-------|
| OA | OA1 e |
| Peso | 3 |
| Dónde mirar | `docs/specs/D-registrar-devolucion/spec.md` del último commit |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Tiene todas las secciones de la plantilla; recoge todas las respuestas de la coordinación TIC (quién registra, cargador obligatorio, retraso, averiado, ya devuelto, no existe, tiempo); al menos seis *edge cases* con respuesta exacta en formato `{ error }`; la fecha de devolución sale del servidor; el préstamo no se borra, y las penalizaciones están en el fuera de alcance |
| 2 | 2 | Falta una o dos respuestas de la coordinación TIC, o hay menos de seis *edge cases* con respuesta exacta |
| 1 | 1 | Faltan tres o más respuestas, falta una sección de la plantilla o contradice la constitución (borra el préstamo, fecha de la petición) |
| 0 | 0 | No existe o es solo el borrador de la fase 1 |

### C2 · Notación y granularidad

| Campo | Valor |
|-------|-------|
| OA | OA1 f |
| Peso | 2 |
| Dónde mirar | Spec final: requisitos, *edge cases* y criterios de aceptación; `README.md`, sección «Validación» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Requisitos y *edge cases* en EARS con el patrón adecuado, criterios en Gherkin declarativo sin errores de sintaxis y con el identificador en el nombre, y ningún detalle de implementación (tablas, transacciones, funciones, código) |
| 1 | 1 | Falla una de estas cosas: algún requisito sin EARS o con *Si… entonces* para lo normal, un escenario imperativo o un detalle de implementación |
| 0 | 0 | Sin notación, con errores de sintaxis en Gherkin o con varios detalles de implementación |

### C3 · Borrador propio y dudas

| Campo | Valor |
|-------|-------|
| OA | OA1 e |
| Peso | 2 |
| Dónde mirar | `README.md`, secciones «Borrador» y «Dudas resueltas»; commits de las fases 1 y 2 |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | El commit de la fase 1 contiene solo el borrador (de cinco a diez líneas), la spec del commit de la fase 2 tiene marcadores `[NECESITA ACLARACIÓN]`, y la tabla «Dudas resueltas» recoge cada marcador con su origen y la decisión de la coordinación TIC |
| 1 | 1 | Falta una de las tres cosas: el borrador previo al agente, los marcadores en la fase 2 o la tabla de dudas completa |
| 0 | 0 | Faltan dos o más de las tres |

### C4 · Revisión con el agente

| Campo | Valor |
|-------|-------|
| OA | OA1 f |
| Peso | 2 |
| Dónde mirar | `README.md`, secciones «Sesión con el agente» y «Decisiones»; `sesiones/redaccion.md` y `sesiones/revision.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Las dos exportaciones existen; el prompt de la fase 2 pide la plantilla, la notación, las fuentes y no inventar; «Sesión con el agente» dice qué produjo y qué se corrigió en cada paso; y «Decisiones» tiene una fila por propuesta de la revisión, con un motivo según el criterio del tema 6 y al menos un rechazo razonado |
| 1 | 1 | Falta una exportación, el prompt de la fase 2 no prohíbe inventar o las decisiones no tienen motivo con criterio |
| 0 | 0 | No hay sesiones ni decisiones documentadas |

### C5 · Aprobación e historial

| Campo | Valor |
|-------|-------|
| OA | OA1 e |
| Peso | 1 |
| Dónde mirar | Historial de commits; spec final (metadatos); `docs/specs/README.md`; `README.md`, secciones «Lista de comprobación» y «Commits» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Cuatro commits propios con los mensajes de las fases en orden; la spec en 1.0 y `Aprobada` con la lista de comprobación marcada (o en revisión con lo que falta explicado), y el índice con el estado de D coherente con la spec |
| 0 | 0 | Menos de cuatro commits o fuera de orden, la spec aprobada con marcadores, o el índice sin actualizar |
