import { describe, expect, test } from 'vitest';
import {
  buscarPortatil,
  listarPortatiles,
} from '../src/servicios/servicio-portatiles.js';

describe('listarPortatiles', () => {
  test('A-RF-01: devuelve los portátiles ordenados por código', () => {
    expect(listarPortatiles().map((portatil) => portatil.codigo)).toEqual([
      'P-01',
      'P-02',
      'P-03',
      'P-04',
      'P-05',
      'P-06',
    ]);
  });

  test('A-RF-02: filtra por estado', () => {
    expect(listarPortatiles('prestado').map((p) => p.codigo)).toEqual([
      'P-02',
      'P-06',
    ]);
  });

  test.each(['roto', 'Disponible', ''])(
    'A-EC-01: rechaza el estado %o',
    (estado) => {
      expect(() => listarPortatiles(estado)).toThrow(
        'El estado debe ser disponible, prestado o averiado',
      );
    },
  );
});

describe('buscarPortatil', () => {
  test('A-RF-03: devuelve el portátil con ese identificador', () => {
    expect(buscarPortatil('3')).toEqual({
      id: 3,
      codigo: 'P-03',
      carro: 'A',
      estado: 'averiado',
    });
  });

  test.each(['0', '-1', 'abc', '1.5', '01'])(
    'A-EC-03: rechaza el identificador %o',
    (id) => {
      expect(() => buscarPortatil(id)).toThrow(
        'El identificador debe ser un número entero positivo',
      );
    },
  );

  test('A-EC-02: avisa si el portátil no existe', () => {
    expect(() => buscarPortatil('99')).toThrow('El portátil no existe');
  });
});
