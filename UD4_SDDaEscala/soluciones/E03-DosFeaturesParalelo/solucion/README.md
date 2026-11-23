# Dos features en paralelo

> Solución de referencia. Las sesiones con el agente no son deterministas: los planes del alumno serán distintos. Esta solución fija los planes que se usan para comprobar el ejercicio y los resultados de Git, que sí son reproducibles.

## Preparación

```text
/workspaces/prestamo-portatiles   8c67118 [main]
/workspaces/prestamo-C            8c67118 [feature/C-registrar-prestamo]
/workspaces/prestamo-D            8c67118 [feature/D-registrar-devolucion]
```

## Comparación de los planes

### Ficheros

| Fichero | C | D | ¿Choca? |
|---------|---|---|---------|
| `src/repositorios/repositorio-prestamos.js` | Nuevo | Nuevo | **Sí**: los dos lo crean (agregar/agregar) |
| `src/repositorios/repositorio-portatiles.js` | Modificado (`cambiarEstado`) | Modificado (`marcarDisponible`) | **Sí**: los dos añaden una función en el mismo sitio |
| `src/servicios/servicio-prestamos.js` | Nuevo | Nuevo | **Sí** |
| `src/controladores/controlador-prestamos.js` | Nuevo | Nuevo | **Sí** |
| `src/rutas/prestamos.js` | Nuevo | Nuevo | **Sí** |
| `src/app.js` | Modificado (monta `/api/prestamos`) | Modificado (la misma línea) | No, si las dos líneas son idénticas |
| `tests/servicio-prestamos.test.js` | Nuevo | Nuevo | **Sí** |
| `tests/api-prestamos.test.js` | Nuevo | — | No |
| `tests/api-devolucion.test.js` | — | Nuevo | No |

### Decisiones que toman los dos

| Qué se decide | En el plan de C | En el plan de D |
|---------------|-----------------|-----------------|
| Un repositorio de préstamos en memoria | D-03: `guardar` asigna un id numérico creciente | D-03: `guardar` recibe el id (un `Map`); además `marcarDevuelto` |
| Cómo cambiar el estado de un portátil | D-04: `cambiarEstado(id, estado)` | D-04: `marcarDisponible(id)` |
| Un servicio de préstamos | `registrarPrestamo` en `servicio-prestamos.js` | `registrarDevolucion` en el mismo fichero |
| Montar `/api/prestamos` | D-01 | D-01 |

Hay además una diferencia que Git no ve: en C el **repositorio** pone el id y en D lo pone **quien guarda**. Aunque Git fundiera los ficheros, el resultado sería inconsistente.

## La predicción

Si se implementaran a la vez, chocarían todos los ficheros que los dos crean (`repositorio-prestamos.js`, `servicio-prestamos.js`, `controlador-prestamos.js`, `rutas/prestamos.js` y `tests/servicio-prestamos.test.js`) y `repositorio-portatiles.js`, donde los dos añaden una función distinta en el mismo sitio. `app.js` se fusionaría solo si las dos líneas añadidas son idénticas, y los tests propios de cada feature no chocan.

Con los borradores de `material/`:

```text
$ git merge prueba-D
Auto-fusionando src/repositorios/repositorio-portatiles.js
CONFLICTO (contenido): Conflicto de fusión en src/repositorios/repositorio-portatiles.js
Auto-fusionando src/repositorios/repositorio-prestamos.js
CONFLICTO (agregar/agregar): Conflicto de fusión en src/repositorios/repositorio-prestamos.js
Auto-fusionando src/rutas/prestamos.js
CONFLICTO (agregar/agregar): Conflicto de fusión en src/rutas/prestamos.js
Fusión automática falló; arregle los conflictos y luego realice un commit con el resultado.

$ git status --short
A  docs/specs/D-registrar-devolucion/plan.md
A  docs/specs/D-registrar-devolucion/tasks.md
UU src/repositorios/repositorio-portatiles.js
AA src/repositorios/repositorio-prestamos.js
AA src/rutas/prestamos.js
```

- **Contraste con la predicción:** los tres conflictos son los de la predicción (el borrador solo tiene acceso a datos y rutas; el servicio, el controlador y los tests chocarían igual al implementarlos). Los planes (`docs/specs/…`) entran sin problema porque cada uno está en su carpeta.
- **Por qué un fichero se funde sin conflicto:** `src/app.js` no aparece. Los dos borradores añaden exactamente las mismas líneas en el mismo sitio y Git acepta un cambio idéntico en las dos ramas. Si los dos hubieran escrito la línea de otra forma, habría conflicto; esa fusión limpia es **casualidad**, no diseño.

## Orden y replanificación

- **Va primero:** C. Crea el recurso `préstamo` que D necesita para existir: no se puede devolver lo que nadie ha prestado.
- **Qué se puede hacer en paralelo y qué no:** en paralelo, los **planes** (ya está hecho) y los tests de D, que solo dependen de la forma del préstamo que fija su spec. No en paralelo la **implementación**: las dos crean el mismo repositorio, el mismo servicio y la misma ruta.
- **Por qué el plan de D no se aprueba antes de traer `main`:** un plan aprobado da por buenas sus decisiones. Si se aprobara el de D tal cual, se implementaría un segundo repositorio de préstamos y un `marcarDisponible` que C ya cubre con `cambiarEstado`. D trae `main` y su plan se rehace sobre lo que C ha decidido.
- **Qué cambia en el plan y en las tasks de D:** D-03 y D-04 pasan a **reutilizar** `repositorio-prestamos` y `cambiarEstado` de C; el repositorio y el servicio pasan de «Nuevo» a «Modificado»; T-02 solo añade `marcarDevuelto`; las tasks ya no tocan `app.js` ni `repositorio-portatiles.js`. El resultado está en [`docs/specs/D-registrar-devolucion/plan.md`](./docs/specs/D-registrar-devolucion/plan.md) (el plan hecho en paralelo, en `borrador-paralelo/`).

## Sesión con el agente

| Paso | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|--------|--------|-------------|-----------------------|
| 1 | `arquitecto` (C) | `/planificar C-registrar-prestamo` | Plan y tasks de C en `Borrador` | Reutilizar los errores existentes; fijar que el repositorio asigna el id |
| 2 | `arquitecto` (D) | `/planificar D-registrar-devolucion` | Plan y tasks de D en `Borrador`, con su propio repositorio de préstamos | Nada: es lo que el ejercicio quiere ver chocar |
| 3 | `arquitecto` (D, replanificar) | «Trae main con el plan de C y reescribe el plan y las tasks de D para reutilizar lo que C decide» | Plan y tasks de D 1.1 | Quitar `marcarDisponible` y los ficheros que ya crea C |

(Ejemplo de cómo rellenarlo: la sesión real depende del modelo.)

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| C: `repositorioPortatiles.cambiarEstado(id, estado)` | Aceptada | Sirve también para la devolución |
| D: `marcarDisponible(id)` | Rechazada en la replanificación | Duplica la función de C |
| D: repositorio de préstamos propio | Rechazada en la replanificación | Lo crea C; D lo amplía |

## Cierre

```text
$ git log --oneline --graph --all
* b424fec Replanificación de la feature D tras traer main con la feature C (borrador; arquitecto)
*   1c909a1 Trae main con el plan de la feature C
|\
| *   0964f64 Fusiona el plan de la feature C
| |\
| | * 040ecae Plan de la feature C (aprobado)
| | * 16b189e Plan de la feature C (borrador; arquitecto)
| |/
* / 1ee7766 Plan de la feature D (borrador; arquitecto)
|/
* 8c67118 Proyecto de partida

$ git branch --no-merged main
  feature/D-registrar-devolucion
```

## Commits

```text
$ git log --oneline --first-parent main
0964f64 Fusiona el plan de la feature C
8c67118 Proyecto de partida
```
