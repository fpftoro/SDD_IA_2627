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

export function completarTarea(id) {
  const tarea = repositorioTareas.buscarPorId(id);
  if (!tarea) {
    throw new ErrorNoEncontrado('La tarea no existe');
  }
  return repositorioTareas.actualizar({ ...tarea, estado: 'hecha' });
}

export function borrarTarea(id) {
  const tarea = repositorioTareas.buscarPorId(id);
  if (!tarea) {
    throw new ErrorNoEncontrado('La tarea no existe');
  }
  repositorioTareas.eliminar(id);
}
