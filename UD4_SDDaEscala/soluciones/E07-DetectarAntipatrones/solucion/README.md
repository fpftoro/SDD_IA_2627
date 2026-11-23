# Detectar antipatrones

## Señales

| Comando | Lo relevante de la salida | Qué sugiere |
|---------|---------------------------|-------------|
| `git log --format="%h %s" --shortstat main..HEAD` | Mensajes `Feature F: cancelar reservas` (6 ficheros), `wip` y `Arreglos`; el lockfile con 1552 inserciones y 1552 borrados | Toda la implementación en un commit; mensajes que no cuentan nada; un commit enorme que hay que mirar antes de juzgar |
| `grep -rn "NECESITA ACLARACIÓN" docs/specs` | `spec.md:13` | Spec aprobada con un marcador sin resolver |
| `git diff --stat --diff-filter=M main...HEAD -- tests` | `tests/servicio-reservas.test.js \| 14 --------------` | Un test que ya existía en `main` ha desaparecido |
| `git diff --name-only main...HEAD -- src` | Seis ficheros, entre ellos `src/errores/no-encontrado.js` y `src/utilidades/formato.js` | Una clase de error duplicada y un fichero que ninguna task pide |
| `git diff main...HEAD \| grep -nE '^\+.*(eslint-disable\|\.skip\(\|\.only\(\|TODO)'` | `eslint-disable-next-line`, `test.skip(…permisos…)` y `// TODO revisar` | Controles apagados y el test más delicado desactivado |
| `git diff main...HEAD -- src \| grep -n splice` | `reservas.splice(posicion, 1)` | Las reservas se borran |
| `grep -rn "repositorios/" src/controladores/` | `controlador-cancelacion.js:2` | El controlador accede al repositorio (salta la capa de servicios) |
| `sh herramientas/estado-features.sh` | `❌ F-cancelar-reserva: la spec dice «🔜 Aprobada» y el índice, «✅ Implementada»` | Estado del índice cambiado sin que la spec lo diga |
| `git log --format=%h --name-only main..HEAD -- docs/specs/F-cancelar-reserva/spec.md` | Solo el commit `00ce91d` | La spec no se ha tocado desde que se aprobó, aunque el código ha cambiado: *drift* |

## Hallazgos

| # | Fase | Antipatrón | Evidencia | Consecuencia | Corrección |
|---|------|------------|-----------|--------------|------------|
| 1 | Spec | Aprobada con un marcador sin resolver | `spec.md:13`, estado `🔜 Aprobada` | El agente decidió por su cuenta si un profesor puede cancelar la reserva de otro | Resolver la duda con producto; sin marcadores no se aprueba |
| 2 | Spec | Prescribe la implementación (tabla `reservas`, columna `cancelada`, función `cancelarReserva`) | RF-01 | Contradice la constitución (no hay tablas) y ata el plan | Decir qué se observa: la reserva queda `cancelada` |
| 3 | Spec | Requisito vago («cancelar rápido») | RF-02 | No se puede probar | Una medida (menos de 300 ms con 500 reservas) |
| 4 | Spec | Sin *edge cases* ni criterios ni fuera de alcance | Solo EC-01 | Faltan 401, 403, 409 y la lista de un día; ningún AC | *Edge cases* con calidad, AC en Gherkin y fuera de alcance |
| 5 | Plan | Plan que es código | `plan.md`, D-01 y D-02 con cuerpos de función | El agente copia; el plan caduca | Solo decisiones y, si hace falta, firmas |
| 6 | Plan | Ignora lo que ya existe: crea `NoEncontrado` | `src/errores/no-encontrado.js` frente a `error-no-encontrado.js` en `main` | Dos clases para lo mismo; el controlador compara `error.name` | Reutilizar `ErrorNoEncontrado` |
| 7 | Plan | Decisión que contradice la constitución, sin comprobarla | D-02 usa `splice` | Las reservas se borran; nadie lo vio porque falta la sección «Comprobación de la constitución» | Marcar `cancelada` en el repositorio; rehacer la comprobación |
| 8 | Tasks | Por capas, sin criterio de terminado y con los tests al final | `tasks.md`: «Terminada cuando: funciona»; grupo 4 = tests | Nada es verificable; tests después del código | Rebanadas verticales, tests primero, criterio objetivo |
| 9 | Implementación | Todas las tasks en un commit | `3c9aecd` (6 ficheros: código y tests juntos) | No se puede revisar por ciclos ni volver atrás | Un commit por grupo de tasks |
| 10 | Implementación | Borra las reservas | `repositorio-reservas.js`, `splice` | Rompe «las reservas no se borran nunca» | Cambiar el estado a `cancelada` |
| 11 | Implementación | Salta las capas | `controlador-cancelacion.js:2` importa el repositorio | Lógica en el controlador y campo `quedan` que la spec no pide | El controlador solo llama al servicio |
| 12 | Implementación | Clase de error equivocada y comparación por nombre | `ErrorValidacion` para un 403; `error.name === 'NoEncontrado'` | Códigos HTTP que dependen de cadenas | Clases de `src/errores/` con `instanceof` |
| 13 | Implementación | Fichero ajeno a las tasks | `src/utilidades/formato.js` sin uso; `// TODO revisar` | Alcance que creció solo | Revertir; lo que no está en «Ficheros» no se toca |
| 14 | Validación | Test borrado | `wip`: −14 líneas en `servicio-reservas.test.js` («las ordena por hora…») | Se pierde una comprobación de la feature B | Restaurarlo |
| 15 | Validación | Controles apagados | `eslint-disable-next-line` y `test.skip` del caso de permisos | El requisito más delicado queda sin test | Quitar ambos y escribir el test de 403 |
| 16 | Validación | Tests sin identificadores y escritos con el código | `cancelar-reserva.test.js`: «cancela una reserva»; mismo commit que el código | Sin trazabilidad a la spec | Un test por identificador, antes del código |
| 17 | Validación | *Spec drift* | El código distingue profesor y coordinación (403); la spec no lo dice | La spec ya no cuenta lo que hace el sistema | Subir la spec a la 1.1 antes de implementar |
| 18 | Equipo | Estado cambiado sin permiso | `Arreglos` pone `✅ Implementada` en el índice con la spec en `Aprobada`; marca las tasks | Prohibido por `AGENTS.md`; el estado miente | Lo cambia una persona al fusionar |
| 19 | Equipo | Commits que no cuentan nada | `wip`, `Arreglos` | El historial no sirve de registro | Mensajes que digan qué y por qué |

## Falsos positivos

| Señal | Por qué engaña | Qué comprobé |
|-------|----------------|--------------|
| `Regenera package-lock.json`: 1552 inserciones y 1552 borrados | Parece un commit enorme y desordenado | `git diff main...HEAD -- package.json` está vacío: no cambia ninguna dependencia; son las mismas líneas en otro orden. Se revierte (`git checkout main -- package-lock.json`), pero no se lee |
| `Mueve la guía de arranque a docs/`: 1 fichero, 0 inserciones, 0 borrados | Parece un commit vacío o un borrado | `git log --name-status` dice `R100`: renombrado sin cambios (`LEEME-arranque.md` → `docs/arranque.md`) |

## Plan de corrección

| Orden | Fase | Qué se rehace | Quién aprueba | Mensaje del commit |
|-------|------|---------------|---------------|--------------------|
| 1 | Spec | Spec 1.1 (la de `docs/specs/F-cancelar-reserva/spec.md`) con permisos, estado `cancelada`, EC y AC; el marcador, resuelto con producto | Producto, con los *edge cases* de calidad | `Spec de la feature F 1.1: permisos y reservas canceladas (en revisión)` y después `… (aprobada)` |
| 2 | Plan | Plan nuevo: reutiliza `ErrorNoEncontrado`; el repositorio cambia el estado; decide la clase del 403 (si hace falta una nueva, va a la constitución); con comprobación de la constitución y pruebas por identificador | Arquitectura | `Plan de la feature F 1.1 (borrador; arquitecto)` |
| 3 | Tasks | Rebanadas: cancelar una reserva propia; cancelar como coordinación; el listado y el carro libre. Tests antes, criterio de terminado objetivo | Desarrollo; calidad revisa las de tests | `Tasks de la feature F 1.1 (borrador)` |
| 4 | Implementación | Desde `main`, no desde esta rama: un ciclo por rebanada, con su commit | Otra persona de desarrollo en cada ciclo | `Rebanada 1 de la feature F: cancelar una reserva propia`, etc. |
| 5 | Controles | Restaurar el test borrado; sin `skip` ni `eslint-disable`; test de 403 real; `comprobar-trampas.sh` en la CI | Arquitectura (CI) | `Calidad: gate de trampas` |
| 6 | Estado | Índice y spec en `Implementada` al fusionar | Una persona | `Fusiona la feature F 1.1: cancelar una reserva` |

- **Qué se aprovecha:** la idea de la ruta `DELETE /api/reservas/:id` y los dos tests (renombrados con identificadores).
- **Qué se descarta:** el `splice`, la clase `NoEncontrado`, el controlador de cancelación tal cual, `formato.js`, el `wip` y el lockfile.

## Gate

```text
$ sh herramientas/comprobar-trampas.sh main        (en feature/F-cancelar-reserva)
❌ Controles apagados o tests desactivados:
+// eslint-disable-next-line no-restricted-imports
+  test.skip('un profesor no puede cancelar la reserva de otro', async () => {
❌ Borrados en src/ (la constitución dice que no se borra):
+    return reservas.splice(posicion, 1)[0];
❌ Specs con marcadores sin resolver:
docs/specs/F-cancelar-reserva/spec.md:13:[NECESITA ACLARACIÓN] ¿Se puede cancelar una reserva de otro profesor?
(salida 1)

$ sh herramientas/comprobar-trampas.sh main        (en main)
✅ Sin trampas
(salida 0)
```

## Qué leer

| Cambio | Riesgo (coste, reversibilidad, comprobaciones) | Cuánto leería |
|--------|-----------------------------------------------|----------------|
| `cancelarReserva` en el servicio (permisos) | Alto: decide quién puede cancelar; el test de permisos está saltado | Todo, con una segunda persona, y exijo el test de 403 |
| `repositorio-reservas.js` (el borrado) | Alto: borra datos y no se deshace | Todo; se rechaza antes de seguir |
| Los tests borrados y saltados | Alto: sin ellos nada protege lo anterior | Siempre, línea a línea |
| `controlador-cancelacion.js` | Medio: salta las capas; poco tráfico | Entero, para ver la lógica que sobra |
| `package-lock.json` | Bajo: `package.json` no cambia | No lo leo; compruebo `package.json` |
| `docs/arranque.md` | Bajo: renombrado sin cambios | Nada |
