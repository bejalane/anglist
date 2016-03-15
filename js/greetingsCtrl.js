angular.module('ToDo').controller('greetingsCtrl',function($scope, $http, $rootScope, $location){
	$http.post("php/greetings.php", {'userId':$rootScope.userId})
	.success(function (response) {
		$scope.textData = response;
	});
});