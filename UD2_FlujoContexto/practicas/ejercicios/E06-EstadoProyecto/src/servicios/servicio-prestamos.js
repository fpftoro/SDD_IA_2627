import { randomUUID } from 'node:crypto';
import { ErrorConflicto } from '../errores/error-conflicto.js';
import { ErrorNoEncontrado } from '../errores/error-no-encontrado.js';
import { ErrorValidacion } from '../errores/error-validacion.js';
import { repositorioPortatiles } from '../repositorios/repositorio-portatiles.js';
import { repositorioPrestamos } from '../repositorios/repositorio-prestamos.js';
import { reloj } from '../utilidades/reloj.js';

export function registrarPrestamo(codigoPortatil, usuario) {
  if (typeof codigoPortatil !== 'string' || codigoPortatil === '') {
    throw new ErrorValidacion('Indica el código del portátil');
  }

  const portatil = repositorioPortatiles.buscarPorCodigo(codigoPortatil);
  if (!portatil) {
    throw new ErrorNoEncontrado('El portátil no existe');
  }
  if (portatil.estado === 'averiado') {
    throw new ErrorConflicto('El portátil está averiado');
  }
  if (portatil.estado === 'prestado') {
    throw new ErrorConflicto('El portátil ya está prestado');
  }

  // Primero se guarda el préstamo: si falla, el portátil no cambia (EC-06).
  const prestamo = repositorioPrestamos.guardar({
    id: randomUUID(),
    codigoPortatil,
    idProfesor: usuario.id,
    fechaPrestamo: reloj.ahora().toISOString(),
    fechaLimite: reloj.limiteDeHoy(),
    estado: 'abierto',
  });
  repositorioPortatiles.cambiarEstado(codigoPortatil, 'prestado');
  return prestamo;
}
