"use strict";


app.controller('navCtrl', function ($scope, $location, $rootScope, firebaseURL, authFactory, addChildFactory) {

    /********************************************
    **      VARIABLES FOR USERS - SUBUSERS     **
    ********************************************/
    $rootScope.navImg = "./img/avatar/av1.png";
    $rootScope.selectedChild = {};


    $scope.$watch(() => {
        if ($rootScope.selectedChild !== null) {
            if (Object.getOwnPropertyNames($rootScope.selectedChild).length === 0) {
                $rootScope.navImg = "./img/avatar/av1.png";
            } else {
                $rootScope.navImg = $rootScope.selectedChild.avatar;
            }
        }
    });
    

});