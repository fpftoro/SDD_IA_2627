const tareas = [];

export const repositorioTareas = {
  guardar(tarea) {
    tareas.push(tarea);
    return tarea;
  },

  obtenerTodas() {
    return [...tareas];
  },

  borrar(id) {
    const posicion = tareas.findIndex((tarea) => tarea.id === id);
    if (posicion === -1) {
      return false;
    }
    tareas.splice(posicion, 1);
    return true;
  },

  vaciar() {
    tareas.length = 0;
  },
};
