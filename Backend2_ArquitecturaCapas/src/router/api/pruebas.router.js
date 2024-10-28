const { Router } = require('express')
const {fork} = require('node:child_process')

const router = Router()

function operacionCompleja(){
    let result = 0
    for (let i = 0; i < 7e9; i++){
        result += i
    }
    return result
}

router.get('/simple', (req, res) => {
    res.send('simple')
})

router.get('/compleja', (req, res) => {
    const child = fork('./src/router/api/operacionCompleja.js')
    child.send('inicializar calculo')
    child.on('message', data => {
        res.send({data})
    })
    //const suma = operacionCompleja()

})



// router.param('word', async (req, res, next, word) => {
//     // acciones para este parametro
//     req.word = word
//     next()
// })

// router.get('/params/:word([a-zA-Z%C3%A1]+)', (req, res) => {
//     //const { word } = req.params // word desde la request
//     const  word = req.params; // word desde en interceptor (req.param)
//     res.send(word)
// })


// router.get('*', (req, res) => {
//     res.send('no existe esata ruta')
// })

module.exports = router