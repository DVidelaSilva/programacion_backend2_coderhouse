const { Schema, model } = require('mongoose')

// Colleccion en la que guardaremos nuestros documentos
const userCollection = 'users'

// definir el esquema de nuestros documentos

const userSchema = new Schema({

    first_name: {
        type: String,
        //required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum:['user', 'user-premium', 'admin'],
        default: 'user'
    }

});


const userModel = model(userCollection, userSchema)

module.exports = {
    userModel
}
