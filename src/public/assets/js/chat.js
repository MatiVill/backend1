console.log('chat.js')

const socket = io()
let users
let chatbox = document.querySelector('#chatbox')

Swal.fire({
    title: 'Identifícate',
    input: 'text',
    text: 'Ingrese el usuario para identificarse en el chat',
    
})