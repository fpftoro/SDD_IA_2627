import { Router } from 'express';
import {
  crearTareaHttp,
  listarTareasHttp,
} from '../controladores/controlador-tareas.js';

export const rutasTareas = Router();

rutasTareas.get('/', listarTareasHttp);
rutasTareas.post('/', crearTareaHttp);
