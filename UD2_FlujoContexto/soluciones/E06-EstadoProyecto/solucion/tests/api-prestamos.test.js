import request from 'supertest';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { app } from '../src/app.js';
import { repositorioPortatiles } from '../src/repositorios/repositorio-portatiles.js';
import { repositorioPrestamos } from '../src/repositorios/repositorio-prestamos.js';

function prestar(cuerpo) {
  return request(app)
    .post('/api/prestamos')
    .set('X-Usuario', 'ana')
    .set('X-Papel', 'profesor')
    .send(cuerpo);
}

beforeEach(() => {
  repositorioPrestamos.vaciar();
  vi.spyOn(repositorioPortatiles, 'cambiarEstado').mockReturnValue(undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('POST /api/prestamos', () => {
  test('AC-01: responde 201 con el préstamo de un portátil disponible', async () => {
    const respuesta = await prestar({ codigoPortatil: 'P-01' });

    expect(respuesta.status).toBe(201);
    expect(respuesta.body).toMatchObject({
      codigoPortatil: 'P-01',
      idProfesor: 'ana',
      estado: 'abierto',
    });
  });

  test('EC-01: responde 401 sin la identificación del centro', async () => {
    const respuesta = await request(app)
      .post('/api/prestamos')
      .send({ codigoPortatil: 'P-01' });

    expect(respuesta.status).toBe(401);
  });

  test('EC-02: responde 400 sin código', async () => {
    const respuesta = await prestar({});

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({ error: 'Indica el código del portátil' });
  });

  test('EC-03: responde 404 si el portátil no existe', async () => {
    const respuesta = await prestar({ codigoPortatil: 'P-99' });

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'El portátil no existe' });
  });

  test('AC-02, EC-04: responde 409 si el portátil está averiado', async () => {
    const respuesta = await prestar({ codigoPortatil: 'P-03' });

    expect(respuesta.status).toBe(409);
    expect(respuesta.body).toEqual({ error: 'El portátil está averiado' });
  });

  test('AC-03, EC-05: responde 409 si el portátil ya está prestado', async () => {
    const respuesta = await prestar({ codigoPortatil: 'P-02' });

    expect(respuesta.status).toBe(409);
    expect(respuesta.body).toEqual({ error: 'El portátil ya está prestado' });
  });

  test('EC-06: responde 500 si no se puede guardar el préstamo', async () => {
    vi.spyOn(repositorioPrestamos, 'guardar').mockImplementation(() => {
      throw new Error('Fallo al guardar');
    });

    const respuesta = await prestar({ codigoPortatil: 'P-01' });

    expect(respuesta.status).toBe(500);
    expect(respuesta.body).toEqual({
      error: 'No se ha podido registrar el préstamo',
    });
  });
});
