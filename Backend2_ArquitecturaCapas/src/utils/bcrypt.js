const bcrypt = require('bcrypt')

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// userPassword -> Base de datos     ----     passwordBody -> Cliente
const isValidPassword = (passwordBody, userPassword) => bcrypt.compareSync(passwordBody, userPassword)

module.exports = {
    createHash,
    isValidPassword

}