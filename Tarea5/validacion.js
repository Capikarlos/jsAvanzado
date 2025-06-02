// validacion.js
// Variables de referencia al formulario y mensajes de error
const formulario = document.getElementById('registroEvento');
const entradaNombre = document.getElementById('nombre');
const entradaCorreo = document.getElementById('correo');
const entradaTelefono = document.getElementById('telefono');
const checkIntereses = document.getElementsByName('intereses');
const radioHorario = document.getElementsByName('horario');
const entradaFecha = document.getElementById('fecha');
const entradaHora = document.getElementById('hora');
const entradaArchivo = document.getElementById('archivo');

// Mensajes de error (small)
const errorNombre = document.getElementById('error-nombre');
const errorCorreo = document.getElementById('error-correo');
const errorTelefono = document.getElementById('error-telefono');
const errorIntereses = document.getElementById('error-intereses');
const errorHorario = document.getElementById('error-horario');
const errorFecha = document.getElementById('error-fecha');
const errorHora = document.getElementById('error-hora');
const errorArchivo = document.getElementById('error-archivo');

// Función para mostrar mensaje de error en un campo
function mostrarError(elementoError, mensaje) {
elementoError.textContent = mensaje;
}

// Función para limpiar mensajes de error
function limpiarErrores() {
    mostrarError(errorNombre, '');
    mostrarError(errorCorreo, '');
    mostrarError(errorTelefono, '');
    mostrarError(errorIntereses, '');
    mostrarError(errorHorario, '');
    mostrarError(errorFecha, '');
    mostrarError(errorHora, '');
    mostrarError(errorArchivo, '');
}

// Validaciones adicionales:
// 1. Nombre con al menos 3 caracteres
// 2. Teléfono con patrón de 10 dígitos numéricos
// 3. Fecha no puede ser anterior a hoy
// 4. Hora dentro de rango 08:00-20:00
// 5. Archivo, si existe, debe ser PDF o imagen y menor a 2MB

formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita envío automático
    limpiarErrores();

    let formularioValido = true;

    // 1. Validar nombre
    const valorNombre = entradaNombre.value.trim();
    if (valorNombre.length < 3) {
        mostrarError(errorNombre, 'El nombre debe tener al menos 3 caracteres.');
        formularioValido = false;
    }

    // 2. Validar correo (HTML5 ya chequea formato, pero mostramos mensaje personalizado si está vacío)
    const valorCorreo = entradaCorreo.value.trim();
    if (!valorCorreo) {
        mostrarError(errorCorreo, 'El correo es obligatorio.');
        formularioValido = false;
    }

    // 3. Validar teléfono (10 dígitos numéricos)
    const valorTelefono = entradaTelefono.value.trim();
    const regexTelefono = /^\d{10}$/;
    if (!regexTelefono.test(valorTelefono)) {
        mostrarError(errorTelefono, 'El teléfono debe tener exactamente 10 dígitos numéricos.');
        formularioValido = false;
    }

    // 4. Validar intereses (al menos uno seleccionado)
    let interesesSeleccionados = [];
    checkIntereses.forEach((chk) => {
        if (chk.checked) interesesSeleccionados.push(chk.value);
    });
    if (interesesSeleccionados.length === 0) {
        mostrarError(errorIntereses, 'Selecciona al menos un interés.');
        formularioValido = false;
    }

    // 5. Validar horario (uno seleccionado)
    let horarioElegido = null;
    radioHorario.forEach((rdo) => {
        if (rdo.checked) horarioElegido = rdo.value;
    });
    if (!horarioElegido) {
        mostrarError(errorHorario, 'Elige un horario.');
        formularioValido = false;
    }

    // 6. Validar fecha (no en el pasado)
    const valorFecha = entradaFecha.value;
    if (!valorFecha) {
        mostrarError(errorFecha, 'Selecciona la fecha del evento.');
        formularioValido = false;
    } else {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaSeleccionada = new Date(valorFecha);
        if (fechaSeleccionada < hoy) {
            mostrarError(errorFecha, 'La fecha no puede ser anterior a hoy.');
            formularioValido = false;
        }
    }

    // 7. Validar hora (entre 08:00 y 20:00)
    const valorHora = entradaHora.value;
    if (!valorHora) {
        mostrarError(errorHora, 'Selecciona la hora del evento.');
        formularioValido = false;
    } else {
        const [hora, minuto] = valorHora.split(':').map(Number);
        if (hora < 8 || hora > 20) {
            mostrarError(errorHora, 'La hora debe estar entre 08:00 y 20:00.');
            formularioValido = false;
        }
    }

    // 8. Validar archivo (si se sube, debe ser PDF o JPG/PNG y menor a 2MB)
    if (entradaArchivo.files.length > 0) {
        const archivo = entradaArchivo.files[0];
        const tipoValido = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!tipoValido.includes(archivo.type)) {
            mostrarErrorror(errorArchivo, 'El archivo debe ser PDF, JPG o PNG.');
            formularioValido = false;
        } else if (archivo.size > 2 * 1024 * 1024) {
            mostrarError(errorArchivo, 'El archivo no puede exceder 2MB.');
            formularioValido = false;
        }
    }

    // Si todo es válido, mostramos mensaje de éxito.
    if (formularioValido) {
        alert('Registro exitoso. ¡Gracias por registrarte!');
        formulario.reset();
    }
});
