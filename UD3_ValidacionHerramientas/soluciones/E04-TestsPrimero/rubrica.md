# Rúbrica · E04 Los tests primero

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valora **leyendo** el repositorio del alumno: su `README.md`, sus tests, su código, el agente `implementador` y el historial (`<username>.datos.json`). Es un ejercicio con agente: se corrige el proceso y los artefactos, no si el agente acertó.

---

### C1 · Tests desde la spec

| Campo | Valor |
|-------|-------|
| OA | OA3 b |
| Peso | 3 |
| Dónde mirar | `tests/servicio-reservas.test.js` y `tests/api-reservas.test.js` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Todos los AC y EC de la spec tienen test con `B-` y el identificador; mensajes exactos; límites por los dos lados; fecha del sistema fijada; un test que distingue la hora peninsular de la UTC; cada test empieza sin reservas; ningún oráculo sale del código |
| 2 | 2 | Falta uno de esos puntos (un identificador, los límites, la fecha fijada o el test de RNF-02) |
| 1 | 1 | Faltan dos o tres, o hay tests que mienten |
| 0 | 0 | No hay tests de B o casi todos mienten |

### C2 · Revisión de los tests y rojo

| Campo | Valor |
|-------|-------|
| OA | OA3 b |
| Peso | 2 |
| Dónde mirar | `README.md`, secciones «Revisión de los tests» y «El rojo» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | La revisión cita problemas concretos de los tests del agente con su corrección (o explica qué se comprobó, test a test, si no había ninguno), y la salida del rojo con una explicación de por qué es el correcto |
| 1 | 1 | Revisión genérica («todo bien») o rojo sin explicación |
| 0 | 0 | Faltan las dos secciones |

### C3 · Tests que el agente no controla

| Campo | Valor |
|-------|-------|
| OA | OA3 b |
| Peso | 3 |
| Dónde mirar | `.opencode/agents/implementador.md`, `README.md` (secciones «Permisos del implementador» y «Tests intactos») e historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | `implementador` con `tests/**` y `package.json` denegados, `subagent` en `deny` y `shell` en `ask` salvo las órdenes de lectura y `npm test`, comprobado con `opencode debug agents`; el commit de los tests es anterior a cualquier commit con código de B y solo tiene tests; `git diff --stat` contra él sin salida |
| 2 | 2 | Falta uno de esos puntos (la comprobación del agente, `subagent` o `shell`, o el `git diff`) |
| 1 | 1 | El agente existe, pero los tests llegan con el código o se modifican en un commit de implementación |
| 0 | 0 | No hay agente `implementador` ni separación entre tests y código |

### C4 · Proceso con el agente y fusión

| Campo | Valor |
|-------|-------|
| OA | OA3 b |
| Peso | 2 |
| Dónde mirar | `README.md` (secciones «Sesión con el agente», «Decisiones», «¿Pueden fallar?» y «Commits») e historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Sesión con prompts y correcciones, decisiones con motivo, un mutante detectado por un test, un commit por ciclo en la rama y fusión con `--no-ff` en `main` |
| 1 | 1 | Falta la fusión, o la sesión y las decisiones son genéricas, o falta el mutante |
| 0 | 0 | No hay sesión documentada ni historial por ciclos |
