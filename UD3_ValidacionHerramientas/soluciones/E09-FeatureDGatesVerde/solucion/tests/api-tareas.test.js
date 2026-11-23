import request from 'supertest';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { app } from '../src/app.js';
import { repositorioTareas } from '../src/repositorios/repositorio-tareas.js';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('POST /tareas', () => {
  test('A-RF-02, A-AC-03: responde 201 con la tarea completa', async () => {
    const respuesta = await request(app)
      .post('/tareas')
      .send({ text: 'Comprar leche' });

    expect(respuesta.status).toBe(201);
    expect(respuesta.body).toEqual({
      id: expect.any(String),
      text: 'Comprar leche',
      estado: 'pendiente',
      fechaCreacion: expect.any(String),
    });
    expect(new Date(respuesta.body.fechaCreacion).toISOString()).toBe(
      respuesta.body.fechaCreacion,
    );
  });

  test.each([
    ['A-EC-01', { text: '   ' }, 'El texto de la tarea no puede estar vacío'],
    [
      'A-EC-02',
      { text: 'a'.repeat(281) },
      'El texto no puede superar 280 caracteres',
    ],
    ['A-EC-05', {}, 'El campo text es obligatorio y debe ser texto'],
    ['A-EC-05', { text: 42 }, 'El campo text es obligatorio y debe ser texto'],
  ])(
    '%s: responde 400 con el mensaje de la spec',
    async (_id, cuerpo, mensaje) => {
      const respuesta = await request(app).post('/tareas').send(cuerpo);

      expect(respuesta.status).toBe(400);
      expect(respuesta.body).toEqual({ error: mensaje });
    },
  );

  test('A-EC-05: responde 400 con el mensaje de la spec si el cuerpo no es JSON', async () => {
    const respuesta = await request(app)
      .post('/tareas')
      .set('Content-Type', 'application/json')
      .send('{"text": "Comprar leche"');

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({
      error: 'El campo text es obligatorio y debe ser texto',
    });
  });

  test('A-EC-03: responde 500 si no se puede guardar la tarea', async () => {
    vi.spyOn(repositorioTareas, 'guardar').mockImplementation(() => {
      throw new Error('Fallo del almacenamiento');
    });

    const respuesta = await request(app)
      .post('/tareas')
      .send({ text: 'Comprar leche' });

    expect(respuesta.status).toBe(500);
    expect(respuesta.body).toEqual({ error: 'Error al guardar la tarea' });
  });

  test('A-EC-04: ignora los campos que no se esperan', async () => {
    const respuesta = await request(app)
      .post('/tareas')
      .send({
        text: 'Comprar pan',
        id: 'mio',
        estado: 'hecha',
        prioridad: 'alta',
      });

    expect(respuesta.status).toBe(201);
    expect(respuesta.body.id).not.toBe('mio');
    expect(respuesta.body.estado).toBe('pendiente');
    expect(respuesta.body).not.toHaveProperty('prioridad');
  });

  test('A-RNF-01: responde en menos de 200 ms con 1.000 tareas guardadas', async () => {
    for (let i = 0; i < 1000; i++) {
      repositorioTareas.guardar({ id: `carga-${i}`, text: `Tarea ${i}` });
    }

    const inicio = performance.now();
    const respuesta = await request(app)
      .post('/tareas')
      .send({ text: 'Una más' });
    const duracion = performance.now() - inicio;

    expect(respuesta.status).toBe(201);
    expect(duracion).toBeLessThan(200);
  });
});

describe('GET /tareas', () => {
  beforeEach(() => {
    repositorioTareas.vaciar();
  });

  test('B-RF-01, B-AC-03: responde 200 con las tareas en el orden en que se añadieron', async () => {
    const creadas = [];
    for (const text of ['Comprar leche', 'Pagar la luz', 'Llamar al fontanero']) {
      const respuesta = await request(app).post('/tareas').send({ text });
      creadas.push(respuesta.body);
    }

    const respuesta = await request(app).get('/tareas');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual(creadas);
  });

  test('B-EC-01: responde 200 con una lista vacía si no hay tareas', async () => {
    const respuesta = await request(app).get('/tareas');

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual([]);
  });

  test('B-EC-02: responde 500 si no se pueden obtener las tareas', async () => {
    vi.spyOn(repositorioTareas, 'obtenerTodas').mockImplementation(() => {
      throw new Error('Fallo del almacenamiento');
    });

    const respuesta = await request(app).get('/tareas');

    expect(respuesta.status).toBe(500);
    expect(respuesta.body).toEqual({ error: 'Error al obtener las tareas' });
  });

  test('B-RNF-01: responde en menos de 200 ms con 1.000 tareas guardadas', async () => {
    for (let i = 0; i < 1000; i++) {
      repositorioTareas.guardar({ id: `carga-${i}`, text: `Tarea ${i}` });
    }

    const inicio = performance.now();
    const respuesta = await request(app).get('/tareas');
    const duracion = performance.now() - inicio;

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveLength(1000);
    expect(duracion).toBeLessThan(200);
  });
});

describe('DELETE /tareas/:id', () => {
  beforeEach(() => {
    repositorioTareas.vaciar();
  });

  async function crear(text) {
    const respuesta = await request(app).post('/tareas').send({ text });
    return respuesta.body;
  }

  test('D-RF-01, D-RF-02, D-AC-01: responde 204 sin cuerpo y la tarea deja de estar en la lista', async () => {
    const pan = await crear('Comprar pan');
    const plantas = await crear('Regar las plantas');

    const respuesta = await request(app).delete(`/tareas/${pan.id}`);

    expect(respuesta.status).toBe(204);
    expect(respuesta.text).toBe('');
    const lista = await request(app).get('/tareas');
    expect(lista.body).toEqual([plantas]);
  });

  test('D-EC-01: responde 404 si la tarea no existe', async () => {
    await crear('Comprar pan');

    const respuesta = await request(app).delete('/tareas/no-existe');

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'La tarea no existe' });
    expect((await request(app).get('/tareas')).body).toHaveLength(1);
  });

  test('D-EC-02: responde 500 y no borra la tarea si falla el almacenamiento', async () => {
    const pan = await crear('Comprar pan');
    vi.spyOn(repositorioTareas, 'borrar').mockImplementation(() => {
      throw new Error('Fallo del almacenamiento');
    });

    const respuesta = await request(app).delete(`/tareas/${pan.id}`);

    expect(respuesta.status).toBe(500);
    expect(respuesta.body).toEqual({ error: 'Error al borrar la tarea' });
    vi.restoreAllMocks();
    expect((await request(app).get('/tareas')).body).toEqual([pan]);
  });

  test('D-RNF-01: responde en menos de 200 ms con 1.000 tareas guardadas', async () => {
    for (let i = 0; i < 999; i++) {
      repositorioTareas.guardar({ id: `carga-${i}`, text: `Tarea ${i}` });
    }
    const ultima = await crear('La última');

    const inicio = performance.now();
    const respuesta = await request(app).delete(`/tareas/${ultima.id}`);
    const duracion = performance.now() - inicio;

    expect(respuesta.status).toBe(204);
    expect(duracion).toBeLessThan(200);
  });
});
