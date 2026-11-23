# Avisos de devolución

## Purpose

Generar cada mañana el texto de los portátiles que llevan una semana o más
fuera, para que la coordinación TIC los reclame. Es la feature G del
proyecto (`docs/specs/G-avisos-devolucion/spec.md`).

## Requirements

### Requirement: Aviso por cada préstamo con 7 o más días fuera
El sistema SHALL generar un aviso por cada préstamo cuyo estado no sea
`devuelto` y que lleve 7 o más días fuera, contando los días completos entre
la fecha de salida y hoy.

#### Scenario: Un portátil lleva más de una semana fuera
- WHEN hoy es 2027-03-10 y el portátil 4 salió el 2027-02-01
- THEN hay un aviso de 37 días para el portátil 4

#### Scenario: El límite son 7 días
- WHEN hoy es 2027-03-10 y el portátil 1 salió el 2027-03-03 y el portátil 2 el 2027-03-04
- THEN solo hay aviso del portátil 1, de 7 días

### Requirement: Préstamos de los que no se avisa
El sistema SHALL no avisar de los préstamos devueltos ni de los que tienen
la fecha de salida posterior a hoy, y SHALL avisar de los préstamos en
cualquier otro estado, como `perdido`.

#### Scenario: Préstamo devuelto
- WHEN un préstamo está devuelto
- THEN no hay aviso de él

#### Scenario: Préstamo perdido
- WHEN un préstamo está en estado perdido y lleva 37 días fuera
- THEN hay un aviso de él

### Requirement: Texto del aviso
El sistema SHALL redactar cada aviso como `El portátil <portatil> lleva
<días> días con <profesor>`, y SHALL añadir ` (sin cargador)` cuando el
cargador del préstamo es falso.

#### Scenario: Aviso con cargador
- WHEN el portátil 4 lleva 37 días con ana, con cargador
- THEN el aviso es "El portátil 4 lleva 37 días con ana"

#### Scenario: Aviso sin cargador
- WHEN el portátil 7 lleva 9 días con luis, sin cargador
- THEN el aviso es "El portátil 7 lleva 9 días con luis (sin cargador)"

### Requirement: Resultado como un único texto
El sistema SHALL devolver los avisos como un único texto con un aviso por
línea, y SHALL devolver el texto `Sin avisos` cuando no haya ninguno.

#### Scenario: Sin ningún aviso
- WHEN no hay ningún préstamo con aviso
- THEN el resultado es "Sin avisos"

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
