import { ErrorValidacion } from '../errores/error-validacion.js';
import { diasEntre } from '../utilidades/dias.js';

const DIAS_PARA_AVISAR = 7;

export function prestamosConAviso(prestamos, hoy) {
  if (Number.isNaN(Date.parse(hoy))) {
    throw new ErrorValidacion('La fecha de hoy no es válida');
  }

  const avisos = [];
  for (const prestamo of prestamos) {
    if (prestamo.estado === 'devuelto') continue;
    const dias = diasEntre(prestamo.fechaSalida, hoy);
    if (Number.isNaN(dias)) {
      throw new ErrorValidacion(
        `La fecha de salida del préstamo ${prestamo.id} no es válida`,
      );
    }
    if (dias >= DIAS_PARA_AVISAR) avisos.push({ prestamo, dias });
  }
  return avisos;
}

function nombreParaOrdenar(aviso) {
  return (aviso.prestamo.profesor || '').toLowerCase();
}

// Primero el más antiguo; a igual antigüedad, por profesor sin distinguir
// mayúsculas; y a igualdad total, en el orden de entrada (la ordenación es
// estable).
export function ordenarAvisos(avisos) {
  return [...avisos].sort(
    (a, b) =>
      b.dias - a.dias ||
      nombreParaOrdenar(a).localeCompare(nombreParaOrdenar(b), 'es'),
  );
}
