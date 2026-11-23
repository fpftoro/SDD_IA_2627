// Avisos de devolución. Lo escribió alguien que ya no está en el centro.
// Se ejecuta cada mañana desde un script y el resultado se pega en el
// correo de la coordinación TIC. No tocar si no es imprescindible.
export function generarAvisos(prestamos, hoy) {
  var r = [];
  for (var i = 0; i < prestamos.length; i++) {
    var p = prestamos[i];
    if (p.estado == 'devuelto') continue;
    var d = Math.floor((Date.parse(hoy) - Date.parse(p.fechaSalida)) / 86400000);
    if (d >= 7) {
      var t = 'El portátil ' + p.portatil + ' lleva ' + d + ' días con ' + p.profesor;
      if (p.cargador == false) t = t + ' (sin cargador)';
      r.push({ t: t, d: d, p: p.profesor });
    }
  }
  r.sort(function (a, b) {
    return a.p > b.p ? 1 : -1;
  });
  if (r.length == 0) return 'Sin avisos';
  return r
    .map(function (x) {
      return x.t;
    })
    .join('\n');
}
