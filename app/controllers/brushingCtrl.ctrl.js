"use strict";


app.controller('brushingCtrl', function ($scope, $location, $rootScope, $routeParams, firebaseURL, authFactory, addChildFactory, brushingDataFactory) {

    /********************************************
    **               SELECTED USER             **
    ********************************************/
    $rootScope.alreadyBrushedForThisTime = false;

    $scope.submitBrushingCompleteData = () => {
        let brushTime = new Date();
        var promise = brushingDataFactory.checkForExistingDataInTimeslot($routeParams.subuid, brushTime);
        promise.then(function() {
            brushingDataFactory.excuteBrushingSubmit($routeParams.subuid, brushTime).then(function() {
                brushingDataFactory.returnAllBrushingDataForChild().then((returnBrushingData)=>{
                    $location.path("/brushingchart/" + $rootScope.selectedChild.subuid);
                });
            }, function() {
                $rootScope.alreadyBrushedForThisTime = true;
                    brushingDataFactory.returnAllBrushingDataForChild().then((returnBrushingData)=>{
                        $location.path("/brushingchart/" + $rootScope.selectedChild.subuid);
                    });
            });
        });
    };
});