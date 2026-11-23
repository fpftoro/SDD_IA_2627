const MS_POR_DIA = 86400000;

// Días completos entre dos fechas AAAA-MM-DD. Si alguna no es válida, NaN.
export function diasEntre(desde, hasta) {
  return Math.floor((Date.parse(hasta) - Date.parse(desde)) / MS_POR_DIA);
}
