// app.js

// URL base de la API de Rick & Morty
const URL_BASE = 'https://rickandmortyapi.com/api/character';

// Referencias al DOM
const botonFetch = document.getElementById('botonFetch');
const botonAxios = document.getElementById('botonAxios');
const contenedorDatos = document.getElementById('contenedorDatos');

// Eventos para los botones
botonFetch.addEventListener('click', () => cargarConFetch());
botonAxios.addEventListener('click', () => cargarConAxios());

/**
 * Limpia el contenedor y muestra un mensaje de "Cargando..."
 */
function mostrarCargando() {
    contenedorDatos.innerHTML = '<p class="mensaje-cargando">Cargando datos...</p>';
}

/**
 * Muestra un mensaje de error en pantalla.
 * @param {string} texto - Texto del error a mostrar.
 */
function mostrarError(texto) {
    contenedorDatos.innerHTML = `<p class="mensaje-error">❌ ${texto}</p>`;
}

/**
 * Renderiza los personajes en el contenedor.
 * @param {Array} personajes - Array de objetos con { name, image }.
 */
function mostrarPersonajes(personajes) {
    // Vaciar contenedor
    contenedorDatos.innerHTML = '';

    // Si no hay personajes, avisar
    if (!personajes || personajes.length === 0) {
        contenedorDatos.innerHTML = '<p class="mensaje-error">No se encontraron personajes.</p>';
        return;
    }

    // Construir tarjetas
    personajes.forEach(personaje => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('personaje');

        tarjeta.innerHTML = `
      <img src="${personaje.image}" alt="Imagen de ${personaje.name}" />
      <p class="nombre">${personaje.name}</p>
    `;

        contenedorDatos.appendChild(tarjeta);
    });
}

/**
 * Realiza la petición con fetch y maneja datos/errores.
 */
async function cargarConFetch() {
    mostrarCargando();

    try {
        const respuesta = await fetch(URL_BASE);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        // La API devuelve { info: {...}, results: [ ... ] }
        mostrarPersonajes(datos.results);
    } catch (error) {
        mostrarError(`Fetch falló: ${error.message}`);
    }
}

/**
 * Realiza la petición con Axios y maneja datos/errores.
 */
function cargarConAxios() {
    mostrarCargando();

    axios.get(URL_BASE)
        .then(respuesta => {
            // La respuesta de Axios está en respuesta.data
            mostrarPersonajes(respuesta.data.results);
        })
        .catch(error => {
            if (error.response) {
                mostrarError(`Axios: Error en respuesta (${error.response.status})`);
            } else if (error.request) {
                mostrarError('Axios: No se recibió respuesta del servidor.');
            } else {
                mostrarError(`Axios: ${error.message}`);
            }
        });
}
