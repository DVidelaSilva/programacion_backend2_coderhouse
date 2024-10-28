const {connect} = require('mongoose')

//uri -> superconjunto de una url
const uri = 'mongodb+srv://DAVS_CoderHouse_Backend:davs1509@cluster0.wtz9xqt.mongodb.net/comisionC70130?retryWrites=true&w=majority&appName=Cluster0'


const connectDB = async () => {
    console.log('Base de Datos Conectada');
    await connect(uri)
}

module.exports = {
  connectDB,
};