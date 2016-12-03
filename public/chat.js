/* globals Event io document window */

window.onload = function() {
    let socket = io();
    let field = document.getElementById('field');
    let sendButton = document.getElementById('send');
    let content = document.getElementById('content');
    let username = document.getElementById('usernameChat').innerHTML;
    let clickEvent = new Event('click');

    socket.on('message', data => {
        if (data.message) {

            let message = document.createElement('p');
            message.innerHTML = `${data.message}`;
            if (data.message.toLowerCase().indexOf(`@${username.toLowerCase()}`) >= 0) {
                message.classList.add('bg-danger');
            }

            content.appendChild(message);
        } else {
            console.log('Err: ', data);
        }
    });

    sendButton.addEventListener('click', () => {
        let message = field.value.trim();
        if (message === '') {
            // Show toastr error: Message should not be empty
            field.value = '';
        } else {
            let text = `${username}:  ${field.value}`;
            field.value = '';
            socket.emit('send', { message: text });
        }
    });

    field.addEventListener('keyup', event => {
        if (event.keyCode === 13) {
            sendButton.dispatchEvent(clickEvent);
        }
    });
};