"use strict";


app.controller('brushingMoreCtrl', function ($scope, $location, $rootScope, $routeParams, $compile, uiCalendarConfig, firebaseURL, authFactory, addChildFactory, brushingDataFactory) {

$rootScope.stopInterval ();


    /********************************************
    **               SELECTED USER             **
    ********************************************/

    $scope.$watch($rootScope.morningOrNight);

    $scope.closeModal = () => {
        $scope.userError = false;
        $scope.alreadyBrushedForThisTime = false;
    };


    $('#calendar').fullCalendar("defaultView", "basicWeek");


    $scope.events = [];

    $scope.populateBrushingData = () => {
        $scope.events = [];
        brushingDataFactory.returnAllBrushingDataForChild().then((returnBrushingData)=>{
            $scope.renderDataForCalendar(returnBrushingData);
                let usersLastEventCardsMorning = document.getElementsByClassName("stickerEventMorningJustAdded");
                let usersLastEventCardsEvening = document.getElementsByClassName("stickerEventEveningJustAdded");
                if (usersLastEventCardsMorning.length === 1) {
                    usersLastEventCardsMorning[0].classList.add("animated", "tada");
                } else if (usersLastEventCardsEvening.length === 1) {
                    usersLastEventCardsEvening[0].classList.add("animated", "tada");
                }
        });
    };

    $scope.renderDataForCalendar = (returnBrushingData) => {
        $scope.eventPlaceholder = returnBrushingData;
        $scope.eventPlaceholder = $scope.eventPlaceholder.sort(function(a,b){
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        $('#calendar').fullCalendar("changeView", "basicWeek");
        $scope.eventPlaceholder.forEach((event, index)=>{
            let eventHours = new Date(event.timestamp);
            eventHours = eventHours.getHours();
            if (eventHours >= 0 && eventHours <= 13) {
                event.className = "stickerEventMorning";
                if (index === 0 ) {
                    event.className = "stickerEventMorningJustAdded";
                }
            } else if (eventHours >= 14 && eventHours <= 23) {
                event.className = "stickerEventNight";
                if (index === 0) {
                    event.className = "stickerEventEveningJustAdded";
                }
            }
            event.title = "I Brushed My Teeth!";
            let start = new Date(event.timestamp);
            event.start = start;
            event.allDay = false;
            event.stick = true;
            event.borderColor = "rgba(255,255,255,0.8)";
            $scope.events.push(event);
        });
    };


    $scope.populateBrushingData();

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* Change View */
    $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };

    $scope.eventRender = function( event, element, view ) {
        $scope.populateBrushingData();
        $compile(element)($scope);
    };

    /* config object */
    $scope.uiConfig = {
      calendar:{
        defaultView: "basicWeek",
        borderColor: "rgba(255,255,255,1)",
        height: 450,
        contentHeight: 400,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventRender: $scope.eventRender,
        eventbackgroundColor: "#000000"
      }
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events];
});
