angular.module('bikeSelect', ['ngCookies','ngRoute'])
	.config(function($interpolateProvider, $httpProvider, $routeProvider) {


		$routeProvider
			.when('/addBike', {
				controller: 'bikeSelect',
				templateUrl: 'static/bike_donations/angular/partials/addBikePage.html'
			});

			.when('/confirm', {
	    		confirmontroller: 'confirmationController',
	      		templateUrl: 'static/bike_donations/angular/partials/confirm.html'
	    	});

	    $locationProvider.html5Mode(true);

		$interpolateProvider.startSymbol('[[').endSymbol(']]');
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});
