# Los tests primero: Reservar un carro

Ejemplo comentado. Tu sesión no será igual: el agente no responde siempre lo mismo.

## Permisos del implementador

```text
edit      *                      allow
edit      tests/**               deny
edit      package.json           deny
edit      docs/specs/**          deny
edit      docs/specs/*/tasks.md  allow
subagent  *                      deny
shell     *                      ask
shell     npm test               allow
shell     git status             allow
shell     git diff *             allow
shell     git log *              allow
```

## Sesión con el agente

Proveedor y modelo: (el de cada persona)

| Paso | Agente | Prompt | Qué produjo | Qué corregí y por qué |
|------|--------|--------|-------------|-----------------------|
| 1 | build | `/escribir-tests B-reservar-carro 1` | Los dos ficheros de tests, 21 tests, todos en rojo | Cuatro problemas en la revisión (tabla siguiente) |
| 2 | build | «Corrige los cuatro problemas de la tabla; no toques el código» | Los tests corregidos, 23 en rojo | Nada: revisados otra vez con la spec |
| 3 | implementador | `/implementar B-reservar-carro 2` | Repositorio, ErrorConflicto y servicio; pasan los unitarios | Nada |
| 4 | implementador | `/implementar B-reservar-carro 3` | Controlador, ruta y `app.js`; quería cambiar el mensaje esperado de EC-06 | Rechazado: el test tiene el mensaje de la spec. Corrigió el controlador |

## Revisión de los tests

| Test | Problema | Corrección |
|------|----------|------------|
| `B-RNF-02` | No distinguía la hora peninsular de la UTC: aceptaba la fecha de mañana a las 23:30 UTC, lo que también hace un código en UTC | Comprobar que, a las 23:30 UTC, la fecha UTC ya es pasada |
| `B-EC-02` | Solo comprobaba el 409 | Añadido el cuerpo exacto |
| `B-EC-06` | Solo probaba el cuerpo vacío | Un caso por cada campo que falta, con `test.each` |
| Todos los de la API | Sin `vaciar()` en `beforeEach`: el de AC-04 dependía de que AC-02 se ejecutara antes | `repositorioReservas.vaciar()` en `beforeEach` |

## Decisiones

| Propuesta del agente | Aceptada o rechazada | Motivo |
|----------------------|----------------------|--------|
| Validar la fecha con una librería de fechas | Rechazada | La constitución no permite dependencias sin acordarlo, y D-04 ya decide cómo |
| Cambiar el mensaje esperado de `B-EC-06` porque el controlador respondía otro | Rechazada | El test tiene el mensaje de la spec: se corrige el código |
| Comprobar en el controlador que la franja es un número | Rechazada | La validación va en el servicio (constitución y D-05) |

## El rojo

```text
 FAIL  tests/api-reservas.test.js
Error: Cannot find module '../src/repositorios/repositorio-reservas.js'
 FAIL  tests/servicio-reservas.test.js
Error: Cannot find module '../src/repositorios/repositorio-reservas.js'

      Tests  22 passed (22)
```

Los 22 de la feature A pasan; los de B no llegan a ejecutarse porque el repositorio de reservas todavía no existe. Es aceptable (el módulo es parte de la feature), pero no demuestra las aserciones: tras crear el repositorio en el primer ciclo, los tests del servicio fallaron por `crearReserva is not a function`, y los de la API, por `expected 404 to be 201`.

## Tests intactos

```text
$ git diff --stat $(git log -1 --format=%h --grep='Tests de la feature B') -- tests/
$
```

Sin salida: los tests son los que se revisaron.

## ¿Pueden fallar?

En `servicio-reservas.js` cambié la zona `Europe/Madrid` por `UTC`:

```text
 × B-RNF-02: a las 23:30 UTC ya es el día siguiente en España
      Tests  1 failed | 44 passed (45)
```

Deshecho con `git checkout -- src/servicios/servicio-reservas.js`.

## Commits

```text
*   Fusiona la feature B: reservar un carro
|\
| * Feature B: T-05, API POST /api/reservas (implementada)
| * Feature B: T-03 y T-04, repositorio y servicio de reservas
| * Tests de la feature B (revisados)
|/
* Memoria del agente: implementador
* (commit inicial de la plantilla)
```
