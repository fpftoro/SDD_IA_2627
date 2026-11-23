import { describe, expect, test } from 'vitest';
import { listarPortatiles } from '../src/servicios/servicio-portatiles.js';

describe('listarPortatiles', () => {
  test('A-RF-01: devuelve los portátiles ordenados', () => {
    expect(listarPortatiles().map((portatil) => portatil.codigo)).toEqual([
      'P-01',
      'P-03',
      'P-05',
      'P-02',
      'P-04',
      'P-06',
    ]);
  });

  test('A-RF-02: filtra por estado', () => {
    expect(listarPortatiles('prestado').map((p) => p.codigo)).toEqual([
      'P-02',
      'P-06',
    ]);
  });

  test('A-EC-06: acepta el estado en mayúsculas', () => {
    expect(listarPortatiles('Disponible')).toHaveLength(3);
  });

  test.each(['roto', ''])(
    'A-EC-01: rechaza el estado %o',
    (estado) => {
      expect(() => listarPortatiles(estado)).toThrow(
        'El estado debe ser disponible, prestado o averiado',
      );
    },
  );
});
