'use strict';

angular.module('rascal').directive('stateInput', function () {
   var states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
   'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
   'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
   'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
   'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element) {
      scope.isEntryValid = function( states, fieldValue ) {
        var foundState = false;
        for( var i = 0; i < states.length; i++ ) {
          if( 1 === fieldValue.length ) {
            if( fieldValue === states[i].charAt(0) ) {
              foundState = true;
              break;
            }
          }
          else if( 2 === fieldValue.length ) {
            if( fieldValue === states[i] ) {
              foundState = true;
              break;
            }
          }
        }
        return foundState;
      };
      scope.isSpecialCharacter = function(keyVal) {
        if( '' === keyVal ) {
          return true;
        }
        return false;
      };
      scope.getKeyCode = function (ev) {
        var keyCode = ev.keyCode;
        if( 0 === keyCode ) {
          keyCode = ev.value.charCodeAt(ev.value.length - 1);
        }
        return keyCode;
      };
      element.bind('keyup', function(ev) {

        var val = angular.element(ev.currentTarget).val();
        if( scope.isSpecialCharacter(val) ) {
          return;
        }
        
        if( false === scope.isEntryValid(states, val.toUpperCase()) ) {
          if( 1 === val.length ) {
            angular.element(ev.currentTarget).val('');
          }
          else {
            angular.element(ev.currentTarget).val(val.substring(0, 1).toUpperCase());
          }
        }
      });
    }
  };
});
