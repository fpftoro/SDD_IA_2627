import express from 'express';
import { rutasPortatiles } from './rutas/portatiles.js';
import { rutasReservas } from './rutas/reservas.js';

export const app = express();

app.use(express.json());
app.use('/api/portatiles', rutasPortatiles);
app.use('/api/reservas', rutasReservas);
