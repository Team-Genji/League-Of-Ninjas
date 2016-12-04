const config = require('./config');
const validator = require('./data/validator');
const data = require('./data')(config.connectionString, validator);
const app = require('./config/app')(data);
const controllers = require('./controllers')(data);
require('./routers')(app, data, controllers);
const server = app.listen(config.port);
require('./config/chat/index')(server);

console.log('running');