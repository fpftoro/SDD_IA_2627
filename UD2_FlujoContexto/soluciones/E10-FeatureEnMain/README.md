# E10-FeatureEnMain

## De la spec aprobada a `main` (integrador)

### Descripción

Solución del **Ejercicio 10** (integrador, autocorrección, con agente). El alumno lleva la feature C de la lista de tareas («Marcar una tarea como hecha», la spec que aprobó en el E10 de la UD1) desde la spec aprobada hasta `main`: rama, plan con `/planificar`, tasks, ciclos con `/implementar` y la integración continua en verde, comprobación a mano de la página, fusión y replanificación con un cambio en la memoria del agente.

- Enunciado y proyecto de partida: [`practicas/ejercicios/E10-FeatureEnMain`](../../practicas/ejercicios/E10-FeatureEnMain/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 10 | De la spec aprobada a `main` (integrador) | El flujo completo con el agente: fases, plan, tasks y ciclos, estado, contexto y memoria (OA2 a, b, c, d, e, f) |

### Estructura

```text
E10-FeatureEnMain/
├── README.md       ← este fichero
├── rubrica.md
└── solucion/       ← el proyecto en main, con C fusionada y la replanificación
    ├── README.md   ← ejemplo comentado del recorrido
    ├── docs/specs/C-marcar-hecha/   ← spec 1.1 implementada, plan y tasks
    ├── src/, public/, tests/        ← la feature C
    ├── AGENTS.md, .opencode/skills/tests-desde-spec/  ← cambios de la replanificación
    └── …
```

**El proyecto de partida** es la lista de tareas con A y B, adaptada del proyecto de la UD3 sin lo propio de esa unidad (Playwright, lint, cobertura, gates): la CI tiene un solo *job* de tests, la página se comprueba a mano y la memoria es la del tema 6. Los tests llevan la letra de la feature porque A y B comparten ficheros. El mensaje de B-EC-02 del controlador se ha corregido para que coincida con la spec.

**Comprobado en Docker** (`node:24-alpine`, con `npm ci` y el `package-lock.json` de la plantilla): la plantilla, con 29 tests en verde y `npm run estado` sin errores; la solución, con 49 tests (20 de C) y el índice coherente. La página de C, con jsdom: la casilla marca y desmarca la tarea, el texto se tacha con la clase `hecha` y el servidor guarda el estado. Los comandos, la skill y el agente `documentador` son los del tema 6 (con la regla de `subagent` en `deny` en el documentador).

### El hueco de la spec

La spec 1.0 de C no nombra el **campo de la fecha de completado** (RF-02 y RF-04), que se ve en la respuesta de la API. Es el mismo tipo de hueco que el de los nombres de los campos del tema 3, y se espera que aparezca en el plan o en el primer ciclo. La spec tampoco dice qué gana si la tarea no existe y `hecha` no es válido (el error de varios *edge cases* del E02). Cualquiera de los dos vale como el hueco que pide el enunciado; la solución resuelve los dos en la spec 1.1.

### Conceptos aprendidos

Los de toda la unidad, juntos: el flujo con sus puntos de control y la rama por feature (a), el plan sin código y revisado (b), las tasks y los ciclos cortos (c), el estado en la spec, el índice y el historial (d), una sesión por fase con el contexto justo (e) y la memoria del agente que se usa y se mejora al replanificar (f).

### Errores frecuentes

- Hacer el plan y las tasks en la misma sesión, o los tres ciclos seguidos.
- Aceptar el nombre del campo que propone el agente, o decidirlo en el código.
- Modificar tests de A o B (por ejemplo, para que la lista muestre la casilla).
- No comprobar la página a mano, o comprobarla sin anotar qué se miró.
- Olvidar los cambios de estado de la spec y del índice en el primer y el último ciclo.
- Fusionar con la CI en rojo, o sin `--no-ff`.
- Una replanificación sin ningún cambio o con un cambio que no tiene que ver con lo que pasó.
- Tests de C sin la letra de la feature.

### Otras soluciones válidas

- Otro nombre para el campo (`completadaEn`, `fechaHecha`), si está en la spec 1.1 y en los tests.
- Otro orden de los errores, si está en la spec.
- Más o menos grupos de tasks, si cada uno tiene sus tests antes y su punto de control.
- Otra forma de la página (un botón en lugar de una casilla), si cumple RF-06, RF-07 y AC-05 y se comprueba a mano.
- Otro cambio en la replanificación (una regla en `tests/AGENTS.md`, una mejora de la skill, un comando nuevo), si responde a algo que pasó de verdad.
- Documentar la feature con `/documentar` (opcional).
