# Cada cosa en su sitio

## Artefactos

| Fragmento | Artefacto | Pista |
|-----------|-----------|-------|
| A1 | prompt | Instrucción de una sola vez para un cambio pequeño; no se guarda en el repositorio |
| A2 | PRD | Responde al qué y al porqué desde el punto de vista del centro (objetivo, problema, métrica de éxito), sin nada técnico |
| A3 | SRS | Requisitos funcionales y no funcionales de **todo el sistema** (todos los carros, todas las pantallas), con decisiones técnicas |
| A4 | spec | Requisitos verificables de **una** funcionalidad (devolver), con la respuesta exacta y una sección de fuera de alcance |
| A5 | prompt | Aunque es largo y tiene detalles, es una conversación transitoria: sin estructura, mezcla requisitos con deseos («si te da tiempo»), sin *edge cases* ni fuera de alcance, y no queda versionado |
| A6 | PRD | Usuarios, casos de uso y fuera de alcance del producto completo, sin cómo se comporta cada funcionalidad |
| A7 | spec | Una funcionalidad (reservar un carro) con contexto, historia de usuario y criterios de aceptación comprobables |
| A8 | prompt | Petición puntual en la conversación; no describe ningún comportamiento |
| A9 | SRS | Interfaces externas, arquitectura y restricciones del sistema completo, con numeración de documento formal |
| A10 | otro: lista de tareas de programación (las *tasks* de un plan) | Dice **cómo** se va a programar, paso a paso, pero no qué debe hacer el sistema ni cómo se comprueba: le faltan requisitos, criterios de aceptación y *edge cases* |

## Capas de contexto

| Línea | Capa | Por qué |
|-------|------|---------|
| B1 | reglas | Comando que el agente necesita en cualquier tarea; se sigue sin interpretarlo |
| B2 | constitución | Principio de privacidad que el centro no negocia y que afecta a todas las funcionalidades |
| B3 | spec | Comportamiento de una sola funcionalidad (devolver un portátil) |
| B4 | reglas | Convención de código para todas las tareas |
| B5 | constitución | Decisión de diseño de la API que deben respetar todas las funcionalidades |
| B6 | reglas | Prohibición operativa sobre cómo trabaja el agente |
| B7 | spec | Regla de negocio de la funcionalidad «Reservar un carro» |
| B8 | constitución | Principio de arquitectura de todo el proyecto, con un motivo detrás |
| B9 | prompt | Solo vale para una tarea concreta: si se guardara en un fichero, el agente lo aplicaría en todas |
| B10 | constitución | Decisión sobre los datos que afecta a todas las funcionalidades y a la API |
| B11 | spec | Regla de negocio de «Reservar un carro» |
| B12 | reglas | Paso operativo que el agente hace al terminar cualquier tarea |

## Casos dudosos

| Fragmento o línea | Dudaba entre | Me quedo con… porque… |
|-------------------|--------------|------------------------|
| A5 | prompt y spec | Prompt, porque aunque tiene requisitos («que no se pueda reservar dos veces») es un mensaje de chat: no tiene estructura ni *edge cases* ni fuera de alcance, mezcla lo obligatorio con lo opcional y no queda en el repositorio. Ser largo no lo convierte en una spec |
| A10 | spec y otra cosa | No es una spec: es una lista de tareas de programación. Dice cómo construirlo (tabla, endpoint, botón) pero no cómo debe comportarse ni cómo se comprueba. Es lo que en la UD2 saldrá del plan, **después** de la spec |
| B10 | reglas y constitución | Constitución, porque no es una instrucción sobre cómo trabaja el agente, sino una decisión del proyecto que deben respetar todas las funcionalidades (y quien consuma la API). Las reglas serían cosas como «ejecuta `npm test`» |

## Primitivas

| Situación | Primitiva | Motivo |
|-----------|-----------|--------|
| C1 | skill | Procedimiento de varios pasos que el agente carga solo cuando la tarea lo necesita |
| C2 | MCP | Conecta el agente con un sistema externo al repositorio |
| C3 | instrucciones | Indicación permanente que se aplica en todas las tareas (`AGENTS.md`) |
| C4 | spec | Contrato de comportamiento de una funcionalidad |
| C5 | prompt | Instrucción de un solo uso |
| C6 | agente | Es el programa que junta todas las primitivas y actúa sobre el proyecto |
