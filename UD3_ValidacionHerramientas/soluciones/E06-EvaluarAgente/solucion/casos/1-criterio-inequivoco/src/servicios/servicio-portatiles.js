import { ErrorNoEncontrado } from '../errores/error-no-encontrado.js';
import { ErrorValidacion } from '../errores/error-validacion.js';
import { repositorioPortatiles } from '../repositorios/repositorio-portatiles.js';

const ESTADOS = ['disponible', 'prestado', 'averiado'];
const CARROS = ['A', 'B'];

export function listarPortatiles(estado, carro) {
  if (estado !== undefined && !ESTADOS.includes(estado)) {
    throw new ErrorValidacion(
      'El estado debe ser disponible, prestado o averiado',
    );
  }

  if (carro !== undefined && !CARROS.includes(carro)) {
    throw new ErrorValidacion('El carro debe ser A o B');
  }

  return repositorioPortatiles
    .obtenerTodos()
    .filter((portatil) => estado === undefined || portatil.estado === estado)
    .filter((portatil) => carro === undefined || portatil.carro === carro)
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
    throw new ErrorNoEncontrado('El portátil no existe');
  }
  return portatil;
}
