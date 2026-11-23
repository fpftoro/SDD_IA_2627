const prestamos = new Map();

export const repositorioPrestamos = {
  guardar(prestamo) {
    prestamos.set(prestamo.id, { ...prestamo });
    return { ...prestamo };
  },

  buscarPorId(id) {
    const prestamo = prestamos.get(id);
    return prestamo ? { ...prestamo } : undefined;
  },

  marcarDevuelto(id, fechaDevolucion, cargadorDevuelto) {
    const prestamo = prestamos.get(id);
    prestamo.estado = 'devuelto';
    prestamo.fechaDevolucion = fechaDevolucion;
    prestamo.cargadorDevuelto = cargadorDevuelto;
    return { ...prestamo };
  },

  vaciar() {
    prestamos.clear();
  },
};
