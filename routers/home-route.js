module.exports = function(app, data) {
    let controller = require('../controllers/home/home-controller')(data);

    app.get('/home', controller.home);
};