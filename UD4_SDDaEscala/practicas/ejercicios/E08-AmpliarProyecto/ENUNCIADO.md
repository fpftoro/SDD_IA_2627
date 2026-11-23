# E08 · Ampliar un proyecto existente (integrador)

**Tipo:** autocorrección, con agente. **Integrador** de la unidad.

La lista de tareas compartida tiene las features A y B y quiere crecer. Un equipo de cuatro roles añade dos features a la vez (C y D) con varios agentes, y termina auditando su propio trabajo.

**Criterios:** OA4 a, b, c, d, e

## El caso

Es la lista de tareas de los temas de la unidad, con las features A «Añadir una tarea» y B «Ver la lista» implementadas (29 tests en verde). Hay dos features con la spec aprobada, **C «Marcar una tarea como hecha»** y **D «Borrar una tarea»**. El equipo: producto, arquitectura, desarrollo y calidad (equipos de GitHub `@centro/producto`, `@centro/arquitectura`, `@centro/desarrollo` y `@centro/calidad`). Los tests de C y D ya están escritos y revisados en `material/`. Repasa antes los temas 1 a 4 de la unidad.

## Entorno de trabajo

Abre la carpeta en su **Dev Container**, con OpenCode. Conecta OpenCode a un proveedor con `/connect`. Los *worktrees* (`../tareas-C`, `../tareas-D`) viven dentro del contenedor: lo que cuenta es lo que queda en los commits. Si la carpeta no es todavía un repositorio de Git, créalo con `git init && git add . && git commit -m "Proyecto de partida"`. Escribe tus respuestas en el `README.md`. En un equipo real, cada fusión a `main` pasaría por una *pull request*; aquí se hace en local.

## Requisitos

**Fase 1. Gobierno (criterio c)**

1. Escribe `.github/CODEOWNERS` y la plantilla `.github/PULL_REQUEST_TEMPLATE/spec.md` (como en el tema 2). En «Gobierno», una tabla con quién aprueba cada punto de control de la feature C. Commit en `main`: `Gobierno: CODEOWNERS y plantilla de PR de las specs`.

**Fase 2. Agentes y paralelismo (criterios a y b)**

2. Comprueba con `opencode debug agents | node herramientas/permisos.mjs implementador` los permisos del `implementador` y pega la salida en «Seguridad». Responde: ¿por qué tiene `subagent` en `deny`? ¿Qué podría hacer si pudiera editar `tests/`? ¿Qué dos agentes del proyecto no pueden editar código?
3. Crea las ramas con *worktrees*: `git worktree add ../tareas-C -b feature/C-marcar-hecha` y el equivalente para D. En cada una, `/planificar C-marcar-hecha` (o `D-borrar-tarea`) con el `arquitecto`; revisa, deja el plan y las tasks en `Borrador` y haz un commit (`Plan de la feature C (borrador; arquitecto)` y su equivalente para D). En «Comparación de los planes»: la tabla de ficheros de los dos planes con dónde chocan y las decisiones que toman los dos por su cuenta.
4. En «Orden y replanificación» decide qué feature va primero y por qué, y qué se hace en paralelo. En «*Handoffs*» escribe el *handoff* del `arquitecto` al `implementador` para el grupo 3 de C (objetivo, documentos, estado, límites y qué devolver).

**Fase 3. Las features (criterio d)**

5. **Feature C.** Aprueba su plan (`Plan de la feature C (aprobado)`), copia sus tests de `material/tests-C/` a `tests/` (`Tests de la feature C (revisados)`) y comprueba que fallan. Implementa por grupos con `/implementar` (un commit por grupo: `Feature C, grupo 2: …` y `Feature C, grupo 3: …`), pon la spec y el índice en `✅ Implementada` y fusiona con `git merge --no-ff` en `main`: `Fusiona la feature C: marcar una tarea como hecha`.
6. **Feature D.** En su rama, `git merge main` y **replanifica** con el `arquitecto`: el plan y las tasks de D reutilizan `ErrorNoEncontrado` y `buscarPorId` de C (`Replanificación de la feature D tras traer main con la feature C (borrador; arquitecto)`). Apruébalo (`Plan de la feature D 1.1 (aprobado)`), copia los tests de `material/tests-D/`, implementa por grupos, actualiza spec e índice y fusiona con `--no-ff`: `Fusiona la feature D: borrar una tarea`. Quita los *worktrees* (`git worktree remove`).
7. **La constitución.** Las dos features han decidido lo mismo sobre los errores. En «Constitución», escribe la descripción de la PR (las cuatro preguntas del tema 2) y añade a `constitution.md` la sección «Errores» (qué clases hay y cuál es el código de cada una, y que una feature nueva las reutiliza antes de crear otra). Commit en `main`: `Replanificación tras las features C y D: clases de error en la constitución`.

**Fase 4. Auditoría (criterio e)**

8. Ejecuta `npm run trampas`, `npm run estado` y `git log --oneline --graph`. En «Auditoría»: (a) el resultado de los dos comandos; (b) **tres antipatrones del tema 4** que tu trabajo (o el del agente) tuvo o que evitaste, cada uno con la evidencia y qué lo evitó o lo corrigió; (c) tres cambios de lo que has hecho y cuánto del código leíste de cada uno según el riesgo; (d) si cinco personas hicieran cinco features como estas a la vez, qué límites pondrías para evitar una avalancha de revisiones.
9. Completa «Sesión con el agente», «Decisiones» y «Commits».

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `main` | Con las fusiones `Fusiona la feature C…` y `Fusiona la feature D…`, y los commits de `main` de las fases 1 y 3 |
| Ramas | Ninguna sin fusionar en `main` al terminar |
| `.github/CODEOWNERS` y `.github/PULL_REQUEST_TEMPLATE/spec.md` | Como en el tema 2 |
| `docs/specs/` | C y D en `✅ Implementada`, con el índice coherente (`npm run estado`) |
| `constitution.md` | Con la sección «Errores» |
| `tests/` | Con los tests de C y D; `npm test` en verde (37 con los de la solución) |
| `material/`, `docs/prd.md` | Sin cambios |
| `README.md` | Secciones «Gobierno», «Seguridad», «Comparación de los planes», «Orden y replanificación», «*Handoffs*», «Constitución», «Auditoría», «Sesión con el agente», «Decisiones» y «Commits» |
| Historial | Un commit por paso, con los mensajes indicados, y las fusiones con `--no-ff` |

## Comprueba tu solución

- Los dos planes se hicieron desde el **mismo** `main`, y el plan de D de la rama ya no crea `ErrorNoEncontrado` ni `buscarPorId`.
- Los tests de cada feature están en un commit **anterior** al de su código y el `implementador` no los toca.
- `npm test` está en verde, `npm run estado` coherente y `npm run trampas` sin trampas.
- `git log --oneline --first-parent main` cuenta la historia en orden: gobierno, C, D, constitución.
- Tres antipatrones de la auditoría tienen evidencia real de **tu** repositorio, no genérica.
- La constitución no recoge nada de una sola feature.

## Al terminar

Cuando acabe el curso, el volumen de las credenciales se borra con `docker volume rm sdd-opencode`.
