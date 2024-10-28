const {Router} = require('express')

const router = Router()


// router.get('/setcookie', (req, res) => {
//     res.cookie('coderCookie', 'Esta es una cookie muy poderosa', {maxAge: 100000}).send('set cookie')
// });

router.get('/setcookiesigned', (req, res) => {
    res.cookie('coderCookie', 'Esta es una cookie muy poderosa', {maxAge: 100000, signed: true}).send('set cookie Signed')
});

router.get('/getcookie', (req, res) => {
    // console.log(req.cookies);
    // res.send(req.cookies)
    console.log(req.signedCookies);
    res.send(req.signedCookies)
});


router.get('/deletecookie', (req, res) => {
    //console.log(req.cookies);
    res.clearCookie('coderCookie').send('Cookie Borrada')
});




module.exports = router