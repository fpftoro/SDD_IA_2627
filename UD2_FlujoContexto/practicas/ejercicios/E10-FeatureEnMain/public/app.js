const formulario = document.querySelector('#form-tarea');
const campoTexto = document.querySelector('#texto-tarea');
const lista = document.querySelector('#lista-tareas');
const mensajeError = document.querySelector('#mensaje-error');
const mensajeSinTareas = document.querySelector('#sin-tareas');

function mostrarTarea(tarea) {
  const elemento = document.createElement('li');
  elemento.textContent = `${tarea.text} (${tarea.estado})`;
  lista.append(elemento);
  mensajeSinTareas.hidden = true;
}

async function cargarTareas() {
  let respuesta;
  try {
    respuesta = await fetch('/tareas');
  } catch {
    mensajeError.textContent = 'No se ha podido conectar con el servidor';
    return;
  }
  if (!respuesta.ok) {
    const { error } = await respuesta.json();
    mensajeError.textContent = error;
    return;
  }

  const tareas = await respuesta.json();
  tareas.forEach(mostrarTarea);
  mensajeSinTareas.hidden = tareas.length > 0;
}

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  mensajeError.textContent = '';

  const texto = campoTexto.value;
  if (texto.trim() === '') {
    return;
  }

  const respuesta = await fetch('/tareas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: texto }),
  });
  if (!respuesta.ok) {
    const { error } = await respuesta.json();
    mensajeError.textContent = error;
    return;
  }

  mostrarTarea(await respuesta.json());
});

cargarTareas();
