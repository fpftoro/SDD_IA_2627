---
description: Escribe los tests de un grupo de tasks a partir de la spec
agent: build
---
Escribe los tests del grupo $2 de docs/specs/$1/tasks.md, con la skill
tests-desde-spec.

Reglas:
- Solo tests: no escribas código de la aplicación.
- Ejecuta npm test y comprueba que todos los tests nuevos fallan por el
  motivo correcto.
- Si al escribir un test descubres algo que la spec no decide, no lo
  decidas tú: márcalo y explícame la duda.
- Al terminar, marca las tasks del grupo y espera mi revisión.
