'use strict';

angular.module('rascal').directive('leftPane', function($templateCache, DataService, FlowService) {
  return {
    restrict: 'E',
    template: $templateCache.get('templates/leftpane.dir.html'),
    controller: function ($scope, $rootScope, $state) {
      $scope.init = function () {
        var currentState = FlowService.currentState();
        $scope.menuItems = FlowService.flow(DataService.startRequest ? DataService.startRequest.userType : 'patient');
        $scope.menuItems.forEach(function(item) {
          item.complete = !!DataService[item.href] && DataService[item.href].complete;
          item.selected = item.href === currentState;
        });
      };

      $scope.classOf = function (item) {
        var css = item.complete ? 'active' : 'dormant';
        if (item.selected) {
          css += ' current';
        }
        return css;
      };

      $scope.linkTo = function (item) {
        if (item.complete) {
          $state.go(item.href);
        }
      };

      $scope.init();

      $rootScope.$on('$stateChangeSuccess', $scope.init);
    }
  };
});
