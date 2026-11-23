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

describe('PATCH /tareas/:id', () => {
  let tarea;

  beforeEach(async () => {
    repositorioTareas.vaciar();
    const respuesta = await request(app)
      .post('/tareas')
      .send({ text: 'Comprar leche' });
    tarea = respuesta.body;
  });

  function marcar(id, cuerpo) {
    return request(app).patch(`/tareas/${id}`).send(cuerpo);
  }

  test('C-RF-05, C-AC-01: responde 200 con la tarea marcada', async () => {
    const respuesta = await marcar(tarea.id, { hecha: true });

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({
      ...tarea,
      estado: 'hecha',
      fechaCompletado: expect.any(String),
    });
    expect(new Date(respuesta.body.fechaCompletado).toISOString()).toBe(
      respuesta.body.fechaCompletado,
    );
  });

  test('C-AC-02: responde 200 con la tarea desmarcada y sin fecha', async () => {
    await marcar(tarea.id, { hecha: true });

    const respuesta = await marcar(tarea.id, { hecha: false });

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.estado).toBe('pendiente');
    expect(respuesta.body.fechaCompletado).toBeNull();
  });

  test('C-AC-03: volver a marcarla responde 200 sin cambiar la fecha', async () => {
    const primera = await marcar(tarea.id, { hecha: true });

    const segunda = await marcar(tarea.id, { hecha: true });

    expect(segunda.status).toBe(200);
    expect(segunda.body.fechaCompletado).toBe(primera.body.fechaCompletado);
  });

  test.each(['sí', 1, null])('C-AC-04, C-EC-02: responde 400 con hecha = %o', async (valor) => {
    const respuesta = await marcar(tarea.id, { hecha: valor });

    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toEqual({
      error: 'El campo hecha es obligatorio y debe ser true o false',
    });
    const lista = await request(app).get('/tareas');
    expect(lista.body[0].estado).toBe('pendiente');
  });

  test('C-EC-01: responde 404 si la tarea no existe', async () => {
    const respuesta = await marcar('no-existe', { hecha: true });

    expect(respuesta.status).toBe(404);
    expect(respuesta.body).toEqual({ error: 'La tarea no existe' });
  });

  test('C-EC-06: ignora los demás campos del cuerpo', async () => {
    const respuesta = await marcar(tarea.id, { hecha: true, text: 'Otra cosa' });

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.text).toBe('Comprar leche');
  });

  test('C-EC-07: responde 500 si no se puede guardar, y la tarea no cambia', async () => {
    vi.spyOn(repositorioTareas, 'actualizar').mockImplementation(() => {
      throw new Error('Fallo al guardar');
    });

    const respuesta = await marcar(tarea.id, { hecha: true });

    expect(respuesta.status).toBe(500);
    expect(respuesta.body).toEqual({ error: 'Error al guardar la tarea' });
    vi.restoreAllMocks();
    const lista = await request(app).get('/tareas');
    expect(lista.body[0].estado).toBe('pendiente');
  });

  test('C-RNF-01: responde en menos de 200 ms con 1.000 tareas guardadas', async () => {
    for (let numero = 0; numero < 1000; numero += 1) {
      repositorioTareas.guardar({
        id: `t-${numero}`,
        text: `Tarea ${numero}`,
        estado: 'pendiente',
        fechaCreacion: new Date().toISOString(),
      });
    }

    const inicio = performance.now();
    const respuesta = await marcar('t-999', { hecha: true });
    const duracion = performance.now() - inicio;

    expect(respuesta.status).toBe(200);
    expect(duracion).toBeLessThan(200);
  });
});
