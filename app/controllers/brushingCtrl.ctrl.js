"use strict";


app.controller('brushingCtrl', function ($scope, $location, $rootScope, $routeParams, firebaseURL, authFactory, addChildFactory, brushingDataFactory) {

    /********************************************
    **               SELECTED USER             **
    ********************************************/
    $rootScope.alreadyBrushedForThisTime = false;

    $scope.submitBrushingCompleteData = () => {
        let brushTime = new Date();
        brushingDataFactory.runBrushingDataCheckThenSubmitNewIfCool($routeParams.subuid, brushTime);
    };
});