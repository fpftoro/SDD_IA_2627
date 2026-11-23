# Rúbrica · E08 Ampliar un proyecto existente (integrador)

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valoran leyendo el repositorio (código, tests, specs, `.github/`), el `README.md` y el historial en `<username>.datos.json` (ramas, fusiones, `ramasSinFusionar`). La clave está en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · Gobierno del equipo

| Campo | Valor |
|-------|-------|
| OA | OA4 c |
| Peso | 1 |
| Dónde mirar | `.github/CODEOWNERS`, `.github/PULL_REQUEST_TEMPLATE/spec.md`, `README.md` («Gobierno») |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | `CODEOWNERS` con la línea general primero y las excepciones después (constitución, `AGENTS.md`, `.opencode/`, `.github/` de arquitectura; specs de producto y calidad); plantilla con una casilla de calidad; reparto de puntos de control coherente con los roles |
| 0 | 0 | Falta algo, el orden anula las excepciones o un rol aprueba todo |

### C2 · La constitución

| Campo | Valor |
|-------|-------|
| OA | OA4 c |
| Peso | 1 |
| Dónde mirar | `constitution.md`, `README.md` («Constitución»), historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Sección «Errores» con las clases y sus códigos y la regla de reutilizar, sin nada de una sola feature, en su propio commit; la PR responde a las cuatro preguntas usando lo que se ha visto en C y D |
| 0 | 0 | Falta la sección o la PR, o mezcla otros cambios |

### C3 · Paralelismo, orden y replanificación

| Campo | Valor |
|-------|-------|
| OA | OA4 a |
| Peso | 2 |
| Dónde mirar | `README.md` («Comparación…», «Orden y replanificación»), planes en las ramas, `<username>.datos.json` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Dos *worktrees*/ramas desde el mismo `main`; tabla de ficheros completa con los choques; decisiones duplicadas identificadas; orden razonado; plan de C aprobado y fusionado con `--no-ff`; D trae `main` (commit de fusión) y su plan reutiliza lo de C, antes de aprobarse |
| 1 | 1 | El orden y las fusiones son correctos pero la comparación es incompleta, o el plan de D sigue duplicando algo |
| 0 | 0 | D aprobado antes de traer `main`, o no hay comparación |

### C4 · *Handoffs*, permisos y trazabilidad

| Campo | Valor |
|-------|-------|
| OA | OA4 b |
| Peso | 2 |
| Dónde mirar | `README.md` («Seguridad», «*Handoffs*», «Sesión», «Decisiones»), `.opencode/agents/`, mensajes de commit |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Permisos del `implementador` pegados y explicados (`subagent` en `deny` y por qué); *handoff* con objetivo, documentos, estado, límites y qué devolver, sin explicar decisiones que faltan en el plan; commits que nombran al agente cuando no es el de siempre; sesión y decisiones concretas |
| 1 | 1 | Un elemento flojo: *handoff* incompleto, permisos sin explicar, o sesión genérica |
| 0 | 0 | Sin *handoff* ni permisos comprobados |

### C5 · Features C y D con el flujo

| Campo | Valor |
|-------|-------|
| OA | OA4 d |
| Peso | 2 |
| Dónde mirar | `src/`, `tests/`, `docs/specs/`, historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Tests de cada feature en un commit anterior al del código y sin modificarlos; un commit por grupo; specs e índice en `✅ Implementada`; `npm test` y `npm run estado` en verde; fusiones `--no-ff` con los mensajes pedidos |
| 1 | 1 | Un elemento flojo: un commit con varios grupos, specs o índice sin actualizar, o una fusión sin `--no-ff` o con otro mensaje |
| 0 | 0 | Tests después del código, modificados para pasar, o commits únicos |

### C6 · Auditoría

| Campo | Valor |
|-------|-------|
| OA | OA4 e |
| Peso | 2 |
| Dónde mirar | `README.md`, sección «Auditoría», `herramientas/comprobar-trampas.sh` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Resultado de los comandos pegado; tres antipatrones del tema 4 con evidencia del propio repositorio y qué los evitó o corrigió (al menos uno que **sí** apareció); tres cambios con el riesgo razonado y cuánto se leyó; límites contra la avalancha que se aplican antes de lanzar a los agentes |
| 1 | 1 | Antipatrones genéricos sin evidencia propia, o criterio de lectura sin razonar |
| 0 | 0 | Falta la sección o solo dice «todo bien» |
