# E02 · Cada cosa en su sitio

**Tipo:** autocorrección

Clasifica documentos y líneas del proyecto de préstamo de portátiles: qué artefacto es cada uno, en qué capa de contexto va cada instrucción y qué primitiva resuelve cada necesidad.

**Criterios:** OA1 b

## El caso

El equipo del préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)) ha ido acumulando documentos, notas y mensajes de chat. Antes de empezar a trabajar con un agente, quiere ordenarlos: saber qué es cada cosa y dónde tiene que ir.

Todo el material está en [`fragmentos.md`](./fragmentos.md).

## Entorno de trabajo

Es un ejercicio de lectura y escritura: no necesitas el Dev Container ni el agente. Escribe tus respuestas en el `README.md`.

## Requisitos

1. **Artefactos (parte A de `fragmentos.md`).** Clasifica cada fragmento A1–A10 en la tabla «Artefactos» del README como **prompt**, **PRD**, **SRS** o **spec**. Si crees que no es ninguno de los cuatro, escribe **otro** y di qué es. En la columna «Pista» escribe la característica del tema 2 que te lo indica: si es transitorio o está versionado, si responde al qué y al porqué o al cómo, si describe una funcionalidad o todo el sistema, si tiene requisitos verificables…
2. **Capas de contexto (parte B).** Decide dónde va cada línea B1–B12 en la tabla «Capas de contexto»: **reglas** (`AGENTS.md`), **constitución**, **spec** o **prompt** (una instrucción de una sola vez, que no se guarda en ningún fichero). Justifica cada una en pocas palabras.
3. **Casos dudosos.** En la sección «Casos dudosos», elige los **tres** fragmentos o líneas de las partes A y B que más te hayan costado. Para cada uno, explica entre qué dos opciones dudabas y por qué te has quedado con la que has elegido.
4. **Primitivas (parte C).** Indica qué primitiva resuelve cada situación C1–C6 en la tabla «Primitivas»: **prompt**, **instrucciones**, **skill**, **spec**, **MCP** o **agente**, con el motivo.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `fragmentos.md` | Sin cambios: es el material que clasificas |
| `README.md` | Secciones «Artefactos», «Capas de contexto», «Casos dudosos» y «Primitivas», con las tablas de la plantilla |
| Valores de la columna «Artefacto» | `prompt`, `PRD`, `SRS`, `spec` u `otro: <qué es>` |
| Valores de la columna «Capa» | `reglas`, `constitución`, `spec` o `prompt` |
| Valores de la columna «Primitiva» | `prompt`, `instrucciones`, `skill`, `spec`, `MCP` o `agente` |

## Comprueba tu solución

- En la parte A has usado los cuatro artefactos al menos una vez.
- Ningún fragmento es spec **solo** por ser largo o detallado. Un prompt de tres párrafos sigue siendo un prompt (tema 2, apartado 2.2).
- Un documento que describe **todo el sistema** no es una spec, por muy técnico que sea. Y una lista de pasos de programación tampoco lo es (tema 2, apartado 2.5.3).
- En la parte B, cada línea que has puesto en las reglas o en la constitución vale para **todas** las funcionalidades del proyecto. Si una línea solo afecta a una funcionalidad, va en su spec.
- Las líneas de las reglas se pueden seguir sin interpretarlas (un comando, una convención); las de la constitución son principios que el equipo ha decidido y no se negocian en cada tarea.
- Ninguna línea de la parte B que sirve solo para una tarea concreta está en un fichero del proyecto.
- En la parte C has usado las seis primitivas, una por situación.

## Al terminar

Haz un commit con tus respuestas. No hay contenedor que borrar.
