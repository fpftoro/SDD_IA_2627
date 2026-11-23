# E05 · Spec de un módulo heredado

**Tipo:** autocorrección (con una parte opcional con agente)

Hay un módulo del centro que hace su trabajo desde hace tiempo y no tiene ni spec ni tests. Descubre qué hace de verdad con tests de caracterización, decide con producto qué rarezas son comportamiento y cuáles son fallos, y escribe la spec del comportamiento actual.

**Criterios:** OA4 d

## El caso

Es el módulo `src/avisos.js`, que genera cada mañana el texto de los portátiles que llevan demasiado tiempo fuera (`node ejemplo.js` lo prueba con datos de ejemplo). Lo escribió alguien que ya no está en el centro. La coordinación TIC quiere cambiarlo (próximo ejercicio) y antes necesita saber exactamente qué hace. Repasa antes los apartados 3.3 y 3.4 del tema 3 de la unidad. Las features A a F son las del préstamo de siempre (índice de ejercicios); este módulo es la **G**.

## Entorno de trabajo

Abre la carpeta en su **Dev Container** (Node.js, con Vitest). Para la parte opcional necesitas OpenCode conectado a un proveedor. Escribe las respuestas en el `README.md`.

## Requisitos

1. **Qué hace.** Lee `src/avisos.js` y ejecuta `node ejemplo.js`. En «Qué hace el módulo», en cinco frases como máximo: qué recibe, qué devuelve y qué decide.
2. **Rarezas.** Prueba el módulo con entradas que pongan a prueba cada decisión del código (el límite de días, el orden, los campos que faltan, los estados, las fechas raras…). En la tabla «Rarezas», anota **al menos siete**: qué hace, con qué entrada lo has visto y qué devuelve exactamente. No cambies `src/avisos.js`.
3. **Tests de caracterización.** Escribe `tests/avisos.caracterizacion.test.js` con Vitest. Cada test fija **lo que devuelve hoy** el módulo (el valor esperado sale de ejecutarlo, no de lo que te parezca razonable), con un identificador en el nombre (`CAR-01`) y una entrada completa. Debe haber al menos un test por rareza, al menos doce en total, y `npm test` tiene que estar en verde con `src/avisos.js` sin tocar.
4. **Decidir.** Abre ahora [`respuestas-producto.md`](./respuestas-producto.md). En la columna «Decisión» de la tabla de rarezas, escribe **comportamiento** (se conserva) o **fallo** (se corregirá) y el motivo. Si una rareza tuya no está en las respuestas, decide tú y justifícalo. Marca en los tests de los fallos un comentario `FALLO` con un identificador (`FC-01`).
5. **La spec del comportamiento actual.** Escribe `docs/specs/G-avisos-devolucion/spec.md` (versión 1.0) con: contexto, requisitos (EARS) que describen lo que hace hoy el módulo, *edge cases* (EARS), cuatro criterios de aceptación en Gherkin y una sección **«Fallos conocidos»** con lo que producto quiere corregir. Los comportamientos que se conservan van en los requisitos; los fallos se describen como están y se anotan aparte. Pon la spec en estado `✅ Implementada` y actualiza el índice (`docs/specs/README.md`); comprueba `npm run estado`.
6. **Commits.** Dos commits, en este orden: `Tests de caracterización de los avisos` y `Spec de la feature G: comportamiento actual (implementada)`.

**Parte opcional con agente.** En una sesión nueva de OpenCode, pídele que escriba los tests de caracterización de `src/avisos.js` (sin que vea los tuyos). Compara su lista con la tuya en «Parte opcional»: qué rarezas encontró que tú no, cuáles se le escaparon y por qué hay que ejecutar los valores en lugar de fiarse de lo que el agente «cree» que devuelve.

## Contrato de entrega

| Elemento | Debe ser |
|----------|----------|
| `src/avisos.js`, `ejemplo.js` y `respuestas-producto.md` | Sin cambios |
| `tests/avisos.caracterizacion.test.js` | Con al menos doce tests `CAR-nn`, en verde |
| `docs/specs/G-avisos-devolucion/spec.md` | Versión 1.0, `✅ Implementada`, con EARS, Gherkin con `# language: es` y «Fallos conocidos» |
| `docs/specs/README.md` | Con la feature G en `✅ Implementada` |
| `README.md` | Secciones «Qué hace el módulo», «Rarezas», «Commits» y, si la haces, «Parte opcional», con las tablas de la plantilla |
| Historial | Los dos commits indicados |

## Comprueba tu solución

- Los valores esperados de tus tests salen de ejecutar el módulo, no de tu intuición.
- Hay un test para cada rareza y las entradas son completas: se entiende cada test sin abrir el módulo.
- Los fallos están **fijados** en los tests tal como son hoy (con `FALLO`): todavía no se corrigen.
- La spec describe lo que hace el módulo, no lo que debería hacer: los fallos están en «Fallos conocidos», no arreglados en los requisitos.
- Los comportamientos que se conservan y que parecen raros (el límite de 7, el texto «Sin avisos») están dichos expresamente.
- Ningún requisito de la spec dice cómo está escrito el código.
- Si tienes un `CAR-` sin rareza o una rareza sin test, falta algo.

## Al terminar

Haz los dos commits. Cuando la UD4 termine, el volumen de las credenciales se borra con `docker volume rm sdd-opencode`.
