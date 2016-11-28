module.exports = function(app, data) {
    let controller = require('../controllers/default-controller')(data);

    app.get('/', controller.resolve);
};