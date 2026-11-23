const reservas = [];

export const repositorioReservas = {
  guardar(reserva) {
    reservas.push({ ...reserva });
    return { ...reserva };
  },

  buscar(carro, dia, hora) {
    const reserva = reservas.find(
      (candidata) =>
        candidata.carro === carro &&
        candidata.dia === dia &&
        candidata.hora === hora,
    );
    return reserva ? { ...reserva } : undefined;
  },

  obtenerPorDia(dia) {
    return reservas
      .filter((reserva) => reserva.dia === dia)
      .map((reserva) => ({ ...reserva }));
  },

  vaciar() {
    reservas.length = 0;
  },
};
