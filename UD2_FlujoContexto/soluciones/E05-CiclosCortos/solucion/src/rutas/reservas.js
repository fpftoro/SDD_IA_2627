import { Router } from 'express';
import {
  crearReservaHttp,
  listarReservasHttp,
} from '../controladores/controlador-reservas.js';
import { usuarioActual } from '../middlewares/usuario-actual.js';

export const rutasReservas = Router();

rutasReservas.post('/', usuarioActual, crearReservaHttp);
rutasReservas.get('/', usuarioActual, listarReservasHttp);
