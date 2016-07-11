angular.module('bikeSelect').factory('bikeOptionsFactory', function($http){
		var factory = {};

		factory.selectionData = function(callback){
			$http.get('/form').success(function(response){
				factory.bikeType = response.bikeType
				factory.wheels = response.wheels
				factory.brand = response.brand
				factory.cosmetic = response.cosmetic
				factory.frame = response.frame
				factory.features = response.features
				callback(response);
			});
		}

		factory.assembleScope = function(select, callback){
			callback(this[select])
		};

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

		factory.assembleBike = function(){
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

			return bikeFinal;
		}


		return factory
	});