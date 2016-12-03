const config = require('./config');
const data = require('./data')(config.connectionString);
const app = require('./config/app')(data);
require('./routers')(app, data);

let io = require('socket.io').listen(app.listen(config.port));
console.log('running');

io.sockets.on('connection', socket => {
    socket.emit('message', { message: 'Welcome to the chat' });
    socket.on('send', dataSocket => {
        io.sockets.emit('message', dataSocket);
    });
});
