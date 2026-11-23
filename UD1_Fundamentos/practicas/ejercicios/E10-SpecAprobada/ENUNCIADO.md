# E10 · De la idea a la spec aprobada

**Tipo:** autocorrección (integrador)

Recorre todo lo que has aprendido en la unidad sobre el proyecto de los temas, la lista de tareas compartida: prepara el entorno y el contexto del agente, define las features y lleva la spec de «Marcar una tarea como hecha» desde tu borrador hasta su aprobación, con el agente y con un commit por fase.

**Criterios:** OA1 c, d, e, f

## El caso

Vuelves a la **lista de tareas compartida** de los temas. Esta carpeta es su repositorio, todavía sin código:

```text
E10-SpecAprobada/
├── .devcontainer/devcontainer.json   ← entorno del curso con OpenCode
├── docs/
│   ├── prd.md                         ← el PRD del tema 2
│   └── specs/A-añadir-tarea/spec.md   ← la spec aprobada en el tema 6
├── herramientas/validar-gherkin.mjs   ← npm run validar
├── package.json
├── ENUNCIADO.md                       ← este fichero
└── README.md                          ← tu entrega
```

En este proyecto **tú eres el equipo**: las decisiones de producto que salgan al escribir la spec las tomas tú, dentro de lo que dice el PRD. La spec de la feature A te sirve de modelo de nivel de detalle y de formato.

Lo que el equipo ya ha acordado para la API: las tareas se crean con `POST /tareas` (feature A), y se marcan o desmarcan con `PATCH /tareas/:id` y el cuerpo `{ "hecha": true }` o `{ "hecha": false }`.

## Entorno de trabajo

El ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`, con OpenCode y el validador de Gherkin (`npm run validar`). Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/`, y ejecuta **Dev Containers: Reopen in Container**. Si la carpeta no es todavía un repositorio de Git, créalo con `git init && git add . && git commit -m "Proyecto de partida"`.

Necesitas OpenCode conectado a un proveedor (tema 3). Crea la carpeta de las sesiones con `mkdir -p sesiones`.

## Requisitos

Haz un commit al final de cada fase, con el mensaje que se indica.

**Fase 1. Entorno y contexto**

1. Escribe el contexto del agente (temas 2 y 3):
   - **`AGENTS.md`:** comandos (instalar, validar los escenarios), estructura de `docs/`, cómo se nombran las carpetas de las specs y al menos tres prohibiciones. Como mucho, unas 40 líneas.
   - **`constitution.md`:** los principios de la lista de tareas (capas, formato de la API y de los errores, pruebas, como en el tema 2) y una sección «Specs» con la notación del proyecto: requisitos y *edge cases* en EARS; criterios de aceptación en Gherkin con `# language: es` y el identificador en el nombre del escenario.
   - **`opencode.json`:** la constitución en `instructions`; cualquier comando pregunta, salvo `npm run validar`, `git status`, `git diff` y `git log`, que se permiten; `rm` prohibido; ninguna regla de `edit`.
2. Comprueba con el agente *plan*, en una sesión nueva, que conoce el contexto: pregúntale qué principios debe respetar y en qué notación se escriben las specs. Anota las respuestas en la sección «Entorno» del README.
3. Commit: `Entorno y contexto de la lista de tareas`.

**Fase 2. Features**

4. Pide al agente *plan* que proponga cómo dividir el épico del PRD en features (como en el tema 4, apartado 4.9). Revisa su propuesta con los criterios del tema 4 en la tabla «Features» del README.
5. Escribe `docs/specs/README.md` con las features que decidas, su carpeta con prefijo de orden y su estado: la A está `🔜 Aprobada` y el resto, `⏳ Pendiente`. Justifica el orden en «Orden». La feature «Marcar una tarea como hecha» va en la carpeta `C-marcar-hecha/`.
6. Commit: `Features de la lista de tareas`.

**Fase 3. Borrador de la spec de C**

7. Escribe tú, sin agente, un borrador de la feature en la sección «Borrador» del README: de cinco a diez líneas.
8. En una sesión nueva con el agente *plan*, pídele que lo convierta en una spec con la plantilla del curso y la notación de la constitución, usando la spec de A como modelo, y que marque con `[NECESITA ACLARACIÓN]` lo que no esté decidido. Exporta la sesión como `sesiones/redaccion.md`.
9. Guarda la spec en `docs/specs/C-marcar-hecha/spec.md` (versión `0.1`, estado `Borrador`), pon la feature C en `📝 Borrador` en el índice y haz el commit `Spec de la feature C (borrador)`.

**Fase 4. Spec en revisión**

10. Resuelve cada marcador: aquí decides tú, con el PRD. Anota cada decisión en «Decisiones de producto». Ojo con lo que el PRD deja **fuera de alcance**.
11. En una sesión nueva con el agente *plan*, revisa la notación y la granularidad con el prompt del tema 6 (apartado 6.8). Exporta la sesión como `sesiones/revision.md` y anota cada propuesta en «Decisiones», aceptada o rechazada, con el motivo.
12. Aplica los cambios, pon la versión `0.2` y el estado `En revisión`, la feature C en `👀 En revisión` en el índice, y haz el commit `Spec de la feature C (en revisión)`.

**Fase 5. Spec aprobada**

13. Pasa la lista de comprobación del tema 6 (apartado 6.9) y márcala en el README. Pon la versión `1.0`, el estado `Aprobada` y la feature C en `🔜 Aprobada`.
14. Ejecuta `npm run validar` y pega la salida en «Validación». Completa «Sesión con el agente» y «Commits», y haz el commit `Spec de la feature C (aprobada)`.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `docs/prd.md`, `docs/specs/A-añadir-tarea/spec.md`, `herramientas/`, `package.json` | Sin cambios |
| `AGENTS.md`, `constitution.md`, `opencode.json` | En la raíz, según el requisito 1 |
| `docs/specs/README.md` | Índice de features con la tabla `# \| Feature \| Carpeta \| Estado` |
| `docs/specs/C-marcar-hecha/spec.md` | La spec de la feature C, versión 1.0, `Aprobada` |
| `sesiones/redaccion.md` y `sesiones/revision.md` | Las exportaciones de las fases 3 y 4 |
| `README.md` | Secciones «Entorno», «Features», «Orden», «Borrador», «Sesión con el agente», «Decisiones de producto», «Decisiones», «Lista de comprobación», «Validación» y «Commits» |
| Historial | Al menos cinco commits propios, con los mensajes de las fases 1 a 5, en ese orden |

## Comprueba tu solución

- `opencode debug config` muestra tu `instructions` y tus permisos, y en `opencode debug agents` el agente `plan` mantiene `edit` denegado.
- Las respuestas de la fase 1 recogen lo de tu `AGENTS.md` y lo de tu constitución.
- Ninguna feature del índice es un épico, una task o algo que el PRD deja fuera de alcance.
- Tu spec de C responde, al menos, a estas preguntas: ¿se puede desmarcar una tarea?, ¿qué pasa al marcar una tarea que ya está hecha?, ¿y si la tarea no existe?, ¿y si `hecha` no es `true` ni `false`?, ¿qué se guarda al marcarla?, ¿cómo se ve en la lista?
- El PRD deja fuera los usuarios y los permisos: si alguna propuesta dice quién puede marcar una tarea o guarda quién la marcó, no entra en esta spec.
- La spec sigue el formato y el nivel de detalle de la de A: ni más vaga ni con detalles de implementación.
- `npm run validar` termina con `✅ 2 documentos de Gherkin sin errores` (la spec de A y la tuya).
- `git log --oneline` muestra los cinco commits de las fases en orden, y el índice cambia de estado en los commits de las fases 3, 4 y 5.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**: cierra la ventana de VS Code del ejercicio y, en una terminal de tu equipo, ejecuta:

```bash
docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
```

Este proyecto continúa en la UD2: a partir de tu spec aprobada, el agente generará el plan técnico de la feature C.
