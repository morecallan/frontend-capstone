"use strict";

app.factory("credentialsFactory", function($q, $http){


var getGetResponseCredentials = () => {
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

  var getS3Credentials = () => {
      return $q(function(resolve, reject){
          $http
          .get("data/S3.json")
          .success(function(credentials){
              resolve(credentials.credentials);
          })
          .error(function(error){
              reject(error);
          });
      });
  };

    return {getGetResponseCredentials: getGetResponseCredentials, getS3Credentials: getS3Credentials};
});
