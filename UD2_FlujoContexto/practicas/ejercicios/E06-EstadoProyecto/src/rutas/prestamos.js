import { Router } from 'express';
import { registrarPrestamoHttp } from '../controladores/controlador-prestamos.js';
import { usuarioActual } from '../middlewares/usuario-actual.js';

export const rutasPrestamos = Router();

rutasPrestamos.post('/', usuarioActual, registrarPrestamoHttp);
