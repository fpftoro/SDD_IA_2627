import request from 'supertest';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { app } from '../src/app.js';
import { repositorioReservas } from '../src/repositorios/repositorio-reservas.js';
import { reloj } from '../src/utilidades/reloj.js';

function comoUsuario(peticion, usuario = 'ana') {
  return peticion.set('X-Usuario', usuario).set('X-Papel', 'profesor');
}

function reservar(cuerpo, usuario) {
  return comoUsuario(request(app).post('/api/reservas'), usuario).send(cuerpo);
}

function consultar(consulta, usuario) {
  return comoUsuario(request(app).get(`/api/reservas${consulta}`), usuario);
}

beforeEach(() => {
  repositorioReservas.vaciar();
  vi.spyOn(reloj, 'hoy').mockReturnValue('2027-03-01');
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('POST /api/reservas', () => {
  test('RF-01, RF-02, AC-01: responde 201 con la reserva creada', async () => {
    const respuesta = await reservar({ carro: 'A', dia: '2027-03-02', hora: 3 });

    expect(respuesta.status).toBe(201);
    expect(respuesta.body).toEqual({
      id: expect.any(String),
      carro: 'A',
      dia: '2027-03-02',
      hora: 3,
      profesor: 'ana',
    });
  });

  test('AC-02, EC-10: responde 409 si el carro ya está reservado a esa hora', async () => {
    await reservar({ carro: 'A', dia: '2027-03-02', hora: 3 }, 'luis');

    const respuesta = await reservar({ carro: 'A', dia: '2027-03-02', hora: 3 });

    expect(respuesta.status).toBe(409);
    expect(respuesta.body).toEqual({
      error: 'El carro ya está reservado a esa hora',
    });
  });

  test('AC-03: la 6.ª hora y el último día permitido son válidos', async () => {
    const respuesta = await reservar({ carro: 'B', dia: '2027-03-15', hora: 6 });

    expect(respuesta.status).toBe(201);
  });

  test('RNF-02, EC-11: ignora el profesor y los campos que no se esperan', async () => {
    const respuesta = await reservar({
      carro: 'A',
      dia: '2027-03-02',
      hora: 3,
      profesor: 'luis',
      notas: 'para 2.º B',
    });

    expect(respuesta.status).toBe(201);
    expect(respuesta.body.profesor).toBe('ana');
    expect(respuesta.body).not.toHaveProperty('notas');
  });

  test('EC-01: responde 401 sin la identificación del centro', async () => {
    const respuesta = await request(app)
      .post('/api/reservas')
      .send({ carro: 'A', dia: '2027-03-02', hora: 3 });

    expect(respuesta.status).toBe(401);
    expect(respuesta.body).toEqual({ error: 'Tienes que identificarte' });
  });

  test('EC-02: responde 400 si falta un campo', async () => {
    const respuesta = await reservar({ carro: 'A', dia: '2027-03-02' });

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({
      error: 'Los campos carro, dia y hora son obligatorios',
    });
  });

  test('EC-03: responde 400 si un campo no tiene el formato correcto', async () => {
    const respuesta = await reservar({ carro: 'A', dia: '2027-03-02', hora: '3' });

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({
      error: 'Los datos de la reserva no tienen el formato correcto',
    });
  });

  test('EC-04: responde 404 si el carro no existe', async () => {
    const respuesta = await reservar({ carro: 'Z', dia: '2027-03-02', hora: 3 });

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'El carro no existe' });
  });

  test('EC-12: responde 500 si no se puede guardar, y no queda la reserva', async () => {
    vi.spyOn(repositorioReservas, 'guardar').mockImplementation(() => {
      throw new Error('Fallo al guardar');
    });

    const respuesta = await reservar({ carro: 'A', dia: '2027-03-02', hora: 3 });

    expect(respuesta.status).toBe(500);
    expect(respuesta.body).toEqual({ error: 'No se ha podido guardar la reserva' });
    expect(repositorioReservas.obtenerPorDia('2027-03-02')).toEqual([]);
  });

  test('RNF-01: responde en menos de 300 ms con 500 reservas guardadas', async () => {
    for (let numero = 0; numero < 500; numero += 1) {
      repositorioReservas.guardar({
        id: `r-${numero}`,
        carro: 'C',
        dia: `2026-${String((numero % 12) + 1).padStart(2, '0')}-10`,
        hora: (numero % 6) + 1,
        profesor: 'luis',
      });
    }

    const inicio = performance.now();
    const respuesta = await reservar({ carro: 'A', dia: '2027-03-02', hora: 3 });
    const duracion = performance.now() - inicio;

    expect(respuesta.status).toBe(201);
    expect(duracion).toBeLessThan(300);
  });
});

describe('GET /api/reservas', () => {
  test('RF-03, AC-05: responde 200 con las reservas del día y ninguna más', async () => {
    const deAna = await reservar({ carro: 'A', dia: '2027-03-02', hora: 3 });
    const deLuis = await reservar({ carro: 'B', dia: '2027-03-02', hora: 1 }, 'luis');
    await reservar({ carro: 'A', dia: '2027-03-03', hora: 2 }, 'luis');

    const respuesta = await consultar('?dia=2027-03-02');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual([deLuis.body, deAna.body]);
  });

  test('EC-01: responde 401 sin la identificación del centro', async () => {
    const respuesta = await request(app).get('/api/reservas?dia=2027-03-02');

    expect(respuesta.status).toBe(401);
  });

  test.each(['', '?dia=02/03/2027'])(
    'EC-13: responde 400 con la consulta «%s»',
    async (consulta) => {
      const respuesta = await consultar(consulta);

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({
        error: 'Indica el día con el formato AAAA-MM-DD',
      });
    },
  );

  test('EC-14: responde 200 con una lista vacía si el día no tiene reservas', async () => {
    const respuesta = await consultar('?dia=2027-03-04');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual([]);
  });

  test('EC-15: responde 500 si no se pueden leer las reservas', async () => {
    vi.spyOn(repositorioReservas, 'obtenerPorDia').mockImplementation(() => {
      throw new Error('Fallo al leer');
    });

    const respuesta = await consultar('?dia=2027-03-02');

    expect(respuesta.status).toBe(500);
    expect(respuesta.body).toEqual({
      error: 'No se han podido consultar las reservas',
    });
  });
});
