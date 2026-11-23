# E05 · Implementar en ciclos cortos

**Tipo:** autocorrección

Implementa una feature con el agente, grupo a grupo: tests en rojo y en verde, punto de control 4 en cada ciclo, un commit por grupo y la integración continua en verde. Cuando aparezca algo que la spec no decide, para y corrígelo donde nació. Al final, comprueba la feature entera y fusiónala.

**Criterios:** OA2 c

## El caso

Es la API del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), con la feature A implementada. La **feature B, «Reservar un carro»**, tiene la spec aprobada, el plan aprobado y las tasks aprobadas en [`docs/specs/B-reservar-carro/`](./docs/specs/B-reservar-carro/): son las versiones de referencia del E03 y el E04. Toca implementarla.

En el proyecto real, el plan y las tasks estarían solo en la rama de B. Aquí los tienes también en `main` para que el repositorio de partida sirva igual a todo el mundo.

> ⚠️ **Cuidado**: la spec de B tiene un **hueco** que no vio nadie en los puntos de control 1, 2 y 3. En algún ciclo, el agente tomará una decisión que **se nota desde fuera** y que no está ni en la spec ni en el plan. Encontrarla es parte del ejercicio.

## Entorno de trabajo

El ejercicio trae su Dev Container en `.devcontainer/devcontainer.json`, con OpenCode. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/`, y ejecuta **Dev Containers: Reopen in Container**.

Necesitas tu repositorio de trabajo en **GitHub**, porque la plantilla trae la integración continua: `.github/workflows/calidad.yml` ejecuta `npm test` en cada `push` (tema 3, apartado 3.4.6). **No lo modifiques.**

Necesitas OpenCode conectado a un proveedor (UD1, tema 3). Si lo conectaste en otro ejercicio, las credenciales siguen en el volumen `sdd-opencode`.

## Requisitos

**Antes de empezar**

1. Comprueba el punto de partida: `npm test` en verde, `npm run estado` con B en `Aprobada` y la CI de `main` en verde en la pestaña **Actions**.
2. Crea la rama `feature/B-reservar-carro` y la carpeta de las sesiones (`mkdir -p sesiones`).

**Un ciclo por grupo de tasks (tema 3, apartado 3.4)**

Las tasks tienen tres grupos. Para **cada** grupo:

3. Empieza una **sesión nueva** en OpenCode con el agente **build** y pide el grupo con el prompt del tema 3 (apartado 3.4.2). Pide al agente que te enseñe la salida de los tests **en rojo** antes de implementar.
4. Haz el **punto de control 4** (apartado 3.4.4) **tú**: `git status`, `git diff` y `npm test`. Comprueba los ficheros, los tests, los identificadores, el plan, la constitución y el alcance, y pregúntate de cada cosa nueva: ¿lo notaría alguien desde fuera?, ¿lo dice la spec? Si algo falla, pide la corrección en la misma sesión y vuelve a revisar.
5. Exporta la sesión con `/export` como `sesiones/ciclo-<n>.md` (`ciclo-1.md`, `ciclo-2.md`, `ciclo-3.md`).
6. Marca las tasks del grupo en `tasks.md` y haz el commit con la convención del tema 4: `Feature B: T-01 y T-02, <qué se ha hecho>`. En el primer ciclo, la spec y el índice pasan a `En implementación`; en el último, a `Implementada` (y el mensaje termina en `(implementada)`).
7. Sube la rama (`git push`) y comprueba que la CI termina en verde antes de empezar el ciclo siguiente.

**Cuando aparezca el hueco (tema 3, apartado 3.5)**

8. **Para** el ciclo. Decide la respuesta como si fueras la coordinación TIC y escribe tu motivo. Después:
   - sube la spec a la versión `1.1` con la decisión (la spec sigue `En implementación`: es un hueco pequeño, tema 4, apartado 4.3.2);
   - actualiza el plan y las tasks si cambian;
   - asegúrate de que hay un test que comprueba la decisión;
   - todo va en el **mismo commit** que el código del ciclo.

   Anótalo en la sección «Hueco de la spec» del README.

**Cerrar la feature (tema 3, apartado 3.4.7)**

9. Haz la comprobación final de la feature entera: `git status` limpio, `npm test` en verde, `git diff --stat main...feature/B-reservar-carro` y la CI del último commit de la rama en verde. Pega la salida del `git diff --stat` en «Comprobación final».
10. Fusiona en `main` con `git merge --no-ff feature/B-reservar-carro -m "Fusiona la feature B: reservar un carro"`, borra la rama local y sube `main`. Comprueba que la CI de `main` termina en verde.
11. Completa el README (sesiones, puntos de control, decisiones y commits) y haz un último commit en `main` con él.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `main` | Con la feature B fusionada con un commit de fusión `Fusiona la feature B: reservar un carro` |
| Commits de la rama | Uno por grupo de tasks, con la convención del tema 4 |
| `docs/specs/B-reservar-carro/spec.md` | Versión `1.1` con la decisión del hueco, estado `Implementada` |
| `docs/specs/B-reservar-carro/tasks.md` | Todas las tasks marcadas `[x]` |
| `docs/specs/README.md` | B en `✅ Implementada` (`npm run estado` sin errores) |
| `src/` y `tests/` | El código y los tests de B, con los identificadores de la spec en el nombre de cada test; `npm test` en verde |
| Tests de la feature A y `.github/workflows/calidad.yml` | Sin cambios |
| `sesiones/ciclo-1.md` … `ciclo-3.md` | Las exportaciones de las sesiones |
| `README.md` | Secciones «Sesión con el agente», «Puntos de control», «Hueco de la spec», «Decisiones», «Comprobación final» y «Commits», con las tablas de la plantilla |

## Comprueba tu solución

- `git log --oneline --graph` muestra la rama de B con sus commits de ciclo y un commit de fusión en `main`.
- Cada commit de ciclo tiene primero los tests y después el código: en las sesiones exportadas se ve el rojo antes del verde.
- Ningún test de la feature A ha cambiado: `git log --oneline -- tests/api-portatiles.test.js tests/servicio-portatiles.test.js` solo muestra el commit del proyecto de partida.
- La decisión del hueco está en la spec 1.1, tiene su test y llegó en el mismo commit que el código.
- Cada identificador de la spec aparece en el nombre de al menos un test (`grep -o "EC-[0-9]*" tests/*reservas*.test.js | sort -u`).
- `npm run estado` termina sin errores y la CI de `main` está en verde.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**: cierra la ventana de VS Code del ejercicio y, en una terminal de tu equipo, ejecuta:

```bash
docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
```
