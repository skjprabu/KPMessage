'use strict';

angular.module('myApp.messages', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/messages', {
    templateUrl: 'messages/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {

}]);