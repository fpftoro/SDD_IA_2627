const prestamos = [];
let ultimoId = 0;

export const repositorioPrestamos = {
  guardar(datos) {
    ultimoId += 1;
    const prestamo = { id: ultimoId, estado: 'activo', ...datos };
    prestamos.push(prestamo);
    return { ...prestamo };
  },

  buscarPorId(id) {
    const prestamo = prestamos.find((candidato) => candidato.id === id);
    return prestamo ? { ...prestamo } : undefined;
  },

  vaciar() {
    prestamos.length = 0;
    ultimoId = 0;
  },
};
