# E09-FeatureDGatesVerde

## Feature D con los gates en verde

### Descripción

Solución del **Ejercicio 8** (integrador, con agente). Sobre la lista de tareas al final del tema 3, el alumno valida B con el revisor y su propia matriz, diagnostica cuatro incidencias, corrige con el flujo el *drift* sembrado en B, implementa la feature D con los tests primero (también las pruebas de la página), añade un gate de marcadores al workflow y fusiona todo con la integración continua en verde.

- Enunciado y material de partida: [`practicas/ejercicios/E09-FeatureDGatesVerde`](../../practicas/ejercicios/E09-FeatureDGatesVerde/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 8 | Feature D con los gates en verde (integrador) | Validación y *spec drift*, pruebas desde la spec, *quality gates* en CI y diagnóstico de fallos (OA3 a, b, c, d) |

### Estructura

```text
E09-FeatureDGatesVerde/
├── README.md                    ← este fichero
├── rubrica.md
└── solucion/                    ← solo los ficheros que cambian respecto al material
    ├── README.md                ← un ejemplo comentado
    ├── src/, public/            ← corrección de B y código de D
    ├── tests/, e2e/             ← tests de D, el de B corregido y las aserciones ajustadas
    ├── playwright.config.js     ← workers: 1
    ├── herramientas/comprobar-marcadores.sh
    ├── .github/workflows/calidad.yml
    └── docs/specs/              ← índice y la carpeta de D con plan y tasks
```

Comprobado en Docker: el material de partida, en verde (29 tests, 3 pruebas de Playwright, lint, cobertura, trazabilidad, estado y `actionlint`), con el *drift* invisible para los gates. Con los tests de la solución y el código de partida, en rojo por el motivo correcto (404 en lugar de 204, `borrar is not a function`, no hay botón «Borrar», el mensaje de B-EC-02). Con la solución completa: lint, 34 tests, cobertura del 98 % y 94 %, 5 pruebas de Playwright, trazabilidad, estado y el gate de marcadores (que falla con un marcador de prueba), y `actionlint` y `shellcheck` sin avisos.

### Lo sembrado

| Qué | Dónde | Diagnóstico |
|-----|-------|-------------|
| Mensaje de B-EC-02 cambiado en el código **y en su test** (commit `a91f3c2` de `historial.txt`) | `src/controladores/controlador-tareas.js:21`, `tests/api-tareas.test.js:137` | Error de implementación por un cambio que no llegó a la spec; el test comprueba el código |
| Incidencia 1 | El mismo fallo, visto por un usuario | Error de implementación → se corrige ahora |
| Incidencia 2 | Tareas hechas al final | Petición nueva (B deja fuera ordenar de otra forma; C no existe aún) → índice |
| Incidencia 3 | 141 banderas | Spec ambigua (RNF-02 de A: «caracteres»; cada bandera son 4 unidades de UTF-16) → aclarar la spec de A |
| Incidencia 4 | El campo no se vacía | Hueco en la spec de A (nadie decidió qué pasa con el campo tras añadir) → versión nueva de A |
| El botón «Borrar» | Cambia el texto de cada elemento de la lista | Las aserciones exactas de las pruebas de A y B fallarían: hay que ajustarlas en el commit de los tests, con su motivo |
| Pruebas de Playwright que comparten servidor | `e2e/` | Si una prueba de D deja tareas, el recorrido de B (que empieza con la lista vacía) falla |

### Errores frecuentes

- No encontrar el *drift* porque «todo está en verde». Se ve comparando la aserción con la spec, en el historial o con el revisor.
- Corregir el *drift* cambiando la spec de B al mensaje del código.
- Corregir test y código en el mismo commit: el gate de tests modificados lo marca como error.
- Implementar las incidencias 2 a 4 dentro de la feature D.
- Que el implementador cambie las aserciones de A y B porque el botón las rompe: es un cambio de tests que tiene que decidir y hacer una persona, en el commit de los tests.
- Pruebas de D que dejan tareas creadas y rompen el recorrido de B según el orden de ejecución.
- Un gate de marcadores que mira todas las specs (también los borradores, que pueden tenerlos).
- Fusionar con algún *job* en rojo.

### Otras soluciones válidas

- Corregir el *drift* en la rama de la feature B (`feature/B-ver-lista`) o en una rama de corrección: lo que importa es el orden (test, código) y la fusión con la CI en verde.
- Ajustar las pruebas de la página con otra técnica que no dependa del botón (por ejemplo, localizar el texto dentro del elemento), siempre que se decida en el plan y se haga en el commit de los tests.
- Poner las pruebas de D en el mismo fichero que las de B, si el plan lo decide y no dependen del orden.
- El gate de marcadores puede ir en un *job* propio.
- Para la incidencia 4, proponer la spec 1.4 de A (el campo se vacía tras añadir) con el texto en EARS, sin implementarla, también es válido.
