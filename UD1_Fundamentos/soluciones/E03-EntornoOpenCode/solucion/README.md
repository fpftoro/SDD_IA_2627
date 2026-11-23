# Préstamo de portátiles · Entorno con OpenCode

## Proveedor y modelo

| Dato | Valor |
|------|-------|
| Versión de OpenCode | 2.3.2 |
| Proveedor | *(el que use cada alumno)* |
| Acceso | Cuenta del centro |
| Modelo | *(un modelo del proveedor con buena capacidad de razonamiento)* |

## Revisión del AGENTS.md

| Cambio | Qué | Por qué |
|--------|-----|---------|
| Quitado | «Los errores se devuelven como `{ msg: '...' }`» | Lo copió de `src/rutas/portatiles.js`, pero contradice la constitución, que manda `{ error: "mensaje" }`. Es una mala costumbre del código, no una regla |
| Quitado | La descripción de `ENUNCIADO.md` y del `README.md` como parte del proyecto | Son ficheros del ejercicio, no del préstamo de portátiles |
| Quitado | La lista de funciones de cada fichero con sus parámetros | Cambia con cada modificación del código y el agente la puede leer en el propio código; en `AGENTS.md` se quedaría vieja |
| Quitado | Las reglas de arquitectura y de la API que repetía de la constitución | Ya están en `constitution.md`, que se carga con `instructions`; repetirlas obliga a cambiarlas en dos sitios |
| Añadido | La sección «Prohibiciones» | `/init` deduce lo que ve en el código, pero no lo que el equipo no quiere que se haga |
| Añadido | Identificadores en español y JSDoc en los servicios | Están en el código, pero `/init` no lo dijo como convención |
| Añadido | Cómo arrancar en otro puerto (`PUERTO=3100 npm start`) | Lo usa `src/servidor.js` y evita conflictos de puerto en el Dev Container |
| Corregido | Todo el fichero, de inglés a español | El proyecto y el equipo trabajan en español |

## Configuración de OpenCode

| Regla | Valor | Por qué |
|-------|-------|---------|
| `"*"` | `ask` | Por defecto, cualquier comando pregunta antes de ejecutarse. Sin esta regla, *build* y también *plan* ejecutan cualquier comando sin preguntar |
| `"npm test"` | `allow` | Ejecutar los tests no cambia nada y el agente lo hace a menudo |
| `"git status"` | `allow` | Solo consulta el estado del repositorio |
| `"git diff *"` | `allow` | Solo muestra cambios; vale también sin argumentos |
| `"git log *"` | `allow` | Solo muestra el historial |
| `"rm *"` | `deny` | Borrar ficheros con la terminal está prohibido: si hace falta borrar algo, lo hago yo |

No hay ninguna regla de `edit`: *build* ya puede editar, y una regla `"edit": "allow"` le quitaría a *plan* la prohibición de editar.

## Comprobaciones

| # | Agente | Qué esperaba | Qué pasó | ¿Correcto? |
|---|--------|--------------|----------|------------|
| 1 | plan | Una lista con lo de `AGENTS.md` (comandos, convenciones, prohibiciones) y lo de la constitución (capas, formato de la API, datos, pruebas) | Recogió las dos cosas: las convenciones y prohibiciones, y las capas, el formato `{ error }` y que los préstamos no se borran | Sí |
| 2 | plan | `{ error: "mensaje" }` en español, con su código HTTP | Contestó eso y citó `constitution.md` | Sí |
| 3 | plan | Que la ruta `/:id` no cumple la constitución por devolver `{ msg: 'not found' }` | Lo encontró: el campo debería ser `error` y el mensaje, en español. No cambió nada | Sí |
| 4 | build | Ejecuta `npm test` sin preguntarme | Lo ejecutó directamente: cinco tests en verde | Sí |
| 5 | build | Me pregunta antes de ejecutar `ls -la src` | Pidió permiso; lo denegué y no lo ejecutó | Sí |
| 6 | build | Rechaza `rm -r test` sin preguntar | El comando se rechazó por la regla `rm *`; el agente no intentó otra forma de borrar | Sí |

Sesión exportada: `sesiones/comprobaciones.md` (no se incluye en la solución de referencia: cada alumno entrega la suya).

## Sesión con el agente

| Paso | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|--------|--------|-------------|-----------------------|
| 1 | build | `/init` | Un `AGENTS.md` en inglés con comandos, estructura, la lista de funciones de cada fichero, el formato de errores con `msg` y una sección sobre los ficheros del ejercicio | Lo dejé tal cual para el primer commit y lo revisé después (tabla «Revisión del AGENTS.md») |
| 2 | plan | `Compara @AGENTS.md con @constitution.md y dime si alguna regla de AGENTS.md la contradice o la repite.` | Señaló la regla del `msg` como contradicción y tres reglas repetidas (capas, JSON, rutas en español) | Quité las cuatro. Comprobé yo mismo la del `msg` en `src/rutas/portatiles.js` |
| 3 | plan | `¿Qué prohibiciones añadirías a @AGENTS.md para este proyecto?` | Propuso cinco: no añadir dependencias, no escribir claves, no tocar la constitución, no borrar tests y no hacer commits | Acepté las cuatro primeras; la de los commits la rechacé (ver «Decisiones») |

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| Regla de `/init`: errores con `{ msg }` | Rechazada | Contradice la constitución; es un fallo del código |
| Listar en `AGENTS.md` las funciones de cada fichero | Rechazada | Se queda vieja con cada cambio; el agente lee el código |
| Prohibición: no borrar ni desactivar tests | Aceptada | Es la forma más fácil de que un agente «arregle» un test que falla |
| Prohibición: no hacer commits | Rechazada | En los ejercicios con agente hago yo los commits, pero no es una regla del proyecto: en otra situación puedo pedirle que los haga |
| Prueba 3: corregir `{ msg: 'not found' }` en la ruta | Rechazada por ahora | En este ejercicio no se cambia el código. Queda anotado para cuando se especifique la consulta de portátiles |

## Commits

Ejemplo de historial (los identificadores cambian en cada repositorio):

```text
e5f6a7b Comprobaciones del entorno
c3d4e5f Configuración de OpenCode
a1b2c3d AGENTS.md revisado
9f8e7d6 AGENTS.md generado con /init
1a2b3c4 Initial commit
```
