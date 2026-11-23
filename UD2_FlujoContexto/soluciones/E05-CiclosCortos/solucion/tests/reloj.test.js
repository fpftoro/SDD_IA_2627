import { afterEach, expect, test, vi } from 'vitest';
import { reloj } from '../src/utilidades/reloj.js';

afterEach(() => {
  vi.useRealTimers();
});

test('RNF-04: hoy es la fecha en la hora peninsular, no en UTC', () => {
  vi.useFakeTimers();

  // 23:30 en UTC es ya la 00:30 del día siguiente en la hora peninsular.
  vi.setSystemTime(new Date('2027-03-01T23:30:00Z'));
  expect(reloj.hoy()).toBe('2027-03-02');

  vi.setSystemTime(new Date('2027-03-01T22:30:00Z'));
  expect(reloj.hoy()).toBe('2027-03-01');
});
