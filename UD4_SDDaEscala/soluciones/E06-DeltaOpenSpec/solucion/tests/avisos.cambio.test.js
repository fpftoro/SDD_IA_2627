import { describe, expect, test } from 'vitest';
import { generarAvisos } from '../src/avisos.js';

// Tests del cambio avisos-ordenados-y-robustos. Sustituyen a los de los
// fallos FC-01 a FC-04 de la caracterización.

const HOY = '2027-03-10';

function prestamo(id, profesor, fechaSalida, extra = {}) {
  return {
    id,
    portatil: id,
    profesor,
    fechaSalida,
    cargador: true,
    estado: 'activo',
    ...extra,
  };
}

describe('Orden de los avisos', () => {
  test('CAMBIO-01: el préstamo más antiguo va el primero', () => {
    const avisos = generarAvisos(
      [prestamo(1, 'ana', '2027-03-01'), prestamo(2, 'luis', '2027-01-01')],
      HOY,
    );
    expect(avisos.split('\n')).toEqual([
      'El portátil 2 lleva 68 días con luis',
      'El portátil 1 lleva 9 días con ana',
    ]);
  });

  test('CAMBIO-02: a igual antigüedad, por profesor sin distinguir mayúsculas', () => {
    const avisos = generarAvisos(
      [
        prestamo(1, 'ana', '2027-02-01'),
        prestamo(2, 'Zoe', '2027-02-01'),
        prestamo(3, 'Luis', '2027-02-01'),
      ],
      HOY,
    );
    expect(avisos.split('\n')).toEqual([
      'El portátil 1 lleva 37 días con ana',
      'El portátil 3 lleva 37 días con Luis',
      'El portátil 2 lleva 37 días con Zoe',
    ]);
  });

  test('CAMBIO-03: los de un mismo profesor, del más antiguo al más reciente', () => {
    const avisos = generarAvisos(
      [
        prestamo(1, 'ana', '2027-02-01'),
        prestamo(2, 'ana', '2027-02-05'),
        prestamo(3, 'ana', '2027-02-03'),
      ],
      HOY,
    );
    expect(avisos.split('\n')).toEqual([
      'El portátil 1 lleva 37 días con ana',
      'El portátil 3 lleva 35 días con ana',
      'El portátil 2 lleva 33 días con ana',
    ]);
  });

  test('CAMBIO-04: a igualdad total, se conserva el orden de entrada', () => {
    const avisos = generarAvisos(
      [prestamo(5, 'ana', '2027-02-01'), prestamo(2, 'ana', '2027-02-01')],
      HOY,
    );
    expect(avisos.split('\n')).toEqual([
      'El portátil 5 lleva 37 días con ana',
      'El portátil 2 lleva 37 días con ana',
    ]);
  });
});

describe('Datos que faltan o no son válidos', () => {
  test('CAMBIO-05: sin profesor, el aviso dice "un profesor desconocido"', () => {
    const avisos = generarAvisos([prestamo(1, undefined, '2027-02-01')], HOY);
    expect(avisos).toBe(
      'El portátil 1 lleva 37 días con un profesor desconocido',
    );
  });

  test('CAMBIO-06: una fecha de salida inválida lanza un error que dice el préstamo', () => {
    expect(() => generarAvisos([prestamo(3, 'ana', 'ayer')], HOY)).toThrow(
      'La fecha de salida del préstamo 3 no es válida',
    );
  });

  test('CAMBIO-07: una fecha de salida inválida en un préstamo devuelto no importa', () => {
    const devuelto = prestamo(3, 'ana', 'ayer', { estado: 'devuelto' });
    expect(generarAvisos([devuelto], HOY)).toBe('Sin avisos');
  });

  test('CAMBIO-08: un "hoy" inválido lanza un error', () => {
    expect(() => generarAvisos([prestamo(1, 'ana', '2027-02-01')], 'hoy')).toThrow(
      'La fecha de hoy no es válida',
    );
  });
});
