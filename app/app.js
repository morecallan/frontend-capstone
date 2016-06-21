"use strict";

var app = angular.module("ToothBrushingApp", ["ngRoute", "ui.calendar", "angularSoundManager", "ngAnimate", 'ngTouch', 'ngFader'])
    .constant("firebaseURL", "https://tooth-brushing.firebaseio.com/");


let isAuth = (authFactory) => new Promise((resolve, reject) => {
    if (authFactory.isAuthenticated()) {
        resolve();
        return true;    
    } else {
        reject();
        return false;    
    }
});

let isChildAuth = ($rootScope) => {
    if (Object.getOwnPropertyNames($rootScope.selectedChild).length === 0) {
        return false;
    } else {
        return true;    
    }
};



app.config(function($routeProvider) {
    $routeProvider
        .when("/splash", {
            templateUrl: "partials/splash.html",
            controller:  "loginCtrl"
        })
        .when("/parentregister", {
            templateUrl: "partials/splash.html",
            controller:  "loginCtrl"
        })
        .when("/parentlogin", {
            templateUrl: "partials/splash.html",
            controller:  "loginCtrl"
        })
        .when("/childlogin", {
            templateUrl: "partials/splash.html",
            controller:  "loginCtrl",
            resolve: {isAuth}
        })
        .when("/childregister", {
            templateUrl: "partials/splash.html",
            controller:  "loginCtrl",
            resolve: {isAuth}
        })
        .when("/childlanding/:subuid", {
            templateUrl: "partials/child-landing.html",
            controller:  "childAcctCtrl",
            resolve: {isAuth, isChildAuth}
        })
        .when("/brushing/:subuid",{
            templateUrl: "partials/brushing.html",
            controller:  "brushingCtrl",
            resolve: {isAuth, isChildAuth}
        })
        .when("/brushingchart/:subuid",{
            templateUrl: "partials/brush-chart.html",
            controller:  "brushingMoreCtrl",
            resolve: {isAuth, isChildAuth}
        })
        .when("/logout",{
            templateUrl: "partials/splash.html",
            controller:  "loginCtrl"
        })
        .otherwise("/splash"); 
});


app.run(($location) => {
    let brushingDbRef = new Firebase("https://tooth-brushing.firebaseio.com/");
    brushingDbRef.unauth();

    brushingDbRef.onAuth(authData => {
        if(!authData) {
            $location.path("/splash");
        }
    });
});