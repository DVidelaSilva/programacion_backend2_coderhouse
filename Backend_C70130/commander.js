const { Command } = require('commander')

const program = new Command()

program
    .option('-d', 'Variables para debug', false)
    .option('-p <port', 'Puerto del servidor', 4000)
    .option('-u, --user <user>', 'Usuario del proceso')
    .option('--mode <mode>', 'Especificvar el entorno de ejecucion de nuestro servidor', 'development')
    .option('-l, --letter [letter...]', 'specify letter')
program.parse()


console.log('option: ', program.opts())
console.log('Argumentos: ', program.args)
//node commander.js -d -p 3000 --mode production -u root --letter a b c