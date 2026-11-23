import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { repositorioReservas } from '../src/repositorios/repositorio-reservas.js';
import { crearReserva } from '../src/servicios/servicio-reservas.js';

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2030-03-10T10:00:00Z'));
  repositorioReservas.vaciar();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('crearReserva', () => {
  test('B-AC-03: acepta una reserva para hoy', () => {
    expect(
      crearReserva({ carro: 'B', fecha: '2030-03-10', franja: 1 }),
    ).toMatchObject({ carro: 'B', fecha: '2030-03-10', franja: 1 });
  });

  test('B-RNF-02: a las 23:30 UTC ya es el día siguiente en España', () => {
    vi.setSystemTime(new Date('2030-03-09T23:30:00Z'));

    expect(() =>
      crearReserva({ carro: 'A', fecha: '2030-03-09', franja: 2 }),
    ).toThrow('No se puede reservar en una fecha pasada');
  });

  test('B-EC-03: rechaza la fecha de ayer', () => {
    expect(() =>
      crearReserva({ carro: 'A', fecha: '2030-03-09', franja: 2 }),
    ).toThrow('No se puede reservar en una fecha pasada');
  });

  test.each([1, 6])('B-EC-04: acepta la franja %o', (franja) => {
    expect(
      crearReserva({ carro: 'A', fecha: '2030-03-12', franja }),
    ).toMatchObject({ franja });
  });

  test.each([0, 7, 2.5, '3'])('B-EC-04: rechaza la franja %o', (franja) => {
    expect(() =>
      crearReserva({ carro: 'A', fecha: '2030-03-12', franja }),
    ).toThrow('La franja debe ser un número del 1 al 6');
  });

  test.each(['12/03/2030', '2030-3-12', '2030-02-30'])(
    'B-EC-05: rechaza la fecha %o',
    (fecha) => {
      expect(() => crearReserva({ carro: 'A', fecha, franja: 3 })).toThrow(
        'La fecha debe tener el formato AAAA-MM-DD',
      );
    },
  );
});
