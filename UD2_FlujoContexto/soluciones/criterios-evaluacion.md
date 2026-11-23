# Criterios de evaluación y ejercicios · UD2 (profesor)

Relación de cada criterio de evaluación del **OA2** con los temas, el test, el cuestionario, los ejercicios y los criterios de sus rúbricas. El OA y los criterios para el alumnado están en [`../objetivos-aprendizaje.md`](../objetivos-aprendizaje.md).

> Fichero generado con `herramientas/generar-criterios.py` a partir de las rúbricas, los enunciados de los ejercicios, los temas, `00-test/preguntas.json` y `practicas/02-cuestionario.md`. **No se edita a mano.**

## Resumen por criterio de evaluación

En «Rúbricas» se indica cada criterio de corrección que evalúa el criterio, con su peso sobre el peso total del ejercicio.

| Criterio | Temas | Test (bloques) | Cuestionario (preguntas) | Ejercicios | Rúbricas (criterio · peso/total) |
|----------|-------|----------------|--------------------------|------------|----------------------------------|
| **a** | [1. El flujo SDD](../01-flujo-sdd.md) | 1 | 1–4 | [E01](../practicas/ejercicios/E01-RecorridoFeature/ENUNCIADO.md), [E10](../practicas/ejercicios/E10-FeatureEnMain/ENUNCIADO.md) | E01 · C1 (2/10), E01 · C2 (3/10), E01 · C3 (3/10), E01 · C4 (2/10), E10 · C1 (1/10) |
| **b** | [2. Especificar y planificar](../02-especificar-planificar.md) | 2 | 5–8 | [E02](../practicas/ejercicios/E02-PlanErroresSembrados/ENUNCIADO.md), [E03](../practicas/ejercicios/E03-PlanFeature/ENUNCIADO.md), [E10](../practicas/ejercicios/E10-FeatureEnMain/ENUNCIADO.md) | E02 · C1 (3/10), E02 · C2 (2/10), E02 · C3 (3/10), E02 · C4 (2/10), E03 · C1 (2/10), E03 · C2 (3/10), E03 · C3 (3/10), E03 · C4 (2/10), E10 · C2 (2/10) |
| **c** | [3. Descomponer en tasks e implementar](../03-tasks-implementar.md) | 3 | 9–12 | [E04](../practicas/ejercicios/E04-PlanTasks/ENUNCIADO.md), [E05](../practicas/ejercicios/E05-CiclosCortos/ENUNCIADO.md), [E10](../practicas/ejercicios/E10-FeatureEnMain/ENUNCIADO.md) | E04 · C1 (3/10), E04 · C2 (2/10), E04 · C3 (3/10), E04 · C4 (2/10), E05 · C1 (3/10), E05 · C2 (2/10), E05 · C3 (2/10), E05 · C4 (3/10), E10 · C3 (3/10) |
| **d** | [4. Artefactos y estado de las features](../04-artefactos-estado.md) | 4 | 13–16 | [E06](../practicas/ejercicios/E06-EstadoProyecto/ENUNCIADO.md), [E09](../practicas/ejercicios/E09-CambioOpenSpec/ENUNCIADO.md), [E10](../practicas/ejercicios/E10-FeatureEnMain/ENUNCIADO.md) | E06 · C1 (3/10), E06 · C2 (1/10), E06 · C3 (3/10), E06 · C4 (3/10), E09 · C1 (3/10), E09 · C2 (2/10), E09 · C3 (3/10), E09 · C4 (2/10), E10 · C4 (2/10) |
| **e** | [5. La ventana de contexto](../05-ventana-contexto.md) | 5 | 17–20 | [E07](../practicas/ejercicios/E07-ContextoJusto/ENUNCIADO.md), [E10](../practicas/ejercicios/E10-FeatureEnMain/ENUNCIADO.md) | E07 · C1 (4/10), E07 · C2 (2/10), E07 · C3 (2/10), E07 · C4 (2/10), E10 · C5 (1/10) |
| **f** | [6. Memoria persistente del agente](../06-memoria-persistente.md) | 6 | 21–23 | [E08](../practicas/ejercicios/E08-MemoriaAgente/ENUNCIADO.md), [E10](../practicas/ejercicios/E10-FeatureEnMain/ENUNCIADO.md) | E08 · C1 (3/10), E08 · C2 (2/10), E08 · C3 (3/10), E08 · C4 (2/10), E10 · C6 (1/10) |

Texto de cada criterio:

- **a.** Se han identificado las fases del flujo, los artefactos que produce cada una y el papel del humano y del agente.
- **b.** Se ha generado y revisado un plan técnico a partir de una especificación aprobada, sin que el agente escriba código.
- **c.** Se ha descompuesto un plan en *tasks* aisladas, ordenadas y verificables, y se han implementado en ciclos cortos con revisión.
- **d.** Se ha llevado el control del estado de las *features* y de los artefactos en el repositorio.
- **e.** Se han reconocido las limitaciones de la ventana de contexto y se han aplicado estrategias para gestionarla.
- **f.** Se han configurado instrucciones persistentes, instrucciones contextuales, *skills* y comandos reutilizables para el agente.

## Criterios de corrección por ejercicio

### E01 · El recorrido de una feature

Peso total: 10 · [rúbrica](./E01-RecorridoFeature/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Mapa del recorrido | OA2 a | 2 |
| C2 · Dónde se corrige | OA2 a | 3 |
| C3 · Fallos del historial | OA2 a | 3 |
| C4 · Replanificación | OA2 a | 2 |

### E02 · Plan con errores sembrados

Peso total: 10 · [rúbrica](./E02-PlanErroresSembrados/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Errores localizados | OA2 b | 3 |
| C2 · Consecuencias y dónde se corrige | OA2 b | 2 |
| C3 · Plan corregido: constitución y decisiones | OA2 b | 3 |
| C4 · Plan corregido: secuencia, pruebas, huecos y estado | OA2 b | 2 |

### E03 · El plan de una feature

Peso total: 10 · [rúbrica](./E03-PlanFeature/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Preparación y fase sin código | OA2 b | 2 |
| C2 · Conversación y decisiones | OA2 b | 3 |
| C3 · Plan: constitución y decisiones | OA2 b | 3 |
| C4 · Plan: secuencia y pruebas | OA2 b | 2 |

### E04 · Del plan a las tasks

Peso total: 10 · [rúbrica](./E04-PlanTasks/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Tamaño, orden y verificabilidad | OA2 c | 3 |
| C2 · Cobertura del plan | OA2 c | 2 |
| C3 · Errores en las tasks de D | OA2 c | 3 |
| C4 · El orden y el historial | OA2 c | 2 |

### E05 · Implementar en ciclos cortos

Peso total: 10 · [rúbrica](./E05-CiclosCortos/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Ciclos cortos | OA2 c | 3 |
| C2 · Punto de control 4 | OA2 c | 2 |
| C3 · Hueco de la spec | OA2 c | 2 |
| C4 · Feature terminada y fusionada | OA2 c | 3 |

### E06 · El estado del proyecto

Peso total: 10 · [rúbrica](./E06-EstadoProyecto/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Diagnóstico | OA2 d | 3 |
| C2 · Ramas | OA2 d | 1 |
| C3 · Corrección del estado | OA2 d | 3 |
| C4 · Replanificación | OA2 d | 3 |

### E07 · El contexto justo

Peso total: 10 · [rúbrica](./E07-ContextoJusto/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Diagnóstico de los fragmentos | OA2 e | 4 |
| C2 · Contexto por fase | OA2 e | 2 |
| C3 · Prompt de planificar | OA2 e | 2 |
| C4 · Tipos de memoria | OA2 e | 2 |

### E08 · La memoria del agente

Peso total: 10 · [rúbrica](./E08-MemoriaAgente/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Revisión de AGENTS.md | OA2 f | 3 |
| C2 · Regla de carpeta y skill | OA2 f | 2 |
| C3 · Comando y subagente | OA2 f | 3 |
| C4 · Comprobación y uso | OA2 f | 2 |

### E09 · Un cambio con OpenSpec

Peso total: 10 · [rúbrica](./E09-CambioOpenSpec/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Revisión de la propuesta | OA2 d | 3 |
| C2 · Implementación | OA2 d | 2 |
| C3 · Archivo y estado | OA2 d | 3 |
| C4 · Comparación | OA2 d | 2 |

### E10 · De la spec aprobada a `main` (integrador)

Peso total: 10 · [rúbrica](./E10-FeatureEnMain/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · El flujo completo | OA2 a | 1 |
| C2 · Plan | OA2 b | 2 |
| C3 · Tasks y ciclos | OA2 c | 3 |
| C4 · Estado | OA2 d | 2 |
| C5 · Contexto | OA2 e | 1 |
| C6 · Memoria del agente | OA2 f | 1 |
