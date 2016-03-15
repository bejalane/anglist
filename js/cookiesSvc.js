angular.module('ToDo').service('cookiesSvc', function($rootScope, $http, $location){
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