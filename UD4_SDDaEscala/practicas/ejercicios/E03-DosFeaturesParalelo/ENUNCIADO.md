# E03 · Dos features en paralelo

**Tipo:** autocorrección, con agente

Las features C («Registrar el préstamo») y D («Registrar la devolución») están aprobadas y las van a hacer dos personas a la vez, cada una con su agente. Planifícalas en paralelo con *worktrees*, compara los planes, comprueba el choque que predices y decide el orden de fusión y qué hay que replanificar.

**Criterios:** OA4 a, b

## El caso

Partes del proyecto del préstamo de portátiles con las features A y B implementadas y las specs de C y D aprobadas (`docs/specs/README.md`). Repasa antes los apartados 1.7 (*worktrees*) y 1.8 (paralelismo) del tema 1 de la unidad. Los planes que vas a hacer no se implementan en este ejercicio: lo que importa es qué decide cada plan y en qué orden se fusionan.

## Entorno de trabajo

Abre la carpeta en su **Dev Container** (con OpenCode y Git). Conecta antes OpenCode a un proveedor de modelos con `/connect` (el volumen `sdd-opencode` guarda la conexión). Los *worktrees* son carpetas hermanas dentro del contenedor (`../prestamo-C` y `../prestamo-D`): lo que cuenta es lo que queda en los commits. Escribe tus respuestas en el `README.md`.

## Requisitos

1. **Preparar (sin commit).** Comprueba con `npm test` y `npm run estado` que el proyecto está bien. Crea las dos ramas con sus *worktrees*:
   ```bash
   git worktree add ../prestamo-C -b feature/C-registrar-prestamo
   git worktree add ../prestamo-D -b feature/D-registrar-devolucion
   ```
   Pega en el README la salida de `git worktree list`.
2. **Dos planes en paralelo.** En cada *worktree*, abre OpenCode y lanza `/planificar C-registrar-prestamo` (o `D-registrar-devolucion`). Revisa el plan y las tasks que escribe el `arquitecto`, corrige lo que haga falta, deja los dos documentos en estado `Borrador` y haz un commit en cada rama: `Plan de la feature C (borrador; arquitecto)` y el equivalente para D.
3. **Comparar.** En «Comparación de los planes»:
   - una tabla con **todos los ficheros** que cada plan crea o modifica (`Fichero | C | D | ¿Choca?`);
   - las **decisiones que toman los dos** por su cuenta (qué, en qué plan y con qué nombre);
   - la **predicción**: qué pasaría con Git si las dos features se implementaran a la vez, fichero a fichero, y qué ficheros se fusionarían sin problema.
4. **Comprobar la predicción.** En `material/` hay un borrador de cada feature (solo el acceso a datos, las rutas y `app.js`). Sin tocar `main`:
   ```bash
   git switch -c prueba-C feature/C-registrar-prestamo && cp -r material/borrador-C/. . && git add -A && git commit -m "Borrador de C para probar el choque"
   git switch -c prueba-D feature/D-registrar-devolucion && cp -r material/borrador-D/. . && git add -A && git commit -m "Borrador de D para probar el choque"
   git switch -c prueba-fusion prueba-C && git merge prueba-D
   ```
   (Haz los dos primeros comandos en la carpeta del repositorio principal, no en los *worktrees*, que ya tienen las ramas `feature/…` abiertas.) Pega la salida de `git merge` y `git status --short`, contrasta cada conflicto con tu predicción, explica por qué un fichero se fusiona sin conflicto y termina con `git merge --abort`, `git switch main` y `git branch -D` de las tres ramas de prueba.
5. **Orden y replanificación.** En «Orden y replanificación»: qué feature va primero y por qué; qué se puede hacer en paralelo y qué no; y por qué el plan de la otra **no se aprueba** hasta traer `main`. Después hazlo:
   - Aprueba el plan de la primera (cambia su estado a `Aprobado` y las tasks a `Aprobadas`) con el commit `Plan de la feature <letra> (aprobado)` y fusiónalo en `main` con `git merge --no-ff`. *(En un proyecto real implementarías la feature antes de fusionar; aquí fusionas el plan para centrarte en el orden.)*
   - En la rama de la otra, trae `main` (`git merge main`) y **replanifica**: ajusta su plan y sus tasks para reutilizar lo que la primera ha decidido (el commit termina en `(borrador; arquitecto)` si lo has hecho con el agente) y deja esa rama **sin fusionar**.
6. **Cierre.** Pega la salida de `git log --oneline --graph --all` y `git branch --no-merged main`, elimina los *worktrees* (`git worktree remove ../prestamo-C`, y el otro) y sube las ramas (`git push origin main feature/C-registrar-prestamo feature/D-registrar-devolucion`).

## Entrega con agente

En el `README.md`, además de las secciones anteriores: **«Sesión con el agente»** (una fila por paso: prompt, qué produjo, qué corregiste y por qué), **«Decisiones»** (qué propuestas del agente aceptaste o rechazaste y el motivo) y **«Commits»** (la salida de `git log --oneline --first-parent main` y la de cada rama).

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| Ramas | `main`, `feature/C-registrar-prestamo` y `feature/D-registrar-devolucion`, con estos nombres. No quedan ramas `prueba-…` |
| `docs/specs/C-registrar-prestamo/plan.md` y `tasks.md` | En `main` (tras la fusión), en estado `Aprobado` y `Aprobadas` |
| `docs/specs/D-registrar-devolucion/plan.md` y `tasks.md` | En la rama `feature/D-registrar-devolucion`, replanificados, en `Borrador`, y la rama **sin fusionar** en `main` |
| Specs y `material/` | Sin cambios |
| `README.md` | Secciones «Comparación de los planes», «La predicción», «Orden y replanificación», «Sesión con el agente», «Decisiones» y «Commits» |

## Comprueba tu solución

- Los dos planes se hicieron desde la **misma** versión de `main` (por eso chocan).
- La tabla de ficheros incluye también los **tests** y `app.js`.
- Tu predicción nombra los ficheros que chocan y distingue los que se funden solos.
- El plan de D de la rama ya no crea ficheros ni funciones que el de C ya crea.
- El plan de C se fusionó con `--no-ff` (la fusión aparece en `git log --first-parent main`).
- La rama de D aparece en `git branch --no-merged main` y contiene un commit de fusión con `main`.
- Ningún plan contiene código.
- Dices qué parte de la feature sí se puede hacer en paralelo (por ejemplo, los tests) y por qué.

## Al terminar

Si has abierto el Dev Container, ciérralo cuando termines. Cuando acabe el curso, el volumen de las credenciales se borra con `docker volume rm sdd-opencode`.
