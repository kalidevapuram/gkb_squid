angular.module('bikeSelect').factory('componentOptionsFactory', function($http){

	factory = {};

	factory.getAllComponents = function(callback){
		$http.get('/componentForm').success(function(response){
			console.log(response)
			callback(response)
		});
	};

	return factory
});