const dotenv = require('dotenv')
const { program } = require('../../clase-variables-entorno/commander')


const {mode} = program.opts()

console.log(mode);

dotenv.config({
    path: mode ==='development' ? './.env.development' : './.env.production'
})

const configObject = {

    mongo_url: process.env.MONGO_URL,
    port: process.env.PORT || 8080,
    private_key: process.env.PRIVATE_KEY
}


module.exports = {
    configObject
}