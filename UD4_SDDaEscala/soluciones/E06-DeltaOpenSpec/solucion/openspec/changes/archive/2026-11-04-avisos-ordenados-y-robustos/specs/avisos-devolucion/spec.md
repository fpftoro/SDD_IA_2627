## MODIFIED Requirements

### Requirement: Orden de los avisos
El sistema SHALL ordenar los avisos por antigüedad, con el préstamo más antiguo primero. A igual antigüedad SHALL ordenarlos por el nombre del profesor sin distinguir mayúsculas de minúsculas, y a igualdad total SHALL mantener el orden en que llegaron los préstamos.

#### Scenario: El más antiguo primero
- WHEN hay un aviso de ana de 9 días y otro de luis de 68 días
- THEN el aviso de luis va el primero

#### Scenario: Mayúsculas y minúsculas
- WHEN hay avisos de ana, Zoe y Luis con la misma fecha de salida
- THEN el orden es ana, Luis, Zoe

#### Scenario: Mismo profesor y misma antigüedad
- WHEN hay dos avisos de ana con la misma fecha de salida
- THEN salen en el orden en que llegaron los préstamos

## ADDED Requirements

### Requirement: Profesor desconocido
El sistema SHALL redactar `con un profesor desconocido` cuando un préstamo no tiene profesor.

#### Scenario: Préstamo sin profesor
- WHEN el portátil 1 lleva 37 días fuera y su préstamo no tiene profesor
- THEN el aviso es "El portátil 1 lleva 37 días con un profesor desconocido"

### Requirement: Fechas inválidas
El sistema SHALL lanzar un error `La fecha de salida del préstamo <id> no es válida` cuando un préstamo no devuelto tiene una fecha de salida inválida, y un error `La fecha de hoy no es válida` cuando la fecha de hoy es inválida. No SHALL validar la fecha de un préstamo devuelto.

#### Scenario: Fecha de salida inválida
- WHEN el préstamo 3 no está devuelto y su fecha de salida es "ayer"
- THEN se lanza el error "La fecha de salida del préstamo 3 no es válida"

#### Scenario: Fecha de hoy inválida
- WHEN la fecha de hoy es "hoy"
- THEN se lanza el error "La fecha de hoy no es válida"

#### Scenario: Préstamo devuelto con fecha inválida
- WHEN el préstamo 3 está devuelto y su fecha de salida es "ayer"
- THEN no hay error ni aviso de él
