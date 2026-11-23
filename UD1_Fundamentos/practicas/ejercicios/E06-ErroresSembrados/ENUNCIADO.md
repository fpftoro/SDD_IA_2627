# E06 · Spec con errores sembrados

**Tipo:** autocorrección

Revisa una spec llena de antipatrones: localiza cada problema, di por qué perjudica al agente y escribe la spec corregida.

**Criterios:** OA1 e

## El caso

En el préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), la feature E es «Anotar una incidencia». Un compañero ha escrito su spec deprisa y la ha dejado en [`spec-con-errores.md`](./spec-con-errores.md). Tiene al menos **diez** problemas de los que viste en el tema 5: requisitos mal escritos, secciones que faltan o sobran y decisiones que nadie ha tomado.

Lo que necesitas saber del proyecto:

- **Constitución:** los errores de la API devuelven `{ error: "mensaje" }`, en español y con el código HTTP adecuado; la aplicación **no guarda datos personales del alumnado**; las fechas van en ISO 8601.
- **Lo que ha decidido la coordinación TIC:**
  - Los tipos de incidencia son cuatro: `averia`, `falta-cargador`, `dano-fisico` y `otro`.
  - Las incidencias de tipo `averia` y `dano-fisico` dejan el portátil en estado `averiado`. Las de `falta-cargador` y `otro` no cambian su estado.
  - La descripción es obligatoria y tiene como mucho 500 caracteres.
  - Por ahora no quiere correos: consultará las incidencias en un listado, que será otra feature.
- **Dependencias:** la feature A (Consultar los portátiles), que ya existe.

## Entorno de trabajo

Es un ejercicio de lectura y escritura: no necesitas el Dev Container ni el agente. Escribe tus respuestas en el `README.md` y la spec corregida en su carpeta.

## Requisitos

1. **Problemas.** Revisa `spec-con-errores.md` sección a sección y anota en la tabla «Problemas» del README **al menos diez** problemas. Para cada uno:
   - dónde está (sección o identificador),
   - qué problema es: un **antipatrón** del tema 5 (apartado 5.12), una **cualidad** que no cumple (apartado 5.1) o una regla de los requisitos que se salta (apartado 5.4),
   - por qué es un problema **para el agente**: qué haría el agente con ese texto,
   - cómo lo corriges.
2. **Spec corregida.** Escribe la spec corregida en `docs/specs/E-anotar-incidencia/spec.md`, con la plantilla del curso (tema 5, apartado 5.10):
   - todas las secciones de la plantilla, incluidos los *edge cases* (al menos cinco, con respuesta exacta) y el fuera de alcance (al menos tres exclusiones);
   - requisitos atómicos y verificables, no funcionales medibles y criterios de aceptación con *Dado…, cuando…, entonces…*;
   - usa lo que ha decidido la coordinación TIC y respeta la constitución;
   - lo que nadie ha decidido, márcalo con `[NECESITA ACLARACIÓN: …]` en lugar de inventarlo.
3. **Estado.** Pon en los metadatos el estado que corresponda y explícalo en la sección «Estado de la spec» del README.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `spec-con-errores.md` | Sin cambios: es el material que revisas |
| `docs/specs/E-anotar-incidencia/spec.md` | La spec corregida, con las secciones de la plantilla del tema 5 |
| `README.md` | Secciones «Problemas» y «Estado de la spec», con la tabla de la plantilla |

## Comprueba tu solución

- Repasa la tabla de antipatrones del tema 5 (apartado 5.12) uno por uno: ¿está en la spec? La mayoría aparecen.
- Comprueba también lo que **falta**: compara las secciones de la spec con las de la plantilla.
- Compara cada requisito con la constitución: ¿alguno la contradice?
- Lee cada requisito y pregúntate cuántos tests harían falta para comprobarlo. Si son varios de cosas distintas, el requisito es compuesto.
- En tu spec corregida no queda ningún nombre de función, ningún fragmento de código ni ningún paso de implementación.
- Cada palabra subjetiva (rápido, seguro, intuitivo, adecuado, oportuno, correctamente) ha desaparecido o se ha cambiado por un valor que se puede medir.
- La decisión sobre una incidencia repetida no te la ha dado nadie: está marcada, no inventada.
- El correo no aparece en los requisitos de la spec corregida, pero sí en el fuera de alcance.
- Si tu spec tiene marcadores, no está `Aprobada`.

## Al terminar

Haz un commit con la spec corregida y tus respuestas. No hay contenedor que borrar.
