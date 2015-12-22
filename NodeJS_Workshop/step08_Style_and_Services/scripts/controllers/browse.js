'use strict';

app.controller('browseController', function($http, $scope, $routeParams, Item) {
	$scope.searchItem = ''

	var itemStatus = $http.get('/item').then(function(response, err) {

		if (err) {
			console.log('error is', err)
		}
		console.log('data returned', response)
		$scope.items = response.data
	})

	console.log('returned', itemStatus)

	$scope.listMode = true;
	if ($routeParams.itemId) {
		$scope.listMode = false;
		Item.findItem({
			itemId : $routeParams.itemId
		}, function(item) {
			console.log('findItem returned----', item)
			// getItems.setSelectedItem(item)
			$scope.selectedItem = item;
			console.log('selecteditem is', $scope.selectedItem)
		})

		// --- end Item.findItem
	} // ------end routeParams.itemId

});
