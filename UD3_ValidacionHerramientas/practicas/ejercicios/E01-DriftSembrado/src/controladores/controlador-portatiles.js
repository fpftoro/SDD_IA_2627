import { ErrorNoEncontrado } from '../errores/error-no-encontrado.js';
import { ErrorValidacion } from '../errores/error-validacion.js';
import { repositorioPortatiles } from '../repositorios/repositorio-portatiles.js';
import { listarPortatiles } from '../servicios/servicio-portatiles.js';

function responderError(error, respuesta) {
  if (error instanceof ErrorValidacion) {
    respuesta.status(400).json({ error: error.message });
    return;
  }
  if (error instanceof ErrorNoEncontrado) {
    respuesta.status(404).json({ error: error.message });
    return;
  }
  respuesta.status(500).json({ error: 'Error al consultar los portátiles' });
}

export function listarPortatilesHttp(peticion, respuesta) {
  try {
    respuesta.status(200).json(listarPortatiles(peticion.query.estado));
  } catch (error) {
    responderError(error, respuesta);
  }
}

export function buscarPortatilHttp(peticion, respuesta) {
  try {
    const id = Number(peticion.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      throw new ErrorValidacion(
        'El identificador debe ser un número entero positivo',
      );
    }
    const portatil = repositorioPortatiles.obtenerPorId(id);
    if (!portatil) {
      throw new ErrorNoEncontrado('Portátil no encontrado');
    }
    respuesta.status(200).json(portatil);
  } catch (error) {
    responderError(error, respuesta);
  }
}
