"use strict";


app.controller('loginCtrl', function ($scope, $location, $rootScope, $timeout, firebaseURL, authFactory, addChildFactory) {

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

    $scope.deleteMode = false;
    $scope.deleteButtonClicked = false;
    $scope.childToDelete = "";


    $rootScope.account = {
        email: "",
        password: ""
    };

    $scope.avatars = [{img: "img/avatar/av1.png"},{img: "img/avatar/av2.png"},{img: "img/avatar/av3.png"},{img: "img/avatar/av4.png"},{img: "img/avatar/av5.png"},{img: "img/avatar/av6.png"},{img: "img/avatar/av7.png"},{img: "img/avatar/av8.png"},{img: "img/avatar/av9.png"},{img: "img/avatar/av10.png"},{img: "img/avatar/av11.png"},{img: "img/avatar/av12.png"},{img: "img/avatar/av13.png"},{img: "img/avatar/av14.png"},{img: "img/avatar/av15.png"}];

    $scope.childAccount = {
        firstName: "",
        age: "",
        avatar: "img/avatar/av2.png",
        awards: "",
        uid: "",
        subuid: ""
    };

    $rootScope.children = [];
    $scope.lessThanFourChildren = true;

    $rootScope.selectedChild = {};
    $rootScope.selectedParent = authFactory.getUser();



    /********************************************
    **               ERROR MODAL               **
    ********************************************/

    $scope.closeModal = () => {
        $scope.userError = false;
        $scope.childRegError = false;
        $scope.deleteButtonClicked = false;
    };


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
            console.log("userCreds", userCreds);
            $scope.$apply(function() {
                $location.path(`/childlogin`);
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
                $location.path(`/childlogin`);
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
            $location.path(`/childlogin`);
            $scope.checkForChildren();
        });
    };

    /********************************************
    **              CHILD LOGIN                **
    ********************************************/
    $scope.checkForChildren = () => {
    let parent = $rootScope.selectedParent = authFactory.getUser();
        addChildFactory.returnAllChildrenForLoggedInParent(parent).then((childrenFromFirebase) => {
            $rootScope.children = childrenFromFirebase;    
            if (childrenFromFirebase.length > 0) {
                $rootScope.children = childrenFromFirebase;
                $scope.checkForChildrenLimit();    
            }
        });
    };


    $scope.selectActiveChild = (child) => {
        $rootScope.selectedChild = child;
        $location.path("/childlanding/" + child.subuid);
    };

    $scope.deleteSelectedChild = (child) => {
        addChildFactory.deleteOneChild(child.subuid).then((childrenFromFirebase) => {
            $scope.checkForChildren();
            $timeout(() => {
                $scope.exitDeleteMode();
                $scope.enterDeleteMode();
            }, 300);
        });
    };

    $scope.applyDeleteMode = () => {
        $scope.deleteMode = !$scope.deleteMode;
        if ($scope.deleteMode) {
            $scope.enterDeleteMode();
        } else if (!$scope.deleteMode) {
            $scope.exitDeleteMode();
        }
    };

    $scope.enterDeleteMode = () => {
        let childAcctCards = document.getElementsByClassName("child-login-card");
        for (var i = 0; i < childAcctCards.length; i++) {
            childAcctCards[i].classList.add("animated", "infinite", "shake");
        }
    };

    $scope.exitDeleteMode = () => {
        let childAcctCards = document.getElementsByClassName("child-login-card");
        for (var i = 0; i < childAcctCards.length; i++) {
            childAcctCards[i].classList.remove("animated", "infinite", "shake");
        }
    };

    $scope.activateAreYouSureModal = (child) => {
        $scope.childToDelete = child;
        $scope.deleteButtonClicked = true;
    };

    $scope.checkForChildrenLimit = () => {
        if ($rootScope.children.length >= 4) {
            $scope.lessThanFourChildren = false;
        } else {
            $scope.lessThanFourChildren = true;
        }
    };

    $scope.$watch($rootScope.children);
    $scope.$watch($scope.lessThanFourChildren);

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
        $rootScope.childIsAuth = false;
        $scope.parentMode = false;
        $scope.childMode = true;
        $scope.modeLogin = true;
        $rootScope.selectedParent = authFactory.getUser();
        $scope.checkForChildren();
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
});