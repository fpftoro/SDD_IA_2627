const formulario = document.querySelector('#form-tarea');
const campoTexto = document.querySelector('#texto-tarea');
const lista = document.querySelector('#lista-tareas');
const mensajeError = document.querySelector('#mensaje-error');
const mensajeSinTareas = document.querySelector('#sin-tareas');

function pintarTarea(elemento, tarea) {
  const casilla = elemento.querySelector('input');
  const texto = elemento.querySelector('span');
  casilla.checked = tarea.estado === 'hecha';
  texto.textContent = `${tarea.text} (${tarea.estado})`;
  elemento.classList.toggle('hecha', tarea.estado === 'hecha');
}

async function cambiarEstado(elemento, tarea, hecha) {
  mensajeError.textContent = '';
  const respuesta = await fetch(`/tareas/${tarea.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hecha }),
  });
  if (!respuesta.ok) {
    const { error } = await respuesta.json();
    mensajeError.textContent = error;
    pintarTarea(elemento, tarea);
    return;
  }

  Object.assign(tarea, await respuesta.json());
  pintarTarea(elemento, tarea);
}

function mostrarTarea(tarea) {
  const elemento = document.createElement('li');
  const casilla = document.createElement('input');
  casilla.type = 'checkbox';
  casilla.setAttribute('aria-label', `Marcar «${tarea.text}» como hecha`);
  casilla.addEventListener('change', () =>
    cambiarEstado(elemento, tarea, casilla.checked),
  );
  elemento.append(casilla, document.createElement('span'));
  pintarTarea(elemento, tarea);
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
