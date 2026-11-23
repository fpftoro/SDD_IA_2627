import { randomUUID } from 'node:crypto';
import { ErrorConflicto } from '../errores/error-conflicto.js';
import { ErrorNoEncontrado } from '../errores/error-no-encontrado.js';
import { ErrorValidacion } from '../errores/error-validacion.js';
import { repositorioPortatiles } from '../repositorios/repositorio-portatiles.js';
import { repositorioReservas } from '../repositorios/repositorio-reservas.js';

const formatoFecha = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Europe/Madrid',
});

function hoy() {
  return formatoFecha.format(new Date());
}

function esFechaValida(fecha) {
  if (typeof fecha !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return false;
  }
  const comprobada = new Date(`${fecha}T00:00:00Z`);
  return comprobada.toISOString().slice(0, 10) === fecha;
}

export function crearReserva({ carro, fecha, franja }) {
  if (carro === undefined || fecha === undefined || franja === undefined) {
    throw new ErrorValidacion(
      'Faltan datos: carro, fecha y franja son obligatorios',
    );
  }
  if (!esFechaValida(fecha)) {
    throw new ErrorValidacion('La fecha debe tener el formato AAAA-MM-DD');
  }
  if (!Number.isInteger(franja) || franja < 1 || franja > 6) {
    throw new ErrorValidacion('La franja debe ser un número del 1 al 6');
  }
  if (fecha < hoy()) {
    throw new ErrorValidacion('No se puede reservar en una fecha pasada');
  }

  const carros = repositorioPortatiles
    .obtenerTodos()
    .map((portatil) => portatil.carro);
  if (!carros.includes(carro)) {
    throw new ErrorNoEncontrado('El carro no existe');
  }

  const ocupada = repositorioReservas
    .obtenerTodas()
    .some(
      (reserva) =>
        reserva.carro === carro &&
        reserva.fecha === fecha &&
        reserva.franja === franja,
    );
  if (ocupada) {
    throw new ErrorConflicto('El carro ya está reservado en esa franja');
  }

  return repositorioReservas.guardar({ id: randomUUID(), carro, fecha, franja });
}
