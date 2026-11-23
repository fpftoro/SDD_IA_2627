# Doce fallos del préstamo de portátiles

Cada caso tiene lo que ha pasado y los fragmentos que necesitas de la
spec, el plan, el código o los tests. Los identificadores son los de cada
feature (A: Consultar los portátiles; B: Reservar un carro; C: Registrar
el préstamo; E: Anotar una incidencia).

---

## Caso 1

Un profesor escribe: «He pedido `/api/portatiles?estado=Prestado` y me da
un error 400. ¡Es la misma palabra!».

Spec de A:

```markdown
- EC-01: Si el estado no es disponible, prestado ni averiado (escrito
  exactamente así), entonces el sistema deberá responder 400 con
  { error: "El estado debe ser disponible, prestado o averiado" }.
```

---

## Caso 2

`GET /api/portatiles/99` responde `200` con el cuerpo `null`.

Spec de A:

```markdown
- EC-02: Si no existe ningún portátil con ese identificador, entonces el
  sistema deberá responder 404 con { error: "El portátil no existe" }.
```

Plan de A: «D-02: Portátil que no existe (EC-02): el servicio lanza
ErrorNoEncontrado; el controlador responde 404».

Controlador:

```javascript
export function buscarPortatilHttp(peticion, respuesta) {
  respuesta.status(200).json(buscarPortatil(peticion.params.id) ?? null);
}
```

---

## Caso 3

Pasada la medianoche, una profesora reserva un carro para **ayer** sin que
el sistema se queje. Durante el día no pasa.

Spec de B:

```markdown
- EC-03: Si la fecha es anterior a hoy, entonces el sistema deberá
  responder 400 con { error: "No se puede reservar en una fecha pasada" }.
- RNF-02: «Hoy» es la fecha en la hora peninsular española.
```

Plan de B: «D-04: Fecha de hoy (EC-03): `new Date().toISOString().slice(0, 10)`».
El servicio lo hace exactamente así. (`toISOString` da la fecha y la hora
en UTC.)

---

## Caso 4

La coordinación TIC anota una avería en un portátil que está prestado. La
API lo pone `averiado`, pero el préstamo sigue abierto, y al devolverlo la
API responde que «el portátil no está prestado».

Spec de E:

```markdown
- RF-03: Cuando se anote una incidencia de tipo averia o dano-fisico,
  el sistema deberá cambiar el estado del portátil a averiado.
```

Ninguna otra parte de las specs de C, D o E habla de un portátil prestado
que se avería.

---

## Caso 5

Al reservar dos veces el mismo carro, en la misma fecha y franja, la
segunda respuesta es `409` con `{ error: "Conflict" }`.

Spec de B:

```markdown
- EC-02: Si el carro ya está reservado en esa fecha y franja, entonces el
  sistema deberá responder 409 con
  { error: "El carro ya está reservado en esa franja" }.
```

Test:

```javascript
test('B-EC-02: rechaza una franja ocupada', async () => {
  await reservar({ carro: 'A', fecha: '2030-03-12', franja: 3 });
  const respuesta = await reservar({ carro: 'A', fecha: '2030-03-12', franja: 3 });

  expect(respuesta.status).toBe(409);
});
```

---

## Caso 6

La jefa de estudios pide: «Cuando alguien reserve un carro, que me llegue
un correo».

PRD: «Fuera de alcance: datos personales del alumnado, inicio de sesión,
notificaciones».

---

## Caso 7

Un profesor no puede reservar el carro A en la franja 4 porque otro lo
tiene reservado en la franja 1 del mismo día.

Spec de B:

```markdown
- RF-01: Cuando se envíe una reserva con un carro, una fecha y una
  franja (de 1 a 6), el sistema deberá guardarla …
- EC-02: Si el carro ya está reservado ese día, entonces el sistema
  deberá responder 409 …
```

El código comprueba si existe cualquier reserva del carro en esa fecha.

---

## Caso 8

Al revisar los tests de A, ves este:

```javascript
test('A-EC-04: responde 200 con una lista vacía si ninguno tiene ese estado', async () => {
  vi.spyOn(servicio, 'listarPortatiles').mockReturnValue([]);

  const respuesta = await request(app).get('/api/portatiles?estado=averiado');

  expect(respuesta.status).toBe(200);
  expect(respuesta.body).toEqual([]);
});
```

Pruebas el endpoint a mano con un repositorio sin averiados y responde
`200` con `[]`, como dice la spec.

---

## Caso 9

El revisor informa: «El test de A-EC-05 solo comprueba el código 500».

```javascript
test('A-EC-05: responde 500 si no se pueden leer los portátiles', async () => {
  vi.spyOn(repositorioPortatiles, 'obtenerTodos').mockImplementation(() => {
    throw new Error('Fallo');
  });

  const respuesta = await request(app).get('/api/portatiles');

  expect(respuesta.status).toBe(500);
});
```

Lo compruebas: la API responde `500` con
`{ error: "Error al consultar los portátiles" }`, el mensaje exacto de la
spec.

---

## Caso 10

Nadie puede reservar la franja 6: la API responde `400` con «La franja
debe ser un número del 1 al 6».

Spec de B: «RF-01: … una franja (de 1 a 6) …» y «EC-04: Si la franja no
es un número entero del 1 al 6, entonces … 400 …».

Plan de B: «D-03: Franjas válidas: de 1 a 5, una por cada hora lectiva de
la mañana».

El servicio comprueba `franja >= 1 && franja <= 5`.

---

## Caso 11

Un profesor registra el préstamo de un portátil que está `averiado`, y la
API lo acepta y lo marca como `prestado`.

Spec de C: los requisitos hablan de portátiles disponibles; los *edge
cases* tratan el portátil que no existe, el que ya está prestado y los
datos que faltan. Nada sobre un portátil averiado.

---

## Caso 12

Una descripción de incidencia de 260 caracteres con muchas tildes y eñes
se rechaza con «La descripción no puede superar 500 caracteres».

Spec de E: «La descripción es obligatoria y tiene como mucho 500
caracteres».

Código: `Buffer.byteLength(descripcion) > 500`. En UTF-8, cada letra con
tilde ocupa dos bytes.
