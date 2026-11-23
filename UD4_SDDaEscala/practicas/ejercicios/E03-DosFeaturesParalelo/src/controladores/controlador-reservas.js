import { ErrorConflicto } from '../errores/error-conflicto.js';
import { ErrorNoEncontrado } from '../errores/error-no-encontrado.js';
import { ErrorValidacion } from '../errores/error-validacion.js';
import {
  crearReserva,
  listarReservasDelDia,
} from '../servicios/servicio-reservas.js';

function responderError(error, respuesta, mensajeInesperado) {
  if (error instanceof ErrorValidacion) {
    respuesta.status(400).json({ error: error.message });
    return;
  }
  if (error instanceof ErrorNoEncontrado) {
    respuesta.status(404).json({ error: error.message });
    return;
  }
  if (error instanceof ErrorConflicto) {
    respuesta.status(409).json({ error: error.message });
    return;
  }
  respuesta.status(500).json({ error: mensajeInesperado });
}

export function crearReservaHttp(peticion, respuesta) {
  try {
    // Solo se leen los tres campos de la spec (EC-11).
    const { carro, dia, hora } = peticion.body ?? {};
    const reserva = crearReserva({ carro, dia, hora }, peticion.usuario);
    respuesta.status(201).json(reserva);
  } catch (error) {
    responderError(error, respuesta, 'No se ha podido guardar la reserva');
  }
}

export function listarReservasHttp(peticion, respuesta) {
  try {
    respuesta.status(200).json(listarReservasDelDia(peticion.query.dia));
  } catch (error) {
    responderError(error, respuesta, 'No se han podido consultar las reservas');
  }
}
