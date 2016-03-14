(function(){

var app = angular.module('login',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		resolve: {
			"check": function($location, $rootScope, cookiesSvc){
				cookiesSvc.checkCookie();
				/*if($rootScope.loggedIn && !$rootScope.currentListId) {
					$location.path('/dashboard');
				} else if($rootScope.userId && $rootScope.currentListId) {
					$location.path('/list');
				}*/
			}
		},
		templateUrl: 'login.html'
	})
	.when('/dashboard', {
		resolve: {
			"check": function($location, $rootScope, cookiesSvc){
				cookiesSvc.checkCookie();
				/*if(!$rootScope.loggedIn) {
					$location.path('/');
				} else if($rootScope.userId && $rootScope.currentListId) {
					$location.path('/list');
				}*/
			}
		},
		templateUrl: 'dashboard.html'
	})
	.when('/list', {
		resolve: {
			"check": function($location, $rootScope, cookiesSvc){
				cookiesSvc.checkCookie();
				/*if(!$rootScope.loggedIn) {
					$location.path('/');
				} else if($rootScope.userId && !$rootScope.currentListId) {
					$location.path('/dashboard');
				}*/
			}
		},
		templateUrl: 'list.html',
		controller: 'todoController'
	})
	.otherwise({
		redirectTo: '/'
	});
});

app.controller('loginCtrl', function($scope, $location, $rootScope, $http, cookiesSvc){

	/*function checkCockie(){
		$http.post("php/checkcookie.php",{'uname':$scope.username, 'pass':$scope.password })
		.success(function(data,status,headers,config){
			if( data != 'continue' ) {
				if(data.indexOf('p') === -1){
					$rootScope.userId = data;
					//console.log('cookies = ' + data);
					$rootScope.loggedIn = true;
					//console.log($rootScope.loggedIn);
					$rootScope.currentListId = false;
					$location.path('/dashboard');
				} else {
					var x = data.indexOf('p');
					$rootScope.userId = data.slice(0,x);
					//console.log('userID = ' + $rootScope.userId);
					var strLength = data.length;
					data.split("");
					$rootScope.currentListId = data.slice(x+1,strLength);
					console.log('currentList = ' + $rootScope.currentListId);

					$rootScope.loggedIn = true;
					//console.log($rootScope.loggedIn);
					$location.path('/list');
				}
				
			} else {
				console.log('no cookies');
			}
		});
	}*/
	cookiesSvc.checkCookie();

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

app.service('cookiesSvc', function($rootScope, $http, $location){
	this.checkCookie = function(){
		$http.post("php/checkcookie.php")
		.success(function(data,status,headers,config){
			if( data != 'continue' ) {
				if(data.indexOf('p') === -1){
					$rootScope.userId = data;
					$rootScope.loggedIn = true;
					$rootScope.currentListId = false;

					console.log('cookies = ' + data);
					console.log($rootScope.loggedIn);
					$location.path('/dashboard');
				} else {
					var x = data.indexOf('p');
					$rootScope.userId = data.slice(0,x);
					console.log('userID = ' + $rootScope.userId);

					var strLength = data.length;
					data.split("");
					$rootScope.currentListId = data.slice(x+1,strLength);
					console.log('currentList = ' + $rootScope.currentListId);

					$rootScope.loggedIn = true;
					console.log($rootScope.loggedIn);
					$location.path('/list');
				}
				
			} else {
				console.log('no cookies');
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