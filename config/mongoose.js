	var config = require('./config'),
	mongoose = require('mongoose');
	mongoose.Promise = global.Promise;


	module.exports = function() {
	var db = mongoose.connect(config.db, {
	  		useMongoClient: true
		});
	
	require('../models/students');
	return db;
	};