# Criterios de evaluación y ejercicios · UD4 (profesor)

Relación de cada criterio de evaluación del **OA4** con los temas, el test, el cuestionario, los ejercicios y los criterios de sus rúbricas. El OA y los criterios para el alumnado están en [`../objetivos-aprendizaje.md`](../objetivos-aprendizaje.md).

> Fichero generado con `herramientas/generar-criterios.py` a partir de las rúbricas, los enunciados de los ejercicios, los temas, `00-test/preguntas.json` y `practicas/02-cuestionario.md`. **No se edita a mano.**

## Resumen por criterio de evaluación

En «Rúbricas» se indica cada criterio de corrección que evalúa el criterio, con su peso sobre el peso total del ejercicio.

| Criterio | Temas | Test (bloques) | Cuestionario (preguntas) | Ejercicios | Rúbricas (criterio · peso/total) |
|----------|-------|----------------|--------------------------|------------|----------------------------------|
| **a** | [1. Varios agentes: orquestación, roles y trabajo en paralelo](../01-multiagente.md) | 1 | 1–4 | [E01](../practicas/ejercicios/E01-SubagentesPrestamo/ENUNCIADO.md), [E03](../practicas/ejercicios/E03-DosFeaturesParalelo/ENUNCIADO.md), [E08](../practicas/ejercicios/E08-AmpliarProyecto/ENUNCIADO.md) | E01 · C1 (3/10), E01 · C2 (3/10), E01 · C3 (1/10), E01 · C4 (2/10), E01 · C5 (1/10), E03 · C1 (1/10), E03 · C2 (2/10), E03 · C3 (2/10), E03 · C4 (2/10), E08 · C3 (2/10) |
| **b** | [1. Varios agentes: orquestación, roles y trabajo en paralelo](../01-multiagente.md) | 1 | 5–8 | [E02](../practicas/ejercicios/E02-HandoffsSeguridad/ENUNCIADO.md), [E03](../practicas/ejercicios/E03-DosFeaturesParalelo/ENUNCIADO.md), [E08](../practicas/ejercicios/E08-AmpliarProyecto/ENUNCIADO.md) | E02 · C1 (2/10), E02 · C2 (2/10), E02 · C3 (2/10), E02 · C4 (2/10), E02 · C5 (2/10), E03 · C5 (2/10), E03 · C6 (1/10), E08 · C4 (2/10) |
| **c** | [2. SDD en equipo](../02-sdd-en-equipo.md) | 2 | 9–12 | [E04](../practicas/ejercicios/E04-EquipoGobernanza/ENUNCIADO.md), [E08](../practicas/ejercicios/E08-AmpliarProyecto/ENUNCIADO.md) | E04 · C1 (2/10), E04 · C2 (2/10), E04 · C3 (1/10), E04 · C4 (1/10), E04 · C5 (3/10), E04 · C6 (1/10), E08 · C1 (1/10), E08 · C2 (1/10) |
| **d** | [3. Casos prácticos: proyectos nuevos y código existente](../03-casos-practicos.md) | 3 | 13–16 | [E05](../practicas/ejercicios/E05-SpecHeredada/ENUNCIADO.md), [E06](../practicas/ejercicios/E06-DeltaOpenSpec/ENUNCIADO.md), [E08](../practicas/ejercicios/E08-AmpliarProyecto/ENUNCIADO.md) | E05 · C1 (2/10), E05 · C2 (3/10), E05 · C3 (1/10), E05 · C4 (4/10), E06 · C1 (1/10), E06 · C2 (2/10), E06 · C3 (3/10), E06 · C4 (2/10), E06 · C5 (2/10), E08 · C5 (2/10) |
| **e** | [4. Antipatrones del flujo](../04-antipatrones.md) | 4 | 17–20 | [E07](../practicas/ejercicios/E07-DetectarAntipatrones/ENUNCIADO.md), [E08](../practicas/ejercicios/E08-AmpliarProyecto/ENUNCIADO.md) | E07 · C1 (1/10), E07 · C2 (3/10), E07 · C3 (1/10), E07 · C4 (2/10), E07 · C5 (1/10), E07 · C6 (1/10), E07 · C7 (1/10), E08 · C6 (2/10) |

Texto de cada criterio:

- **a.** Se han caracterizado las topologías y los roles de un sistema multiagente y el trabajo en paralelo.
- **b.** Se han definido *handoffs* entre agentes y medidas de seguridad y trazabilidad.
- **c.** Se ha descrito el papel de cada rol de un equipo en el flujo y la gobernanza de la constitución.
- **d.** Se ha aplicado SDD en proyectos nuevos y en código existente (*brownfield*, refactorizaciones y migraciones).
- **e.** Se han identificado antipatrones del flujo y se han propuesto correcciones.

## Criterios de corrección por ejercicio

### E01 · Subagentes del préstamo

Peso total: 10 · [rúbrica](./E01-SubagentesPrestamo/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Situaciones | OA4 a | 3 |
| C2 · Los tres agentes | OA4 a | 3 |
| C3 · Roles y modelo | OA4 a | 1 |
| C4 · Comprobación | OA4 a | 2 |
| C5 · Topología | OA4 a | 1 |

### E02 · Handoffs y seguridad

Peso total: 10 · [rúbrica](./E02-HandoffsSeguridad/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Encargos | OA4 b | 2 |
| C2 · *Handoff* | OA4 b | 2 |
| C3 · Agujeros | OA4 b | 2 |
| C4 · Agentes corregidos | OA4 b | 2 |
| C5 · Personas y trazabilidad | OA4 b | 2 |

### E03 · Dos features en paralelo

Peso total: 10 · [rúbrica](./E03-DosFeaturesParalelo/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · *Worktrees* y ramas | OA4 a | 1 |
| C2 · Los dos planes | OA4 a | 2 |
| C3 · Comparación de los planes | OA4 a | 2 |
| C4 · Predicción y comprobación | OA4 a | 2 |
| C5 · Orden y replanificación | OA4 b | 2 |
| C6 · Proceso con el agente | OA4 b | 1 |

### E04 · Equipo y gobernanza

Peso total: 10 · [rúbrica](./E04-EquipoGobernanza/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Puntos de control y cuello de botella | OA4 c | 2 |
| C2 · `CODEOWNERS` | OA4 c | 2 |
| C3 · Plantilla de la PR de la spec | OA4 c | 1 |
| C4 · Sección de la constitución | OA4 c | 1 |
| C5 · PR de la constitución | OA4 c | 3 |
| C6 · Clasificación | OA4 c | 1 |

### E05 · Spec de un módulo heredado

Peso total: 10 · [rúbrica](./E05-SpecHeredada/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Qué hace y rarezas | OA4 d | 2 |
| C2 · Tests de caracterización | OA4 d | 3 |
| C3 · Decisiones | OA4 d | 1 |
| C4 · Spec del comportamiento actual | OA4 d | 4 |

### E06 · Un cambio con delta de OpenSpec

Peso total: 10 · [rúbrica](./E06-DeltaOpenSpec/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · OpenSpec en el proyecto | OA4 d | 1 |
| C2 · Refactorización con los tests intactos | OA4 d | 2 |
| C3 · La delta | OA4 d | 3 |
| C4 · Tests del cambio | OA4 d | 2 |
| C5 · Implementación, spec, archivo y fusión | OA4 d | 2 |

### E07 · Detectar antipatrones

Peso total: 10 · [rúbrica](./E07-DetectarAntipatrones/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Señales | OA4 e | 1 |
| C2 · Hallazgos | OA4 e | 3 |
| C3 · Falsos positivos | OA4 e | 1 |
| C4 · Plan de corrección | OA4 e | 2 |
| C5 · La spec 1.1 | OA4 e | 1 |
| C6 · El *gate* | OA4 e | 1 |
| C7 · Qué leer | OA4 e | 1 |

### E08 · Ampliar un proyecto existente (integrador)

Peso total: 10 · [rúbrica](./E08-AmpliarProyecto/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Gobierno del equipo | OA4 c | 1 |
| C2 · La constitución | OA4 c | 1 |
| C3 · Paralelismo, orden y replanificación | OA4 a | 2 |
| C4 · *Handoffs*, permisos y trazabilidad | OA4 b | 2 |
| C5 · Features C y D con el flujo | OA4 d | 2 |
| C6 · Auditoría | OA4 e | 2 |
