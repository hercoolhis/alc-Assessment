

	

	app.controller('studentController', function($scope, studentData, $window) {

		$scope.newStudent = {};
		$scope.loadingStudents = false;
		$scope.state = 'studentList';
		$scope.loadingSingleStudent = false;
		getStudents();
	    
        function generateUniqueId() {
        	var rand_Numb = Math.floor(Math.random() * 1000);
        	return rand_Numb;
        } 

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
			var newStudent = $scope.newStudent;
			console.log(newStudent.dateOfBirth);
			newStudent.registrationNumber = newStudent.class + "-" + generateUniqueId();			
			studentData.post('/students', newStudent).then(function(data) {
				getStudents();
				swal('Success', 'You have successfully added student details for ' + newStudent.firstName + ' ' + newStudent.lastName, 'success');
				$scope.newStudent = {};					
				$scope.state = 'studentList';

			});
		};

		$scope.viewStudent = function(student) {
			$scope.state = 'singleStudent';
			$scope.loadingSingleStudent = true;
			
			//$scope.selectedStudent = student;			
			var selectedStudentId = student._id;
			studentData.get('/students', selectedStudentId).then(function(data) {
				$scope.selectedStudent = student;											
			});
		}

		$scope.selectStudent = function(student) {					
			$scope.studentToEdit = student;	
			$scope.state = 'editStudent';		
		}


		$scope.updateStudent = function() {			
			var student = $scope.studentToEdit;			
			studentData.put('/students/' + student._id, student).then(function(data) {
				console.log('success');				
				getStudents();
				$scope.state = 'studentList';
				swal('Success', 'You have successfully updated details for ' + student.firstName + ' ' + student.lastName, 'success');											
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
					studentData.delete('/students/' + student._id, student).then(function(data) {								
						getStudents();
						$scope.state = 'studentList';
						swal('Success', 'You have successfully deleted ' + student.firstName + ' ' + student.lastName, 'success');											
					});        
			  } else {

			  	swal('Success', 'Delete Operation Cancelled ', 'success');			    
			  }
			});	
			
		}

		$scope.goBack = function() {
			$scope.state = 'studentList';
			$scope.selectedStudent = {};
		}

		


	});


