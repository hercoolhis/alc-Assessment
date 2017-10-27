	
	var students = require('../controllers/studentController');

	module.exports = function(app) {
		app.post('/students', students.create);
		app.get('/students', students.list);

		app.get('/students/:studentId', students.read);
		app.put('/students/:studentId', students.update);
		app.delete('/students/:studentId', students.delete)

		app.param('studentId', students.studentByID);

	};