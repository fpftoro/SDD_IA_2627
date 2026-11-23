import { Router } from 'express';
import { usuarioActual } from '../middlewares/usuario-actual.js';

export const rutasPrestamos = Router();

// Borrador de la feature C: sin controlador todavía.
rutasPrestamos.post('/', usuarioActual, (peticion, respuesta) => {
  respuesta.status(501).json({ error: 'Sin implementar' });
});
