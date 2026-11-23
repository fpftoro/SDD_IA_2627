# Rúbrica · E05 Los gates del proyecto

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valora **leyendo** el repositorio del alumno: configuraciones, workflow, scripts, constitución, `README.md` e historial. Los resultados de GitHub Actions se valoran por los enlaces y las salidas que pega el alumno; si el corrector tiene acceso al repositorio, puede abrir las ejecuciones.

---

### C1 · Lint con las capas

| Campo | Valor |
|-------|-------|
| OA | OA3 c |
| Peso | 2 |
| Dónde mirar | `eslint.config.js`, `package.json` y `README.md` (sección «Lint») |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Reglas recomendadas, globales de Node y una regla `no-restricted-imports` por capa (cada una solo hacia abajo) con un mensaje que cita la constitución; salida sin errores y salida con el error de capas |
| 1 | 1 | Solo la regla de los controladores, reglas sin mensaje o sin salidas |
| 0 | 0 | No hay configuración de ESLint |

### C2 · Cobertura, trazabilidad y estado

| Campo | Valor |
|-------|-------|
| OA | OA3 c |
| Peso | 2 |
| Dónde mirar | `vitest.config.js`, `constitution.md`, `herramientas/` y `README.md` (secciones «Cobertura» y «Trazabilidad») |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Umbral de líneas y ramas por debajo de la cobertura real y justificado en la sección «Calidad» de la constitución; script de trazabilidad y estado, con sus salidas en verde |
| 1 | 1 | Falta la justificación del umbral o uno de los dos scripts |
| 0 | 0 | No hay cobertura con umbral ni trazabilidad |

### C3 · Workflow de integración continua

| Campo | Valor |
|-------|-------|
| OA | OA3 c |
| Peso | 3 |
| Dónde mirar | `.github/workflows/calidad.yml` y `README.md` (sección «Integración continua») |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Un *job* por tipo de gate; `npm ci`; `permissions: contents: read`; el gate de spec existente solo en ramas y con `fetch-depth: 0`; `!cancelled()` donde un segundo paso debe ejecutarse aunque falle el primero; enlace o salida de una ejecución en verde de `main` |
| 2 | 2 | Falta uno de esos puntos |
| 1 | 1 | Se queda con el único *job* de partida o mete todo en uno, o faltan dos o más puntos |
| 0 | 0 | No hay workflow |

### C4 · Los gates paran el cambio

| Campo | Valor |
|-------|-------|
| OA | OA3 c |
| Peso | 2 |
| Dónde mirar | Rama `prueba-gates` (en `ramasSinFusionar` de `<username>.datos.json`) y `README.md` (sección «Una ejecución en rojo») |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Rama subida y sin fusionar, y tabla con el resultado de cada *job*: lint en rojo con su línea, tests en verde y, si montó el gate, spec existente en rojo |
| 1 | 1 | La rama existe pero la tabla no explica los fallos, o la rama se fusionó |
| 0 | 0 | No hay rama ni ejecución en rojo |

### C5 · Lo que no detectan

| Campo | Valor |
|-------|-------|
| OA | OA3 c |
| Peso | 1 |
| Dónde mirar | `README.md`, sección «Lo que no detectan» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Un cambio concreto que incumple la spec y pasa todos los gates, con lo que lo detectaría |
| 0 | 0 | Falta o es genérico |
