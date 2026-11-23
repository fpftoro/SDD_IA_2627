# Rúbrica · E02 Plan con errores sembrados

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Todos los criterios se valoran **leyendo** el `README.md` del alumno y su plan corregido `docs/specs/D-registrar-devolucion/plan.md`. La lista de errores sembrados, lo que no es un error y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Errores localizados

| Campo | Valor |
|-------|-------|
| OA | OA2 b |
| Peso | 3 |
| Dónde mirar | `README.md`, sección «Errores» |

Un error cuenta si es real (está en la lista de errores sembrados o es otro error justificado), indica dónde está y lo nombra con un error típico o una línea de la lista del punto de control 2.

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Diez o más errores reales, entre ellos al menos uno contra la constitución, uno contra la spec (D-02, D-05 o D-08) y el código que no existe (servicio de usuarios) |
| 2 | 2 | Ocho o nueve errores reales, o diez sin alguno de los tres tipos anteriores |
| 1 | 1 | Cinco a siete errores reales |
| 0 | 0 | Falta la sección o tiene menos de cinco errores reales |

### C2 · Consecuencias y dónde se corrige

| Campo | Valor |
|-------|-------|
| OA | OA2 b |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Errores», columnas «Qué pasaría» y «Se corrige en» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | En casi todas las filas, la consecuencia es concreta (qué haría el agente o qué problema tendría el proyecto) y el documento es el correcto: los errores que contradicen la spec se quitan del plan, y lo que se nota desde fuera y la spec no decide va a la spec |
| 1 | 1 | La mitad de las filas son concretas, o algún error que contradice la spec se «corrige» cambiando la spec |
| 0 | 0 | Las columnas están vacías o son genéricas en casi todas las filas |

### C3 · Plan corregido: constitución y decisiones

| Campo | Valor |
|-------|-------|
| OA | OA2 b |
| Peso | 3 |
| Dónde mirar | Plan corregido, secciones «Metadatos», «Contexto técnico», «Comprobación de la constitución», «Ficheros», «Decisiones técnicas» y «Dependencias» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Cita la spec 1.0; la comprobación de la constitución recorre todos sus principios; la lógica está en el servicio; los permisos usan el papel del usuario de la petición; cada decisión tiene motivo e identificadores, y las propuestas rechazadas aparecen como descartadas; EC-08 sin cambios a medias; sin dependencias nuevas ni código |
| 2 | 2 | Falla uno de esos puntos |
| 1 | 1 | Fallan dos o tres, o sigue habiendo código en el plan o una decisión que contradice la spec |
| 0 | 0 | No existe el plan corregido o reproduce casi todos los errores del original |

### C4 · Plan corregido: secuencia, pruebas, huecos y estado

| Campo | Valor |
|-------|-------|
| OA | OA2 b |
| Peso | 2 |
| Dónde mirar | Plan corregido, secciones «Secuencia de implementación», «Estrategia de pruebas» y «Riesgos y dudas»; `README.md`, secciones «Huecos de la spec» y «Estado del plan» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Secuencia del servicio al controlador con los tests antes; una fila de pruebas por cada identificador de la spec, con su tipo y lo que se ve en la API como integración; el hueco de los nombres de los campos explicado con una propuesta y marcado en el plan, sin tocar la spec; y un estado distinto de `Aprobado`, explicado |
| 1 | 1 | Falla uno o dos de esos puntos |
| 0 | 0 | Falta la estrategia de pruebas, o el plan está `Aprobado` con huecos de la spec decididos en él |
