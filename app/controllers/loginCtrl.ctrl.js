"use strict";


app.controller('loginCtrl', function ($scope, $location, $rootScope, $timeout, $interval, firebaseURL, authFactory, addChildFactory) {



    /********************************************
    **      VARIABLES FOR USERS - SUBUSERS     **
    ********************************************/
    let ref = new Firebase(firebaseURL);

    $scope.userError = false;
    $scope.childRegError = false;

    $scope.parentLoginTitle = "Login";
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

    $scope.children = [];
    $scope.lessThanFourChildren = true;

    $rootScope.selectedChild = {};
    $rootScope.selectedParent = authFactory.getUser();

    /********************************************
    **                 CAROUSEL                **
    ********************************************/

    $scope.images = {};

    $scope.carouselImages = [
        {src: "./img/info/brushes.jpg", fact: "Be sure your toothbrush has soft bristles."},
        {src: "./img/info/kidAtDentist.jpg", fact: "It's also important to visit the dentist twice a year."},
        {src: "./img/info/kidAtDentist2.jpg", fact: "The dentist can help you learn the best way to brush and floss."},
        {src: "./img/info/kidAtDentist3.jpg", fact: "Candy is not what makes teeth decay; germs do."},
        {src: "./img/info/surpriseDentist.jpg", fact: "Bacteria go crazy over the sugar on your teeth, like ants at a picnic."}
    ];


    
    $scope.animateCards = () => {
        let carouselCards = document.getElementsByClassName("carouselCard");
        carouselCards[1].classList.add("animated", "slideInRight");
        for (var i = 0; i < carouselCards.length; i++) {
            carouselCards[i].classList.add("animated", "fadeIn");
        }
    };

    $scope.removeAnimationFromCards = () => {
        let carouselCards = document.getElementsByClassName("carouselCard");
        carouselCards[1].classList.remove("animated", "slideInRight");
        for (var j = 0; j < carouselCards.length; j++) {
            carouselCards[j].classList.remove("animated",   "fadeIn");
        }
    };

    var focus = 0;
    var prev = $scope.carouselImages.length - 1;
    var next = focus + 1;
    // $rootScope.carouselInterval = null;

    $rootScope.initiateCarousel = () => {
        $timeout(() => {
            $scope.moveCarouselAlong();
            $scope.animateCards();
            $timeout(()=>{$scope.removeAnimationFromCards();}, 650);
        }, 100);
        $rootScope.carouselInterval = $interval(() => {
            $scope.animateCards();
            $scope.moveCarouselAlong();
            $timeout(()=>{$scope.removeAnimationFromCards();}, 650);
        }, 4800);
        
    };

    $scope.moveCarouselAlong = () => {
        prev = focus - 1;
        next = focus + 1;
    
        if (focus === 0) {
            prev = $scope.carouselImages.length - 1;
        }

        if (focus ===  $scope.carouselImages.length - 1) {
            next = 0;
        }

        $scope.images.prev = $scope.carouselImages[prev];
        $scope.images.focus = $scope.carouselImages[focus];
        $scope.images.next = $scope.carouselImages[next];
       

        if (focus < $scope.carouselImages.length - 1) {
            focus++;
        } else {
            focus = 0;
        }
    };

        $scope.stopInterval = function () {
            if (angular.isDefined($rootScope.carouselInterval)) {
                $interval.cancel($rootScope.carouselInterval);
            }
        };




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
            $scope.children = childrenFromFirebase;    
            if (childrenFromFirebase.length > 0) {
                $scope.children = childrenFromFirebase;
                $scope.checkForChildrenLimit();
            }
        });
    };


    $scope.selectActiveChild = (child) => {
        $rootScope.selectedChild = child;
        $location.path("/childlanding/" + child.subuid);
    };

    $scope.deleteSelectedChild = (child, index) => {
        console.log("index", index);
        let childAcctCards = document.getElementsByClassName("child-login-card");
        childAcctCards[index].classList.remove("animated", "infinite", "shake");
        childAcctCards[index].classList.add("animated", "slideOutDown");
        addChildFactory.deleteOneChild(child.subuid).then((childrenFromFirebase) => {
            $scope.checkForChildren();
            $scope.applyDeleteMode();
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
        for (var j = 0; j < childAcctCards.length; j++) {
            childAcctCards[j].classList.remove("animated", "infinite", "shake");
        }
    };

    $scope.activateAreYouSureModal = (child, index) => {
        $scope.childToDelete = child;
        $scope.childCardToAnimate = index;
        $scope.deleteButtonClicked = true;
    };

    $scope.checkForChildrenLimit = () => {
        if ($scope.children.length >= 4) {
            $scope.lessThanFourChildren = false;
        } else {
            $scope.lessThanFourChildren = true;
        }
    };

    $scope.$watch($scope.lessThanFourChildren);
    $scope.$watch($scope.childCardToAnimate);

    /********************************************
    **        WHICH PARTIAL SHOULD I SHOW?     **
    ********************************************/
    if($location.path() === "/splash"){
        $scope.stopInterval();
        $rootScope.initiateCarousel();
    }


    if($location.path() === "/parentlogin"){
        $scope.parentMode = true;
        $scope.parentLoginTitle = "Login";
        $scope.childMode = false;
        $scope.modeLogin = true;
        $scope.stopInterval();
        $rootScope.initiateCarousel();
    }

    if($location.path() === "/parentregister"){
        $scope.parentMode = true;
        $scope.parentLoginTitle = "Register";
        $scope.childMode = false;
        $scope.modeLogin = false;
        $scope.stopInterval();
        $rootScope.initiateCarousel();
    }

     if($location.path() === "/childlogin"){
        $rootScope.childIsAuth = false;
        $scope.parentMode = false;
        $scope.childMode = true;
        $scope.modeLogin = true;
        $rootScope.selectedParent = authFactory.getUser();
        $scope.checkForChildren();
        $scope.stopInterval();
        $rootScope.initiateCarousel();
    }

    if($location.path() === "/childregister"){
        $scope.stopInterval();
        $scope.parentMode = false;
        $scope.childMode = true;
        $scope.modeLogin = false;
    }

    if($location.path() === "/logout"){
        $scope.stopInterval();
        $rootScope.initiateCarousel();
        ref.unauth();
        $rootScope.isActive = false;
    }
});

/********************************************
**       WATCH FOR NG REPEAT COMPLETE      **
********************************************/
app.directive('myRepeatDirective', function($rootScope) {
  return function(scope, element, attrs) {
    if (scope.$last){
      $rootScope.lastLoaded = true;
    }
  };
});

