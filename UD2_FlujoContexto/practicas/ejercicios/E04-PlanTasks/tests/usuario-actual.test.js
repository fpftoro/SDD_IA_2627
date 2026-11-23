import express from 'express';
import request from 'supertest';
import { describe, expect, test } from 'vitest';
import { usuarioActual } from '../src/middlewares/usuario-actual.js';

const app = express();
app.get('/prueba', usuarioActual, (peticion, respuesta) => {
  respuesta.json(peticion.usuario);
});

describe('usuarioActual', () => {
  test('deja en la petición el usuario y su papel', async () => {
    const respuesta = await request(app)
      .get('/prueba')
      .set('X-Usuario', 'ana')
      .set('X-Papel', 'profesor');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({ id: 'ana', papel: 'profesor' });
  });

  test.each([
    ['sin cabeceras', {}],
    ['sin usuario', { 'X-Papel': 'profesor' }],
    ['con un papel desconocido', { 'X-Usuario': 'ana', 'X-Papel': 'alumno' }],
  ])('responde 401 %s', async (_caso, cabeceras) => {
    const respuesta = await request(app).get('/prueba').set(cabeceras);

    expect(respuesta.status).toBe(401);
    expect(respuesta.body).toEqual({ error: 'Tienes que identificarte' });
  });
});
