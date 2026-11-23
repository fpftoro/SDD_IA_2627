# Más allá del camino feliz

Spec completada: [`docs/specs/B-reservar-carro/spec.md`](./docs/specs/B-reservar-carro/spec.md)

## Edge cases por tipo

| Tipo | Edge cases |
|------|------------|
| Dato ausente o vacío | EC-01 |
| Formato inválido | EC-02, EC-05, EC-13 |
| Valor fuera de rango | EC-03, EC-04, EC-09 |
| Valor en el límite | EC-04 (1.ª y 6.ª hora válidas), EC-08 (una hora de hoy que aún no ha empezado) |
| Regla del calendario (fin de semana, festivo, pasado) | EC-06, EC-07, EC-08 |
| Duplicado | EC-10, EC-12 |
| Concurrencia | EC-11 |
| Fallo externo | EC-14 |

## Dudas marcadas

| Dónde (identificador) | Pregunta | A quién se la harías |
|-----------------------|----------|----------------------|
| EC-07 | ¿Se rechaza una reserva en un día festivo o no lectivo, o solo se avisa? ¿Quién mantiene el calendario de días no lectivos y cómo llega al sistema? | Jefatura de estudios (calendario) y coordinación TIC (cómo se carga) |
| EC-09 | ¿Con cuánta antelación máxima se puede reservar? ¿Dos semanas, como propuso la coordinación TIC, o sin límite? | Dirección del centro, a propuesta de la coordinación TIC |
| EC-12 | ¿Puede un profesor reservar dos carros a la misma hora (por ejemplo, para un desdoble)? | Coordinación TIC |

## Estado de la spec

Sigue en **Borrador** (versión 0.2). Tiene tres `[NECESITA ACLARACIÓN]` y una spec con marcadores no se puede aprobar: si se la diéramos así al agente, decidiría él el límite de antelación, qué hacer con los festivos y los desdobles. Cuando las tres preguntas tengan respuesta y estén escritas en la spec, pasará a **En revisión**, y solo después de revisarla, a **Aprobada**.
