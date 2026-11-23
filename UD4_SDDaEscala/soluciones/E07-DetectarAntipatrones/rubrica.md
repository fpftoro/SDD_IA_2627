# Rúbrica · E07 Detectar antipatrones

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valoran leyendo el `README.md`, la spec y el script del alumno. La clave y el repositorio de la auditoría están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Señales

| Campo | Valor |
|-------|-------|
| OA | OA4 e |
| Peso | 1 |
| Dónde mirar | `README.md`, sección «Señales» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Al menos seis comandos reales, con la salida relevante y qué sugiere cada una; incluye el historial por tamaño, los tests modificados y las trampas |
| 0 | 0 | Menos de seis, sin salida o sin interpretar |

### C2 · Hallazgos

| Campo | Valor |
|-------|-------|
| OA | OA4 e |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «Hallazgos» |

Hay diecinueve hallazgos en la clave. Cuentan los reales y bien situados en su fase, con evidencia repetible.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Diez o más hallazgos reales, ordenados por fase, con evidencia, consecuencia y corrección; incluye el borrado y el salto de capas (constitución), el test borrado, el marcador y el *spec drift* |
| 2 | 2 | Siete a nueve, o diez sin ordenar por fase o sin evidencia en varios |
| 1 | 1 | Cuatro a seis |
| 0 | 0 | Menos de cuatro, o antipatrones inventados (no están en el repositorio) |

### C3 · Falsos positivos

| Campo | Valor |
|-------|-------|
| OA | OA4 e |
| Peso | 1 |
| Dónde mirar | `README.md`, sección «Falsos positivos» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Identifica el lockfile y el renombrado, y explica con un comando por qué no son un problema (`package.json` sin cambios; `R100`) |
| 0 | 0 | Marca alguno como antipatrón, o no los identifica |

### C4 · Plan de corrección

| Campo | Valor |
|-------|-------|
| OA | OA4 e |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Plan de corrección» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Empieza por la spec y sigue el orden del flujo (spec, plan, tasks, ciclos, controles, estado); cada paso con quién aprueba y un mensaje de commit; dice qué se aprovecha y qué se descarta; la implementación parte de `main` |
| 1 | 1 | Orden correcto pero sin aprobadores o commits, o empieza por el código |
| 0 | 0 | «Arreglar el código» sin pasar por la spec |

### C5 · La spec 1.1

| Campo | Valor |
|-------|-------|
| OA | OA4 e |
| Peso | 1 |
| Dónde mirar | `docs/specs/F-cancelar-reserva/spec.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Versión 1.1 en `Borrador`; EARS sin prescribir implementación ni adjetivos vagos; permisos (403), estado `cancelada` y 404/409; cuatro AC en Gherkin que validan; fuera de alcance; sin marcadores |
| 0 | 0 | Prescribe implementación, falta el 403, no valida o conserva marcadores |

### C6 · El *gate*

| Campo | Valor |
|-------|-------|
| OA | OA4 e |
| Peso | 1 |
| Dónde mirar | `herramientas/comprobar-trampas.sh` y `README.md`, sección «*Gate*» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Falla con salida distinta de 0 sobre la rama y pasa sobre `main`; solo mira líneas añadidas en `src/` y `tests/` (no el lockfile); pega las dos salidas |
| 0 | 0 | No falla, falla en `main`, o da falsos positivos con el lockfile |

### C7 · Qué leer

| Campo | Valor |
|-------|-------|
| OA | OA4 e |
| Peso | 1 |
| Dónde mirar | `README.md`, sección «Qué leer» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Cuatro cambios con el riesgo razonado (coste, reversibilidad, comprobaciones): lee entero el borrado y los permisos, siempre los tests tocados, y no lee lo que no hace falta |
| 0 | 0 | Menos de cuatro, o «leo todo» / «no leo nada» sin criterio |
