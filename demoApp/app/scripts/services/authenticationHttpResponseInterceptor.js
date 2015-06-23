'use strict';


angular.module('angularApp')
    .factory('authenticationHttpResponseInterceptor', ['$q', '$location', function ($q, $location) {
        return {
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    $location.path('/login').search('returnTo', $location.path());
                }
                return $q.reject(rejection);
            }
        }
    }]);