---
description: Implementa un grupo de tasks de una feature
agent: build
---
Implementa el grupo $2 de docs/specs/$1/tasks.md.

Si el grupo tiene una task de tests, hazla primero: escribe los tests,
ejecuta npm test y comprueba que fallan. Después la de implementación:
escribe lo mínimo para que pasen y vuelve a ejecutar npm test.

Reglas:
- Haz solo las tasks de ese grupo. No crees ni modifiques ficheros que no
  aparezcan en ellas, salvo para marcarlas en tasks.md.
- No cambies un test para que pase. Si crees que un test está mal, dímelo.
- Si algo no encaja con la spec, el plan o la constitución, para y
  pregúntame.
- Al terminar, marca las tasks del grupo con [x] en tasks.md y espera mi
  revisión.
