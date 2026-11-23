# Un cambio con OpenSpec

Spec vigente: [`openspec/specs/portatiles/spec.md`](./openspec/specs/portatiles/spec.md) · Spec de la feature: [`docs/specs/A-consultar-portatiles/spec.md`](./docs/specs/A-consultar-portatiles/spec.md)

> Ejemplo comentado: los artefactos del cambio de esta carpeta son una versión de referencia, comprobada con OpenSpec 1.16 (`openspec validate --strict` y `openspec archive`). Lo que genere el agente será distinto; lo que se valora es la revisión.

## Qué instala OpenSpec

| Fichero o carpeta | Para qué sirve |
|-------------------|----------------|
| `openspec/config.yaml` | Configuración del proyecto: el esquema de trabajo (`spec-driven`) y el idioma de los artefactos (español, con los encabezados y SHALL/MUST en inglés) |
| `openspec/specs/` | Las specs **vigentes**: cómo es el sistema ahora. Ya estaba la de `portatiles` |
| `openspec/changes/` | Los cambios en curso, uno por carpeta |
| `openspec/changes/archive/` | Los cambios terminados, con su fecha |
| `.opencode/commands/opsx-*.md` | Seis comandos de OpenCode: `propose`, `apply`, `archive`, `explore`, `update` y `sync` |
| `.opencode/skills/openspec-*/SKILL.md` | Seis skills con el procedimiento de cada paso, que los comandos y el agente usan |

## Revisión de la propuesta

| Artefacto | Qué revisé | Qué corregí |
|-----------|------------|-------------|
| `proposal.md` | Que modifica la capacidad `portatiles` (no crea otra) y que dice el porqué y el qué, sin el cómo | Añadí que `docs/specs/A-consultar-portatiles/spec.md` sube a 1.1, como pide `AGENTS.md` |
| `specs/portatiles/spec.md` (delta) | `ADDED` (no toca los requisitos existentes), escenarios con WHEN y THEN, mensajes exactos, nada inventado | El agente no decía qué pasa si el carro y el estado no son válidos a la vez: lo decidí (gana el estado) y lo añadí con su escenario. «Escrito exactamente así» para que `a` en minúscula sea un error |
| `design.md` | Que el filtro va en el servicio, con alternativas | El agente proponía sacar los carros de los datos de los portátiles; lo cambié por una constante (el carro C no tiene portátiles) y dejé la otra como alternativa descartada |
| `tasks.md` | Tests antes que el código en cada grupo, verificación en cada task, la spec de `docs/specs/` | Los tests estaban en un grupo final: los repartí en cada grupo. Añadí la task de la spec 1.1 |

Salida de `openspec validate filtrar-por-carro --strict`:

```text
Change 'filtrar-por-carro' is valid
```

## Sesión con el agente

Proveedor y modelo: <proveedor>/<modelo>

| Paso | Agente o comando | Prompt | Qué produjo | Qué corregí y por qué |
|------|------------------|--------|-------------|-----------------------|
| 1 | `/opsx-propose` | La descripción del cambio del enunciado, con el nombre `filtrar-por-carro` | Los cuatro artefactos | Ver «Revisión de la propuesta» |
| 2 | `/opsx-apply` | `/opsx-apply filtrar-por-carro`, pidiendo ver los tests en rojo | Tests nuevos en rojo, el filtro en el servicio y el controlador, la spec 1.1 y las tasks marcadas | Revisé el `git diff`: solo se añaden tests; ninguno de A cambia |
| 3 | `openspec archive` | `openspec archive filtrar-por-carro` | «Applying changes to openspec/specs/portatiles/spec.md: + 2 added» y el cambio en `archive/` | Comprobé la spec vigente y `openspec validate --all --strict` |

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| Sacar los carros válidos de los datos de los portátiles | Rechazada | La spec da por válido el carro C, que no tiene portátiles |
| Aceptar el carro en minúscula | Rechazada | El estado ya se exige «escrito exactamente así»; mejor el mismo criterio |
| Tests en un grupo final | Rechazada | La constitución pide los tests antes que el código |
| Filtrar en el servicio, junto al estado | Aceptada | Es la capa de la lógica de negocio |

## OpenSpec y el flujo a mano

| Aspecto | Flujo a mano del curso | OpenSpec |
|---------|------------------------|----------|
| Dónde vive la spec | Una spec por **feature** en `docs/specs/`, con su versión | Una spec por **capacidad** en `openspec/specs/`, siempre la vigente |
| Cómo se describe un cambio | Versión nueva de la spec entera (1.0 → 1.1) | Una **delta** con lo añadido, lo modificado y lo eliminado |
| Dónde van el cómo y los pasos | `plan.md` y `tasks.md`, con plantillas del curso | `design.md` y `tasks.md` del cambio, con las plantillas de OpenSpec |
| Cómo se sabe el estado | Campo `Estado` de la spec e índice de features | Si el cambio está en `changes/` (en curso) o en `archive/` (terminado), y las casillas de sus tasks |
| Qué pasa al terminar | Se fusiona la rama y la spec queda `Implementada` | Se archiva: la delta se aplica a la spec vigente y el cambio se guarda con su fecha |

En este proyecto usaría el flujo a mano para las **features nuevas** (B a F), donde cada feature es una pieza nueva con su spec completa, y OpenSpec para los **cambios** sobre las que ya funcionan, donde describir solo la diferencia es más corto y la spec vigente se actualiza sola al archivar. La regla de `AGENTS.md` (subir también la versión en `docs/specs/`) evita que las dos specs se separen.

## Commits

```text
*   <hash> Fusiona el cambio filtrar-por-carro
|\
| * <hash> Cambio filtrar-por-carro: archivado
| * <hash> Cambio filtrar-por-carro: implementación
| * <hash> Cambio filtrar-por-carro: propuesta (aprobada)
| * <hash> OpenSpec en el proyecto
|/
* <hash> Proyecto de partida
```
