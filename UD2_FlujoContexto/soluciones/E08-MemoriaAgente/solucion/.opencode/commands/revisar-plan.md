---
description: Revisa el plan de una feature con la lista del punto de control 2, sin cambiarlo
agent: plan
---
Revisa el plan docs/specs/$1/plan.md con la lista del punto de control 2.
Lee también la spec docs/specs/$1/spec.md. La constitución ya la tienes.

Para cada línea de la lista, di si el plan la cumple y, si no, dónde
falla (sección o decisión D-xx) y qué propones:

- Respeto a la constitución: la comprobación recorre todos sus
  principios; arquitectura y tecnología de la constitución; errores con
  el formato acordado.
- Cobertura de la spec: cada identificador en la estrategia de pruebas,
  con un tipo de prueba que lo ve; nada que la spec no diga; nada que la
  contradiga.
- Decisiones: motivo y alternativa descartada; dependencias justificadas;
  sin sobreingeniería.
- Viabilidad: secuencia posible; sin suposiciones falsas sobre el código;
  sin código en el plan.

Reglas:
- No modifiques ningún fichero.
- Si el plan decide algo que se nota desde fuera y la spec no lo dice,
  márcalo como hueco de la spec; no lo resuelvas tú.
- Termina con «se puede aprobar» o «hay que corregir», y la lista de
  correcciones.
