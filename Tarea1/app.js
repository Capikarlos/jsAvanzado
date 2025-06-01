const listaPedidos = document.getElementById('listaPedidos');
const botonAgregarPedido = document.getElementById('botonAgregarPedido');
let idPedido = 1; // Identificador único para cada pedido

botonAgregarPedido.addEventListener('click', () => {
    const pedido = { id: idPedido++, estado: 'En Proceso' };
    agregarPedido(pedido);
    procesarPedido(pedido);
});

function agregarPedido(pedido) {
    const elementoLI = document.createElement('li');
    elementoLI.id = `pedido-${pedido.id}`;
    elementoLI.innerHTML = `
    <span>Pedido #${pedido.id}: </span>
    <span class="estado">${pedido.estado}</span>
    <div class="barra-carga"><div class="progreso" id="progreso-${pedido.id}"></div></div>
  `;
    listaPedidos.appendChild(elementoLI);
}

function actualizarEstadoPedido(pedido, nuevoEstado) {
    const elementoLI = document.getElementById(`pedido-${pedido.id}`);
    if (!elementoLI) return;
    const spanEstado = elementoLI.querySelector('.estado');
    spanEstado.textContent = nuevoEstado;
    if (nuevoEstado === 'Completado') {
        elementoLI.classList.add('completado');
        const barra = document.getElementById(`progreso-${pedido.id}`);
        barra.style.width = '100%';
    }
}

// Simula la preparación de un pedido con Promise y setTimeout
function prepararPedido(pedido) {
    return new Promise((resolve) => {
        const tiempoAleatorio = Math.random() * 3000 + 2000; // Entre 2000ms y 5000ms
        const pasoIntervalo = 100; // Actualizar barra cada 100ms
        let tiempoTranscurrido = 0;
        const barraProgreso = document.getElementById(`progreso-${pedido.id}`);

        const intervalo = setInterval(() => {
            tiempoTranscurrido += pasoIntervalo;
            const porcentaje = Math.min((tiempoTranscurrido / tiempoAleatorio) * 100, 100);
            barraProgreso.style.width = `${porcentaje}%`;
        }, pasoIntervalo);

        setTimeout(() => {
            clearInterval(intervalo);
            resolve(pedido);
        }, tiempoAleatorio);
    });
}

// Función asíncrona que procesa cada pedido
async function procesarPedido(pedido) {
    try {
        // Esperamos a que termine la preparación
        await prepararPedido(pedido);
        actualizarEstadoPedido(pedido, 'Completado');
    } catch (error) {
        console.error('Error al procesar el pedido:', error);
    }
}
