angular.module('ToDo').controller('todoController',function($scope, $http, $rootScope, $location){
	var todoList = [];

	function fetchlists(){
		$http.post("php/listname.php", {'listnumber':$rootScope.currentListId})
		.then(function (response) {
			$scope.listname = response.data.records[0].listname;
		});
	}
	fetchlists();

	function setListCookies(){
		if($location.path('/list')){
			$http.post("php/setlistcookies.php", {'row':$rootScope.userId, 'listnumber':$rootScope.currentListId})
			.then(function (response) {
				console.log('coockiesss list = ' + response);
			});
		} else {
			$http.post("php/setdboardcookies.php", {'row':$rootScope.userId})
			.then(function (response) {
				console.log('coockiessss dboard = ' + response);
			});
		}
	}
	setListCookies();

	function fetch(){
		$http.post("php/fetch.php", {'row':$rootScope.userId, 'listnumber':$rootScope.currentListId})
		.then(function (response) {
			//console.log(response.data.records);
			//console.log('USER '+ $rootScope.userId);
			$scope.todoList = response.data.records;
			for(var i in response.data.records) {
				$scope.todoList[i].avaliable = ($scope.todoList[i].avaliable == 0) ? false : true;
				$scope.todoList[i].done = ($scope.todoList[i].done == 0) ? false : true;
			}
			todoList.push(response.data.records);
		});
		setTimeout(function(){ 
			if($rootScope.loggedIn == true){
				fetch();
			}
		}, 3000);
	}

	if($rootScope.loggedIn == true){
		fetch();
	}
	
	$scope.spaceEnable = false;

	$scope.useSpace = function(){
		$scope.spaceEnable = $scope.todo.space;
	}
	

	$scope.insertItem = function(){
		if($scope.spaceEnable === true){
			var itemsarray = [];
			var string = $scope.deal;
			var count = (string.match(/\s/g) || []).length;
			if(string.slice(-1) !== ' '){
				count = count + 1;
			}
			console.log(count);
			for(var i=0; i<count; i++) {
				var workstring = string;
				var strLength = workstring.length;
				var x = workstring.indexOf(' ');
				var item = string.slice(0,x);
					//item = item.replace(/^ +/gm, '');
					itemsarray.push(item);
					//console.log(itemsarray);
					workstring.split("");
					workstring = workstring.slice(x+1,strLength);
					string = workstring;
				}

				for(var j=0; j<itemsarray.length; j++){
					$http.post("php/insert.php",{'name':itemsarray[j], 'done':0, 'avaliable':0, 'row':$rootScope.userId, 'listnumber':$rootScope.currentListId})
					.success(function(data,status,headers,config){
						//console.log(data + "data inserted successfully");
						//console.log(data);
						//console.log($rootScope.userId);
						data.avaliable = (data.avaliable == 0) ? false : true;
						data.done = (data.done == 0) ? false : true;
						$scope.todoList.push(data);
					});
				}

				$scope.deal = '';
				$scope.spaceEnable = false;
				$scope.todo.space = false;
			} else if($scope.spaceEnable === false){
				if($scope.deal.indexOf(';') === -1)
				{
					if( $scope.deal != '' && $scope.deal != undefined ){
						$http.post("php/insert.php",{'name':$scope.deal, 'done':0, 'avaliable':0, 'row':$rootScope.userId, 'listnumber':$rootScope.currentListId})
						.success(function(data,status,headers,config){
							//console.log(data + "data inserted successfully");
							//console.log(data);
							//console.log($rootScope.userId);
							data.avaliable = (data.avaliable == 0) ? false : true;
							data.done = (data.done == 0) ? false : true;
							$scope.todoList.push(data);
						});
					} else {
						alert('enter smth');
					}
					$scope.deal = '';
				} else {
					var itemsarray = [];
					var string = $scope.deal;
					var count = (string.match(/;/g) || []).length;
					if(string.slice(-1) !== ';'){
						count = count + 1;
						string = string + ' ';
					}
					for(var i=0; i<count; i++) {
						var workstring = string;
						var strLength = workstring.length;
						var x = workstring.indexOf(';');
						var item = string.slice(0,x);
						item = item.replace(/^ +/gm, '');
						itemsarray.push(item);
					//console.log(itemsarray);
					workstring.split("");
					workstring = workstring.slice(x+1,strLength);
					string = workstring;
				}

				for(var j=0; j<itemsarray.length; j++){
					$http.post("php/insert.php",{'name':itemsarray[j], 'done':0, 'avaliable':0, 'row':$rootScope.userId, 'listnumber':$rootScope.currentListId})
					.success(function(data,status,headers,config){
						//console.log(data + "data inserted successfully");
						//console.log(data);
						//console.log($rootScope.userId);
						data.avaliable = (data.avaliable == 0) ? false : true;
						data.done = (data.done == 0) ? false : true;
						$scope.todoList.push(data);
					});
				}
				$scope.deal = '';
			}
		}
	}

	$scope.removeItem = function(index){
		var r = confirm("Are you sure you want to remove?");
		if (r == true) {
			$http.post("php/remove.php",{'id':$scope.todoList[index].id})
			.success(function(data,status,headers,config){
				//console.log(data + "data inserted successfully");
				$scope.todoList.splice(index,1);
			});
		}
	}

	$scope.removeAll = function(index){
		var r = confirm("Are you sure you want to remove ALL records? It will remove ALL your items!");
		if (r == true) {
			$http.post("php/removeall.php",{'row':$rootScope.userId})
			.success(function(data,status,headers,config){
				//console.log(data + "data inserted successfully");
				$scope.todoList.splice(0, $scope.todoList.length);
			});
		}
	}

	$scope.changeDone = function(index){
		var doneValue = $scope.todoList[index].done;
		doneValue = (doneValue == false) ? 0 : 1;
		$http.post("php/changedone.php",{'id':$scope.todoList[index].id, 'done':doneValue})
		.success(function(data,status,headers,config){
			doneValue = data.done;
		});
	}

	$scope.changeAvaliable = function(index){
		var avaliableValue = $scope.todoList[index].avaliable;
		avaliableValue = (avaliableValue == false) ? 0 : 1;
		$http.post("php/changeavaliable.php",{'id':$scope.todoList[index].id, 'avaliable':avaliableValue})
		.success(function(data,status,headers,config){
			avaliableValue = data.avaliable;
		});
	}

	$scope.editItem = function(event, index){
		document.getElementsByClassName("edit-block")[index].style.display = "block";
		document.getElementsByClassName("edit-input")[index].value = $scope.todoList[index].name;
		document.getElementsByClassName("todo-name")[index].style.display = "none";
	}

	$scope.saveItem = function(index){
		var input = document.getElementsByClassName("edit-input");
		//console.log($scope.todoList[index].id);
		$http.post("php/edit.php",{'id':$scope.todoList[index].id, 'name':input[index].value})
		.success(function(data,status,headers,config){
			$scope.todoList[index].name = data.name;
			document.getElementsByClassName("edit-block")[index].style.display = "none";
			document.getElementsByClassName("todo-name")[index].style.display = "block";
		});
	}
});