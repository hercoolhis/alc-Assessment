	
	var Student = require('mongoose').model('Student');

	exports.create = function(req, res, next) {
		var student = new Student(req.body);
		student.save(function(err) {
			if (err) {
				return next(err);
			} else {
				res.json(student);
			}
		});
	};

	exports.list = function(req, res, next) {
		Student.find({}, function(err, students) {
			if (err) {
				return next(err);
			} else {
				res.json(students);
			}
		});
	};

	exports.read = function(req, res) {
		res.json(req.student);
	};
		
	exports.studentByID = function(req, res, next, id) {
		Student.findOne({_id: id}, function(err, student) {
			if (err) {
			return next(err);
			} else {
			req.student = student;
			next();
			}
		});
	};
	

	exports.update = function(req, res, next) {
		console.log(req);
		Student.findByIdAndUpdate(req.params.studentId, {$set:req.body}, function(err, student) {
			if (err) {
				return next(err);
			} else {
				res.json(student);
			}
		});
	};

	exports.delete = function(req, res, next) {
		req.student.remove(function(err) {
			if (err) {
			return next(err);
			} else {				
				res.json(req.student);
			}
		})
	};





