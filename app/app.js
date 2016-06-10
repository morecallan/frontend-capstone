"use strict";

var app = angular.module("MovieDatabaseApp", ["ngRoute", "focus-if", "ui-bootstrap"])
    .constant("firebaseURL", "https://tooth-brushing.firebaseio.com/");

let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
    if (AuthFactory.isAuthenticated()) {
        resolve();
    } else {
        reject();    
    }
});

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/splash.html",
            controller:  "LoginCtrl",
            resolve: {isAuth}
        })
        .when("/splash",{
            templateUrl: "partials/splash.html",
            controller:  "LoginCtrl"
        })
        .when("/login", {
            templateUrl: "partials/splash.html",
            controller:  "LoginCtrl"
        })
        .when("/logout",{
            templateUrl: "partials/splash.html",
            controller:  "LoginCtrl"
        })
        .when("/register", {
            templateUrl: "partials/splash.html",
            controller:  "LoginCtrl"
        })
        .otherwise("/"); 
});

app.run(($location) => {
    let watchlistRef = new Firebase("https://tooth-brushing.firebaseio.com/");
    watchlistRef.unauth();

    watchlistRef.onAuth(authData => {
        if(!authData) {
            $location.path("/login");
        }
    });
});