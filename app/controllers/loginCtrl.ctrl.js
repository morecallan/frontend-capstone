"use strict";


app.controller('loginCtrl', function ($scope, $location, $rootScope, firebaseURL, authFactory) {

    /********************************************
    **           For Parent Login/Reg          **
    ********************************************/
    let ref = new Firebase(firebaseURL);

    $scope.userError = false;


    $scope.closeModal = () => {
        $scope.userError = false;
    };


    if($location.path() === "/login"){
        $rootScope.modeLogin = true;
    }

    if($location.path() === "/register"){
        $rootScope.modeLogin = false;
    }


    $rootScope.account = {
        email: "",
        password: ""
    };

    if($location.path() === "/logout"){
        ref.unauth();
        $rootScope.isActive = false;
    }


    $scope.register = (authFactory) => {
        ref.createUser({
            email: $rootScope.account.email,
            password: $rootScope.account.password
        }, (error, userData) => {
            if (error) {
                $scope.errorMessage = error.message;
                $scope.userError = true;
                $scope.$apply();
            } else if (userData) {
                $scope.login();
            }
        });
    };

    $scope.login = () => {
        authFactory
        .authenticate($rootScope.account)
        .then((userCreds) => {
            $scope.$apply(function() {
                $location.path("/watchlist");
                $rootScope.isActive = true;
            });
        })
        .catch((error) => {
                $scope.errorMessage = error.message;
                $scope.userError = true;
                $scope.$apply();
        });
    };

    $scope.loginGoggle = () => {
        authFactory
        .authenticateGoogle()
        .then((userCreds) => {
            $scope.$apply(function() {
                $location.path("/childuser");
                $rootScope.isActive = true;
            });
        })
        .catch((error) => {
                $scope.errorMessage = error.message;
                $scope.userError = true;
                $scope.$apply();
        });
    };

});