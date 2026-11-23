# E05 · Más allá del camino feliz

**Tipo:** autocorrección

Completa la spec de «Reservar un carro», que solo describe el camino feliz: añade sus *edge cases* con la respuesta exacta del sistema, lo que queda fuera de alcance y las dudas que no te corresponde decidir.

**Criterios:** OA1 e

## El caso

En el préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), la feature B es «Reservar un carro». Un compañero ha empezado su spec en [`docs/specs/B-reservar-carro/spec.md`](./docs/specs/B-reservar-carro/spec.md), pero solo ha escrito lo que pasa cuando todo va bien. Con esa spec, el agente implementaría el camino feliz y **supondría** todo lo demás (tema 2, apartado 2.6).

Lo que dice la constitución del proyecto y te hace falta aquí:

- Los errores de la API devuelven `{ error: "mensaje" }`, con el mensaje en español y el código HTTP adecuado (400, 404, 409…).
- Las fechas van en formato ISO 8601.

## Entorno de trabajo

Es un ejercicio de lectura y escritura: no necesitas el Dev Container ni el agente. Completa la spec y escribe tus respuestas en el `README.md`.

## Requisitos

1. **Edge cases.** Añade a la spec la sección `## Edge cases y comportamiento ante errores`, después de los criterios de aceptación, con **al menos ocho** *edge cases*:
   - con identificador (`EC-01`, `EC-02`…) y la forma del tema 5: *Si <condición>, el sistema <respuesta exacta>*;
   - con la **respuesta exacta**: el código HTTP y el mensaje de error, o qué pasa con la reserva;
   - de **tipos distintos**: al menos seis de los tipos de la tabla «Edge cases por tipo» del README.
2. **Dudas.** Algunos *edge cases* esconden una **decisión del centro**, no de quien escribe la spec (tema 5, apartado 5.7). Márcalos con `[NECESITA ACLARACIÓN: <pregunta concreta>]` **justo donde afectan**, con las alternativas cuando las haya. Pon al menos **tres** marcadores.
3. **Criterios de aceptación.** Añade al menos **dos** criterios con la forma *Dado…, cuando…, entonces…* que comprueben *edge cases* que ya hayas decidido (sin marcador).
4. **Fuera de alcance.** Añade la sección `## Fuera de alcance` con al menos **cuatro** exclusiones. Si una exclusión es temporal, di dónde se tratará (por ejemplo, en otra feature del índice).
5. **Metadatos.** Sube la versión a `0.2`. Decide qué estado debe tener la spec y explícalo en la sección «Estado de la spec» del README.
6. Completa en el README las tablas «Edge cases por tipo» y «Dudas marcadas».

No cambies los requisitos ni los criterios que ya existen.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `docs/specs/B-reservar-carro/spec.md` | La spec completada, con las secciones `## Edge cases y comportamiento ante errores` y `## Fuera de alcance` |
| Identificadores | `EC-01`, `EC-02`… para los *edge cases*; `AC-03`, `AC-04`… para los criterios nuevos |
| Marcadores | `[NECESITA ACLARACIÓN: …]`, con la pregunta dentro |
| `README.md` | Secciones «Edge cases por tipo», «Dudas marcadas» y «Estado de la spec», con las tablas de la plantilla |

## Comprueba tu solución

- Para cada dato de la petición (`carro`, `dia`, `hora`), hazte las preguntas del tema 2: ¿y si falta?, ¿y si tiene un formato inválido?, ¿y si está fuera de rango?, ¿y si está justo en el límite?
- Piensa en el **calendario**: ¿qué pasa con un sábado?, ¿con un festivo?, ¿con una hora que ya ha pasado?
- Piensa en **dos personas**: ¿y si el carro ya está reservado?, ¿y si dos profesores lo reservan en el mismo segundo?, ¿y si un profesor reserva dos carros a la misma hora?
- Piensa en lo que **falla fuera**: ¿y si no se puede guardar la reserva?
- Ningún *edge case* dice «muestra un error» o «lo gestiona»: todos dicen qué código y qué mensaje.
- Cada marcador es una pregunta que podrías hacerle a una persona concreta (la coordinación TIC, la dirección), no una duda técnica que puedas resolver tú.
- Una spec con marcadores no se puede aprobar (tema 5, apartado 5.9).
- Ninguna exclusión del fuera de alcance contradice un requisito de la spec.

## Al terminar

Haz un commit con la spec y tus respuestas. No hay contenedor que borrar.
