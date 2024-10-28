process.on('uncaughtException', exception => {
    console.log('Captura todos los errores no controlados, algo mal escrito o que no esta definido:  ', exception);
})

console.log('Ejecutamdo alguna sentencia inicio');

process.on('exit', code => {
    console.log('Evento que se ejecuta antes de salir del proceso: ', code);
})

consol.log();

console.log('Ejecutando alguna sentencia');