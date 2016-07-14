angular.module('bikeSelect').controller('componentOptionsController', function($scope, $location, $window, componentOptionsFactory, scrollService, boolService){
	$scope.which = [];
	componentOptionsFactory.getAllComponents(function(response){
		console.log('init response')
		console.log(response)
		for (var obj in response){
			$scope.which.push(obj)
			$scope[obj] = {};
			console.log(response)
			for (var key in response[obj]){
				console.log(key)
				$scope[obj][key] = response[obj][key]['status']
			}
		}
		console.log("we should have handlebars")
		console.log($scope['Handlebars'])
	});
	
	$scope.selected = {};

	$scope.$watch('selected.which',function(){
		console.log('change')

		$scope.selected.obj = $scope[$scope.selected.which];
	});

	$scope.postComponent = function(){
		info = {
			'type': $scope.selected.which,
			'item': $scope.selected.item
		}		

		componentOptionsFactory.sendComponentToServer(info, function(response){
			if (response.success){
				$window.location = "/print/"
			}
		});

	}
});