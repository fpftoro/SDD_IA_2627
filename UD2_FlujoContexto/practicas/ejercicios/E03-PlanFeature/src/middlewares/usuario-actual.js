const PAPELES = ['profesor', 'coordinacion'];

// El sistema del centro añade a cada petición el usuario y su papel.
// Las rutas que necesitan saber quién hace la petición usan este middleware.
export function usuarioActual(peticion, respuesta, siguiente) {
  const id = peticion.get('X-Usuario');
  const papel = peticion.get('X-Papel');

  if (!id || !PAPELES.includes(papel)) {
    respuesta.status(401).json({ error: 'Tienes que identificarte' });
    return;
  }

  peticion.usuario = { id, papel };
  siguiente();
}
