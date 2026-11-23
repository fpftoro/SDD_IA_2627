import { describe, expect, test } from 'vitest';
import {
  buscarPortatil,
  listarPortatiles,
} from '../src/servicios/servicio-portatiles.js';

describe('listarPortatiles', () => {
  test('RF-01: devuelve los portátiles ordenados por código', () => {
    expect(listarPortatiles().map((portatil) => portatil.codigo)).toEqual([
      'P-01',
      'P-02',
      'P-03',
      'P-04',
      'P-05',
      'P-06',
    ]);
  });

  test('RF-02: filtra por estado', () => {
    expect(listarPortatiles('prestado').map((p) => p.codigo)).toEqual([
      'P-02',
      'P-06',
    ]);
  });

  test.each(['roto', 'Disponible', ''])(
    'EC-01: rechaza el estado %o',
    (estado) => {
      expect(() => listarPortatiles(estado)).toThrow(
        'El estado debe ser disponible, prestado o averiado',
      );
    },
  );
});

describe('buscarPortatil', () => {
  test('RF-03: devuelve el portátil con ese identificador', () => {
    expect(buscarPortatil('3')).toEqual({
      id: 3,
      codigo: 'P-03',
      carro: 'A',
      estado: 'averiado',
    });
  });

  test.each(['0', '-1', 'abc', '1.5', '01'])(
    'EC-03: rechaza el identificador %o',
    (id) => {
      expect(() => buscarPortatil(id)).toThrow(
        'El identificador debe ser un número entero positivo',
      );
    },
  );

  test('EC-02: avisa si el portátil no existe', () => {
    expect(() => buscarPortatil('99')).toThrow('El portátil no existe');
  });
});

describe('listarPortatiles por carro', () => {
  test('RF-04: filtra por carro, ordenados por código', () => {
    expect(listarPortatiles(undefined, 'B').map((p) => p.codigo)).toEqual([
      'P-02',
      'P-04',
      'P-06',
    ]);
  });

  test('RF-04: combina el carro con el estado', () => {
    expect(listarPortatiles('disponible', 'A').map((p) => p.codigo)).toEqual([
      'P-01',
      'P-05',
    ]);
  });

  test.each(['Z', 'a', ''])('EC-06: rechaza el carro %o', (carro) => {
    expect(() => listarPortatiles(undefined, carro)).toThrow(
      'El carro debe ser A, B o C',
    );
  });

  test('EC-07: si el estado y el carro no son válidos, gana el estado', () => {
    expect(() => listarPortatiles('roto', 'Z')).toThrow(
      'El estado debe ser disponible, prestado o averiado',
    );
  });
});
