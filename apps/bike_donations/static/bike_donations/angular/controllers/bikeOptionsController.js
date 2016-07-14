angular.module('bikeSelect').controller('bikeOptionsController', function($scope, $location, $window, bikeOptionsFactory, scrollService, boolService){
	$scope.bikeType = {};

	bikeOptionsFactory.selectionData(function(data){
		for (var key in data){
			$scope.bikeType[key] = data[key]['status']
		}
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
		var selectArr = ["wheels","brand", "cosmetic", "frame", "features"];
		if (select && select != 'placed'){

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

				var pIndex = selectArr.indexOf(prep)
				while(pIndex < selectArr.length){
					var nObject = bikeOptionsFactory.assembleScope(selectArr[pIndex])

					if (Object.keys(nObject).length != 0){
						console.log("THIS SHOuLD BE PRINTING")
						$scope[selectArr[pIndex]] = nObject;
						break;
					}else{
						$scope.selected[selectArr[pIndex]] = "placed"
					}

					pIndex++
				}

				var change = function(){
					scrollService.scrollTo(selectArr[pIndex]);
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
			bikeOptionsFactory.postBike(bike)
		});
		
	};

	$scope.goBack = function(){
		$location.path('/')
	}

	$scope.confirm = function(){
		console.log("going to confirm");
		bikeOptionsFactory.assembleBike(function(bike){
			$scope.assembled_bike=bike;
		});
		$scope.checkBike = true;
	}

});
