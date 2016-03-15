angular.module('ToDo').controller('logoutCtrl',function($scope, $http, $rootScope, $location){
			/*$scope.logout = function(){
				$http.post("php/logout.php", {'userId':$rootScope.userId})
						.then(function (response) {
							//console.log(response.data)
							if(response.data == 'nocookies') {
								$rootScope.userId = 'nocookies';
								$rootScope.loggedIn = false;
								//console.log($rootScope.loggedIn);
								//console.log($rootScope.userId);
								$location.path('/');
							}
				});
}*/

	$scope.logout = function(){
		$http.post("php/logout.php")
		.then(function (response) {
						//console.log(response.data)
						if(response.data == 'nocookies') {
							$rootScope.userId = 'nocookies';
							$rootScope.loggedIn = false;
							//console.log($rootScope.loggedIn);
							//console.log($rootScope.userId);
							$location.path('/');
						}
					});
	}

	$scope.todashboard = function(){
		
		$http.post("php/setdboardcookies.php", {'row':$rootScope.userId})
		.then(function (response) {
			console.log('coockiessss dboard = ' + response);
			$location.path('/dashboard');
		});

	}
});