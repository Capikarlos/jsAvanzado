// validacionZod.js
// Importamos Zod desde CDN
const { z } = window.Zod;

// Definición del esquema de validación
const esquemaRegistro = z.object({
    nombre: z.string().nonempty('El nombre es obligatorio').min(3, 'El nombre debe tener al menos 3 caracteres'),
    correo: z.string().email('Formato de correo inválido'),
    contrasena: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

// Referencias a los elementos del formulario
const formulario = document.getElementById('registerForm');
const entradaNombre = document.getElementById('nombre');
const entradaCorreo = document.getElementById('correo');
const entradaContrasena = document.getElementById('contrasena');

const errorNombre = document.getElementById('error-nombre');
const errorCorreo = document.getElementById('error-correo');
const errorContrasena = document.getElementById('error-contrasena');
const erroresGenerales = document.getElementById('erroresGenerales');

// Función para mostrar error en campo específico
function mostrarErrorCampo(elementoError, mensaje) {
    elementoError.textContent = mensaje || '';
}

// Validación en tiempo real para cada campo
entradaNombre.addEventListener('input', () => {
    const valor = { nombre: entradaNombre.value };
    const resultado = esquemaRegistro.pick({ nombre: true }).safeParse(valor);
    mostrarErrorCampo(errorNombre, resultado.success ? '' : resultado.error.errors[0].message);
});

entradaCorreo.addEventListener('input', () => {
    const valor = { correo: entradaCorreo.value };
    const resultado = esquemaRegistro.pick({ correo: true }).safeParse(valor);
    mostrarErrorCampo(errorCorreo, resultado.success ? '' : resultado.error.errors[0].message);
});

entradaContrasena.addEventListener('input', () => {
    const valor = { contrasena: entradaContrasena.value };
    const resultado = esquemaRegistro.pick({ contrasena: true }).safeParse(valor);
    mostrarErrorCampo(errorContrasena, resultado.success ? '' : resultado.error.errors[0].message);
});

// Evento al enviar el formulario
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    // Limpiar errores previos
    mostrarErrorCampo(errorNombre, '');
    mostrarErrorCampo(errorCorreo, '');
    mostrarErrorCampo(errorContrasena, '');
    erroresGenerales.textContent = '';

    // Capturamos valores
    const datosFormulario = {
        nombre: entradaNombre.value.trim(),
        correo: entradaCorreo.value.trim(),
        contrasena: entradaContrasena.value
    };

    // Validar con Zod
    const validacion = esquemaRegistro.safeParse(datosFormulario);
    if (validacion.success) {
        alert('¡Registro exitoso!');
        formulario.reset();
    } else {
        // Mostrar errores específicos por campo
        validacion.error.errors.forEach(error => {
            switch (error.path[0]) {
                case 'nombre':
                    mostrarErrorCampo(errorNombre, error.message);
                    break;
                case 'correo':
                    mostrarErrorCampo(errorCorreo, error.message);
                    break;
                case 'contrasena':
                    mostrarErrorCampo(errorContrasena, error.message);
                    break;
            }
        });
        // Mensaje general
        erroresGenerales.textContent = 'Por favor corrige los errores antes de continuar.';
    }
});
