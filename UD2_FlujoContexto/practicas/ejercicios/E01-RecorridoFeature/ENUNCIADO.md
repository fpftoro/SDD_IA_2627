# E01 · El recorrido de una feature

**Tipo:** autocorrección

Dibuja el recorrido completo de una feature por el flujo SDD, decide dónde se corrige cada problema que aparece por el camino, encuentra los fallos del flujo en un historial de Git y replanifica antes de la feature siguiente.

**Criterios:** OA2 a

## El caso

En el préstamo de portátiles (lo tienes descrito en el [índice de ejercicios](../../03-ejercicios.md#el-caso-préstamo-de-portátiles-del-centro)), la feature A (Consultar los portátiles) y la B (Reservar un carro) ya están implementadas. Toca la **feature C, «Registrar el préstamo»**, con la carpeta `docs/specs/C-registrar-prestamo/`.

El material de partida:

- [`situaciones.md`](./situaciones.md): diez problemas que aparecieron mientras se hacía la feature C, con un resumen de su spec.
- [`historial.txt`](./historial.txt): el historial de Git de un compañero que hizo la feature C **sin seguir bien el flujo**.
- [`notas-replanificacion.md`](./notas-replanificacion.md): tus notas al terminar la feature C, antes de empezar la siguiente.

## Entorno de trabajo

Es un ejercicio de lectura y escritura: no necesitas el Dev Container ni el agente. Escribe tus respuestas en el `README.md`.

## Requisitos

1. **El mapa del recorrido.** Completa la tabla «Mapa del recorrido» del README con una fila por momento del flujo: contexto del proyecto, especificar, planificar, descomponer, implementar, fusionar y replanificar. En cada fila:
   - qué **entra** (los documentos o la información de partida),
   - qué **artefacto** sale, con su ruta para la feature C (o «ninguno», si no produce un fichero nuevo),
   - qué **agente** de OpenCode se usa y para qué,
   - qué **punto de control** la cierra y la **pregunta** que responde,
   - quién **decide** (la persona o el agente),
   - en qué **rama** se hace (`main` o la rama de la feature, con su nombre).
2. **Dónde se corrige.** Para cada situación de `situaciones.md`, completa la tabla «Dónde se corrige»:
   - **dónde nació** el problema: spec, plan, tasks, código o constitución;
   - **qué haces**: los pasos concretos, empezando por si paras o sigues;
   - **qué más revisas** después: los documentos o el código que pueden haber quedado afectados (o «nada»).
3. **Fallos en el historial.** Lee `historial.txt` y anota en la tabla «Fallos del historial» **al menos cinco** fallos del flujo. Para cada uno:
   - el commit o los commits donde se ve,
   - la regla del flujo que se salta,
   - qué problema causa,
   - cómo se debió hacer.
4. **Replanificar.** Para cada nota de `notas-replanificacion.md`, completa la tabla «Replanificación»:
   - a cuál de las cuatro preguntas de la replanificación responde (o «ninguna»),
   - qué cambias y en qué fichero (o «nada», y por qué),
   - el mensaje del commit, si hay cambio.

   Termina con un párrafo que explique por qué estos cambios se hacen **antes** de empezar la feature siguiente.

## Contrato de entrega

Respeta estos nombres para poder comparar tu trabajo con la solución:

| Elemento | Debe ser |
|----------|----------|
| `situaciones.md`, `historial.txt` y `notas-replanificacion.md` | Sin cambios: es el material que analizas |
| `README.md` | Secciones «Mapa del recorrido», «Dónde se corrige», «Fallos del historial» y «Replanificación», con las tablas de la plantilla |

## Comprueba tu solución

- En el mapa, cada fase tiene **un** artefacto y **una** pregunta. Si dos filas responden a la misma pregunta, revisa el tema 1 (apartado 1.4.1).
- Ninguna fila del mapa tiene al agente como quien decide.
- La spec se aprueba en `main`; el plan, las tasks y el código van en la rama. Comprueba que tu mapa lo dice.
- En «Dónde se corrige», al menos tres situaciones nacen en la spec. Cuando nace en la spec, la respuesta incluye una versión nueva y volver a aprobarla.
- Ninguna de tus respuestas corrige **solo el código** cuando el problema estaba en un documento.
- En el historial, mira tres cosas: en qué rama está cada commit, en qué orden aparecen los tipos de fichero (spec, plan, código, tests) y cuántas fusiones tiene la feature.
- En la replanificación, no todas las notas cambian algo. Y una idea nueva de código no se programa al replanificar.

## Al terminar

Haz un commit con tus respuestas. No hay contenedor que borrar.
