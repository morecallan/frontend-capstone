"use strict";

app.factory("brushingDataFactory", function($q, $http, firebaseURL, authFactory){

//Firebase: Adds child to a parent account based on the UID of logged in parent (Full child account data from registration form passed).
    let addChildToParentAccount = (childAccount) => {
        let user=authFactory.getUser();

        return $q(function(resolve,reject){
            $http.post(`${firebaseURL}subusers.json`,
                JSON.stringify({
                    firstName: childAccount.firstName,
                    age: childAccount.age,
                    avatar: childAccount.avatar,
                    awards: [], 
                    uid:user.uid,
                    subuid: ""
                }))
            .success(function(response){
                resolve(response);
            })
            .error(function(error){
                reject(error);
            });
        });
    };



    return {addChildToParentAccount:addChildToParentAccount};
});