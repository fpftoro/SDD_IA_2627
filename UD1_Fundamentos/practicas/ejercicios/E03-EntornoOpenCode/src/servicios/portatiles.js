import { portatiles } from '../datos/portatiles.js';

const ESTADOS = ['disponible', 'prestado', 'averiado'];

/**
 * Devuelve los portátiles, filtrados por estado si se indica.
 * @param {string} [estado] disponible, prestado o averiado.
 * @returns {object[]} Los portátiles que cumplen el filtro.
 */
export function listarPortatiles(estado) {
  if (estado === undefined) {
    return portatiles;
  }
  if (!ESTADOS.includes(estado)) {
    throw new Error(`Estado no válido: ${estado}`);
  }
  return portatiles.filter((portatil) => portatil.estado === estado);
}

/**
 * Busca un portátil por su identificador.
 * @param {number} id Identificador del portátil.
 * @returns {object | undefined} El portátil, o undefined si no existe.
 */
export function buscarPortatil(id) {
  return portatiles.find((portatil) => portatil.id === id);
}
