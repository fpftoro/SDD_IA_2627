# Rúbrica · E10 De la spec aprobada a `main` (integrador)

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valoran **leyendo** el repositorio en `main`, el `README.md`, las sesiones exportadas y el historial (`<username>.datos.json`). El resultado de la CI se consulta en GitHub (`CORRECCION.md`). La solución de referencia, el hueco de la spec y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · El flujo completo

| Campo | Valor |
|-------|-------|
| OA | OA2 a |
| Peso | 1 |
| Dónde mirar | `README.md`, «Recorrido»; historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Todas las fases en orden, con su artefacto, su punto de control y su commit; la spec 1.1, el plan, las tasks y los ciclos en la rama; la fusión y la replanificación en `main` |
| 0 | 0 | Falta alguna fase, o el orden no es el del flujo (por ejemplo, código antes del plan) |

### C2 · Plan

| Campo | Valor |
|-------|-------|
| OA | OA2 b |
| Peso | 2 |
| Dónde mirar | `docs/specs/C-marcar-hecha/plan.md` y `spec.md`; `README.md`, «Hueco de la spec» y «Decisiones» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Plan aprobado, sin código, con las decisiones justificadas y una fila de pruebas por identificador con su tipo; al menos un hueco real de la spec resuelto en la spec 1.1 (no en el plan) |
| 1 | 1 | Plan correcto pero el hueco se decidió en el plan o en el código, o faltan filas de pruebas |
| 0 | 0 | No hay plan, o tiene código |

### C3 · Tasks y ciclos

| Campo | Valor |
|-------|-------|
| OA | OA2 c |
| Peso | 3 |
| Dónde mirar | `tasks.md`; commits de la rama; `README.md`, «Puntos de control»; `src/`, `public/`, `tests/` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Tasks pequeñas con los tests antes; un commit por grupo, cada uno con su punto de control documentado y la CI en verde; los tests de C con su letra e identificador y los de A y B sin cambios; la página comprobada a mano con lo que se miró; el código cumple la spec |
| 2 | 2 | Falla uno de esos puntos |
| 1 | 1 | Fallan dos o tres, o se han modificado tests de A o B |
| 0 | 0 | La feature no está implementada o no hay ciclos |

### C4 · Estado

| Campo | Valor |
|-------|-------|
| OA | OA2 d |
| Peso | 2 |
| Dónde mirar | `docs/specs/README.md`, campo `Estado` de la spec, `tasks.md`; `README.md`, «Estado»; historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | El estado cambia en los commits que tocan (`En implementación` en el primer ciclo, `Implementada` en el último), la spec y el índice coinciden en cada momento, las tasks están marcadas, y la fusión es `--no-ff` con el mensaje de la convención |
| 1 | 1 | El estado final es correcto, pero los cambios no van en los commits que tocan, o la fusión no sigue la convención |
| 0 | 0 | El índice o la spec no dicen la verdad al terminar |

### C5 · Contexto

| Campo | Valor |
|-------|-------|
| OA | OA2 e |
| Peso | 1 |
| Dónde mirar | `README.md`, «Contexto»; `sesiones/` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Una sesión por fase y por ciclo, con el contexto de cada una y lo que se dejó fuera; si se usó `/undo`, `/compact` o *explore*, se explica por qué |
| 0 | 0 | Varias fases en la misma sesión, o la sección no dice qué contexto se dio |

### C6 · Memoria del agente

| Campo | Valor |
|-------|-------|
| OA | OA2 f |
| Peso | 1 |
| Dónde mirar | `README.md`, «Replanificación»; el commit de replanificación |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Se usan los comandos del proyecto en las fases; las cuatro preguntas respondidas con hechos de esta feature; al menos un cambio en la memoria o el contexto, en su propio commit, que responde a algo que pasó |
| 0 | 0 | No hay replanificación, o el cambio no tiene relación con la feature |
