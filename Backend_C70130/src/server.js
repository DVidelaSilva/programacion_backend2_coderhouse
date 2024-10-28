const express = require('express')
const { connectDB } = require('./config/mongoDB')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')
const MongoStore = require('connect-mongo')
const handlebars    = require('express-handlebars')
const passport = require('passport')

const { UserRouter } = require('./router/userClass.router')
//const userRouter = require('./router/api/users.router')
const cookieRouter = require('./router/api/cookie.router')
const sessionRouter = require('./router/api/session.router')
const viewsRouter = require('./router/views.router')
const pruebasRouter = require('./router/api/pruebas.router')
const {initializePassport} = require('./config/passport.config')
const { configObject } = require('./config/config')


const app = express()
const PORT = configObject.port



connectDB()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
// config handlebars
//configuracion del motor de plantillas
app.engine('handlebars', handlebars.engine())
// cofigurar la carpoeta donde debe tomar las plantillas
app.set('views', __dirname + '/views')
// extension de las plantillas
app.set('view engine', 'handlebars')


// la palabra secreta del cookie parse debe estar en el .env
app.use(cookieParser('palabrasecreta'))

initializePassport()
app.use(passport.initialize())

//configuracion de sesion en memoria
// app.use(session({
//     secret: 'secretcoder',
//     resave: true,
//     saveUninitialized: true
// }))


//configuracion de sesion en FileSistem
// const fileStore = new FileStore(session)
// app.use(session({
//     store: new fileStore({
//         path: './sessions',
//         ttl: 100,
//         retire: 0
//     }),
//     secret: 'secretcoder',
//     resave: true,
//     saveUninitialized: true
// }))


//configuracion de sesion en MongoDB
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://DAVS_CoderHouse_Backend:davs1509@cluster0.wtz9xqt.mongodb.net/comisionC70130?retryWrites=true&w=majority&appName=Cluster0',
        // mongoOptions: {
        //     useNewUrlParse: true,
        //     useUnifiedTopology: true
        // }
        ttl: 1000
    }),
    secret: 'secretcoder',
    resave: true,
    saveUninitialized: true
}))

// initializePassport()
// app.use(passport.initialize())
//app.use(passport.session())

const userRouter = new UserRouter()

app.use('/', viewsRouter)
app.use('/pruebas', pruebasRouter);
//app.use('/api/users', userRouter)
app.use('/api/users', userRouter.getRouter())
app.use('/api/cookie', cookieRouter)
app.use('/api/sessions', sessionRouter)

// cookie no estan en el servidor
// set, get, clear


app.listen(PORT, err => {
    if(err){
        console.log(err);
    }
    console.log(`Servidor escuchando en puerto: ${PORT}`);
})