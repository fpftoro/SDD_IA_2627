const FORMATO_MADRID = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Europe/Madrid',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export const reloj = {
  // La fecha de hoy en la hora peninsular, como AAAA-MM-DD (RNF-04).
  hoy() {
    return FORMATO_MADRID.format(new Date());
  },
};
