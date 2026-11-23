import { describe, expect, test } from 'vitest';
import { ErrorValidacion } from '../src/errores/error-validacion.js';
import { repositorioTareas } from '../src/repositorios/repositorio-tareas.js';
import { crearTarea } from '../src/servicios/servicio-tareas.js';

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
