# E10-SpecAprobada

## De la idea a la spec aprobada (integrador)

### Descripción

Solución del **Ejercicio 10**, el integrador de la unidad (autocorrección, con agente). Sobre la lista de tareas compartida de los temas, el alumno prepara el entorno y el contexto del agente (`AGENTS.md`, constitución con la notación del proyecto y `opencode.json`), revisa la propuesta de features del agente y escribe el índice, y lleva la spec de «Marcar una tarea como hecha» desde su borrador hasta la aprobación: spec estructurada por el agente con marcadores, decisiones de producto, revisión de notación y granularidad, y lista de comprobación. Cinco fases, un commit cada una.

- Enunciado y proyecto de partida: [`practicas/ejercicios/E10-SpecAprobada`](../../practicas/ejercicios/E10-SpecAprobada/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 10 | De la idea a la spec aprobada | Integrador de la UD1: entorno y contexto, features, spec completa y notaciones, con el agente (OA1 c, d, e, f) |

### Estructura

```text
E10-SpecAprobada/
├── README.md               ← este fichero
├── rubrica.md
└── solucion/
    ├── .devcontainer/devcontainer.json
    ├── AGENTS.md           ← escrito por el alumno
    ├── constitution.md     ← escrito por el alumno, con la sección «Specs»
    ├── opencode.json       ← instructions y permisos
    ├── README.md           ← entrega modelo
    ├── package.json, herramientas/validar-gherkin.mjs
    └── docs/
        ├── prd.md          ← sin cambios
        └── specs/
            ├── README.md   ← A y C en 🔜 Aprobada
            ├── A-añadir-tarea/spec.md   ← sin cambios
            └── C-marcar-hecha/spec.md   ← versión 1.0, Aprobada
```

La solución no incluye `sesiones/`: son las exportaciones de cada alumno. Lo que dice la entrega modelo sobre lo que propuso el agente es un ejemplo; cambia con el modelo y con cada ejecución.

### Ejecutar

Dentro del Dev Container del ejercicio:

```bash
npm run validar             # ✅ 2 documentos de Gherkin sin errores (A y C)
opencode debug config       # instructions y permisos
opencode debug agents       # en plan, la última regla de edit con recurso * es deny
```

Comprobado en Docker con OpenCode 2.3.2.

### Qué tiene que decidir el alumno

El PRD y la spec de A no dicen nada de estas cuestiones, así que la spec del agente debería marcarlas y el alumno decidirlas:

| Cuestión | Decisión de la referencia | Otras decisiones válidas |
|----------|---------------------------|--------------------------|
| ¿Se puede desmarcar? | Sí | No, si se justifica y el fuera de alcance lo dice |
| ¿Marcar una tarea ya hecha? | 200 sin cambios | 409 con un mensaje |
| ¿Dos cambios a la vez? | Gana la última | Cualquier comportamiento definido |
| ¿Qué se guarda? | Estado y fecha de completado | Solo el estado, si se justifica |
| ¿Cómo se ve en la lista? | Tachada, sin ocultarla | Otra marca visual concreta |
| ¿Quién puede marcar? | Cualquiera; no se guarda quién | **Ninguna otra**: el PRD deja fuera usuarios y permisos |

### Conceptos aprendidos

- SDD completo en una feature: contexto del agente → features → borrador → spec con dudas → decisiones → revisión → aprobación.
- Las capas de contexto se preparan una vez y se comprueban con el agente antes de usarlas.
- El PRD marca lo que no entra: una propuesta razonable del agente (quién marcó la tarea) puede estar fuera de alcance.
- Las decisiones de producto las toma una persona y quedan escritas, con su motivo.
- Una spec previa aprobada (A) es el mejor modelo de formato y de nivel de detalle para la siguiente.

### Errores frecuentes

- Copiar la constitución del tema 2 sin la sección de notaciones: el agente no sabe que debe usar EARS y Gherkin.
- Añadir `"edit": "allow"` a `opencode.json` (le quita a *plan* la prohibición de editar).
- Un índice con features técnicas o con «Asignar tareas», que el PRD deja fuera.
- Escribir el borrador después de la spec del agente, o saltarse la fase de borrador.
- Aceptar un requisito sobre quién marca la tarea o guardar `completadaPor`: el PRD deja fuera los usuarios.
- Dejar marcadores sin resolver en la fase 4, o resolverlos sin anotar la decisión y su motivo.
- Una spec más vaga o más detallada que la de A: por ejemplo, sin códigos de error, o con `new Date()` y nombres de funciones.
- No cambiar el estado del índice en cada fase, o hacerlo todo en un único commit.

### Otras soluciones válidas

- Otro `AGENTS.md` y otra constitución, si tienen lo que pide el requisito 1 y no se contradicen.
- Otro orden de las features si respeta las dependencias (por ejemplo, D antes que C) y está justificado.
- Las decisiones de la tabla «Qué tiene que decidir el alumno», menos la última.
- Otra redacción de requisitos, escenarios y *edge cases*, con más o menos detalle, siempre que la lista de comprobación se cumpla.
- Otras propuestas del agente, aceptadas o rechazadas con motivo: cambian con el modelo.
