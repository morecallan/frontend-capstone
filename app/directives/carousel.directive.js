"use strict";

app.directive('callanCarousel', function($timeout) {
  
    return {
        template: 
        '<div class="carouselContainer"' +
            '<div class="row">' + 
                '<div class="col s10 offset-s1">' + 
                    '<div class="stick">' + 
                            '<div class="card smallCard smallCardLeft"><div class="card-image"><img src="{{images.prev.src}}"" class="prevImage"></div></div>' + 
                            '<div class="card"><div class="card-image"><img src="{{images.focus.src}}"" class="focusImage"></div>' +
                            '<span class="card-title">Did you know?<p class="subfact">{{images.focus.fact}}</p></span></div>' + 
                            '<div class="card smallCard smallCardRight"><div class="card-image"><img src="{{images.next.src}}" class="nextImage"></div></div>' +
                    '</div>' +
                '</div>' + 
            '</div>' +
        '</div>'
};
});



      
  
