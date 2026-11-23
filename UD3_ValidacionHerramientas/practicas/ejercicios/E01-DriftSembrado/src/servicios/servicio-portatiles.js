import { ErrorValidacion } from '../errores/error-validacion.js';
import { repositorioPortatiles } from '../repositorios/repositorio-portatiles.js';

const ESTADOS = ['disponible', 'prestado', 'averiado'];

export function listarPortatiles(estado) {
  if (estado !== undefined) {
    estado = estado.toLowerCase();
  }
  if (estado !== undefined && !ESTADOS.includes(estado)) {
    throw new ErrorValidacion(
      'El estado debe ser disponible, prestado o averiado',
    );
  }

  return repositorioPortatiles
    .obtenerTodos()
    .filter((portatil) => estado === undefined || portatil.estado === estado)
    // TODO: confirmar con la coordinación si el orden por carro es definitivo
    .sort(
      (a, b) =>
        a.carro.localeCompare(b.carro) || a.codigo.localeCompare(b.codigo),
    );
}
