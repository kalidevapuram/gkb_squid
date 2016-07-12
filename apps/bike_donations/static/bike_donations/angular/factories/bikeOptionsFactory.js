angular.module('bikeSelect').factory('bikeOptionsFactory', function($http){
		var factory = {};
		var assembled_bike = {};

		factory.selectionData = function(){
			$http.get('/form').success(function(response){
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

		factory.bikeType = {
			"kids": {
				"status": false,
				"price_factor": 0.3
			},
			"hybrid": {
				"status": false,
				"price_factor": 1
			},
			"cruiser": {
				"status": false,
				"price_factor": 0.5
			},
			"city": {
				"status": false,
				"price_factor": 0.8
			},
			"road": {
				"status": false,
				"price_factor": 0.9
			},
			"mountain": {
				"status": false,
				"price_factor": 1
			}
		};

		factory.wheels = {
			"base":{
				"status":false,
				"price_factor":1.0,
				"requisite":["kids", "road", "city", "cruiser", "hybrid", "mountain"]
			},
			"roller":{
				"status":false,
				"price_factor":1.1,
				"requisite": ["road", "city", "cruiser", "hybrid", "mountain"]
			}
		};

		factory.brand = {
			"Trek":{
				"status":false,
				"price_factor": 1.2,
				"requisite": ["road", "hybrid", "kids", "mountain"]
			},
			"Diamond":{
				"status":false,
				"price_factor":1.5,
				"requisite": ["cruiser", "road", "city", "hybrid"]
			},
		};

		factory.cosmetic = {
			"perfect":{
				"status":false,
				"price_factor":1.3,
				"requisite":["kids", "road", "city", "cruiser", "hybrid", "mountain"]

			},
			"good":{
				"status":false,
				"price_factor": 1.15,
				"requisite":["kids", "road", "city", "cruiser", "hybrid", "mountain"]

			},
			"average":{
				"status":false,
				"price_factor":1.0,
				"requisite":["kids", "road", "city", "cruiser", "hybrid", "mountain"]

			},
			"poor":{
				"status":false,
				"price_factor":1.0,
				"requisite":["kids", "road", "city", "cruiser", "hybrid", "mountain"]

			},
		};

		factory.frame = {
			"all":{
				"status": false,
				"price_factor": 1.0,
				"requisite":["kids", "road", "city", "cruiser", "hybrid", "mountain"]

			},
			"speed":{
				"status": false,
				"price_factor": 1.25,
				"requisite":["road", "city", "cruiser", "hybrid"]
			},
			"super":{
				"status": false,
				"price_factor": 1.9,
				"requisite":["road", "city", "cruiser"],
			},
			"rugged":{
				"status": false,
				"price_factor": 1.9,
				"requisite":["road", "city", "cruiser"]
			}
		};

		factory.features = {
			"Multi Speed":{
				"status": false,
				"price_factor":1.31,
				"requisite":["kids", "road", "city", "cruiser", "hybrid", "mountain"]
			},
			"Front Shock":{
				"status": false,
				"price_factor":1.23,
				"requisite":["kids", "road", "city", "cruiser", "hybrid", "mountain"]
			},
			"Bell":{
				"status":false,
				"price_factor":9.95,
				"requisite":["kids", "road", "city", "cruiser", "hybrid", "mountain"]
			}
		};

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
