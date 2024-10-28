const passport = require('passport')
const passportLocal = require('passport-local')
const GithubStrategy = require('passport-github2')
const {UserManagerMongo} = require('../managers/Mongo/userManager.mongo')
const { createHash, isValidPassword } = require('./../utils/bcrypt')
const jwt = require('passport-jwt')
const { PRIVATE_KEY } = require('../utils/jsonwebtoken')

PRIVATE_KEY

//const LocalStrategy = passportLocal.Strategy

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt
const userService = new UserManagerMongo()


const initializePassport = () => {

  const cookeExtractor = req => {
    let token = null
    if(req && req.cookies){
      token = req.cookies['token']
    }
    return token
  }

  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookeExtractor]),
    secretOrKey: PRIVATE_KEY
  }, async (jwt_payload, done) => {
      try{
          return done(null, jwt_payload)
      } catch (error){
        return done(error)
      }
  }))



}






    // middlewares son las estrategias que vamos a crear y configurar


    // passport.use(
    //   "github",
    //   new GithubStrategy(
    //     {
    //       clientID: "Iv23licICo5tWnGju0Nd",
    //       clientSecret: "37e5b083c028f06b0bfdc7df6e572bbb7ad99d52",
    //       callbackURL: "http://localhost:8080/api/sessions/githubcallback",
    //     },
    //     async (accesToken, refreshToken, profile, done) => {
    //       try {
    //         console.log(profile);
    //         let user = await userService.getUser({email: profile._json.email})

    //         if(!user) {
    //             // registramos
    //             let newUser = {
    //                 first_name: profile._json.name,
    //                 last_name: profile._json.name,
    //                 email: 'diegovidela@mail.com',//profile._json.email,
    //                 password: '123456'
    //             }
    //             let result = await userService.createUser(newUser);
    //             return done(null, result)
    //         }
            

    //         done(null, user)

    //       } catch (error) {
    //         return done(error);
    //       }
    //     }
    //   )
    // );






    // passport.use('register', new LocalStrategy({
    //     passReqToCallback: true,
    //     usernameFile: 'email'
    // }, async (req, username, password, done) => {
    //     // toda la logica del register
    //     const { first_name, last_name} = req.body
    //     console.log(first_name);
    //     try{
    //         let userFound = await userService.getUser({email: username})
    //         console.log(userFound);
    //         if (userFound) return done(null, false)
                
    //         let newUser = {
    //             first_name,
    //             last_name,
    //             email: username,
    //             password: createHash(password)
    //         }
    //         let result = await userService.createUser(newUser)
    //         return done(null,result)

    //     } catch (error) {
    //         return done('Error al crear un usuario' + error)
    //     }
    // }))


    // passport.use('login', new LocalStrategy({
    //     usernameField: 'email'
    // }, async (username, password, done) => {
    //     try {
    //         const user = await userService.getUser({email: username})
    //         if (!user) return done(null, false)

    //         if(isValidPassword(password, user.password)) return done(null, false)
    //         return done(null, user)
    //     } catch (error){
    //         return done(error)
    //     }
    // }))


//     passport.serializeUser((user, done) => {
//         done(null, user.id)
//     })

//     passport.deserializeUser(async (id, done) => {
//         let user = await userService.getUser({_id: id})
//         done(null, user)
//     })
// }


module.exports = {
    initializePassport
}
