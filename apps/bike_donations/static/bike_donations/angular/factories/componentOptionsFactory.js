angular.module('bikeSelect').factory('componentOptionsFactory', function($http){

	factory = {};

	factory.getAllComponents = function(callback){
		$http.get('/componentForm').success(function(response){
			console.log(response)
			factory.data = response
			callback(response)
		});
	};

	factory.sendComponentToServer = function(info, callback){
		console.log(this.data)
		console.log(info)
		data = {
			'price': this.data[info.type][info.item]['price']
		}

		if (info.type == "Saddles"){
			data['saddle'] = info.item;
		}else if (info.type == 'Handlebars'){
			data['handlebar'] = info.item;
		}
		console.log(data)

		$http.post('/componentPost/', data).success(function(response){
			callback(response);
		});
	}

	return factory
});