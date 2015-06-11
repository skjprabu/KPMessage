angular.module('myApp.registration', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/registration', {
            templateUrl: 'accountRegistration/registration/personalInfo.html',
            controller: 'PersonalInfoCtrl'
        });
    }])

    .controller('PersonalInfoCtrl', [function() {

    }]);