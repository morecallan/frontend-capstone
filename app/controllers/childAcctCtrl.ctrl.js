"use strict";


app.controller('childAcctCtrl', function ($scope, $location, $rootScope, firebaseURL, authFactory, addChildFactory) {

    /********************************************
    **      VARIABLES FOR USERS - SUBUSERS     **
    ********************************************/
    let ref = new Firebase(firebaseURL);

    console.log("selectedChild",$rootScope.selectedChild);

});