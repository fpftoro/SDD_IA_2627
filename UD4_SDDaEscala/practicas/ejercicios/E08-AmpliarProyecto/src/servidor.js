import { app } from './app.js';

const PUERTO = process.env.PUERTO ?? 3000;

app.listen(PUERTO, () => {
  console.log(`Lista de tareas en http://localhost:${PUERTO}`);
});
