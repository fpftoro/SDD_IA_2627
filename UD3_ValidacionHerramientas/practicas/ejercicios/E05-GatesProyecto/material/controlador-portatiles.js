// Material del E05: versión del controlador con una violación de capas.
// Cópiala sobre src/controladores/controlador-portatiles.js en la rama prueba-gates.

import { ErrorNoEncontrado } from '../errores/error-no-encontrado.js';
import { ErrorValidacion } from '../errores/error-validacion.js';
import { repositorioPortatiles } from '../repositorios/repositorio-portatiles.js';
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
    respuesta.status(200).json(listarPortatiles(peticion.query.estado));
  } catch (error) {
    responderError(error, respuesta);
  }
}

export function buscarPortatilHttp(peticion, respuesta) {
  try {
    const portatil = buscarPortatil(peticion.params.id);
    respuesta.status(200).json(repositorioPortatiles.obtenerPorId(portatil.id));
  } catch (error) {
    responderError(error, respuesta);
  }
}
