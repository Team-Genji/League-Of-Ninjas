/*globals require module  */
/*jshint esversion: 6 */

const port = 3001;

const app = require('./config/app'),
    data = require('./dummy-db');
    
require('./routers/')({app,data});

app.listen(port, ()=> console.log(`App running at ${port}`));