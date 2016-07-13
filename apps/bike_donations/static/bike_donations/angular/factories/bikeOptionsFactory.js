angular.module('bikeSelect').factory('bikeOptionsFactory', function($http){
		var factory = {};
		factory.data = {};
		var assembled_bike = {};

		factory.selectionData = function(callback){
			$http.get('/form').success(function(response){
				factory.data = response
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
			console.log('we are in assemble scope')
			var forScope = {};

			for (var opt in this['data'][select]){
				console.log(opt)

				var requiredArr = this.data[select][opt]['requisites']
				console.log(requiredArr.length)
				var mustHave;

				for (var wIndex = 0; wIndex < requiredArr.length; wIndex++){
					mustHave = requiredArr[wIndex];
					console.log(requiredArr)
					console.log(mustHave)
					console.log("we are testing " + requiredArr[wIndex])
					console.log(this.data.bikeType)
					if (this.data.bikeType[mustHave]['status'] == true){
						console.log('found truth');
						break;
					}
				};

				console.log("our " + wIndex.toString() +" should equal " + wIndex)
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
			console.log('we are in value select')
			console.log(this['data'])
			if (select != "features"){
				this.data[select][option]["status"] = true;
			}

			for (var selection in this[select]){
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
				console.log(sType)
				for (var opt in sType){
					if (this['data'][opt].status == true){
						if (sType != "features"){
							bikeFinal[sType] = opt
						}else{
							bikeFinal.features.push(opt)
						}
						bikeFinal.price *= sType[opt].price_factor;
					};
				}
			}

			callback(bikeFinal)
		}


		return factory
	});
