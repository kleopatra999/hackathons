/*---------modified for TMO--------*/

'use strict';

app.factory('Item', function($resource) {

	console.log('Item factory loaded')
return $resource('/item/:itemId', {},
    {
        'findItem': {method: 'GET'},
        'deleteItem': {method: 'DELETE',params: {itemId: '@id'}},
        'updateItem': { method:'PUT',params: {itemId: '@id'} }
        
    });

});
