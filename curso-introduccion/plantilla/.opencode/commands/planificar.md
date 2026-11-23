---
description: Propone el plan y las tasks de una feature con la spec aprobada
agent: arquitecto
---
Vamos a planificar la feature de la carpeta docs/specs/$1/.

Lee el índice docs/specs/README.md, la spec aprobada docs/specs/$1/spec.md,
la constitución y las plantillas docs/plantillas/plan.md y
docs/plantillas/tasks.md.

Antes de proponer nada, encarga al subagente explore que averigüe qué
código existente puede reutilizar esta feature.

Escribe docs/specs/$1/plan.md y docs/specs/$1/tasks.md, en estado
Borrador. En el plan incluye la sección «Firmas». En las tasks, el grupo 1
son los tests de la feature.

Reglas:
- No escribas código, ni en ficheros ni dentro del plan.
- No cambies la spec. Si encuentras algo que la spec no decide y que
  notaría quien usa el sistema, márcalo con [NECESITA ACLARACIÓN] y
  explícame la duda.
- Reutiliza lo que ya existe antes de crear nada nuevo.
