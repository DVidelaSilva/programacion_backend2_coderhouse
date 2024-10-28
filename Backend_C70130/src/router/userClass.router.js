const { RouterClass } = require("./routerClass")

class UserRouter extends RouterClass {

    init(){
        this.get('/', ['USER', 'USER-PREMIUM', 'ADMIN'], async (req, res) => {
            res.sendSuccess(['datos sensibles'])
            try {

            } catch (error) {
                res.sedServerError(error)
            }
        })
    }

}


module.exports = {
    UserRouter
}