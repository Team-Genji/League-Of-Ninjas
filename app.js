const config = require('./server/config');
const validator = require('./server/data/validator');
const data = require('./server/data')(config.connectionString, validator);
const app = require('./server/config/app')(data);
const controllers = require('./server/controllers')(data);
require('./server/routers')(app, controllers);
const server = app.listen(config.port);
require('./server/config/chat/index')(server);

console.log('running');