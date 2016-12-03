/* globals io document window */

window.onload = function() {

    let messages = [];
    let socket = io.connect('http://192.168.1.249:3001');
    let field = document.getElementById('field');
    let sendButton = document.getElementById('send');
    let content = document.getElementById('content');

    socket.on('message', function (data) {
        if (data.message) {
            messages.push(data.message);
            let html = '';
            for (let index = 0; index < messages.length; index += 1) {
                html += messages[index] + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log('There is a problem:', data);
        }
    });

    sendButton.onclick = function() {
        let text = field.value;
        socket.emit('send', { message: text });
    };
};