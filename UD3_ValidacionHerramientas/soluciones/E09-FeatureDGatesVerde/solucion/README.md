# Feature D con los gates en verde

Ejemplo comentado. Tu sesión no será igual.

## Validación de B

| Spec | Test | ¿Comprueba lo que dice? |
|------|------|-------------------------|
| B-RF-01, B-AC-03 | `api-tareas` › `B-RF-01, B-AC-03…` | Sí: compara con las tareas creadas, en su orden |
| B-RF-02, B-AC-01 | `lista-tareas.e2e.js` › paso `B-RF-02, B-AC-01` | Sí: textos en orden tras recargar |
| B-RF-03, B-AC-02 | paso `B-RF-03, B-AC-02` | Sí: mensaje visible y ningún elemento |
| B-AC-04 | paso `B-AC-04` | Sí |
| B-RNF-01 | `api-tareas` › `B-RNF-01…` | Sí: 1.000 tareas |
| B-EC-01 | `api-tareas` › `B-EC-01…` | Sí |
| B-EC-02 | `api-tareas` › `B-EC-02…` | **No**: espera `No se pudieron cargar las tareas`; la spec dice `Error al obtener las tareas` |
| B-EC-03, B-EC-04 | `lista-tareas.e2e.js` | Sí, con la respuesta simulada |

| Hallazgo del revisor | Decisión | Motivo |
|----------------------|----------|--------|
| B-EC-02: el controlador y el test usan un mensaje distinto del de la spec | Aceptado | Reproducido; el commit `a91f3c2` cambió los dos a la vez |
| La página debería paginar la lista con muchas tareas | Rechazado | Fuera de alcance en la spec de B |

## Incidencias

| Incidencia | Diagnóstico | Dónde se corrige | Primer paso | Qué has hecho |
|------------|-------------|------------------|-------------|---------------|
| 1 | Error de implementación (el test comprueba el código) | Test y código de B | Test de B-EC-02 con el mensaje de la spec, en rojo | Corregido (rama `correccion/B-mensaje-error`) |
| 2 | Petición nueva | Índice de features | Anotarla para replanificar | Anotada en el índice como idea para después de C |
| 3 | Spec ambigua (RNF-02 de A) | Spec de A | Decidir cómo se cuentan los caracteres | Anotada como duda para la próxima replanificación |
| 4 | Hueco en la spec de A | Spec de A (versión nueva) | Decidir si el campo se vacía | Anotada; propuesta: «Cuando el sistema confirme la creación de una tarea, la página deberá vaciar el campo de texto» |

## Corrección de B

```text
git switch -c correccion/B-mensaje-error
# test de B-EC-02 con el mensaje de la spec
npm test
 × B-EC-02: responde 500 si no se pueden obtener las tareas
git commit -am "Tests de B: EC-02 con el mensaje de la spec"
# controlador con el mensaje de la spec
npm test   # 29 en verde
git commit -am "Feature B: EC-02 con el mensaje de la spec"
git push -u origin correccion/B-mensaje-error
```

Pull request con los cinco *jobs* en verde; el de flujo avisa de que el primer commit cambia un test existente (es justo lo que se quería) y no da error, porque el código va en otro commit. Fusión con commit de fusión.

## Sesión con el agente

Proveedor y modelo: (el de cada persona)

| Paso | Fase | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|------|--------|--------|-------------|-----------------------|
| 1 | 1 | revisor | `/validar B-ver-lista` | Matriz y dos hallazgos | Uno aceptado y otro rechazado (tabla de arriba) |
| 2 | 2 | plan | `/planificar D-borrar-tarea` | Plan con 5 decisiones | Añadidas D-06 y D-07: no había visto que el botón cambia los textos ni el estado compartido de Playwright |
| 3 | 2 | build | `/escribir-tests D-borrar-tarea 1` | Tests de D | Tres correcciones (tabla de revisión) |
| 4 | 2 | implementador | `/implementar D-borrar-tarea 2` | Repositorio, servicio, controlador y ruta | Nada |
| 5 | 2 | implementador | `/implementar D-borrar-tarea 3` | El botón en la página | Nada |

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| Pedir confirmación con `confirm()` antes de borrar | Rechazada | Fuera de alcance en la spec |
| Responder 400 si el id no tiene formato de UUID | Rechazada | La spec decide 404 para una tarea que no existe (D-05) |
| Ejecutar las pruebas de Playwright en paralelo para ir más rápido | Rechazada | Comparten un servidor con estado (D-07) |

## Revisión de los tests

| Test | Problema | Corrección |
|------|----------|------------|
| `D-AC-01` | Solo comprobaba el 204 | Añadido que la respuesta no tiene cuerpo y que la tarea ya no está en `GET /tareas` |
| `D-EC-02` | No comprobaba que la tarea sigue | Comprobación con `GET /tareas` tras restaurar el *mock* |
| `D-EC-03` (Playwright) | Dejaba creada su tarea y el recorrido de B fallaba si se ejecutaba después | Borra su tarea al terminar |

```text
 × D-D-01: borrar quita la tarea y dice si existía        (borrar is not a function)
 × D-RF-01, D-RF-02, D-AC-01: …                        (expected 404 to be 204)
 × D-EC-01: …                                            (expected {} to deeply equal { error: 'La tarea no existe' })
 …
  1) e2e/borrar-tarea.e2e.js › Borrar tareas desde la página › D-RF-03: cada tarea tiene su botón Borrar
```

## Tests existentes modificados

En el commit `Tests de la feature D (revisados)`, `e2e/lista-tareas.e2e.js` pasa de comprobar el texto exacto de cada elemento (`'Comprar leche (pendiente)'`) a comprobar su principio (`/^Comprar leche \(pendiente\)/`), y `playwright.config.js` añade `workers: 1`. No cambia **lo que** comprueban los pasos de A y B (el texto y el estado de cada tarea, y su orden), sino cómo, porque D añade un botón dentro de cada elemento. Lo decide el plan (D-06, D-07) y lo hace una persona, antes del código. El gate de tests modificados lo marca como aviso en ese commit, y no como error, porque no toca `src/` ni `public/`.

## El gate nuevo

```text
$ bash herramientas/comprobar-marcadores.sh
✅ Marcadores: ninguna spec aprobada tiene dudas sin resolver

# con un marcador de prueba en RNF-01 de D:
❌ docs/specs/D-borrar-tarea/spec.md (Implementada): 46:- RNF-01: [NECESITA ACLARACIÓN: ¿medir?] …
```

## Integración continua

- Pull request de la corrección de B: cinco *jobs* en verde; un aviso de tests modificados (el commit del test).
- Pull request de D: cinco *jobs* en verde; aviso de tests modificados en `Tests de la feature D (revisados)` (`tests/api-tareas.test.js`, por la línea de importación, y `e2e/lista-tareas.e2e.js`, por D-06). Los dos leídos y aceptados.

## Commits

```text
*   Fusiona la feature D: borrar una tarea
|\
| * Feature D: T-06, botón Borrar en la página (implementada)
| * Feature D: T-04 y T-05, API DELETE /tareas/:id
| * Tests de la feature D (revisados)
| * Tasks de la feature D (aprobadas)
| * Plan de la feature D (aprobado)
|/
* Calidad: gate de marcadores
*   Fusiona la corrección de B: mensaje de EC-02
|\
| * Feature B: EC-02 con el mensaje de la spec
| * Tests de B: EC-02 con el mensaje de la spec
|/
* Índice: peticiones y dudas de las incidencias
* (commit inicial de la plantilla)
```
