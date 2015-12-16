/*---------modified for TMO--------*/

'use strict';

app.factory('Item', function($resource) {

	console.log('Item factory loaded')
	return $resource('/item/:itemId', {}, {
		'findItem' : {
			method : 'GET'
		},
		'deleteItem' : {
			method : 'DELETE',
			params : {
				itemId : '@id'
			}
		},
		'updateItem' : {
			method : 'PUT',
			params : {
				itemId : '@id'
			}
		}

	});

});

app.factory('Items', function($resource) {
	console.log('Items factory loaded')

	return $resource('/item', {}, {
		'getAllItems' : {
			method : 'GET',
			isArray : true
		},
		'newItem' : {
			method : 'POST'
		}

	})

});

app.factory('getItems', function(Items, $http) {

	var items = Items.getAllItems();
	var selectedItem = {};

	var getItems = {
		all : items
	}
	return getItems;

});
