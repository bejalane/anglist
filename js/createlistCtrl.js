(function(){
	angular.module('ToDo').controller('createlistCtrl', function($scope,$http,$rootScope,$location){

		function fetchlists(){
			$http.post("php/fetchlists.php", {'userId':$rootScope.userId})
			.then(function (response) {
				$scope.mylists = response.data.records;
				console.log($scope.mylists);
			});
		}
		fetchlists();

		$scope.createListSubmit = function(){
			var listName = $scope.createlist;
			$http.post("php/createlist.php", {'userId':$rootScope.userId, 'listName':listName})
			.success(function (response) {
				console.log(response);
				fetchlists();
				$scope.createlist = "";
			});
		}

		$scope.gotoList = function(id){
			$rootScope.currentListId = id;
			$location.path('/list');
		}

	});
})();