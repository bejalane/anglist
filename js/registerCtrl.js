angular.module('ToDo').controller('registerCtrl', function($scope, $location, $rootScope, $http){

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