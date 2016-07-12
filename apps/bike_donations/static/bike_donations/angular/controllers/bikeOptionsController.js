angular.module('bikeSelect').controller('bikeOptionsController', function($scope, $location, $window, bikeOptionsFactory, scrollService, boolService){
	$scope.bikeType = {};

	bikeOptionsFactory.selectionData(function(data){
		$scope.bikeType = data;
	});


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

				function determineNext(objectInQuestion){
					console.log(objectInQuestion)
					if (Object.keys(objectInQuestion).length == 0){
						var next = typeArr.indexOf('prep')
						if (next != typeArr.length - 1){
							bikeOptionsFactory.assembleScope(typeArr[next + 1], detimineNext)
						}
					}else{
						$scope[prep] = objectInQuestion
					}
				}

				bikeOptionsFactory.assembleScope(prep, function(optObject){
					console.log(optObject)
					determineNext(optObject)
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
		optionClicked("frame",$scope.selected['frame'], "features")
	});

	$scope.checkbox = function(item){
		bikeOptionsFactory.valueSelect("features", item);
	};

	$scope.getBike = function(){

		event.preventDefault();
		bikeOptionsFactory.assembleBike(function(bike){
			$scope.bike_info = bike;
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
