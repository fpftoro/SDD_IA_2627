# E09 · Un cambio con OpenSpec

**Tipo:** autocorrección

Haz un cambio sobre una feature ya implementada con **OpenSpec**: propónlo, revisa lo que genera el agente, impleméntalo y archívalo para que la spec vigente vuelva a decir la verdad. Después compara OpenSpec con el flujo a mano del curso.

**Criterios:** OA2 d

## El caso

Es la API del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), con la feature A implementada. La coordinación TIC prepara cada mañana los carros y pide un cambio en A: **filtrar la lista de portátiles por carro**.

- `GET /api/portatiles?carro=B` devuelve solo los portátiles del carro B, ordenados por código.
- El carro se puede combinar con el estado: `?carro=A&estado=disponible`.
- Si el carro no es A, B ni C, la API responde 400 con `{ error: "El carro debe ser A, B o C" }`.

La spec de A lo dejó fuera de alcance, así que es un **cambio** sobre algo que ya funciona: el caso para el que está pensado OpenSpec (tema 4, apartado 4.7). El proyecto ya tiene la spec vigente de los portátiles en el formato de OpenSpec, en [`openspec/specs/portatiles/spec.md`](./openspec/specs/portatiles/spec.md), y en [`AGENTS.md`](./AGENTS.md) la regla para combinar los cambios de OpenSpec con `docs/specs/`.

## Entorno de trabajo

El ejercicio trae su Dev Container, con OpenCode y **OpenSpec 1.16** (`openspec --version`). Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/`, y ejecuta **Dev Containers: Reopen in Container**. Si la carpeta no es todavía un repositorio de Git, créalo con `git init && git add . && git commit -m "Proyecto de partida"`.

Necesitas OpenCode conectado a un proveedor (UD1, tema 3). La documentación de OpenSpec está enlazada en la portada de la unidad.

## Requisitos

**Fase 1. OpenSpec en el proyecto**

1. Comprueba que `npm test` está en verde y crea la rama del cambio: `git switch -c cambio/filtrar-por-carro`.
2. Ejecuta `openspec init --tools opencode --language es`. Con `git status`, mira qué ha creado: la carpeta `openspec/` y, en `.opencode/`, comandos y skills. Anota en «Qué instala OpenSpec» para qué sirve cada cosa.
3. `openspec list --specs` muestra la capacidad `portatiles`. Commit: `OpenSpec en el proyecto`.

**Fase 2. Proponer el cambio**

4. Crea la carpeta `sesiones/` y, en una **sesión nueva** de OpenCode, lanza `/opsx-propose` con la descripción del cambio del apartado «El caso». Pide que el cambio se llame `filtrar-por-carro`.
5. Revisa los cuatro artefactos de `openspec/changes/filtrar-por-carro/` como revisarías una spec y un plan (temas 2 y 3). Anota en la tabla «Revisión de la propuesta» qué revisaste en cada uno y qué corregiste. Como mínimo:
   - la propuesta modifica la capacidad `portatiles` (no crea otra);
   - la delta usa `ADDED` o `MODIFIED` como corresponde, cada requisito tiene escenarios con `WHEN` y `THEN`, y no inventa comportamiento (¿qué pasa si el carro y el estado no son válidos a la vez?, ¿y con `carro=a` en minúscula?);
   - el diseño respeta la constitución (el filtro en el servicio) y explica las alternativas;
   - las tasks ponen los tests antes que el código y incluyen subir la spec de `docs/specs/` a la versión 1.1, como pide `AGENTS.md`.
6. Corrige lo que haga falta (a mano o con `/opsx-update`) y comprueba con `openspec validate filtrar-por-carro --strict`. Exporta la sesión como `sesiones/propuesta.md`. Commit: `Cambio filtrar-por-carro: propuesta (aprobada)`.

**Fase 3. Implementar**

7. En una **sesión nueva**, lanza `/opsx-apply filtrar-por-carro`. Pide al agente que te enseñe los tests en rojo antes de implementar.
8. Haz el punto de control 4 (UD2, tema 3): `git status`, `git diff` y `npm test`. Comprueba que `docs/specs/A-consultar-portatiles/spec.md` está en la versión 1.1 con el cambio y que las tasks del cambio están marcadas. Exporta la sesión como `sesiones/implementacion.md`. Commit: `Cambio filtrar-por-carro: implementación`.

**Fase 4. Archivar y fusionar**

9. Archiva el cambio con `/opsx-archive filtrar-por-carro` o con `openspec archive filtrar-por-carro`. Comprueba:
   - `openspec/specs/portatiles/spec.md` tiene los requisitos nuevos;
   - el cambio está en `openspec/changes/archive/`, con la fecha delante;
   - `openspec validate --all --strict` y `npm test` siguen en verde.
10. Commit: `Cambio filtrar-por-carro: archivado`. Fusiona en `main` con `git merge --no-ff cambio/filtrar-por-carro -m "Fusiona el cambio filtrar-por-carro"` y borra la rama.

**Fase 5. Comparar**

11. Completa la tabla «OpenSpec y el flujo a mano» y responde: ¿para qué tipo de trabajo usarías cada uno en este proyecto? Completa «Sesión con el agente», «Decisiones» y «Commits», y haz un último commit en `main`.

**Opcional.** Haz el mismo cambio con **Spec Kit** en otra rama, siguiendo su documentación (necesita Python y `uv`; anota la fecha de consulta), y añade una columna a la tabla de la fase 5.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `main` | Con el cambio fusionado: `Fusiona el cambio filtrar-por-carro` |
| `openspec/specs/portatiles/spec.md` | La spec vigente con los requisitos del cambio |
| `openspec/changes/archive/<fecha>-filtrar-por-carro/` | El cambio archivado: `proposal.md`, `design.md`, `tasks.md` (todas marcadas) y la delta |
| `docs/specs/A-consultar-portatiles/spec.md` | Versión 1.1, con el filtro por carro |
| `src/` y `tests/` | El filtro implementado y sus tests; `npm test` en verde |
| `sesiones/propuesta.md`, `sesiones/implementacion.md` | Las exportaciones de las sesiones |
| `README.md` | Secciones «Qué instala OpenSpec», «Revisión de la propuesta», «Sesión con el agente», «Decisiones», «OpenSpec y el flujo a mano» y «Commits», con las tablas de la plantilla |
| Historial | Los cuatro commits de las fases 1 a 4 en la rama, en ese orden, y la fusión |

## Comprueba tu solución

- `openspec validate --all --strict` termina sin errores.
- La delta no repite la spec entera: solo lo que se añade o cambia. Si modifica un requisito existente, lo copia completo.
- Ningún escenario de la delta contradice la spec de `docs/specs/` 1.1, y al revés.
- Los tests del cambio llevan el identificador de la spec de `docs/specs/` (RF-04, EC-06…) y comprueban los mensajes exactos.
- Ningún test de la feature A anterior ha cambiado: el cambio solo **añade** tests.
- `git log --oneline --graph` muestra la rama del cambio con sus cuatro commits y la fusión.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**: cierra la ventana de VS Code del ejercicio y, en una terminal de tu equipo, ejecuta:

```bash
docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
```
