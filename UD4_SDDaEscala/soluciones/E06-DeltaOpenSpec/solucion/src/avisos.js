import {
  ordenarAvisos,
  prestamosConAviso,
} from './servicios/servicio-avisos.js';

function redactarAviso({ prestamo, dias }) {
  const profesor = prestamo.profesor || 'un profesor desconocido';
  let texto = `El portátil ${prestamo.portatil} lleva ${dias} días con ${profesor}`;
  // Igualdad laxa a propósito: se conserva el comportamiento (CAR-08).
  if (prestamo.cargador == false) texto += ' (sin cargador)';
  return texto;
}

export function generarAvisos(prestamos, hoy) {
  const avisos = ordenarAvisos(prestamosConAviso(prestamos, hoy));
  if (avisos.length === 0) return 'Sin avisos';
  return avisos.map(redactarAviso).join('\n');
}
