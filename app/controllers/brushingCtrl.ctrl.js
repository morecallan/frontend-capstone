"use strict";


app.controller('brushingCtrl', function ($scope, $location, $rootScope, $routeParams, firebaseURL, authFactory, addChildFactory, brushingDataFactory) {

    /********************************************
    **               SELECTED USER             **
    ********************************************/
    

    $scope.submitBrushingCompleteData = () => {
        let brushTime = new Date();
        brushingDataFactory.submitBrushingCompleteData($routeParams.subuid, brushTime).then(() => {
            brushingDataFactory.returnAllBrushingDataForChild().then((returnBrushingData)=>{
                $location.path("/brushingchart/" + $rootScope.selectedChild.subuid);
            });
        });
    };

});