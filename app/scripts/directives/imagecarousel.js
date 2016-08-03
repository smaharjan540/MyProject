'use strict';

angular.module('rascal').directive('imageCarousel', function ($templateCache) {
  return {
    restrict: 'E',
    template: $templateCache.get('templates/imagecarousel.dir.html'),
    scope: {
      shownImages: '=',
      imageData: '='
    },
    link: function ($scope) {
      $scope.position = 0;

      var max = $scope.shownImages || (!!$scope.imageData ? $scope.imageData.length : 0);
      $scope.images = !!$scope.imageData ? $scope.imageData.slice(0, max) : [];
    },
    controller: function ($scope) {
      function wrap (n, max) {
        return (n + max) % max;
      }

      $scope.cycleLeft = function () {
        if (!$scope.imageData || !$scope.images.length) {
          return;
        }
        $scope.position = wrap($scope.position - 1, $scope.imageData.length);
        $scope.images.unshift($scope.imageData[$scope.position]);
        $scope.images.pop();
      };
      $scope.cycleRight = function () {
        if (!$scope.imageData || !$scope.images.length) {
          return;
        }
        $scope.position = wrap($scope.position + 1, $scope.imageData.length);
        $scope.images.shift();
        $scope.images.push($scope.imageData[wrap($scope.position + $scope.images.length, $scope.imageData.length)]);
      };
    }
  };
});
