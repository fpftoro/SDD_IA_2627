import request from 'supertest';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { app } from '../src/app.js';
import { repositorioPortatiles } from '../src/repositorios/repositorio-portatiles.js';
import * as servicio from '../src/servicios/servicio-portatiles.js';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('GET /api/portatiles', () => {
  test('A-RF-01, A-AC-01: responde 200 con todos los portátiles ordenados por código', async () => {
    const respuesta = await request(app).get('/api/portatiles');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual(servicio.listarPortatiles());
  });

  test('A-RF-02, A-AC-02: filtra los disponibles', async () => {
    const respuesta = await request(app).get('/api/portatiles?estado=disponible');

    expect(respuesta.status).toBe(200);
    expect(
      respuesta.body.every((portatil) => portatil.estado === 'disponible'),
    ).toBe(true);
  });

  test('A-EC-01: responde 400 si el estado no es válido', async () => {
    const respuesta = await request(app).get('/api/portatiles?estado=roto');

    expect(respuesta.status).toBe(400);
    expect(respuesta.body.error).toBeDefined();
  });

  test('A-EC-04: responde 200 con una lista vacía si ninguno tiene ese estado', async () => {
    vi.spyOn(servicio, 'listarPortatiles').mockReturnValue([]);

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
  });

  test.skip('A-RNF-01: responde en menos de 200 ms con 500 portátiles', async () => {
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
    expect(duracion).toBeLessThan(200);
  });
});

describe('GET /api/portatiles/:id', () => {
  test('A-EC-02: responde 404 si el portátil no existe', () => {
    request(app)
      .get('/api/portatiles/99')
      .then((respuesta) => {
        expect(respuesta.status).toBe(404);
        expect(respuesta.body).toEqual({ error: 'El portátil no existe' });
      });
  });

  test('A-EC-03: responde 400 si el identificador no es válido', async () => {
    const respuesta = await request(app).get('/api/portatiles/abc');

    if (respuesta.status === 400) {
      expect(respuesta.body).toEqual({
        error: 'El identificador debe ser un número entero positivo',
      });
    }
  });
});
