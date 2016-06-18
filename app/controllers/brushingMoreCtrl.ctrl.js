"use strict";


app.controller('brushingMoreCtrl', function ($scope, $location, $rootScope, $routeParams, $compile, uiCalendarConfig, firebaseURL, authFactory, addChildFactory, brushingDataFactory) {

    /********************************************
    **               SELECTED USER             **
    ********************************************/
    $scope.usersBrushingData = "";

    $('#calendar').fullCalendar("changeView", "basicWeek");

    Date.prototype.addHours = function(h) {    
       this.setTime(this.getTime() + (h*60*60*1000)); 
       return this;   
    };


    $scope.events = [];

    $scope.getUserBrushingData = () => {
        brushingDataFactory.returnAllBrushingDataForChild().then((returnBrushingData)=>{
            $scope.usersBrushingData = returnBrushingData;
            $scope.eventPlaceholder = returnBrushingData;
            $('#calendar').fullCalendar("changeView", "basicWeek");
            $scope.eventPlaceholder.forEach((event)=>{
                event.title = "I Brushed My Teeth!";
                event.start = event.timestamp;
                let datePlusHrs = new Date(event.timestamp).addHours();
                event.end = datePlusHrs;
                event.allDay = false;
                event.className = "stickerEventMorning";
                $scope.events.push(event);
            });
        });
    };


    $scope.getUserBrushingData();

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
        borderColor: "#000000",
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
        eventRender: $scope.eventRender
      }
    };


    /* event sources array*/
    $scope.eventSources = [$scope.events];
});