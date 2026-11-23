import { ErrorNoEncontrado } from '../errores/error-no-encontrado.js';
import { ErrorValidacion } from '../errores/error-validacion.js';
import {
  buscarPortatil,
  listarPortatiles,
} from '../servicios/servicio-portatiles.js';

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
    respuesta.status(200).json(
      listarPortatiles(peticion.query.estado, peticion.query.carro),
    );
  } catch (error) {
    responderError(error, respuesta);
  }
}

export function buscarPortatilHttp(peticion, respuesta) {
  try {
    respuesta.status(200).json(buscarPortatil(peticion.params.id));
  } catch (error) {
    responderError(error, respuesta);
  }
}
