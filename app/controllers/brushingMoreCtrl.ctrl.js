"use strict";


app.controller('brushingMoreCtrl', function ($scope, $location, $rootScope, $routeParams, $compile, uiCalendarConfig, firebaseURL, authFactory, addChildFactory, brushingDataFactory) {

    /********************************************
    **               SELECTED USER             **
    ********************************************/
    $('#calendar').fullCalendar("defaultView", "basicWeek");


    $scope.events = [];

    $scope.populateBrushingData = () => {
        brushingDataFactory.returnAllBrushingDataForChild().then((returnBrushingData)=>{
            $scope.renderDataForCalendar(returnBrushingData);
        });         
    };

    $scope.renderDataForCalendar = (returnBrushingData) => {
        $scope.eventPlaceholder = returnBrushingData;
            $('#calendar').fullCalendar("changeView", "basicWeek");
            $scope.eventPlaceholder.forEach((event)=>{
                event.title = "I Brushed My Teeth!";
                event.start = new Date(event.timestamp);
                let startTime = new Date(event.timestamp);
                let newDateObj = new Date(startTime.getTime() + (480*60000));
                event.end = newDateObj;
                event.allDay = false;
                event.className = "stickerEventMorning";
                console.log("event", event);
                event.backgroundColor = "rgba(255,255,255,0.8)"
                event.borderColor = "rgba(255,255,255,0.8)"
                $scope.events.push(event);
            });
    }


    $scope.populateBrushingData();

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    

    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
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
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
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
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender,
        eventbackgroundColor: "#000000"
      }
    };


    /* event sources array*/
    $scope.eventSources = [$scope.events];
});