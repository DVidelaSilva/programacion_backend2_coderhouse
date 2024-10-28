const { Router } = require('express');
const { userModel } = require('../daos/models/users.model');
const { authTokenMiddleware } = require('../utils/jwt');


const router = Router()

const midd1 = (req, res, next) => {
    console.log('middleware');
    next()
};


// Traer todos los usuarios
router.get('/', authTokenMiddleware, async (req, res) => {

    try{
        const users = await userModel.find()
        res.send({status: 'success', data: users})
    } catch (error){
        console.log(error)
    }
});


// Crear un usuario
router.post('/', async (req, res) => {

    try{
        const {first_name, last_name, email} = req.body
    
        if (!email) {
            return res.send({status: 'error', error: 'Faltan llenar campos'})
        }

        const result = await userModel.create({first_name, last_name, email})
        res.send({ status: 'successs', data: result })

    } catch (error) {
        console.log(error)
    }
});


// Traer un usuario por el Id
router.get('/:uid', async (req, res )=> {
    try{
        
        const { uid } = req.params
        const user = await userModel.findOne({_id: uid})
        res.send({status: 'success', data: user})

        } catch (error) {
            console.log(error)
        }   
});


// Actualizar un Usuario por el Id
router.put('/:uid', async (req, res )=> {

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
        const result = await userModel.findByIdAndUpdate({_id: uid}, userToUpdate)
        res.send({status: 'success', data: result})

    } catch (error) {
        console.log(error)
    } 
});


// Eliminar un Usuario por el Id
router.delete('/:uid', async (req, res )=> {

    try{
        
        const { uid } = req.params
        const result = await userModel.findByIdAndDelete({_id: uid})
        res.send({status: 'success', data: result})

    } catch (error) {
        console.log(error)
    } 
});






module.exports = router