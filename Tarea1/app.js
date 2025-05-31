function saludar(nombre, callback) {
    console.log(`Hola, ${nombre}`);
    callback();
}

saludar('María', () => {
    console.log('Callback ejecutado.');
});

const promesa = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promesa cumplida'), 100000);
});

promesa.then(resultado => console.log(resultado));