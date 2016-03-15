angular.module('ToDo').controller('loginCtrl', function($scope, $location, $rootScope, $http, cookiesSvc){

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