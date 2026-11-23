import { describe, expect, test } from 'vitest';
import { generarAvisos } from '../src/avisos.js';

// Tests de caracterización: fijan lo que hace HOY generarAvisos, no lo que debería hacer.
// Los marcados como FALLO documentan un comportamiento que producto ha decidido corregir.

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

describe('generarAvisos: lo que se conserva', () => {
  test('CAR-01: avisa de un préstamo que lleva 7 días y no de uno que lleva 6', () => {
    expect(generarAvisos([prestamo(1, 'ana', '2027-03-03')], HOY)).toBe(
      'El portátil 1 lleva 7 días con ana',
    );
    expect(generarAvisos([prestamo(1, 'ana', '2027-03-04')], HOY)).toBe(
      'Sin avisos',
    );
  });

  test('CAR-02: añade "(sin cargador)" si el cargador salió como false', () => {
    const avisos = generarAvisos(
      [prestamo(7, 'luis', '2027-03-01', { cargador: false })],
      HOY,
    );
    expect(avisos).toBe('El portátil 7 lleva 9 días con luis (sin cargador)');
  });

  test('CAR-03: sin avisos devuelve el texto "Sin avisos", también con la lista vacía', () => {
    expect(generarAvisos([], HOY)).toBe('Sin avisos');
  });

  test('CAR-04: no avisa de los préstamos devueltos', () => {
    const devuelto = prestamo(1, 'ana', '2027-02-01', { estado: 'devuelto' });
    expect(generarAvisos([devuelto], HOY)).toBe('Sin avisos');
  });

  test('CAR-05: no avisa de un préstamo con fecha de salida futura', () => {
    expect(generarAvisos([prestamo(1, 'ana', '2027-04-01')], HOY)).toBe(
      'Sin avisos',
    );
  });

  test('CAR-06: avisa de cualquier estado distinto de devuelto', () => {
    const perdido = prestamo(1, 'ana', '2027-02-01', { estado: 'perdido' });
    expect(generarAvisos([perdido], HOY)).toBe(
      'El portátil 1 lleva 37 días con ana',
    );
  });

  test('CAR-07: cuenta días completos entre la fecha de salida y hoy', () => {
    const avisos = generarAvisos([prestamo(1, 'ana', '2027-02-01')], HOY);
    expect(avisos).toContain('lleva 37 días');
  });

  test('CAR-08: el cargador solo cuenta como ausente si es false o 0; undefined y null no avisan', () => {
    const con = (cargador) =>
      generarAvisos([prestamo(1, 'ana', '2027-02-01', { cargador })], HOY);
    expect(con(false)).toContain('(sin cargador)');
    expect(con(0)).toContain('(sin cargador)');
    expect(con(undefined)).not.toContain('(sin cargador)');
    expect(con(null)).not.toContain('(sin cargador)');
  });
});
