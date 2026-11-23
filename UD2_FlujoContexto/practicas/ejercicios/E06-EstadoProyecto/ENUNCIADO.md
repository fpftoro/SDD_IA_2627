# E06 · El estado del proyecto

**Tipo:** autocorrección

Diagnostica un repositorio con el estado de las features desordenado: compara el índice, las specs, los ficheros de cada carpeta y el historial, decide el estado correcto de cada feature y déjalo coherente. Después, replanifica: cambia el orden de dos features con `git mv` sin romper ninguna referencia.

**Criterios:** OA2 d

## El caso

Es el repositorio del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)) después de unas semanas de trabajo en equipo. Varias personas han tocado specs, código e índice sin seguir siempre las reglas del tema 4, y ya nadie se fía de [`docs/specs/README.md`](./docs/specs/README.md).

Tu repositorio solo tiene `main`. El del equipo tiene además ramas: en [`material/historial.txt`](./material/historial.txt) tienes su historial y la salida de algunos comandos.

La coordinación TIC ha pedido además un cambio de orden: este trimestre hay muchas averías, así que **«Anotar una incidencia» tiene que ir antes que «Registrar la devolución»**.

## Entorno de trabajo

El ejercicio trae su Dev Container, para `npm test` y `npm run estado`. Abre en VS Code **la carpeta del ejercicio**, la que contiene `.devcontainer/`, y ejecuta **Dev Containers: Reopen in Container**. Si la carpeta no es todavía un repositorio de Git, créalo con `git init && git add . && git commit -m "Proyecto de partida"`.

No necesitas el agente.

## Requisitos

**Parte 1. Diagnóstico**

1. Ejecuta `npm run estado` y pega la salida en la sección «Antes» del README.
2. Revisa cada feature con la tabla del tema 4 (apartado 4.3.3): qué dice su spec, qué dice el índice, qué ficheros hay en su carpeta y en `src/`, si los tests pasan (`npm test`) y qué cuenta el historial. Ojo: **el script no lo detecta todo**.
3. Completa la tabla «Diagnóstico» del README con una fila por feature (A a F): qué dice la spec, qué dice el índice, qué dicen los ficheros y el historial, el estado correcto y cómo lo has sabido.
4. Completa la tabla «Ramas»: qué haces con cada rama del equipo y por qué. (No puedes hacerlo en tu repositorio: escribe el comando que usarías).

**Parte 2. Corrección**

5. Deja el estado coherente: el campo `Estado` de cada spec y el índice, con los emojis del tema 4. Recuerda que **manda la spec**, pero una spec también puede estar mal (por ejemplo, si su estado no encaja con su contenido). Resuelve también cualquier fichero que no deba estar en una carpeta de feature, con `git mv` o `git rm` según corresponda.
6. Comprueba con `npm run estado` (sin errores) y pega la salida en «Después».
7. Commit: `Estado de las features: índice y specs coherentes`.

**Parte 3. Replanificación (tema 4, apartado 4.6)**

8. Cambia el orden: «Anotar una incidencia» pasa a ser la **D** y «Registrar la devolución», la **E**. Renombra las carpetas con `git mv`, reordena el índice y **revisa las referencias** a las carpetas y a las letras en otros documentos.
9. Comprueba que no queda ninguna ruta vieja (`grep -rn "D-registrar\|E-anotar" docs/` no muestra nada), que cada mención a «feature D» y «feature E» que queda (`grep -rn "feature [DE]" docs/`) se refiere a la feature correcta y que `npm run estado` sigue sin errores.
10. Commit: `Replanificación tras la feature C: incidencias antes que devoluciones`. Completa «Commits» y haz un último commit con el README.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `docs/specs/README.md` | El índice coherente, con las features en el orden nuevo |
| `docs/specs/<letra>-<nombre>/spec.md` | Una sola spec por carpeta, con el estado correcto |
| Carpetas de D y E | `D-anotar-incidencia/` y `E-registrar-devolucion/`, renombradas con `git mv` |
| `src/`, `tests/`, `material/` | Sin cambios |
| `README.md` | Secciones «Antes», «Diagnóstico», «Ramas», «Después», «Referencias» y «Commits», con las tablas de la plantilla |
| Historial | Los commits de las partes 2 y 3, en ese orden, y `git log --follow` conserva la historia de las carpetas renombradas |

## Comprueba tu solución

- `npm run estado` termina sin errores, pero eso no basta: repasa la tabla del apartado 4.3.3 con cada feature. Una feature con código fusionado y tasks marcadas no puede estar `Aprobada`.
- Una spec con `[NECESITA ACLARACIÓN]` no puede estar `En revisión` ni `Aprobada`.
- En `main` se ve lo **terminado**. Una feature con una rama sin fusionar no está implementada, aunque su rama vaya avanzada.
- Cada carpeta tiene un solo `spec.md`. Si había dos versiones, el historial dice cuál se aprobó.
- `git log --follow --oneline -- docs/specs/D-anotar-incidencia/spec.md` muestra también los commits de antes del cambio de nombre.
- Las referencias a las carpetas y a las letras de las features apuntan a los nombres nuevos.

## Al terminar

Cuando acabes la práctica, **borra su contenedor**: cierra la ventana de VS Code del ejercicio y, en una terminal de tu equipo, ejecuta:

```bash
docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
```
