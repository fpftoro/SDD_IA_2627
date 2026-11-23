# Objetivo de aprendizaje y criterios de evaluación - UD4

[⬅️ Volver a la unidad](./README.md)

Unidad 4 SDD a escala: varios agentes, equipos y proyectos reales. Curso de desarrollo guiado por especificaciones con IA.

Este curso no tiene resultados de aprendizaje oficiales: el objetivo y los criterios son propios del curso y siguen el estilo de los del currículo de Formación Profesional.

- [Objetivo de aprendizaje](#objetivo-de-aprendizaje)
- [Criterios de evaluación](#criterios-de-evaluación)
- [Contenidos](#contenidos)
- [Dónde se trabaja cada criterio](#dónde-se-trabaja-cada-criterio)

---

## Objetivo de aprendizaje

**OA4.** Aplica el desarrollo guiado por especificaciones en escenarios complejos (varios agentes, equipos, código existente), reconociendo patrones, riesgos y antipatrones.

## Criterios de evaluación

| Criterio | Criterio de evaluación |
|----------|------------------------|
| a | Se han caracterizado las topologías y los roles de un sistema multiagente y el trabajo en paralelo. |
| b | Se han definido *handoffs* entre agentes y medidas de seguridad y trazabilidad. |
| c | Se ha descrito el papel de cada rol de un equipo en el flujo y la gobernanza de la constitución. |
| d | Se ha aplicado SDD en proyectos nuevos y en código existente (*brownfield*, refactorizaciones y migraciones). |
| e | Se han identificado antipatrones del flujo y se han propuesto correcciones. |

## Contenidos

- Por qué repartir el trabajo entre varios agentes y cuándo no compensa.
- Orquestación y coreografía. Topologías: en cadena, jerárquica y en red.
- Roles de un sistema multiagente: quien especifica y planifica, quien implementa y quien cuida la calidad.
- Subagentes en OpenCode: encargos, permisos y un modelo para cada papel.
- Trabajo en paralelo con *worktrees* de Git.
- *Handoffs*: qué necesita el agente que recibe el trabajo.
- Meta-mantenimiento: mejorar la memoria del agente con lo aprendido.
- Seguridad y trazabilidad cuando trabajan varios agentes.
- SDD en un equipo: roles, la spec como contrato y gobernanza de la constitución.
- SDD en proyectos nuevos y en código existente: specs del comportamiento actual, cambios con specs delta, refactorizaciones y migraciones.
- Antipatrones del flujo y cómo corregirlos.

## Dónde se trabaja cada criterio

| Criterio | Temas |
|----------|-------|
| a | [1. Varios agentes: orquestación, roles y trabajo en paralelo](./01-multiagente.md) |
| b | [1. Varios agentes: orquestación, roles y trabajo en paralelo](./01-multiagente.md) |
| c | [2. SDD en equipo](./02-sdd-en-equipo.md) |
| d | [3. Casos prácticos: proyectos nuevos y código existente](./03-casos-practicos.md) |
| e | [4. Antipatrones del flujo](./04-antipatrones.md) |

Cada ejercicio indica en su enunciado los criterios que trabaja.

---

[⬅️ Volver a la unidad](./README.md)
