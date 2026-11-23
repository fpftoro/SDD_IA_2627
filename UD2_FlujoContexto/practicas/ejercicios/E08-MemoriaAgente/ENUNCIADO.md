# E08 · La memoria del agente

**Tipo:** autocorrección

Revisa un `AGENTS.md` lleno de falsedades y deja la memoria del proyecto en orden: una regla de carpeta, una skill, un comando y un subagente con permisos mínimos. Comprueba con OpenCode que lo ha cargado todo y que el subagente no puede hacer lo que no debe.

**Criterios:** OA2 f

## El caso

Es la API del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), con la feature A implementada y la spec de B aprobada. Su [`AGENTS.md`](./AGENTS.md) lo escribió alguien al principio del proyecto y nadie lo ha revisado desde entonces: tiene **más de diez** problemas. Todo lo demás (`constitution.md`, `package.json`, `src/`, `tests/`) dice la verdad.

## Entorno de trabajo

El ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`, con OpenCode. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/`, y ejecuta **Dev Containers: Reopen in Container**. Si la carpeta no es todavía un repositorio de Git, créalo con `git init && git add . && git commit -m "Proyecto de partida"`.

Necesitas OpenCode conectado a un proveedor (UD1, tema 3) para la fase 4. Las fases 1 a 3 se hacen sin agente.

## Requisitos

**Fase 1. Revisar `AGENTS.md` (tema 6, apartado 6.2)**

1. Comprueba cada línea de `AGENTS.md` contra el proyecto: ejecuta los comandos, busca las carpetas, compara con `package.json`, `src/servidor.js` y la constitución. Anota en la tabla «Revisión de AGENTS.md» del README **al menos diez** problemas: la línea, qué le pasa (falsa, obsoleta, contradice la constitución, vaga, duplicada o no va en `AGENTS.md`), cómo lo has comprobado y qué haces.
2. Reescribe `AGENTS.md`: corto, concreto y verdadero, con «Al empezar una sesión», comandos, estructura y prohibiciones. Lo que ya está en la constitución no se repite.
3. Commit: `AGENTS.md revisado`.

**Fase 2. Memoria nueva (apartados 6.3 a 6.6)**

4. **Regla de carpeta:** `tests/AGENTS.md` con las convenciones de los tests del proyecto. Míralas en `tests/` (los nombres, los mensajes exactos, cómo se envía la identificación en los tests de la API).
5. **Skill:** `.opencode/skills/error-api/SKILL.md`, con el procedimiento para que la API responda con un **código de error HTTP que todavía no usa** (por ejemplo, el 409 que necesitará la feature B): la clase en `src/errores/`, quién la lanza, su traducción en el controlador y sus tests. La descripción tiene que decir qué hace y **cuándo** usarla.
6. **Comando:** `.opencode/commands/revisar-plan.md`, que revisa `docs/specs/<feature>/plan.md` con la lista del punto de control 2 **sin modificar nada**. Recibe la carpeta de la feature como argumento y lo ejecuta el agente que no puede editar.
7. **Subagente:** `.opencode/agents/revisor.md`, que revisa un ciclo de implementación (los cambios, los tests, la spec y el plan) y devuelve un informe. Solo puede leer y ejecutar `npm test`, `git status`, `git diff` y `git log`: **nada más**.
8. Commit: `Memoria del agente: regla de tests, skill, comando y revisor`.

**Fase 3. Comprobar la configuración (sin modelo)**

9. Comprueba que OpenCode ha cargado lo que has creado:
   - En el terminal, `opencode debug agents | grep -E '"(id|mode)"'`: aparece `revisor` con `"mode": "subagent"`.
   - En la interfaz de OpenCode, `/skills`: aparece `error-api`.
   - En la interfaz, al escribir `/`: aparece `revisar-plan` con su descripción.
   - En el terminal, `opencode debug agents`: busca el agente `revisor` y lee sus reglas de la primera a la última.

   Pega en «Configuración comprobada» lo importante de cada salida (no la salida entera).
10. La primera regla del revisor es la de serie: `*` con `*` en `allow`. Todo lo que tu revisor no prohíbe sigue **permitido**. Busca qué acciones no tienen ninguna regla propia (la lista de acciones está en la página de permisos de la documentación de OpenCode). Para cada una, piensa: ¿la necesita para revisar? ¿Qué podría hacer con ella? En concreto, `subagent` permite encargar trabajo a **otro** agente: ¿qué puede hacer ese otro agente? Si hace falta, cierra los permisos que sobran, vuelve a comprobar y explícalo en «Permisos del revisor».

**Fase 4. Usarlo (con el agente)**

11. Crea la carpeta `sesiones/`. En una sesión nueva:
    - Lanza `/revisar-plan A-consultar-portatiles` y comprueba con `git status` que no ha cambiado nada.
    - Pide `@revisor revisa el último commit` y, después, `@revisor corrige el primer problema que encuentres`. Comprueba qué pasa.
    - Pide al agente *build*: «La feature B necesitará responder 409. ¿Cómo añadirías ese error? Dímelo, no lo hagas». Comprueba si carga la skill.
12. Exporta la sesión con `/export` y mueve el fichero que crea a `sesiones/memoria.md` y completa «Sesión con el agente» y «Commits». Haz un último commit con el README y la sesión.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `AGENTS.md` | Revisado |
| `tests/AGENTS.md` | La regla de carpeta de los tests |
| `.opencode/skills/error-api/SKILL.md` | La skill, con `name: error-api` y su descripción |
| `.opencode/commands/revisar-plan.md` | El comando |
| `.opencode/agents/revisor.md` | El subagente, con `mode: subagent` y sus permisos |
| `constitution.md`, `opencode.json`, `src/`, `tests/*.test.js`, `docs/` | Sin cambios |
| `sesiones/memoria.md` | La exportación de la sesión de la fase 4 |
| `README.md` | Secciones «Revisión de AGENTS.md», «Configuración comprobada», «Permisos del revisor», «Sesión con el agente» y «Commits», con las tablas de la plantilla |
| Historial | Los commits de las fases 1 y 2, en ese orden |

## Comprueba tu solución

- Cada comando de tu `AGENTS.md` existe en `package.json` y funciona; cada carpeta existe.
- Tu `AGENTS.md` no repite la constitución y no tiene ninguna regla que la contradiga.
- Ninguna regla de `AGENTS.md` pide al agente que cambie el estado de una spec.
- `tests/AGENTS.md` describe cómo **son** los tests; la skill, cómo **se hace** algo paso a paso.
- El `name` de la skill es igual que el nombre de su carpeta.
- El comando no puede modificar ficheros aunque el prompt se equivoque: lo garantiza su `agent`, no el texto.
- En `opencode debug agents`, el revisor tiene `edit` en `deny`, y ninguna acción que siga permitida le deja modificar ficheros por un camino indirecto.
- Cuando pediste al revisor que corrigiera, OpenCode no le dejó: no es que «obedeciera».

## Al terminar

Cuando acabes la práctica, **borra su contenedor**: cierra la ventana de VS Code del ejercicio y, en una terminal de tu equipo, ejecuta:

```bash
docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
```
