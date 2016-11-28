/* jshint esversion: 6 */

const config = require('./config');
const data = require('./data')(config.connectionString);
const app = require('./config/app')(data);
require('./routers')(app, data);

app.listen(config.port);
console.log('running');