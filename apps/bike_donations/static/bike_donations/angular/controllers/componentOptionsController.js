angular.module('bikeSelect').controller('componentOptionsController', function($scope, $location, $window, componentOptionsFactory, scrollService, boolService){
	componentOptionsFactory.getAllComponents(function(response){
		$scope.which = [];
		for (var obj in response){
			$scope.which.push(obj)
			$scope[obj] = {};
			for (var key in response[obj]){
				$scope[obj][key] = response[obj][key]['status']
			}
		}
		console.log($scope['Handlebars'])
	});
	
	$scope.selected = {};

	$scope.$watch('selected.which',function(){
		console.log('change')
		$scope.selected.obj = $scope[$scope.selected.which];
	});
});