---
description: Revisa con el agente plan si una feature cumple su spec, sin modificar nada
agent: plan
---
Revisa la feature de la carpeta docs/specs/$1/: su spec, su plan, el
código que la implementa y sus tests. No modifiques ningún fichero.

Devuelve:

1. La matriz de trazabilidad: una fila por cada identificador de la spec,
   con el test que lo comprueba (fichero y nombre) o «sin test», y si el
   test comprueba de verdad lo que dice el identificador.
2. Los hallazgos: qué pasa, dónde, qué identificador o principio afecta y
   de qué tipo es (hueco en la spec, spec ambigua, error del plan, error
   de implementación o test que no comprueba lo que dice).

Cita siempre el fichero y el identificador. Si no hay hallazgos, dilo: no
inventes ninguno.
