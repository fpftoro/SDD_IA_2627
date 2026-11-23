import { Router } from 'express';
import {
  borrarTareaHttp,
  crearTareaHttp,
  listarTareasHttp,
} from '../controladores/controlador-tareas.js';

export const rutasTareas = Router();

rutasTareas.get('/', listarTareasHttp);
rutasTareas.post('/', crearTareaHttp);
rutasTareas.delete('/:id', borrarTareaHttp);
