import { Router } from 'express';
import { crearReservaHttp } from '../controladores/controlador-reservas.js';

export const rutasReservas = Router();

rutasReservas.post('/', crearReservaHttp);
