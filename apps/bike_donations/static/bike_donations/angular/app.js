angular.module('bikeSelect', ['ngCookies'])
	.config(function($interpolateProvider, $httpProvider) {
		$interpolateProvider.startSymbol('[[').endSymbol(']]');
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	});