# Del épico a las features

## Clasificación

| Idea | Nivel | Qué hacer |
|------|-------|-----------|
| L1 | épico | Es el objetivo completo del PRD. Dividir en las features A–F |
| L2 | feature | — (B) |
| L3 | historia | Contexto de B, Reservar un carro (la parte de ver los huecos libres es un requisito de esa spec) |
| L4 | task | Plan de B, Reservar un carro: es la primera feature que guarda reservas |
| L5 | feature | — (D) |
| L6 | épico | Dividir. «Anotar una incidencia» (L8) es la única parte que entra en este PRD; asignar averías, seguir la reparación, dar de baja y pedir repuestos serían features de otro épico, y habría que añadirlas al PRD antes de especificarlas |
| L7 | task | Plan de D, Registrar la devolución: es un paso de su interfaz, sin valor propio |
| L8 | feature | — (E) |
| L9 | task | Plan de A, Consultar los portátiles: es la primera feature y la que necesita el proyecto montado (en el código de partida ya está hecho) |
| L10 | historia | Contexto de C, Registrar el préstamo: saber quién tuvo el último un portátil es el porqué de guardar cada préstamo |
| L11 | feature | — (C) |
| L12 | requisito | Spec de B, Reservar un carro: es un *edge case* (hora fuera de 1.ª–6.ª) con su respuesta |
| L13 | feature | — (A) |
| L14 | task | Plan de C, Registrar el préstamo: los tests salen de sus criterios de aceptación |
| L15 | feature | — (F) |
| L16 | épico | Dividir en informes concretos (uso por departamento, portátiles más averiados…). No está en el PRD: se aparca hasta que el centro lo pida |

## Features

| # | Feature | Valor que aporta | Depende de | Historia de usuario |
|---|---------|------------------|------------|---------------------|
| A | Consultar los portátiles y su estado | La coordinación TIC sabe qué portátiles hay y cuáles están disponibles, prestados o averiados | — | Como coordinadora TIC, quiero ver el estado de cada portátil para saber cuáles se pueden usar |
| B | Reservar un carro | Acaba con las reservas duplicadas, el problema principal del PRD | A | Como profesor, quiero reservar un carro para una hora de clase para tenerlo asegurado sin bajar a la sala de profesores |
| C | Registrar el préstamo de un portátil | Cada portátil prestado tiene una persona responsable | A | Como coordinadora TIC, quiero saber quién tiene cada portátil para reclamarlo cuando falta |
| D | Registrar la devolución de un portátil | El portátil vuelve a estar disponible y queda el historial completo del préstamo | C | Como profesor, quiero registrar la devolución para que conste que he devuelto el portátil |
| E | Anotar una incidencia | Las averías y los cargadores que faltan quedan registrados y el portátil averiado no se presta | A | Como profesor, quiero anotar que un portátil no enciende para que nadie se lo lleve a clase |
| F | Cancelar una reserva | El carro queda libre si el profesor ya no lo necesita | B | Como profesor, quiero cancelar mi reserva para que otro compañero pueda usar el carro |

## Orden

- **Dependencias.** A va primero porque todas las demás trabajan con portátiles o carros que tienen que existir y poder consultarse; además, es la que ya tiene código. D necesita préstamos (C) que devolver, y F necesita reservas (B) que cancelar.
- **Riesgo y valor.** Adelanto B justo después de A: las reservas duplicadas son el problema principal del PRD (más valor) y es la feature con más decisiones por tomar (horas, días lectivos, concurrencia entre dos profesores), así que conviene descubrir pronto sus problemas. Préstamo y devolución (C y D) van después y juntas, porque una no tiene sentido sin la otra.
- **Al final.** F, Cancelar una reserva: aporta menos valor que las demás y, mientras no exista, la coordinación TIC puede cancelar a mano. No está entre los casos de uso del PRD, pero sin ella una reserva equivocada bloquea el carro: propondría añadirla al PRD.

Índice de features: [`docs/specs/README.md`](./docs/specs/README.md)
