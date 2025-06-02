// reservaRestaurante.js
// Codigo que esta el link de Devf

// Simulando una “base de datos” con el número de mesas disponibles
let mesasDisponibles = 5; //puedo cambiar este valor para simular diferentes escenarios
/**
 * Verifica si hay suficientes mesas para la solicitud.
 * @param {number} mesasSolicitadas - Número de mesas que el cliente desea reservar.
 * @returns {Promise<string>} - Resuelve con un mensaje si hay disponibilidad; rechaza si no hay.
 */
function verificarDisponibilidad(mesasSolicitadas) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (mesasSolicitadas <= 0) {
                reject("La cantidad de mesas solicitadas debe ser mayor a cero.");
            } else if (mesasSolicitadas <= mesasDisponibles) {
                mesasDisponibles -= mesasSolicitadas;
                resolve(`Mesas disponibles encontradas. Quedan ${mesasDisponibles} mesa(s) libres.`);
            } else {
                reject(`No hay mesas suficientes. Disponibles: ${mesasDisponibles}, solicitadas: ${mesasSolicitadas}.`);
            }
        }, 2000); // Retraso simulado de 2 segundos
    });
}


function enviarConfirmacionReserva(nombreCliente) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulación de 80% de probabilidad de éxito
            const exitoEnvio = Math.random() < 0.8;
            if (exitoEnvio) {
                resolve(`Correo de confirmación enviado a ${nombreCliente}. ¡Reserva confirmada!`);
            } else {
                reject(`Error al enviar correo a ${nombreCliente}. Intenta nuevamente.`);
            }
        }, 1500); // Retraso simulado de 1.5 segundos
    });
}


async function hacerReserva(nombreCliente, mesasSolicitadas) {
    try {
        console.log(`\n[${nombreCliente}] Iniciando proceso de reserva para ${mesasSolicitadas} mesa(s)...`);

        // 1. Verificar disponibilidad
        console.log("Verificando disponibilidad de mesas...");
        const mensajeDisponibilidad = await verificarDisponibilidad(mesasSolicitadas);
        console.log(`✅ ${mensajeDisponibilidad}`);

        // 2. Enviar confirmación por correo
        console.log("Enviando correo de confirmación...");
        const mensajeCorreo = await enviarConfirmacionReserva(nombreCliente);
        console.log(`✅ ${mensajeCorreo}`);

        console.log(`[${nombreCliente}] Reserva completada exitosamente.\n`);
    } catch (error) {
        console.log(`❌ [${nombreCliente}] ${error}\n`);
    }
}


async function pruebas() {
    // Caso 1: Solicitar 3 mesas (debería pasar disponibilidad y luego el correo tenga 80% de éxito)
    await hacerReserva("Juan Pérez", 3);

    // Caso 2: Solicitar 4 mesas (ahora quedan 2, así que debe fallar en disponibilidad)
    await hacerReserva("María Gómez", 4);

    // Caso 3: Solicitar 2 mesas (quedan 2, debería pasar disponibilidad; envío de correo con 80% de éxito)
    await hacerReserva("Carlos López", 2);

    // Caso 4: Solicitar 1 mesa (quedan 0, debería fallar en disponibilidad)
    await hacerReserva("Ana Torres", 1);
}

pruebas();
