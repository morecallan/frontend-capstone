"use strict";

app.directive('callanCarousel', function($timeout) {
  
    return {
        template: 
        '<div class="carouselContainer"' +
            '<div class="row">' + 
                '<div class="col s10 offset-s1">' + 
                    '<div class="stick">' + 
                            '<div class="carouselCard card smallCard smallCardLeft"><div class="card-image"><img ng-src="{{images.prev.src}}" class="prevImage"></div></div>' + 
                            '<div class="carouselCard card"><div class="card-image"><img ng-src="{{images.focus.src}}" class="focusImage"></div>' +
                            '<span class="carouselCard card-title">Did you know?<p class="subfact">{{images.focus.fact}}</p></span></div>' + 
                            '<div class="carouselCard card smallCard smallCardRight"><div class="card-image"><img ng-src="{{images.next.src}}" class="nextImage"></div></div>' +
                    '</div>' +
                '</div>' + 
            '</div>' +
        '</div>'
};
});



      
  
