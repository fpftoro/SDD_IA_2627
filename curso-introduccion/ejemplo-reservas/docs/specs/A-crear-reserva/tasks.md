# Tasks: Crear una reserva

| Campo   | Valor |
|---------|-------|
| Feature | Crear una reserva |
| Plan    | plan.md |
| Estado  | Aprobadas |

## Grupo 1 · Tests de la feature

- [ ] T-01: Tests de la lógica de reservas
  - Fichero: carpeta de tests, un fichero para la lógica
  - Cubre: RF-01, RF-02, RF-03, RNF-01, RNF-02, AC-01 a AC-04, EC-01 a EC-11
  - Terminada cuando: los tests existen y fallan por el motivo correcto (falta el código de las firmas del plan)

> Punto de control: revisar los tests con la spec al lado; después, commit.

## Grupo 2 · Errores y almacenamiento (D-02, D-06, D-07)

- [ ] T-02: Tipo de error y almacenamiento en memoria
  - Ficheros: módulo de errores y módulo de almacenamiento
  - Depende de: T-01
  - Terminada cuando: existen las firmas del plan; los tests de la lógica siguen en rojo

> Punto de control: revisar y commit.

## Grupo 3 · Lógica (D-01, D-03, D-04, D-05, D-08)

- [ ] T-03: Validaciones y creación de la reserva
  - Fichero: módulo de lógica
  - Depende de: T-02
  - Terminada cuando: todos los tests de T-01 pasan

> Punto de control: revisar, ejecutar los tests y commit.

## Grupo 4 · Entrada

- [ ] T-04: Adaptador de entrada
  - Fichero: el de la entrada de tu tecnología
  - Depende de: T-03
  - Terminada cuando: se puede crear una reserva desde la entrada y un error muestra su código y su mensaje (comprobación a mano)

> Punto de control: revisar, ejecutar los tests y commit.
