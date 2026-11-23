import { ErrorConflicto } from '../errores/error-conflicto.js';
import { ErrorNoEncontrado } from '../errores/error-no-encontrado.js';
import { ErrorValidacion } from '../errores/error-validacion.js';
import { registrarPrestamo } from '../servicios/servicio-prestamos.js';

const CODIGOS = new Map([
  [ErrorValidacion, 400],
  [ErrorNoEncontrado, 404],
  [ErrorConflicto, 409],
]);

export function registrarPrestamoHttp(peticion, respuesta) {
  try {
    const prestamo = registrarPrestamo(
      peticion.body?.codigoPortatil,
      peticion.usuario,
    );
    respuesta.status(201).json(prestamo);
  } catch (error) {
    const codigo = CODIGOS.get(error.constructor);
    if (codigo) {
      respuesta.status(codigo).json({ error: error.message });
      return;
    }
    respuesta.status(500).json({ error: 'No se ha podido registrar el préstamo' });
  }
}
