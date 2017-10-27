	


	var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var studentSchema = new Schema({
  	firstName:  {type : String, required : true, max : 30},
  	lastName: {type : String, required : true, max : 30},
  	age: Number,
    gender : {type : String, required : true},
    dateOfBirth : Date,
    dateJoined : Date,
  	registrationNumber:  String,
  	class: String,
  	address: String,
    positionHeld : String,
    extraCurricular : String,    
  	created_at : { type : Date, default : Date.now},
 	  updated_at : { type : Date, default : Date.now}
	});

	mongoose.model('Student', studentSchema);