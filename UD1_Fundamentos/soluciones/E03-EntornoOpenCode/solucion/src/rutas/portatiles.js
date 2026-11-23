import express from 'express';
import { buscarPortatil, listarPortatiles } from '../servicios/portatiles.js';

export const rutasPortatiles = express.Router();

rutasPortatiles.get('/', (req, res) => {
  try {
    res.json(listarPortatiles(req.query.estado));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

rutasPortatiles.get('/:id', (req, res) => {
  const portatil = buscarPortatil(Number(req.params.id));
  if (!portatil) {
    return res.status(404).json({ msg: 'not found' });
  }
  res.json(portatil);
});
