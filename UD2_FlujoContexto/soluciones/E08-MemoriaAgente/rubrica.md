# Rúbrica · E08 La memoria del agente

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valoran **leyendo** los ficheros de memoria, el `README.md` y el historial. Los problemas sembrados, la solución comprobada y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Revisión de AGENTS.md

| Campo | Valor |
|-------|-------|
| OA | OA2 f |
| Peso | 3 |
| Dónde mirar | `README.md`, «Revisión de AGENTS.md»; `AGENTS.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Diez o más problemas reales con su comprobación concreta, entre ellos al menos una regla que contradice la constitución; el `AGENTS.md` nuevo solo tiene comandos y carpetas que existen, no repite la constitución y prohíbe cambiar estados |
| 2 | 2 | Siete a nueve problemas, o el `AGENTS.md` nuevo conserva una línea falsa o duplicada |
| 1 | 1 | Cuatro a seis problemas, o el `AGENTS.md` nuevo sigue con varios errores |
| 0 | 0 | Falta la revisión o `AGENTS.md` no cambia |

### C2 · Regla de carpeta y skill

| Campo | Valor |
|-------|-------|
| OA | OA2 f |
| Peso | 2 |
| Dónde mirar | `tests/AGENTS.md`, `.opencode/skills/error-api/SKILL.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | La regla de carpeta describe las convenciones reales de los tests (identificador, mensaje exacto, supertest y cabeceras); la skill tiene `name` igual que su carpeta, una descripción que dice qué hace y cuándo usarla, y un procedimiento con pasos antes, durante y al terminar |
| 1 | 1 | Una de las dos está bien, o las dos tienen un fallo (descripción vaga, convenciones inventadas, procedimiento en la regla) |
| 0 | 0 | Faltan las dos o no siguen el formato |

### C3 · Comando y subagente

| Campo | Valor |
|-------|-------|
| OA | OA2 f |
| Peso | 3 |
| Dónde mirar | `.opencode/commands/revisar-plan.md`, `.opencode/agents/revisor.md`; `README.md`, «Configuración comprobada» y «Permisos del revisor» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | El comando usa `agent: plan` (o un agente sin edición), recibe la feature con `$1` y recorre la lista del punto de control 2; el revisor es `subagent`, con `edit` denegado, la terminal (`shell`) limitada a los cuatro comandos y `subagent` denegado; la salida de `opencode debug agents` lo confirma y el README explica por qué `subagent` es peligroso |
| 2 | 2 | Todo bien salvo `subagent`, que sigue permitido y no se comenta |
| 1 | 1 | El comando usa *build*, o el revisor puede editar o ejecutar cualquier comando |
| 0 | 0 | Faltan el comando o el subagente |

### C4 · Comprobación y uso

| Campo | Valor |
|-------|-------|
| OA | OA2 f |
| Peso | 2 |
| Dónde mirar | `README.md`, «Sesión con el agente» y «Commits»; `sesiones/memoria.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Los cuatro pasos de la fase 4 documentados, con la comprobación de que `/revisar-plan` no cambió nada y de que OpenCode rechazó la edición del revisor; sesión exportada; los commits de las fases en orden |
| 1 | 1 | Falta un paso, la sesión exportada o un commit |
| 0 | 0 | No hay rastro de la fase 4 ni de los commits |
