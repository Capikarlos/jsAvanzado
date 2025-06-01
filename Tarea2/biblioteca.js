// Tarea 2: Sistema de Gestión de Biblioteca (JSON + Callbacks)
// es ir a la carpeta Tarea2 y ejecutar el comando de Node biblioteca.js y ya
const readline = require('readline');

// Datos iniciales de libros en formato JSON (simulado en memoria).
let biblioteca = {
    "libros": [
        {
            "titulo": "Cien años de soledad",
            "autor": "Gabriel García Márquez",
            "genero": "Realismo mágico",
            "disponible": true
        },
        {
            "titulo": "1984",
            "autor": "George Orwell",
            "genero": "Distopía",
            "disponible": true
        }
    ]
};

// Simula la lectura de datos (como si leyéramos un archivo JSON) con un retraso de 1 segundo.
function leerDatos(callback) {
    setTimeout(() => {
        // Pasamos copia superficial para que quien reciba no modifique directamente el objeto global.
        callback(JSON.parse(JSON.stringify(biblioteca)));
    }, 1000);
}

// Simula la escritura de datos en "archivo" (en este caso actualiza la variable `biblioteca`)
// con un retraso de 1 segundo.
function escribirDatos(nuevaBiblioteca, callback) {
    setTimeout(() => {
        biblioteca = nuevaBiblioteca;
        callback();
    }, 1000);
}

// Muestra todo el inventario de libros por consola.
function mostrarLibros(callbackMenu) {
    console.log("\n⏳ Cargando inventario de libros...");
    leerDatos((datos) => {
        console.log("\n📚 Inventario de libros:");
        if (datos.libros.length === 0) {
            console.log("   (No hay libros en la biblioteca)");
        } else {
            datos.libros.forEach((libro, indice) => {
                const estadoTexto = libro.disponible ? "Disponible" : "Prestado";
                console.log(`   ${indice + 1}. "${libro.titulo}" - ${libro.autor} [${libro.genero}] → ${estadoTexto}`);
            });
        }
        if (callbackMenu) callbackMenu();
    });
}

// Agrega un nuevo libro a la colección.
function agregarLibro(titulo, autor, genero, disponible, callbackMenu) {
    console.log(`\n⏳ Agregando libro "${titulo}"...`);
    leerDatos((datosActuales) => {
        const nuevoLibro = {
            titulo,
            autor,
            genero,
            disponible: disponible === true || disponible === 'true'
        };
        datosActuales.libros.push(nuevoLibro);
        escribirDatos(datosActuales, () => {
            console.log(`✅ Libro "${titulo}" agregado correctamente.`);
            if (callbackMenu) callbackMenu();
        });
    });
}

// Actualiza la disponibilidad de un libro buscando por título exacto (case-sensitive).
function actualizarDisponibilidad(titulo, nuevoEstado, callbackMenu) {
    console.log(`\n⏳ Actualizando disponibilidad de "${titulo}"...`);
    leerDatos((datosActuales) => {
        const indiceLibro = datosActuales.libros.findIndex(libro => libro.titulo === titulo);
        if (indiceLibro === -1) {
            console.log(`❌ No se encontró el libro con título "${titulo}".`);
            if (callbackMenu) return callbackMenu();
        }
        datosActuales.libros[indiceLibro].disponible = nuevoEstado === 'disponible';
        escribirDatos(datosActuales, () => {
            const estadoTexto = datosActuales.libros[indiceLibro].disponible ? 'Disponible' : 'Prestado';
            console.log(`✅ Disponibilidad de "${titulo}" actualizada a "${estadoTexto}".`);
            if (callbackMenu) callbackMenu();
        });
    });
}

// Interfaz de línea de comandos para interacción del usuario.
const interfaz = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Muestra el menú principal y espera la opción del usuario.
function mostrarMenu() {
    console.log("\n========================================");
    console.log("     📖 Gestión de Biblioteca JSON");
    console.log("========================================");
    console.log("1) Consultar todos los libros");
    console.log("2) Agregar un nuevo libro");
    console.log("3) Cambiar disponibilidad de un libro");
    console.log("4) Salir");
    interfaz.question("\nSelecciona una opción (1-4): ", (opcion) => {
        switch (opcion.trim()) {
            case '1':
                mostrarLibros(mostrarMenu);
                break;
            case '2':
                preguntarDatosParaAgregar();
                break;
            case '3':
                preguntarDatosParaActualizar();
                break;
            case '4':
                console.log("\n👋 ¡Hasta luego!");
                interfaz.close();
                break;
            default:
                console.log("❌ Opción no válida. Intenta de nuevo.");
                mostrarMenu();
        }
    });
}

// Solicita datos al usuario para agregar un nuevo libro.
function preguntarDatosParaAgregar() {
    interfaz.question("\nTítulo del libro: ", (titulo) => {
        if (!titulo.trim()) {
            console.log("❌ El título no puede estar vacío.");
            return mostrarMenu();
        }
        interfaz.question("Autor del libro: ", (autor) => {
            if (!autor.trim()) {
                console.log("❌ El autor no puede estar vacío.");
                return mostrarMenu();
            }
            interfaz.question("Género del libro: ", (genero) => {
                if (!genero.trim()) {
                    console.log("❌ El género no puede estar vacío.");
                    return mostrarMenu();
                }
                interfaz.question("¿Está disponible? (sí/no): ", (respuesta) => {
                    const disponible = respuesta.trim().toLowerCase() === 'sí' || respuesta.trim().toLowerCase() === 'si';
                    agregarLibro(titulo.trim(), autor.trim(), genero.trim(), disponible, mostrarMenu);
                });
            });
        });
    });
}

// Solicita datos al usuario para actualizar la disponibilidad de un libro.
function preguntarDatosParaActualizar() {
    interfaz.question("\nTítulo exacto del libro a actualizar: ", (titulo) => {
        if (!titulo.trim()) {
            console.log("❌ El título no puede estar vacío.");
            return mostrarMenu();
        }
        interfaz.question("Nuevo estado (prestado/disponible): ", (estado) => {
            const estadoMinus = estado.trim().toLowerCase();
            if (estadoMinus !== 'prestado' && estadoMinus !== 'disponible') {
                console.log('❌ Debes indicar "prestado" o "disponible".');
                return mostrarMenu();
            }
            actualizarDisponibilidad(titulo.trim(), estadoMinus, mostrarMenu);
        });
    });
}

// Inicio de la aplicación.
console.clear();
console.log("🚀 Bienvenido al Sistema de Gestión de Biblioteca (JSON + Callbacks)");
mostrarMenu();
