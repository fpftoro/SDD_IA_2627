# E07 · El contexto justo

**Tipo:** autocorrección

Diagnostica problemas de contexto en fragmentos de sesiones reales, prepara el contexto justo para cada fase de una feature y clasifica lo que el agente recuerda en los cuatro tipos de memoria. Si quieres, compruébalo con el agente.

**Criterios:** OA2 e

## El caso

Es el proyecto del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)): la feature A implementada y la spec de B aprobada.

- [`fragmentos.md`](./fragmentos.md): siete momentos de sesiones con OpenCode que salieron mal.
- Para la parte 2, imagina el proyecto más adelante: A, B y C implementadas y la spec de la **feature D, «Registrar la devolución»**, aprobada en `docs/specs/D-registrar-devolucion/spec.md`. Sus ficheros serían los de la feature C de préstamos (`src/servicios/servicio-prestamos.js`, `src/repositorios/repositorio-prestamos.js`…) y su plan, `docs/specs/C-registrar-prestamo/plan.md`.

## Entorno de trabajo

Las partes 1 a 3 son de lectura y escritura: no necesitas el Dev Container ni el agente. Escribe tus respuestas en el `README.md`.

La parte 4 es **opcional** y usa el agente: abre la carpeta en su Dev Container (**Dev Containers: Reopen in Container**), con OpenCode conectado a un proveedor.

## Requisitos

**Parte 1. Diagnóstico (tema 5, apartados 5.2 y 5.7)**

1. Para cada fragmento de `fragmentos.md`, completa la tabla «Diagnóstico» del README:
   - el **síntoma** que se ve;
   - la **causa**, con el nombre del tema 5: presupuesto de atención, perdido en el medio, degradación del contexto (*context rot*), instrucciones que se apagan, contexto de otra task, copia desactualizada, compactación…;
   - la **estrategia** que lo habría evitado (apartado 5.7);
   - **qué cambias** para que no vuelva a pasar: en qué fichero escribes qué (o qué haces distinto en la siguiente sesión).

**Parte 2. El contexto de cada fase (apartados 5.4 y 5.6)**

2. Completa la tabla «Contexto por fase» para la feature D en cuatro momentos: especificar (antes de aprobarla), planificar, descomponer e implementar el ciclo 2. En cada fila: los ficheros que das con `@`, lo que **no** le das y por qué, si empiezas una sesión nueva y con qué agente.
3. Escribe en «Prompt de planificar» el prompt completo para planificar D con el contexto justo. Tiene que nombrar los ficheros con `@`, usar un ejemplo en lugar de una descripción (apartado 5.6.4), encargar al subagente *explore* una búsqueda que no quieras en tu ventana y terminar con las reglas más importantes.

**Parte 3. Tipos de memoria (apartado 5.5)**

4. Clasifica en la tabla «Memoria» cada elemento de la lista como memoria de **trabajo**, **procedimental**, **semántica** o **episódica**, y di **cuándo entra** en la ventana:
   1. La lista de comandos de `AGENTS.md`.
   2. La constitución.
   3. La spec aprobada de la feature D, mientras se planifica.
   4. El plan de la feature C, usado como ejemplo para planificar D.
   5. La salida de `npm test` de hace cinco minutos.
   6. `tests/servicio-portatiles.test.js`, señalado como ejemplo de estilo.
   7. El PRD.
   8. La propuesta del agente que rechazaste hace diez minutos.
   9. Las prohibiciones de `AGENTS.md`.
   10. `git log --oneline -- docs/specs/C-registrar-prestamo/`, que te enseña cómo se resolvió el hueco de C.

**Parte 4 (opcional). Misma sesión o sesión nueva**

5. Crea la rama `prueba-contexto` y la carpeta `sesiones/`. En **una sola sesión** con el agente *plan*, pídele primero que te explique el código de la feature A, después que proponga dos mejoras para A (rechaza una) y, por último, que planifique la feature B. Exporta la sesión como `sesiones/misma-sesion.md`.
6. Empieza una **sesión nueva** y planifica B con un prompt de contexto justo, como el de la parte 2 pero para B. Exporta como `sesiones/sesion-nueva.md`.
7. Compara los dos planes en «Comparación»: tamaño, si reutilizan el middleware `usuario-actual`, si arrastran algo de la conversación anterior (como la mejora rechazada) y cuál aprobarías. No hace falta guardar ningún plan.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `fragmentos.md`, `src/`, `tests/`, `docs/` | Sin cambios |
| `README.md` | Secciones «Diagnóstico», «Contexto por fase», «Prompt de planificar» y «Memoria», con las tablas de la plantilla; «Comparación», si haces la parte 4 |
| Valores de la columna «Tipo» | `trabajo`, `procedimental`, `semántica` o `episódica` |
| `sesiones/` | Solo si haces la parte 4: `misma-sesion.md` y `sesion-nueva.md`, en la rama `prueba-contexto` |

## Comprueba tu solución

- En la parte 1, la estrategia no es «decirle al agente que tenga cuidado». Casi siempre es una sesión nueva, un `/undo`, una referencia con `@` o escribir algo en un fichero.
- Si una decisión solo estaba en la conversación, la respuesta incluye en qué documento se escribe (spec, plan, `tasks.md`, `AGENTS.md`).
- En la parte 2, ninguna fase recibe «todo el proyecto», y el historial de la fase anterior no aparece en ninguna.
- La fase de especificar no lee el código. La de implementar no lee las tasks de otros ciclos.
- Tu prompt de planificar termina con las reglas, no empieza con ellas.
- En la parte 3, lo que desaparece al cerrar la sesión es memoria de trabajo. Lo que dice «cómo se hacen las cosas aquí», procedimental; «qué es verdad», semántica; «cómo se hizo antes», episódica.

## Al terminar

Si has hecho la parte 4, **borra su contenedor**: cierra la ventana de VS Code del ejercicio y, en una terminal de tu equipo, ejecuta:

```bash
docker rm -f $(docker ps -aq --filter label=devcontainer.local_folder)
```
