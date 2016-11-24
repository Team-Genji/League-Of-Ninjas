/*globals require module  */
/*jshint esversion: 6 */

const port = 3001;

const app = require('./config/app');

app.listen(port, ()=> console.log(`App running at ${port}`));