import { Router } from 'express';
import {
  buscarPortatilHttp,
  listarPortatilesHttp,
} from '../controladores/controlador-portatiles.js';

export const rutasPortatiles = Router();

rutasPortatiles.get('/', listarPortatilesHttp);
rutasPortatiles.get('/:id', buscarPortatilHttp);
