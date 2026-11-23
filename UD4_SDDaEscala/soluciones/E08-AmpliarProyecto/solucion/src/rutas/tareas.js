import { Router } from 'express';
import {
  borrarTareaHttp,
  completarTareaHttp,
  crearTareaHttp,
  listarTareasHttp,
} from '../controladores/controlador-tareas.js';

export const rutasTareas = Router();

rutasTareas.get('/', listarTareasHttp);
rutasTareas.post('/', crearTareaHttp);
rutasTareas.post('/:id/hecha', completarTareaHttp);
rutasTareas.delete('/:id', borrarTareaHttp);
