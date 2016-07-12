angular.module('bikeSelect', ['ngCookies','ngRoute'])
	.config(function($interpolateProvider, $httpProvider, $routeProvider) {

		$routeProvider.when('/confirm', {
	     controller: 'bikeOptionsController',
	     templateUrl: 'static/bike_donations/angular/partials/confirm.html' 
	   });

		$interpolateProvider.startSymbol('[[').endSymbol(']]');
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

     
	
	});