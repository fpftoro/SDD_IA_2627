# language: es
Característica: Registrar el préstamo de un portátil

  Antecedentes:
    Dado que existen estos portátiles:
      | codigo | estado     |
      | P-01   | disponible |
      | P-02   | prestado   |
      | P-03   | averiado   |
    Y un profesor ha iniciado sesión

  Escenario: AC-01 Prestar un portátil disponible
    Cuando el profesor registra el préstamo de P-01
    Entonces la respuesta tiene el código 201 y contiene el préstamo
    Y P-01 está prestado
    Y la fecha límite del préstamo es hoy a las 14:30

  Escenario: AC-02 Prestar un portátil que ya está prestado
    Cuando el profesor registra el préstamo de P-02
    Entonces la respuesta tiene el código 409
    Y el cuerpo contiene el error "El portátil ya está prestado"

  Escenario: AC-03 Prestar un portátil averiado
    Cuando el profesor registra el préstamo de P-03
    Entonces la respuesta tiene el código 409
    Y el cuerpo contiene el error "El portátil está averiado"

  Esquema del escenario: AC-04 Identificador de portátil no válido
    Cuando el profesor registra un préstamo con el portatilId <portatilId>
    Entonces la respuesta tiene el código 400
    Y el cuerpo contiene el error "El portátil no es válido"

    Ejemplos:
      | portatilId |
      | ""         |
      | "abc"      |
      | 0          |
      | -3         |

  Escenario: AC-05 Préstamo durante el inventario
    Dado que el modo inventario está activado
    Cuando el profesor registra el préstamo de P-01
    Entonces la respuesta tiene el código 409
    Y el cuerpo contiene el error "Préstamos cerrados por inventario"
    Y P-01 sigue disponible
