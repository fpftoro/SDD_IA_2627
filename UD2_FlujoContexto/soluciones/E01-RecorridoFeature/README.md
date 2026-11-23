# E01-RecorridoFeature

## El recorrido de una feature

### Descripción

Solución del **Ejercicio 1** (autocorrección). El alumno dibuja el recorrido de la feature C del préstamo de portátiles por el flujo (artefacto, agente, punto de control, quién decide y rama de cada momento), decide dónde se corrigen diez problemas que aparecen por el camino, encuentra los fallos del flujo en un historial de Git y replanifica antes de la feature siguiente.

- Enunciado y material de partida: [`practicas/ejercicios/E01-RecorridoFeature`](../../practicas/ejercicios/E01-RecorridoFeature/ENUNCIADO.md)
- Rúbrica: [`rubrica.md`](./rubrica.md)

### Ejercicios

| # | Ejercicio | Concepto |
|---|-----------|----------|
| 1 | El recorrido de una feature | Fases, artefactos, puntos de control, reparto humano–agente, rama por feature y replanificación (OA2 a) |

### Estructura

```text
E01-RecorridoFeature/
├── README.md                     ← este fichero
├── rubrica.md
└── solucion/
    ├── README.md                 ← respuesta modelo
    ├── situaciones.md            ← material de partida, sin cambios
    ├── historial.txt             ← material de partida, sin cambios
    └── notas-replanificacion.md  ← material de partida, sin cambios
```

### Material sembrado

**Situaciones.** Tres nacen en la spec (S1, S5 y S7), dos en el plan (S2 y S10), dos en las tasks (S3 y S8), dos en el código (S4 y S9) y una en la constitución (S6). S1 es la trampa: está en el plan, pero lo que describe se nota desde fuera. S9 también: el test lo ha cambiado el agente, pero el problema es el código.

**Historial.** Generado con Git (hashes reales). Siete fallos sembrados y uno de propina; el enunciado pide al menos cinco:

| Commit | Fallo |
|--------|-------|
| `1c81104` | Código antes del plan, en `main` |
| `ba1d3a1` | Ocho tasks en un solo commit |
| `1166d72` | Tests después del código |
| `23c6eca` | Versión nueva de la spec en `main` con la rama abierta |
| `f0c2a4c` y `1458a69` | Fusión a medias y segunda fusión |
| `dae724b` | Spec de D aprobada en la rama de C, sin replanificar |
| `6ae1357` | Cambio de comportamiento en `main` sin pasar por la spec |
| `feature/C-registrar-prestamo` | Rama sin borrar (de propina) |

**Notas de replanificación.** Una por cada pregunta (N1 a N4), una idea de código que no se programa (N5) y una que no cambia nada (N6).

### Conceptos aprendidos

- Cada momento del flujo produce un artefacto, responde a una pregunta y lo cierra una persona.
- La spec se aprueba en `main`; el plan, las tasks, el código y las versiones nuevas de la spec van en la rama de la feature.
- Un problema se corrige donde nació, aunque se descubra más tarde. Lo que se nota desde fuera es siempre de la spec.
- El historial de Git cuenta si se siguió el flujo: el orden de los tipos de fichero, la rama de cada commit y las fusiones lo delatan.
- Replanificar es revisar el contexto, no programar: cambia el índice, la constitución, `AGENTS.md` o los comandos, o no cambia nada.

### Errores frecuentes

- Poner al agente como quien decide en alguna fase, o la rama de la feature en la fase de especificar.
- Responder S1 o S5 con «se decide en el plan» o «lo decide el agente». Se notan desde fuera: son de la spec.
- Responder S9 con «se corrige el test»: el test estaba bien, lo que falla es el código.
- Dar S4 por bueno «porque se arregla en el siguiente ciclo»: no hay commit con tests en rojo.
- En el historial, ver solo los fallos de las fusiones y no el orden de los commits (código antes del plan, tests después del código).
- Programar la exportación de N5 «porque son diez líneas», o llevar N6 a la constitución tras una sola vez.
- Responder «qué haría» de forma genérica («revisarlo», «arreglarlo»), sin decir en qué documento ni con qué pasos.

### Otras soluciones válidas

- En el mapa, añadir a «Fusionar» la integración continua en verde (tema 3), o poner como agente de especificar «ninguno» si la persona escribe la spec.
- S6 llevado a la constitución en la replanificación en vez de en la rama de C: el tema 1 (apartado 1.3.4) admite las dos opciones si se justifica.
- S1 resuelto en la spec con un fuera de alcance («Las reservas no impiden el préstamo en esta feature») en vez de un *edge case*: lo que importa es que lo decide la spec.
- Agrupar fallos del historial de otra forma (por ejemplo, 1 y 3 juntos como «orden de las fases»), siempre que haya al menos cinco distintos.
- Un solo commit de replanificación con todos los cambios, con un mensaje que los resuma.
- N5 respondido con «ninguna pregunta, es una idea nueva», siempre que acabe en el índice como feature y no se programe.
