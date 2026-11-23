import { describe, expect, test } from 'vitest';
import { repositorioTareas } from '../src/repositorios/repositorio-tareas.js';

describe('repositorioTareas', () => {
  test('A-D-04: guardar devuelve la tarea guardada', () => {
    const tarea = { id: '1', text: 'Comprar leche' };

    expect(repositorioTareas.guardar(tarea)).toBe(tarea);
  });

  test('A-D-04: obtenerTodas devuelve las tareas guardadas', () => {
    const tarea = { id: '2', text: 'Comprar pan' };
    repositorioTareas.guardar(tarea);

    expect(repositorioTareas.obtenerTodas()).toContainEqual(tarea);
  });

  test('A-D-04: obtenerTodas devuelve una copia', () => {
    repositorioTareas.obtenerTodas().push({ id: 'intrusa' });

    expect(repositorioTareas.obtenerTodas()).not.toContainEqual({
      id: 'intrusa',
    });
  });

  test('B-D-05: vaciar deja el repositorio sin tareas', () => {
    repositorioTareas.guardar({ id: '3', text: 'Pagar la luz' });

    repositorioTareas.vaciar();

    expect(repositorioTareas.obtenerTodas()).toEqual([]);
  });

  test('D-D-01: borrar quita la tarea y dice si existía', () => {
    repositorioTareas.vaciar();
    repositorioTareas.guardar({ id: 'x', text: 'Comprar pan' });

    expect(repositorioTareas.borrar('x')).toBe(true);
    expect(repositorioTareas.borrar('x')).toBe(false);
    expect(repositorioTareas.obtenerTodas()).toEqual([]);
  });
});
