/*globals require module  */
/*jshint esversion: 6 */

const port = 3001;
const config = require('./config/mongodb-config');
const  data = require('./data')(config.connectionString),
    app = require('./config/app')({data});

require('./routers/')({app,data});

app.listen(port, ()=> console.log(`App running at ${port}`));