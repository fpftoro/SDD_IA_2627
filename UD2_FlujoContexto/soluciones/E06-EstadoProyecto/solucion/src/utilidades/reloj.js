const ZONA = 'Europe/Madrid';

const FORMATO_DIA = new Intl.DateTimeFormat('sv-SE', {
  timeZone: ZONA,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function desfaseDe(fecha) {
  // «GMT+01:00» o «GMT+02:00», según sea horario de invierno o de verano.
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: ZONA,
    timeZoneName: 'longOffset',
  }).formatToParts(fecha);
  return partes.find((parte) => parte.type === 'timeZoneName').value.slice(3);
}

export const reloj = {
  ahora() {
    return new Date();
  },

  // Las 14:30 de hoy en la hora peninsular, en ISO 8601 y UTC.
  limiteDeHoy() {
    const ahora = this.ahora();
    const dia = FORMATO_DIA.format(ahora);
    return new Date(`${dia}T14:30:00${desfaseDe(ahora)}`).toISOString();
  },
};
