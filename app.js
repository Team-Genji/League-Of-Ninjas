const config = require('./config');
const data = require('./data')(config.connectionString);
const app = require('./config/app')(data);
const controllers = require('./controllers')(data);
require('./routers')(app, data, controllers);
const server = app.listen(config.port);
require('./config/chat/index')(server);

console.log('running');