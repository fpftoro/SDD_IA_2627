# E04 · Los tests primero

**Tipo:** autocorrección (con agente)

Implementa con OpenCode la feature B del préstamo de portátiles, «Reservar un carro», con los tests escritos y **revisados antes** que el código, y con un agente que implementa **sin poder tocar los tests**.

**Criterios:** OA3 b

## El caso

Es la API del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), con la feature A implementada. La feature B tiene la spec, el plan y las tasks **aprobados** en `docs/specs/B-reservar-carro/`. Es una versión simplificada de la spec que escribiste en la UD1, pensada para este ejercicio.

Fíjate en dos cosas del plan: el orden de las comprobaciones (D-05) y que los tests fijan la fecha de hoy (D-08), para que el resultado no dependa del día en que se ejecutan.

El proyecto trae la memoria del agente: `AGENTS.md`, la constitución, la skill `tests-desde-spec` y los comandos `/escribir-tests` (con *build*) e `/implementar` (con un agente `implementador` que **todavía no existe**).

## Entorno de trabajo

Abre la carpeta en el **Dev Container** y conecta tu proveedor de modelos en OpenCode, como en la UD1. Las claves no van al repositorio.

## Requisitos

1. **El agente implementador** (en `main`). Crea `.opencode/agents/implementador.md` con los permisos del tema 2 (apartado 2.6.3), adaptados a este proyecto: no puede editar `tests/**`, `package.json` ni las specs (salvo `tasks.md`), tiene `subagent` denegado y la terminal (`shell`) en `ask` salvo `npm test` y `git` de lectura. Compruébalo con `opencode debug agents` y pega en el README las reglas de `edit`, `subagent` y `shell` del `implementador`. Commit.
2. **La rama.** Crea `feature/B-reservar-carro` desde `main`.
3. **Los tests.** En una sesión nueva, `/escribir-tests B-reservar-carro 1`. Después, **revisa** cada test con la spec al lado y la lista del tema 2 (apartado 2.4.2). Documenta en «Revisión de los tests» cada problema que encuentres y cómo lo corriges (tú o pidiéndoselo a *build*). Si encuentras un hueco en la spec, dilo, pero no la cambies sin documentar la decisión.
4. **El rojo.** Ejecuta `npm test`, pega la salida y explica por qué fallan los tests (¿es el rojo correcto?). Commit: `Tests de la feature B (revisados)`.
5. **Los ciclos.** Sesión nueva por grupo: `/implementar B-reservar-carro 2` y después el grupo 3. En cada ciclo, revisa con `git status`, `git diff` y `npm test`, y haz un commit. Si el agente quiere cambiar un test, documenta qué pasó y qué decidiste.
6. **Los tests, intactos.** Antes del último commit, compara los tests con el commit de los tests (tema 2, apartado 2.6.4) y pega la orden y su salida.
7. **¿Pueden fallar?** Rompe a propósito el código de una forma que la spec no permita (por ejemplo, calcular «hoy» en UTC) y comprueba que un test lo detecta. Deshaz el cambio.
8. **Fusión.** Cambia la spec y el índice a `Implementada` en el último ciclo, fusiona con `--no-ff` en `main` y borra la rama.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `.opencode/agents/implementador.md` | El agente con los permisos del requisito 1 |
| `tests/servicio-reservas.test.js`, `tests/api-reservas.test.js` | Los tests de la feature B, con `B-` y el identificador en el nombre |
| `src/` | El código de la feature B, con las capas de la constitución |
| `docs/specs/B-reservar-carro/` | `tasks.md` marcado; `spec.md` en `Implementada` |
| `README.md` | Secciones «Permisos del implementador», «Sesión con el agente», «Revisión de los tests», «Decisiones», «El rojo», «Tests intactos», «¿Pueden fallar?» y «Commits» |
| Historial | Commit del implementador en `main`; en la rama, el de los tests y uno por ciclo; fusión con `--no-ff` |

## Comprueba tu solución

- Cada identificador de la spec de B tiene su test, y la búsqueda de identificadores sin test (tema 2, apartado 2.2.5) no devuelve nada.
- Ningún test compara con lo que devuelve el código de la aplicación.
- Los mensajes de error se comprueban con el texto exacto de la spec.
- Los límites se prueban por los dos lados (franjas 1, 6, 0 y 7; hoy y ayer).
- Hay un test que distingue la hora peninsular de la UTC.
- Ningún test depende del orden de ejecución: cada uno empieza sin reservas.
- El commit de los tests es anterior a cualquier commit con código de B.
- `git diff --stat` contra el commit de los tests no muestra nada.
- Si el agente intentó cambiar un test, lo has documentado.

## Al terminar

Sube la rama `main` (y la de la feature, si tu profesor lo pide). Cierra el Dev Container; el volumen `sdd-opencode` guarda tus credenciales para el siguiente ejercicio.
