# E06 · Un cambio con delta de OpenSpec

**Tipo:** autocorrección, con agente

El módulo de avisos del ejercicio anterior ya tiene su spec y sus tests de caracterización. Ahora hay que cambiarlo: primero **refactorizarlo** con los tests intactos y después **especificar y hacer el cambio** que pidió producto con una **delta de OpenSpec**, en un ciclo distinto.

**Criterios:** OA4 d

## El caso

Partes del resultado del ejercicio anterior: `src/avisos.js` (el módulo heredado), sus 14 tests de caracterización (`CAR-01` a `CAR-14`) y la spec de la feature G en la versión 1.0. Producto ha decidido corregir los cuatro fallos conocidos (FC-01 a FC-04 de la spec; son las respuestas de la coordinación TIC del ejercicio anterior):

- Los avisos salen **del más antiguo al más reciente**; a igual antigüedad, por profesor sin distinguir mayúsculas; y a igualdad total, en el orden en que llegaron los préstamos.
- Un préstamo sin profesor dice «con un profesor desconocido».
- Una fecha de salida inválida en un préstamo no devuelto lanza un error que dice qué préstamo es, y una fecha de «hoy» inválida también lanza un error. Un préstamo devuelto no se valida.

La spec vigente del módulo, en el formato de OpenSpec, está en `openspec/specs/avisos-devolucion/spec.md`. Repasa antes los apartados 3.4 y 3.5 del tema 3 de la unidad.

## Entorno de trabajo

Abre la carpeta en su **Dev Container**, con OpenCode y **OpenSpec 1.16** (`openspec --version`). Conecta OpenCode a un proveedor con `/connect` para la refactorización. Si la carpeta no es todavía un repositorio de Git, créalo con `git init && git add . && git commit -m "Proyecto de partida"`. Escribe tus respuestas en el `README.md`.

## Requisitos

**Fase 1. OpenSpec y la rama**

1. Comprueba que `npm test` da 14 tests en verde y crea la rama del cambio: `git switch -c cambio/avisos-ordenados-y-robustos`.
2. Ejecuta `openspec init --tools opencode --language es`. Con `git status`, mira qué crea y anota en «Qué instala OpenSpec» para qué sirve cada cosa. `openspec list --specs` debe mostrar la capacidad `avisos-devolucion`. Commit: `OpenSpec en el proyecto`.

**Fase 2. Refactorizar, sin cambiar nada**

3. En una **sesión nueva** de OpenCode con el agente `implementador` (que solo puede editar `src/`), pídele que reorganice el módulo en capas: la selección y el orden de los avisos en `src/servicios/servicio-avisos.js`, el cálculo de días en `src/utilidades/dias.js` y la redacción en `src/avisos.js`, que sigue exportando `generarAvisos`. Dile expresamente que los tests no se tocan y que el orden raro actual se **conserva**.
4. Comprueba: `npm test` sigue en 14 en verde y `git diff --stat main -- tests` no muestra nada. Rellena «Refactorización» y «Sesión con el agente». Commit: `Refactorización de los avisos: capas, sin cambiar el comportamiento`.

**Fase 3. Especificar el cambio con una delta**

5. Crea el cambio con `openspec new change avisos-ordenados-y-robustos` y escribe a mano sus cuatro artefactos en `openspec/changes/avisos-ordenados-y-robustos/`: `proposal.md`, `design.md`, `tasks.md` y la delta en `specs/avisos-devolucion/spec.md`. La delta debe **modificar** el requisito del orden (copiándolo completo) y **añadir** los requisitos de profesor desconocido y de fechas inválidas, cada uno con escenarios `WHEN` y `THEN`.
6. Comprueba con `openspec validate avisos-ordenados-y-robustos --strict`. Si falla, lee el mensaje: dice qué le falta a la delta. En «La delta» explica qué hace cada sección de la delta y qué te enseñó el error de validación, si lo hubo. Commit: `Cambio avisos-ordenados-y-robustos: propuesta (aprobada)`.

**Fase 4. Tests, implementación y spec**

7. Los tests de los fallos (`CAR-09` a `CAR-14`) ya no describen lo que se quiere: **retíralos** de la caracterización (los demás no se tocan) y escribe `tests/avisos.cambio.test.js` con los tests de la delta (`CAMBIO-nn`), con los valores exactos de la delta. Comprueba que fallan (rojo) y rellena la tabla «Tests». Commit: `Tests del cambio avisos-ordenados-y-robustos: sustituyen a los de los fallos`.
8. Implementa el cambio (a mano o con el agente) hasta que todo pase. Los errores usan una clase `ErrorValidacion` en `src/errores/error-validacion.js`. Marca las tasks del cambio, sube la spec de `docs/specs/G-avisos-devolucion/spec.md` a la versión 1.1 (los fallos pasan a «corregidos») y comprueba `npm run estado`. Commit: `Cambio avisos-ordenados-y-robustos: implementación`.

**Fase 5. Archivar y fusionar**

9. Archiva con `openspec archive avisos-ordenados-y-robustos -y` y comprueba que `openspec/specs/avisos-devolucion/spec.md` tiene los requisitos nuevos, que el cambio está en `openspec/changes/archive/` con la fecha delante y que `openspec validate --all --strict` y `npm test` siguen en verde. Commit: `Cambio avisos-ordenados-y-robustos: archivado`.
10. Fusiona en `main` con `git merge --no-ff cambio/avisos-ordenados-y-robustos -m "Fusiona el cambio avisos-ordenados-y-robustos"`, borra la rama y completa «Refactorizar y cambiar por separado» y «Commits».

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `main` | Con el cambio fusionado: `Fusiona el cambio avisos-ordenados-y-robustos` |
| `src/avisos.js` | Exporta `generarAvisos`; la lógica está repartida en `src/servicios/servicio-avisos.js` y `src/utilidades/dias.js` |
| `tests/avisos.caracterizacion.test.js` | Con los 8 tests `CAR-01` a `CAR-08` sin modificar |
| `tests/avisos.cambio.test.js` | Con los tests del cambio, en verde |
| `openspec/specs/avisos-devolucion/spec.md` | La spec vigente con los requisitos nuevos |
| `openspec/changes/archive/<fecha>-avisos-ordenados-y-robustos/` | El cambio archivado: `proposal.md`, `design.md`, `tasks.md` (todas marcadas) y la delta |
| `docs/specs/G-avisos-devolucion/spec.md` | Versión 1.1, con los fallos corregidos |
| `README.md` | Secciones «Qué instala OpenSpec», «Refactorización», «Sesión con el agente», «La delta», «Tests», «Refactorizar y cambiar por separado» y «Commits», con las tablas de la plantilla |
| Historial | Los seis commits de las fases 1 a 5 en la rama, en ese orden, y la fusión |

## Comprueba tu solución

- `git diff --stat main -- tests` está vacío justo después de la refactorización.
- La refactorización **conserva** el orden raro actual: si lo arreglas ahí, tus tests de los fallos fallan y ya no es una refactorización.
- La delta usa `MODIFIED` para el orden (con el requisito entero y **todos** los escenarios que ya tenía, aunque cambie su contenido) y `ADDED` para lo nuevo; no repite la spec entera.
- `openspec validate --all --strict` termina sin errores.
- Los tests retirados son solo los de los fallos; `CAR-01` a `CAR-08` siguen ahí, sin cambios.
- Los tests nuevos fallaron antes de implementar (salvo alguno que ya se cumplía, y sabes cuál).
- La spec de `docs/specs/` y la de `openspec/specs/` cuentan lo mismo.

## Al terminar

Cuando acabe el curso, el volumen de las credenciales se borra con `docker volume rm sdd-opencode`.
