# E02-CadaCosaEnSuSitio

## Cada cosa en su sitio

### Descripción

Solución del **Ejercicio 2** (autocorrección). El alumno clasifica diez fragmentos del proyecto de préstamo de portátiles como prompt, PRD, SRS o spec; doce líneas de contexto como reglas, constitución, spec o prompt; justifica los tres casos que más le han costado, y asocia seis necesidades con la primitiva que las resuelve.

- Enunciado y material de partida: [`practicas/ejercicios/E02-CadaCosaEnSuSitio`](../../practicas/ejercicios/E02-CadaCosaEnSuSitio/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 2 | Cada cosa en su sitio | Artefactos, capas de contexto y primitivas (OA1 b) |

### Estructura

```text
E02-CadaCosaEnSuSitio/
├── README.md          ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md      ← respuesta modelo
    └── fragmentos.md  ← material de partida, sin cambios
```

### Clave

| Parte | Respuestas |
|-------|------------|
| A. Artefactos | Prompt: A1, A5, A8 · PRD: A2, A6 · SRS: A3, A9 · Spec: A4, A7 · Otro (tareas de programación): A10 |
| B. Capas | Reglas: B1, B4, B6, B12 · Constitución: B2, B5, B8, B10 · Spec: B3, B7, B11 · Prompt: B9 |
| C. Primitivas | C1 skill · C2 MCP · C3 instrucciones · C4 spec · C5 prompt · C6 agente |

### Conceptos aprendidos

- Cada artefacto tiene un propósito, un alcance y una vida distintos: el prompt es transitorio; el PRD dice qué y por qué; el SRS describe todo el sistema; la spec, una funcionalidad con precisión verificable.
- Ni la longitud ni el nivel técnico deciden qué es un documento: un prompt largo sigue siendo un prompt, y un documento técnico de todo el sistema no es una spec.
- Una lista de tareas de programación no es una spec: describe cómo se construye, no qué debe hacer el sistema.
- Las reglas dicen **cómo trabaja el agente**; la constitución, **qué es innegociable en el proyecto**; la spec, **qué hace una funcionalidad**. Lo que solo vale para una tarea va en el prompt.

### Errores frecuentes

- Clasificar A5 como spec porque es largo y tiene requisitos. Es el error que el tema 2 avisa expresamente.
- Clasificar A10 como spec porque tiene el nombre de una funcionalidad. Le falta todo lo que define una spec: comportamiento, criterios de aceptación, *edge cases*.
- Confundir A3 o A9 con una spec por su numeración de requisitos: describen **todo el sistema**.
- Poner las reglas de negocio de una funcionalidad (B3, B7, B11) en la constitución porque «son importantes». La importancia no decide la capa: el alcance sí.
- Poner B9 en `AGENTS.md`: el agente aplicaría la restricción en todas las tareas.
- Pistas que repiten la respuesta («es un PRD porque es un PRD») en lugar de nombrar una característica.
- Confundir skill con instrucciones en C1: lo que la distingue es que solo se carga cuando la tarea lo necesita.

### Otras soluciones válidas

- **B10 en reglas**, si se justifica como convención técnica que el agente aplica sin interpretar. Es defendible, aunque la solución prefiere la constitución porque afecta al contrato de la API.
- **B2 o B5 en reglas**, si el alumno argumenta que en un proyecto pequeño reglas y constitución pueden ir en el mismo fichero (el tema 2 lo admite). Lo que no es válido es ponerlas en una spec.
- **A4 como spec incompleta**, o A7 como spec: los dos son specs aunque les falten secciones; si el alumno lo señala, mejor.
- **A10 como «plan» o «tasks»**: cualquier nombre que deje claro que son pasos de implementación y no una spec.
- Cualquier elección de los tres casos dudosos, siempre que la duda sea real y la decisión esté razonada con los criterios del tema 2.
