console.log('Estamos en chat.js');


const socket = io()

let user
let chatBox = document.querySelector('#chatBox')

Swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingrese el usuario para identificarse en el chat',
    inputValidator: value => {
        return !value && '¡Necesitas escribir un nombre para continuar!'
    },
    allowOutsideClick: false
  }).then(result => {
    user = result.value
    console.log(user);
  })


  chatBox.addEventListener('keyup', evt => {
    if(evt.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', { user, message: chatBox.value })
            chatBox.value = ''
        }
    }
  })


  socket.on('messageLogs', data => {
    ///console.log('mensajes para todos', data);

    let log = document.querySelector('#messageLogs')
    let messages = ''
    data.forEach(message => {
        messages = messages + `${message.user} dice -> ${message.message}<br>`
    })

    log.innerHTML = messages
  })