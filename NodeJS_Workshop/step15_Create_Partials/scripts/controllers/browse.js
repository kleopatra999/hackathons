'use strict';

app.controller('browseController', function($http, $scope, $routeParams, Item, Items, getItems, Auth, User, Comment) {
	$scope.searchItem = ''
	/* get User info from auth (User) service */
	var user = User.getCurrentUser()
	$scope.uid = user.uid
	$scope.currentUser = user.name
	$scope.gravatar = user.gravatar
	$scope.signedIn = user.signedIn
	/* Replace $http call with this array call from getItems service */

	$scope.items = getItems.all;
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
