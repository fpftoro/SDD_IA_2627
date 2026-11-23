# E03-DosFeaturesParalelo

## Dos features en paralelo

### Descripción

Solución del **Ejercicio 3** (autocorrección, con agente). El alumno planifica a la vez las features C y D en dos *worktrees*, compara los planes, comprueba con Git el choque que predice y decide el orden de fusión y qué replanificar.

- Enunciado y material de partida: [`practicas/ejercicios/E03-DosFeaturesParalelo`](../../practicas/ejercicios/E03-DosFeaturesParalelo/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 3 | Dos features en paralelo | *Worktrees*, comparar planes, orden de fusión y replanificación (OA4 a, b) |

### Estructura

```text
E03-DosFeaturesParalelo/
├── README.md         ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md     ← respuesta modelo, con las salidas reales de Git
    └── docs/specs/
        ├── C-registrar-prestamo/            ← plan y tasks aprobados
        └── D-registrar-devolucion/          ← plan y tasks replanificados
            └── borrador-paralelo/           ← el plan de D hecho a la vez que el de C
```

### Clave

- **C va primero**: crea el recurso `préstamo`.
- **Chocan** los ficheros que los dos crean y `repositorio-portatiles.js`; `app.js` se funde solo porque las dos líneas son idénticas.
- **D no se aprueba** hasta traer `main` y reutilizar `repositorio-prestamos` y `cambiarEstado`.
- La rama de D acaba **sin fusionar** y con un commit de fusión con `main`.

El proyecto de partida (`npm test`, 69 tests, y `npm run estado`) y el agente `arquitecto` con el comando `/planificar` se han comprobado en Docker con OpenCode 2.3.2. Los *worktrees*, los conflictos y las fusiones se han reproducido con Git en un repositorio de prueba. **Sin probar:** las sesiones con un proveedor real.

### Errores frecuentes

- **Planificar D después de fusionar C**: no hay paralelismo y no se ve el choque. Los dos planes tienen que partir del mismo `main`.
- **Una tabla de ficheros sin los tests**: los dos chocan en `tests/servicio-prestamos.test.js`.
- **Pensar que `app.js` choca (o que nunca choca).** Se funde solo porque el cambio es idéntico; con otra redacción habría conflicto.
- **Aprobar el plan de D «porque está bien hecho»**: está bien hecho para una versión de `main` que ya no existe.
- **Arreglar el choque resolviendo conflictos** en lugar de replanificar: se pierde el motivo y queda código duplicado.
- **Fusionar D sin `--no-ff`**, o fusionar la rama de D en `main` al terminar.
- **Dejar las ramas `prueba-…`** en el repositorio.
- **Cambiar la spec** para que los planes coincidan.

### Otras soluciones válidas

- D primero, si se razona que D «solo marca un estado» y se acepta que D cree el repositorio (C se replanificaría): es menos natural, porque no hay devolución sin préstamo, pero cumple la rúbrica si el razonamiento es coherente.
- Un plan de C con `id` generado por el servicio en lugar de por el repositorio, mientras D lo reutilice igual.
- Nombres distintos de funciones (`marcarComoPrestado`, etc.): lo que importa es que D no cree otra.
- Comprobar el choque con ramas `prueba-…` distintas o con `git merge-tree`, si se pega la salida.
- Fusionar el plan de C con un mensaje distinto, siempre con `--no-ff`.
