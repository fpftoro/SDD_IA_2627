// Prueba rápida del módulo con datos de ejemplo: node ejemplo.js
import { generarAvisos } from './src/avisos.js';

const prestamos = [
  { id: 1, portatil: 4, profesor: 'ana', fechaSalida: '2027-02-20', cargador: true, estado: 'activo' },
  { id: 2, portatil: 7, profesor: 'luis', fechaSalida: '2027-02-27', cargador: false, estado: 'activo' },
  { id: 3, portatil: 2, profesor: 'ana', fechaSalida: '2027-03-01', cargador: true, estado: 'activo' },
  { id: 4, portatil: 9, profesor: 'marta', fechaSalida: '2027-02-10', cargador: true, estado: 'devuelto' },
];

console.log(generarAvisos(prestamos, '2027-03-07'));
