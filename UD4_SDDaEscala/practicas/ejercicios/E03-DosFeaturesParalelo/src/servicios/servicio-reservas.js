import { randomUUID } from 'node:crypto';
import { ErrorConflicto } from '../errores/error-conflicto.js';
import { ErrorNoEncontrado } from '../errores/error-no-encontrado.js';
import { ErrorValidacion } from '../errores/error-validacion.js';
import { repositorioReservas } from '../repositorios/repositorio-reservas.js';
import { reloj } from '../utilidades/reloj.js';

const CARROS = ['A', 'B', 'C'];
const PATRON_DIA = /^\d{4}-\d{2}-\d{2}$/;
const DIAS_DE_ANTELACION = 14;

function comoFecha(dia) {
  return new Date(`${dia}T00:00:00Z`);
}

function esFechaReal(dia) {
  const fecha = comoFecha(dia);
  return !Number.isNaN(fecha.getTime()) && fecha.toISOString().slice(0, 10) === dia;
}

function sumarDias(dia, dias) {
  const fecha = comoFecha(dia);
  fecha.setUTCDate(fecha.getUTCDate() + dias);
  return fecha.toISOString().slice(0, 10);
}

// Las comprobaciones van en el orden de los edge cases de la spec (EC-16).
export function crearReserva(datos, usuario) {
  const { carro, dia, hora } = datos;

  if (carro === undefined || dia === undefined || hora === undefined) {
    throw new ErrorValidacion('Los campos carro, dia y hora son obligatorios');
  }
  if (
    typeof carro !== 'string' ||
    !Number.isInteger(hora) ||
    typeof dia !== 'string' ||
    !PATRON_DIA.test(dia)
  ) {
    throw new ErrorValidacion(
      'Los datos de la reserva no tienen el formato correcto',
    );
  }
  if (!CARROS.includes(carro)) {
    throw new ErrorNoEncontrado('El carro no existe');
  }
  if (hora < 1 || hora > 6) {
    throw new ErrorValidacion('La hora debe ser un número del 1 al 6');
  }
  if (!esFechaReal(dia)) {
    throw new ErrorValidacion('El día no es una fecha válida');
  }
  const diaDeLaSemana = comoFecha(dia).getUTCDay();
  if (diaDeLaSemana === 0 || diaDeLaSemana === 6) {
    throw new ErrorValidacion('Solo se puede reservar de lunes a viernes');
  }
  const hoy = reloj.hoy();
  if (dia < hoy) {
    throw new ErrorValidacion('No se puede reservar un día que ya ha pasado');
  }
  if (dia > sumarDias(hoy, DIAS_DE_ANTELACION)) {
    throw new ErrorValidacion(
      'Solo se puede reservar con 14 días de antelación como máximo',
    );
  }
  if (repositorioReservas.buscar(carro, dia, hora)) {
    throw new ErrorConflicto('El carro ya está reservado a esa hora');
  }

  return repositorioReservas.guardar({
    id: randomUUID(),
    carro,
    dia,
    hora,
    profesor: usuario.id,
  });
}

export function listarReservasDelDia(dia) {
  if (typeof dia !== 'string' || !PATRON_DIA.test(dia)) {
    throw new ErrorValidacion('Indica el día con el formato AAAA-MM-DD');
  }

  return repositorioReservas
    .obtenerPorDia(dia)
    .sort((a, b) => a.hora - b.hora || a.carro.localeCompare(b.carro));
}
