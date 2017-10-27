module.exports = function(app) {
var index = require('../controllers/controller');
app.get('/', index.render);
};