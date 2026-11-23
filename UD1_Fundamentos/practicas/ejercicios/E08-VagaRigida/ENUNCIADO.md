# E08 · Ni vaga ni rígida

**Tipo:** autocorrección

Gradúa el nivel de detalle de una spec: clasifica líneas en vagas, rígidas o adecuadas y decide dónde va cada una; después revisa una spec con el agente *plan*, acepta o rechaza sus propuestas con criterio y déjala aprobada.

**Criterios:** OA1 f

## El caso

En el préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), la feature F es «Cancelar una reserva». Su spec está en [`docs/specs/F-cancelar-reserva/spec.md`](./docs/specs/F-cancelar-reserva/spec.md), **en revisión**. Esta carpeta es el repositorio de las specs del proyecto, con el contexto para el agente ya preparado: `AGENTS.md`, `constitution.md` (que fija EARS y Gherkin para las specs) y `opencode.json`.

Lo que ha decidido la coordinación TIC sobre las cancelaciones:

- Pueden cancelar una reserva quien la hizo y cualquier persona de la coordinación TIC.
- Se puede cancelar hasta que empieza la hora reservada. Después, la API responde 409 con `{ error: "La reserva ya ha empezado" }`.
- Cancelar una reserva que ya está cancelada responde 409 con `{ error: "La reserva ya está cancelada" }`.
- Al cancelar, la API responde 200 con la reserva, y el carro queda libre a esa hora para nuevas reservas.
- La cancelación tiene que responder en menos de 300 ms con 500 reservas guardadas.

## Entorno de trabajo

El ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`, con OpenCode y el validador de Gherkin del E07 (`npm run validar`). Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/`, y ejecuta **Dev Containers: Reopen in Container**. Si la carpeta no es todavía un repositorio de Git, créalo con `git init && git add . && git commit -m "Proyecto de partida"`.

Necesitas OpenCode conectado a un proveedor (tema 3). Si lo conectaste en otro ejercicio, las credenciales siguen en el volumen `sdd-opencode`.

## Requisitos

Haz un commit al final de cada fase, con el mensaje que se indica.

**Fase 1. Clasificar líneas (sin agente)**

1. Para cada línea L1–L15 de [`lineas.md`](./lineas.md), completa la tabla «Clasificación» del README:
   - si es **vaga**, **rígida** o **adecuada** (tema 6, apartado 6.6);
   - **dónde va**: en la **spec**, en el **plan** o en la **constitución** (tema 6, apartado 6.7);
   - si es vaga o rígida, una **reescritura** adecuada (o, si es rígida y va al plan, por qué no va en la spec); si es adecuada, el motivo.
2. Commit: `Clasificación de líneas`.

**Fase 2. Revisar la spec con el agente**

3. Crea la carpeta de las sesiones (`mkdir -p sesiones`), arranca OpenCode y, con el agente **plan** en una sesión nueva, pídele la revisión con el prompt del tema 6 (apartado 6.8):

   ```text
   Revisa @docs/specs/F-cancelar-reserva/spec.md. No la modifiques: solo
   quiero una lista de problemas.

   Para cada línea con un problema, indica:
   - El identificador (RF-01, AC-02…).
   - El tipo: VAGA (el agente tendría que decidir comportamiento), RÍGIDA
     (dicta implementación) o NOTACIÓN (no sigue EARS en requisitos y edge
     cases, o Gherkin en criterios de aceptación).
   - Una propuesta de redacción.

   Si algo no se puede resolver sin una decisión mía, márcalo con
   [NECESITA ACLARACIÓN] y la pregunta concreta.
   ```

4. Después, en la misma sesión, pídele:

   ```text
   ¿Qué detalles técnicos añadirías a la spec para que la implementación
   sea más precisa?
   ```

5. Exporta la sesión con `/export` y mueve el fichero que crea (`session-….md`) a `sesiones/revision.md`.
6. Completa las secciones «Sesión con el agente» y «Decisiones» del README. En «Decisiones», una fila por **cada propuesta** del agente (de los dos prompts), aceptada o rechazada, con el motivo. Usa el criterio del tema 6: ¿lo notaría alguien desde fuera o rompe una restricción acordada?
7. Commit: `Revisión de la spec con el agente`.

**Fase 3. Spec revisada y aprobada**

8. Aplica a la spec los cambios que has aceptado. Puedes hacerlo a mano o pedírselo al agente *build*, diciéndole exactamente qué cambios aplicar; si lo haces con el agente, añádelo a «Sesión con el agente». Al terminar, la spec debe:
   - tener los requisitos y los *edge cases* en EARS y los criterios de aceptación en Gherkin declarativo, como pide la constitución;
   - usar las decisiones de la coordinación TIC (no queda ningún `[NECESITA ACLARACIÓN]`);
   - no tener ningún detalle de implementación;
   - tener la versión `1.1` y el estado `Aprobada`.
9. Pasa la lista de comprobación del tema 6 (apartado 6.9) y márcala en la sección «Lista de comprobación» del README.
10. Cambia el estado de la feature F en `docs/specs/README.md` a `🔜 Aprobada`.
11. Ejecuta `npm run validar` y pega la salida en «Validación». Completa «Commits» y haz el commit `Spec de la feature F aprobada`.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `lineas.md`, `constitution.md`, `AGENTS.md`, `opencode.json`, `herramientas/`, `package.json` | Sin cambios |
| `docs/specs/F-cancelar-reserva/spec.md` | La spec revisada, versión 1.1, `Aprobada` |
| `docs/specs/README.md` | La feature F en `🔜 Aprobada` |
| `sesiones/revision.md` | La exportación de la sesión de revisión |
| `README.md` | Secciones «Clasificación», «Sesión con el agente», «Decisiones», «Lista de comprobación», «Validación» y «Commits», con las tablas de la plantilla |
| Valores de la columna «Tipo» | `vaga`, `rígida` o `adecuada` |
| Valores de la columna «Dónde va» | `spec`, `plan` o `constitución` |
| Historial | Al menos tres commits propios, con los mensajes de las fases 1 a 3, en ese orden |

## Comprueba tu solución

- «No poner implementación en la spec» no significa «no poner nada técnico»: una ruta de la API, un código de error o un formato de fecha se ven desde fuera.
- Las líneas que valen para **todo el proyecto** (no solo para cancelar reservas) van en la constitución.
- En «Decisiones» hay al menos una propuesta **rechazada**. Si el agente propuso añadir nombres de funciones, estructuras de datos o librerías, son candidatas: van en el plan.
- Si el agente marcó algo con `[NECESITA ACLARACIÓN]`, la respuesta está en las decisiones de la coordinación TIC del enunciado.
- En la spec revisada no queda ninguna palabra subjetiva (eficiente, rápida, adecuadamente, correctamente) ni ningún escenario con botones, colores, URL de la página o ventanas emergentes.
- `npm run validar` termina con `✅`.
- `git log --oneline` muestra los tres commits de las fases en orden.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**: cierra la ventana de VS Code del ejercicio y, en una terminal de tu equipo, ejecuta:

```bash
docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
```
