import request from 'supertest';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { app } from '../src/app.js';
import { repositorioReservas } from '../src/repositorios/repositorio-reservas.js';

function reservar(cuerpo) {
  return request(app).post('/api/reservas').send(cuerpo);
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2030-03-10T10:00:00Z'));
  repositorioReservas.vaciar();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('POST /api/reservas', () => {
  test('B-RF-01, B-RF-02, B-AC-01: responde 201 con la reserva completa', async () => {
    const respuesta = await reservar({ carro: 'A', fecha: '2030-03-12', franja: 3 });

    expect(respuesta.status).toBe(201);
    expect(respuesta.body).toEqual({
      id: expect.stringMatching(/^[0-9a-f-]{36}$/),
      carro: 'A',
      fecha: '2030-03-12',
      franja: 3,
    });
    expect(repositorioReservas.obtenerTodas()).toEqual([respuesta.body]);
  });

  test('B-RNF-01: el servidor genera un id distinto e ignora el del cuerpo', async () => {
    const primera = await reservar({ id: 'mio', carro: 'A', fecha: '2030-03-12', franja: 3 });
    const segunda = await reservar({ carro: 'A', fecha: '2030-03-12', franja: 4 });

    expect(primera.body.id).not.toBe('mio');
    expect(primera.body.id).not.toBe(segunda.body.id);
  });

  test('B-AC-02, B-EC-02: responde 409 si la franja ya está reservada', async () => {
    await reservar({ carro: 'A', fecha: '2030-03-12', franja: 3 });

    const respuesta = await reservar({ carro: 'A', fecha: '2030-03-12', franja: 3 });

    expect(respuesta.status).toBe(409);
    expect(respuesta.body).toEqual({
      error: 'El carro ya está reservado en esa franja',
    });
  });

  test('B-AC-03: responde 201 a una reserva para hoy', async () => {
    const respuesta = await reservar({ carro: 'B', fecha: '2030-03-10', franja: 1 });

    expect(respuesta.status).toBe(201);
  });

  test('B-AC-04: responde 201 al mismo carro en otra franja', async () => {
    await reservar({ carro: 'A', fecha: '2030-03-12', franja: 3 });

    const respuesta = await reservar({ carro: 'A', fecha: '2030-03-12', franja: 4 });

    expect(respuesta.status).toBe(201);
  });

  test('B-EC-01: responde 404 si el carro no existe', async () => {
    const respuesta = await reservar({ carro: 'C', fecha: '2030-03-12', franja: 3 });

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'El carro no existe' });
  });

  test('B-EC-03: responde 400 a una fecha pasada', async () => {
    const respuesta = await reservar({ carro: 'A', fecha: '2030-03-09', franja: 3 });

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({
      error: 'No se puede reservar en una fecha pasada',
    });
  });

  test.each([
    [{ fecha: '2030-03-12', franja: 3 }],
    [{ carro: 'A', franja: 3 }],
    [{ carro: 'A', fecha: '2030-03-12' }],
  ])('B-EC-06: responde 400 si falta un dato (%o)', async (cuerpo) => {
    const respuesta = await reservar(cuerpo);

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({
      error: 'Faltan datos: carro, fecha y franja son obligatorios',
    });
  });

  test('B-EC-07: responde 500 si no se puede guardar la reserva', async () => {
    vi.spyOn(repositorioReservas, 'guardar').mockImplementation(() => {
      throw new Error('Fallo del almacenamiento');
    });

    const respuesta = await reservar({ carro: 'A', fecha: '2030-03-12', franja: 3 });

    expect(respuesta.status).toBe(500);
    expect(respuesta.body).toEqual({ error: 'Error al guardar la reserva' });
  });
});
