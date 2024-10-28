const {Router} = require('express')
const userRouter = require('./users.router')
const viewsRouter = require('./views.router')
const sessionsRouter = require('./session.router')
//const { uploader } = require('../utils/uploader.js')

const router = Router()

router.use('/', viewsRouter)
router.use("/api/sessions", sessionsRouter);
router.use("/api/users", userRouter);
router.use("/api/products", () => {});
router.use("/api/carts", () => {});
// router.post('./uploader', uploader.single('myFile'), (req, res) => {
//     res.sent('Imagen subida')
// })

module.exports = router