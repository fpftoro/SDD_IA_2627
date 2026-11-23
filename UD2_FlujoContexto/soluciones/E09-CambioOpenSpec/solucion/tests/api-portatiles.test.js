import request from 'supertest';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { app } from '../src/app.js';
import { repositorioPortatiles } from '../src/repositorios/repositorio-portatiles.js';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('GET /api/portatiles', () => {
  test('RF-01, AC-01: responde 200 con todos los portátiles ordenados por código', async () => {
    const respuesta = await request(app).get('/api/portatiles');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveLength(6);
    expect(respuesta.body.map((portatil) => portatil.codigo)).toEqual([
      'P-01',
      'P-02',
      'P-03',
      'P-04',
      'P-05',
      'P-06',
    ]);
    expect(respuesta.body[0]).toEqual({
      id: 1,
      codigo: 'P-01',
      carro: 'A',
      estado: 'disponible',
    });
  });

  test('RF-02, AC-02: filtra los disponibles', async () => {
    const respuesta = await request(app).get('/api/portatiles?estado=disponible');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.map((portatil) => portatil.codigo)).toEqual([
      'P-01',
      'P-04',
      'P-05',
    ]);
  });

  test('EC-01: responde 400 si el estado no es válido', async () => {
    const respuesta = await request(app).get('/api/portatiles?estado=roto');

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({
      error: 'El estado debe ser disponible, prestado o averiado',
    });
  });

  test('EC-04: responde 200 con una lista vacía si ninguno tiene ese estado', async () => {
    vi.spyOn(repositorioPortatiles, 'obtenerTodos').mockReturnValue([
      { id: 1, codigo: 'P-01', carro: 'A', estado: 'disponible' },
    ]);

    const respuesta = await request(app).get('/api/portatiles?estado=averiado');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual([]);
  });

  test('EC-05: responde 500 si no se pueden leer los portátiles', async () => {
    vi.spyOn(repositorioPortatiles, 'obtenerTodos').mockImplementation(() => {
      throw new Error('Fallo del almacenamiento');
    });

    const respuesta = await request(app).get('/api/portatiles');

    expect(respuesta.status).toBe(500);
    expect(respuesta.body).toEqual({
      error: 'Error al consultar los portátiles',
    });
  });

  test('RNF-01: responde en menos de 200 ms con 500 portátiles', async () => {
    const muchos = Array.from({ length: 500 }, (_, i) => ({
      id: i + 1,
      codigo: `P-${String(i + 1).padStart(3, '0')}`,
      carro: 'A',
      estado: 'disponible',
    }));
    vi.spyOn(repositorioPortatiles, 'obtenerTodos').mockReturnValue(muchos);

    const inicio = performance.now();
    const respuesta = await request(app).get('/api/portatiles');
    const duracion = performance.now() - inicio;

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveLength(500);
    expect(duracion).toBeLessThan(200);
  });
});

describe('GET /api/portatiles/:id', () => {
  test('RF-03, AC-03: responde 200 con el portátil', async () => {
    const respuesta = await request(app).get('/api/portatiles/3');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({
      id: 3,
      codigo: 'P-03',
      carro: 'A',
      estado: 'averiado',
    });
  });

  test('EC-02: responde 404 si el portátil no existe', async () => {
    const respuesta = await request(app).get('/api/portatiles/99');

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'El portátil no existe' });
  });

  test('EC-03: responde 400 si el identificador no es válido', async () => {
    const respuesta = await request(app).get('/api/portatiles/abc');

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({
      error: 'El identificador debe ser un número entero positivo',
    });
  });

  test('EC-05: responde 500 si no se puede leer el portátil', async () => {
    vi.spyOn(repositorioPortatiles, 'obtenerPorId').mockImplementation(() => {
      throw new Error('Fallo del almacenamiento');
    });

    const respuesta = await request(app).get('/api/portatiles/3');

    expect(respuesta.status).toBe(500);
    expect(respuesta.body).toEqual({
      error: 'Error al consultar los portátiles',
    });
  });
});

describe('GET /api/portatiles con carro', () => {
  test('RF-04: responde 200 con los portátiles del carro B', async () => {
    const respuesta = await request(app).get('/api/portatiles?carro=B');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.map((portatil) => portatil.codigo)).toEqual([
      'P-02',
      'P-04',
      'P-06',
    ]);
  });

  test('RF-04: combina el carro y el estado', async () => {
    const respuesta = await request(app).get(
      '/api/portatiles?carro=A&estado=disponible',
    );

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.map((portatil) => portatil.codigo)).toEqual([
      'P-01',
      'P-05',
    ]);
  });

  test('RF-04: responde 200 con una lista vacía para el carro C', async () => {
    const respuesta = await request(app).get('/api/portatiles?carro=C');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual([]);
  });

  test('EC-06: responde 400 si el carro no es A, B ni C', async () => {
    const respuesta = await request(app).get('/api/portatiles?carro=Z');

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({ error: 'El carro debe ser A, B o C' });
  });

  test('EC-07: con el carro y el estado no válidos, responde el error del estado', async () => {
    const respuesta = await request(app).get('/api/portatiles?carro=Z&estado=roto');

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({
      error: 'El estado debe ser disponible, prestado o averiado',
    });
  });
});
