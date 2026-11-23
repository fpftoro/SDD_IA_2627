---
description: Revisa con el subagente revisor si una feature cumple su spec
agent: revisor
subagent: true
---
Revisa la feature de la carpeta docs/specs/$1/: su spec, su plan, el
código que la implementa y sus tests.

Devuelve:

1. La matriz de trazabilidad: una fila por cada identificador de la
   spec, con el test que lo comprueba (fichero y nombre del test), «a
   mano» si el plan dice que se comprueba a mano o «sin test», y si el
   test comprueba de verdad lo que dice el identificador.
2. Los hallazgos: qué pasa, dónde (fichero y línea), qué identificador
   o principio afecta y de qué tipo es.
