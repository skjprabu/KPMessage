'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 *
 * Main module of the application.
 */
angular
    .module('angularApp', [
        'ngRoute', 'ngIdle', 'ui.bootstrap', 'extendLog'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

    .config(['$httpProvider', function ($httpProvider) {
        //Http Interceptor to check auth failures for xhr requests
        $httpProvider.interceptors.push('authenticationHttpResponseInterceptor');
    }])
    .config(['KeepaliveProvider', 'IdleProvider', function (KeepaliveProvider, IdleProvider) {
        // ng-idle session timeout configuration
        IdleProvider.idle(5);
        IdleProvider.timeout(6);
        KeepaliveProvider.interval(10);
    }]);
