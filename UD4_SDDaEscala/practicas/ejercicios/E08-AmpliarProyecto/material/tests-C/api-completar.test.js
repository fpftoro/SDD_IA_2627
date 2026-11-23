import request from 'supertest';
import { beforeEach, describe, expect, test } from 'vitest';
import { app } from '../src/app.js';
import { repositorioTareas } from '../src/repositorios/repositorio-tareas.js';

function guardar(id, text, estado = 'pendiente') {
  return repositorioTareas.guardar({
    id,
    text,
    estado,
    fechaCreacion: '2027-03-01T10:00:00.000Z',
  });
}

beforeEach(() => {
  repositorioTareas.vaciar();
});

describe('POST /tareas/:id/hecha', () => {
  test('C-RF-01, C-RF-02, C-AC-01: marca la tarea como hecha y la devuelve', async () => {
    guardar('t1', 'Comprar leche');

    const respuesta = await request(app).post('/tareas/t1/hecha');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({
      id: 't1',
      text: 'Comprar leche',
      estado: 'hecha',
      fechaCreacion: '2027-03-01T10:00:00.000Z',
    });
  });

  test('C-RF-03, C-AC-02: la lista refleja el cambio y no toca el resto de campos', async () => {
    guardar('t1', 'Comprar leche');
    guardar('t2', 'Pagar la luz');

    await request(app).post('/tareas/t1/hecha');
    const lista = await request(app).get('/tareas');

    expect(lista.body).toEqual([
      {
        id: 't1',
        text: 'Comprar leche',
        estado: 'hecha',
        fechaCreacion: '2027-03-01T10:00:00.000Z',
      },
      {
        id: 't2',
        text: 'Pagar la luz',
        estado: 'pendiente',
        fechaCreacion: '2027-03-01T10:00:00.000Z',
      },
    ]);
  });

  test('C-EC-01: responde 404 si la tarea no existe', async () => {
    const respuesta = await request(app).post('/tareas/no-existe/hecha');

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'La tarea no existe' });
  });

  test('C-EC-02: marcar una tarea ya hecha responde 200 y no la cambia', async () => {
    guardar('t1', 'Comprar leche', 'hecha');

    const respuesta = await request(app).post('/tareas/t1/hecha');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.estado).toBe('hecha');
    expect(repositorioTareas.obtenerTodas()).toHaveLength(1);
  });
});
