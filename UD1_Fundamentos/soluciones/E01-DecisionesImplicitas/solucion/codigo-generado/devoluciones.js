// Generado por el agente a partir del prompt:
// «Haz un endpoint para registrar la devolución de un portátil.»
import express from 'express';
import { portatiles, prestamos } from './datos.js';

export const usuariosBloqueados = [];
const router = express.Router();

router.post('/devoluciones', (req, res) => {
  const { portatilId, fecha, conCargador = true } = req.body;

  const portatil = portatiles.find((p) => p.id === portatilId);
  portatil.estado = 'disponible';

  const indice = prestamos.findIndex((p) => p.portatilId === portatilId);
  const prestamo = prestamos[indice];

  // Si se devuelve tarde, el usuario queda bloqueado una semana
  if (prestamo && new Date(fecha) > new Date(prestamo.fechaLimite)) {
    usuariosBloqueados.push({ usuario: prestamo.usuario, dias: 7 });
  }

  prestamos.splice(indice, 1);

  res.json({ message: 'Return registered', portatil, conCargador });
});

export default router;
