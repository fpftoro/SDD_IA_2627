# Criterios de evaluación y ejercicios · UD3 (profesor)

Relación de cada criterio de evaluación del **OA3** con los temas, el test, el cuestionario, los ejercicios y los criterios de sus rúbricas. El OA y los criterios para el alumnado están en [`../objetivos-aprendizaje.md`](../objetivos-aprendizaje.md).

> Fichero generado con `herramientas/generar-criterios.py` a partir de las rúbricas, los enunciados de los ejercicios, los temas, `00-test/preguntas.json` y `practicas/02-cuestionario.md`. **No se edita a mano.**

## Resumen por criterio de evaluación

En «Rúbricas» se indica cada criterio de corrección que evalúa el criterio, con su peso sobre el peso total del ejercicio.

| Criterio | Temas | Test (bloques) | Cuestionario (preguntas) | Ejercicios | Rúbricas (criterio · peso/total) |
|----------|-------|----------------|--------------------------|------------|----------------------------------|
| **a** | [1. Validación y *spec drift*](../01-validacion-spec-drift.md) | 1 | 1–4 | [E01](../practicas/ejercicios/E01-DriftSembrado/ENUNCIADO.md), [E09](../practicas/ejercicios/E09-FeatureDGatesVerde/ENUNCIADO.md) | E01 · C1 (3/10), E01 · C2 (3/10), E01 · C3 (1/10), E01 · C4 (2/10), E01 · C5 (1/10), E09 · C1 (2/10), E09 · C5 (1/10) |
| **b** | [2. Pruebas desde la spec](../02-pruebas-desde-spec.md) | 2 | 8–12 | [E03](../practicas/ejercicios/E03-TestsQueMienten/ENUNCIADO.md), [E04](../practicas/ejercicios/E04-TestsPrimero/ENUNCIADO.md), [E09](../practicas/ejercicios/E09-FeatureDGatesVerde/ENUNCIADO.md) | E03 · C1 (3/10), E03 · C2 (2/10), E03 · C3 (3/10), E03 · C4 (2/10), E04 · C1 (3/10), E04 · C2 (2/10), E04 · C3 (3/10), E04 · C4 (2/10), E09 · C3 (3/10) |
| **c** | [3. *Quality gates* e integración continua](../03-quality-gates.md) | 3 | 13–17 | [E05](../practicas/ejercicios/E05-GatesProyecto/ENUNCIADO.md), [E09](../practicas/ejercicios/E09-FeatureDGatesVerde/ENUNCIADO.md) | E05 · C1 (2/10), E05 · C2 (2/10), E05 · C3 (3/10), E05 · C4 (2/10), E05 · C5 (1/10), E09 · C4 (2/10) |
| **d** | [1. Validación y *spec drift*](../01-validacion-spec-drift.md) | 1 | 5–7 | [E02](../practicas/ejercicios/E02-SeisDiagnosticos/ENUNCIADO.md), [E09](../practicas/ejercicios/E09-FeatureDGatesVerde/ENUNCIADO.md) | E02 · C1 (4/10), E02 · C2 (2/10), E02 · C3 (3/10), E02 · C4 (1/10), E09 · C2 (2/10) |
| **e** | [4. El ecosistema de herramientas](../04-ecosistema.md) | 4 | 20–22 | [E07](../practicas/ejercicios/E07-ElegirHerramientas/ENUNCIADO.md) | E07 · C1 (2/10), E07 · C2 (3/10), E07 · C3 (2/10), E07 · C4 (2/10), E07 · C5 (1/10) |
| **f** | [5. MCP: conectar el agente con sistemas externos](../05-mcp.md) | 5 | 23–25 | [E08](../practicas/ejercicios/E08-McpMinimoPrivilegio/ENUNCIADO.md) | E08 · C1 (2/10), E08 · C2 (3/10), E08 · C3 (3/10), E08 · C4 (2/10) |
| **g** | [3. *Quality gates* e integración continua](../03-quality-gates.md) | 3 | 18–19 | [E06](../practicas/ejercicios/E06-EvaluarAgente/ENUNCIADO.md) | E06 · C1 (3/10), E06 · C2 (2/10), E06 · C3 (2/10), E06 · C4 (1/10), E06 · C5 (2/10) |

Texto de cada criterio:

- **a.** Se han validado la especificación, el código frente a la especificación y la arquitectura, y se ha detectado el *spec drift*.
- **b.** Se han derivado pruebas de los criterios de aceptación y de los *edge cases*, en el nivel adecuado, y se han escrito antes que el código.
- **c.** Se han definido y automatizado *quality gates* en un sistema de integración continua.
- **d.** Se ha diagnosticado un fallo distinguiendo un hueco en la especificación de un error de implementación.
- **e.** Se han comparado herramientas del ecosistema y se han justificado combinaciones según el proyecto.
- **f.** Se ha conectado el agente a sistemas externos mediante MCP aplicando el principio de mínimo privilegio.
- **g.** Se ha evaluado el comportamiento del agente con una batería de tareas repetidas, puntuando por separado el resultado, el respeto de los límites y la petición de ayuda, y comparando dos configuraciones del arnés (*harness*).

## Criterios de corrección por ejercicio

### E01 · El drift que nadie vio

Peso total: 10 · [rúbrica](./E01-DriftSembrado/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Búsqueda de identificadores y matriz | OA3 a | 3 |
| C2 · Hallazgos clasificados | OA3 a | 3 |
| C3 · Arquitectura | OA3 a | 1 |
| C4 · Tests que pueden fallar | OA3 a | 2 |
| C5 · Señales en el historial | OA3 a | 1 |

### E02 · Seis diagnósticos

Peso total: 10 · [rúbrica](./E02-SeisDiagnosticos/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Diagnósticos | OA3 d | 4 |
| C2 · Dónde se corrige y primer paso | OA3 d | 2 |
| C3 · Dos casos, de cerca | OA3 d | 3 |
| C4 · Lo que no se hace | OA3 d | 1 |

### E03 · Tests que mienten

Peso total: 10 · [rúbrica](./E03-TestsQueMienten/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Mentiras identificadas | OA3 b | 3 |
| C2 · Mutantes | OA3 b | 2 |
| C3 · Tests corregidos | OA3 b | 3 |
| C4 · Tests que faltan, en su nivel | OA3 b | 2 |

### E04 · Los tests primero

Peso total: 10 · [rúbrica](./E04-TestsPrimero/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Tests desde la spec | OA3 b | 3 |
| C2 · Revisión de los tests y rojo | OA3 b | 2 |
| C3 · Tests que el agente no controla | OA3 b | 3 |
| C4 · Proceso con el agente y fusión | OA3 b | 2 |

### E05 · Los gates del proyecto

Peso total: 10 · [rúbrica](./E05-GatesProyecto/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Lint con las capas | OA3 c | 2 |
| C2 · Cobertura, trazabilidad y estado | OA3 c | 2 |
| C3 · Workflow de integración continua | OA3 c | 3 |
| C4 · Los gates paran el cambio | OA3 c | 2 |
| C5 · Lo que no detectan | OA3 c | 1 |

### E06 · Evaluar al agente

Peso total: 10 · [rúbrica](./E06-EvaluarAgente/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Los intentos preparados | OA3 g | 3 |
| C2 · La batería, ejecutada y registrada | OA3 g | 2 |
| C3 · Tres puntuaciones por separado | OA3 g | 2 |
| C4 · La configuración B | OA3 g | 1 |
| C5 · Recuentos y conclusión | OA3 g | 2 |

### E07 · Elegir herramientas

Peso total: 10 · [rúbrica](./E07-ElegirHerramientas/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Restricciones primero | OA3 e | 2 |
| C2 · Matrices de decisión | OA3 e | 3 |
| C3 · Decisiones y combinaciones | OA3 e | 2 |
| C4 · Dos herramientas investigadas | OA3 e | 2 |
| C5 · Al cambiar de agente | OA3 e | 1 |

### E08 · MCP con mínimo privilegio

Peso total: 10 · [rúbrica](./E08-McpMinimoPrivilegio/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Revisión del servidor | OA3 f | 2 |
| C2 · Servidor corregido | OA3 f | 3 |
| C3 · Configuración con mínimo privilegio | OA3 f | 3 |
| C4 · La instrucción escondida | OA3 f | 2 |

### E09 · Feature D con los gates en verde (integrador)

Peso total: 10 · [rúbrica](./E09-FeatureDGatesVerde/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Validación de B | OA3 a | 2 |
| C2 · Diagnóstico y corrección | OA3 d | 2 |
| C3 · Feature D con los tests primero | OA3 b | 3 |
| C4 · Gates e integración continua | OA3 c | 2 |
| C5 · Proceso e historial | OA3 a | 1 |
