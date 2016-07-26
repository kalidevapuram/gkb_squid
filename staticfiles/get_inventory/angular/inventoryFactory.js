angular.module('gkbInv').factory('inventoryFactory', function($http){
	var factory = {}
	var data;

	factory.getItem = function(sku, callback){
		if (sku){
			$http.get('items/'+sku).success(function(response){
				data = JSON.parse(response);
				callback(data.Item);
			});
		}
	}

	factory.deleteItem = function(id, callback){
		$http.post('items/delete', id).success(function(response){
			console.log(response);
		});
	}

	return factory
});