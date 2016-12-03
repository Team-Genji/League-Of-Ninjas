module.exports = function(server) {
    let io = require('socket.io')(server);

    io.sockets.on('connection', socket => {
        socket.emit('message', { message: 'Welcome to the chat' });
        socket.on('send', dataSocket => {
            io.sockets.emit('message', dataSocket);
        });
    });
};