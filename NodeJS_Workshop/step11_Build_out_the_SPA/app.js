var app = angular
  .module('aOne', [ 'ngRoute', 'angularMoment', 'ngResource'])
  

app.config(function ($routeProvider) {
    $routeProvider      
      .when('/', {
        templateUrl: './browse.html',
        controller: 'browseController'     
      })
      .when('/browse/:itemId', {
        templateUrl: './browse.html',
        controller: 'browseController'     
      })
	


})




