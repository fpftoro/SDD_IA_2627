# E10 · De la spec aprobada a `main` (integrador)

**Tipo:** autocorrección

Lleva una feature de la lista de tareas desde su spec aprobada hasta `main`, con todo lo de la unidad: rama, plan, tasks, ciclos cortos con la integración continua en verde, fusión y replanificación, usando la memoria del agente y con el contexto justo en cada fase.

**Criterios:** OA2 a, b, c, d, e, f

## El caso

Es la **lista de tareas** de los temas, con las features A (Añadir una tarea) y B (Ver la lista de tareas) implementadas y la memoria del agente del tema 6: `AGENTS.md`, `tests/AGENTS.md`, la skill `tests-desde-spec`, los comandos `/planificar`, `/implementar` y `/documentar`, y el subagente `documentador`. La plantilla trae también la integración continua (`.github/workflows/calidad.yml`), que **no se modifica**.

La spec de la **feature C, «Marcar una tarea como hecha»**, está aprobada en [`docs/specs/C-marcar-hecha/spec.md`](./docs/specs/C-marcar-hecha/spec.md): es la que aprobaste en el E10 de la UD1. Toca implementarla.

> ⚠️ **Cuidado**: los tests de A, B y C comparten ficheros, así que sus nombres llevan la letra de la feature delante del identificador (`C-EC-01: …`). Lo dice `tests/AGENTS.md`.

## Entorno de trabajo

El ejercicio trae su Dev Container, con OpenCode. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/`, y ejecuta **Dev Containers: Reopen in Container**. Necesitas tu repositorio de trabajo en **GitHub** para la integración continua, y OpenCode conectado a un proveedor.

## Requisitos

Cada fase empieza con una **sesión nueva** (`/new`). Exporta cada sesión con `/export` en la carpeta `sesiones/` (`plan.md`, `tasks.md`, `ciclo-1.md`…) y anota en el README qué contexto le diste.

**Fase 0. Punto de partida**

1. `npm test` en verde, `npm run estado` sin errores (C en `Aprobada`) y la CI de `main` en verde. Pega la salida de `npm run estado` en «Estado».

**Fase 1. Plan (tema 2)**

2. Crea la rama `feature/C-marcar-hecha`.
3. Pide el plan con `/planificar C-marcar-hecha`. Revisa la propuesta con la lista del punto de control 2: pregunta, rechaza y comprueba la cobertura. Hay al menos **un hueco** en la spec (algo que se nota desde fuera y que la spec no decide): búscalo. Cuando lo encuentres, para, decide, sube la spec a 1.1 en la rama y apruébala con su commit.
4. Guarda el plan con *build*, comprueba con `git status` que solo ha cambiado `plan.md`, apruébalo y haz el commit `Plan de la feature C (aprobado)`. Sube la rama.

**Fase 2. Tasks (tema 3)**

5. En una sesión nueva, pide las tasks con el prompt del tema 3 (apartado 3.2). Revísalas con la lista del punto de control 3, guárdalas y haz el commit `Tasks de la feature C (aprobadas)`.

**Fase 3. Ciclos (temas 3 y 4)**

6. Un ciclo por grupo, cada uno en una sesión nueva con `/implementar C-marcar-hecha <grupo>`. En cada ciclo: tests en rojo y en verde, punto de control 4 hecho por ti (`git status`, `git diff`, `npm test`), commit con la convención y `git push` con la CI en verde. Los cambios de estado de la spec y del índice van en el commit del primer ciclo (`En implementación`) y del último (`Implementada`).
7. Lo que la spec dice de la página (el texto tachado, sin recargar) se comprueba **a mano** con el servidor arrancado: anota en el README qué comprobaste.

**Fase 4. Fusión (tema 3, apartado 3.4.7)**

8. Comprobación final de la feature entera (`git diff --stat main...feature/C-marcar-hecha` y la CI del último commit en verde). Fusiona con `git merge --no-ff feature/C-marcar-hecha -m "Fusiona la feature C: marcar una tarea como hecha"`, borra la rama y sube `main` con la CI en verde.

**Fase 5. Replanificación (tema 1, apartado 1.2.8, y tema 6)**

9. En `main`, responde las cuatro preguntas de la replanificación con lo que ha pasado en esta feature (¿la siguiente sigue siendo la D?, ¿has corregido la misma decisión varias veces?, ¿el agente ha tropezado con algo?, ¿has repetido algún prompt?). Haz al menos **un cambio** en la memoria del agente o en el contexto del proyecto que te habría ahorrado trabajo en esta feature, en su propio commit: `Replanificación tras la feature C: <qué cambia>`.
10. Opcional: documenta la feature con `/documentar C-marcar-hecha` y revisa lo que escribe el documentador.
11. Completa el README y haz el último commit en `main`.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `main` | Con la feature C fusionada (`Fusiona la feature C: marcar una tarea como hecha`) y el commit de replanificación después |
| `docs/specs/C-marcar-hecha/` | `spec.md` (1.1 o superior, `Implementada`), `plan.md` (`Aprobado`) y `tasks.md` (todas `[x]`) |
| `docs/specs/README.md` | C en `✅ Implementada` (`npm run estado` sin errores) |
| `src/`, `public/`, `tests/` | La feature C, con sus tests (`C-…` en el nombre); `npm test` en verde |
| Tests de A y B, `.github/workflows/calidad.yml` | Sin cambios |
| `sesiones/` | Una exportación por fase y por ciclo |
| `README.md` | Secciones «Recorrido», «Estado», «Hueco de la spec», «Decisiones», «Puntos de control», «Contexto», «Replanificación» y «Commits», con las tablas de la plantilla |

## Comprueba tu solución

- `git log --oneline --graph` muestra: en la rama, el plan, las tasks y un commit por ciclo (y la spec 1.1 donde corresponda); en `main`, la fusión y la replanificación.
- El plan no tiene código, tiene una fila de pruebas por identificador con su tipo, y lo de la página se comprueba a mano.
- Ningún test de A ni de B ha cambiado; los de C llevan su letra.
- La decisión del hueco está en la spec 1.1 y en un test, no solo en el código.
- `npm run estado` sin errores en `main`, y la CI de `main` en verde.
- Cada sesión exportada empieza limpia: ninguna arrastra la conversación de la fase anterior.
- El cambio de la replanificación responde a algo que pasó de verdad en esta feature.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**: cierra la ventana de VS Code del ejercicio y, en una terminal de tu equipo, ejecuta:

```bash
docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
```
