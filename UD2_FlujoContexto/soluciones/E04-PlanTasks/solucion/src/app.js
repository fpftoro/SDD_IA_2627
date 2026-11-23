import express from 'express';
import { rutasPortatiles } from './rutas/portatiles.js';

export const app = express();

app.use(express.json());
app.use('/api/portatiles', rutasPortatiles);
