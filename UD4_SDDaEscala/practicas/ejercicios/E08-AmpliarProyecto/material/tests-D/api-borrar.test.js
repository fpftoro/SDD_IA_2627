import request from 'supertest';
import { beforeEach, describe, expect, test } from 'vitest';
import { app } from '../src/app.js';
import { repositorioTareas } from '../src/repositorios/repositorio-tareas.js';

function guardar(id, text) {
  return repositorioTareas.guardar({
    id,
    text,
    estado: 'pendiente',
    fechaCreacion: '2027-03-01T10:00:00.000Z',
  });
}

beforeEach(() => {
  repositorioTareas.vaciar();
  guardar('t1', 'Comprar leche');
  guardar('t2', 'Pagar la luz');
});

describe('DELETE /tareas/:id', () => {
  test('D-RF-02, D-AC-01: responde 204 sin cuerpo', async () => {
    const respuesta = await request(app).delete('/tareas/t1');

    expect(respuesta.status).toBe(204);
    expect(respuesta.text).toBe('');
  });

  test('D-RF-01, D-AC-02: la tarea borrada deja de aparecer en la lista', async () => {
    await request(app).delete('/tareas/t1');
    const lista = await request(app).get('/tareas');

    expect(lista.body.map((tarea) => tarea.text)).toEqual(['Pagar la luz']);
  });

  test('D-EC-01: responde 404 si la tarea no existe', async () => {
    const respuesta = await request(app).delete('/tareas/no-existe');

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'La tarea no existe' });
  });

  test('D-EC-02: la segunda vez que se borra la misma tarea responde 404', async () => {
    await request(app).delete('/tareas/t1');
    const respuesta = await request(app).delete('/tareas/t1');

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'La tarea no existe' });
  });
});
