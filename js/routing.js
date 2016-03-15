angular.module('ToDo').config(function($routeProvider){
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