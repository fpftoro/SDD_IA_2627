# E09 · La spec de una feature

**Tipo:** autocorrección

Escribe con ayuda del agente la spec completa de «Registrar la devolución de un portátil»: desde tu propio borrador hasta la spec aprobada, resolviendo las dudas con quien decide y documentando cada paso.

**Criterios:** OA1 e, f

## El caso

En el préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), la feature D es «Registrar la devolución de un portátil». Todavía no tiene spec: solo las notas que tomó un compañero en una reunión con la coordinación TIC, en [`docs/notas-devolucion.md`](./docs/notas-devolucion.md).

Esta carpeta es el repositorio de specs del proyecto, con el contexto del agente preparado (`AGENTS.md`, `constitution.md`, `opencode.json`), el PRD en `docs/prd.md` y el índice de features en `docs/specs/README.md`.

Lo que ya está decidido por el equipo:

- **API:** la devolución se registra con `POST /api/prestamos/:id/devolucion`, donde `:id` es el identificador del préstamo, y el cuerpo `{ "conCargador": true }`.
- **La feature C (préstamo), ya aprobada:** cada préstamo guarda el portátil, el profesor, la fecha y hora del préstamo y la fecha límite (el mismo día a las 14:30). Mientras está abierto, su fecha de devolución vale `null`.

En [`docs/respuestas-coordinacion.md`](./docs/respuestas-coordinacion.md) están las respuestas de la coordinación TIC a las dudas más habituales. **No lo abras hasta la fase 3**: el ejercicio consiste en descubrir tú qué hay que preguntar.

## Entorno de trabajo

El ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`, con OpenCode y el validador de Gherkin (`npm run validar`). Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/`, y ejecuta **Dev Containers: Reopen in Container**. Si la carpeta no es todavía un repositorio de Git, créalo con `git init && git add . && git commit -m "Proyecto de partida"`.

Necesitas OpenCode conectado a un proveedor (tema 3). Crea la carpeta de las sesiones con `mkdir -p sesiones`.

## Requisitos

Haz un commit al final de cada fase, con el mensaje que se indica.

**Fase 1. Tu borrador (sin agente)**

1. Lee el PRD y las notas, y escribe en la sección «Borrador» del README, con tus palabras y en lenguaje natural, qué debe hacer la devolución: de cinco a diez líneas. Es el punto de partida (tema 5, apartado 5.13), no tiene que ser perfecto.
2. Commit: `Borrador de la feature D`.

**Fase 2. La spec con el agente**

3. Con el agente **plan**, en una sesión nueva, pídele que convierta tu borrador en una spec. Escribe tú el prompt; debe pedirle, al menos:
   - la plantilla del curso (tema 5, apartado 5.10) y la notación de la constitución (EARS y Gherkin);
   - que use las notas (`@docs/notas-devolucion.md`), el PRD y la constitución;
   - que **no invente** lo que falte y lo marque con `[NECESITA ACLARACIÓN]`.
4. Guarda el resultado en `docs/specs/D-registrar-devolucion/spec.md` con el estado `Borrador` y la versión `0.1` (el agente *plan* no puede escribir ficheros: cópialo tú o pídeselo al agente *build*). Revísalo: lo que el agente haya inventado sin marcar, márcalo tú.
5. Exporta la sesión con `/export` y mueve el fichero que crea (`session-….md`) a `sesiones/redaccion.md`.
6. Cambia la feature D en `docs/specs/README.md` a `📝 Borrador` y haz el commit `Spec de la feature D (borrador)`.

**Fase 3. Dudas y revisión**

7. Ahora sí, abre `docs/respuestas-coordinacion.md`. Para cada `[NECESITA ACLARACIÓN]` de tu spec, busca la respuesta y cámbialo por la decisión. Anota cada una en la tabla «Dudas resueltas» del README. Si alguna duda no tiene respuesta, sigue marcada.
8. Si en las respuestas aparece algo importante que no habías marcado, añádelo a la spec y anótalo también: es algo que ni tú ni el agente visteis.
9. En una sesión nueva con el agente **plan**, revisa la notación y la granularidad con el prompt del tema 6 (apartado 6.8). Exporta la sesión como `sesiones/revision.md` y anota en «Decisiones» cada propuesta del agente, aceptada o rechazada, con el motivo.
10. Aplica los cambios aceptados, pon la versión `0.2` y el estado `En revisión` (o `Borrador` si sigue habiendo marcadores), actualiza el índice y haz el commit `Spec de la feature D (en revisión)`.

**Fase 4. Aprobación**

11. Pasa la lista de comprobación del tema 6 (apartado 6.9) y márcala en el README. Si todo se cumple, pon la versión `1.0`, el estado `Aprobada` y la feature D en `🔜 Aprobada` en el índice. Si algo no se cumple, explica en «Lista de comprobación» qué falta y deja la spec como está.
12. Ejecuta `npm run validar` y pega la salida en «Validación». Completa «Sesión con el agente» y «Commits», y haz el commit `Spec de la feature D (aprobada)`.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `docs/notas-devolucion.md`, `docs/respuestas-coordinacion.md`, `docs/prd.md`, `constitution.md`, `AGENTS.md`, `opencode.json`, `herramientas/`, `package.json` | Sin cambios |
| `docs/specs/D-registrar-devolucion/spec.md` | La spec de la feature D, con la plantilla del curso, en EARS y Gherkin |
| `docs/specs/README.md` | El estado de la feature D, actualizado en cada fase |
| `sesiones/redaccion.md` y `sesiones/revision.md` | Las exportaciones de las sesiones de las fases 2 y 3 |
| `README.md` | Secciones «Borrador», «Sesión con el agente», «Dudas resueltas», «Decisiones», «Lista de comprobación», «Validación» y «Commits», con las tablas de la plantilla |
| Historial | Al menos cuatro commits propios, con los mensajes de las fases 1 a 4, en ese orden |

## Comprueba tu solución

- El commit de la fase 1 solo tiene tu borrador: el agente aparece a partir de la fase 2.
- La spec de la fase 2 tiene marcadores: las notas dejan sin decidir al menos quién puede registrar una devolución, qué pasa si el portátil se averió y qué cuenta como retraso. Si la spec del agente no tiene ninguno, se los ha inventado.
- En la spec final:
  - Cada respuesta de la coordinación TIC está en un requisito, un *edge case* o el fuera de alcance.
  - Las penalizaciones por retraso aparecen en el fuera de alcance, no en los requisitos.
  - Los préstamos no se borran: la devolución rellena la fecha de devolución del préstamo.
  - La fecha de devolución la pone el servidor, nunca la petición.
  - Ningún requisito dice cómo programarlo.
- `npm run validar` termina con `✅`.
- `git log --oneline` muestra los cuatro commits de las fases en orden, y `git show` del de la fase 2 incluye `sesiones/redaccion.md`.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**: cierra la ventana de VS Code del ejercicio y, en una terminal de tu equipo, ejecuta:

```bash
docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
```
