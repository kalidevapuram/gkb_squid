angular.module('bikeSelect').factory('bikeOptionsFactory', function($http){
		var factory = {};
		factory.data = {};
		var assembled_bike = {};

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

			console.log(letteredArr)
			var finalObj = {};
			for (var x = 0; x < letteredArr.length; x++){
				var key = letteredArr[x]
				finalObj[key] = passObject[key]
			};

			return finalObj
		}

		factory.selectionData = function(callback){
			$http.get('/form').success(function(response){
				factory.data = {};

				for(var object in response){
					factory.data[object] = factory.letterBy(response[object])
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
				console.log(factory.data)
				callback(factory.data.bikeType)
			});
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
			console.log("in factory to getbike");
			$http.post('/confirmation/', {status: true}).success(function(){
				// console.log();
			});
		}

		factory.postBike = function(bikeObject){
			console.log("hiya")
			console.log("passed object", bikeObject)
			$http.post('/samplePost/',bikeObject).success(function(response){
				console.log('what?', response)
			});
		}


		factory.valueSelect = function(select, option){
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
			console.log(bikeFinal)
			callback(bikeFinal)
		}


		return factory
	});
