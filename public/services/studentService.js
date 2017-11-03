

	app.factory('studentData', ['$http', function($http) {

		studentData = {};

		studentData.get = function(url) {			
			return $http.get(url).then(function(results) {
						return results.data;
				   });
		};

		studentData.post = function(url, studentObject) {			
			return $http.post(url, studentObject).then(function(results) {
						return results.data;
				   });
		};

		studentData.put = function(url, student) {			
			return $http.put(url, student).then(function(results) {				
						return results.data;
				   });
		};

		studentData.delete = function(url, student) {			
			return $http.delete(url, student).then(function(results) {				
						return results.data;
				   });
		};
		return studentData;
		
	}]);