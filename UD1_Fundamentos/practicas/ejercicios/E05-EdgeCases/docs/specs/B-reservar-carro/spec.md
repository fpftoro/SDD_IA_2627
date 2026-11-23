# Spec: Reservar un carro

## Metadatos

| Campo   | Valor             |
|---------|-------------------|
| Feature | Reservar un carro |
| Estado  | Borrador          |
| Versión | 0.1               |
| Fecha   | AAAA-MM-DD        |
| Autor   | <nombre>          |

---

## Contexto

El profesorado reserva un carro de portátiles para una hora de clase. Hoy
las reservas se apuntan en una hoja de papel y a menudo dos profesores
cuentan con el mismo carro a la misma hora.

**Historia de usuario:** como profesor, quiero reservar un carro para una
hora de clase para tenerlo asegurado sin bajar a la sala de profesores.

**Dependencias:** feature A (Consultar los portátiles). El centro tiene los
carros `A`, `B` y `C`. Hay clase de lunes a viernes, de 1.ª a 6.ª hora.

---

## Requisitos funcionales

- RF-01: El sistema deberá permitir reservar un carro para un día y una
  hora de clase (de 1.ª a 6.ª).
- RF-02: El sistema deberá guardar cada reserva con un identificador, el
  carro, el día, la hora y el profesor que la hace.
- RF-03: El sistema deberá mostrar en el calendario de la semana las
  reservas de cada carro, con el nombre del profesor.

La reserva se hace con `POST /api/reservas` y este cuerpo:

```json
{ "carro": "A", "dia": "AAAA-MM-DD", "hora": 3 }
```

---

## Requisitos no funcionales

- RNF-01: El endpoint de reservas responderá en menos de 300 ms con 500
  reservas guardadas.
- RNF-02: El profesor de la reserva se toma del usuario que ha iniciado
  sesión, nunca del cuerpo de la petición.
- RNF-03: El día se guarda y se devuelve en formato ISO 8601 (`AAAA-MM-DD`).

---

## Criterios de aceptación

- AC-01: Dado el carro A libre el próximo martes a 3.ª hora, cuando un
  profesor lo reserva, entonces recibe un 201 con la reserva creada.
- AC-02: Dado que un profesor ha reservado el carro A el martes a 3.ª hora,
  cuando cualquier profesor abre el calendario de esa semana, entonces ve
  la reserva en el martes, 3.ª hora, a nombre de quien la hizo.
