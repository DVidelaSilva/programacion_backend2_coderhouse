const authentication = (req, res, next) => {
    if(req.session.user.email != 'DAVS@mail.com' || !req.session.user.isAdmin){
        return res.status(401).send('Error de autenticacion')
    }

    next()
}


module.exports = {authentication}