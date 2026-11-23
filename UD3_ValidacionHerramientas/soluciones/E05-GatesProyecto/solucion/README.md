# Los gates del proyecto

## Lint

```text
$ npm run lint

> prestamo-portatiles@0.1.0 lint
> eslint .

$
```

Con un controlador que importa el repositorio (el del material):

```text
src/controladores/controlador-portatiles.js
  3:1  error  '../repositorios/repositorio-portatiles.js' import is restricted from
  being used by a pattern. Un controlador no accede a los repositorios. Las capas
  son rutas → controladores → servicios → repositorios (constitución)
  no-restricted-imports

✖ 1 problem (1 error, 0 warnings)
```

## Cobertura

```text
      Tests  22 passed (22)
File               | % Stmts | % Branch | % Funcs | % Lines |
All files          |     100 |      100 |     100 |     100 |
```

Umbral: 90 % de líneas y 80 % de ramas. La cobertura actual es del 100 %, pero un umbral del 100 % bloquearía cualquier línea difícil de probar (por ejemplo, un manejador de errores de Express); con este margen, una caída importante se nota y no se escriben tests sin valor para cubrir la última línea. Escrito en la sección «Calidad» de la constitución.

## Trazabilidad

```text
$ npm run trazabilidad
✅ Trazabilidad: ningún identificador sin test ni comprobación a mano
$ npm run estado
✅ A-consultar-portatiles: Implementada
```

## Integración continua

Ejecución en verde: (enlace a la ejecución de `main` en la pestaña Actions)

| Job | Qué comprueba | Resultado |
|-----|---------------|-----------|
| Lint y arquitectura | Errores de código y las capas de la constitución | ✅ |
| Tests y cobertura | Los 22 tests y el umbral | ✅ |
| Trazabilidad y estado | Identificadores sin test e índice coherente | ✅ |
| Spec existente | No se ejecuta en `main` | — |

## Una ejecución en rojo

Ejecución en rojo: (enlace a la ejecución de `prueba-gates`)

| Job | Resultado | Línea del registro |
|-----|-----------|--------------------|
| Lint y arquitectura | ❌ | `3:1 error '../repositorios/repositorio-portatiles.js' import is restricted … Un controlador no accede a los repositorios` |
| Tests y cobertura | ✅ | `Tests 22 passed (22)` |
| Trazabilidad y estado | ✅ | `✅ Trazabilidad: …` |
| Spec existente | ❌ | `❌ Spec: la rama cambia src/ o public/ sin cambiar ninguna spec, plan o tasks de docs/specs/` |

## Lo que no detectan

Cambiar a la vez, en un commit, el mensaje de EC-02 en el controlador (`Portátil no encontrado`) y en su test. Los tests pasan, el lint no ve mensajes, la trazabilidad solo mira nombres y la spec existente pasa si el mismo commit toca cualquier documento de la feature. Lo detectaría una persona que compare la aserción con la spec (la matriz del tema 1), el revisor y, en una rama, el gate de tests modificados del tema 3, que avisa de un commit que cambia un test existente junto con el código.

## Commits

```text
* Prueba de los gates: controlador con una violación de capas   (prueba-gates)
* Calidad: gates de trazabilidad y estado e integración continua (main)
* Calidad: ESLint con las capas y cobertura con umbral
* (commit inicial de la plantilla)
```
