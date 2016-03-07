(function(){

var app = angular.module('login',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'login.html'
	})
	.when('/dashboard', {
		resolve: {
			"check": function($location, $rootScope){
				if(!$rootScope.loggedIn) {
					$location.path('/');
				}
			}
		},
		templateUrl: 'dashboard.html'
	})
	.when('/list', {
		templateUrl: 'list.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

app.controller('loginCtrl', function($scope, $location, $rootScope, $http){

	function checkCockie(){
		$http.post("php/checkcookie.php",{'uname':$scope.username, 'pass':$scope.password })
		.success(function(data,status,headers,config){
			if( data != 'continue' ) {
				$rootScope.userId = data;
				$rootScope.loggedIn = true;
				console.log($rootScope.loggedIn);
				$location.path('/dashboard');
			} else {
				console.log('no cookies');
			}
		});
	}
	checkCockie();

	$scope.submit = function(){
		$http.post("php/login.php",{'uname':$scope.username, 'pass':$scope.password })
		.success(function(data,status,headers,config){
			if( data == 'not' ) {
				alert('wrong stuff!');
				console.log(data);
			} else if (data.length > 20) {
				console.log(data);
				console.log('coockie problem!');
				window.location = '/anglist/';
			} else {
				$rootScope.userId = data;
				$rootScope.loggedIn = true;
				console.log($rootScope.loggedIn);
				console.log('data = '+data+' rs= '+$rootScope.userId);
				$location.path('/dashboard');
			}
		});
	}
});

app.controller('registerCtrl', function($scope, $location, $rootScope, $http){

	$scope.register = function(){
		if($scope.password === $scope.cpassword){
			$http.post("php/register.php",{'uname':$scope.username, 'pass':$scope.password})
			.success(function(data,status,headers,config){
				if (data == 2) {
					alert('User with such username does exists. Please chhose another name.');
				} else if(data == 1) {
					alert('Thank you for registration! Please log in and use this app!');
				} else if(data == 3) {
					alert('Username cannot be empty!');
				} else if(data == 4) {
					alert('Password cannot be empty!');
				} else {
					console.log($scope.data);
				}
			});
		} else {
			alert('password is not match!');
		}
	}
});


})();