const {userModel} = require("../../models/users.model")

class UserManagerMongo {

    constructor(){
        this.model = userModel
    }

    getUser = async filter => {
       return await this.model.findOne(filter)
    }

    createUser = async newUser => {
        return await this.model.create(newUser)
    }

    getUsers = () => {}

    updateUser = () => {}
    
    deleteUser = () => {}

}


module.exports = {
    UserManagerMongo
}