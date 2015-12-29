'use strict';

app.controller('browseController', function($http, $scope, $routeParams, Item,Items, getItems,Auth,User, Comment) {
	$scope.searchItem = ''
   /* get User info from auth (User) service */
    var user = User.getCurrentUser()
    $scope.uid = user.uid
    $scope.currentUser = user.name
    $scope.gravatar = user.gravatar
    $scope.signedIn = user.signedIn
/* This step: Replaced $http call with this array call from getItems service */

    $scope.items = getItems.all;
    $scope.listMode = true;
    if ($routeParams.itemId) {
        $scope.listMode = false;
        Item.findItem({itemId: $routeParams.itemId}, function(item) {
            	console.log('findItem returned----', item)
            	//getItems.setSelectedItem(item)
            	$scope.selectedItem = item;

              /* added these 2 $scope models -------- */ 
                $scope.isItemPoster = (item.ITEM_POSTED_BY == $scope.uid)
                
                $scope.isAvailable = (item.ITEM_STATUS == 'available')
              /*----------------*/  
               
                console.log('Signed in=',$scope.signedIn)
            	 console.log('selecteditem is', $scope.selectedItem)
                    })

            $http.get('/offer/' + $routeParams.itemId).success(function(offers) {
                    $scope.offers = offers
                    console.log('offers for selecteditem=',offers)
                        })
             Comment.findComments({
                        itemId: $routeParams.itemId
                    }, function(comments) {
                        $scope.comments = comments;
                        console.log('comments are -', $scope.comments)
                    })
           

            
        //--- end Item.findItem
    } //------end routeParams.itemId

/* added here since this is part of the browse view and the browseController is in effect 

Note that even though item status changes to cancelled, Admin button does not go away. Needs fix */

$scope.cancelItem = function(item) {
        item.ITEM_STATUS = 'cancelled'
        var url = '/item/' + item.ITEM_ID
        var payload = {
            p1: item.ITEM_TITLE,
            p2: item.ITEM_DESC,
            p3: item.ITEM_BOUGHT_BY,
            p4: item.ITEM_PRICE,
            p5: 'cancelled'
        }
        getItems.updateItemArray(item)
        getItems.editItem(url, payload).success(function(status) {

            toaster.pop('success', "Item is updated.");
            $location.path('/browse/' + item.ITEM_ID)
        })
    }
   

   


 

});
