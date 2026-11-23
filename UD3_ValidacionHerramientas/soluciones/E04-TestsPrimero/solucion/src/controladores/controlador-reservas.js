import { ErrorConflicto } from '../errores/error-conflicto.js';
import { ErrorNoEncontrado } from '../errores/error-no-encontrado.js';
import { ErrorValidacion } from '../errores/error-validacion.js';
import { crearReserva } from '../servicios/servicio-reservas.js';

export function crearReservaHttp(peticion, respuesta) {
  try {
    const { carro, fecha, franja } = peticion.body ?? {};
    respuesta.status(201).json(crearReserva({ carro, fecha, franja }));
  } catch (error) {
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
    respuesta.status(500).json({ error: 'Error al guardar la reserva' });
  }
}
