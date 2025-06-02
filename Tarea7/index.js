// index.js
// Versión final con cowsay y sin duplicar 'planetas'

// Importamos el array de planetas (una sola vez)
const planetas = require("./planetas");

// (Opcional) Importamos cowsay si lo instalaste: npm install cowsay
const cowsay = require("cowsay");

console.log(
    cowsay.say({
        text: "¡Preparando reporte estelar!",
        e: "oO",
        T: "U ",
    })
);

planetas.forEach((planeta, i) => {
    console.log(
        cowsay.say({
            text: `${i + 1}. ${planeta.nombre} → ${planeta.descripcion} (Descubierto en ${planeta.descubiertoEn})`,
            e: "^^",
            T: "  ",
        })
    );
});
