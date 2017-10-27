

	

	app.controller('studentController', function($scope, studentData, $window) {

		$scope.newStudent = {};

		function getStudents() {
			studentData.get('/students').then(function(data) {
				$scope.students = data;	
				$('#myDataTable').DataTable( {data: data, columns: [			        
			        { data: 'firstName' },
			        { data: 'lastName' },
			        { data: 'age' },
			        { data: 'created_at' }
			    ] });			
			});
		}

		$scope.getStudents = function() {
			getStudents();
		};

		$scope.createStudent = function() {
			var newStudent = $scope.newStudent;
			studentData.post('/students', newStudent).then(function(data) {
				getStudents();
				$scope.newStudent = {};				
			});
		};

		$scope.viewStudent = function(student) {			
			var selectedStudentId = student._id;
			studentData.get('/students', selectedStudentId).then(function(data) {
				$scope.selectedStudent = student;											
			});
		}

		$scope.selectStudent = function(student) {			
			$scope.studentToEdit = student;			
		}


		$scope.updateStudent = function() {			
			var student = $scope.studentToEdit;			
			studentData.put('/students/' + student._id, student).then(function(data) {				
				getStudents();											
			});
		}

		$scope.deleteStudent = function() {			
			var student = $scope.studentToEdit;			
			studentData.delete('/students/' + student._id, student).then(function(data) {								
				getStudents();											
			});
		}

		


	});


