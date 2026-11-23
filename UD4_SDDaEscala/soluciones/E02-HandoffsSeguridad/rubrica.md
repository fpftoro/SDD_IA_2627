# Rúbrica · E02 Handoffs y seguridad

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** el `README.md` y los ficheros de `.opencode/agents/` del alumno. La clave y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Encargos

| Campo | Valor |
|-------|-------|
| OA | OA4 b |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Encargos» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Los tres encargos se reescriben con objetivo, dónde mirar, límites y qué devolver, se entienden sin la conversación, y el tercero señala que «arregla» contradice los permisos del artesano |
| 1 | 1 | Dos reescritos completos, o los tres a los que les falta un elemento (por ejemplo, el formato de respuesta) |
| 0 | 0 | Falta la sección o los encargos siguen siendo vagos |

### C2 · *Handoff*

| Campo | Valor |
|-------|-------|
| OA | OA4 b |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «*Handoff*» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | *Handoff* con los cinco elementos, que apunta a la spec y a las tasks sin repetirlas; identifica el hueco de EC-02 en el plan y dice que se corrige en el plan y las tasks |
| 1 | 1 | *Handoff* completo pero no encuentra el hueco del plan, o lo encuentra y lo «arregla» dentro del *handoff* |
| 0 | 0 | Falta el *handoff* o le faltan varios elementos |

### C3 · Agujeros

| Campo | Valor |
|-------|-------|
| OA | OA4 b |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Agujeros» |

Cuentan siete agujeros reales: `subagent` del revisor, orden de reglas del documentador, `subagent` del documentador, `edit` del implementador, `shell` del implementador, la web del consultor y la edición de specs del arquitecto. El orden de reglas del consultor es un falso positivo.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Seis o siete agujeros con lo que podrían hacer, y razona que el orden de las reglas del consultor no abre nada (o no lo cuenta como agujero) |
| 1 | 1 | Cuatro o cinco agujeros, o los siete pero marcando el orden del consultor como agujero real |
| 0 | 0 | Menos de cuatro, o sin explicar qué podría pasar |

### C4 · Agentes corregidos

| Campo | Valor |
|-------|-------|
| OA | OA4 b |
| Peso | 2 |
| Dónde mirar | `.opencode/agents/*.md` y sección «Agentes corregidos» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Los cinco agentes corregidos cumplen su descripción: nadie puede editar fuera de su ámbito, `subagent` cerrado salvo `explore` en el arquitecto, `shell` acotado, sin web; las salidas pegadas coinciden con los ficheros |
| 1 | 1 | Uno o dos agentes con un agujero que queda (por ejemplo, `subagent` sin cerrar en el documentador) |
| 0 | 0 | Tres o más agentes con agujeros, o los ficheros no se han corregido |

### C5 · Personas y trazabilidad

| Campo | Valor |
|-------|-------|
| OA | OA4 b |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Personas y agentes» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Aprobar, fusionar y decidir dependencias son de una persona, justificado; implementar y documentar son del agente con revisión; el mensaje de commit nombra al agente; la decisión queda en el plan |
| 1 | 1 | Las acciones están bien salvo una, o la trazabilidad (commit o decisión) incompleta |
| 0 | 0 | Falta la sección o deja aprobar o fusionar a un agente |
