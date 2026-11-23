# Criterios de evaluación y ejercicios · UD1 (profesor)

Relación de cada criterio de evaluación del **OA1** con los temas, el test, el cuestionario, los ejercicios y los criterios de sus rúbricas. El OA y los criterios para el alumnado están en [`../objetivos-aprendizaje.md`](../objetivos-aprendizaje.md).

> Fichero generado con `herramientas/generar-criterios.py` a partir de las rúbricas, los enunciados de los ejercicios, los temas, `00-test/preguntas.json` y `practicas/02-cuestionario.md`. **No se edita a mano.**

## Resumen por criterio de evaluación

En «Rúbricas» se indica cada criterio de corrección que evalúa el criterio, con su peso sobre el peso total del ejercicio.

| Criterio | Temas | Test (bloques) | Cuestionario (preguntas) | Ejercicios | Rúbricas (criterio · peso/total) |
|----------|-------|----------------|--------------------------|------------|----------------------------------|
| **a** | [1. Qué es el desarrollo guiado por especificaciones](../01-que-es-sdd.md) | 1 | 1–4 | [E01](../practicas/ejercicios/E01-DecisionesImplicitas/ENUNCIADO.md) | E01 · C1 (4/10), E01 · C2 (2/10), E01 · C3 (2/10), E01 · C4 (2/10) |
| **b** | [2. Artefactos y capas de contexto](../02-artefactos-contexto.md) | 2 | 5–7 | [E02](../practicas/ejercicios/E02-CadaCosaEnSuSitio/ENUNCIADO.md) | E02 · C1 (3/10), E02 · C2 (3/10), E02 · C3 (2/10), E02 · C4 (2/10) |
| **c** | [3. El entorno de trabajo: OpenCode](../03-entorno-opencode.md) | 3 | 8–11 | [E03](../practicas/ejercicios/E03-EntornoOpenCode/ENUNCIADO.md), [E10](../practicas/ejercicios/E10-SpecAprobada/ENUNCIADO.md) | E03 · C1 (1/10), E03 · C2 (3/10), E03 · C3 (1/10), E03 · C4 (2/10), E03 · C5 (2/10), E03 · C6 (1/10), E10 · C1 (2/10), E10 · C6 (1/10) |
| **d** | [4. Features: la unidad de trabajo de una spec](../04-features.md) | 4 | 12–14 | [E04](../practicas/ejercicios/E04-EpicoFeatures/ENUNCIADO.md), [E10](../practicas/ejercicios/E10-SpecAprobada/ENUNCIADO.md) | E04 · C1 (3/10), E04 · C2 (3/10), E04 · C3 (2/10), E04 · C4 (2/10), E10 · C2 (1/10) |
| **e** | [5. Anatomía de una spec](../05-anatomia-spec.md) | 5 | 15–17 | [E05](../practicas/ejercicios/E05-EdgeCases/ENUNCIADO.md), [E06](../practicas/ejercicios/E06-ErroresSembrados/ENUNCIADO.md), [E09](../practicas/ejercicios/E09-SpecDevolucion/ENUNCIADO.md), [E10](../practicas/ejercicios/E10-SpecAprobada/ENUNCIADO.md) | E05 · C1 (4/10), E05 · C2 (2/10), E05 · C3 (1/10), E05 · C4 (2/10), E05 · C5 (1/10), E06 · C1 (3/10), E06 · C2 (2/10), E06 · C3 (3/10), E06 · C4 (2/10), E09 · C1 (3/10), E09 · C3 (2/10), E09 · C5 (1/10), E10 · C3 (3/10) |
| **f** | [6. Notaciones y granularidad](../06-notaciones-granularidad.md) | 6 | 18–21 | [E07](../practicas/ejercicios/E07-EarsGherkin/ENUNCIADO.md), [E08](../practicas/ejercicios/E08-VagaRigida/ENUNCIADO.md), [E09](../practicas/ejercicios/E09-SpecDevolucion/ENUNCIADO.md), [E10](../practicas/ejercicios/E10-SpecAprobada/ENUNCIADO.md) | E07 · C1 (3/10), E07 · C2 (2/10), E07 · C3 (3/10), E07 · C4 (2/10), E08 · C1 (3/10), E08 · C2 (3/10), E08 · C3 (3/10), E08 · C4 (1/10), E09 · C2 (2/10), E09 · C4 (2/10), E10 · C4 (2/10), E10 · C5 (1/10) |

Texto de cada criterio:

- **a.** Se han identificado los problemas del desarrollo con agentes de IA sin especificación y los niveles de adopción del desarrollo guiado por especificaciones.
- **b.** Se han diferenciado el *prompt*, el PRD, el SRS y la especificación, y las capas de contexto de un agente (reglas, constitución y especificación).
- **c.** Se ha preparado un entorno de desarrollo con un agente de codificación, conectado a un proveedor de modelos y con contexto de proyecto.
- **d.** Se han delimitado *features* a partir de un épico, distinguiéndolas de historias de usuario y *tasks*.
- **e.** Se han redactado especificaciones completas, con requisitos, criterios de aceptación, *edge cases* y fuera de alcance.
- **f.** Se han aplicado notaciones estructuradas (EARS, Gherkin) y se ha ajustado la granularidad de la especificación.

## Criterios de corrección por ejercicio

### E01 · Las decisiones que nadie tomó

Peso total: 10 · [rúbrica](./E01-DecisionesImplicitas/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Decisiones implícitas | OA1 a | 4 |
| C2 · Por qué el agente decide | OA1 a | 2 |
| C3 · Vibe coding, prompt cuidado o SDD | OA1 a | 2 |
| C4 · Niveles de SDD | OA1 a | 2 |

### E02 · Cada cosa en su sitio

Peso total: 10 · [rúbrica](./E02-CadaCosaEnSuSitio/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Artefactos | OA1 b | 3 |
| C2 · Capas de contexto | OA1 b | 3 |
| C3 · Casos dudosos | OA1 b | 2 |
| C4 · Primitivas | OA1 b | 2 |

### E03 · Mi entorno con OpenCode

Peso total: 10 · [rúbrica](./E03-EntornoOpenCode/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Proveedor y claves | OA1 c | 1 |
| C2 · AGENTS.md revisado | OA1 c | 3 |
| C3 · Revisión documentada | OA1 c | 1 |
| C4 · Configuración de OpenCode | OA1 c | 2 |
| C5 · Comprobaciones | OA1 c | 2 |
| C6 · Proceso e historial | OA1 c | 1 |

### E04 · Del épico a las features

Peso total: 10 · [rúbrica](./E04-EpicoFeatures/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Clasificación | OA1 d | 3 |
| C2 · Features | OA1 d | 3 |
| C3 · Orden | OA1 d | 2 |
| C4 · Índice de features | OA1 d | 2 |

### E05 · Más allá del camino feliz

Peso total: 10 · [rúbrica](./E05-EdgeCases/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Edge cases con respuesta exacta | OA1 e | 4 |
| C2 · Dudas marcadas | OA1 e | 2 |
| C3 · Criterios de aceptación nuevos | OA1 e | 1 |
| C4 · Fuera de alcance | OA1 e | 2 |
| C5 · Estado de la spec | OA1 e | 1 |

### E06 · Spec con errores sembrados

Peso total: 10 · [rúbrica](./E06-ErroresSembrados/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Problemas localizados | OA1 e | 3 |
| C2 · Consecuencias para el agente | OA1 e | 2 |
| C3 · Spec corregida: requisitos y criterios | OA1 e | 3 |
| C4 · Spec corregida: edge cases, alcance y estado | OA1 e | 2 |

### E07 · EARS y Gherkin

Peso total: 10 · [rúbrica](./E07-EarsGherkin/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Patrones de EARS | OA1 f | 3 |
| C2 · Respuestas de EARS | OA1 f | 2 |
| C3 · Escenarios de Gherkin | OA1 f | 3 |
| C4 · Escenarios declarativos | OA1 f | 2 |

### E08 · Ni vaga ni rígida

Peso total: 10 · [rúbrica](./E08-VagaRigida/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Clasificación de líneas | OA1 f | 3 |
| C2 · Decisiones sobre las propuestas del agente | OA1 f | 3 |
| C3 · Spec revisada | OA1 f | 3 |
| C4 · Proceso e historial | OA1 f | 1 |

### E09 · La spec de una feature

Peso total: 10 · [rúbrica](./E09-SpecDevolucion/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Spec completa | OA1 e | 3 |
| C2 · Notación y granularidad | OA1 f | 2 |
| C3 · Borrador propio y dudas | OA1 e | 2 |
| C4 · Revisión con el agente | OA1 f | 2 |
| C5 · Aprobación e historial | OA1 e | 1 |

### E10 · De la idea a la spec aprobada

Peso total: 10 · [rúbrica](./E10-SpecAprobada/rubrica.md)

| Criterio de corrección | OA | Peso |
|------------------------|----|-----:|
| C1 · Entorno y contexto del agente | OA1 c | 2 |
| C2 · Features e índice | OA1 d | 1 |
| C3 · Spec completa | OA1 e | 3 |
| C4 · Notación y granularidad | OA1 f | 2 |
| C5 · Decisiones | OA1 f | 1 |
| C6 · Historial por fases | OA1 c | 1 |
