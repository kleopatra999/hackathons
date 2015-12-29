'use strict';

app.controller('browseController', function($http, $scope, $routeParams, Item, Comment) {
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

		$http.get('/offer/' + $routeParams.itemId).success(function(offers) {
			$scope.offers = offers
			console.log('offers for selecteditem=', offers)
		})
		Comment.findComments({
			itemId : $routeParams.itemId
		}, function(comments) {
			$scope.comments = comments;
			console.log('comments are -', $scope.comments)
		})

		// --- end Item.findItem
	} // ------end routeParams.itemId

});
