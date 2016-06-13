"use strict";

var app = angular.module("ToothBrushingApp", ["ngRoute"])
    .constant("firebaseURL", "https://tooth-brushing.firebaseio.com/");


let isAuth = (authFactory) => new Promise((resolve, reject) => {
    if (authFactory.isAuthenticated()) {
        resolve();
    } else {
        reject();    
    }
});


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
        .when("/childLogin", {
            templateUrl: "partials/splash.html",
            controller:  "loginCtrl"
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
            $location.path("/parentlogin");
        }
    });
});