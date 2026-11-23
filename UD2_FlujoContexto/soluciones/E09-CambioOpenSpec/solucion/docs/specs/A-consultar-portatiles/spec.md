# Spec: Consultar los portátiles

## Metadatos

| Campo   | Valor                    |
|---------|--------------------------|
| Feature | Consultar los portátiles |
| Estado  | Implementada             |
| Versión | 1.1                      |
| Fecha   | AAAA-MM-DD               |
| Autor   | <nombre>                 |

---

## Contexto

El profesorado consulta qué portátiles hay, en qué carro está cada uno y
si está disponible, prestado o averiado, antes de reservar un carro.

**Historia de usuario:** como profesor, quiero ver el estado de los
portátiles para saber si un carro me sirve antes de reservarlo.

**Dependencias:** ninguna (es la primera feature).

---

## Requisitos funcionales

- RF-01: Cuando se pida la lista de portátiles, el sistema deberá
  devolver todos los portátiles, cada uno con los campos id, codigo,
  carro y estado, ordenados por código.
- RF-02: Cuando se pida la lista con el parámetro estado, el sistema
  deberá devolver solo los portátiles con ese estado, en el mismo orden.
- RF-03: Cuando se pida un portátil por su identificador, el sistema
  deberá devolverlo con los mismos campos.
- RF-04: Cuando se pida la lista con el parámetro carro, el sistema
  deberá devolver solo los portátiles de ese carro, en el mismo orden,
  combinado con el filtro de estado si también se envía.

---

## Requisitos no funcionales

- RNF-01: La petición de la lista deberá responder en menos de 200 ms
  con 500 portátiles guardados.

---

## Criterios de aceptación

```gherkin
# language: es
Característica: Consultar los portátiles

  Antecedentes:
    Dado que existen los portátiles:
      | id | codigo | carro | estado     |
      | 1  | P-01   | A     | disponible |
      | 2  | P-02   | B     | prestado   |
      | 3  | P-03   | A     | averiado   |
      | 4  | P-04   | B     | disponible |
      | 5  | P-05   | A     | disponible |
      | 6  | P-06   | B     | prestado   |

  Escenario: AC-01 Ver todos los portátiles
    Cuando se envía una petición GET /api/portatiles
    Entonces la respuesta tiene el código 200
    Y el cuerpo tiene los 6 portátiles ordenados por código, de P-01 a P-06

  Escenario: AC-02 Ver solo los disponibles
    Cuando se envía una petición GET /api/portatiles?estado=disponible
    Entonces la respuesta tiene el código 200
    Y el cuerpo tiene P-01, P-04 y P-05, en ese orden

  Escenario: AC-03 Consultar un portátil
    Cuando se envía una petición GET /api/portatiles/3
    Entonces la respuesta tiene el código 200
    Y el cuerpo es el portátil P-03 del carro A, averiado
```

---

## Edge cases y comportamiento ante errores

- EC-01: Si el estado no es disponible, prestado ni averiado (escrito
  exactamente así), entonces el sistema deberá responder 400 con
  { error: "El estado debe ser disponible, prestado o averiado" }.
- EC-02: Si no existe ningún portátil con ese identificador, entonces el
  sistema deberá responder 404 con { error: "El portátil no existe" }.
- EC-03: Si el identificador no es un número entero positivo, entonces
  el sistema deberá responder 400 con
  { error: "El identificador debe ser un número entero positivo" }.
- EC-04: Si ningún portátil tiene el estado pedido, entonces el sistema
  deberá responder 200 con una lista vacía.
- EC-05: Si el servidor no puede leer los portátiles, entonces deberá
  responder 500 con { error: "Error al consultar los portátiles" }.
- EC-06: Si el carro no es A, B ni C (escrito exactamente así), entonces
  el sistema deberá responder 400 con
  { error: "El carro debe ser A, B o C" }.
- EC-07: Si el estado y el carro no son válidos, entonces el sistema
  deberá responder el error del estado (EC-01).

---

## Fuera de alcance

- Dar de alta, modificar o dar de baja portátiles.
- Ordenar de otra forma.
- Filtrar por varios carros a la vez.
- La página web: esta feature es solo la API.

---

## Referencias

- docs/prd.md
