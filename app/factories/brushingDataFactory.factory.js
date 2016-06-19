"use strict";

app.factory("brushingDataFactory", function($rootScope, $q, $http, $timeout, firebaseURL, authFactory){

 let checkForExistingDataInTimeslot = (childSubuid, brushTime) => {
        //Checking today's information
        let today = new Date();
        let dateOfToday = today.getDate(); let monthOfToday = today.getMonth(); let yearOfToday = today.getYear();
        let todayParsed = `${dateOfToday}, ${monthOfToday}, ${yearOfToday}`;

        let deferred = $q.defer();
       

        //Promise checking to see if user has existing sticker for that day - morning/evening
        returnAllBrushingDataForChild().then((brushingDataForChild) => {
            brushingDataForChild.forEach((dataPiece) => {
                let timeOfBrushing = new Date(dataPiece.timestamp);
                let hourOfBrushing = timeOfBrushing.getHours();
                let dateOfBrushing = timeOfBrushing.getDate(); let monthOfBrushing = timeOfBrushing.getMonth(); let yearOfBrushing = timeOfBrushing.getYear();
                let timeOfBrushingParsed = `${dateOfBrushing}, ${monthOfBrushing}, ${yearOfBrushing}`;

                if (timeOfBrushingParsed === todayParsed) {
                    if (hourOfBrushing >= 0 && hourOfBrushing <= 13) {
                        $rootScope.morningSticker = true;
                    } else if (hourOfBrushing >= 14 && hourOfBrushing <= 23) {
                        $rootScope.eveningSticker = true;
                    }
                }
            });

            //Tells the error message whether the user has completed their designated timeslot yet or not
            let hourOfBrushTime = brushTime.getHours();
            if (hourOfBrushTime >= 0 && hourOfBrushTime <= 13 && !$rootScope.morningSticker) {
                $rootScope.morningOrNight = "morning";
                $rootScope.morningSticker = true;
            } else if (hourOfBrushTime >= 14  && hourOfBrushTime <= 23 && !$rootScope.eveningSticker) {
                $rootScope.morningOrNight = "evening";
                $rootScope.eveningSticker = true;
            } else {
                $rootScope.morningOrNight = "";
            }

            let promiseResolve =(resolve,reject) => {   
                $timeout(function() {    
                    let m = $rootScope.morningSticker;     
                    let e = $rootScope.eveningSticker;     
                    if (m || e) {
                        deferred.reject();
                    } else {
                        deferred.resolve();
                    }            
                }, 100);
            };

            promiseResolve();
        });


        return deferred.promise;
};


//Firebase: Adds a brushing time stamp to firebase for selected subuer  (Selected child subuid passed).
    let excuteBrushingSubmit = (childSubuid, brushTime) =>{
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
            });  
        }); 
    };

   



    return {checkForExistingDataInTimeslot:checkForExistingDataInTimeslot, excuteBrushingSubmit: excuteBrushingSubmit, returnAllBrushingDataForChild:returnAllBrushingDataForChild};
});