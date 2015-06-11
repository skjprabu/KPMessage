'use strict';

angular.module('myApp.accountRegistration', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/accountRegistration', {
    templateUrl: 'accountRegistration/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {

}]);