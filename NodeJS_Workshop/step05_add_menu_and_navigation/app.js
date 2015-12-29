'use strict'

var app = angular.module('aOne', [ 'ngRoute' ])

app.controller('browseController', function($http, $scope) {

	var itemStatus = $http.get('/item').then(function(response, err) {

		if (err) {
			console.log('error is', err)
		}
		console.log('data returned', response)
		$scope.items = response.data
	})

	console.log('returned', itemStatus)

});

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : './browse.html',
		controller : 'browseController'
	})

})
