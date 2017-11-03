


var app = angular.module('checkInApp', []);




app.controller('checkInController', [ '$scope', '$http', '$timeout', '$filter', '$window',  function($scope, $http, $timeout,$filter, $window) {

	$scope.name = 'TalentMine';

	if ($scope.admin == null) {
		$scope.state  = 0;
	} else {
		$scope.state  = 1;
	};

	

	$scope.searchValue = '';
	$scope.guestAvailable = false;
	$scope.showCheckInBox = false;
	$scope.logging_in = false; 
	

	$scope.login = function(email, password) {

			
		if (email.length != 0 && password.length != 0 ) {
			$scope.logging_in = true;

		


			var request = $http({
    		method: "post",
    		url: "login.php",
    		data: {
        		email: email,
        		password : password, 
        		      		
        		        		
    		},
    		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});

		request.success(function(data) {

			
			if (data.email != null) {
				$scope.logging_in = false;
				$scope.admin = data;
				swal('Welcome ' + $scope.admin.name, 'You have successfully signed in', 'success');
				$scope.state = 1;
				$scope.admin = data;
			} else {
				$scope.loginErrorMessage = data;
				$scope.logging_in = false;
				swal($scope.loginErrorMessage);
			}

			
    		
		});	

		} 


	}

	$scope.addone = function(){

		var updateCheckIn = parseInt($scope.admin.check_ins) + 1;

		return updateCheckIn;
	}

	$scope.logout =  function() {

		var request = $http({
    		method: "post",
    		url: "logout.php",
    		data: {
        		 
        		      		
        		        		
    		},
    		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});

		request.success(function(data) {



			$scope.state = 0;
			$scope.admin = null;
			$scope.admin_email = null;
			$scope.admin_password = null;
			$scope.searchValue = null;
			$scope.guest = null; 

			
			
    		
		});
	} 	

	$scope.getGuest = function() {

		
		if ($scope.searchValue.length != 0) {
			$scope.loading = true;


		
		var request = $http({
    		method: "post",
    		url: "getGuest.php",
    		data: {
        		searchInput: $scope.searchValue     		
        		        		
    		},
    		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});

		request.success(function(data) {
			$scope.loading = false;
			$scope.state  = 2;	

    		$scope.guest = data;

    		

    		if ($scope.guest.attendance_status == 0) {

    			$scope.showCheckInBox = true;
    			$scope.alreadyCheckedIn = false;
    			$scope.noRefund = false;



    		};

    		//Check for alreadycheckedin and noRefund
    		if ($scope.guest.attendance_status == 1) {
    			$scope.alreadyCheckedIn = true;
    			
    			if ($scope.guest.refund_status == 0) {
    				$scope.noRefund = true;
    				$scope.PaymentDetails = false;

    				//checked in , no refund.
    			};

    			if ($scope.guest.refund_status == 1) {
    				$scope.PaymentDetails = true;
    				$scope.noRefund = false;

    				//checked in , refund available
    			};

    		
    		} else{
    			$scope.alreadyCheckedIn = false;
    		}

    		    		
    		
    		if ($scope.guest.email == null){
    			$scope.guestAvailable = false;
    			$scope.state = 1;
    			$scope.noGuestMessage = 'Guest not found, Refer Guest to TalentMine Representative';
    			swal('Guest not found, Refer Guest to TalentMine Representative');
    		};	
			
		});

		} else {

			$scope.emptyFieldNote = 'Please Enter a valid Email Address';
			$scope.loading = false;


		}; 

	};


	

	$scope.guestCheckIn = function(email){

		var no_of_check_in = parseInt($scope.admin.check_ins) + 1;;
		

		var request = $http({
    		method: "post",
    		url: "checkInGuest.php",
    		data: {
        		email: email,
        		arrival_time: $filter('date')(new Date(), "h:mm a"),
        		checked_in_by : $scope.admin.email,
        		admin_check_ins : no_of_check_in          		
    		},
    		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});

		request.success(function(data) {			
			
    		$scope.message = data;
    		$scope.state = 3;
    		$scope.admin.check_ins = parseInt($scope.admin.check_ins) + 1;
    		
    		$scope.showCheckInBox = false;  		
   			

   			if ($scope.guest.refund_status == 1) {			
   				$scope.showAmountBox = true;

   			};

   			if ($scope.guest.refund_status == 0) {
   				$scope.showAmountBox = false;
   				$scope.checkInMessage = true;
   			};
		});

	};

	function calculateRefund(state, refundable_amount) {

		var batch1 = ['ABUJA', 'NIGER', 'NASARAWA', 'KOGI'];
		var batch2 = ['EDO', 'DELTA', 'KWARA', 'ONDO', 'EKITI'];
		var batch3 = ['OGUN', 'OSUN'];
		var batch4 = ['BENUE', 'PLATEAU'];
		var batch5 = ['ADAMAWA', 'BAUCHI', 'BORNO', 'GOMBE', 'TARABA', 'YOBE'];
		var batch6 = ['JIGAWA', 'KADUNA', 'KANO', 'KATSINA', 'KEBBI', 'SOKOTO', 'ZAMFARA', 'ABIA', 'ANAMBRA', 'EBONYI', 'ENUGU', 'IMO'
		, 'AKWA IBOM', 'CROSS RIVER', 'BAYELSA', 'RIVERS'];
		var batch7 = ['OYO'];

    




		var refund_due = "";

	
		

		for (var i = 0; i < batch1.length; i++) {
			if (state == batch1[i]) {
				if ((refundable_amount * 2) < 8000 ) {
					refund_due = refundable_amount * 2;
				};

				if ((refundable_amount * 2) >= 8000 ) {
					refund_due = 8000;
				};
				
			};
		};

		for (var i = 0; i < batch2.length; i++) {
			if (state == batch2[i]) {
				if ((refundable_amount * 2) < 6000 ) {
					refund_due = refundable_amount * 2;
				};

				if ((refundable_amount * 2) >= 6000 ) {
					refund_due = 6000;
				};
				
				
			};
		};

		for (var i = 0; i < batch3.length; i++) {
			if (state == batch3[i]) {
				if ((refundable_amount * 2) < 5000 ) {
					refund_due = refundable_amount * 2;
				};

				if ((refundable_amount * 2) >= 5000 ) {
					refund_due = 5000;
				};
				
				
			};
		};

		for (var i = 0; i < batch4.length; i++) {
			if (state == batch4[i]) {
				if ((refundable_amount * 2) < 9000 ) {
					refund_due = refundable_amount * 2;
				};

				if ((refundable_amount * 2) >= 9000 ) {
					refund_due = 9000;
				};
				
				
			};
		};

		for (var i = 0; i < batch5.length; i++) {
			if (state == batch5[i]) {
				if ((refundable_amount * 2) < 9000 ) {
					refund_due = refundable_amount * 2;
				};

				if ((refundable_amount * 2) >= 9000 ) {
					refund_due = 9000;
				};
				
				
			};
		};

		for (var i = 0; i < batch6.length; i++) {
			if (state == batch6[i]) {
				if ((refundable_amount * 2) < 8000 ) {
					refund_due = refundable_amount * 2;
				};

				if ((refundable_amount * 2) >= 8000 ) {
					refund_due = 8000;
				};
				
				
			};
		};

		for (var i = 0; i < batch7.length; i++) {
			if (state == batch7[i]) {
				if ((refundable_amount * 2) < 4000 ) {
					refund_due = refundable_amount * 2;
				};

				if ((refundable_amount * 2) >= 4000 ) {
					refund_due = 4000;
				};
				
				
			};
		};

		


		return refund_due;
	}


	$scope.goBack = function() {

		$scope.state = 1;
		$scope.guest = {};
		$scope.checkInMessage = false;
		$scope.noGuestMessage = '';
		$scope.emptyFieldNote = '';
		$scope.searchValue = '';
		$scope.showRefundMoney = false;
		$scope.showrefundedAmount = false;
		$scope.refundable_amount = '';
		$scope.amount_refunded = '';
		$scope.account_number = '';
		$scope.guest_state = '';
		$scope.guest_bank = '';
		$scope.new_admin_email = null;
		$scope.new_admin_password = null;
		$scope.new_admin_name = null;
		$scope.new_admin_type = null;

	};

	$scope.reset = function(){

		$scope.searchValue = '';
		$scope.noGuestMessage = '';

	}


	$scope.savePaymentDetails = function(email,refundable_amount,guest_state,account_number,guest_bank){

		if (refundable_amount != null) {

		$scope.refund_due = calculateRefund(guest_state, refundable_amount);

		$scope.refundable_amount = refundable_amount;
		$scope.guest_state = guest_state;
		$scope.account_number = account_number;
		$scope.guest_bank = guest_bank;


		var request = $http({
    		method: "post",
    		url: "savePaymentDetails.php",
    		data: {
        		email: email,
        		refundable_amount: refundable_amount,
        		guest_state : guest_state,
        		account_number : account_number,
        		guest_bank : guest_bank,
        		refund_due : $scope.refund_due       		
    		},
    		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});

		request.success(function(data){

			

			$scope.state = 4;
			$scope.checkInMessage = true;
			
			$scope.refundAmountSubmitted = true;
			


		});

	};

	};



	$scope.saveRefundedAmount = function(email,amount_refunded){

		if (amount_refunded != null) {

		$scope.amount_refunded = amount_refunded;

		var request = $http({
    		method: "post",
    		url: "saveRefundedAmount.php",
    		data: {
        		email: email,
        		amount_refunded: amount_refunded        		
    		},
    		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});

		request.success(function(data){
			$scope.state = 5;
			$scope.RefundMessage = true;
			$scope.amountRefundedStatus = data;		
			

		});

		};




	}

	$scope.createAdmin = function() {

		$scope.state = 5;

	}

	$scope.saveNewAdmin = function(admin_name,new_admin_name,new_admin_email,new_admin_password,new_admin_type) {

		if (new_admin_email != 0 && new_admin_password.length != 0 && new_admin_type.length != 0 && new_admin_name.length != 0) {
			

			var request = $http({
    		method: "post",
    		url: "createAdmin.php",
    		data: {
        		new_admin_email: new_admin_email,
        		new_admin_password : new_admin_password,
        		new_admin_name : new_admin_name,
        		new_admin_type : new_admin_type,
        		createdBy : admin_name


        		      		
        		        		
    		},
    		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});

		request.success(function(data) {


			$scope.successMessage = data;
			swal($scope.successMessage);
			$scope.state = 1;
			
			

			
    		
		});	

		} 
	}




		

}]);