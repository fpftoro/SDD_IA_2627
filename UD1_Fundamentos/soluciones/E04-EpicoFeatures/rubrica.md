# Rúbrica · E04 Del épico a las features

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** el `README.md` y `docs/specs/README.md` del alumno, comparándolos con la clave del [`README.md`](./README.md) de este ejercicio, que recoge también las alternativas válidas.

---

### C1 · Clasificación

| Campo | Valor |
|-------|-------|
| OA | OA1 d |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «Clasificación» |

Una fila es **correcta** si el nivel coincide con la clave (o con una alternativa válida) y, si no es una feature, «Qué hacer» la lleva a una feature razonable (dividir, contexto, plan o spec, según el nivel).

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Catorce o más filas correctas, entre ellas L6 (épico) y las tasks técnicas L4 y L9 |
| 2 | 2 | Once a trece filas correctas |
| 1 | 1 | Ocho a diez filas correctas, o más filas con el nivel bien pero sin decir qué hacer con las que no son features |
| 0 | 0 | Falta la sección o tiene menos de ocho filas correctas |

### C2 · Features

| Campo | Valor |
|-------|-------|
| OA | OA1 d |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «Features» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Una feature por cada caso de uso del PRD (consultar, reservar, préstamo, devolución, incidencia), ninguna para lo que el PRD deja fuera de alcance ni ninguna técnica o épica; cada una con un valor que se entiende por sí mismo, sus dependencias y una historia con *Como…, quiero…, para…* |
| 2 | 2 | Cubre los casos de uso, pero falla uno de estos puntos: una feature técnica o demasiado grande, una historia sin *para qué* o un valor que no se sostiene sin otra feature |
| 1 | 1 | Falta un caso de uso, o fallan dos o más de los puntos anteriores |
| 0 | 0 | Falta la sección, faltan dos o más casos de uso, o las «features» son tasks o épicos |

### C3 · Orden

| Campo | Valor |
|-------|-------|
| OA | OA1 d |
| Peso | 2 |
| Dónde mirar | `README.md`, secciones «Features» (prefijos y dependencias) y «Orden» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Ninguna feature depende de otra con un prefijo posterior, y la justificación usa los tres criterios (dependencias, valor y riesgo) aplicados a features concretas: qué va primero, qué se adelanta por riesgo y qué queda al final |
| 1 | 1 | El orden respeta las dependencias, pero la justificación usa uno o dos criterios, o es genérica |
| 0 | 0 | Falta la sección o alguna feature va antes que otra de la que depende |

### C4 · Índice de features

| Campo | Valor |
|-------|-------|
| OA | OA1 d |
| Peso | 2 |
| Dónde mirar | `docs/specs/README.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Existe, tiene la tabla `# \| Feature \| Carpeta \| Estado` con una fila por cada feature del README y en el mismo orden, carpetas con el formato `<prefijo>-<nombre-en-minusculas>/` y todas en `⏳ Pendiente` |
| 1 | 1 | Existe, pero no coincide con la tabla de features del README, o las carpetas no siguen el formato, o los estados no son `⏳ Pendiente` |
| 0 | 0 | No existe o no tiene una tabla de features |
