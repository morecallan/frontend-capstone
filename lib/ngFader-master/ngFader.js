(function () {
    'use strict';
    angular.module('ngFader', [])
      .directive('ngFader', function($interval) {

	  function link(scope){

    scope.setTime = 25000;

    scope.images = [
        {alt: 'Brush 1', src: './img/brushing/brush1.gif', subtitle: "Place the toothbrush at an angle facing the top of your mouth. Brush the fronts of all your top teeth."},
        {alt: 'Brush 2', src: './img/brushing/brush2.gif', subtitle: "Make sure to brush your teeth in small, circular motions."},
        {alt: 'Brush 3', src: './img/brushing/brush3.gif', subtitle: "Repeat with the fronts of your bottom teeth."},
        {alt: 'Brush 4', src: './img/brushing/brush4.gif', subtitle: "Clean the insides of your top teeth. It is best to use a wide brush to reach the back teeth."},
        {alt: 'Brush 4', src: './img/brushing/brush5.gif', subtitle: "Clean the insides of your bottom teeth. Make sure to get behind your very back molars!"}];

		/*****************************************************
			STOP! NO FURTHER CODE SHOULD HAVE TO BE EDITED
		******************************************************/

		//Pagination dots - gets number of images
        scope.numberOfImages = scope.images.length;

        //Pagination - click on dots and change image
        scope.selectedImage = 0;
        scope.setSelected = function (idx) {
          scope.stopSlider();
          scope.selectedImage = idx;
        };

        //Slideshow controls
        scope.sliderBack = function() {
          scope.stopSlider();
          scope.selectedImage === 0 ? scope.selectedImage = scope.numberOfImages - 1 : scope.selectedImage--;
        };

        scope.sliderForward = function() {
          scope.stopSlider();
          scope.autoSlider();
        };

        scope.autoSlider = function (){
          scope.selectedImage < scope.numberOfImages - 1 ? scope.selectedImage++ : scope.selectedImage = 0;
        };

        scope.stopSlider = function() {
          $interval.cancel(scope.intervalPromise);
          scope.activePause = true;
          scope.activeStart = false;
        };

        scope.toggleStartStop = function() {
          if(scope.activeStart) {
          	scope.stopSlider();
          } else {
          	scope.startSlider();
          }
        };
        
        scope.startSlider = function(){
          scope.intervalPromise = $interval(scope.autoSlider, scope.setTime);
          scope.activeStart = true;
          scope.activePause = false;
        };
        scope.startSlider();

        scope.show = function(idx){
        	if (scope.selectedImage==idx) {
        		return "show";
        	}
        };

	}

	  return {
	    restrict: 'E',
	    scope: false,
	    template: '<div class="ng-fader">'+
	    		//images will render here
			'<ul>' + 
				'<li ng-repeat="image in images"><img data-ng-src="{{image.src}}" data-ng-alt="{{image.alt}}" ng-class="show($index)"/><h6 ng-class="show($index)">{{image.subtitle}}</h6></li>' + 
			'</ul>' + 
		'</div>',
		link: link
	  };
      });

}());
