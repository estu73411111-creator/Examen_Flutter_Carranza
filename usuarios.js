// ============================================================
// usuarios.js
// Obtiene 100 usuarios desde randomuser.me y los renderiza
// en lista-usuarios.html en tarjetas con foto, nombre y email.
// ============================================================

const API_URL = 'https://randomuser.me/api/?results=100';

const cargandoEl = document.getElementById('cargando');
const errorEl    = document.getElementById('error');
const listaEl    = document.getElementById('lista-usuarios');

/**
 * Muestra solo el elemento indicado y oculta los demás del grupo.
 */
function mostrar(elemento) {
  [cargandoEl, errorEl, listaEl].forEach(el => el.classList.add('oculto'));
  elemento.classList.remove('oculto');
}

/**
 * Capitaliza la primera letra de cada palabra de un texto.
 */
function capitalizar(texto) {
  return texto
    .toLowerCase()
    .split(' ')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

/**
 * Crea y retorna un elemento <article> con la tarjeta de un usuario.
 * @param {Object} usuario  - Objeto de usuario de randomuser.me
 */
function crearTarjeta(usuario) {
  const { name, email, picture } = usuario;

  const nombreCompleto = `${capitalizar(name.first)} ${capitalizar(name.last)}`;

  const article = document.createElement('article');
  article.className = 'tarjeta';

  article.innerHTML = `
    <img
      class="avatar"
      src="${picture.medium}"
      alt="Foto de perfil de ${nombreCompleto}"
      loading="lazy"
    />
    <div class="info">
      <h2 class="nombre">${nombreCompleto}</h2>
      <a class="correo" href="mailto:${email}">${email}</a>
    </div>
  `;

  return article;
}

/**
 * Renderiza la lista de usuarios en el contenedor.
 * @param {Array} usuarios - Array de objetos usuario
 */
function renderizarUsuarios(usuarios) {
  listaEl.innerHTML = ''; // Limpia contenido previo
  const fragment = document.createDocumentFragment();

  usuarios.forEach(usuario => {
    fragment.appendChild(crearTarjeta(usuario));
  });

  listaEl.appendChild(fragment);
  mostrar(listaEl);
}

/**
 * Petición principal a la API de randomuser.me.
 */
async function cargarUsuarios() {
  try {
    mostrar(cargandoEl);

    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    renderizarUsuarios(datos.results);
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    mostrar(errorEl);
  }
}

// Inicia la carga al cargar el DOM
document.addEventListener('DOMContentLoaded', cargarUsuarios);
