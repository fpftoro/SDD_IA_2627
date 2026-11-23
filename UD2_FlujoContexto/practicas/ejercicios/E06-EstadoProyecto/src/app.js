import express from 'express';
import { rutasPortatiles } from './rutas/portatiles.js';
import { rutasPrestamos } from './rutas/prestamos.js';

export const app = express();

app.use(express.json());
app.use('/api/portatiles', rutasPortatiles);
app.use('/api/prestamos', rutasPrestamos);
