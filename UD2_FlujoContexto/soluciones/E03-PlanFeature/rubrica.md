# Rúbrica · E03 El plan de una feature

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md). La entrega está en la rama `feature/B-reservar-carro` (`RAMA=feature/B-reservar-carro` al preparar la corrección).

Se valoran **leyendo** el plan, el `README.md` y el historial (`<username>.datos.json`). El plan de referencia, las propuestas habituales del agente y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Preparación y fase sin código

| Campo | Valor |
|-------|-------|
| OA | OA2 b |
| Peso | 2 |
| Dónde mirar | Historial de la rama, `sesiones/plan.md`, `README.md` (sección «Sesión con el agente») |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Rama `feature/B-reservar-carro` sin fusionar; el plan se pidió con *plan* y se guardó con *build*; la sesión está exportada; la rama no cambia nada de `src/`, `tests/` ni de la configuración |
| 1 | 1 | Falta la sesión exportada, o el trabajo está en `main`, o la rama cambia algún fichero que no le toca |
| 0 | 0 | Hay código en la rama, o no hay rastro de la sesión con el agente |

### C2 · Conversación y decisiones

| Campo | Valor |
|-------|-------|
| OA | OA2 b |
| Peso | 3 |
| Dónde mirar | `README.md`, secciones «Sesión con el agente», «Decisiones» y «Huecos de la spec» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | La sesión tiene una pregunta o alternativa, al menos un rechazo y la comprobación de la cobertura; cada fila de «Decisiones» tiene un motivo concreto (la spec, la constitución o el código existente); los huecos se resolvieron en la spec (1.1) o se justificó que no lo eran |
| 2 | 2 | Falta uno de esos elementos, o algún motivo es genérico («me parece mejor») |
| 1 | 1 | Solo se aceptan propuestas, o los motivos son genéricos en casi todas las filas |
| 0 | 0 | Faltan las secciones o no dicen qué se decidió |

### C3 · Plan: constitución y decisiones

| Campo | Valor |
|-------|-------|
| OA | OA2 b |
| Peso | 3 |
| Dónde mirar | `docs/specs/B-reservar-carro/plan.md`, de «Metadatos» a «Dependencias» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Plantilla completa y estado `Aprobado`; la comprobación de la constitución recorre sus principios; las comprobaciones están en el servicio; reutiliza el middleware de identificación; sin dependencias nuevas; cada decisión con motivo e identificadores, y las rechazadas como descartadas; sin código |
| 2 | 2 | Falla uno de esos puntos |
| 1 | 1 | Fallan dos o tres, o hay código en el plan o una dependencia nueva sin justificar |
| 0 | 0 | No hay plan, o no sigue la plantilla del curso |

### C4 · Plan: secuencia y pruebas

| Campo | Valor |
|-------|-------|
| OA | OA2 b |
| Peso | 2 |
| Dónde mirar | `plan.md`, secciones «Secuencia de implementación» y «Estrategia de pruebas»; `README.md`, «Lista de comprobación» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Secuencia de dentro afuera con los tests antes de cada parte y su porqué; una fila por cada identificador de la spec, con su tipo y lo que se ve en la API como integración; dice cómo se fija «hoy» en los tests; la lista de comprobación marcada coincide con lo que cumple el plan |
| 1 | 1 | Faltan entre uno y tres identificadores, o la secuencia no tiene los tests antes, o la lista está marcada sin cumplirse |
| 0 | 0 | Falta la estrategia de pruebas o faltan más de tres identificadores |
