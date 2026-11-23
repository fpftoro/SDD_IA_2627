import express from 'express';
import { rutasTareas } from './rutas/tareas.js';

export const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/tareas', rutasTareas);

app.use((error, peticion, respuesta, siguiente) => {
  if (error.type === 'entity.parse.failed') {
    respuesta
      .status(400)
      .json({ error: 'El campo text es obligatorio y debe ser texto' });
    return;
  }
  siguiente(error);
});
