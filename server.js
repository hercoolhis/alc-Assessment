process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose');
var express = require('./config/express');
var db = mongoose();
var app = express();

//app.listen(process.env.NODE_ENV);

module.exports = app;
console.log('Server running at http://localhost:3000/');
