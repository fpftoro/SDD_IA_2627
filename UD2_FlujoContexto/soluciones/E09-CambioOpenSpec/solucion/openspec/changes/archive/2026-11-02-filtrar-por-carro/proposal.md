## Why

La coordinación TIC prepara cada mañana los carros y necesita ver de un
vistazo cómo está cada uno. Hoy la lista solo se filtra por estado, y la
spec de la feature A dejó fuera el filtro por carro.

## What Changes

- GET /api/portatiles acepta un parámetro `carro` (A, B o C) que filtra
  los portátiles de ese carro, en el mismo orden por código.
- `carro` se puede combinar con `estado`.
- Un carro que no sea A, B ni C responde 400.
- La spec de la feature A (`docs/specs/A-consultar-portatiles/spec.md`)
  sube a la versión 1.1: el filtro por carro sale del fuera de alcance.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `portatiles`: se añade el filtro por carro.

## Impact

- Servicio y controlador de portátiles, y sus tests.
- Sin dependencias nuevas. Sin cambios en los datos.
