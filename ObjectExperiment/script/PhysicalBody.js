 function createPhysicalBody(options) {

     'use strict';

     function move(delta) {

         var self = this,
          lastCoordinates = { x: self.x, y: self.y };
          
         self.x += (self.speed * delta.x);
         self.y += (self.speed * delta.y);

         return lastCoordinates;
     }

    function isBetween(value, min, max) {
        return min <= value && value <= max;
    }
     function colidesWith(otherPhysicalBody) {
          var self = this;
          
        return (isBetween(otherPhysicalBody.x, self.x, self.x + self.width) ||
                isBetween(otherPhysicalBody.x + otherPhysicalBody.width, self.x, self.x + self.width)) &&
            (isBetween(otherPhysicalBody.y, self.y, self.y + self.height) ||
                isBetween(otherPhysicalBody.y + otherPhysicalBody.height, self.y, self.y + self.height));
}

     var physicalBody = {
         x: options.x,
         y: options.y,
         speed: options.speed,
         height: options.height,
         width: options.width,
          move: move,
        colidesWith: colidesWith    
     };

     return physicalBody;

}

