const passport = require('passport')
//const Strategy = require('passport-local')

const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info){
            if(err) return next(err)
            if(!user) return res.status(401).send({error: info.message ? info.message : info.toString()})
            req.user = user
            next()
        })(req, res, next)
    }
}

module.exports = {
  passportCall
};

///// Invalid token
///// No auth token