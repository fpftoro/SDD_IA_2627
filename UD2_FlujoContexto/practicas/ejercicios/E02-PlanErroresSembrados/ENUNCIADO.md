# E02 · Plan con errores sembrados

**Tipo:** autocorrección

Revisa un plan técnico generado por un agente con la lista del punto de control 2: localiza cada error, decide en qué documento se corrige y escribe el plan corregido.

**Criterios:** OA2 b

## El caso

En el préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), las features A, B y C ya están implementadas. La spec de la **feature D, «Registrar la devolución»**, está aprobada en [`docs/specs/D-registrar-devolucion/spec.md`](./docs/specs/D-registrar-devolucion/spec.md) (versión 1.0).

Un compañero le ha pedido el plan al agente *plan* y lo ha guardado sin revisarlo en [`plan-con-errores.md`](./plan-con-errores.md). Tiene **más de diez** errores de los que viste en el tema 2: decisiones que no le corresponden, choques con la constitución, suposiciones falsas sobre el código y huecos en las pruebas, entre otros.

Lo que necesitas saber del proyecto:

- **Constitución:** en [`constitution.md`](./constitution.md).
- **Código existente** (features A, B y C):

  ```text
  src/
  ├── app.js · servidor.js
  ├── middlewares/usuario-actual.js   ← deja en peticion.usuario { id, papel },
  │                                     con papel "profesor" o "coordinacion"
  ├── utilidades/reloj.js             ← ahora(): fecha y hora actuales en ISO 8601;
  │                                     los tests la sustituyen para fijar la hora
  ├── errores/                        ← ErrorValidacion (400), ErrorNoEncontrado (404)
  │                                     y ErrorConflicto (409)
  ├── rutas/                          ← portatiles.js, reservas.js, prestamos.js
  ├── controladores/                  ← traducen la petición al servicio, y los
  │                                     errores de errores/ a su código y { error }
  ├── servicios/                      ← servicio-portatiles.js, servicio-reservas.js
  │                                     y servicio-prestamos.js (registrarPrestamo)
  └── repositorios/                   ← repositorio-portatiles.js (buscarPorCodigo,
                                        cambiarEstado), repositorio-reservas.js y
                                        repositorio-prestamos.js (buscarPorId,
                                        guardar, actualizar)
  tests/                              ← servicio-*.test.js (unitarios) y
                                        api-*.test.js (integración, con supertest)
  ```

- **Un préstamo** (feature C) tiene `id`, `codigoPortatil`, `idProfesor`, `fechaPrestamo`, `fechaLimite` y `estado` (`abierto`). Un **portátil** está `disponible`, `prestado` o `averiado`.
- **No hay página** para las devoluciones: la feature D es solo la API.

## Entorno de trabajo

Es un ejercicio de lectura y escritura: no necesitas el Dev Container ni el agente. Escribe tus respuestas en el `README.md` y el plan corregido en la carpeta de la feature.

## Requisitos

1. **Errores.** Revisa `plan-con-errores.md` con la lista del punto de control 2 (tema 2, apartado 2.5.1) y anota en la tabla «Errores» del README **al menos diez** errores. Para cada uno:
   - dónde está (sección o decisión `D-xx`),
   - qué error es: uno de los errores típicos del tema 2 (apartado 2.5.2) o la línea de la lista del punto de control que no cumple,
   - qué pasaría si el plan se aprobara así: qué haría el agente al implementarlo o qué problema tendría el proyecto,
   - cómo lo corriges,
   - **dónde** se corrige: en el plan, en la spec o en la constitución.
2. **Plan corregido.** Escribe el plan corregido en `docs/specs/D-registrar-devolucion/plan.md`, con la plantilla del curso (tema 2, apartado 2.3.4):
   - la comprobación de la constitución recorre **todos** sus principios;
   - cada decisión técnica tiene identificador, motivo, los identificadores de la spec que cubre y, cuando la hay, la alternativa descartada (las propuestas que rechazas del plan original van ahí);
   - sin dependencias nuevas que no hagan falta y sin código;
   - la secuencia de implementación respeta las dependencias entre ficheros y pone los tests antes que el código;
   - la estrategia de pruebas tiene una fila por cada identificador de la spec, con el tipo de prueba (unitaria, de integración o a mano) y el fichero.
3. **Huecos de la spec.** Lo que el plan decidía y le corresponde a la spec **no lo decidas en el plan**. En la sección «Huecos de la spec» del README, explica cada hueco, por qué es de la spec y qué cambio propones (el texto del requisito o del *edge case* nuevo). La spec aprobada **no se toca**: el cambio lo decide quien la aprueba. En el plan, marca cada hueco con `[NECESITA ACLARACIÓN: …]` en «Riesgos y dudas».
4. **Estado del plan.** Pon en los metadatos el estado que corresponda y explícalo en la sección «Estado del plan» del README.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `plan-con-errores.md`, `constitution.md` y `docs/` (spec y PRD) | Sin cambios: es el material que revisas |
| `docs/specs/D-registrar-devolucion/plan.md` | El plan corregido, con las secciones de la plantilla del tema 2 |
| `README.md` | Secciones «Errores», «Huecos de la spec» y «Estado del plan», con la tabla de la plantilla |

## Comprueba tu solución

- Recorre la lista del punto de control 2 línea por línea: cada línea que el plan original no cumple es, al menos, un error.
- Compara cada decisión con la spec: ¿cambia un código, un mensaje o un requisito? ¿Añade algo que la spec no dice o que está en su fuera de alcance?
- Compara cada decisión con la constitución, principio por principio, y no te fíes de las casillas marcadas del plan original.
- Busca en «Código existente» cada fichero y cada función que el plan usa. Si no está, el plan supone código que no existe.
- Pregúntate de cada decisión: «¿lo notaría alguien desde fuera?». Si la respuesta es sí y la spec no lo dice, es un hueco de la spec.
- En tu estrategia de pruebas, cuenta las filas: todos los RF, RNF, AC y EC de la spec aparecen. Lo que se ve en la respuesta de la API se comprueba con un test de integración.
- En tu plan no queda ningún bloque de código ni ninguna dependencia que no esté en la constitución.
- Si tu plan tiene marcadores pendientes, no está `Aprobado`.

## Al terminar

Haz un commit con el plan corregido y tus respuestas. No hay contenedor que borrar.
