'use strict';

angular.module('rascal').directive('checkbox', function ($templateCache) {
  return {
    restrict: 'E',
    scope: {
      value: '=',
      label: '=?',
      subtext: '=?'
    },
    template: $templateCache.get('templates/checkbox.dir.html'),
    link: function ($scope, element, attrs) {
      $scope.click = function () {
        if (!('uncontrolled' in attrs)) {
          $scope.value = !$scope.value;
        }
      };
    }
  };
});
