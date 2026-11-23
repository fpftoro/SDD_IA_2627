# Spec con errores sembrados

Spec corregida: [`docs/specs/E-anotar-incidencia/spec.md`](./docs/specs/E-anotar-incidencia/spec.md)

## Problemas

| # | Dónde | Problema | Qué haría el agente | Corrección |
|---|-------|----------|---------------------|------------|
| 1 | Metadatos | Falta el **estado** (y la fecha); la versión 1.0 da a entender que está aprobada | Nadie sabe si la spec se puede implementar; el agente la tomaría como definitiva | Estado `Borrador`, versión 0.2 y fecha |
| 2 | RF-01 | **Requisito compuesto**: registrar, cambiar el estado y enviar un correo son tres requisitos | Podría implementar dos y olvidar el tercero sin que nadie lo note al revisar | Separar en requisitos atómicos (RF-01, RF-03, RF-04) y quitar el correo, que la coordinación TIC no quiere |
| 3 | RF-02 | **Vaguedad**: «una lista adecuada» de tipos y una descripción sin límites | Se inventaría los tipos y la longitud | Los cuatro tipos que ha decidido la coordinación TIC (RF-02) y la descripción obligatoria de hasta 500 caracteres (RNF-03) |
| 4 | RF-03 | **Spec que prescribe la implementación**: nombre de fichero, de función y código | Copiaría el código tal cual, aunque haya una forma mejor, y cualquier refactorización dejaría la spec vieja | Describir el comportamiento: qué se registra y cuándo cambia el estado. El cómo va en el plan |
| 5 | RF-03 | **Contradice lo decidido**: todas las incidencias dejan el portátil averiado | Un portátil al que solo le falta el cargador quedaría inutilizable | Solo `averia` y `dano-fisico` cambian el estado (RF-03 y RF-04) |
| 6 | RF-04 | **Contradice la constitución**: guarda el nombre de un alumno | Añadiría un dato personal del alumnado, que la constitución prohíbe | Eliminarlo; RNF-04 deja claro que no hay ningún campo para el alumnado |
| 7 | RF-05 | **Duda escondida**: «se hará lo que se considere oportuno» | Decidiría por su cuenta qué hacer con una incidencia repetida | `[NECESITA ACLARACIÓN]` en EC-07 con las alternativas |
| 8 | RF-06 | **Vaguedad**: «manejarse correctamente» | Elegiría los códigos y los mensajes, quizá sin el formato `{ error }` | Sustituirlo por *edge cases* con código y mensaje exactos (EC-01 a EC-09) |
| 9 | RNF-01 | **No medible**: «rápido» | No tiene ningún objetivo; cualquier tiempo vale | Menos de 300 ms con 1.000 incidencias guardadas |
| 10 | RNF-02 | **No medible**: «seguro» | No sabe qué medida tomar | Restricción concreta: el profesor se toma de la sesión, no del cuerpo (RNF-02) |
| 11 | AC-01 | **No verificable del todo**: «queda registrada» no dice qué se observa | El test que escriba no comprobará ni la respuesta ni el estado del portátil | Respuesta 201 y estado del portátil después (AC-01) |
| 12 | AC-02 | **No binario**: «intuitiva» | No se puede escribir un test; lo daría por cumplido | Eliminarlo: no es un criterio de aceptación |
| 13 | AC-03 | **No enfocado** y sin *Dado…, cuando…, entonces…*: comprueba cuatro cosas, entre ellas un correo y un listado que no son de esta feature | Mezclaría en un test cosas de otras features | Criterios separados, uno por comportamiento (AC-01 a AC-03) |
| 14 | Edge cases | **Solo el camino feliz**: «Los habituales» | Implementaría el caso normal y supondría el resto | Nueve *edge cases* con respuesta exacta o con marcador |
| 15 | Pasos de implementación | **Mezclar spec y plan** | No distinguiría restricciones de sugerencias; además, «la librería que mejor funcione» le deja elegir una dependencia | Quitar la sección: los pasos salen del plan, en la UD2 |
| 16 | Toda la spec | **Falta el fuera de alcance** (y las dependencias) | Podría añadir el listado, el cierre de incidencias o las fotos | Sección «Fuera de alcance» y dependencia de la feature A en el contexto |

## Estado de la spec

`Borrador`, versión 0.2. He corregido todos los problemas con lo que había decidido la coordinación TIC y la constitución, pero quedan dos decisiones que no me corresponden y están marcadas (EC-07, incidencia repetida, y EC-08, portátil prestado). Con marcadores no se puede aprobar. Cuando la coordinación TIC las responda, pasará a `En revisión`.
