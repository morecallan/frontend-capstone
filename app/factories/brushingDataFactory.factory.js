"use strict";

app.factory("brushingDataFactory", function($q, $http, firebaseURL, $rootScope, authFactory){

//Firebase: Adds a brushing time stamp to firebase for selected subuer (Selected child subuid passed).
    let submitBrushingCompleteData = (childSubuid, brushTime) => {
        return $q(function(resolve,reject){
            $http.post(`${firebaseURL}brushData.json`,
                JSON.stringify({
                    timestamp: brushTime,
                    subuid: childSubuid,
                    brushingDataKey: ""
                }))
            .success(function(response){
                resolve(response);
            })
            .error(function(error){
                reject(error);
            });
        });
    };

//Firebase: Returns all brushing  selected subuer (Selected child subuid passed).
    let returnAllBrushingDataForChild = () => {
        let brushingDataForChild = [];
        let selectedChildID = $rootScope.selectedChild.subuid;
        console.log("selectedChildID", selectedChildID);

        return $q(function(resolve, reject){
          $http.get(`${firebaseURL}brushData.json?orderBy="subuid"&equalTo="${selectedChildID}"`)
            .success(function(returnObject){ 
                Object.keys(returnObject).forEach(function(key){
                returnObject[key].brushingDataKey=key;
                brushingDataForChild.push(returnObject[key]);
            });
                resolve(brushingDataForChild);
            })
            .error(function(error){
                reject(error);
                console.log("ERROR", error);
            });  
        }); 
    };



    return {submitBrushingCompleteData:submitBrushingCompleteData, returnAllBrushingDataForChild:returnAllBrushingDataForChild};
});