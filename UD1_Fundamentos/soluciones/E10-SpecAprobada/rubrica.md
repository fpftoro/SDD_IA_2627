# Rúbrica · E10 De la idea a la spec aprobada

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Integrador de la unidad. Todos los criterios se valoran **leyendo** el repositorio del alumno y su historial, sin ejecutar nada. Es un ejercicio con agente: se valoran el contexto, las decisiones, la spec final y el proceso, no lo que produjo el modelo. Las decisiones válidas y los errores frecuentes están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Entorno y contexto del agente

| Campo | Valor |
|-------|-------|
| OA | OA1 c |
| Peso | 2 |
| Dónde mirar | `AGENTS.md`, `constitution.md`, `opencode.json`; `README.md`, sección «Entorno» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | `AGENTS.md` con comandos, estructura de `docs/`, nombres de carpetas y al menos tres prohibiciones, sin repetir la constitución; constitución con capas, formato de errores, pruebas y la sección de notaciones (EARS, Gherkin con `# language: es` e identificador en el escenario); `opencode.json` válido con `instructions`, `"*": "ask"` antes de las excepciones, `rm` denegado y sin reglas de `edit`; y la comprobación con *plan* documentada sin clave en el repositorio |
| 1 | 1 | Falla una o dos de esas piezas (por ejemplo, la constitución sin notaciones o una regla de `edit`) |
| 0 | 0 | Falta alguno de los tres ficheros, o hay una clave en el repositorio |

### C2 · Features e índice

| Campo | Valor |
|-------|-------|
| OA | OA1 d |
| Peso | 1 |
| Dónde mirar | `README.md`, secciones «Features» y «Orden»; `docs/specs/README.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | La propuesta del agente está revisada con criterios del tema 4 (rechaza épicos, técnicas y lo que el PRD deja fuera), el índice tiene las features del PRD con prefijo y formato de carpeta (`C-marcar-hecha/`), y el orden respeta las dependencias y está justificado |
| 0 | 0 | No hay revisión de la propuesta, el índice tiene features que no lo son o el orden no respeta las dependencias |

### C3 · Spec completa

| Campo | Valor |
|-------|-------|
| OA | OA1 e |
| Peso | 3 |
| Dónde mirar | `docs/specs/C-marcar-hecha/spec.md` del último commit |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Todas las secciones de la plantilla; responde a las seis preguntas de «Comprueba tu solución» (desmarcar, ya hecha, no existe, valor no válido, qué se guarda, cómo se ve); al menos cinco *edge cases* con respuesta exacta en formato `{ error }`; el fuera de alcance excluye usuarios y permisos; y ningún requisito sobre quién marca la tarea |
| 2 | 2 | Falta una de las seis respuestas o hay menos de cinco *edge cases* con respuesta exacta |
| 1 | 1 | Faltan dos o más respuestas, falta una sección o incluye usuarios o permisos en los requisitos |
| 0 | 0 | No existe o es solo el borrador |

### C4 · Notación y granularidad

| Campo | Valor |
|-------|-------|
| OA | OA1 f |
| Peso | 2 |
| Dónde mirar | Spec final; `README.md`, sección «Validación» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Requisitos y *edge cases* en EARS con el patrón adecuado (la tarea tachada como *Mientras*), Gherkin declarativo sin errores de sintaxis y con identificadores, y un nivel de detalle como el de la spec de A: sin implementación y sin palabras subjetivas |
| 1 | 1 | Falla una de estas cosas: algún requisito sin EARS o con el patrón equivocado, un escenario imperativo, un detalle de implementación o una palabra subjetiva |
| 0 | 0 | Sin notación, con errores de sintaxis o con varios detalles de implementación |

### C5 · Decisiones

| Campo | Valor |
|-------|-------|
| OA | OA1 f |
| Peso | 1 |
| Dónde mirar | `README.md`, secciones «Borrador», «Sesión con el agente», «Decisiones de producto» y «Decisiones»; `sesiones/redaccion.md` y `sesiones/revision.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Hay borrador propio, las dos exportaciones, cada marcador resuelto con su motivo en «Decisiones de producto» (ninguno en contra del PRD), y cada propuesta de la revisión aceptada o rechazada con el criterio del tema 6, con al menos un rechazo razonado |
| 0 | 0 | Falta el borrador, alguna exportación o las tablas de decisiones, o las decisiones no tienen motivo |

### C6 · Historial por fases

| Campo | Valor |
|-------|-------|
| OA | OA1 c |
| Peso | 1 |
| Dónde mirar | Historial de commits; `docs/specs/README.md` en cada commit; `README.md`, sección «Commits» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Cinco commits propios con los mensajes de las fases 1 a 5 en orden; el estado de C en el índice pasa por `📝 Borrador`, `👀 En revisión` y `🔜 Aprobada` en los commits de las fases 3, 4 y 5; y la sección «Commits» coincide con el historial |
| 0 | 0 | Menos de cinco commits, fuera de orden, o el índice no cambia con las fases |
