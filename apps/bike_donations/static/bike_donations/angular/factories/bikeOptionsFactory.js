angular.module('bikeSelect').factory('bikeOptionsFactory', function($http){
		var factory = {};
		var assembled_bike = {};

		factory.selectionData = function(){
			$http.get('/form').success(function(response){
				factory.bikeType = response.bikeType
				factory.wheels = response.wheels
				factory.brand = response.brand
				factory.cosmetic = {};
				console.log
				factory['frame'] = response['frame']
				factory.features = response.features

				var leveled = false;
				var i = 0;
				var cArr = ["Perfect", "Good", "Average", "Poor"]
				console.log(factory['frame'])
				while(!leveled){
					for (var level in response.cosmetic){
						if (level == cArr[i]){
							factory.cosmetic[level] = response.cosmetic[level]
							i++;
						}
					}
					if (i == cArr.length){
						leveled = true;
					}
				}

				callback(response);
			});
		}

		factory.assembleScope = function(select, callback){
				for (var opt in optObject){

					if (optObject == 'frame'){
						print("what?")
					}

					var requiredArr = optObject[opt].requisites
						var mustHave;
					for (index = 0; index < requiredArr.length; index++){
						mustHave = requiredArr[index];
							if (this.bikeType[mustHave]){
							break;
						}
					}
				console.log(response);
			});
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
				this[select][option]["status"] = true;
			}

			console.log(this[select][option]);


			for (var selection in this[select]){
				if (select != "features"){
					if (selection != option){
						this[select][selection]["status"] = false;
					}
				}else if (selection == option){
					if (this[select][selection]["status"]== false){
						this[select][selection]["status"] = true;
					}else{
						this[select][selection]["status"] = false;
					}
				}
			}
		};

		factory.assembleBike = function(callback){
			console.log("Hewwo");
			var typeArr = ["bikeType", "wheels", "brand", "cosmetic", "frame", "features"];
			var sType;
			var bikeFinal = {
				"price": 200,
				"features":[]
			};

			for (var index = 0; index < typeArr.length; index++){
				sType = this[typeArr[index]];
				console.log(sType)
				for (var opt in sType){
					if (sType[opt].status == true){
						if (typeArr[index] != "features"){
							bikeFinal[typeArr[index]] = opt
						}else{
							bikeFinal.features.push(opt)
						}
						bikeFinal.price *= sType[opt].price_factor;
					};
				}
			}

			// assembled_bike = bikeFinal;

			callback(bikeFinal);
		}

		factory.create_category = function(){
			console.log("FACTORY NAME")
			$http.post("/create_category/").success(function(response){
				console.log("Factory response", response.text);
			})
		}


		return factory
	});
