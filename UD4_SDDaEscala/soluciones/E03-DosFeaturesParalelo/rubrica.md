# Rúbrica · E03 Dos features en paralelo

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valoran leyendo el `README.md`, los planes y las tasks, y el historial en `<username>.datos.json` (ramas, fusiones y `ramasSinFusionar`). La clave está en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · *Worktrees* y ramas

| Campo | Valor |
|-------|-------|
| OA | OA4 a |
| Peso | 1 |
| Dónde mirar | `README.md` («Preparación» y «Cierre»), nombres de ramas, `<username>.datos.json` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Dos ramas `feature/…` con los nombres del contrato, creadas desde el mismo `main`, con la salida de `git worktree list`, y sin ramas `prueba-…` |
| 0 | 0 | Faltan ramas o nombres, o quedan ramas de prueba |

### C2 · Los dos planes

| Campo | Valor |
|-------|-------|
| OA | OA4 a |
| Peso | 2 |
| Dónde mirar | `docs/specs/C-…/plan.md` y `tasks.md`; plan de D en su rama |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Planes y tasks completos con el formato de B (ficheros, decisiones con alternativa descartada, pruebas por identificador), sin código, que reutilizan lo que existe y cubren todos los identificadores de su spec; los commits indican `(borrador; arquitecto)` si los hizo el agente |
| 1 | 1 | Uno de los planes es incompleto (identificadores sin prueba, decisiones sin alternativa) o contiene código |
| 0 | 0 | Faltan planes o no siguen el formato |

### C3 · Comparación de los planes

| Campo | Valor |
|-------|-------|
| OA | OA4 a |
| Peso | 2 |
| Dónde mirar | `README.md`, «Comparación de los planes» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Tabla de ficheros completa (con tests y `app.js`) que marca bien dónde chocan, y las decisiones duplicadas con sus nombres; detecta alguna diferencia que Git no ve (por ejemplo, quién asigna el id) |
| 1 | 1 | Tabla correcta pero sin tests, o decisiones duplicadas incompletas |
| 0 | 0 | La tabla no coincide con los planes o falta |

### C4 · Predicción y comprobación

| Campo | Valor |
|-------|-------|
| OA | OA4 a |
| Peso | 2 |
| Dónde mirar | `README.md`, «La predicción» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Predicción por fichero, salida de `git merge` y `git status --short` pegadas, contraste con cada conflicto y explicación de por qué `app.js` se funde solo (cambio idéntico) |
| 1 | 1 | La salida está, pero el contraste o la explicación de `app.js` es incompleto |
| 0 | 0 | Falta la salida o la predicción |

### C5 · Orden y replanificación

| Campo | Valor |
|-------|-------|
| OA | OA4 b |
| Peso | 2 |
| Dónde mirar | `README.md` («Orden y replanificación»), plan y tasks de D en su rama, `<username>.datos.json` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | C primero con motivo; distingue qué va en paralelo; plan de C aprobado y fusionado con `--no-ff` en `main`; D trae `main` (commit de fusión) y su plan y tasks reutilizan lo de C (no crea lo que C ya crea), y la rama de D queda sin fusionar |
| 1 | 1 | El orden y la fusión son correctos pero la replanificación deja decisiones duplicadas, o el motivo de no aprobar el plan de D es vago |
| 0 | 0 | D aprobado o fusionado antes que C, o no hay replanificación |

### C6 · Proceso con el agente

| Campo | Valor |
|-------|-------|
| OA | OA4 b |
| Peso | 1 |
| Dónde mirar | `README.md`, «Sesión con el agente», «Decisiones» y «Commits» |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | Prompts concretos, qué corrigió el alumno, al menos una decisión aceptada o rechazada con motivo y commits que cuentan los pasos |
| 0 | 0 | Secciones vacías o genéricas |
