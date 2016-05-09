angular.module('ToDo').service('cookiesSvc', function($rootScope, $http, $location){

this.checkCookie = function(callback){
	var x = 1;
	$http.post("php/checkcookie.php")
	.success(function(data,status,headers,config){
		if( data != 'continue' ) {
			if(data.indexOf('p') === -1){

				var cookiesResponse = {
					userId : data,
					loggedIn : true,
					currentListId : false,
				}

				x = 2;
				callback(x)

				

			} else {
				var cookiesResponse = {}
				var x = data.indexOf('p');
				cookiesResponse.userId = data.slice(0,x);

				var strLength = data.length;
				data.split("");
				cookiesResponse.currentListId = data.slice(x+1,strLength);

				cookiesResponse.loggedIn = true;

				response = cookiesResponse;
			}
		} else {
			console.log('no cookies');
		}
	});
	console.log(x);
}


this.returnCookies = function(val){
	return val;
}

/*	this.checkCookie = function(){
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
*/
});