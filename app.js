/*globals require module  */
/*jshint esversion: 6 */

const config = require('./config'),
    data = require('./data')(config.connectionString),
    app = require('./config/app')(data);

require('./routers')(app, data);

app.listen(config.port, ()=> console.log(`App running at ${config.port}`));