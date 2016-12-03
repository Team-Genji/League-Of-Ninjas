/* globals io document window */

window.onload = function() {
    let messages = [];
    let socket = io.connect('http://25.41.220.206:3001');
    let field = document.getElementById('field');
    let sendButton = document.getElementById('send');
    let content = document.getElementById('content');
    let username = document.getElementById('usernameChat');

    socket.on('message', data => {
        if (data.message) {
            messages.push(data.message);
            let html = '';
            for (let index = 0; index < messages.length; index += 1) {
                html += `${messages[index]} <br />`;
            }
            content.innerHTML = html;
        } else {
            console.log('Err: ', data);
        }
    });

    sendButton.onclick = function() {
        let text = `${username.innerHTML}:  ${field.value}`;
        field.value = '';
        socket.emit('send', { message: text });
    };

    field.keyup(event => {
        if (event.keyCode === 13) {
            let text = `${username.innerHTML}:  ${field.value}`;
            field.value = '';
            socket.emit('send', { message: text });
        }
    });
};
