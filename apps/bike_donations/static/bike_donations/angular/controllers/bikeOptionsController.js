angular.module('bikeSelect').controller('bikeOptionsController', function($scope, $location, bikeOptionsFactory, scrollService, boolService){
	$scope.bikeType = {};
	var test = bikeOptionsFactory.selectionData();

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

	bikeOptionsFactory.assembleScope("bikeType", function(optObject){
		for (var opt in optObject){
			$scope.bikeType[opt] = optObject[opt].status
		};
	});

	function optionClicked(type, select, prep){
		if (select){

			if (type == "bikeType"){
				var selectionBool;
				var selectArr = ["wheels", "brand", "cosmetic", "frame", "features"];

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

						$scope[optObject[opt]] = {};

						var requiredArr = optObject[opt].requisite
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
		optionClicked("frame",$scope.selected.frame, "features")
	});

	$scope.checkbox = function(item){
		bikeOptionsFactory.valueSelect("features", item);
	};

	$scope.getBike = function(){
		event.preventDefault();
		var bike = bikeOptionsFactory.assembleBike();
		bikeOptionsFactory.postBike(bike)
	};



});
