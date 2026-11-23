# Objetivo de aprendizaje y criterios de evaluación - UD3

[⬅️ Volver a la unidad](./README.md)

Unidad 3 Validación, pruebas y herramientas. Curso de desarrollo guiado por especificaciones con IA.

Este curso no tiene resultados de aprendizaje oficiales: el objetivo y los criterios son propios del curso y siguen el estilo de los del currículo de Formación Profesional.

- [Objetivo de aprendizaje](#objetivo-de-aprendizaje)
- [Criterios de evaluación](#criterios-de-evaluación)
- [Contenidos](#contenidos)
- [Dónde se trabaja cada criterio](#dónde-se-trabaja-cada-criterio)

---

## Objetivo de aprendizaje

**OA3.** Verifica que el código generado por un agente cumple su especificación, integrando pruebas y controles automáticos, y selecciona herramientas del ecosistema según el contexto del proyecto.

## Criterios de evaluación

| Criterio | Criterio de evaluación |
|----------|------------------------|
| a | Se han validado la especificación, el código frente a la especificación y la arquitectura, y se ha detectado el *spec drift*. |
| b | Se han derivado pruebas de los criterios de aceptación y de los *edge cases*, en el nivel adecuado, y se han escrito antes que el código. |
| c | Se han definido y automatizado *quality gates* en un sistema de integración continua. |
| d | Se ha diagnosticado un fallo distinguiendo un hueco en la especificación de un error de implementación. |
| e | Se han comparado herramientas del ecosistema y se han justificado combinaciones según el proyecto. |
| f | Se ha conectado el agente a sistemas externos mediante MCP aplicando el principio de mínimo privilegio. |
| g | Se ha evaluado el comportamiento del agente con una batería de tareas repetidas, puntuando por separado el resultado, el respeto de los límites y la petición de ayuda, y comparando dos configuraciones del arnés (*harness*). |

## Contenidos

- Por qué validar es distinto cuando el código lo escribe un agente.
- El *spec drift*: qué es, cómo aparece y cómo se detecta.
- Los tres niveles de validación: la spec, el código frente a la spec y la arquitectura.
- La matriz de trazabilidad y la revisión independiente con un subagente.
- Depurar desde la spec: hueco en la spec, spec ambigua, error del plan, error de implementación y test que no comprueba lo que dice.
- Pruebas desde la spec: un test por criterio de aceptación y por *edge case*.
- Niveles de prueba: unitarias, de integración y de extremo a extremo (e2e).
- Tests antes que el código y tests que mienten. El ciclo de TDD.
- *Quality gates* e integración continua con GitHub Actions.
- El arnés (*harness*) del proyecto y cómo evaluar al agente: batería de casos, intentos repetidos, tres puntuaciones y caso reservado.
- El ecosistema de herramientas de SDD y cómo elegir y combinar.
- MCP: servidores, herramientas, recursos y *prompts*, y su seguridad.

## Dónde se trabaja cada criterio

| Criterio | Temas |
|----------|-------|
| a | [1. Validación y *spec drift*](./01-validacion-spec-drift.md) |
| b | [2. Pruebas desde la spec](./02-pruebas-desde-spec.md) |
| c | [3. *Quality gates* e integración continua](./03-quality-gates.md) |
| d | [1. Validación y *spec drift*](./01-validacion-spec-drift.md) |
| e | [4. El ecosistema de herramientas](./04-ecosistema.md) |
| f | [5. MCP: conectar el agente con sistemas externos](./05-mcp.md) |
| g | [3. *Quality gates* e integración continua](./03-quality-gates.md) |

Cada ejercicio indica en su enunciado los criterios que trabaja.

---

[⬅️ Volver a la unidad](./README.md)
