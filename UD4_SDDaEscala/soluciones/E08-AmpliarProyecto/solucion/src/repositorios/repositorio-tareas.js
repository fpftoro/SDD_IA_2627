const tareas = [];

export const repositorioTareas = {
  guardar(tarea) {
    tareas.push(tarea);
    return tarea;
  },

  obtenerTodas() {
    return [...tareas];
  },

  buscarPorId(id) {
    return tareas.find((tarea) => tarea.id === id);
  },

  actualizar(tarea) {
    const posicion = tareas.findIndex((candidata) => candidata.id === tarea.id);
    tareas[posicion] = tarea;
    return tarea;
  },

  eliminar(id) {
    const posicion = tareas.findIndex((tarea) => tarea.id === id);
    tareas.splice(posicion, 1);
  },

  vaciar() {
    tareas.length = 0;
  },
};
