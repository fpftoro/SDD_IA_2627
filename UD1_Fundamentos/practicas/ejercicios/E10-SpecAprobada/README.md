# Lista de tareas compartida · De la idea a la spec aprobada

<!-- Completa cada sección en la fase que corresponde. Borra los comentarios como este cuando termines.
     Respeta el formato de las tablas: así podrás compararlas con la solución.
     NUNCA escribas aquí tu clave del proveedor. -->

- Contexto del agente: [`AGENTS.md`](./AGENTS.md), [`constitution.md`](./constitution.md), [`opencode.json`](./opencode.json)
- Índice de features: [`docs/specs/README.md`](./docs/specs/README.md)
- Spec de la feature C: [`docs/specs/C-marcar-hecha/spec.md`](./docs/specs/C-marcar-hecha/spec.md)

## Entorno

<!-- Fase 1. -->

| Dato | Valor |
|------|-------|
| Versión de OpenCode | |
| Proveedor | |
| Modelo | |

| Pregunta al agente plan | Resumen de su respuesta | ¿Recoge AGENTS.md y la constitución? |
|-------------------------|-------------------------|--------------------------------------|
| ¿Qué principios tienes que respetar? | | |
| ¿En qué notación se escriben las specs? | | |

## Features

<!-- Fase 2: la propuesta del agente revisada con los criterios del tema 4.
     «Revisión»: si la aceptas como feature y, si no, por qué (épico, task, técnica, fuera de alcance…). -->

| Propuesta del agente | Revisión |
|----------------------|----------|
| | |

## Orden

<!-- Fase 2: el orden de tu índice, justificado con dependencias, valor y riesgo. -->

## Borrador

<!-- Fase 3, sin agente: de cinco a diez líneas sobre qué debe hacer «Marcar una tarea como hecha». -->

## Sesión con el agente

<!-- Todas las fases. -->

| Paso | Fase | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|------|--------|--------|-------------|-----------------------|
| 1 | 1 | plan | | | |

Sesiones exportadas: [`sesiones/redaccion.md`](./sesiones/redaccion.md) y [`sesiones/revision.md`](./sesiones/revision.md)

## Decisiones de producto

<!-- Fase 4: cada [NECESITA ACLARACIÓN] de la fase 3 y lo que decides, con el motivo (el PRD, el uso que tendrá…). -->

| Dónde | Pregunta | Decisión | Motivo |
|-------|----------|----------|--------|
| | | | |

## Decisiones

<!-- Fase 4: una fila por cada propuesta del agente en la revisión del tema 6. -->

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| | | |

## Lista de comprobación

<!-- Fase 5: marca con [x] lo que cumple tu spec. -->

- [ ] No queda ningún `[NECESITA ACLARACIÓN]`.
- [ ] Cada requisito es atómico, verificable y sigue la notación acordada.
- [ ] Cada criterio de aceptación es un escenario binario y concreto.
- [ ] Cada *edge case* tiene una respuesta exacta.
- [ ] No hay nombres de funciones, código ni estructuras internas.
- [ ] El fuera de alcance cierra lo que el agente podría añadir por su cuenta.

## Validación

<!-- Pega aquí la salida de npm run validar. -->

```text
```

## Commits

<!-- Pega aquí la salida de: git log --oneline -->

```text
```
