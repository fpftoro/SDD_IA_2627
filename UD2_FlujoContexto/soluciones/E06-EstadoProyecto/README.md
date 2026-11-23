# E06-EstadoProyecto

## El estado del proyecto

### Descripción

Solución del **Ejercicio 6** (autocorrección, sin agente). El alumno diagnostica un repositorio del préstamo de portátiles con el estado de las features desordenado (índice, specs, ficheros, historial y ramas), lo deja coherente y replanifica cambiando el orden de dos features con `git mv`.

- Enunciado y repositorio de partida: [`practicas/ejercicios/E06-EstadoProyecto`](../../practicas/ejercicios/E06-EstadoProyecto/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 6 | El estado del proyecto | Estados de la spec, índice, coherencia con los ficheros y el historial, ramas y replanificación (OA2 d) |

### Estructura

```text
E06-EstadoProyecto/
├── README.md       ← este fichero
├── rubrica.md
└── solucion/       ← el repositorio al terminar
    ├── README.md   ← respuesta modelo
    └── docs/specs/ ← índice coherente, una spec por carpeta, D y E renombradas
```

**Comprobado** con Git y `sh`: la salida de `npm run estado` antes y después, los dos commits con `git mv` (Git detecta los renombrados y `git log --follow` conserva la historia), y los 43 tests del proyecto en verde (A y C, en Docker con `node:24-alpine`). El historial de `material/historial.txt` se generó con Git: los hashes son reales.

### Incoherencias sembradas

| Feature | Incoherencia | ¿La ve el script? |
|---------|--------------|-------------------|
| A | Índice desactualizado (🔧 con la spec implementada) | Sí |
| B | Índice que da por implementada una feature con la rama sin fusionar | Sí |
| C | Spec e índice «Aprobada» con la feature fusionada, código y tasks hechas | **No** |
| D | Spec «En revisión» con marcadores: el índice («Borrador») acierta y la spec está mal | Sí (avisa, pero «manda la spec» llevaría al error) |
| E | Dos versiones de la spec en la carpeta; índice «Pendiente» | Solo la mitad (no ve `spec-v2.md`) |
| F | Spec sin fila en el índice | Sí |

Además, en las ramas: una rama en curso que **no** hay que tocar (B) y una fusionada sin borrar (C). Y en la replanificación, cuatro referencias que cambian: el índice, la dependencia de la spec de incidencias, el fuera de alcance de la de devolución y el fuera de alcance de la spec de C.

### Conceptos aprendidos

- El estado de una feature es el de su spec; el índice es una copia que se comprueba con `npm run estado`.
- El script compara spec e índice, pero no sabe si los dos están mal: la tabla del apartado 4.3.3 (ficheros de cada estado) y el historial completan el diagnóstico.
- «Manda la spec» resuelve las diferencias con el índice, no los errores de la propia spec.
- `main` muestra lo terminado: una feature en una rama abierta sigue `Aprobada` en `main`.
- Una sola spec por carpeta; las versiones las guarda Git.
- Los cambios de orden se hacen con `git mv` y obligan a revisar las referencias.

### Errores frecuentes

- Corregir solo lo que dice el script y dejar C como `Aprobada`.
- Aplicar «manda la spec» a D y poner el índice en `En revisión`.
- Marcar B como `En implementación` en `main` o, peor, proponer fusionar su rama.
- Quedarse con `spec.md` (el borrador) en E, o dejar las dos.
- Renombrar las carpetas con el explorador de ficheros (Git ve un borrado y un fichero nuevo, y se pierde `--follow`).
- Cambiar el índice y las carpetas, pero no las referencias de las specs.
- Hacer un solo commit con las tres partes.

### Otras soluciones válidas

- Poner E en `👀 En revisión` en lugar de `🔜 Aprobada`, si el alumno argumenta que una aprobación hecha creando otro fichero no es fiable y la spec debe volver a pasar el punto de control 1. Lo que no vale es dejar las dos versiones.
- Hacer el cambio de E con `git rm` y editar `spec.md` con el contenido de la versión 2, en lugar del `git mv` (se pierde la historia de `spec-v2.md`, pero queda la de `spec.md`).
- Hacer los dos `git mv` del cambio de orden pasando por un nombre temporal.
- Reescribir las referencias sin la ruta de la carpeta (por ejemplo, solo «la feature de devoluciones»), si ya no hay ninguna ruta vieja.
