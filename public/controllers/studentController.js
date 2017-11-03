

	

	app.controller('studentController', function($scope, studentData, $window) {

		$scope.newStudent = {};
		$scope.loadingStudents = false;
		$scope.state = 'studentList';
		$scope.loadingSingleStudent = false;

		

		function getStudents() {
			
			$scope.loadingStudents = true;			
			studentData.get('/students').then(function(data){
				$scope.showList = true;				 
				$scope.students = data;	
				$scope.loadingStudents = false;							
			});
		}

		$scope.getStudents = function() {
			getStudents();
		};

		$scope.createStudent = function() {			
			$scope.state = 'createStudent';			
		};

		$scope.saveStudent = function() {
			console.log($scope.newStudent);
			var newStudent = $scope.newStudent;
			studentData.post('/students', newStudent).then(function(data) {
				getStudents();
				$scope.newStudent = {};					
				$scope.state = 'studentList';		
			});
		};

		$scope.viewStudent = function(student) {
			$scope.state = 'singleStudent';
			$scope.loadingSingleStudent = true;
			//$scope.showSingleStudent = true;
			$scope.selectedStudent = student;			
			/*var selectedStudentId = student._id;
			studentData.get('/students', selectedStudentId).then(function(data) {
				$scope.selectedStudent = student;											
			});*/
		}

		$scope.selectStudent = function(student) {					
			$scope.studentToEdit = student;	
			$scope.state = 'editStudent';		
		}


		$scope.updateStudent = function() {			
			var student = $scope.studentToEdit;			
			studentData.put('/students/' + student._id, student).then(function(data) {				
				getStudents();											
			});
		}

		$scope.deleteStudent = function(student) {		

			swal({
			  title: "Delete Student",
			  text: "Are you sure you want to delete " + student.firstName + ' ' + student.lastName + '?',
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "Delete",
			  cancelButtonText: "Cancel",
			  closeOnConfirm: true,
			  closeOnCancel: true
			},
			function(isConfirm){
			  if (isConfirm) {
			    console.log('Student Deleted');
			    var student = $scope.studentToEdit;			
					studentData.delete('/students/' + student._id, student).then(function(data) {								
						getStudents();											
					});        
			  } else {
			    
			  }
			});	
			
		}

		$scope.goBack = function() {
			$scope.state = 'studentList';
		}

		


	});


