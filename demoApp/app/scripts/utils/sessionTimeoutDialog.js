// Starts the ng-idle plugin
function startTimeoutModalPlugin($scope, Idle) {
    closeModals($scope);
    Idle.watch();
}

// Closes the timeout modal windows.
function closeModals($scope) {
    if ($scope.warning) {
        $scope.warning.close();
        $scope.warning = null;
    }

    if ($scope.timedout) {
        $scope.timedout.close();
        $scope.timedout = null;
    }
}

/*
 * Displays a modal dialog to warn the user that the session is
 * about to expire because he/she has been idle.
 */

function openWarningTimeoutModal($scope, $modal) {
    closeModals($scope);

    $scope.warning = $modal.open({
        templateUrl: 'views/timeout-warning-dialog.html',
        windowClass: 'modal-danger'
    });
}

/*
 * Displays a modal dialog to want the user that the sessions
 * has been expired.
 */
function openTimeoutModal($scope, $modal) {
    closeModals($scope);
    $scope.timedout = $modal.open({
        templateUrl: 'views/timedout-dialog.html',
        windowClass: 'modal-danger'
    });
}

