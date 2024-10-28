const {Router} = require('express');
const { authentication } = require('../../middleware/auth.middleware');
const { UserManagerMongo } = require('../../managers/Mongo/userManager.mongo');
const { createHash, isValidPassword } = require('../../utils/bcrypt');
const passport = require('passport');
const { generateToken, authTokenMiddleware } = require('../../utils/jsonwebtoken');
const { passportCall } = require("../../middleware/passport/passportCall");
const { authorization } = require('../../middleware/passport/authorization.middlewares');

const userService = new UserManagerMongo()

const router = Router() 


////// ESTO ES LO ANTERIOS SIN EL PASSPORT
/////////////////////////////////
// router.post('/register', async (req, res) => {

//     const {first_name, last_name, email, password } = req.body

//     if(!email || !password) {
//         return res.status(400).send({status: 'error', error: 'email y password son obligatorios'})
//     }

//     const userFound = await userService.getUser({email})

//     if (userFound) {
//         return res.status(401).send({ststus: 'error', error: 'El usuario ya existe'})
//     }

//     const newUser = {
//         first_name,
//         last_name,
//         email,
//         password: createHash(password)
//     }

//     const result = await userService.createUser(newUser)


//     //res.send('usuario registrado correctamente')
//     res.redirect('/login')
// })

//Login de sesion
// router.post('/login', async (req, res) => {
//     const {email, password} = req.body

//     const userFound = await userService.getUser({email})

//     if(!userFound){
//         return res.send({status:'error', error: 'No existe el usuario'})
//     }

//     // if(userFound.email !== email || userFound.password !== password){
//     //     return res.send({status:'error', error: 'El email o la contraseña no coinciden'})
//     // }

//     if(isValidPassword(password, userFound.password)){
//         return res.send({status:'error', error: 'El email o la contraseña no coinciden'})
//     }

//     req.session.user = {
//         email: email,
//         isAdmin: userFound.role === 'admin'
//     }

//     res.send('logueado correctamente')
// })





/// IMPLEMENTACION DE AUTENTICACION POR GITHUB
// router.get('/github', passport.authenticate('github', { scope: ['user:email']}), async (req, res) => {

// })

// router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login'}), async (req, res) => {
//     req.session.user = req.user
//     res.redirect('/')
// })

/// IMPLEMENTACION DE PASSPORT
// router.post('/register', passport.authenticate('register', {failureRedirect: '/failregister'}), async (req, res) => {
//     res.send({status:'success', message: 'usuario registrado'})
// })
// router.get('/failregister', async (req, res) => {
//     console.log('fallo la estrategia');
//     res.send({status: 'error', error: 'Fallo estrategia'})
// })


// router.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}), async (req, res) => {
//     if(!req.user) return res.status(401).send({status: 'error', error: 'Credenciales invalidas'})
//         req.session.user = {
//             //first_name, //opcional
//             //last_name,  //opcional
//             email: req.user.email
//         }
//     res.send({status:'success', message: 'usuario logueado'})
// })
// router.get('/faillogin', async (req, res) => {
//     console.log('fallo la estrategia');
//     res.send({status: 'error', error: 'Fallo el login'})
// })




/// IMPLEMENTACION DE JWT

router.post('register', async (req, res) => {
    res.redirect('/login')
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const userFound = await userService.getUser({email})
    console.log(userFound)
    if(!userFound){
        return res,send({status: 'error', error: 'no existe el usuario'})
    }

    if(isValidPassword(password, userFound.password)){
        return res.send({status: 'error', error: 'el email o la contraseña no coinciden'})
    }

    // req.session.user = {
    //     email,
    //     isAdmin: userFound.role === 'admin'
    // }

    const token = generateToken({id: userFound._id, role: userFound.role})

    res
      .cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24, // 24 horas
        httpOnly: true,
      })
      .send({
        status: "success",
        data: userFound,
        token,
      });
})


// sesiones activas
// router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
//     res.send({dataUser: req.user, message:'datos sensibles'})
// })

router.get('/current', passportCall('jwt'), authorization('admin'), (req, res) => {
    res.send({dataUser: req.user, message:'datos sensibles'})
})

// cerrando la sesion
router.get('/logout', (req, res) => {
    req.session.destroy( error => {
        if(error) return res.send({ status: 'error', error: error})
    })
    res.send('logout')
})



// creando una sesion
router.get('/session', (req, res) => {
    if(req.session.counter){
        req.session.counter++
        res.send(`se ha visitado el sitio ${req.session.counter} veces.`)

    } else {
        req.session.counter = 1
        res.send('Bienvenidos')
    }
});


router.post('/changepass', async (req, res) => {
    const {email, password} = req.body

    const userFound = await userService.getUser({email})

    if(!userFound){
        return res.send({status:'error', error: 'No existe el usuario'})
    }

    // if(userFound.email !== email || userFound.password !== password){
    //     return res.send({status:'error', error: 'El email o la contraseña no coinciden'})
    // }
        /// Esto ya no va
    // if(isValidPassword(password, userFound.password)){
    //     return res.send({status:'error', error: 'El email o la contraseña no coinciden'})
    // }

    //const result = await userService.updateuser(mail) --> el metodo no existe se debe crear el de actualizar

    res.send('se ha cambiado correctamente la contraseña')
})










module.exports = router