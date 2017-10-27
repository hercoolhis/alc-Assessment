var express = require('express'),
morgan = require('morgan'),
compress = require('compression'),
bodyParser = require('body-parser');
var path = require('path');


module.exports = function() {
var app = express();
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));



require('../routes/routes.js')(app);
require('../routes/students.js')(app);
return app;
};