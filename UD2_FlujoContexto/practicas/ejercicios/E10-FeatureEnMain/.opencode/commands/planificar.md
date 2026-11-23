---
description: Propone el plan técnico de una feature con la spec aprobada
agent: plan
---
Vamos a planificar la feature de la carpeta docs/specs/$1/.

Lee el índice docs/specs/README.md, la spec aprobada
docs/specs/$1/spec.md y, como ejemplo de formato y de decisiones ya
tomadas, el plan de la última feature implementada del índice.

Antes de proponer nada, encarga al subagente explore que averigüe qué
código existente puede reutilizar esta feature. No leas tú esos ficheros
enteros.

Propón el plan técnico con estas secciones: visión general, contexto
técnico, comprobación de la constitución, ficheros, decisiones técnicas
(D-01, D-02… con el motivo, la alternativa descartada y los
identificadores de la spec que cubre), dependencias, secuencia de
implementación con el porqué del orden, estrategia de pruebas (una fila
por cada identificador de la spec, con el tipo de prueba: unitaria, de
integración o a mano) y riesgos.

Reglas:
- No escribas código, ni en ficheros ni dentro del plan.
- No cambies la spec. Si encuentras algo que la spec no decide y que se
  notaría desde fuera del sistema, márcalo con [NECESITA ACLARACIÓN] y
  explícame la duda.
- Si una decisión contradice la constitución, dímelo en lugar de tomarla.
- Reutiliza lo que ya existe antes de crear nada nuevo.
