import { ErrorNoEncontrado } from '../errores/error-no-encontrado.js';
import { ErrorValidacion } from '../errores/error-validacion.js';
import { repositorioPortatiles } from '../repositorios/repositorio-portatiles.js';

const ESTADOS = ['disponible', 'prestado', 'averiado'];

export function listarPortatiles(estado) {
  if (estado !== undefined && !ESTADOS.includes(estado)) {
    throw new ErrorValidacion(
      'El estado debe ser disponible, prestado o averiado',
    );
  }

  return repositorioPortatiles
    .obtenerTodos()
    .filter((portatil) => estado === undefined || portatil.estado === estado)
    .sort((a, b) => a.codigo.localeCompare(b.codigo));
}

export function buscarPortatil(idTexto) {
  if (!/^[1-9][0-9]*$/.test(idTexto)) {
    throw new ErrorValidacion(
      'El identificador debe ser un número entero positivo',
    );
  }

  const portatil = repositorioPortatiles.obtenerPorId(Number(idTexto));
  if (!portatil) {
    throw new ErrorNoEncontrado('No hay ningún portátil con ese identificador');
  }
  return portatil;
}
