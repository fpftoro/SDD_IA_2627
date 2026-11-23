import { ErrorNoEncontrado } from '../errores/error-no-encontrado.js';
import { ErrorValidacion } from '../errores/error-validacion.js';
import {
  borrarTarea,
  completarTarea,
  crearTarea,
  listarTareas,
} from '../servicios/servicio-tareas.js';

export function crearTareaHttp(peticion, respuesta) {
  try {
    const tarea = crearTarea(peticion.body?.text);
    respuesta.status(201).json(tarea);
  } catch (error) {
    if (error instanceof ErrorValidacion) {
      respuesta.status(400).json({ error: error.message });
      return;
    }
    respuesta.status(500).json({ error: 'Error al guardar la tarea' });
  }
}

export function listarTareasHttp(peticion, respuesta) {
  try {
    respuesta.status(200).json(listarTareas());
  } catch {
    respuesta.status(500).json({ error: 'Error al obtener las tareas' });
  }
}

export function completarTareaHttp(peticion, respuesta) {
  try {
    respuesta.status(200).json(completarTarea(peticion.params.id));
  } catch (error) {
    if (error instanceof ErrorNoEncontrado) {
      respuesta.status(404).json({ error: error.message });
      return;
    }
    respuesta.status(500).json({ error: 'Error al actualizar la tarea' });
  }
}

export function borrarTareaHttp(peticion, respuesta) {
  try {
    borrarTarea(peticion.params.id);
    respuesta.status(204).end();
  } catch (error) {
    if (error instanceof ErrorNoEncontrado) {
      respuesta.status(404).json({ error: error.message });
      return;
    }
    respuesta.status(500).json({ error: 'Error al borrar la tarea' });
  }
}
