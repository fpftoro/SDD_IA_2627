import { randomUUID } from 'node:crypto';
import { ErrorNoEncontrado } from '../errores/error-no-encontrado.js';
import { ErrorValidacion } from '../errores/error-validacion.js';
import { repositorioTareas } from '../repositorios/repositorio-tareas.js';

const LONGITUD_MAXIMA = 280;

export function crearTarea(texto) {
  if (typeof texto !== 'string') {
    throw new ErrorValidacion('El campo text es obligatorio y debe ser texto');
  }

  const textoRecortado = texto.trim();

  if (textoRecortado === '') {
    throw new ErrorValidacion('El texto de la tarea no puede estar vacío');
  }

  if (textoRecortado.length > LONGITUD_MAXIMA) {
    throw new ErrorValidacion('El texto no puede superar 280 caracteres');
  }

  const tarea = {
    id: randomUUID(),
    text: textoRecortado,
    estado: 'pendiente',
    fechaCreacion: new Date().toISOString(),
  };

  return repositorioTareas.guardar(tarea);
}

export function listarTareas() {
  return repositorioTareas.obtenerTodas();
}

// Las comprobaciones van en el orden de C-EC-08: primero el cuerpo.
export function marcarTarea(id, hecha) {
  if (typeof hecha !== 'boolean') {
    throw new ErrorValidacion(
      'El campo hecha es obligatorio y debe ser true o false',
    );
  }

  const tarea = repositorioTareas.buscarPorId(id);
  if (!tarea) {
    throw new ErrorNoEncontrado('La tarea no existe');
  }

  const estado = hecha ? 'hecha' : 'pendiente';
  if (tarea.estado === estado) {
    return tarea;
  }

  return repositorioTareas.actualizar({
    ...tarea,
    estado,
    fechaCompletado: hecha ? new Date().toISOString() : null,
  });
}
