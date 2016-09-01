"use strict";


app.directive('fadeIn', function(){
    return {
        restrict: 'A',
        link: function($scope, $element, attrs){
            $scope.$watch($element);
            $element.addClass("ng-hide-remove");
            $element.on('load', function() {
                $element.addClass("ng-hide-add");
            });
        }
    };
});