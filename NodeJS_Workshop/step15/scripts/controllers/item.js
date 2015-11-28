'use strict';

app.controller('itemController', function($scope, $location, toaster, Item, Items, getItems, Auth) {

    $scope.$on('userEvent', function(_, user) {
        $scope.currentUID = user.uid
    });

    $scope.createItem = function(item) {
        var newItem = {
            p1: item.title,
            p2: item.desc,
            p3: $scope.currentUID,
            p4: 'available',
            p5: item.price
        }
        var data = getItems.createItem(newItem)
        toaster.pop('success', 'Item created successfully.')
        $scope.newitem = ''
        $location.path('/browse')

    };


   

    //NOTE: $scope.cancelItem is part of browseController and is in browse.js


});
