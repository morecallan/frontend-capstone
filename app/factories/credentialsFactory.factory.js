"use strict";

app.factory("credentialsFactory", function($q, $http){


var getCredentials = () => {
        return $q(function(resolve, reject){
            $http
            .get("data/getResponse.json")
            .success(function(credentials){
                resolve(credentials.credentials);
            })
            .error(function(error){
                reject(error);
            });
        });
    };

    return {getCredentials: getCredentials};
});
