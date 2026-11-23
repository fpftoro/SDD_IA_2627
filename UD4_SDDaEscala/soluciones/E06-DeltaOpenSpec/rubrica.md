# Rúbrica · E06 Un cambio con delta de OpenSpec

Peso total: **10** puntos. Procedimiento en [`../CORRECCION.md`](../CORRECCION.md).

Se valoran leyendo el repositorio (tests, specs, `openspec/`) y el historial en `<username>.datos.json`. La clave está en el [`README.md`](./README.md) de este ejercicio.

---

### C1 · OpenSpec en el proyecto

| Campo | Valor |
|-------|-------|
| OA | OA4 d |
| Peso | 1 |
| Dónde mirar | `README.md` («Qué instala OpenSpec»), `openspec/config.yaml`, `.opencode/commands/` |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 1 | 1 | OpenSpec inicializado con OpenCode; la tabla explica para qué sirve cada elemento (config, cambios, comandos, skills, specs vigentes) |
| 0 | 0 | No está inicializado o la tabla es incorrecta |

### C2 · Refactorización con los tests intactos

| Campo | Valor |
|-------|-------|
| OA | OA4 d |
| Peso | 2 |
| Dónde mirar | `src/`, `README.md` («Refactorización», «Sesión con el agente», «Decisiones»), historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Lógica repartida en capas con `generarAvisos` intacto; los tests, sin cambios en el commit de la refactorización (se ve en `<username>.datos.json`); el comportamiento raro se conservó; la sesión documenta qué rechazó el alumno (por ejemplo, arreglar el orden) |
| 1 | 1 | Capas correctas pero la refactorización cambia comportamiento (o toca los tests), o la sesión no documenta nada |
| 0 | 0 | No hay refactorización, o está mezclada con el cambio en el mismo commit |

### C3 · La delta

| Campo | Valor |
|-------|-------|
| OA | OA4 d |
| Peso | 3 |
| Dónde mirar | `openspec/changes/archive/<fecha>-avisos-ordenados-y-robustos/` y `README.md` («La delta») |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 3 | 3 | `proposal`, `design`, `tasks` y delta completos; `MODIFIED` del orden con el requisito entero y los escenarios que ya tenía (aunque cambien); `ADDED` para profesor desconocido y fechas inválidas, con escenarios `WHEN`/`THEN` y valores exactos; no repite la spec entera; explica la diferencia entre secciones |
| 2 | 2 | La delta es correcta pero falta un artefacto, o los escenarios no tienen los valores exactos |
| 1 | 1 | Usa `ADDED` para el orden (duplica el requisito) o repite la spec vigente entera |
| 0 | 0 | No hay delta o no valida |

### C4 · Tests del cambio

| Campo | Valor |
|-------|-------|
| OA | OA4 d |
| Peso | 2 |
| Dónde mirar | `tests/`, `README.md` («Tests»), historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Retira solo `CAR-09` a `CAR-14` (los ocho `CAR-01` a `CAR-08` siguen sin cambios); tests `CAMBIO-nn` con los valores exactos de la delta; el commit de los tests va antes del de la implementación y explica qué fallaba y qué ya pasaba |
| 1 | 1 | Retira de más o de menos, o los tests nuevos no cubren toda la delta |
| 0 | 0 | Modifica los tests de comportamiento conservado, o no hay tests antes del código |

### C5 · Implementación, spec, archivo y fusión

| Campo | Valor |
|-------|-------|
| OA | OA4 d |
| Peso | 2 |
| Dónde mirar | `src/`, `docs/specs/G-…/spec.md`, `openspec/specs/…`, historial |

| Nivel | Puntos | Descriptor observable |
|-------|-------:|-----------------------|
| 2 | 2 | Todo en verde; spec de `docs/specs/` en 1.1 con los fallos corregidos; cambio archivado con la fecha y la spec vigente actualizada; `validate --all --strict` sin errores; los seis commits en orden y la fusión `--no-ff` en `main` |
| 1 | 1 | Falta un elemento: la spec 1.1, el archivo, la fusión `--no-ff` o el orden de los commits |
| 0 | 0 | Tests en rojo, cambio sin archivar o sin fusionar |
