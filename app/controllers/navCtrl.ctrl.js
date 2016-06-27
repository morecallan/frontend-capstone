"use strict";


app.controller('navCtrl', function ($scope, $location, $rootScope, $timeout, firebaseURL, authFactory, addChildFactory) {

    /********************************************
    **      VARIABLES FOR USERS - SUBUSERS     **
    ********************************************/
    $rootScope.navImg = "./img/avatar/av1.png";
    $rootScope.selectedChild = {};
    $rootScope.selectedParent = authFactory.getUser();

    $rootScope.childIsAuth = false;
    $scope.$watch($rootScope.childIsAuth);
    $rootScope.isParentAuth = false;
    $scope.$watch($rootScope.isParentAuth);


    $scope.$watch(() => {
        if ($rootScope.selectedParent !== null) {
            $rootScope.isParentAuth = true;
        } else {
            $rootScope.isParentAuth = false;
        }
    });


    $scope.$watch(() => {
        if ($rootScope.selectedChild !== null) {
            if (Object.getOwnPropertyNames($rootScope.selectedChild).length === 0) {
                $rootScope.navImg = "./img/avatar/av1.png";
            } else {
                $rootScope.navImg = $rootScope.selectedChild.avatar;
                $rootScope.childIsAuth = true;
            }
        }
    });

    $scope.closeNav = (btn) => {
        var $this = $(btn.currentTarget);
        var $menu = $($this.closest(".click-to-toggle"));
          if ($menu.hasClass('active')) {
            // Get direction option
            var horizontal = $this.hasClass('horizontal');
            var offsetY, offsetX;

            if (horizontal === true) {
              offsetX = 40;
            } else {
              offsetY = 40;
            }

            $menu.removeClass('active');
            var time = 0;
            $menu.find('ul .btn-floating').addClass("animated fadeOutUp");
            $timeout(() => {$menu.find('ul .btn-floating').removeClass("animated fadeOutUp");}, 700);
        }
    };


});
