const { Router } = require('express');
const { UsersController } = require('../../controllers/user.controllers');
const {passportCall} = require('../../middleware/passport/passportCall')




const {getUser, getUsers, createUser, updateUser, deleteUser} = new UsersController()


const router = Router()


// Traer todos los usuarios
router.get('/', passportCall('jwt'), getUsers)

// Traer un usuario por el Id
router.get('/:uid', getUser);


// Crear un usuario
router.post('/', createUser);


// Actualizar un Usuario por el Id
router.put('/:uid', updateUser);


// Eliminar un Usuario por el Id
router.delete('/:uid', deleteUser);






module.exports = router