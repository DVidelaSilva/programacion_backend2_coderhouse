
const {UserManagerMongo} = require('../managers/Mongo/userManager.mongo')

const userService = new UserManagerMongo()
// const productService = ProductDaoMongo()


module.exports = {
    userService
}