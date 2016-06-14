"use strict";


app.controller('loginCtrl', function ($scope, $location, $rootScope, firebaseURL, authFactory, addChildFactory) {

    /********************************************
    **      VARIABLES FOR USERS - SUBUSERS     **
    ********************************************/
    let ref = new Firebase(firebaseURL);

    $scope.userError = false;
    $scope.childRegError = false;

    $scope.parentMode = true;
    $scope.childMode = false;
    $scope.modeLogin = true;
    $scope.viewAvatars = false;


    $rootScope.account = {
        email: "",
        password: ""
    };

    $scope.avatars = [{img: "img/avatar/av1.png"},{img: "img/avatar/av2.png"},{img: "img/avatar/av3.png"},{img: "img/avatar/av4.png"},{img: "img/avatar/av5.png"},{img: "img/avatar/av6.png"},{img: "img/avatar/av7.png"},{img: "img/avatar/av8.png"},{img: "img/avatar/av9.png"},{img: "img/avatar/av10.png"},{img: "img/avatar/av11.png"},{img: "img/avatar/av12.png"},{img: "img/avatar/av13.png"},{img: "img/avatar/av14.png"}];

    $scope.childAccount = {
        firstName: "",
        age: "",
        avatar: "img/avatar/av2.png"
    };

    $rootScope.children = [];
    $scope.lessThanFourChildren = true;

    $rootScope.selectedChild = {};



    /********************************************
    **               ERROR MODAL               **
    ********************************************/

    $scope.closeModal = () => {
        $scope.userError = false;
        $scope.childRegError = false;
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

     if($location.path() === "/childlogin"){
        $scope.parentMode = false;
        $scope.childMode = true;
        $scope.modeLogin = true;
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
                $location.path("/childlogin");
                $scope.checkForChildren();
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
                $location.path("/childlogin");
                $scope.checkForChildren();
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
    };

    $scope.closeAvatarModal = () => {
        $scope.viewAvatars = false;
    };

    $scope.assignAvatar = (chosenAvatarImg) => {
        $scope.childAccount.avatar = chosenAvatarImg;
    };

    $scope.checkChildRegForm = () => {
        if ($scope.childAccount.firstName !== "" && $scope.childAccount.age !== "") {
            $scope.childadd();
        } else {    
            $scope.childRegError = true;
            $scope.errorMessage = "Please fill out all fields!";
        }
    };


    $scope.childadd = () => {
        addChildFactory.addChildToParentAccount($scope.childAccount).then(() => {
            $location.path("/childlogin");
            $scope.checkForChildren();
        });
    };

    /********************************************
    **              CHILD LOGIN                **
    ********************************************/
    $scope.checkForChildren = () => {
        addChildFactory.returnAllChildrenForLoggedInParent().then((childrenFromFirebase) => {
            if (childrenFromFirebase.length > 0) {
                $rootScope.children = childrenFromFirebase;    
            }
        });
    };

    $scope.selectActiveChild = (child) => {
        $rootScope.selectedChild = child;
        $location.path("/childlanding");
    };

    $scope.$watch(() => {
        if ($rootScope.children.length >= 4) {
            $scope.lessThanFourChildren = false;
        }
    });
});