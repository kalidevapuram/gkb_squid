<<<<<<< HEAD
angular.module('bikeSelect').controller('bikeOptionsController', function($scope, $location, bikeOptionsFactory, scrollService, boolService){
	
	bikeOptionsFactory.selectionData(function(data){
		$scope.bikeType = bikeOptionsFactory.bikeType;
		console.log(data);
	});
	
=======

// angular.module('bikeSelect').controller('bikeOptionsController', function($scope, $location, bikeOptionsFactory, scrollService, boolService){
// 	bikeOptionsFactory.selectionData(function(data){
// 		$scope.bikeType = bikeOptionsFactory.bikeType;
// 		console.log(data);
// 	});

angular.module('bikeSelect').controller('bikeOptionsController', function($scope, $location, $window, bikeOptionsFactory, scrollService, boolService){
	$scope.bikeType = {};

	$scope.goBack = function(){
		$window.location = "/";
	}

	var test = bikeOptionsFactory.selectionData();

>>>>>>> 98c46aa92ebef70695d2cc0e5d9c08e2423b8158
	$scope.$watch(function() {
		return boolService.returnSelect('bike');
	}, function(newValue, oldValue) {
		$scope.bikeOption = newValue;
	});

	$scope.$watch(function() {
		return boolService.returnSelect('product');
	}, function(newValue, oldValue) {
		$scope.productOption = newValue.status;
	}, true);

	// $scope.getBike = function(){
	// 	console.log("inside getbike method");
	// 	bikeOptionsFactory.getBike();
	// }

	bikeOptionsFactory.assembleScope("bikeType", function(optObject){
		for (var opt in optObject){
			$scope.bikeType[opt] = optObject[opt].status
		};
	});


	function optionClicked(type, select, prep){
		var selectArr = ["wheels", "brand", "cosmetic", "frame", "features"];
		if (select){

			if (type == "bikeType"){
				var selectionBool;

				for (var idx = 0; idx < selectArr.length; idx++){
					selectionBool = selectArr[idx]
					if ($scope.selected[selectionBool]){
						$scope.selected[selectionBool] = "";
					};
				};
			}

			$scope[type][select] = true;

			if (type != "features"){
				for (var opt in $scope[type]){
					if (opt != select){
						$scope[type][opt] = false;
					}
				}
			}

			bikeOptionsFactory.valueSelect(type, select);

			if(prep){
				bikeOptionsFactory.assembleScope(prep, function(optObject){
					$scope[prep] = {};

					for (var opt in optObject){

						if (optObject == 'frame'){
							print("what?")
						}
						$scope[optObject[opt]] = {};

						var requiredArr = optObject[opt].requisites
						var mustHave;
						for (index = 0; index < requiredArr.length; index++){
							mustHave = requiredArr[index];
							if ($scope.bikeType[mustHave]){
								break;
							}
						}

						if (index != requiredArr.length){
							$scope[prep][opt] = optObject[opt].status;
						}
					};
				});

				console.log(Object.keys($scope[prep]).length);
				if (Object.keys($scope[prep]).length == 0){
					console.log("what?")
					$scope[prep] = null;

					for (var pIndex = 0; pIndex< selectArr.length; pIndex++){
						if (selectArr[index] == prep){
							break;
						}
					}

					if (pIndex < prep.length - 1)
						optionClicked('type','select',selectArr[index+1])

				};

				var change = function(){
					scrollService.scrollTo(prep);
				}

				setTimeout(change, 20)
			}
		};
	}

	$scope.selected = {};

	$scope.$watch('selected.type',function(){
		console.log('CHANGE')
		optionClicked("bikeType",$scope.selected.type, "wheels")
	});

	$scope.$watch('selected.wheels',function(){
		optionClicked("wheels",$scope.selected.wheels, "brand")
	});

	$scope.$watch('selected.brand',function(){
		optionClicked("brand",$scope.selected.brand, "cosmetic")
	});

	$scope.$watch('selected.cosmetic',function(){
		optionClicked("cosmetic",$scope.selected.cosmetic, "frame")
	});

	$scope.$watch('selected.frame',function(){
		optionClicked("frame",$scope.selected['frame'], "features")
	});

	$scope.checkbox = function(item){
		bikeOptionsFactory.valueSelect("features", item);
	};

	$scope.getBike = function(){

		// event.preventDefault();
		bikeOptionsFactory.assembleBike(function(bike){
			$scope.bike_info = bike;
			console.log($scope.bike_info)
			console.log("bike returned", bike);
			bikeOptionsFactory.postBike(bike)
		});
		// $location.path('/confirm');
	};

	$scope.confirm = function(){
		console.log("going to confirm");
		bikeOptionsFactory.assembleBike(function(bike){
			$scope.assembled_bike=bike;
		});
		$scope.checkBike = true;
	}




});
