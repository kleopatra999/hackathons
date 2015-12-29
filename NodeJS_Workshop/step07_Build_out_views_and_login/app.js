'use strict';

var app = angular.module('aOne', [ 'ngAnimate', 'ngResource', 'ngRoute', 'angularMoment', 'toaster' ])

.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/browse.html',
		controller : 'browseController'
	}).when('/browse/:itemId', {
		templateUrl : 'views/browse.html',
		controller : 'browseController'
	}).when('/register', {
		templateUrl : 'views/register.html',
		controller : 'AuthController'
	}).when('/login', {
		templateUrl : 'views/login.html',
		controller : 'AuthController'
	})
	.otherwise({
		redirectTo : '/'
	});
});
