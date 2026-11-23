const portatiles = [
  { id: 3, codigo: 'P-03', carro: 'A', estado: 'averiado' },
  { id: 1, codigo: 'P-01', carro: 'A', estado: 'disponible' },
  { id: 4, codigo: 'P-04', carro: 'B', estado: 'disponible' },
  { id: 2, codigo: 'P-02', carro: 'B', estado: 'prestado' },
  { id: 6, codigo: 'P-06', carro: 'B', estado: 'prestado' },
  { id: 5, codigo: 'P-05', carro: 'A', estado: 'disponible' },
];

export const repositorioPortatiles = {
  obtenerTodos() {
    return portatiles.map((portatil) => ({ ...portatil }));
  },

  obtenerPorId(id) {
    const portatil = portatiles.find((candidato) => candidato.id === id);
    return portatil ? { ...portatil } : undefined;
  },

};
