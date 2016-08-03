'use strict';

angular.module('rascal').directive('restrictInput', function() {
  return {
    require: 'ngModel',
    link: function (scope, element) {
      element.bind('keypress', function(ev) {
          /*Logic for mozilla-browser*/
          if(ev.key==='Backspace'||ev.key==='Tab'||ev.key==='Del'||ev.key==='Home'||ev.key==='Left'||ev.key==='Right'||ev.key==='Up'||ev.key==='Down'||ev.key==='end'||ev.keyCode==='8'||ev.keyCode==='9'||ev.keyCode==='46'||ev.keyCode==='36'||ev.keyCode==='37'||ev.keyCode==='39'||ev.keyCode==='38'||ev.keyCode==='40'||ev.keyCode==='35'){
            return ;
          }

          var keyPressed = String.fromCharCode(ev.which || ev.keyCode);
          var transformedKeyPressed = keyPressed.replace(/[^a-zA-Z0-9-@._, ]+/g, '');

          if(transformedKeyPressed !== keyPressed) {
            ev.preventDefault();
          }
      });
    }
  }; 
});
