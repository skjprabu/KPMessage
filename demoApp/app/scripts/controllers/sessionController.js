'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:SessionController
 * @description
 *
 * Controller that handles the login, logout and session timeout.
 *
 */
angular.module('angularApp')
    .controller('SessionController', ['$scope', '$http', '$log', '$modal', 'Idle', function ($scope, $http, $log, $modal, Idle, Keepalive) {
        var logger = $log.getInstance('SessionController');

        var timeoutFunction;

        $scope.login = function () {
            logger.info("Entering login");
            $http.get('/login').success(function (data) {
                startTimeoutModalPlugin($scope, Idle);
            });
        };

        $scope.logout = function () {
            logger.info("Entering logout");
            $http.get('/logout').success(function (data) {

            });
        };


        // ng-idle plugin configuration

        /*
         * 1. This method is executed when the user has been idle for the
         * amount of time defined in the plugin configuration
         */
        $scope.$on('IdleStart', function () {
            openWarningTimeoutModal($scope, $modal);
        });

        /*
         * 2. This method is executed when the timeout is reached
         */
        $scope.$on('IdleTimeout', function () {
            openTimeoutModal($scope, $modal);
            $scope.logout();
            timeoutFunction();
        });


        /*
         * 3. This method is executed after the plugin execution is completed
         */
        $scope.$on('IdleEnd', function () {
            closeModals($scope, $modal);
        });
    }]);
