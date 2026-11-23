---
description: Propone el plan técnico y las tasks de una feature con la spec aprobada
agent: arquitecto
---
Vamos a planificar la feature de la carpeta docs/specs/$1/.

Lee el índice docs/specs/README.md, la spec aprobada docs/specs/$1/spec.md
y, como ejemplo de formato y de decisiones ya tomadas, el plan y las tasks
de la feature B (docs/specs/B-ver-lista/).

Antes de proponer nada, encarga al subagente explore que averigüe qué
código existente puede reutilizar esta feature. No leas tú esos ficheros
enteros.

Escribe docs/specs/$1/plan.md y docs/specs/$1/tasks.md, en estado
Borrador, con las secciones y el formato de la feature B: visión general,
contexto técnico, comprobación de la constitución, ficheros (con una
columna «Nuevo o modificado»), decisiones técnicas (D-01, D-02… con el
motivo, la alternativa descartada y los identificadores de la spec que
cubre), dependencias, secuencia, estrategia de pruebas (una fila por cada
identificador de la spec) y riesgos.

Reglas:
- No escribas código, ni en ficheros ni dentro del plan.
- No cambies la spec. Si encuentras algo que la spec no decide y que se
  notaría desde fuera, márcalo con [NECESITA ACLARACIÓN] y explícame la
  duda.
- Reutiliza lo que ya existe antes de crear nada nuevo.
