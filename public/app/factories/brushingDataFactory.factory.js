"use strict";

app.factory("brushingDataFactory", function($rootScope, $location, $q, $http, $timeout, firebaseURL, authFactory){


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

//Checks to see if users submission is ready to go
   let runBrushingDataCheckThenSubmitNewIfCool = (childSubuid, brushTime) => {
        let morningStickerForToday = false;
        let eveningStickerForToday = false;
        let submittable = 0;

        //Checking today's information
        let today = new Date();
        let dateOfToday = today.getDate(); let monthOfToday = today.getMonth(); let yearOfToday = today.getYear();
        let todayParsed = `${dateOfToday}, ${monthOfToday}, ${yearOfToday}`;

        returnAllBrushingDataForChild().then((brushingDataForChild) => {
            brushingDataForChild.forEach((dataPiece) => {
                let timeOfBrushing = new Date(dataPiece.timestamp);
                let hourOfBrushing = timeOfBrushing.getHours();
                let dateOfBrushing = timeOfBrushing.getDate(); let monthOfBrushing = timeOfBrushing.getMonth(); let yearOfBrushing = timeOfBrushing.getYear();
                let timeOfBrushingParsed = `${dateOfBrushing}, ${monthOfBrushing}, ${yearOfBrushing}`;

                let morningBrushingExisting = hourOfBrushing >= 0 && hourOfBrushing <= 13;
                let eveningBrushingExisting = hourOfBrushing >= 14 && hourOfBrushing <= 23;

                //checking to see if user has completed brushing for today
                if (timeOfBrushingParsed === todayParsed) {
                    if (morningBrushingExisting) {
                        morningStickerForToday = true;
                        $rootScope.morningOrNight = "morning";
                    } else if (eveningBrushingExisting) {
                        eveningStickerForToday = true;
                        $rootScope.morningOrNight = "evening";
                    }
                }
            });

            let morningBrushingAttemptToSubmit = brushTime.getHours() >= 0 && brushTime.getHours() <= 13;
            let eveningBrushingAttemptToSubmit = brushTime.getHours() >= 14 && brushTime.getHours() <= 23;

            if (morningStickerForToday && morningBrushingAttemptToSubmit) {
                $rootScope.alreadyBrushedForThisTime = true;
                returnAllBrushingDataForChild().then((returnBrushingData)=>{
                    $location.path("/brushingchart/" + childSubuid);
                });
             } else if (eveningStickerForToday && eveningBrushingAttemptToSubmit) {
                $rootScope.alreadyBrushedForThisTime = true;
                returnAllBrushingDataForChild().then((returnBrushingData)=>{
                    $location.path("/brushingchart/" + childSubuid);
                });
             } else {
                excuteBrushingSubmit(childSubuid, brushTime).then(() => {
                    returnAllBrushingDataForChild().then((returnBrushingData)=>{
                        $location.path("/brushingchart/" + childSubuid);
                    });
                });
             }
        });
   };



    return {excuteBrushingSubmit: excuteBrushingSubmit, returnAllBrushingDataForChild:returnAllBrushingDataForChild, runBrushingDataCheckThenSubmitNewIfCool:runBrushingDataCheckThenSubmitNewIfCool};
});
