---
description: Escribe los tests de una feature a partir de su spec y su plan
agent: probador
---
Escribe los tests de la feature de la carpeta docs/specs/$1/, a partir de
su spec aprobada y de las firmas de su plan aprobado.

Reglas:
- Solo tests: no escribas código de la aplicación.
- Un test por cada criterio de aceptación y por cada edge case, con la
  letra de la feature y el identificador en el nombre.
- Ejecuta los tests y enséñame que fallan por el motivo correcto.
- Si descubres algo que la spec no decide, márcalo y explícame la duda.
- Al terminar, marca las tasks de tests y espera mi revisión.
