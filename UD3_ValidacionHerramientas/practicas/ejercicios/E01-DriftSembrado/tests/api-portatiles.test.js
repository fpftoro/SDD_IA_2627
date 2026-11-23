import request from 'supertest';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { app } from '../src/app.js';
import { repositorioPortatiles } from '../src/repositorios/repositorio-portatiles.js';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('GET /api/portatiles', () => {
  test('A-RF-01, A-AC-01: responde 200 con todos los portátiles ordenados', async () => {
    const respuesta = await request(app).get('/api/portatiles');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveLength(6);
    expect(respuesta.body.map((portatil) => portatil.codigo)).toEqual([
      'P-01',
      'P-03',
      'P-05',
      'P-02',
      'P-04',
      'P-06',
    ]);
    expect(respuesta.body[0]).toEqual({
      id: 1,
      codigo: 'P-01',
      carro: 'A',
      estado: 'disponible',
    });
  });

  test('A-RF-02, A-AC-02: filtra los disponibles', async () => {
    const respuesta = await request(app).get('/api/portatiles?estado=disponible');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.map((portatil) => portatil.codigo)).toEqual([
      'P-01',
      'P-05',
      'P-04',
    ]);
  });

  test('A-EC-01: responde 400 si el estado no es válido', async () => {
    const respuesta = await request(app).get('/api/portatiles?estado=roto');

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({
      error: 'El estado debe ser disponible, prestado o averiado',
    });
  });

  test('A-EC-04: responde 200 con una lista vacía si ninguno tiene ese estado', async () => {
    vi.spyOn(repositorioPortatiles, 'obtenerTodos').mockReturnValue([
      { id: 1, codigo: 'P-01', carro: 'A', estado: 'disponible' },
    ]);

    const respuesta = await request(app).get('/api/portatiles?estado=averiado');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual([]);
  });

  test('A-EC-05: responde 500 si no se pueden leer los portátiles', async () => {
    vi.spyOn(repositorioPortatiles, 'obtenerTodos').mockImplementation(() => {
      throw new Error('Fallo del almacenamiento');
    });

    const respuesta = await request(app).get('/api/portatiles');

    expect(respuesta.status).toBe(500);
    expect(respuesta.body).toEqual({
      error: 'Error al consultar los portátiles',
    });
  });

  test('A-RNF-01: responde en menos de 200 ms con 500 portátiles', async () => {
    const muchos = Array.from({ length: 50 }, (_, i) => ({
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
    expect(respuesta.body).toHaveLength(50);
    expect(duracion).toBeLessThan(200);
  });
});

describe('GET /api/portatiles/:id', () => {
  test('A-RF-03, A-AC-03: responde 200 con el portátil', async () => {
    const respuesta = await request(app).get('/api/portatiles/3');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveProperty('codigo', 'P-03');
  });

  test('A-EC-02: responde 404 si el portátil no existe', async () => {
    const respuesta = await request(app).get('/api/portatiles/99');

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'Portátil no encontrado' });
  });

  test('A-EC-05: responde 500 si no se puede leer el portátil', async () => {
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
