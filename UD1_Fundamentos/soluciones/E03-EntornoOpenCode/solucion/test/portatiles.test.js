import { describe, expect, it } from 'vitest';
import { buscarPortatil, listarPortatiles } from '../src/servicios/portatiles.js';

describe('listarPortatiles', () => {
  it('devuelve todos los portátiles si no se indica estado', () => {
    expect(listarPortatiles()).toHaveLength(4);
  });

  it('filtra por estado', () => {
    const disponibles = listarPortatiles('disponible');
    expect(disponibles.map((p) => p.codigo)).toEqual(['P-01', 'P-04']);
  });

  it('rechaza un estado que no existe', () => {
    expect(() => listarPortatiles('perdido')).toThrow('Estado no válido');
  });
});

describe('buscarPortatil', () => {
  it('encuentra un portátil por su id', () => {
    expect(buscarPortatil(3).codigo).toBe('P-03');
  });

  it('devuelve undefined si no existe', () => {
    expect(buscarPortatil(99)).toBeUndefined();
  });
});
