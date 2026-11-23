# Rúbrica · E08 MCP con mínimo privilegio

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valora **leyendo** el repositorio del alumno: el servidor, el cliente de prueba, `opencode.json`, el consultor, el `README.md` y el historial. Es un ejercicio con agente: lo que respondió el modelo no puntúa; puntúa la configuración y el razonamiento.

---

### C1 · Revisión del servidor

| Campo | Valor |
|-------|-------|
| OA | OA3 f |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Revisión» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Tabla con las dos herramientas y el recurso, y los dos problemas (`cambiar_estado` y la ruta del recurso) demostrados con la salida de `probar-mcp` |
| 1 | 1 | Solo uno de los dos problemas, o sin demostrarlo |
| 0 | 0 | Falta la revisión |

### C2 · Servidor corregido

| Campo | Valor |
|-------|-------|
| OA | OA3 f |
| Peso | 3 |
| Dónde mirar | `mcp/servidor-prestamo.js`, `herramientas/probar-mcp.mjs` y `README.md` (sección «Corrección») |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Sin herramientas que escriban; recurso limitado a lo que se necesita, con el parámetro decodificado y comparado con lo que existe; descripciones que dicen que solo lee; salida de `probar-mcp` con el rechazo y `npm test` en verde |
| 2 | 2 | `cambiar_estado` se mantiene pero se deniega con permisos y se justifica, o la validación de la ruta es frágil (solo busca `..`) |
| 1 | 1 | Solo uno de los dos problemas corregido |
| 0 | 0 | El servidor no cambia |

### C3 · Configuración con mínimo privilegio

| Campo | Valor |
|-------|-------|
| OA | OA3 f |
| Peso | 3 |
| Dónde mirar | `opencode.json`, `.opencode/agents/consultor.md` y `README.md` (sección «Comprobaciones») |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Servidor `prestamo` local; `prestamo_*` en `deny` en el proyecto y en `allow` solo en el consultor; consultor con `edit`, `shell` y `subagent` denegados e instrucciones sobre el texto de las incidencias; sin claves en el repositorio; salidas de `opencode mcp list` y de `opencode debug agents` para el consultor y para *build* |
| 2 | 2 | Falta uno de esos puntos (las salidas, `subagent` o las instrucciones) |
| 1 | 1 | `prestamo_*` permitido a todos los agentes, o un consultor que puede editar o usar la terminal |
| 0 | 0 | No hay configuración |

### C4 · La instrucción escondida

| Campo | Valor |
|-------|-------|
| OA | OA3 f |
| Peso | 2 |
| Dónde mirar | `README.md`, secciones «Sesión con el agente» y «La instrucción escondida», e historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Sesión documentada y explicación de por qué la instrucción no se podía cumplir con la configuración, sin depender de lo que decidiera el modelo; un commit por paso |
| 1 | 1 | La explicación se apoya en que «el modelo se dio cuenta», o faltan los commits por paso |
| 0 | 0 | Falta la sección |
