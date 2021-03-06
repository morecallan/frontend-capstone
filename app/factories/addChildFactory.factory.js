"use strict";

app.factory("addChildFactory", function($q, $http, firebaseURL, authFactory){

//Firebase: Adds child to a parent account based on the UID of logged in parent (Full child account data from registration form passed).
    let addChildToParentAccount = (childAccount) => {
        let user=authFactory.getUser();
        // TODO: Update parent email account to accept new child as an additional field

        return $q(function(resolve,reject){
            $http.post(`${firebaseURL}subusers.json`,
                JSON.stringify({
                    firstName: childAccount.firstName,
                    age: childAccount.age,
                    avatar: childAccount.avatar,
                    awards: childAccount.awards,
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

//Firebase: Removes selected child from database completely, which also removes it from the parent account. (Only childAccount subuid key passed).
    let addChildFromDatabase = (childAccountID) =>{
        return $q(function(resolve, reject){
            $http
            .delete(`${firebaseURL}subusers/${childAccountID}.json`)
            .success(function(objectFromFirebase){
                resolve(objectFromFirebase);
            })
            .error(function(error){
                reject(error);
            });
        });
    };


// Firebase: Retrieves full list of children (subusers) for logged-in parent(user).
    let returnAllChildrenForLoggedInParent = (parent) => {
        let user = parent;
        let children =[];

        return $q(function(resolve, reject){
          $http.get(`${firebaseURL}subusers.json?orderBy="uid"&equalTo="${user.uid}"`)
            .success(function(returnObject){
                Object.keys(returnObject).forEach(function(key){
                returnObject[key].subuid=key;
                children.push(returnObject[key]);
            });
                resolve(children);
            })
            .error(function(error){
                reject(error);
            });
        });
    };

//Firebase: Removes selected child from db. (Only child subuid key passed).
    let deleteOneChild = (childSubuid) =>{
      // TODO: brushing data delete
      // TODO: remove from email specs
        return $q(function(resolve, reject){
            $http
            .delete(`${firebaseURL}subusers/${childSubuid}.json`)
            .success(function(objectFromFirebase){
                resolve(objectFromFirebase);
            })
            .error(function(error){
                reject(error);
            });
        });
    };

    return {addChildToParentAccount:addChildToParentAccount, addChildFromDatabase:addChildFromDatabase, returnAllChildrenForLoggedInParent:returnAllChildrenForLoggedInParent, deleteOneChild:deleteOneChild};
});
