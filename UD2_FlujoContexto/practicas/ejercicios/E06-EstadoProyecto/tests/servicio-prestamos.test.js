import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { repositorioPortatiles } from '../src/repositorios/repositorio-portatiles.js';
import { repositorioPrestamos } from '../src/repositorios/repositorio-prestamos.js';
import { registrarPrestamo } from '../src/servicios/servicio-prestamos.js';
import { reloj } from '../src/utilidades/reloj.js';

const ANA = { id: 'ana', papel: 'profesor' };

function portatil(estado) {
  return { id: 1, codigo: 'P-01', carro: 'A', estado };
}

beforeEach(() => {
  repositorioPrestamos.vaciar();
  vi.spyOn(repositorioPortatiles, 'cambiarEstado').mockReturnValue(undefined);
  // Lunes 2 de marzo de 2026, a las 9:00 en la hora peninsular.
  vi.spyOn(reloj, 'ahora').mockReturnValue(new Date('2026-03-02T08:00:00Z'));
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('registrarPrestamo', () => {
  test('RF-01, RF-03, RF-04: guarda el préstamo con sus campos y la fecha límite', () => {
    vi.spyOn(repositorioPortatiles, 'buscarPorCodigo').mockReturnValue(
      portatil('disponible'),
    );

    const prestamo = registrarPrestamo('P-01', ANA);

    expect(prestamo).toEqual({
      id: expect.any(String),
      codigoPortatil: 'P-01',
      idProfesor: 'ana',
      fechaPrestamo: '2026-03-02T08:00:00.000Z',
      fechaLimite: '2026-03-02T13:30:00.000Z',
      estado: 'abierto',
    });
    expect(repositorioPrestamos.obtenerTodos()).toEqual([prestamo]);
  });

  test('RF-02: el portátil pasa a prestado', () => {
    vi.spyOn(repositorioPortatiles, 'buscarPorCodigo').mockReturnValue(
      portatil('disponible'),
    );

    registrarPrestamo('P-01', ANA);

    expect(repositorioPortatiles.cambiarEstado).toHaveBeenCalledWith(
      'P-01',
      'prestado',
    );
  });

  test('RF-04: en horario de verano, la fecha límite sigue siendo a las 14:30', () => {
    vi.spyOn(reloj, 'ahora').mockReturnValue(new Date('2026-06-01T07:00:00Z'));
    vi.spyOn(repositorioPortatiles, 'buscarPorCodigo').mockReturnValue(
      portatil('disponible'),
    );

    expect(registrarPrestamo('P-01', ANA).fechaLimite).toBe(
      '2026-06-01T12:30:00.000Z',
    );
  });

  test.each([undefined, '', 5])('EC-02: rechaza el código %o', (codigo) => {
    expect(() => registrarPrestamo(codigo, ANA)).toThrow(
      'Indica el código del portátil',
    );
  });

  test('EC-03: rechaza un portátil que no existe', () => {
    vi.spyOn(repositorioPortatiles, 'buscarPorCodigo').mockReturnValue(undefined);

    expect(() => registrarPrestamo('P-99', ANA)).toThrow('El portátil no existe');
  });

  test('EC-04: rechaza un portátil averiado', () => {
    vi.spyOn(repositorioPortatiles, 'buscarPorCodigo').mockReturnValue(
      portatil('averiado'),
    );

    expect(() => registrarPrestamo('P-01', ANA)).toThrow('El portátil está averiado');
  });

  test('EC-05: rechaza un portátil ya prestado', () => {
    vi.spyOn(repositorioPortatiles, 'buscarPorCodigo').mockReturnValue(
      portatil('prestado'),
    );

    expect(() => registrarPrestamo('P-01', ANA)).toThrow(
      'El portátil ya está prestado',
    );
  });

  test('EC-06: si no se puede guardar el préstamo, el portátil no cambia', () => {
    vi.spyOn(repositorioPortatiles, 'buscarPorCodigo').mockReturnValue(
      portatil('disponible'),
    );
    vi.spyOn(repositorioPrestamos, 'guardar').mockImplementation(() => {
      throw new Error('Fallo al guardar');
    });

    expect(() => registrarPrestamo('P-01', ANA)).toThrow('Fallo al guardar');
    expect(repositorioPortatiles.cambiarEstado).not.toHaveBeenCalled();
  });
});
