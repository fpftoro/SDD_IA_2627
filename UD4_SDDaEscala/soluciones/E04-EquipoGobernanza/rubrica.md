# Rúbrica · E04 Equipo y gobernanza

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** los ficheros del alumno. La clave y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Puntos de control y cuello de botella

| Campo | Valor |
|-------|-------|
| OA | OA4 c |
| Peso | 2 |
| Dónde mirar | `README.md`, secciones «Puntos de control» y «Cuello de botella» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Producto aprueba la spec, arquitectura el plan, desarrollo las tasks y los ciclos; calidad participa en la spec y en las tasks; cada fila tiene una pregunta concreta y un agente; separa lo que arquitectura revisa sí o sí (constitución, memoria del agente, CI, decisiones que cruzan capas) de lo que puede revisar otra persona |
| 1 | 1 | Reparto correcto pero con preguntas genéricas, o reparto del cuello de botella incompleto (por ejemplo, arquitectura revisa todo) |
| 0 | 0 | Un rol aprueba todos los puntos, o falta la sección |

### C2 · `CODEOWNERS`

| Campo | Valor |
|-------|-------|
| OA | OA4 c |
| Peso | 2 |
| Dónde mirar | `.github/CODEOWNERS` y `README.md`, sección «Propietarios» (a) y (c) |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Línea general primero y excepciones después; constitución, `AGENTS.md`, `opencode.json`, `.opencode/` y `.github/` de arquitectura; PRD y specs de producto (y calidad); tests de calidad; explica «gana la última» y por qué `.opencode/` es de arquitectura |
| 1 | 1 | Algún propietario mal asignado, o la línea `*` en mal sitio, o explicaciones incompletas |
| 0 | 0 | Falta el fichero o el orden anula las excepciones |

### C3 · Plantilla de la PR de la spec

| Campo | Valor |
|-------|-------|
| OA | OA4 c |
| Peso | 1 |
| Dónde mirar | `.github/PULL_REQUEST_TEMPLATE/spec.md` y «Propietarios» (b) |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Lista con una casilla de producto y otra de calidad sobre los *edge cases*, y explica que GitHub solo exige a uno de los propietarios de la línea |
| 0 | 0 | Sin casilla de calidad o afirma que GitHub exige a ambos |

### C4 · Sección de la constitución

| Campo | Valor |
|-------|-------|
| OA | OA4 c |
| Peso | 1 |
| Dónde mirar | `constitution.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Sección «Permisos» que recoge reservas propias, coordinación sobre cualquiera y devolución abierta a cualquier persona identificada, sin decir cómo se implementa; el resto del fichero, sin cambios |
| 0 | 0 | Falta, dice cómo se implementa, olvida la devolución o cambia otros principios |

### C5 · PR de la constitución

| Campo | Valor |
|-------|-------|
| OA | OA4 c |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «PR de la constitución» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Las cuatro preguntas respondidas con el análisis de impacto (código sin incumplimientos; ramas D y E afectadas; F nace con el principio); tabla de quién actúa con producto decidiendo lo de las incidencias; versión menor |
| 2 | 2 | Las cuatro preguntas pero la tabla omite una rama o no dice quién decide lo que es de producto |
| 1 | 1 | «A qué afecta» genérico (no usa el análisis) o la tabla es superficial |
| 0 | 0 | Falta la sección |

### C6 · Clasificación

| Campo | Valor |
|-------|-------|
| OA | OA4 c |
| Peso | 1 |
| Dónde mirar | `README.md`, sección «Clasificación» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Siete u ocho correctos y razonados (a la constitución: 2, 6 y 7) |
| 0 | 0 | Menos de siete |
