"use strict";


app.controller('loginCtrl', function ($scope, $location, $rootScope, firebaseURL, authFactory) {

    /********************************************
    **      VARIABLES FOR USERS - SUBUSERS     **
    ********************************************/
    let ref = new Firebase(firebaseURL);

    $scope.userError = false;

    $scope.parentMode = true;
    $scope.childMode = false;
    $scope.modeLogin = true;
    $scope.viewAvatars = false;


    $rootScope.account = {
        email: "",
        password: ""
    };

    $scope.avatars = [{img: "av1.png"},{img: "av2.png"},{img: "av3.png"},{img: "av4.png"},{img: "av5.png"},{img: "av6.png"},{img: "av7.png"},{img: "av8.png"},{img: "av9.png"},{img: "av10.png"},{img: "av11.png"},{img: "av12.png"},{img: "av13.png"},{img: "av14.png"}]

    /********************************************
    **               ERROR MODAL               **
    ********************************************/

    $scope.closeModal = () => {
        $scope.userError = false;
    };

    /********************************************
    **        WHICH PARTIAL SHOULD I SHOW?     **
    ********************************************/

    if($location.path() === "/parentlogin"){
        $scope.parentMode = true;
        $scope.childMode = false;
        $scope.modeLogin = true;
    }

    if($location.path() === "/parentregister"){
        $scope.parentMode = true;
        $scope.childMode = false;
        $scope.modeLogin = false;
    }

    if($location.path() === "/childregister"){
        $scope.parentMode = false;
        $scope.childMode = true;
        $scope.modeLogin = false;
    }

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
                $location.path("/childregister");
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
                $location.path("/childregister");
                $rootScope.isActive = true;
            });
        })
        .catch((error) => {
                $scope.errorMessage = error.message;
                $scope.userError = true;
                $scope.$apply();
        });
    };

    /********************************************
    **          CHILD REGISTRATION             **
    ********************************************/
    $scope.showAvatarModal = () => {
        $scope.viewAvatars = true;
    }

    $scope.closeAvatarModal = () => {
        $scope.viewAvatars = false;
    }

});