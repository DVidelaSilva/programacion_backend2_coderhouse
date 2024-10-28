const {Router} = require('express')


const router = Router()

router.get('/login', (req, res) => {
    res.status(200).render('login.handlebars', {})
})

router.get("/register", (req, res) => {
  res.status(200).render("register.handlebars", {});
});


// router.use('/', (req, res) => {
//     res.render('index', {
//         username: 'Diego'
//     })
// })




module.exports = router