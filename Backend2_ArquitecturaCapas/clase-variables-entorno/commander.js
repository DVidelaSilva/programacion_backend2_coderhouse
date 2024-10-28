const { Command } = require('commander')

const program = new Command()

program

    .option('--mode <mode>', 'Especificvar el entorno de ejecucion de nuestro servidor', 'development')

program.parse()


module.exports = {
    program
}


// console.log('option: ', program.opts())
// console.log('Argumentos: ', program.args)
//node commander.js -d -p 3000 --mode production -u root --letter a b c