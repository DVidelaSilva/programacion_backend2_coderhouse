const {connect} = require('mongoose')
const dotenv = require('dotenv')
const { configObject } = require('./config')
dotenv.config()

//uri -> superconjunto de una url
const uri = configObject.mongo_url




const connectDB = async () => {
    console.log('Base de Datos Conectada');
    await connect(uri)
}

module.exports = {
  connectDB,
};