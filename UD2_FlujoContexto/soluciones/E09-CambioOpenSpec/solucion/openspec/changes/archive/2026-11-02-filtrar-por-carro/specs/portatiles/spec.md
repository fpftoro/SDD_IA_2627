## ADDED Requirements

### Requirement: Filtro por carro
El sistema SHALL devolver solo los portátiles del carro pedido en el
parámetro carro (A, B o C), ordenados por código. El filtro SHALL
combinarse con el de estado cuando se envían los dos.

#### Scenario: Ver los portátiles de un carro
- WHEN se envía una petición GET /api/portatiles?carro=B
- THEN la respuesta tiene el código 200
- AND el cuerpo tiene P-02, P-04 y P-06, en ese orden

#### Scenario: Carro y estado a la vez
- WHEN se envía una petición GET /api/portatiles?carro=A&estado=disponible
- THEN la respuesta tiene el código 200
- AND el cuerpo tiene P-01 y P-05, en ese orden

#### Scenario: Carro sin portátiles
- WHEN se envía una petición GET /api/portatiles?carro=C
- THEN la respuesta tiene el código 200 y una lista vacía

### Requirement: Carro no válido
El sistema SHALL responder 400 con { error: "El carro debe ser A, B o C" }
si el parámetro carro no es A, B ni C, escrito exactamente así. Si el
estado tampoco es válido, SHALL responder el error del estado.

#### Scenario: Carro que no existe
- WHEN se envía una petición GET /api/portatiles?carro=Z
- THEN la respuesta tiene el código 400
- AND el cuerpo es { error: "El carro debe ser A, B o C" }

#### Scenario: Carro y estado no válidos
- WHEN se envía una petición GET /api/portatiles?carro=Z&estado=roto
- THEN la respuesta tiene el código 400
- AND el cuerpo es { error: "El estado debe ser disponible, prestado o averiado" }
