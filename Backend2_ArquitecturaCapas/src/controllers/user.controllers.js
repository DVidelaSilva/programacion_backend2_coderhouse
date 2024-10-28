const {UserManagerMongo} = require('../managers/Mongo/userManager.mongo')
const {userService} = require('../services/index')

class UsersController {

    constructor(){
        this.userService = this.userService
    }

    
    getUsers = async (req, res) => {
        try{
            const users = await userService.getUsers()
            res.send({status: 'success', data: users})
        } catch (error){
            console.log(error)
        }
    }


    getUser = async (req, res )=> {
        try{           
            const { uid } = req.params
            const user = await userService.getUser({_id: uid})
            res.send({status: 'success', data: user})
        } catch (error) {
            console.log(error)
        }   
    }


    createUser = async (req, res) => {
        try{
            const {first_name, last_name, email} = req.body   
            if (!email) {
                return res.send({status: 'error', error: 'Faltan llenar campos'})
            }
            const result = await userService.createUser({first_name, last_name, email})
            res.send({ status: 'successs', data: result })
        } catch (error) {
            console.log(error)
        }
    }


    updateUser = async (req, res )=> {
        try{
            const { uid } = req.params
            const { first_name, last_name, email } = req.body
            if (!email) {
            return res.send({status: 'error', error: 'Faltan llenar campos'})
            }
            const userToUpdate = {
                first_name,
                last_name,
                email
            }
            const result = await userService.updateUser({_id: uid}, userToUpdate)
            res.send({status: 'success', data: result})   
        } catch (error) {
            console.log(error)
        } 
    }

    
    deleteUser = async (req, res )=> {
        try{        
            const { uid } = req.params
            const result = await userService.deleteUser({_id: uid})
            res.send({status: 'success', data: result})
    
        } catch (error) {
            console.log(error)
        } 
    }

}





module.exports = {
    UsersController
}

