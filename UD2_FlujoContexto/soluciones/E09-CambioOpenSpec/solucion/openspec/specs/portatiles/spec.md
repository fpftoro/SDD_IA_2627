# Portátiles

## Purpose

Consultar los portátiles del centro, en qué carro está cada uno y si está
disponible, prestado o averiado. Es la feature A del proyecto
(`docs/specs/A-consultar-portatiles/spec.md`).

## Requirements

### Requirement: Lista de portátiles
El sistema SHALL devolver todos los portátiles con los campos id, codigo,
carro y estado, ordenados por código, cuando se pida GET /api/portatiles.

#### Scenario: Ver todos los portátiles
- WHEN se envía una petición GET /api/portatiles
- THEN la respuesta tiene el código 200
- AND el cuerpo tiene los 6 portátiles ordenados por código, de P-01 a P-06

### Requirement: Filtro por estado
El sistema SHALL devolver solo los portátiles con el estado pedido en el
parámetro estado, en el mismo orden, y SHALL responder 400 con
{ error: "El estado debe ser disponible, prestado o averiado" } si el
estado no es uno de esos tres.

#### Scenario: Ver solo los disponibles
- WHEN se envía una petición GET /api/portatiles?estado=disponible
- THEN la respuesta tiene el código 200
- AND el cuerpo tiene P-01, P-04 y P-05, en ese orden

#### Scenario: Estado no válido
- WHEN se envía una petición GET /api/portatiles?estado=roto
- THEN la respuesta tiene el código 400

#### Scenario: Ningún portátil con ese estado
- WHEN ningún portátil tiene el estado pedido
- THEN la respuesta tiene el código 200 y una lista vacía

### Requirement: Un portátil
El sistema SHALL devolver un portátil con los mismos campos cuando se pida
GET /api/portatiles/:id, SHALL responder 404 con
{ error: "El portátil no existe" } si no existe y 400 con
{ error: "El identificador debe ser un número entero positivo" } si el
identificador no es un número entero positivo.

#### Scenario: Consultar un portátil
- WHEN se envía una petición GET /api/portatiles/3
- THEN la respuesta tiene el código 200
- AND el cuerpo es el portátil P-03 del carro A, averiado

#### Scenario: Portátil que no existe
- WHEN se envía una petición GET /api/portatiles/99
- THEN la respuesta tiene el código 404

### Requirement: Errores y rendimiento
El sistema SHALL responder 500 con
{ error: "Error al consultar los portátiles" } si no puede leer los
portátiles, y SHALL responder a la lista en menos de 200 ms con 500
portátiles guardados.

#### Scenario: Fallo al leer
- WHEN el servidor no puede leer los portátiles
- THEN la respuesta tiene el código 500

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
