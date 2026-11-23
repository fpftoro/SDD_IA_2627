# Rúbrica · E09 Feature D con los gates en verde (integrador)

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valora **leyendo** el repositorio del alumno: `README.md`, specs, planes y tasks, código, tests, scripts, workflow e historial (`<username>.datos.json`, con las fusiones y las ramas sin fusionar). Es un ejercicio con agente: se valoran el proceso documentado y los artefactos, no si el agente acertó.

---

### C1 · Validación de B

| Campo | Valor |
|-------|-------|
| OA | OA3 a |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Validación de B» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Matriz de B con todos los identificadores, que detecta que el test de B-EC-02 no comprueba la spec, y hallazgos del revisor aceptados o rechazados con un motivo que remite a la spec |
| 1 | 1 | Matriz incompleta, o no detecta el *drift* pero el revisor sí y lo acepta sin comprobarlo |
| 0 | 0 | Falta la validación |

### C2 · Diagnóstico y corrección

| Campo | Valor |
|-------|-------|
| OA | OA3 d |
| Peso | 2 |
| Dónde mirar | `README.md` (secciones «Incidencias» y «Corrección de B»), el test y el código de B-EC-02, e historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Las cuatro incidencias bien diagnosticadas (o con alternativas válidas), solo la 1 corregida en el código; corrección con el test primero en su propio commit, después el código, la spec sin cambios y fusión |
| 1 | 1 | Dos o tres diagnósticos correctos, o la corrección mezcla test y código en un commit, o implementa incidencias que no tocaba |
| 0 | 0 | Sin diagnósticos o la spec de B se cambia al mensaje del código |

### C3 · Feature D con los tests primero

| Campo | Valor |
|-------|-------|
| OA | OA3 b |
| Peso | 3 |
| Dónde mirar | `docs/specs/D-borrar-tarea/`, `tests/`, `e2e/`, `README.md` (secciones «Revisión de los tests» y «Tests existentes modificados») e historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Plan con estrategia por nivel y tasks con los tests en el grupo 1; tests de D con `D-` y cada AC y EC en su nivel (integración y Playwright, con la respuesta simulada para EC-03); revisión documentada y rojo explicado; commit de los tests anterior al código; los cambios en las pruebas de A y B decididos en el plan, hechos en el commit de los tests y explicados; pruebas de Playwright independientes |
| 2 | 2 | Falta uno de esos puntos |
| 1 | 1 | Faltan dos o tres, o el implementador cambió tests |
| 0 | 0 | No hay tests de D o llegan con el código |

### C4 · Gates e integración continua

| Campo | Valor |
|-------|-------|
| OA | OA3 c |
| Peso | 2 |
| Dónde mirar | `herramientas/comprobar-marcadores.sh`, `.github/workflows/calidad.yml`, `README.md` (secciones «El gate nuevo» e «Integración continua») |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Script que solo mira las specs aprobadas, en implementación o implementadas y termina con error si hay marcadores, en el *job* de documentos con `!cancelled()`; salidas con y sin marcador; las dos pull requests con todos los *jobs* en verde y los avisos explicados |
| 1 | 1 | El gate existe pero mira todas las specs, o no está en el workflow, o faltan las salidas o los avisos |
| 0 | 0 | No hay gate nuevo |

### C5 · Proceso e historial

| Campo | Valor |
|-------|-------|
| OA | OA3 a |
| Peso | 1 |
| Dónde mirar | `README.md` (secciones «Sesión con el agente», «Decisiones» y «Commits») e historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Sesión con prompts y correcciones, decisiones con motivo, y en `main` las dos fusiones con commit de fusión y sin ramas sin fusionar |
| 0 | 0 | Sin sesión documentada o sin fusiones |
