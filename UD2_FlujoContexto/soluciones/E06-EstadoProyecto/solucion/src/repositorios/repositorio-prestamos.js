const prestamos = [];

export const repositorioPrestamos = {
  guardar(prestamo) {
    prestamos.push({ ...prestamo });
    return { ...prestamo };
  },

  obtenerTodos() {
    return prestamos.map((prestamo) => ({ ...prestamo }));
  },

  vaciar() {
    prestamos.length = 0;
  },
};
