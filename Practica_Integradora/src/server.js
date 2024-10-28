const express = require('express')
const appRouter = require('./router')
const { connectDB } = require('./config/index')
const handlebars = require('express-handlebars')


const cookie = require('cookie-parser')


const app = express()
const PORT = 8080

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static(__dirname+'/public'))
app.use(cookie())
// Config handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(appRouter)





app.listen(PORT, err => {
    if(err){
        console.log(err);
    }
    console.log(`Servidor escuchando en puerto: ${PORT}`);
})