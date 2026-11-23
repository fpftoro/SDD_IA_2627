# E08-AmpliarProyecto

## Ampliar un proyecto existente (integrador)

### Descripción

Solución del **Ejercicio 8** (integrador, con agente). El alumno gobierna un equipo de cuatro roles sobre la lista de tareas: añade dos features a la vez en *worktrees* (C y D), con replanificación y *handoffs*; lleva a la constitución la decisión que se repite; y audita su propio trabajo con los antipatrones del tema 4.

- Enunciado y material de partida: [`practicas/ejercicios/E08-AmpliarProyecto`](../../practicas/ejercicios/E08-AmpliarProyecto/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 8 | Ampliar un proyecto existente | Integrador de la unidad (OA4 a, b, c, d, e) |

### Estructura

```text
E08-AmpliarProyecto/
├── README.md         ← este fichero
├── rubrica.md
└── solucion/         ← el proyecto al terminar, con 37 tests
    ├── README.md     ← respuesta modelo
    ├── src/ y tests/ ← features A–D
    ├── .github/      ← CODEOWNERS y plantilla de la PR de la spec
    ├── constitution.md ← con la sección «Errores»
    └── docs/specs/   ← A, B, C y D
```

### Clave

- **Historia de `main`:** gobierno, fusión de C, fusión de D, constitución (`git log --first-parent`).
- **El choque:** los planes de C y D coinciden en `ErrorNoEncontrado`, `buscarPorId` y el 404; D replanifica tras fusionar C.
- **Tests:** 29 (A y B) → 33 (C) → 37 (D). Los tests de C y D van antes que el código.
- **La constitución** no se toca hasta que la decisión se repite.
- **El gate de trampas** de este proyecto no vigila `splice`: aquí sí se borran tareas (feature D).

El flujo completo se ha ejecutado de principio a fin en Docker (`node:24-bookworm`, Vitest 5): *worktrees*, planes en paralelo, tests en rojo, implementación por grupos, fusiones `--no-ff`, replanificación, constitución, `npm run trampas`, `npm run estado`. **Sin probar:** las sesiones con un proveedor real (`/planificar` y `/implementar`), la CI en GitHub y la protección de ramas.

### Errores frecuentes

- **Planificar D después de fusionar C**: no hay paralelismo y no se ve el choque.
- **Aprobar el plan de D antes de traer `main`.**
- **Copiar los tests de C y D después del código** o dejar que el `implementador` los toque.
- **Todas las tasks en un commit.**
- **Llevar a la constitución algo de una sola feature**, o escribir «Errores» antes de que dos features lo hayan decidido.
- **Una auditoría con antipatrones genéricos**, sin evidencia de su repositorio.
- **Fusionar sin `--no-ff`** o dejar ramas sin fusionar.

### Otras soluciones válidas

- D antes que C, si se razona.
- Un plan de C con el error en otra carpeta o con otro nombre de función, mientras D lo reutilice.
- Tests de C y D adaptados (por ejemplo, con el id como `randomUUID()`), si siguen cubriendo todos los identificadores.
- Una PR de constitución que menciona también a `artesano` como quien detecta la repetición.
- Otros tres antipatrones de la auditoría, mientras tengan evidencia propia.
