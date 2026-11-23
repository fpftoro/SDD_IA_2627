# Rúbrica · E09 Un cambio con OpenSpec

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valoran **leyendo** el repositorio en `main`, el `README.md`, las sesiones exportadas y el historial. La solución comprobada, los fallos frecuentes del agente y las alternativas válidas están en el [`README.md`](./README.md) de este ejercicio. La parte con Spec Kit es opcional y no puntúa.

---

### C1 · Revisión de la propuesta

| Campo | Valor |
|-------|-------|
| OA | OA2 d |
| Peso | 3 |
| Dónde mirar | `README.md`, «Revisión de la propuesta» y «Decisiones»; `openspec/changes/archive/*-filtrar-por-carro/` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | Los cuatro artefactos revisados con algo concreto en cada uno; al menos una corrección real (comportamiento sin decidir, capacidad equivocada, tests al final, task de la spec 1.1); la delta modifica `portatiles`, con escenarios WHEN y THEN, y valida en modo estricto |
| 2 | 2 | Revisión de tres artefactos, o cuatro sin ninguna corrección justificada |
| 1 | 1 | Revisión superficial («todo bien») o delta que no valida |
| 0 | 0 | Sin revisión documentada |

### C2 · Implementación

| Campo | Valor |
|-------|-------|
| OA | OA2 d |
| Peso | 2 |
| Dónde mirar | `src/`, `tests/`, `docs/specs/A-consultar-portatiles/spec.md`; el commit de la fase 3; `sesiones/implementacion.md` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | El filtro en el servicio, con los mensajes exactos; tests nuevos con identificador y sin cambiar los de A; la spec de A en 1.1 en el mismo commit que el código; sesión nueva para implementar |
| 1 | 1 | Falta la spec 1.1, o se modificaron tests de A, o el filtro está en el controlador |
| 0 | 0 | El cambio no está implementado o los tests no pasan |

### C3 · Archivo y estado

| Campo | Valor |
|-------|-------|
| OA | OA2 d |
| Peso | 3 |
| Dónde mirar | `openspec/specs/portatiles/spec.md`, `openspec/changes/archive/`; historial de `main` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | El cambio archivado con todas sus tasks marcadas; la spec vigente tiene los requisitos nuevos (aplicados por el archivo, no a mano); los cuatro commits de la rama en orden y la fusión `--no-ff` |
| 2 | 2 | Falta uno de esos puntos (por ejemplo, tasks sin marcar o un commit) |
| 1 | 1 | El cambio no se archivó, o la spec vigente se editó a mano |
| 0 | 0 | No hay cambio de OpenSpec |

### C4 · Comparación

| Campo | Valor |
|-------|-------|
| OA | OA2 d |
| Peso | 2 |
| Dónde mirar | `README.md`, «Qué instala OpenSpec» y «OpenSpec y el flujo a mano» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Explica qué instala OpenSpec; la tabla compara los cinco aspectos con datos concretos de este proyecto; dice para qué trabajo usaría cada uno y cómo evitar que las dos specs se separen |
| 1 | 1 | Tabla incompleta o genérica, o sin la conclusión |
| 0 | 0 | Faltan las secciones |
