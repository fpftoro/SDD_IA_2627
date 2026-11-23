import { Router } from 'express';
import { usuarioActual } from '../middlewares/usuario-actual.js';

export const rutasPrestamos = Router();

// Borrador de la feature D: sin controlador todavía.
rutasPrestamos.post('/:id/devolucion', usuarioActual, (peticion, respuesta) => {
  respuesta.status(501).json({ error: 'Sin implementar' });
});
