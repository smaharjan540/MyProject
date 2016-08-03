'use strict';

angular.module('rascal').directive('numbersOnly', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, controller) {
      controller.$validators.stateInput = function (modelValue) {
        if (controller.$isEmpty(modelValue)) {
          return true;
        }
        return modelValue.match(/^\d+$/) !== null;
      };
    }
  };
});
