const reservas = [];

export const repositorioReservas = {
  guardar(reserva) {
    reservas.push(reserva);
    return { ...reserva };
  },

  obtenerTodas() {
    return reservas.map((reserva) => ({ ...reserva }));
  },

  vaciar() {
    reservas.length = 0;
  },
};
