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

  actualizar(tareaActualizada) {
    const posicion = tareas.findIndex((tarea) => tarea.id === tareaActualizada.id);
    tareas[posicion] = tareaActualizada;
    return tareaActualizada;
  },

  vaciar() {
    tareas.length = 0;
  },
};
