import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { ErrorValidacion } from '../src/errores/error-validacion.js';
import { repositorioTareas } from '../src/repositorios/repositorio-tareas.js';
import { crearTarea, marcarTarea } from '../src/servicios/servicio-tareas.js';

describe('crearTarea', () => {
  test('A-RF-01: guarda la tarea con id, texto, estado "pendiente" y fecha', () => {
    const tarea = crearTarea('Comprar leche');

    expect(tarea).toEqual({
      id: expect.any(String),
      text: 'Comprar leche',
      estado: 'pendiente',
      fechaCreacion: expect.any(String),
    });
    expect(new Date(tarea.fechaCreacion).toISOString()).toBe(
      tarea.fechaCreacion,
    );
    expect(repositorioTareas.obtenerTodas()).toContainEqual(tarea);
  });

  test('A-RNF-03: genera un id distinto para cada tarea', () => {
    const primera = crearTarea('Primera');
    const segunda = crearTarea('Segunda');

    expect(primera.id).not.toBe(segunda.id);
  });

  test('A-RF-04: guarda el texto sin los espacios de los extremos', () => {
    expect(crearTarea('  Comprar leche  ').text).toBe('Comprar leche');
  });

  test('A-EC-01: rechaza un texto vacío', () => {
    expect(() => crearTarea('')).toThrow(
      'El texto de la tarea no puede estar vacío',
    );
  });

  test('A-EC-01: rechaza un texto con solo espacios', () => {
    expect(() => crearTarea('   ')).toThrow(
      'El texto de la tarea no puede estar vacío',
    );
  });

  test('A-EC-02: acepta un texto de 280 caracteres', () => {
    expect(crearTarea('a'.repeat(280)).text).toHaveLength(280);
  });

  test('A-EC-02: rechaza un texto de 281 caracteres', () => {
    expect(() => crearTarea('a'.repeat(281))).toThrow(
      'El texto no puede superar 280 caracteres',
    );
  });

  test('A-RNF-02: cuenta los caracteres sin los espacios de los extremos', () => {
    expect(crearTarea(`  ${'a'.repeat(280)}  `).text).toHaveLength(280);
  });

  test.each([undefined, null, 42, {}])(
    'A-EC-05: rechaza un text que no es texto (%o)',
    (valor) => {
      expect(() => crearTarea(valor)).toThrow(ErrorValidacion);
      expect(() => crearTarea(valor)).toThrow(
        'El campo text es obligatorio y debe ser texto',
      );
    },
  );
});

describe('marcarTarea', () => {
  let tarea;

  beforeEach(() => {
    repositorioTareas.vaciar();
    tarea = crearTarea('Comprar leche');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('C-RF-01, C-RF-02: marca una tarea pendiente con la fecha en que se completó', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-02T10:00:00Z'));

    const marcada = marcarTarea(tarea.id, true);

    expect(marcada).toEqual({
      ...tarea,
      estado: 'hecha',
      fechaCompletado: '2026-03-02T10:00:00.000Z',
    });
    expect(repositorioTareas.buscarPorId(tarea.id)).toEqual(marcada);
  });

  test('C-RF-03, C-RF-04: desmarca una tarea hecha y deja la fecha a null', () => {
    marcarTarea(tarea.id, true);

    const desmarcada = marcarTarea(tarea.id, false);

    expect(desmarcada.estado).toBe('pendiente');
    expect(desmarcada.fechaCompletado).toBeNull();
  });

  test('C-EC-03: marcar una tarea ya hecha no cambia la fecha', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-02T10:00:00Z'));
    marcarTarea(tarea.id, true);
    vi.setSystemTime(new Date('2026-03-02T11:00:00Z'));

    expect(marcarTarea(tarea.id, true).fechaCompletado).toBe(
      '2026-03-02T10:00:00.000Z',
    );
  });

  test('C-EC-04: desmarcar una tarea pendiente no cambia nada', () => {
    expect(marcarTarea(tarea.id, false)).toEqual(tarea);
  });

  test('C-EC-01: rechaza una tarea que no existe', () => {
    expect(() => marcarTarea('no-existe', true)).toThrow('La tarea no existe');
  });

  test.each(['sí', 1, null, undefined])('C-EC-02: rechaza hecha = %o', (valor) => {
    expect(() => marcarTarea(tarea.id, valor)).toThrow(
      'El campo hecha es obligatorio y debe ser true o false',
    );
  });

  test('C-EC-08: con una tarea que no existe y hecha no válido, gana el cuerpo', () => {
    expect(() => marcarTarea('no-existe', 'sí')).toThrow(
      'El campo hecha es obligatorio y debe ser true o false',
    );
  });
});
