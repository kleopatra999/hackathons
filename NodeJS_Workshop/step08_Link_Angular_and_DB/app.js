var app = angular.module('aOne', [])

.controller('browseController', function($http, $scope) {

	$http.get('/item').success(function(response, err) {

		console.log('response looks like-', response)
		$scope.items = response
	})
});
