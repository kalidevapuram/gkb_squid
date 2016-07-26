angular.module('bikeSelect').factory('bikeOptionsFactory', function($http, $window){
		var factory = {};
		factory.data = {};
		var assembled_bike = {};

		factory.selectionData = function(callback){
			$http.get('/form').success(function(response){
				factory.data = {};

                for(var object in response){
                	if (object != 'cosmetics') {
                    	factory.data[object] = factory.letterBy(response[object])
                    } else {
                    	factory.data[object] = response[object];
                    }
                }
				var cos = {};
				var leveled = false;
				var i = 0;
				var cArr = ["Perfect", "Good", "Average", "Poor"]
				while(i < cArr.length){
					for (var level in response.cosmetic){
						if (level == cArr[i]){
							cos[level] = response.cosmetic[level]
							i++;
						}
					}
				}
				factory.data.cosmetic = cos
				callback(factory.data.bikeType)
			});
		}

		factory.clearHouse = function(){
			for (var obj in this['data']){
				if (obj != 'bikeType'){
					for (var item in this['data'][obj]){
						this['data'][obj][item]['status'] = false
					}
				}
			}
		}
		factory.letterBy = function(passObject){
		    var letteredArr = Object.keys(passObject);

		    for (var iOne = 0; iOne < letteredArr.length - 1; iOne++){
		        var min = iOne;
		        for (var iTwo = iOne+1; iTwo < letteredArr.length; iTwo++){
		            if (letteredArr[iTwo]<letteredArr[min]){
		                min = iTwo;
		            }
		        };

		        var temp = letteredArr[iOne];
		        letteredArr[iOne] = letteredArr[min];
		        letteredArr[min] = temp;
		    }

		    var finalObj = {};
		    for (var x = 0; x < letteredArr.length; x++){
		        var key = letteredArr[x]
		        finalObj[key] = passObject[key]
		    };

		    return finalObj
		}

		factory.assembleScope = function(select){
			var forScope = {};

			for (var opt in this['data'][select]){

				var requiredArr = this.data[select][opt]['requisites']
				var mustHave;

				for (var wIndex = 0; wIndex < requiredArr.length; wIndex++){
					mustHave = requiredArr[wIndex];

					if (this.data.bikeType[mustHave]['status'] == true){

						break;
					}
				};


				if (wIndex != requiredArr.length){
					forScope[opt] = false;
				}else{
					console.log("WE FINALLY FAIL PRINT");
				}
			};

			return forScope;
		}

		factory.getBike = function(){
			$http.post('/confirmation/', {status: true}).success(function(){
				// console.log();
			});
		}

		factory.postBike = function(bikeObject){
			$http.post('/samplePost/',bikeObject).success(function(response){
				if (response.success == true) {
					$window.location = "/print/"
				}
			});
		}


		factory.valueSelect = function(select, option){
			console.log('we are in value select')
			console.log(this['data'])
			if (select != "features"){
				this.data[select][option]["status"] = true;
			}

			for (var selection in this.data[select]){
				if (select != "features"){
					if (selection != option){
						this.data[select][selection]["status"] = false;
					}
				}else if (selection == option){
					if (this.data[select][selection]["status"]== false){
						this.data[select][selection]["status"] = true;
					}else{
						this.data[select][selection]["status"] = false;
					}
				}
			}
		};

		factory.assembleBike = function(callback){
			var bikeFinal = {
				"price": 200,
				"features":[]
			};

			for (var sType in this['data']){
				var tempType = this['data'][sType]
				for (var opt in tempType){
					if (tempType[opt].status == true){
						if (sType != "features"){
							bikeFinal[sType] = opt
						}else{
							bikeFinal.features.push(opt)
						}
						bikeFinal.price *= tempType[opt].price_factor;
					};
				}
			}
			callback(bikeFinal)
		}


		return factory
	});
